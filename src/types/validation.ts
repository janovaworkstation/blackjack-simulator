/**
 * Validation error types and interfaces for simulation configuration validation
 */

/**
 * Specific types of betting strategy validation errors
 */
export type BettingStrategyErrorType = 
  | 'RANGE_GAP'
  | 'RANGE_OVERLAP' 
  | 'INSUFFICIENT_COVERAGE'
  | 'INVALID_ORDERING'
  | 'INVALID_BET_AMOUNT'
  | 'EMPTY_BETTING_TABLE'
  | 'INVALID_RANGE';

/**
 * Detailed betting strategy validation error
 */
export interface BettingStrategyError {
  type: BettingStrategyErrorType;
  message: string;
  technicalDetails: string;
  rangeIndex?: number;
  suggestedFix?: string;
}

/**
 * Result of betting strategy validation
 */
export interface BettingStrategyValidationResult {
  isValid: boolean;
  errors: BettingStrategyError[];
  warnings: BettingStrategyError[];
  coverage: {
    minCoverage: number;
    maxCoverage: number;
    hasFullCoverage: boolean;
  };
}

/**
 * Comprehensive simulation configuration validation result
 */
export interface SimulationConfigValidationResult {
  isValid: boolean;
  bettingStrategy: BettingStrategyValidationResult;
  generalErrors: string[];
}

/**
 * Validation configuration options
 */
export interface ValidationOptions {
  /** Minimum count that must be covered (default: -99) */
  minRequiredCoverage: number;
  /** Maximum count that must be covered (default: 99) */
  maxRequiredCoverage: number;
  /** Whether to treat warnings as errors (default: false) */
  strictMode: boolean;
  /** Whether to allow empty betting tables (default: false) */
  allowEmptyTable: boolean;
}

/**
 * Default validation options
 */
export const DEFAULT_VALIDATION_OPTIONS: ValidationOptions = {
  minRequiredCoverage: -99,
  maxRequiredCoverage: 99,
  strictMode: false,
  allowEmptyTable: false,
};