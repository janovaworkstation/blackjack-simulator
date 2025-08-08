/**
 * Defines the core types and interfaces for the Blackjack simulation engine.
 * @author Your Name
 * @license MIT
 */

/**
 * Represents a single playing card.
 */
export interface Card {
  suit: 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';
  rank:
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '10'
    | 'J'
    | 'Q'
    | 'K'
    | 'A';
  value: number;
}

/**
 * Represents the value of a hand, considering the flexible value of an Ace.
 */
export interface HandValue {
  hard: number;
  soft: number;
}

/**
 * Represents a hand of cards for either the player or the dealer.
 */
export interface Hand {
  cards: Card[];
  value: HandValue;
  isBlackjack: boolean;
  betAmount?: number;
  isSplitAces?: boolean;
  isPostSplit?: boolean;
}

/**
 * Defines the configuration options for a simulation run.
 */
export interface SimulationConfig {
  numberOfDecks: number;
  deckPenetration: number;
  playerBet: number;
  dealerHitsOnSoft17: boolean;
  playerCanDouble: boolean;
  playerCanSplit: boolean;
  playerCanSurrender: boolean;
  numberOfSimulations: number;
  enableHandTracking?: boolean;
  bettingTable?: BetRow[];
  countingSystem: CountingSystemType;
  resplitAces?: boolean;
  doubleAfterSplit?: boolean;
  handsPerHour?: number;
}

/**
 * Represents the outcome of a single hand.
 */
export type HandOutcome =
  | 'win'
  | 'loss'
  | 'push'
  | 'blackjack'
  | 'surrender'
  | 'bust';

/**
 * Contains the detailed results of a single hand played.
 * For split hands, each split creates a separate HandDetails entry.
 */
export interface HandDetails {
  handNumber: number;
  handId: string;                        // Unique ID for the original hand (e.g., "H123")
  subHandId: number;                     // Split hand index (0=original, 1=first split, 2=second split, etc.)
  splitHandCount: number;                // Total number of hands created from this original hand
  runningCountStart: number;
  trueCountStart: number;
  decksRemaining: number;
  betAmount: number;                     // Individual bet amount for this specific split hand
  playerCardsInitial: string[];
  dealerCardsInitial: string[];
  playerCardsInitialWithSuits: string[]; // e.g., ["5H", "KS"]
  dealerCardsInitialWithSuits: string[]; // e.g., ["AD", "10C"]
  playerBlackjack: boolean;
  dealerBlackjack: boolean;
  initialAction: string;
  totalBet: number;                      // Total bet across ALL split hands for this original hand
  playerCardsFinal: string[];            // Final cards for THIS specific split hand
  dealerCardsFinal: string[];
  playerCardsFinalWithSuits: string[];  // Final cards for THIS specific split hand with suits
  dealerCardsFinalWithSuits: string[];  // e.g., ["AD", "10C", "6H"]
  winnings: number;                      // Individual winnings for this specific split hand
  shuffleOccurred: boolean;
}

/**
 * Aggregates the results from all simulated hands.
 */
export interface SimulationResults {
  handsPlayed: number;
  totalOutcomes: number;
  wins: number;
  losses: number;
  pushes: number;
  blackjacks: number;
  playerBusts: number;
  dealerBusts: number;
  surrenders: number;
  winPercentage: number;
  lossPercentage: number;
  pushPercentage: number;
  totalWagered: number;
  totalWon: number;
  netResult: number;
  expectedValue: number;
  averageBetSize: number;
  maxDrawdown: number;
  maxDrawdownHand: number;
  handsPerHour: number;
  countingSystem: string;
  sessionResults: {
    session: number;
    bankroll: number;
    hands: number;
  }[];
  handDetails: HandDetails[];
  busts: number;
  doubles: number;
  splits: number;
  hands15: number;
  hands16: number;
}

/**
 * Represents the betting table configuration for count-based betting
 */
export interface BetRow {
  minCount: number;
  maxCount: number;
  betAmount: number;
}

/**
 * Supported card counting systems.
 * 
 * These correspond to the systems defined in src/constants/countingSystems.ts:
 * - HI_LO: The most popular balanced counting system
 * - KO: Knock-Out unbalanced system  
 * - HI_OPT_I: Hi-Opt I balanced system with neutral Aces
 */
export type CountingSystemType = 'HI_LO' | 'KO' | 'HI_OPT_I';

