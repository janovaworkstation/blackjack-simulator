/**
 * Configuration utility functions for the Blackjack Strategy Simulator.
 * Provides centralized, single-source config transformation to prevent drift.
 * @author Blackjack Strategy Simulator
 * @license MIT
 */

import { SimulationConfig, AppConfig } from '../types/blackjack';

/**
 * Transforms AppConfig to SimulationConfig by extracting only simulation-relevant fields.
 * This is the canonical source for SimulationConfig construction to prevent
 * configuration drift between different components.
 * 
 * @param config - The complete application configuration
 * @returns SimulationConfig with all required fields for the simulation engine
 * 
 * @example
 * ```typescript
 * const simulationConfig = getSimulationConfig(appConfig);
 * runSimulation(simulationConfig);
 * ```
 */
export function getSimulationConfig(config: AppConfig): SimulationConfig {
  return {
    // Core simulation parameters
    numberOfDecks: config.numberOfDecks,
    deckPenetration: config.deckPenetration,
    playerBet: config.playerBet,
    numberOfSimulations: config.numberOfSimulations,
    
    // Game rules
    dealerHitsOnSoft17: config.dealerHitsOnSoft17,
    playerCanDouble: config.playerCanDouble,
    playerCanSplit: config.playerCanSplit,
    playerCanSurrender: config.playerCanSurrender,
    
    // Required simulation features (no longer optional)
    enableHandTracking: config.enableHandTracking,
    bettingTable: config.bettingTable,
    countingSystem: config.countingSystem,
    resplitAces: config.resplitAces,
    doubleAfterSplit: config.doubleAfterSplit,
    handsPerHour: config.handsPerHour,
  };
}

/**
 * Validates that a SimulationConfig contains all required fields.
 * Useful for testing and debugging configuration issues.
 * 
 * @param config - The SimulationConfig to validate
 * @returns Array of missing required field names, empty if valid
 */
export function validateSimulationConfig(config: Partial<SimulationConfig>): string[] {
  const requiredFields: (keyof SimulationConfig)[] = [
    'numberOfDecks',
    'deckPenetration', 
    'playerBet',
    'dealerHitsOnSoft17',
    'playerCanDouble',
    'playerCanSplit',
    'playerCanSurrender',
    'numberOfSimulations',
    'enableHandTracking',
    'bettingTable',
    'countingSystem',
    'resplitAces',
    'doubleAfterSplit',
    'handsPerHour'
  ];

  const missing: string[] = [];
  
  for (const field of requiredFields) {
    if (config[field] === undefined || config[field] === null) {
      missing.push(field);
    }
  }
  
  return missing;
}