/**
 * Default configuration constants for the Blackjack Strategy Simulator.
 * 
 * This file provides a centralized source of truth for all default configuration values,
 * making them easier to test, maintain, and share across components.
 * 
 * @author Blackjack Strategy Simulator
 * @license MIT
 */

import { AppConfig, BetRow, CountingSystemType } from '../types/blackjack';
import { getCountingSystemsForUI, DEFAULT_COUNTING_SYSTEM } from './countingSystems';

/**
 * Default betting table configuration for count-based betting strategy.
 * 
 * This conservative strategy increases bets gradually with positive counts and provides
 * full coverage from -99 to +99 as required by validation:
 * - Extreme negative counts (-99 to 0): Minimum bet ($5)
 * - True count 0-1: Base bet ($10)  
 * - True count 1-2: 2.5x bet ($25)
 * - True count 2-3: 5x bet ($50)
 * - True count 3-4: 7.5x bet ($75)
 * - True count 4 to 99: Maximum bet ($100)
 */
export const DEFAULT_BETTING_TABLE: BetRow[] = [
  { minCount: -99, maxCount: 0, betAmount: 5 },
  { minCount: 0, maxCount: 1, betAmount: 10 },
  { minCount: 1, maxCount: 2, betAmount: 25 },
  { minCount: 2, maxCount: 3, betAmount: 50 },
  { minCount: 3, maxCount: 4, betAmount: 75 },
  { minCount: 4, maxCount: 99, betAmount: 100 },
];

/**
 * Available card counting systems for UI components.
 * 
 * This uses the centralized counting systems helper to ensure consistency
 * and prevent typos or dead values across the application.
 */
export const DEFAULT_COUNTING_SYSTEMS = getCountingSystemsForUI();

/**
 * Complete default application configuration.
 * 
 * These defaults represent a balanced setup suitable for:
 * - Learning basic card counting principles
 * - Testing conservative betting strategies
 * - Realistic casino simulation conditions
 * 
 * Configuration choices explained:
 * - 6 decks: Most common in modern casinos
 * - 75% penetration: Typical casino shuffle point
 * - Dealer hits soft 17: Common unfavorable rule
 * - 100,000 hands: Sufficient for statistical significance
 * - Hand tracking enabled: Required for advanced analysis
 */
export const DEFAULT_APP_CONFIG: AppConfig = {
  // Core simulation parameters
  numberOfSimulations: 100000,
  numberOfDecks: 6,
  deckPenetration: 75,
  playerBet: 10,
  
  // Game rules (realistic casino conditions)
  dealerHitsOnSoft17: true,
  playerCanDouble: true,
  playerCanSplit: true,
  playerCanSurrender: false,
  
  // Advanced game rules
  resplitAces: false,
  doubleAfterSplit: true,
  
  // Simulation features
  enableHandTracking: true,
  countingSystem: DEFAULT_COUNTING_SYSTEM,
  
  // Betting strategy
  bettingTable: DEFAULT_BETTING_TABLE,
  
  // UI and display configuration
  maxBet: 100,
  handsPerHour: 80,
};

/**
 * Validation helper to ensure config completeness.
 * Useful for testing and debugging configuration issues.
 * 
 * @param config - Configuration object to validate
 * @returns True if all required fields are present and valid
 */
export function validateAppConfig(config: Partial<AppConfig>): config is AppConfig {
  const requiredFields: (keyof AppConfig)[] = [
    'numberOfSimulations',
    'numberOfDecks', 
    'deckPenetration',
    'playerBet',
    'dealerHitsOnSoft17',
    'playerCanDouble',
    'playerCanSplit',
    'playerCanSurrender',
    'resplitAces',
    'doubleAfterSplit',
    'enableHandTracking',
    'countingSystem',
    'bettingTable',
    'maxBet',
    'handsPerHour',
  ];

  return requiredFields.every(field => 
    config[field] !== undefined && config[field] !== null
  );
}

/**
 * Creates a deep copy of the default configuration.
 * Useful when you need to modify defaults without affecting the original.
 * 
 * @returns A new AppConfig object with default values
 */
export function createDefaultConfig(): AppConfig {
  return {
    ...DEFAULT_APP_CONFIG,
    bettingTable: [...DEFAULT_BETTING_TABLE],
  };
}