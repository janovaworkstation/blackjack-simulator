/**
 * Zod schemas for runtime validation of simulation configuration
 */

import { z } from 'zod';
import type { CountingSystemType } from '../types/blackjack';

/**
 * Zod schema for BetRow validation
 */
export const BetRowSchema = z.object({
  minCount: z.number()
    .int('minCount must be an integer')
    .min(-999, 'minCount cannot be less than -999')
    .max(999, 'minCount cannot be greater than 999'),
  
  maxCount: z.number()
    .int('maxCount must be an integer') 
    .min(-999, 'maxCount cannot be less than -999')
    .max(999, 'maxCount cannot be greater than 999'),
    
  betAmount: z.number()
    .positive('betAmount must be positive')
    .max(100000, 'betAmount cannot exceed $100,000')
}).refine(
  data => data.maxCount > data.minCount,
  {
    message: 'maxCount must be greater than minCount',
    path: ['maxCount']
  }
);

/**
 * Zod schema for betting table array with basic structural validation
 * Additional business logic validation (gaps, overlaps, coverage) is handled separately
 */
export const BettingTableSchema = z.array(BetRowSchema)
  .min(1, 'Betting table cannot be empty')
  .max(50, 'Betting table cannot have more than 50 entries');

/**
 * Zod schema for counting system validation
 */
export const CountingSystemSchema = z.enum(['HI_LO', 'KO', 'HI_OPT_I'] as const);

/**
 * Zod schema for complete SimulationConfig validation
 */
export const SimulationConfigSchema = z.object({
  numberOfDecks: z.number()
    .int('numberOfDecks must be an integer')
    .min(1, 'numberOfDecks must be at least 1')
    .max(8, 'numberOfDecks cannot exceed 8'),
    
  deckPenetration: z.number()
    .min(25, 'deckPenetration must be at least 25%')
    .max(95, 'deckPenetration cannot exceed 95%'),
    
  playerBet: z.number()
    .positive('playerBet must be positive')
    .max(100000, 'playerBet cannot exceed $100,000'),
    
  dealerHitsOnSoft17: z.boolean(),
  playerCanDouble: z.boolean(), 
  playerCanSplit: z.boolean(),
  playerCanSurrender: z.boolean(),
  
  numberOfSimulations: z.number()
    .int('numberOfSimulations must be an integer')
    .min(1, 'numberOfSimulations must be at least 1')
    .max(10000000, 'numberOfSimulations cannot exceed 10,000,000'),
    
  enableHandTracking: z.boolean(),
  
  bettingTable: BettingTableSchema,
  
  countingSystem: CountingSystemSchema,
  
  resplitAces: z.boolean(),
  doubleAfterSplit: z.boolean(),
  
  handsPerHour: z.number()
    .int('handsPerHour must be an integer')
    .min(1, 'handsPerHour must be at least 1')
    .max(1000, 'handsPerHour cannot exceed 1000')
});

/**
 * Type inference from zod schemas
 */
export type ValidatedBetRow = z.infer<typeof BetRowSchema>;
export type ValidatedBettingTable = z.infer<typeof BettingTableSchema>;
export type ValidatedSimulationConfig = z.infer<typeof SimulationConfigSchema>;