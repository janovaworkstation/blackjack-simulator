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
        console.log('Starting simulation with config:', config);
        const simulation = new BlackjackSimulation(config);

        const progressCallback = (current: number, total: number) => {
          console.log(`Progress: ${current} of ${total}`);
          setProgress({ current, total });
        };

        console.log('About to start simulation...');
        const simulationResults = await simulation.simulate(progressCallback);
        console.log('Simulation completed:', simulationResults);

        // Validate results before setting
        if (simulationResults && typeof simulationResults === 'object') {
          console.log('Setting results:', simulationResults);
          console.log(
            'Hand details length:',
            simulationResults.handDetails?.length,
          );
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
