/**
 * Strategy validation and management utilities
 * Handles strategy creation, validation, and performance analysis
 */

import { 
  SimulationResults, 
  SimulationConfig,
  BetRow,
  CountingSystemType,
  Strategy,
  StrategyPerformance,
  ValidationResult,
  CoachingConfiguration,
  StrategyComparison 
} from '../types/blackjack';

/**
 * Validates if simulation results meet minimum profitability criteria for strategy creation
 */
export function validateStrategyProfitability(results: SimulationResults): ValidationResult {
  const validationErrors: string[] = [];
  const recommendedImprovements: string[] = [];
  
  // Calculate ROI percentage
  const roi = results.expectedValue;
  const winRate = results.winPercentage;
  const handsCount = results.handsPlayed;
  
  // Validation criteria (adjusted for realistic blackjack performance)
  const meetsMinROI = roi >= 0.1; // 0.1% positive EV is good for blackjack
  const meetsMinWinRate = winRate >= 42.0; // Typical blackjack win rate with strategy
  const hasStatisticalSignificance = handsCount >= 50000; // Minimum for confidence
  
  // Collect validation errors
  if (!meetsMinROI) {
    validationErrors.push(`ROI too low: ${roi.toFixed(2)}% (minimum 0.1% required)`);
    recommendedImprovements.push('Increase bet spread or improve betting strategy');
  }
  
  if (!meetsMinWinRate) {
    validationErrors.push(`Win rate too low: ${winRate.toFixed(1)}% (minimum 42.0% required)`);
    recommendedImprovements.push('Review basic strategy adherence or game rules');
  }
  
  if (!hasStatisticalSignificance) {
    validationErrors.push(`Insufficient sample size: ${handsCount.toLocaleString()} hands (minimum 50,000 required)`);
    recommendedImprovements.push('Run simulation with more hands for statistical significance');
  }
  
  const isProfitable = meetsMinROI && meetsMinWinRate && hasStatisticalSignificance;
  
  return {
    isProfitable,
    meetsMinROI,
    meetsMinWinRate,
    hasStatisticalSignificance,
    validationErrors,
    recommendedImprovements
  };
}

/**
 * Converts simulation results to strategy performance metrics
 */
export function extractPerformanceMetrics(results: SimulationResults): StrategyPerformance {
  // Calculate standard deviation (volatility measure)
  const standardDeviation = Math.sqrt(
    results.sessionResults.reduce((sum, session, index, arr) => {
      const avgBankroll = arr.reduce((s, r) => s + r.bankroll, 0) / arr.length;
      return sum + Math.pow(session.bankroll - avgBankroll, 2);
    }, 0) / results.sessionResults.length
  );
  
  // Determine risk rating based on max drawdown and standard deviation
  const riskRating: 'LOW' | 'MEDIUM' | 'HIGH' = 
    results.maxDrawdown > 50 || standardDeviation > 20 ? 'HIGH' :
    results.maxDrawdown > 20 || standardDeviation > 10 ? 'MEDIUM' : 'LOW';
  
  // Calculate confidence level (simplified)
  const confidenceLevel = results.handsPlayed >= 1000000 ? 99 : 
                         results.handsPlayed >= 500000 ? 95 : 
                         results.handsPlayed >= 100000 ? 90 : 85;
  
  // Calculate margin of error (simplified formula)
  const marginOfError = (1.96 * Math.sqrt(results.winPercentage * (100 - results.winPercentage) / results.handsPlayed));
  
  return {
    expectedValue: results.expectedValue,
    winPercentage: results.winPercentage,
    roiPercentage: results.expectedValue,
    avgHourlyExpected: (results.expectedValue / 100) * results.averageBetSize * results.handsPerHour,
    maxDrawdown: results.maxDrawdown,
    standardDeviation,
    riskRating,
    handsSimulated: results.handsPlayed,
    confidenceLevel,
    marginOfError
  };
}

/**
 * Creates default coaching configuration
 */
export function createDefaultCoachingConfig(): CoachingConfiguration {
  return {
    coachingStyle: 'ANALYTICAL',
    coachingModes: {
      cardByCard: true,
      endOfShoe: true,
      countCritique: true,
      strategyAdherence: true
    },
    feedbackIntensity: 'MODERATE',
    mistakeToleranceLevel: 3
  };
}

/**
 * Generates a UUID for strategy identification
 */
export function generateStrategyId(): string {
  return 'strategy_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
}

