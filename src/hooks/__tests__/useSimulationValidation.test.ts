/**
 * Integration tests for useSimulation hook with validation
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { useSimulation } from '../useSimulation';
import type { SimulationConfig } from '../../types/blackjack';

// Mock BlackjackEngine to avoid actual simulation execution
jest.mock('../../utils/BlackjackEngine', () => {
  return {
    BlackjackSimulation: jest.fn().mockImplementation(() => ({
      simulate: jest.fn().mockResolvedValue({
        handsPlayed: 1000,
        totalOutcomes: 1000,
        wins: 450,
        losses: 500,
        pushes: 50,
        blackjacks: 40,
        playerBusts: 100,
        dealerBusts: 150,
        surrenders: 20,
        winPercentage: 45,
        lossPercentage: 50,
        pushPercentage: 5,
        totalWagered: 10000,
        totalWon: 9500,
        netResult: -500,
        expectedValue: -5,
        averageBetSize: 10,
        maxDrawdown: 200,
        maxDrawdownHand: 500,
        handsPerHour: 80,
        countingSystem: 'HI_LO',
        sessionResults: [],
        handDetails: [],
        busts: 100,
        doubles: 80,
        splits: 30,
        hands15: 40,
        hands16: 35,
      }),
    })),
  };
});

describe('useSimulation with validation', () => {
  const validConfig: SimulationConfig = {
    numberOfDecks: 6,
    deckPenetration: 75,
    playerBet: 10,
    dealerHitsOnSoft17: true,
    playerCanDouble: true,
    playerCanSplit: true,
    playerCanSurrender: false,
    numberOfSimulations: 1000,
    enableHandTracking: true,
    bettingTable: [
      { minCount: -99, maxCount: 0, betAmount: 5 },
      { minCount: 0, maxCount: 1, betAmount: 10 },
      { minCount: 1, maxCount: 99, betAmount: 25 },
    ],
    countingSystem: 'HI_LO',
    resplitAces: false,
    doubleAfterSplit: true,
    handsPerHour: 80,
  };

  beforeEach(() => {
    // Clear any previous alerts
    jest.clearAllMocks();
    // Mock alert to capture error messages
    global.alert = jest.fn();
  });

  afterEach(() => {
    // Restore alert
    (global.alert as jest.Mock).mockRestore?.();
  });

  it('should successfully run simulation with valid configuration', async () => {
    const { result } = renderHook(() => useSimulation());
    
    expect(result.current.isRunning).toBe(false);
    expect(result.current.results).toBe(null);

    await act(async () => {
      result.current.runSimulation(validConfig);
    });

    // Wait for simulation to start
    expect(result.current.isRunning).toBe(true);

    // Wait for simulation to complete
    await waitFor(() => {
      expect(result.current.isRunning).toBe(false);
    }, { timeout: 3000 });

    expect(result.current.results).not.toBe(null);
    expect(result.current.results?.handsPlayed).toBe(1000);
    expect(global.alert).not.toHaveBeenCalled();
  });

  describe('schema validation errors', () => {
    it('should reject configuration with invalid numberOfDecks', async () => {
      const { result } = renderHook(() => useSimulation());
      
      const invalidConfig = {
        ...validConfig,
        numberOfDecks: 0, // Invalid
      };

      await act(async () => {
        result.current.runSimulation(invalidConfig);
      });

      // Wait for error handling
      await waitFor(() => {
        expect(result.current.isRunning).toBe(false);
      });

      expect(result.current.results).toBe(null);
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Configuration validation failed')
      );
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('numberOfDecks')
      );
    });

    it('should reject configuration with invalid deckPenetration', async () => {
      const { result } = renderHook(() => useSimulation());
      
      const invalidConfig = {
        ...validConfig,
        deckPenetration: 20, // Below minimum
      };

      await act(async () => {
        result.current.runSimulation(invalidConfig);
      });

      await waitFor(() => {
        expect(result.current.isRunning).toBe(false);
      });

      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Configuration validation failed')
      );
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('deckPenetration')
      );
    });

    it('should reject configuration with invalid playerBet', async () => {
      const { result } = renderHook(() => useSimulation());
      
      const invalidConfig = {
        ...validConfig,
        playerBet: -10, // Negative
      };

      await act(async () => {
        result.current.runSimulation(invalidConfig);
      });

      await waitFor(() => {
        expect(result.current.isRunning).toBe(false);
      });

      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Configuration validation failed')
      );
    });

    it('should reject configuration with invalid counting system', async () => {
      const { result } = renderHook(() => useSimulation());
      
      const invalidConfig = {
        ...validConfig,
        countingSystem: 'INVALID_SYSTEM' as any,
      };

      await act(async () => {
        result.current.runSimulation(invalidConfig);
      });

      await waitFor(() => {
        expect(result.current.isRunning).toBe(false);
      });

      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Configuration validation failed')
      );
    });
  });

  describe('betting strategy validation errors', () => {
    it('should reject configuration with range gaps', async () => {
      const { result } = renderHook(() => useSimulation());
      
      const invalidConfig = {
        ...validConfig,
        bettingTable: [
          { minCount: -99, maxCount: 0, betAmount: 5 },
          { minCount: 2, maxCount: 99, betAmount: 10 }, // Gap from 0 to 2
        ],
      };

      await act(async () => {
        result.current.runSimulation(invalidConfig);
      });

      await waitFor(() => {
        expect(result.current.isRunning).toBe(false);
      });

      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Betting strategy validation failed')
      );
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Range gap detected')
      );
    });

    it('should reject configuration with range overlaps', async () => {
      const { result } = renderHook(() => useSimulation());
      
      const invalidConfig = {
        ...validConfig,
        bettingTable: [
          { minCount: -99, maxCount: 5, betAmount: 5 },
          { minCount: 0, maxCount: 99, betAmount: 10 }, // Overlaps from 0 to 5
        ],
      };

      await act(async () => {
        result.current.runSimulation(invalidConfig);
      });

      await waitFor(() => {
        expect(result.current.isRunning).toBe(false);
      });

      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Betting strategy validation failed')
      );
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('overlap detected')
      );
    });

    it('should reject configuration with insufficient coverage', async () => {
      const { result } = renderHook(() => useSimulation());
      
      const invalidConfig = {
        ...validConfig,
        bettingTable: [
          { minCount: -10, maxCount: 10, betAmount: 5 }, // Insufficient coverage
        ],
      };

      await act(async () => {
        result.current.runSimulation(invalidConfig);
      });

      await waitFor(() => {
        expect(result.current.isRunning).toBe(false);
      });

      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Betting strategy validation failed')
      );
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('coverage')
      );
    });

    it('should reject configuration with invalid bet amounts', async () => {
      const { result } = renderHook(() => useSimulation());
      
      const invalidConfig = {
        ...validConfig,
        bettingTable: [
          { minCount: -99, maxCount: 0, betAmount: -5 }, // Negative bet
          { minCount: 0, maxCount: 99, betAmount: 10 },
        ],
      };

      await act(async () => {
        result.current.runSimulation(invalidConfig);
      });

      await waitFor(() => {
        expect(result.current.isRunning).toBe(false);
      });

      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Betting strategy validation failed')
      );
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('must be positive')
      );
    });

    it('should reject configuration with improperly ordered ranges', async () => {
      const { result } = renderHook(() => useSimulation());
      
      const invalidConfig = {
        ...validConfig,
        bettingTable: [
          { minCount: 0, maxCount: 5, betAmount: 10 },
          { minCount: -99, maxCount: 0, betAmount: 5 }, // Should come first
          { minCount: 5, maxCount: 99, betAmount: 15 },
        ],
      };

      await act(async () => {
        result.current.runSimulation(invalidConfig);
      });

      await waitFor(() => {
        expect(result.current.isRunning).toBe(false);
      });

      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Betting strategy validation failed')
      );
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('ordered by minCount')
      );
    });

    it('should reject empty betting table', async () => {
      const { result } = renderHook(() => useSimulation());
      
      const invalidConfig = {
        ...validConfig,
        bettingTable: [], // Empty
      };

      await act(async () => {
        result.current.runSimulation(invalidConfig);
      });

      await waitFor(() => {
        expect(result.current.isRunning).toBe(false);
      });

      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Configuration validation failed')
      );
    });
  });

  describe('complex validation scenarios', () => {
    it('should handle multiple simultaneous validation errors', async () => {
      const { result } = renderHook(() => useSimulation());
      
      const invalidConfig = {
        ...validConfig,
        numberOfDecks: 0, // Schema error
        bettingTable: [
          { minCount: -10, maxCount: 10, betAmount: -5 }, // Multiple betting errors
        ],
      };

      await act(async () => {
        result.current.runSimulation(invalidConfig);
      });

      await waitFor(() => {
        expect(result.current.isRunning).toBe(false);
      });

      // Should catch schema errors first
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Configuration validation failed')
      );
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('numberOfDecks')
      );
    });

    it('should validate betting strategy after schema passes', async () => {
      const { result } = renderHook(() => useSimulation());
      
      const invalidConfig = {
        ...validConfig,
        // Schema is valid, but betting strategy has issues
        bettingTable: [
          { minCount: -10, maxCount: 10, betAmount: 5 }, // Insufficient coverage
        ],
      };

      await act(async () => {
        result.current.runSimulation(invalidConfig);
      });

      await waitFor(() => {
        expect(result.current.isRunning).toBe(false);
      });

      // Should reach betting strategy validation
      expect(global.alert).toHaveBeenCalledWith(
        expect.stringContaining('Betting strategy validation failed')
      );
    });
  });

  describe('edge cases', () => {
    it('should handle minimal valid configuration', async () => {
      const { result } = renderHook(() => useSimulation());
      
      const minimalConfig: SimulationConfig = {
        numberOfDecks: 1,
        deckPenetration: 25,
        playerBet: 1,
        dealerHitsOnSoft17: false,
        playerCanDouble: false,
        playerCanSplit: false,
        playerCanSurrender: false,
        numberOfSimulations: 1,
        enableHandTracking: false,
        bettingTable: [
          { minCount: -99, maxCount: 99, betAmount: 1 }, // Single range covering everything
        ],
        countingSystem: 'HI_LO',
        resplitAces: false,
        doubleAfterSplit: false,
        handsPerHour: 1,
      };

      await act(async () => {
        result.current.runSimulation(minimalConfig);
      });

      await waitFor(() => {
        expect(result.current.isRunning).toBe(false);
      });

      expect(result.current.results).not.toBe(null);
      expect(global.alert).not.toHaveBeenCalled();
    });
  });
});