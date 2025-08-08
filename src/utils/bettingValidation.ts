/**
 * Comprehensive betting strategy validation logic
 * Validates range coverage, gaps, overlaps, and ordering
 */

import type { BetRow } from '../types/blackjack';
import type {
  BettingStrategyError,
  BettingStrategyErrorType,
  BettingStrategyValidationResult,
  ValidationOptions,
} from '../types/validation';
import { DEFAULT_VALIDATION_OPTIONS } from '../types/validation';
import { BettingTableSchema } from '../schemas/simulationSchema';

/**
 * Creates a betting strategy error with consistent formatting
 */
function createError(
  type: BettingStrategyErrorType,
  message: string,
  technicalDetails: string,
  rangeIndex?: number,
  suggestedFix?: string
): BettingStrategyError {
  return {
    type,
    message,
    technicalDetails,
    rangeIndex,
    suggestedFix,
  };
}

/**
 * Validates that betting table ranges are properly ordered by minCount
 */
function validateRangeOrdering(bettingTable: BetRow[]): BettingStrategyError[] {
  const errors: BettingStrategyError[] = [];
  
  for (let i = 1; i < bettingTable.length; i++) {
    const current = bettingTable[i];
    const previous = bettingTable[i - 1];
    
    if (current.minCount <= previous.minCount) {
      errors.push(createError(
        'INVALID_ORDERING',
        `Betting ranges must be ordered by minCount. Range at index ${i} has minCount ${current.minCount} which is not greater than previous range's minCount ${previous.minCount}.`,
        `Range[${i}].minCount (${current.minCount}) <= Range[${i-1}].minCount (${previous.minCount})`,
        i,
        `Ensure ranges are sorted in ascending order by minCount. Consider reordering or adjusting the minCount values.`
      ));
    }
  }
  
  return errors;
}

/**
 * Validates that there are no gaps between consecutive ranges
 */
function validateRangeGaps(bettingTable: BetRow[]): BettingStrategyError[] {
  const errors: BettingStrategyError[] = [];
  
  for (let i = 0; i < bettingTable.length - 1; i++) {
    const current = bettingTable[i];
    const next = bettingTable[i + 1];
    
    if (current.maxCount !== next.minCount) {
      const gapSize = next.minCount - current.maxCount;
      const gapDescription = gapSize > 0 
        ? `Gap of ${gapSize} counts between ranges`
        : `Overlap of ${Math.abs(gapSize)} counts between ranges`;
        
      errors.push(createError(
        'RANGE_GAP',
        `Range gap detected between index ${i} and ${i + 1}. Range [${current.minCount}, ${current.maxCount}) ends at ${current.maxCount} but next range [${next.minCount}, ${next.maxCount}) starts at ${next.minCount}. ${gapDescription}.`,
        `Range[${i}].maxCount (${current.maxCount}) != Range[${i+1}].minCount (${next.minCount})`,
        i,
        `Adjust maxCount of range ${i} to ${next.minCount} or minCount of range ${i + 1} to ${current.maxCount} to eliminate the gap.`
      ));
    }
  }
  
  return errors;
}

/**
 * Validates that ranges do not overlap (this is actually covered by gap validation now)
 * This function serves as a double-check and provides more specific overlap messaging
 */
