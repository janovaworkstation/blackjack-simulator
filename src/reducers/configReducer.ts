import { AppConfig } from '../types/blackjack';
import { ConfigAction } from '../types/configActions';
import { createDefaultConfig } from '../constants/defaultConfig';

export function configReducer(state: AppConfig, action: ConfigAction): AppConfig {
  switch (action.type) {
    case 'SET_FULL_CONFIG':
      return { ...action.payload };

    case 'SET_FIELD':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };

    case 'SET_BETTING_TABLE':
      return {
        ...state,
        bettingTable: action.payload,
      };

    case 'LOAD_STRATEGY':
      return {
        ...state,
        numberOfDecks: action.payload.numberOfDecks,
        deckPenetration: action.payload.deckPenetration,
        playerBet: action.payload.playerBet,
        dealerHitsOnSoft17: action.payload.dealerHitsOnSoft17,
        playerCanDouble: action.payload.playerCanDouble,
        playerCanSplit: action.payload.playerCanSplit,
        playerCanSurrender: action.payload.playerCanSurrender,
        numberOfSimulations: action.payload.numberOfSimulations,
        countingSystem: action.payload.countingSystem,
        enableHandTracking: action.payload.enableHandTracking,
        doubleAfterSplit: action.payload.doubleAfterSplit ?? true,
        bettingTable: [...action.payload.bettingTable], // Deep copy the betting table
      };

    case 'RESET_CONFIG':
      return createDefaultConfig();

    default:
      return state;
  }
}