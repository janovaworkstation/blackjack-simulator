import { useState, useCallback } from 'react';
import { SimulationConfig, SimulationResults } from '../types/blackjack';
import { BlackjackSimulation } from '../utils/BlackjackEngine';

export interface SimulationProgress {
  current: number;
  total: number;
}

export const useSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<SimulationResults | null>(null);
  const [progress, setProgress] = useState<SimulationProgress | null>(null);

  const runSimulation = useCallback(async (config: SimulationConfig) => {
    setIsRunning(true);
    setResults(null);
    setProgress({ current: 0, total: config.numberOfSimulations });

    // Use setTimeout to allow UI to update
    setTimeout(async () => {
      try {
        const simulation = new BlackjackSimulation(config);

        const progressCallback = (current: number, total: number) => {
          setProgress({ current, total });
        };

        const simulationResults = await simulation.simulate(progressCallback);

        // Validate results before setting
        if (simulationResults && typeof simulationResults === 'object') {
          setResults(simulationResults);
        } else {
          console.error('Invalid simulation results:', simulationResults);
          alert('Simulation completed but results are invalid');
        }
      } catch (error) {
        console.error('Simulation error:', error);
        alert(`Simulation failed: ${(error as Error).message}`);
      } finally {
        setIsRunning(false);
        setProgress(null);
      }
    }, 100);
  }, []);

  return {
    isRunning,
    results,
    progress,
    runSimulation,
  };
};
