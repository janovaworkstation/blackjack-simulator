/**
 * useStrategyManager Hook
 * Manages strategy CRUD operations, localStorage persistence, and strategy utilities
 */

import { useState, useEffect, useCallback } from 'react';
import {
  Strategy,
  StrategyStorage,
  ValidationResult,
  StrategyComparison,
  SimulationResults,
  SimulationConfig,
  BetRow,
  CountingSystemType
} from '../types/blackjack';
import {
  validateStrategyProfitability,
  createStrategyFromSimulation,
  compareStrategies,
  calculateStrategyScore
} from '../utils/strategyUtils';

const STRATEGY_STORAGE_KEY = 'blackjack_strategies';
const STORAGE_VERSION = '1.0.0';

export function useStrategyManager() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load strategies from localStorage on mount
  useEffect(() => {
    loadStrategiesFromStorage();
  }, []);

  /**
   * Load all strategies from localStorage
   */
  const loadStrategiesFromStorage = useCallback(() => {
    try {
      setIsLoading(true);
      const stored = localStorage.getItem(STRATEGY_STORAGE_KEY);
      
      if (stored) {
        const data: StrategyStorage = JSON.parse(stored);
        
        // Convert date strings back to Date objects
        const strategiesArray = Object.values(data.strategies).map(strategy => ({
          ...strategy,
          createdAt: new Date(strategy.createdAt),
          lastModified: new Date(strategy.lastModified)
        }));
        
        setStrategies(strategiesArray);
      } else {
        // Initialize empty storage
        const emptyStorage: StrategyStorage = {
          strategies: {},
          metadata: {
            version: STORAGE_VERSION,
            lastModified: new Date(),
            totalStrategies: 0
          }
        };
        localStorage.setItem(STRATEGY_STORAGE_KEY, JSON.stringify(emptyStorage));
        setStrategies([]);
      }
    } catch (err) {
      setError(`Failed to load strategies: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setStrategies([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Save strategies to localStorage
   */
  const saveStrategiesToStorage = useCallback((strategiesToSave: Strategy[]) => {
    try {
      const strategyMap = strategiesToSave.reduce((map, strategy) => {
        map[strategy.id] = strategy;
        return map;
      }, {} as { [id: string]: Strategy });

      const storageData: StrategyStorage = {
        strategies: strategyMap,
        metadata: {
          version: STORAGE_VERSION,
          lastModified: new Date(),
          totalStrategies: strategiesToSave.length
        }
      };

      localStorage.setItem(STRATEGY_STORAGE_KEY, JSON.stringify(storageData));
      setError(null);
    } catch (err) {
      setError(`Failed to save strategies: ${err instanceof Error ? err.message : 'Unknown error'}`);
      throw err;
    }
  }, []);

  /**
   * Create a new strategy from simulation results
   */
  const createStrategy = useCallback(async (
    simulationResults: SimulationResults,
    config: SimulationConfig,
    bettingTable: BetRow[],
    countingSystem: CountingSystemType,
    name: string,
    description?: string
  ): Promise<Strategy> => {
    try {
      const strategy = createStrategyFromSimulation(
        simulationResults,
        config,
        bettingTable,
        countingSystem,
        name,
        description
      );

      const updatedStrategies = [...strategies, strategy];
      setStrategies(updatedStrategies);
      saveStrategiesToStorage(updatedStrategies);

      return strategy;
    } catch (err) {
      setError(`Failed to create strategy: ${err instanceof Error ? err.message : 'Unknown error'}`);
      throw err;
    }
  }, [strategies, saveStrategiesToStorage]);

  /**
   * Save or update an existing strategy
   */
  const saveStrategy = useCallback(async (strategy: Strategy): Promise<void> => {
    try {
      const existingIndex = strategies.findIndex(s => s.id === strategy.id);
      let updatedStrategies: Strategy[];

      if (existingIndex >= 0) {
        // Update existing strategy
        updatedStrategies = [...strategies];
        updatedStrategies[existingIndex] = { ...strategy, lastModified: new Date() };
      } else {
        // Add new strategy
        updatedStrategies = [...strategies, strategy];
      }

      setStrategies(updatedStrategies);
      saveStrategiesToStorage(updatedStrategies);
    } catch (err) {
      setError(`Failed to save strategy: ${err instanceof Error ? err.message : 'Unknown error'}`);
      throw err;
    }
  }, [strategies, saveStrategiesToStorage]);

  /**
   * Load a specific strategy by ID
   */
  const loadStrategy = useCallback(async (id: string): Promise<Strategy | null> => {
    const strategy = strategies.find(s => s.id === id);
    return strategy || null;
  }, [strategies]);

  /**
   * Delete a strategy by ID
   */
  const deleteStrategy = useCallback(async (id: string): Promise<void> => {
    try {
      const updatedStrategies = strategies.filter(s => s.id !== id);
      setStrategies(updatedStrategies);
      saveStrategiesToStorage(updatedStrategies);
      
      // Clear selection if deleted strategy was selected
      if (selectedStrategy?.id === id) {
        setSelectedStrategy(null);
      }
    } catch (err) {
      setError(`Failed to delete strategy: ${err instanceof Error ? err.message : 'Unknown error'}`);
      throw err;
    }
  }, [strategies, selectedStrategy, saveStrategiesToStorage]);

  /**
   * Update an existing strategy
   */
  const updateStrategy = useCallback(async (strategy: Strategy): Promise<void> => {
    await saveStrategy(strategy);
  }, [saveStrategy]);

  /**
   * Get all strategies
   */
  const getAllStrategies = useCallback((): Strategy[] => {
    return [...strategies];
  }, [strategies]);

  /**
   * Get strategies sorted by performance metric
   */
  const getStrategiesByPerformance = useCallback((sortBy: 'roi' | 'winRate' | 'drawdown' | 'score'): Strategy[] => {
    return [...strategies].sort((a, b) => {
      switch (sortBy) {
        case 'roi':
          return b.performance.roiPercentage - a.performance.roiPercentage;
        case 'winRate':
          return b.performance.winPercentage - a.performance.winPercentage;
        case 'drawdown':
          return a.performance.maxDrawdown - b.performance.maxDrawdown; // Lower is better
        case 'score':
          return calculateStrategyScore(b) - calculateStrategyScore(a);
        default:
          return 0;
      }
    });
  }, [strategies]);

  /**
   * Search strategies by name or description
   */
  const searchStrategies = useCallback((query: string): Strategy[] => {
    if (!query.trim()) return strategies;
    
    const lowerQuery = query.toLowerCase();
    return strategies.filter(strategy => 
      strategy.name.toLowerCase().includes(lowerQuery) ||
      (strategy.description && strategy.description.toLowerCase().includes(lowerQuery)) ||
      strategy.simulationConfig.countingSystem.toLowerCase().includes(lowerQuery)
    );
  }, [strategies]);

  /**
   * Validate a strategy's profitability
   */
  const validateStrategy = useCallback((results: SimulationResults): ValidationResult => {
    return validateStrategyProfitability(results);
  }, []);

  /**
   * Compare two strategies
   */
  const compareStrategiesFunc = useCallback((strategy1: Strategy, strategy2: Strategy): StrategyComparison => {
    return compareStrategies(strategy1, strategy2);
  }, []);

  /**
   * Export a strategy as JSON string
   */
  const exportStrategy = useCallback((strategy: Strategy): string => {
    return JSON.stringify(strategy, null, 2);
  }, []);

  /**
   * Import a strategy from JSON string
   */
  const importStrategy = useCallback(async (jsonString: string): Promise<Strategy> => {
    try {
      const strategy: Strategy = JSON.parse(jsonString);
      
      // Validate required fields
      if (!strategy.id || !strategy.name || !strategy.simulationConfig) {
        throw new Error('Invalid strategy format: missing required fields');
      }
      
      // Convert date strings to Date objects
      strategy.createdAt = new Date(strategy.createdAt);
      strategy.lastModified = new Date(strategy.lastModified);
      
      // Check if strategy already exists
      const existingStrategy = strategies.find(s => s.id === strategy.id);
      if (existingStrategy) {
        throw new Error('Strategy with this ID already exists');
      }
      
      await saveStrategy(strategy);
      return strategy;
    } catch (err) {
      setError(`Failed to import strategy: ${err instanceof Error ? err.message : 'Invalid JSON format'}`);
      throw err;
    }
  }, [strategies, saveStrategy]);

  /**
   * Export all strategies as JSON string
   */
  const exportAllStrategies = useCallback((): string => {
    return JSON.stringify(strategies, null, 2);
  }, [strategies]);

  /**
   * Get strategy statistics
   */
  const getStrategyStats = useCallback(() => {
    const totalStrategies = strategies.length;
    const avgROI = strategies.length > 0 
      ? strategies.reduce((sum, s) => sum + s.performance.roiPercentage, 0) / strategies.length 
      : 0;
    const bestStrategy = strategies.length > 0 
      ? getStrategiesByPerformance('score')[0] 
      : null;
    
    return {
      totalStrategies,
      avgROI,
      bestStrategy,
      countingSystems: [...new Set(strategies.map(s => s.simulationConfig.countingSystem))],
    };
  }, [strategies, getStrategiesByPerformance]);

  return {
    // Core CRUD operations
    createStrategy,
    saveStrategy,
    loadStrategy,
    deleteStrategy,
    updateStrategy,
    
    // Strategy management
    getAllStrategies,
    getStrategiesByPerformance,
    searchStrategies,
    
    // Validation utilities
    validateStrategy,
    compareStrategies: compareStrategiesFunc,
    
    // Import/Export
    exportStrategy,
    importStrategy,
    exportAllStrategies,
    
    // Statistics
    getStrategyStats,
    
    // State
    strategies,
    selectedStrategy,
    setSelectedStrategy,
    isLoading,
    error,
    clearError: () => setError(null),
    
    // Utility
    refreshStrategies: loadStrategiesFromStorage,
  };
}