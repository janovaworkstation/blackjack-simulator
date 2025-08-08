import { AppConfig, BetRow } from './blackjack';

export type ConfigAction =
  | { type: 'SET_FULL_CONFIG'; payload: AppConfig }
  | { type: 'SET_FIELD'; payload: { key: keyof AppConfig; value: any } }
  | { type: 'SET_BETTING_TABLE'; payload: BetRow[] }
  | { type: 'LOAD_STRATEGY'; payload: {
      numberOfDecks: number;
      deckPenetration: number;
      playerBet: number;
      dealerHitsOnSoft17: boolean;
      playerCanDouble: boolean;
      playerCanSplit: boolean;
      playerCanSurrender: boolean;
      numberOfSimulations: number;
      countingSystem: string;
      enableHandTracking: boolean;
      doubleAfterSplit?: boolean;
      bettingTable: BetRow[];
    }}
  | { type: 'RESET_CONFIG' };