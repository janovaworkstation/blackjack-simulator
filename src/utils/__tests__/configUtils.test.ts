/**
 * Tests for config utility functions.
 * Ensures single-source config transformation prevents drift.
 */

import { getSimulationConfig, validateSimulationConfig } from '../configUtils';
import { AppConfig, SimulationConfig } from '../../types/blackjack';
import { DEFAULT_APP_CONFIG } from '../../constants/defaultConfig';

describe('configUtils', () => {
  describe('getSimulationConfig', () => {
    const mockAppConfig: AppConfig = {
      ...DEFAULT_APP_CONFIG,
      // Test-specific overrides
      maxBet: 500, // Different from default to test UI-only field filtering
      bettingTable: [
        { minCount: -10, maxCount: 1, betAmount: 5 },
        { minCount: 1, maxCount: 3, betAmount: 25 }
      ], // Simpler betting table for testing
    };

    it('should extract all SimulationConfig fields from AppConfig', () => {
      const result = getSimulationConfig(mockAppConfig);
      
      // Should include all SimulationConfig fields
      expect(result.numberOfDecks).toBe(6);
      expect(result.deckPenetration).toBe(75);
      expect(result.playerBet).toBe(10);
      expect(result.numberOfSimulations).toBe(100000);
      expect(result.dealerHitsOnSoft17).toBe(true);
      expect(result.playerCanDouble).toBe(true);
      expect(result.playerCanSplit).toBe(true);
      expect(result.playerCanSurrender).toBe(false);
      expect(result.enableHandTracking).toBe(true);
      expect(result.bettingTable).toEqual(mockAppConfig.bettingTable);
      expect(result.countingSystem).toBe('HI_LO');
      expect(result.resplitAces).toBe(false);
      expect(result.doubleAfterSplit).toBe(true);
      expect(result.handsPerHour).toBe(80);
    });

    it('should not include UI-only fields', () => {
      const result = getSimulationConfig(mockAppConfig);
      
      // Should NOT include UI-only fields
      expect(result).not.toHaveProperty('maxBet');
      // handsPerHour is now included as it's needed by simulation engine
      expect(result).toHaveProperty('handsPerHour');
    });

    it('should handle undefined optional fields gracefully', () => {
      const configWithUndefined: AppConfig = {
        ...mockAppConfig,
        enableHandTracking: undefined,
        bettingTable: undefined,
        countingSystem: undefined,
        resplitAces: undefined,
        doubleAfterSplit: undefined,
      };
      
      const result = getSimulationConfig(configWithUndefined);
      
      expect(result.enableHandTracking).toBeUndefined();
      expect(result.bettingTable).toBeUndefined();
      expect(result.countingSystem).toBeUndefined();
      expect(result.resplitAces).toBeUndefined();
      expect(result.doubleAfterSplit).toBeUndefined();
    });

    it('should maintain field type safety', () => {
      const result = getSimulationConfig(mockAppConfig);
      
      // Type assertions to ensure correct types
      expect(typeof result.numberOfDecks).toBe('number');
      expect(typeof result.deckPenetration).toBe('number');
      expect(typeof result.playerBet).toBe('number');
      expect(typeof result.numberOfSimulations).toBe('number');
      expect(typeof result.dealerHitsOnSoft17).toBe('boolean');
      expect(typeof result.playerCanDouble).toBe('boolean');
      expect(typeof result.playerCanSplit).toBe('boolean');
      expect(typeof result.playerCanSurrender).toBe('boolean');
      expect(typeof result.enableHandTracking).toBe('boolean');
      expect(Array.isArray(result.bettingTable)).toBe(true);
      expect(typeof result.countingSystem).toBe('string');
      expect(typeof result.resplitAces).toBe('boolean');
      expect(typeof result.doubleAfterSplit).toBe('boolean');
    });

    it('should create identical configs for identical inputs', () => {
      const result1 = getSimulationConfig(mockAppConfig);
      const result2 = getSimulationConfig(mockAppConfig);
      
      expect(result1).toEqual(result2);
    });

    it('should handle edge cases correctly', () => {
      const edgeCaseConfig: AppConfig = {
        ...mockAppConfig,
        numberOfDecks: 1,         // minimum decks
        deckPenetration: 50,      // minimum penetration
        playerBet: 0,            // edge case bet
        numberOfSimulations: 1,   // minimum simulations
      };
      
      const result = getSimulationConfig(edgeCaseConfig);
      
      expect(result.numberOfDecks).toBe(1);
      expect(result.deckPenetration).toBe(50);
      expect(result.playerBet).toBe(0);
      expect(result.numberOfSimulations).toBe(1);
    });
  });

  describe('validateSimulationConfig', () => {
    const validConfig: SimulationConfig = {
      numberOfDecks: 6,
      deckPenetration: 75,
      playerBet: 10,
      dealerHitsOnSoft17: true,
      playerCanDouble: true,
      playerCanSplit: true,
      playerCanSurrender: false,
      numberOfSimulations: 100000,
    };

    it('should return empty array for valid config', () => {
      const result = validateSimulationConfig(validConfig);
      expect(result).toEqual([]);
    });

    it('should identify missing required fields', () => {
      const invalidConfig: Partial<SimulationConfig> = {
        numberOfDecks: 6,
        // Missing other required fields
      };
      
      const result = validateSimulationConfig(invalidConfig);
      
      expect(result).toContain('deckPenetration');
      expect(result).toContain('playerBet');
      expect(result).toContain('dealerHitsOnSoft17');
      expect(result).toContain('playerCanDouble');
      expect(result).toContain('playerCanSplit');
      expect(result).toContain('playerCanSurrender');
      expect(result).toContain('numberOfSimulations');
      expect(result.length).toBe(7); // 7 missing fields
    });

    it('should not require optional fields', () => {
      const configWithoutOptionals: SimulationConfig = {
        numberOfDecks: 6,
        deckPenetration: 75,
        playerBet: 10,
        dealerHitsOnSoft17: true,
        playerCanDouble: true,
        playerCanSplit: true,
        playerCanSurrender: false,
        numberOfSimulations: 100000,
        // Optional fields omitted
      };
      
      const result = validateSimulationConfig(configWithoutOptionals);
      expect(result).toEqual([]);
    });

    it('should treat null values as missing', () => {
      const configWithNulls: Partial<SimulationConfig> = {
        numberOfDecks: null as any,
        deckPenetration: 75,
        playerBet: 10,
        dealerHitsOnSoft17: true,
        playerCanDouble: true,
        playerCanSplit: true,
        playerCanSurrender: false,
        numberOfSimulations: 100000,
      };
      
      const result = validateSimulationConfig(configWithNulls);
      expect(result).toContain('numberOfDecks');
      expect(result.length).toBe(1);
    });
  });

  describe('integration: getSimulationConfig + validation', () => {
    it('should produce valid configs that pass validation', () => {
      const mockAppConfig: AppConfig = {
        numberOfDecks: 6,
        deckPenetration: 75,
        playerBet: 10,
        numberOfSimulations: 100000,
        dealerHitsOnSoft17: true,
        playerCanDouble: true,
        playerCanSplit: true,
        playerCanSurrender: false,
        enableHandTracking: true,
        bettingTable: [],
        countingSystem: 'HI_LO',
        resplitAces: false,
        doubleAfterSplit: true,
        maxBet: 500,
        handsPerHour: 80,
      };
      
      const simulationConfig = getSimulationConfig(mockAppConfig);
      const validationErrors = validateSimulationConfig(simulationConfig);
      
      expect(validationErrors).toEqual([]);
    });
  });
});