/**
 * Creates a complete Strategy object from simulation results
 */
export function createStrategyFromSimulation(
  results: SimulationResults,
  config: SimulationConfig,
  bettingStrategy: BetRow[],
  countingSystem: CountingSystemType,
  name: string,
  description?: string,
  coachingConfig?: CoachingConfiguration
): Strategy {
  const validationResult = validateStrategyProfitability(results);
  const performance = extractPerformanceMetrics(results);
  const now = new Date();
  
  if (!validationResult.isProfitable) {
    throw new Error(`Cannot create strategy: ${validationResult.validationErrors.join(', ')}`);
  }
  
  return {
    id: generateStrategyId(),
    name,
    description,
    createdAt: now,
    lastModified: now,
    simulationConfig: config,
    bettingStrategy: [...bettingStrategy], // Deep copy
    countingSystem,
    performance,
    coachingConfig: coachingConfig || createDefaultCoachingConfig(),
    isValidated: true,
    validationCriteria: validationResult
  };
}

/**
 * Compares two strategies and provides analysis
 */
export function compareStrategies(strategy1: Strategy, strategy2: Strategy): StrategyComparison {
  const roiDifference = strategy1.performance.roiPercentage - strategy2.performance.roiPercentage;
  const winRateDifference = strategy1.performance.winPercentage - strategy2.performance.winPercentage;
  const drawdownDifference = strategy1.performance.maxDrawdown - strategy2.performance.maxDrawdown;
  
  const configurationDifferences: string[] = [];
  const bettingDifferences: string[] = [];
  
  // Compare simulation configurations
  if (strategy1.simulationConfig.numberOfDecks !== strategy2.simulationConfig.numberOfDecks) {
    configurationDifferences.push(`Deck count: ${strategy1.simulationConfig.numberOfDecks} vs ${strategy2.simulationConfig.numberOfDecks}`);
  }
  
  if (strategy1.simulationConfig.deckPenetration !== strategy2.simulationConfig.deckPenetration) {
    configurationDifferences.push(`Penetration: ${strategy1.simulationConfig.deckPenetration}% vs ${strategy2.simulationConfig.deckPenetration}%`);
  }
  
  if (strategy1.countingSystem !== strategy2.countingSystem) {
    configurationDifferences.push(`Counting system: ${strategy1.countingSystem} vs ${strategy2.countingSystem}`);
  }
  
  // Compare betting strategies (simplified)
  if (strategy1.bettingStrategy.length !== strategy2.bettingStrategy.length) {
    bettingDifferences.push(`Betting tiers: ${strategy1.bettingStrategy.length} vs ${strategy2.bettingStrategy.length}`);
  }
  
  // Determine significance and recommendation
  const significantDifferences = Math.abs(roiDifference) > 0.5 || Math.abs(winRateDifference) > 1.0;
  
  let recommendation: 'STRATEGY_1' | 'STRATEGY_2' | 'EQUIVALENT' | 'INSUFFICIENT_DATA';
  
  if (!significantDifferences) {
    recommendation = 'EQUIVALENT';
  } else if (strategy1.performance.handsSimulated < 100000 || strategy2.performance.handsSimulated < 100000) {
    recommendation = 'INSUFFICIENT_DATA';
  } else if (roiDifference > 0.5) {
    recommendation = 'STRATEGY_1';
  } else if (roiDifference < -0.5) {
    recommendation = 'STRATEGY_2';
  } else {
    recommendation = 'EQUIVALENT';
  }
  
  return {
    strategy1,
    strategy2,
    differences: {
      performanceDelta: {
        roiDifference,
        winRateDifference,
        drawdownDifference
      },
      configurationDifferences,
      bettingDifferences,
      significantDifferences
    },
    recommendation
  };
}

/**
 * Calculates a strategy's overall score for ranking
 */
export function calculateStrategyScore(strategy: Strategy): number {
  const { performance } = strategy;
  
  // Weighted scoring: ROI (40%), Win Rate (30%), Risk (30%)
  const roiScore = Math.min(performance.roiPercentage * 4, 40); // Max 40 points
  const winRateScore = Math.max(0, (performance.winPercentage - 50) * 3); // Max 30 points for 60%+ win rate
  const riskScore = performance.riskRating === 'LOW' ? 30 : 
                   performance.riskRating === 'MEDIUM' ? 20 : 10; // Risk penalty
  
  return roiScore + winRateScore + riskScore;
}