function validateRangeOverlaps(bettingTable: BetRow[]): BettingStrategyError[] {
  const errors: BettingStrategyError[] = [];
  
  // Check for overlaps within individual ranges (malformed ranges)
  for (let i = 0; i < bettingTable.length; i++) {
    const range = bettingTable[i];
    if (range.minCount >= range.maxCount) {
      errors.push(createError(
        'INVALID_RANGE',
        `Invalid range at index ${i}: minCount (${range.minCount}) must be less than maxCount (${range.maxCount}).`,
        `Range[${i}]: minCount (${range.minCount}) >= maxCount (${range.maxCount})`,
        i,
        `Adjust the range so that minCount < maxCount. For example, change to minCount: ${range.maxCount - 1}, maxCount: ${range.maxCount}.`
      ));
    }
  }
  
  // Check for overlaps between adjacent ranges (this should be caught by gap validation)
  for (let i = 0; i < bettingTable.length - 1; i++) {
    const current = bettingTable[i];
    const next = bettingTable[i + 1];
    
    // If current.maxCount > next.minCount, there's an overlap
    if (current.maxCount > next.minCount) {
      const overlapStart = Math.max(current.minCount, next.minCount);
      const overlapEnd = Math.min(current.maxCount, next.maxCount);
      
      errors.push(createError(
        'RANGE_OVERLAP',
        `Range overlap detected between index ${i} and ${i + 1}. Range [${current.minCount}, ${current.maxCount}) overlaps with range [${next.minCount}, ${next.maxCount}) in the interval [${overlapStart}, ${overlapEnd}).`,
        `Range[${i}].maxCount (${current.maxCount}) > Range[${i+1}].minCount (${next.minCount})`,
        i,
        `Adjust range ${i} maxCount to ${next.minCount} or range ${i + 1} minCount to ${current.maxCount} to eliminate overlap.`
      ));
    }
  }
  
  return errors;
}

/**
 * Validates that the betting table provides complete coverage over the required range
 */
function validateCoverage(
  bettingTable: BetRow[], 
  options: ValidationOptions
): { errors: BettingStrategyError[]; coverage: { minCoverage: number; maxCoverage: number; hasFullCoverage: boolean } } {
  const errors: BettingStrategyError[] = [];
  
  if (bettingTable.length === 0) {
    return {
      errors: [createError(
        'EMPTY_BETTING_TABLE',
        'Betting table is empty and cannot provide any coverage.',
        'bettingTable.length === 0',
        undefined,
        'Add at least one betting range to cover the expected true count values.'
      )],
      coverage: { minCoverage: 0, maxCoverage: 0, hasFullCoverage: false }
    };
  }
  
  // Calculate actual coverage
  const minCoverage = bettingTable[0].minCount;
  const maxCoverage = bettingTable[bettingTable.length - 1].maxCount;
  
  // Check minimum coverage
  if (minCoverage > options.minRequiredCoverage) {
    errors.push(createError(
      'INSUFFICIENT_COVERAGE',
      `Insufficient minimum coverage: First range starts at ${minCoverage} but should start at ${options.minRequiredCoverage} or lower for complete coverage.`,
      `minCoverage (${minCoverage}) > minRequiredCoverage (${options.minRequiredCoverage})`,
      0,
      `Change the first range's minCount from ${minCoverage} to ${options.minRequiredCoverage} or lower.`
    ));
  }
  
  // Check maximum coverage
  if (maxCoverage < options.maxRequiredCoverage) {
    errors.push(createError(
      'INSUFFICIENT_COVERAGE',
      `Insufficient maximum coverage: Last range ends at ${maxCoverage} but should end at ${options.maxRequiredCoverage} or higher for complete coverage.`,
      `maxCoverage (${maxCoverage}) < maxRequiredCoverage (${options.maxRequiredCoverage})`,
      bettingTable.length - 1,
      `Change the last range's maxCount from ${maxCoverage} to ${options.maxRequiredCoverage} or higher.`
    ));
  }
  
  const hasFullCoverage = minCoverage <= options.minRequiredCoverage && maxCoverage >= options.maxRequiredCoverage;
  
  return {
    errors,
    coverage: { minCoverage, maxCoverage, hasFullCoverage }
  };
}

/**
 * Validates bet amounts are positive and reasonable
 */
