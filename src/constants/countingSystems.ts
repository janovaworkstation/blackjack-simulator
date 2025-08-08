/**
 * Centralized counting systems constants for the Blackjack Strategy Simulator.
 * 
 * This file serves as the single source of truth for all card counting systems,
 * preventing inconsistencies, typos, and dead values across the codebase.
 * 
 * @author Blackjack Strategy Simulator
 * @license MIT
 */

import { CountingSystemType } from '../types/blackjack';

/**
 * String enum-style object for counting system keys.
 * Provides type-safe access to counting system identifiers.
 */
export const COUNTING_SYSTEM_KEYS = {
  HI_LO: 'HI_LO' as const,
  KO: 'KO' as const,
  HI_OPT_I: 'HI_OPT_I' as const,
} as const;

/**
 * Complete metadata for all supported counting systems.
 * 
 * Each system includes:
 * - name: Display name for UI
 * - description: Brief explanation of the system
 * - values: Card value assignments for counting
 * - difficulty: Relative difficulty level (1-5)
 * - effectiveness: Relative effectiveness rating (1-5)
 */
export const COUNTING_SYSTEMS_METADATA = {
  [COUNTING_SYSTEM_KEYS.HI_LO]: {
    name: 'Hi-Lo',
    description: 'The most popular and widely taught counting system. Simple and effective for beginners.',
    difficulty: 1,
    effectiveness: 4,
    values: {
      A: -1,
      '2': 1,
      '3': 1,
      '4': 1,
      '5': 1,
      '6': 1,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': -1,
      J: -1,
      Q: -1,
      K: -1,
    },
  },
  [COUNTING_SYSTEM_KEYS.KO]: {
    name: 'Knock-Out (KO)',
    description: 'An unbalanced system that eliminates the need for true count conversion. Good for intermediate players.',
    difficulty: 2,
    effectiveness: 4,
    values: {
      A: -1,
      '2': 1,
      '3': 1,
      '4': 1,
      '5': 1,
      '6': 1,
      '7': 1, // Key difference from Hi-Lo: 7s are +1
      '8': 0,
      '9': 0,
      '10': -1,
      J: -1,
      Q: -1,
      K: -1,
    },
  },
  [COUNTING_SYSTEM_KEYS.HI_OPT_I]: {
    name: 'Hi-Opt I',
    description: 'A balanced system that treats Aces as neutral. More precise but requires separate Ace tracking.',
    difficulty: 3,
    effectiveness: 4,
    values: {
      A: 0, // Key difference: Aces are neutral
      '2': 0, // Key difference: 2s are neutral  
      '3': 1,
      '4': 1,
      '5': 1,
      '6': 1,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': -1,
      J: -1,
      Q: -1,
      K: -1,
    },
  },
} as const;

/**
 * Type-safe helper to get all available counting system keys.
 */
export const AVAILABLE_COUNTING_SYSTEMS = Object.keys(COUNTING_SYSTEM_KEYS) as CountingSystemType[];

/**
 * Helper function to get counting systems formatted for UI dropdowns.
 * 
 * @returns Array of objects with value and label properties for UI components
 */
export function getCountingSystemsForUI(): Array<{ value: CountingSystemType; label: string }> {
  return AVAILABLE_COUNTING_SYSTEMS.map(systemKey => ({
    value: systemKey,
    label: COUNTING_SYSTEMS_METADATA[systemKey].name,
  }));
}

/**
 * Helper function to get counting system metadata by key.
 * 
 * @param systemKey - The counting system identifier
 * @returns The complete metadata for the counting system, or undefined if not found
 */
export function getCountingSystemMetadata(systemKey: CountingSystemType) {
  return COUNTING_SYSTEMS_METADATA[systemKey];
}

/**
 * Type guard to validate counting system keys.
 * 
 * @param value - Value to check
 * @returns True if the value is a valid counting system key
 */
export function isValidCountingSystem(value: any): value is CountingSystemType {
  return typeof value === 'string' && value in COUNTING_SYSTEMS_METADATA;
}

/**
 * Helper to get the display name for a counting system.
 * 
 * @param systemKey - The counting system identifier
 * @returns The display name, or 'Unknown' if system not found
 */
export function getCountingSystemName(systemKey: CountingSystemType): string {
  const metadata = COUNTING_SYSTEMS_METADATA[systemKey];
  return metadata?.name ?? 'Unknown';
}

/**
 * Helper to get all counting systems with their difficulty and effectiveness ratings.
 * Useful for advanced UI features like system comparison.
 */
export function getCountingSystemsWithRatings() {
  return AVAILABLE_COUNTING_SYSTEMS.map(systemKey => {
    const metadata = COUNTING_SYSTEMS_METADATA[systemKey];
    return {
      key: systemKey,
      name: metadata.name,
      description: metadata.description,
      difficulty: metadata.difficulty,
      effectiveness: metadata.effectiveness,
    };
  });
}

/**
 * Default counting system for new configurations.
 * Hi-Lo is chosen as the default due to its simplicity and widespread adoption.
 */
export const DEFAULT_COUNTING_SYSTEM: CountingSystemType = COUNTING_SYSTEM_KEYS.HI_LO;