/**
 * Complete application configuration - single source of truth for all UI and simulation settings.
 * This replaces the fragmented PanelConfig + inline extensions pattern to prevent configuration drift.
 */
export interface AppConfig {
  // Core simulation parameters (required)
  numberOfDecks: number;
  deckPenetration: number;
  playerBet: number;
  numberOfSimulations: number;
  
  // Game rules (required)
  dealerHitsOnSoft17: boolean;
  playerCanDouble: boolean;
  playerCanSplit: boolean;
  playerCanSurrender: boolean;
  
  // Advanced game rules (required with defaults)
  resplitAces: boolean;
  doubleAfterSplit: boolean;
  
  // Simulation features (required with defaults)
  enableHandTracking: boolean;
  countingSystem: CountingSystemType;
  
  // Betting strategy (required)
  bettingTable: BetRow[];
  
  // UI-only fields (required for display/calculations)
  maxBet: number;
  handsPerHour: number;
}

/**
 * Validated performance metrics from a successful simulation
 */
export interface StrategyPerformance {
  // Core profitability metrics
  expectedValue: number;              // Must be > 1% for validation
  winPercentage: number;             // Must be > 51% for validation
  roiPercentage: number;             // Return on investment
  avgHourlyExpected: number;         // Expected hourly profit
  
  // Risk metrics
  maxDrawdown: number;               // Maximum bankroll loss
  standardDeviation: number;         // Volatility measure
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH';
  
  // Confidence metrics
  handsSimulated: number;           // Total hands in validation
  confidenceLevel: number;          // Statistical confidence (95%, 99%, etc.)
  marginOfError: number;            // +/- accuracy range
}

/**
 * AI coaching configuration preferences
 */
export interface CoachingConfiguration {
  // Coaching intensity and style preferences
  coachingStyle: 'ENCOURAGING' | 'ANALYTICAL' | 'CHALLENGING';
  coachingModes: {
    cardByCard: boolean;            // Real-time decision feedback
    endOfShoe: boolean;            // Shoe-level performance review
    countCritique: boolean;        // Periodic count verification
    strategyAdherence: boolean;    // Focus on following strategy
  };
  feedbackIntensity: 'MINIMAL' | 'MODERATE' | 'COMPREHENSIVE';
  mistakeToleranceLevel: number;   // How many mistakes before intervention (0-10)
}

/**
 * Strategy validation result with detailed feedback
 */
export interface ValidationResult {
  isProfitable: boolean;            // Meets minimum profitability thresholds
  meetsMinROI: boolean;            // ROI >= 1%
  meetsMinWinRate: boolean;        // Win rate >= 51%
  hasStatisticalSignificance: boolean; // Enough hands simulated
  validationErrors: string[];      // Any validation failure reasons
  recommendedImprovements: string[]; // Suggestions if validation fails
}

/**
 * Complete strategy definition - the core interface for saved strategies
 */
export interface Strategy {
  // Metadata
  id: string;                           // UUID for strategy identification
  name: string;                         // User-friendly name
  description?: string;                 // Optional strategy description
  createdAt: Date;                      // Creation timestamp
  lastModified: Date;                   // Last modification timestamp
  
  // Simulation Configuration (complete snapshot)
  simulationConfig: SimulationConfig;   // Game rules, deck config, simulation size, counting system
  bettingStrategy: BetRow[];            // Count-based betting table
  
  // Validated Performance Metrics (from simulation results)
  performance: StrategyPerformance;     // Key metrics that validated this strategy
  
  // AI Coaching Preferences
  coachingConfig: CoachingConfiguration; // How AI should coach using this strategy
  
  // Validation Status
  isValidated: boolean;                 // Passed profitability validation
  validationCriteria: ValidationResult; // Details of validation checks
}

/**
 * Strategy comparison result for side-by-side analysis
 */
export interface StrategyComparison {
  strategy1: Strategy;
  strategy2: Strategy;
  differences: {
    performanceDelta: {
      roiDifference: number;
      winRateDifference: number;
      drawdownDifference: number;
    };
    configurationDifferences: string[];
    bettingDifferences: string[];
    significantDifferences: boolean;
  };
  recommendation: 'STRATEGY_1' | 'STRATEGY_2' | 'EQUIVALENT' | 'INSUFFICIENT_DATA';
}

/**
 * localStorage structure for strategy persistence
 */
export interface StrategyStorage {
  strategies: { [id: string]: Strategy };
  metadata: {
    version: string;
    lastModified: Date;
    totalStrategies: number;
  };
}