function validateBetAmounts(bettingTable: BetRow[]): BettingStrategyError[] {
  const errors: BettingStrategyError[] = [];
  
  for (let i = 0; i < bettingTable.length; i++) {
    const range = bettingTable[i];
    
    if (range.betAmount <= 0) {
      errors.push(createError(
        'INVALID_BET_AMOUNT',
        `Invalid bet amount at index ${i}: Bet amount (${range.betAmount}) must be positive.`,
        `Range[${i}].betAmount (${range.betAmount}) <= 0`,
        i,
        `Change betAmount to a positive value, e.g., $5 or $10.`
      ));
    }
  }
  
  return errors;
}

/**
 * Comprehensive betting strategy validation
 * 
 * @param bettingTable - Array of betting ranges to validate
 * @param options - Validation options (coverage requirements, etc.)
 * @returns Detailed validation result with errors, warnings, and coverage info
 */
export function validateBettingStrategy(
  bettingTable: BetRow[],
  options: ValidationOptions = DEFAULT_VALIDATION_OPTIONS
): BettingStrategyValidationResult {
  const allErrors: BettingStrategyError[] = [];
  const warnings: BettingStrategyError[] = [];
  
  // First, validate basic schema structure
  try {
    BettingTableSchema.parse(bettingTable);
  } catch (zodError: any) {
    // Convert Zod errors to our format
    if (zodError.errors) {
      for (const error of zodError.errors) {
        allErrors.push(createError(
          'INVALID_RANGE',
          `Schema validation error: ${error.message}`,
          `Path: ${error.path.join('.')}, Value: ${JSON.stringify(error.received)}`,
          typeof error.path[0] === 'number' ? error.path[0] : undefined,
          'Ensure all betting table entries have valid minCount, maxCount, and betAmount values.'
        ));
      }
    }
  }
  
  // If basic structure is invalid, don't proceed with business logic validation
  if (allErrors.length > 0) {
    return {
      isValid: false,
      errors: allErrors,
      warnings: [],
      coverage: { minCoverage: 0, maxCoverage: 0, hasFullCoverage: false }
    };
  }
  
  // Business logic validation
  allErrors.push(...validateRangeOrdering(bettingTable));
  allErrors.push(...validateRangeOverlaps(bettingTable));
  allErrors.push(...validateBetAmounts(bettingTable));
  allErrors.push(...validateRangeGaps(bettingTable));
  
  // Coverage validation
  const coverageResult = validateCoverage(bettingTable, options);
  allErrors.push(...coverageResult.errors);
  
  // Determine if valid
  const hasErrors = allErrors.length > 0;
  const hasWarnings = warnings.length > 0;
  const isValid = !hasErrors && (!options.strictMode || !hasWarnings);
  
  return {
    isValid,
    errors: allErrors,
    warnings,
    coverage: coverageResult.coverage
  };
}

/**
 * Quick validation check that returns just a boolean
 * Useful for simple validation scenarios
 */
export function isValidBettingStrategy(
  bettingTable: BetRow[],
  options: ValidationOptions = DEFAULT_VALIDATION_OPTIONS
): boolean {
  return validateBettingStrategy(bettingTable, options).isValid;
}

/**
 * Gets a human-readable summary of validation results
 */
export function getValidationSummary(result: BettingStrategyValidationResult): string {
  if (result.isValid) {
    return `✅ Betting strategy is valid with complete coverage from ${result.coverage.minCoverage} to ${result.coverage.maxCoverage}.`;
  }
  
  const errorCount = result.errors.length;
  const warningCount = result.warnings.length;
  
  let summary = `❌ Betting strategy validation failed with ${errorCount} error(s)`;
  if (warningCount > 0) {
    summary += ` and ${warningCount} warning(s)`;
  }
  summary += '.';
  
  if (result.errors.length > 0) {
    summary += '\n\nErrors:\n';
    summary += result.errors.map((error, index) => `${index + 1}. ${error.message}`).join('\n');
  }
  
  if (result.warnings.length > 0) {
    summary += '\n\nWarnings:\n';
    summary += result.warnings.map((warning, index) => `${index + 1}. ${warning.message}`).join('\n');
  }
  
  return summary;
}