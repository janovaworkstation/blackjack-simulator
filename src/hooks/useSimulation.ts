import { useState, useCallback } from 'react';
import { SimulationConfig, SimulationResults } from '../types/blackjack';
import { BlackjackSimulation } from '../utils/BlackjackEngine';
import { validateBettingStrategy, getValidationSummary } from '../utils/bettingValidation';
import { SimulationConfigSchema } from '../schemas/simulationSchema';

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
        // Step 1: Validate configuration schema
        try {
          SimulationConfigSchema.parse(config);
        } catch (zodError: any) {
          let errorMessages = 'Invalid configuration';
          if (zodError?.issues && Array.isArray(zodError.issues)) {
            errorMessages = zodError.issues.map((err: any) => 
              `${err.path.join('.')}: ${err.message}`
            ).join('\n');
          } else if (zodError?.errors && Array.isArray(zodError.errors)) {
            errorMessages = zodError.errors.map((err: any) => 
              `${err.path.join('.')}: ${err.message}`
            ).join('\n');
          } else if (zodError.message) {
            errorMessages = zodError.message;
          }
          throw new Error(`Configuration validation failed:\n${errorMessages}`);
        }

        // Step 2: Validate betting strategy business rules
        const bettingValidation = validateBettingStrategy(config.bettingTable);
        if (!bettingValidation.isValid) {
          const summary = getValidationSummary(bettingValidation);
          throw new Error(`Betting strategy validation failed:\n\n${summary}`);
        }

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
