// Testing scenarios for blackjack game testing mode

export interface TestScenario {
  name: string;
  description: string;
  playerCards: [string, string];
  dealerCards: [string, string];
  additionalCards?: string[]; // For hits, splits, etc.
}

export const TESTING_SCENARIOS: { [key: string]: TestScenario } = {
  // Surrender Scenarios
  SURRENDER_16_VS_10: {
    name: 'Surrender 16 vs 10',
    description: 'Player has hard 16 vs dealer 10 - classic surrender scenario',
    playerCards: ['10H', '6S'],
    dealerCards: ['10D', '7C'],
  },
  SURRENDER_15_VS_A: {
    name: 'Surrender 15 vs Ace',
    description: 'Player has hard 15 vs dealer Ace - surrender recommended',
    playerCards: ['10S', '5H'],
    dealerCards: ['AD', 'KH'],
  },
  SURRENDER_16_VS_A: {
    name: 'Surrender 16 vs Ace',
    description: 'Player has hard 16 vs dealer Ace - surrender recommended',
    playerCards: ['9D', '7C'],
    dealerCards: ['AS', '5C'],
  },
  SURRENDER_VS_DEALER_BJ: {
    name: 'Surrender vs Dealer Blackjack',
    description: 'Player surrenders, dealer has blackjack - should still get half bet back',
    playerCards: ['KH', '6S'], // K♥ + 6♠ = 16
    dealerCards: ['AD', 'KC'], // Dealer shows A♦, hole card K♣ (blackjack)
  },

  // Insurance Scenarios
  INSURANCE_DEALER_BJ: {
    name: 'Insurance - Dealer BJ',
    description: 'Dealer shows Ace and has blackjack - insurance pays',
    playerCards: ['KH', '9S'],
    dealerCards: ['AC', 'QD'],
  },
  INSURANCE_NO_BJ: {
    name: 'Insurance - No BJ',
    description: 'Dealer shows Ace but no blackjack - insurance loses',
    playerCards: ['JD', '8H'],
    dealerCards: ['AH', '7S'],
  },
  INSURANCE_PLAYER_BJ: {
    name: 'Insurance - Player BJ',
    description: 'Both player and dealer have blackjack',
    playerCards: ['AS', 'KD'],
    dealerCards: ['AD', 'QH'],
  },

  // Blackjack Scenarios
  BLACKJACK_PLAYER: {
    name: 'Player Blackjack',
    description: 'Player has blackjack, dealer does not',
    playerCards: ['AH', 'KS'],
    dealerCards: ['9D', '7H'],
  },
  BLACKJACK_DEALER: {
    name: 'Dealer Blackjack',
    description: 'Dealer has blackjack, player does not',
    playerCards: ['KD', 'QH'],
    dealerCards: ['AS', 'JC'],
  },
  BLACKJACK_PUSH: {
    name: 'Blackjack Push',
    description: 'Both player and dealer have blackjack',
    playerCards: ['AC', 'QS'],
    dealerCards: ['AH', 'KD'],
  },

  // Split Scenarios
  SPLIT_ACES: {
    name: 'Split Aces',
    description: 'Player has pair of Aces - must split',
    playerCards: ['AS', 'AH'],
    dealerCards: ['6D', '5C'],
    additionalCards: ['KH', 'QD', '4S'], // For split hands
  },
  SPLIT_8S: {
    name: 'Split 8s',
    description: 'Player has pair of 8s - always split',
    playerCards: ['8D', '8C'],
    dealerCards: ['10H', '6S'],
    additionalCards: ['3H', '2D', 'AS', '7C'],
  },
  SPLIT_10S_TEST: {
    name: 'Split 10s Test',
    description: 'Player has pair of 10s - usually not split',
    playerCards: ['10S', '10D'],
    dealerCards: ['6H', '5D'],
  },

  // Double Down Scenarios
  DOUBLE_11_VS_6: {
    name: 'Double 11 vs 6',
    description: 'Player has 11 vs dealer 6 - perfect double',
    playerCards: ['7H', '4S'],
    dealerCards: ['6C', 'KH'],
    additionalCards: ['10D'], // Double card
  },
  DOUBLE_10_VS_9: {
    name: 'Double 10 vs 9',
    description: 'Player has 10 vs dealer 9 - good double',
    playerCards: ['6D', '4C'],
    dealerCards: ['9S', '7H'],
    additionalCards: ['KS'],
  },
  DOUBLE_9_VS_6: {
    name: 'Double 9 vs 6',
    description: 'Player has 9 vs dealer 6 - marginal double',
    playerCards: ['5H', '4D'],
    dealerCards: ['6S', 'QC'],
    additionalCards: ['10H'],
  },
  SOFT_DOUBLE_A7_VS_6: {
    name: 'Soft Double A7 vs 6',
    description: 'Player has soft 18 vs dealer 6 - double down',
    playerCards: ['AS', '7D'],
    dealerCards: ['6H', '10C'],
    additionalCards: ['3S'],
  },

  // Bust Scenarios
  PLAYER_BUST: {
    name: 'Player Bust Test',
    description: 'Player starts with 12, likely to bust on hit',
    playerCards: ['10C', '2H'],
    dealerCards: ['7S', '10D'],
    additionalCards: ['KH', 'QD'], // Bust cards
  },
  DEALER_BUST: {
    name: 'Dealer Bust Test',
    description: 'Dealer has 16, must hit and likely bust',
    playerCards: ['10H', '9S'],
    dealerCards: ['10C', '6D'],
    additionalCards: ['KS'], // Dealer bust card
  },

  // Edge Cases
  SOFT_17_DEALER: {
    name: 'Dealer Soft 17',
    description: 'Dealer has soft 17 - must hit in H17 games',
    playerCards: ['10S', '8H'],
    dealerCards: ['AD', '6C'],
    additionalCards: ['4H'], // Dealer draws to 21
  },
  FIVE_CARD_CHARLIE: {
    name: '5-Card Charlie Test',
    description: 'Player draws to 5 cards without busting',
    playerCards: ['2H', '3S'],
    dealerCards: ['10D', '7C'],
    additionalCards: ['2D', '4C', '5H', '3D'],
  },
  SPLIT_THEN_DOUBLE: {
    name: 'Split then Double',
    description: 'Split hand that can be doubled',
    playerCards: ['5S', '5D'],
    dealerCards: ['6H', '10S'],
    additionalCards: ['6C', '5H', 'KD', 'QH'], // For splits and doubles
  },
};

