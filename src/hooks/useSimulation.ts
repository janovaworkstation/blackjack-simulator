import { useState, useCallback } from 'react';
import { BlackjackSimulation } from '../utils/BlackjackEngine';

export const useSimulation = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(null);

  const runSimulation = useCallback(async (config) => {
    setIsRunning(true);
    setResults(null);
    setProgress({ current: 0, total: config.hands });

    // Use setTimeout to allow UI to update
    setTimeout(async () => {
      try {
        console.log('Starting simulation with config:', config);
        const simulation = new BlackjackSimulation(
          config,
          config.countingSystem,
        );

        const progressCallback = (current, total) => {
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
            'Session results length:',
            simulationResults.sessionResults?.length,
          );
          setResults(simulationResults);
        } else {
          console.error('Invalid simulation results:', simulationResults);
          alert('Simulation completed but results are invalid');
        }
      } catch (error) {
        console.error('Simulation error:', error);
        alert('Simulation failed: ' + error.message);
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
