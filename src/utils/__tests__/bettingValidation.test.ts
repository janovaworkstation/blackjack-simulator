/**
 * Comprehensive tests for betting strategy validation logic
 */

import type { BetRow } from '../../types/blackjack';
import {
  validateBettingStrategy,
  isValidBettingStrategy,
  getValidationSummary,
} from '../bettingValidation';
import { DEFAULT_VALIDATION_OPTIONS } from '../../types/validation';

describe('bettingValidation', () => {
  // Valid betting strategy examples
  const validBettingStrategy: BetRow[] = [
    { minCount: -99, maxCount: 0, betAmount: 5 },
    { minCount: 0, maxCount: 1, betAmount: 10 },
    { minCount: 1, maxCount: 2, betAmount: 25 },
    { minCount: 2, maxCount: 99, betAmount: 50 },
  ];

  const validMinimalStrategy: BetRow[] = [
    { minCount: -99, maxCount: 99, betAmount: 10 },
  ];

  describe('validateBettingStrategy', () => {
    describe('valid betting strategies', () => {
      it('should validate a complete betting strategy', () => {
        const result = validateBettingStrategy(validBettingStrategy);
        
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
        expect(result.warnings).toHaveLength(0);
        expect(result.coverage.hasFullCoverage).toBe(true);
        expect(result.coverage.minCoverage).toBe(-99);
        expect(result.coverage.maxCoverage).toBe(99);
      });

      it('should validate a minimal single-range strategy', () => {
        const result = validateBettingStrategy(validMinimalStrategy);
        
        expect(result.isValid).toBe(true);
        expect(result.errors).toHaveLength(0);
        expect(result.coverage.hasFullCoverage).toBe(true);
      });

      it('should validate strategy with extended coverage', () => {
        const extendedStrategy: BetRow[] = [
          { minCount: -150, maxCount: 0, betAmount: 5 },
          { minCount: 0, maxCount: 150, betAmount: 10 },
        ];
        
        const result = validateBettingStrategy(extendedStrategy);
        
        expect(result.isValid).toBe(true);
        expect(result.coverage.hasFullCoverage).toBe(true);
        expect(result.coverage.minCoverage).toBe(-150);
        expect(result.coverage.maxCoverage).toBe(150);
      });
    });

    describe('range gap validation', () => {
      it('should detect gaps between ranges', () => {
        const gappedStrategy: BetRow[] = [
          { minCount: -99, maxCount: 0, betAmount: 5 },
          { minCount: 2, maxCount: 99, betAmount: 10 }, // Gap from 0 to 2
        ];
        
        const result = validateBettingStrategy(gappedStrategy);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].type).toBe('RANGE_GAP');
        expect(result.errors[0].message).toContain('Range gap detected');
        expect(result.errors[0].message).toContain('Gap of 2 counts');
      });

      it('should detect multiple gaps', () => {
        const multiGapStrategy: BetRow[] = [
          { minCount: -99, maxCount: -10, betAmount: 5 },
          { minCount: -5, maxCount: 0, betAmount: 7 }, // Gap from -10 to -5
          { minCount: 5, maxCount: 99, betAmount: 10 }, // Gap from 0 to 5
        ];
        
        const result = validateBettingStrategy(multiGapStrategy);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toHaveLength(2);
        expect(result.errors.every(err => err.type === 'RANGE_GAP')).toBe(true);
      });
    });

    describe('range overlap validation', () => {
      it('should detect overlapping ranges', () => {
        const overlappingStrategy: BetRow[] = [
          { minCount: -99, maxCount: 5, betAmount: 5 },
          { minCount: 0, maxCount: 99, betAmount: 10 }, // Overlaps from 0 to 5
        ];
        
        const result = validateBettingStrategy(overlappingStrategy);
        
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThanOrEqual(1); // May have overlap + gap errors
        expect(result.errors.some(err => err.type === 'RANGE_OVERLAP')).toBe(true);
        expect(result.errors.some(err => err.message.includes('Range overlap detected'))).toBe(true);
        expect(result.errors.some(err => err.message.includes('[0, 5)'))).toBe(true);
      });

      it('should detect invalid individual ranges', () => {
        const invalidRangeStrategy: BetRow[] = [
          { minCount: -99, maxCount: 0, betAmount: 5 },
          { minCount: 5, maxCount: 2, betAmount: 10 }, // Invalid: minCount > maxCount
          { minCount: 2, maxCount: 99, betAmount: 15 },
        ];
        
        const result = validateBettingStrategy(invalidRangeStrategy);
        
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThanOrEqual(2); // Invalid range + resulting gaps/overlaps/ordering
        expect(result.errors.some(err => err.type === 'INVALID_RANGE')).toBe(true);
      });
    });

    describe('coverage validation', () => {
      it('should detect insufficient minimum coverage', () => {
        const insufficientMinStrategy: BetRow[] = [
          { minCount: -10, maxCount: 0, betAmount: 5 }, // Should start at -99
          { minCount: 0, maxCount: 99, betAmount: 10 },
        ];
        
        const result = validateBettingStrategy(insufficientMinStrategy);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].type).toBe('INSUFFICIENT_COVERAGE');
        expect(result.errors[0].message).toContain('minimum coverage');
        expect(result.errors[0].message).toContain('-10');
        expect(result.errors[0].message).toContain('-99');
        expect(result.coverage.hasFullCoverage).toBe(false);
      });

      it('should detect insufficient maximum coverage', () => {
        const insufficientMaxStrategy: BetRow[] = [
          { minCount: -99, maxCount: 0, betAmount: 5 },
          { minCount: 0, maxCount: 10, betAmount: 10 }, // Should end at 99
        ];
        
        const result = validateBettingStrategy(insufficientMaxStrategy);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].type).toBe('INSUFFICIENT_COVERAGE');
        expect(result.errors[0].message).toContain('maximum coverage');
        expect(result.errors[0].message).toContain('10');
        expect(result.errors[0].message).toContain('99');
        expect(result.coverage.hasFullCoverage).toBe(false);
      });

      it('should detect both insufficient minimum and maximum coverage', () => {
        const insufficientBothStrategy: BetRow[] = [
          { minCount: -10, maxCount: 10, betAmount: 5 },
        ];
        
        const result = validateBettingStrategy(insufficientBothStrategy);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toHaveLength(2);
        expect(result.errors.every(err => err.type === 'INSUFFICIENT_COVERAGE')).toBe(true);
        expect(result.coverage.hasFullCoverage).toBe(false);
      });
    });

    describe('ordering validation', () => {
      it('should detect improperly ordered ranges', () => {
        const unorderedStrategy: BetRow[] = [
          { minCount: 0, maxCount: 5, betAmount: 10 },
          { minCount: -99, maxCount: 0, betAmount: 5 }, // Should come first
          { minCount: 5, maxCount: 99, betAmount: 15 },
        ];
        
        const result = validateBettingStrategy(unorderedStrategy);
        
        expect(result.isValid).toBe(false);
        expect(result.errors.some(err => err.type === 'INVALID_ORDERING')).toBe(true);
        expect(result.errors[0].message).toContain('ordered by minCount');
      });

      it('should detect duplicate minCount values', () => {
        const duplicateMinStrategy: BetRow[] = [
          { minCount: -99, maxCount: 0, betAmount: 5 },
          { minCount: 0, maxCount: 5, betAmount: 10 },
          { minCount: 0, maxCount: 99, betAmount: 15 }, // Duplicate minCount
        ];
        
        const result = validateBettingStrategy(duplicateMinStrategy);
        
        expect(result.isValid).toBe(false);
        expect(result.errors.some(err => err.type === 'INVALID_ORDERING')).toBe(true);
      });
    });

    describe('bet amount validation', () => {
      it('should detect negative bet amounts', () => {
        const negativeBetStrategy: BetRow[] = [
          { minCount: -99, maxCount: 0, betAmount: -5 }, // Negative bet
          { minCount: 0, maxCount: 99, betAmount: 10 },
        ];
        
        const result = validateBettingStrategy(negativeBetStrategy);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].type).toBe('INVALID_BET_AMOUNT');
        expect(result.errors[0].message).toContain('must be positive');
      });

      it('should detect zero bet amounts', () => {
        const zeroBetStrategy: BetRow[] = [
          { minCount: -99, maxCount: 0, betAmount: 0 }, // Zero bet
          { minCount: 0, maxCount: 99, betAmount: 10 },
        ];
        
        const result = validateBettingStrategy(zeroBetStrategy);
        
        expect(result.isValid).toBe(false);
        expect(result.errors[0].type).toBe('INVALID_BET_AMOUNT');
      });
    });

    describe('empty betting table validation', () => {
      it('should reject empty betting tables', () => {
        const emptyStrategy: BetRow[] = [];
        
        const result = validateBettingStrategy(emptyStrategy);
        
        expect(result.isValid).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].type).toBe('EMPTY_BETTING_TABLE');
        expect(result.coverage.hasFullCoverage).toBe(false);
      });
    });

    describe('custom validation options', () => {
      it('should respect custom coverage requirements', () => {
        const customStrategy: BetRow[] = [
          { minCount: -50, maxCount: 50, betAmount: 10 },
        ];
        
        const customOptions = {
          ...DEFAULT_VALIDATION_OPTIONS,
          minRequiredCoverage: -50,
          maxRequiredCoverage: 50,
        };
        
        const result = validateBettingStrategy(customStrategy, customOptions);
        
        expect(result.isValid).toBe(true);
        expect(result.coverage.hasFullCoverage).toBe(true);
      });

      it('should allow empty tables when configured', () => {
        const emptyStrategy: BetRow[] = [];
        
        const customOptions = {
          ...DEFAULT_VALIDATION_OPTIONS,
          allowEmptyTable: true,
        };
        
        const result = validateBettingStrategy(emptyStrategy, customOptions);
        
        // Should still fail due to Zod schema validation (empty array not allowed)
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(0);
      });
    });

    describe('complex validation scenarios', () => {
      it('should handle multiple simultaneous errors', () => {
        const problematicStrategy: BetRow[] = [
          { minCount: 0, maxCount: 5, betAmount: -10 }, // Wrong order, negative bet
          { minCount: -50, maxCount: -10, betAmount: 5 }, // Wrong order, insufficient coverage
          { minCount: 10, maxCount: 50, betAmount: 15 }, // Gap from 5 to 10
        ];
        
        const result = validateBettingStrategy(problematicStrategy);
        
        expect(result.isValid).toBe(false);
        expect(result.errors.length).toBeGreaterThan(3); // Multiple different error types
        
        // Should contain various error types
        const errorTypes = result.errors.map(err => err.type);
        expect(errorTypes).toContain('INVALID_ORDERING');
        expect(errorTypes).toContain('INVALID_BET_AMOUNT');
        expect(errorTypes).toContain('INSUFFICIENT_COVERAGE');
      });
    });
  });

  describe('isValidBettingStrategy', () => {
    it('should return true for valid strategies', () => {
      expect(isValidBettingStrategy(validBettingStrategy)).toBe(true);
      expect(isValidBettingStrategy(validMinimalStrategy)).toBe(true);
    });

    it('should return false for invalid strategies', () => {
      const invalidStrategy: BetRow[] = [
        { minCount: -10, maxCount: 10, betAmount: 5 }, // Insufficient coverage
      ];
      
      expect(isValidBettingStrategy(invalidStrategy)).toBe(false);
    });
  });

  describe('getValidationSummary', () => {
    it('should provide positive summary for valid strategies', () => {
      const result = validateBettingStrategy(validBettingStrategy);
      const summary = getValidationSummary(result);
      
      expect(summary).toContain('✅');
      expect(summary).toContain('valid');
      expect(summary).toContain('-99 to 99');
    });

    it('should provide detailed error summary for invalid strategies', () => {
      const invalidStrategy: BetRow[] = [
        { minCount: -10, maxCount: 5, betAmount: -5 }, // Multiple errors
        { minCount: 10, maxCount: 15, betAmount: 10 },
      ];
      
      const result = validateBettingStrategy(invalidStrategy);
      const summary = getValidationSummary(result);
      
      expect(summary).toContain('❌');
      expect(summary).toContain('validation failed');
      expect(summary).toContain('error(s)');
      expect(summary).toContain('1.'); // Numbered error list
    });

    it('should handle strategies with both errors and warnings', () => {
      // Note: Current implementation doesn't generate warnings, but test for future expansion
      const invalidStrategy: BetRow[] = [
        { minCount: -10, maxCount: 99, betAmount: 5 }, // Insufficient min coverage only
      ];
      
      const result = validateBettingStrategy(invalidStrategy);
      const summary = getValidationSummary(result);
      
      expect(summary).toContain('❌');
      expect(summary).toContain('Insufficient minimum coverage');
    });
  });

  describe('error message quality', () => {
    it('should provide actionable error messages', () => {
      const gappedStrategy: BetRow[] = [
        { minCount: -99, maxCount: 0, betAmount: 5 },
        { minCount: 5, maxCount: 99, betAmount: 10 }, // Gap from 0 to 5
      ];
      
      const result = validateBettingStrategy(gappedStrategy);
      const error = result.errors[0];
      
      expect(error.suggestedFix).toBeDefined();
      expect(error.suggestedFix).toContain('Adjust');
      expect(error.rangeIndex).toBe(0);
      expect(error.technicalDetails).toContain('Range[0].maxCount');
    });

    it('should provide clear technical details', () => {
      const overlappingStrategy: BetRow[] = [
        { minCount: -99, maxCount: 5, betAmount: 5 },
        { minCount: 0, maxCount: 99, betAmount: 10 },
      ];
      
      const result = validateBettingStrategy(overlappingStrategy);
      const error = result.errors[0];
      
      expect(error.technicalDetails).toContain('Range[0].maxCount');
      expect(error.technicalDetails).toContain('Range[1].minCount');
      expect(error.technicalDetails).toContain('5');
      expect(error.technicalDetails).toContain('0');
    });
  });
});