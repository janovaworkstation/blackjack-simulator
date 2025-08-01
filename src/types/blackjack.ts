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
 */
export interface HandDetails {
  handNumber: number;
  runningCountStart: number;
  trueCountStart: number;
  betAmount: number;
  playerCardsInitial: string[];
  dealerCardsInitial: string[];
  playerBlackjack: boolean;
  dealerBlackjack: boolean;
  initialAction: string;
  totalBet: number;
  playerCardsFinal: string[];
  dealerCardsFinal: string[];
  winnings: number;
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