// Helper function to get cards from a scenario
export function getScenarioCards(scenarioKey: string): TestScenario | null {
  return TESTING_SCENARIOS[scenarioKey] || null;
}

// Helper function to get all scenario keys
export function getAllScenarioKeys(): string[] {
  return Object.keys(TESTING_SCENARIOS);
}

// Helper function to get scenarios by category
export function getScenariosByCategory(): { [category: string]: TestScenario[] } {
  return {
    surrender: [
      TESTING_SCENARIOS.SURRENDER_16_VS_10,
      TESTING_SCENARIOS.SURRENDER_15_VS_A,
      TESTING_SCENARIOS.SURRENDER_16_VS_A,
    ],
    insurance: [
      TESTING_SCENARIOS.INSURANCE_DEALER_BJ,
      TESTING_SCENARIOS.INSURANCE_NO_BJ,
      TESTING_SCENARIOS.INSURANCE_PLAYER_BJ,
    ],
    blackjack: [
      TESTING_SCENARIOS.BLACKJACK_PLAYER,
      TESTING_SCENARIOS.BLACKJACK_DEALER,
      TESTING_SCENARIOS.BLACKJACK_PUSH,
    ],
    split: [
      TESTING_SCENARIOS.SPLIT_ACES,
      TESTING_SCENARIOS.SPLIT_8S,
      TESTING_SCENARIOS.SPLIT_10S_TEST,
      TESTING_SCENARIOS.SPLIT_THEN_DOUBLE,
    ],
    double: [
      TESTING_SCENARIOS.DOUBLE_11_VS_6,
      TESTING_SCENARIOS.DOUBLE_10_VS_9,
      TESTING_SCENARIOS.DOUBLE_9_VS_6,
      TESTING_SCENARIOS.SOFT_DOUBLE_A7_VS_6,
    ],
    bust: [
      TESTING_SCENARIOS.PLAYER_BUST,
      TESTING_SCENARIOS.DEALER_BUST,
    ],
    edge: [
      TESTING_SCENARIOS.SOFT_17_DEALER,
      TESTING_SCENARIOS.FIVE_CARD_CHARLIE,
    ],
  };
}