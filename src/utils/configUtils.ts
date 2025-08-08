/**
 * Configuration utility functions for the Blackjack Strategy Simulator.
 * Provides centralized, single-source config transformation to prevent drift.
 * @author Blackjack Strategy Simulator
 * @license MIT
 */

import { SimulationConfig } from '../types/blackjack';
import { PanelConfig } from '../components/ConfigurationPanel';

/**
 * Transforms PanelConfig to SimulationConfig with complete field mapping.
 * This is the canonical source for SimulationConfig construction to prevent
 * configuration drift between different components.
 * 
 * @param config - The panel configuration containing both UI and simulation fields
 * @returns Complete SimulationConfig with all required and optional fields
 * 
 * @example
 * ```typescript
 * const simulationConfig = getSimulationConfig(panelConfig);
 * runSimulation(simulationConfig);
 * ```
 */
export function getSimulationConfig(config: PanelConfig): SimulationConfig {
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
    
    // Optional features with safe defaults
    enableHandTracking: config.enableHandTracking,
    bettingTable: config.bettingTable,
    countingSystem: config.countingSystem,
    resplitAces: config.resplitAces,
    doubleAfterSplit: config.doubleAfterSplit,
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
    'numberOfSimulations'
  ];

  const missing: string[] = [];
  
  for (const field of requiredFields) {
    if (config[field] === undefined || config[field] === null) {
      missing.push(field);
    }
  }
  
  return missing;
}