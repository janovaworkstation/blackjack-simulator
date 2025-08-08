import { useState, useCallback, useRef } from 'react';
import { SimulationConfig, SimulationResults } from '../types/blackjack';
import { BlackjackSimulation } from '../utils/BlackjackEngine';

export interface SimulationProgress {
  current: number;
  total: number;
}

export const useWebWorkerSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [progress, setProgress] = useState<SimulationProgress | null>(null);
  const workerRef = useRef<Worker | null>(null);

  const runSimulation = useCallback(async (config: SimulationConfig) => {
    setIsRunning(true);
    setResults(null);
    setProgress({ current: 0, total: config.numberOfSimulations });

    // Try to use Web Worker first, fallback to main thread
    const useWebWorker = typeof Worker !== 'undefined' && config.numberOfSimulations >= 10000;

    if (useWebWorker) {
      try {
        await runWithWebWorker(config);
      } catch (error) {
        console.warn('Web Worker failed, falling back to main thread:', error);
        await runWithMainThread(config);
      }
    } else {
      await runWithMainThread(config);
    }

    setIsRunning(false);
    setProgress(null);
  }, []);

  const runWithWebWorker = async (config: SimulationConfig): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!workerRef.current) {
        workerRef.current = new Worker('/blackjack-worker.js');
      }

      const worker = workerRef.current;
      const simulationId = Date.now();

      const handleMessage = (event: MessageEvent) => {
        const { type, id, progress: workerProgress, results: workerResults, error } = event.data;

        if (id !== simulationId) return; // Ignore messages from other simulations

        switch (type) {
          case 'PROGRESS':
            setProgress(workerProgress);
            break;
          case 'COMPLETE':
            setResults(workerResults);
            worker.removeEventListener('message', handleMessage);
            resolve();
            break;
          case 'ERROR':
            worker.removeEventListener('message', handleMessage);
            reject(new Error(error));
            break;
          case 'WORKER_NOT_IMPLEMENTED':
            worker.removeEventListener('message', handleMessage);
            reject(new Error('Worker not implemented'));
            break;
        }
      };

      worker.addEventListener('message', handleMessage);
      worker.postMessage({
        type: 'SIMULATE',
        config,
        id: simulationId
      });
    });
  };

  const runWithMainThread = async (config: SimulationConfig): Promise<void> => {
    // Use setTimeout to allow UI to update
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const simulation = new BlackjackSimulation(config);

          // Throttle progress updates to avoid excessive re-renders
          let lastProgressUpdate = 0;
          const progressCallback = (current: number, total: number) => {
            const now = Date.now();
            // Update progress at most every 100ms or on completion
            if (now - lastProgressUpdate >= 100 || current === total) {
              setProgress({ current, total });
              lastProgressUpdate = now;
            }
          };

          const simulationResults = await simulation.simulate(progressCallback);

          // Validate results before setting
          if (simulationResults && typeof simulationResults === 'object') {
            setResults(simulationResults);
            resolve();
          } else {
            console.error('Invalid simulation results:', simulationResults);
            reject(new Error('Simulation completed but results are invalid'));
          }
        } catch (error) {
          console.error('Simulation error:', error);
          reject(error);
        }
      }, 100);
    });
  };

  // Cleanup worker on unmount
  const cleanup = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  return {
    isRunning,
    results,
    progress,
    runSimulation,
    cleanup,
  };
};