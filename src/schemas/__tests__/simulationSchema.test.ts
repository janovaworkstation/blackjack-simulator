/**
 * Tests for Zod schemas used in simulation configuration validation
 */

import {
  BetRowSchema,
  BettingTableSchema,
  CountingSystemSchema,
  SimulationConfigSchema,
} from '../simulationSchema';
import type { SimulationConfig } from '../../types/blackjack';

describe('simulationSchema', () => {
  describe('BetRowSchema', () => {
    it('should validate a valid bet row', () => {
      const validBetRow = {
        minCount: -10,
        maxCount: 5,
        betAmount: 25,
      };
      
      expect(() => BetRowSchema.parse(validBetRow)).not.toThrow();
    });

    it('should reject bet row with invalid minCount', () => {
      const invalidBetRow = {
        minCount: -1000, // Below minimum
        maxCount: 5,
        betAmount: 25,
      };
      
      expect(() => BetRowSchema.parse(invalidBetRow)).toThrow();
    });

    it('should reject bet row with invalid maxCount', () => {
      const invalidBetRow = {
        minCount: -10,
        maxCount: 1000, // Above maximum
        betAmount: 25,
      };
      
      expect(() => BetRowSchema.parse(invalidBetRow)).toThrow();
    });

    it('should reject bet row with non-integer counts', () => {
      const invalidBetRow = {
        minCount: -10.5, // Non-integer
        maxCount: 5,
        betAmount: 25,
      };
      
      expect(() => BetRowSchema.parse(invalidBetRow)).toThrow();
    });

    it('should reject bet row with negative bet amount', () => {
      const invalidBetRow = {
        minCount: -10,
        maxCount: 5,
        betAmount: -25, // Negative
      };
      
      expect(() => BetRowSchema.parse(invalidBetRow)).toThrow();
    });

    it('should reject bet row with zero bet amount', () => {
      const invalidBetRow = {
        minCount: -10,
        maxCount: 5,
        betAmount: 0, // Zero
      };
      
      expect(() => BetRowSchema.parse(invalidBetRow)).toThrow();
    });

    it('should reject bet row with minCount >= maxCount', () => {
      const invalidBetRow = {
        minCount: 5,
        maxCount: 5, // Equal, should be greater
        betAmount: 25,
      };
      
      expect(() => BetRowSchema.parse(invalidBetRow)).toThrow();
    });

    it('should reject bet row with excessive bet amount', () => {
      const invalidBetRow = {
        minCount: -10,
        maxCount: 5,
        betAmount: 150000, // Above maximum
      };
      
      expect(() => BetRowSchema.parse(invalidBetRow)).toThrow();
    });
  });

  describe('BettingTableSchema', () => {
    it('should validate a valid betting table', () => {
      const validBettingTable = [
        { minCount: -99, maxCount: 0, betAmount: 5 },
        { minCount: 0, maxCount: 1, betAmount: 10 },
        { minCount: 1, maxCount: 99, betAmount: 25 },
      ];
      
      expect(() => BettingTableSchema.parse(validBettingTable)).not.toThrow();
    });

    it('should reject empty betting table', () => {
      const emptyBettingTable = [];
      
      expect(() => BettingTableSchema.parse(emptyBettingTable)).toThrow();
    });

    it('should reject betting table with too many entries', () => {
      const oversizedBettingTable = Array.from({ length: 51 }, (_, i) => ({
        minCount: i,
        maxCount: i + 1,
        betAmount: 10,
      }));
      
      expect(() => BettingTableSchema.parse(oversizedBettingTable)).toThrow();
    });

    it('should reject betting table with invalid bet rows', () => {
      const invalidBettingTable = [
        { minCount: -99, maxCount: 0, betAmount: 5 },
        { minCount: 0, maxCount: 1, betAmount: -10 }, // Invalid bet amount
      ];
      
      expect(() => BettingTableSchema.parse(invalidBettingTable)).toThrow();
    });
  });

  describe('CountingSystemSchema', () => {
    it('should validate valid counting systems', () => {
      expect(() => CountingSystemSchema.parse('HI_LO')).not.toThrow();
      expect(() => CountingSystemSchema.parse('KO')).not.toThrow();
      expect(() => CountingSystemSchema.parse('HI_OPT_I')).not.toThrow();
    });

    it('should reject invalid counting systems', () => {
      expect(() => CountingSystemSchema.parse('INVALID_SYSTEM')).toThrow();
      expect(() => CountingSystemSchema.parse('hi_lo')).toThrow(); // Wrong case
      expect(() => CountingSystemSchema.parse('')).toThrow();
    });
  });

  describe('SimulationConfigSchema', () => {
    const validSimulationConfig: SimulationConfig = {
      numberOfDecks: 6,
      deckPenetration: 75,
      playerBet: 10,
      dealerHitsOnSoft17: true,
      playerCanDouble: true,
      playerCanSplit: true,
      playerCanSurrender: false,
      numberOfSimulations: 100000,
      enableHandTracking: true,
      bettingTable: [
        { minCount: -99, maxCount: 0, betAmount: 5 },
        { minCount: 0, maxCount: 99, betAmount: 10 },
      ],
      countingSystem: 'HI_LO',
      resplitAces: false,
      doubleAfterSplit: true,
      handsPerHour: 80,
    };

    it('should validate a complete valid simulation config', () => {
      expect(() => SimulationConfigSchema.parse(validSimulationConfig)).not.toThrow();
    });

    it('should reject config with invalid numberOfDecks', () => {
      const invalidConfig = {
        ...validSimulationConfig,
        numberOfDecks: 0, // Below minimum
      };
      
      expect(() => SimulationConfigSchema.parse(invalidConfig)).toThrow();
    });

    it('should reject config with invalid deckPenetration', () => {
      const invalidConfig = {
        ...validSimulationConfig,
        deckPenetration: 20, // Below minimum
      };
      
      expect(() => SimulationConfigSchema.parse(invalidConfig)).toThrow();
    });

    it('should reject config with invalid playerBet', () => {
      const invalidConfig = {
        ...validSimulationConfig,
        playerBet: -10, // Negative
      };
      
      expect(() => SimulationConfigSchema.parse(invalidConfig)).toThrow();
    });

    it('should reject config with invalid numberOfSimulations', () => {
      const invalidConfig = {
        ...validSimulationConfig,
        numberOfSimulations: 0, // Below minimum
      };
      
      expect(() => SimulationConfigSchema.parse(invalidConfig)).toThrow();
    });

    it('should reject config with invalid handsPerHour', () => {
      const invalidConfig = {
        ...validSimulationConfig,
        handsPerHour: 0, // Below minimum
      };
      
      expect(() => SimulationConfigSchema.parse(invalidConfig)).toThrow();
    });

    it('should reject config with missing required fields', () => {
      const incompleteConfig = {
        numberOfDecks: 6,
        deckPenetration: 75,
        // Missing other required fields
      };
      
      expect(() => SimulationConfigSchema.parse(incompleteConfig)).toThrow();
    });

    it('should reject config with invalid counting system', () => {
      const invalidConfig = {
        ...validSimulationConfig,
        countingSystem: 'INVALID_SYSTEM' as any,
      };
      
      expect(() => SimulationConfigSchema.parse(invalidConfig)).toThrow();
    });

    it('should reject config with invalid betting table', () => {
      const invalidConfig = {
        ...validSimulationConfig,
        bettingTable: [], // Empty betting table
      };
      
      expect(() => SimulationConfigSchema.parse(invalidConfig)).toThrow();
    });

    describe('boundary value testing', () => {
      it('should accept minimum valid values', () => {
        const minValidConfig: SimulationConfig = {
          numberOfDecks: 1, // Minimum
          deckPenetration: 25, // Minimum
          playerBet: 0.01, // Minimum positive
          dealerHitsOnSoft17: true,
          playerCanDouble: true,
          playerCanSplit: true,
          playerCanSurrender: false,
          numberOfSimulations: 1, // Minimum
          enableHandTracking: true,
          bettingTable: [
            { minCount: -99, maxCount: 99, betAmount: 0.01 }, // Minimum positive
          ],
          countingSystem: 'HI_LO',
          resplitAces: false,
          doubleAfterSplit: true,
          handsPerHour: 1, // Minimum
        };
        
        expect(() => SimulationConfigSchema.parse(minValidConfig)).not.toThrow();
      });

      it('should accept maximum valid values', () => {
        const maxValidConfig: SimulationConfig = {
          numberOfDecks: 8, // Maximum
          deckPenetration: 95, // Maximum
          playerBet: 100000, // Maximum
          dealerHitsOnSoft17: true,
          playerCanDouble: true,
          playerCanSplit: true,
          playerCanSurrender: false,
          numberOfSimulations: 10000000, // Maximum
          enableHandTracking: true,
          bettingTable: Array.from({ length: 50 }, (_, i) => ({ // Maximum entries
            minCount: i - 25,
            maxCount: i - 24,
            betAmount: 100000, // Maximum bet
          })),
          countingSystem: 'HI_LO',
          resplitAces: false,
          doubleAfterSplit: true,
          handsPerHour: 1000, // Maximum
        };
        
        expect(() => SimulationConfigSchema.parse(maxValidConfig)).not.toThrow();
      });

      it('should reject values just outside valid ranges', () => {
        // Test values just below minimum
        expect(() => SimulationConfigSchema.parse({
          ...validSimulationConfig,
          numberOfDecks: 0, // Just below minimum
        })).toThrow();

        // Test values just above maximum
        expect(() => SimulationConfigSchema.parse({
          ...validSimulationConfig,
          numberOfDecks: 9, // Just above maximum
        })).toThrow();
      });
    });

    describe('type validation', () => {
      it('should reject non-boolean values for boolean fields', () => {
        const invalidConfig = {
          ...validSimulationConfig,
          dealerHitsOnSoft17: 'true' as any, // String instead of boolean
        };
        
        expect(() => SimulationConfigSchema.parse(invalidConfig)).toThrow();
      });

      it('should reject non-number values for number fields', () => {
        const invalidConfig = {
          ...validSimulationConfig,
          numberOfDecks: '6' as any, // String instead of number
        };
        
        expect(() => SimulationConfigSchema.parse(invalidConfig)).toThrow();
      });

      it('should reject non-array values for betting table', () => {
        const invalidConfig = {
          ...validSimulationConfig,
          bettingTable: 'invalid' as any, // String instead of array
        };
        
        expect(() => SimulationConfigSchema.parse(invalidConfig)).toThrow();
      });
    });
  });
});