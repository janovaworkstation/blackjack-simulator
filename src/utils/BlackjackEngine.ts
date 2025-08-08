import {
  Card,
  Hand,
  HandValue,
  SimulationConfig,
  HandDetails,
  SimulationResults,
  BetRow,
} from '../types/blackjack';

// Card counting systems
export const COUNTING_SYSTEMS: {
  [key: string]: { name: string; values: { [key: string]: number } };
} = {
  HI_LO: {
    name: 'Hi-Lo',
    values: {
      A: -1,
      '2': 1,
      '3': 1,
      '4': 1,
      '5': 1,
      '6': 1,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': -1,
      J: -1,
      Q: -1,
      K: -1,
    },
  },
  KO: {
    name: 'Knock-Out (KO)',
    values: {
      A: -1,
      '2': 1,
      '3': 1,
      '4': 1,
      '5': 1,
      '6': 1,
      '7': 1,
      '8': 0,
      '9': 0,
      '10': -1,
      J: -1,
      Q: -1,
      K: -1,
    },
  },
  HI_OPT_I: {
    name: 'Hi-Opt I',
    values: {
      A: 0,
      '2': 0,
      '3': 1,
      '4': 1,
      '5': 1,
      '6': 1,
      '7': 0,
      '8': 0,
      '9': 0,
      '10': -1,
      J: -1,
      Q: -1,
      K: -1,
    },
  },
};

// Basic Strategy Matrix (S17 - Dealer Stands on Soft 17)
export const BASIC_STRATEGY: { [key: number]: string[] } = {
  // Hard totals: [2,3,4,5,6,7,8,9,10,A] dealer up cards
  4: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
  5: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
  6: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
  7: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
  8: ['H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'],
  9: ['H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'],
  10: ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H', 'H'],
  11: ['D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'H'],
  12: ['H', 'H', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  13: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  14: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  15: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  16: ['S', 'S', 'S', 'S', 'S', 'H', 'H', 'H', 'H', 'H'],
  17: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
  18: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
  19: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
  20: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
  21: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'],
};

// Soft totals (with Ace) - S17 Base Strategy
export const SOFT_STRATEGY: { [key: number]: string[] } = {
  // Soft totals: A,2 through A,9 - [2,3,4,5,6,7,8,9,10,A] dealer up cards
  13: ['H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A,2
  14: ['H', 'H', 'H', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A,3
  15: ['H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A,4
  16: ['H', 'H', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A,5
  17: ['H', 'D', 'D', 'D', 'D', 'H', 'H', 'H', 'H', 'H'], // A,6
  18: ['S', 'D', 'D', 'D', 'D', 'S', 'S', 'H', 'H', 'H'], // A,7
  19: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'], // A,8
  20: ['S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S', 'S'], // A,9
};

// Surrender strategy (only for initial 2-card hands)
export const SURRENDER_STRATEGY: { [key: number]: string[] } = {
  // Hard totals that should surrender: [2,3,4,5,6,7,8,9,10,A] dealer up cards
  15: ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'Y', 'N'], // 15 vs 10
  16: ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'Y', 'Y', 'Y'], // 16 vs 9, 10, A
};

// Pair splitting strategy
export const PAIR_STRATEGY: { [key: string]: string[] } = {
  A: ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'], // A,A
  '2': ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'N', 'N', 'N', 'N'], // 2,2
  '3': ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'N', 'N', 'N', 'N'], // 3,3
  '4': ['N', 'N', 'N', 'Y', 'Y', 'N', 'N', 'N', 'N', 'N'], // 4,4
  '5': ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'], // 5,5 (never split)
  '6': ['Y', 'Y', 'Y', 'Y', 'Y', 'N', 'N', 'N', 'N', 'N'], // 6,6
  '7': ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'N', 'N', 'N', 'N'], // 7,7
  '8': ['Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y'], // 8,8
  '9': ['Y', 'Y', 'Y', 'Y', 'Y', 'N', 'Y', 'Y', 'N', 'N'], // 9,9
  '10': ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'], // 10,10 (never split)
};

// Pairs that require DAS (Double After Split) to be profitable
// These pairs should NOT be split if DAS is disabled
export const DAS_DEPENDENT_PAIRS: { [key: string]: number[] } = {
  '4': [3, 4], // 4,4 vs 5,6 (dealer index 3,4) only split with DAS
  '2': [1], // 2,2 vs 3 (dealer index 1) only split with DAS (some variations)
  '3': [1], // 3,3 vs 3 (dealer index 1) only split with DAS (some variations) 
  '6': [1], // 6,6 vs 3 (dealer index 1) only split with DAS (some variations)
};

// H17 Strategy Overrides
// Base strategy tables above are for S17 (dealer stands on soft 17)
// These overrides apply when dealer hits soft 17 (H17 rule)
export const H17_SOFT_OVERRIDES: { [key: number]: { [dealerCard: number]: string } } = {
  // Soft 18 (A,7) - More aggressive standing against Ace in H17
  18: {
    9: 'S'  // A,7 vs A: Stand in H17 (was Hit in S17)
  },
  // Soft 19 (A,8) - More aggressive doubling in H17
  19: {
    4: 'D'  // A,8 vs 6: Double in H17 (was Stand in S17) - dealer 6 = index 4
  }
};

export const H17_HARD_OVERRIDES: { [key: number]: { [dealerCard: number]: string } } = {
  // Hard 11 - More aggressive doubling against Ace in H17
  11: {
    9: 'D'  // 11 vs A: Double in H17 (was Hit in S17) 
  }
};

// H17 Surrender overrides (if any specific differences exist)
export const H17_SURRENDER_OVERRIDES: { [key: number]: { [dealerCard: number]: string } } = {
  // Currently no major surrender differences between H17/S17 for standard hands
  // This can be extended if specific surrender differences are identified
};

// Helper function to format card with suit
const formatCardWithSuit = (card: Card): string => {
  const suitShorthand = {
    'Hearts': 'H',
    'Diamonds': 'D', 
    'Clubs': 'C',
    'Spades': 'S'
  };
  return `${card.rank}${suitShorthand[card.suit]}`;
};

export class BlackjackSimulation {
  private config: SimulationConfig;
  private countingSystem: { name: string; values: { [key: string]: number } };
  private shoe: Card[];
  private runningCount: number;
  private handsPlayed: number;
  private totalWon: number;
  private totalWagered: number;
  private wins: number;
  private losses: number;
  private pushes: number;
  private blackjacks: number;
  private playerBusts: number;
  private dealerBusts: number;
  private surrenders: number;
  private doubles: number;
  private splits: number;
  private hands15: number;
  private hands16: number;
  private maxDrawdown: number;
  private currentBankroll: number;
  private minBankroll: number;
  private sessionResults: {
    session: number;
    bankroll: number;
    hands: number;
  }[];
  private handDetails: HandDetails[];
  private previousTrueCount: number;
  private lastHandWasShuffle: boolean;
  private cardsDealtThisShoe: { [key: string]: number }; // Track cards dealt per shoe
  private shuffledThisHand: boolean; // Track if shuffle occurred during current hand
  private needShuffleNext: boolean; // Casino-realistic: flag to shuffle before next hand

  constructor(config: SimulationConfig, countingSystem = 'HI_LO') {
    this.config = config;
    // Use counting system from config if provided, otherwise use parameter or default
    const systemToUse = config.countingSystem || countingSystem;
    this.countingSystem = COUNTING_SYSTEMS[systemToUse];
    this.shoe = [];
    this.runningCount = 0;
    this.handsPlayed = 0;
    this.totalWon = 0;
    this.totalWagered = 0;
    this.wins = 0;
    this.losses = 0;
    this.pushes = 0;
    this.blackjacks = 0;
    this.playerBusts = 0;
    this.dealerBusts = 0;
    this.surrenders = 0;
    this.doubles = 0;
    this.splits = 0;
    this.hands15 = 0;
    this.hands16 = 0;
    this.maxDrawdown = 0;
    this.currentBankroll = 0;
    this.minBankroll = 0;
    this.sessionResults = [];
    this.handDetails = [];
    this.previousTrueCount = 0;
    this.lastHandWasShuffle = true;
    this.cardsDealtThisShoe = {};
    this.shuffledThisHand = false;
    this.needShuffleNext = false;
    this.reset();
  }

  reset(): void {
    this.shoe = this.createShoe();
    this.runningCount = 0;
    this.handsPlayed = 0;
    this.totalWon = 0;
    this.totalWagered = 0;
    this.wins = 0;
    this.losses = 0;
    this.pushes = 0;
    this.blackjacks = 0;
    this.playerBusts = 0;
    this.dealerBusts = 0;
    this.surrenders = 0;
    this.doubles = 0;
    this.splits = 0;
    this.hands15 = 0;
    this.hands16 = 0;
    this.maxDrawdown = 0;
    this.currentBankroll = 0;
    this.minBankroll = 0;
    this.sessionResults = [];
    this.handDetails = [];
    this.previousTrueCount = 0;
    this.lastHandWasShuffle = true;
    this.cardsDealtThisShoe = {};
    this.shuffledThisHand = false;
    this.needShuffleNext = false;
  }

  private createShoe(): Card[] {
    const cards: Card[] = [];
    const suits: Card['suit'][] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks: Card['rank'][] = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K',
      'A',
    ];

    for (let i = 0; i < this.config.numberOfDecks; i++) {
      for (const suit of suits) {
        for (const rank of ranks) {
          cards.push({ suit, rank, value: this.getCardValue({ rank }) });
        }
      }
    }

    return this.shuffle(cards);
  }


  private shuffle(cards: Card[]): Card[] {
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  private needReshuffle(): boolean {
    const cardsRemaining = this.shoe.length;
    const totalCards = this.config.numberOfDecks * 52;
    const penetrationPoint =
      totalCards * (1 - this.config.deckPenetration / 100);
    return cardsRemaining <= penetrationPoint;
  }

  private dealCard(): Card {
    // Casino-realistic: No mid-hand shuffling - just deal from current shoe

    const card = this.shoe.pop();
    if (!card) {
      throw new Error('Shoe is empty, cannot deal card.');
    }
    
    // Additional validation - this should never happen with proper implementation
    if (!card.suit || !card.rank) {
      throw new Error(`Invalid card dealt: ${JSON.stringify(card)}`);
    }
    
    // Track cards dealt this shoe (lightweight tracking for shuffle reset only)
    const cardKey = formatCardWithSuit(card);
    this.cardsDealtThisShoe[cardKey] = (this.cardsDealtThisShoe[cardKey] || 0) + 1;
    
    this.runningCount += this.countingSystem.values[card.rank] || 0;
    return card;
  }

  private getCardValue(card: Pick<Card, 'rank'>): number {
    if (['J', 'Q', 'K'].includes(card.rank)) return 10;
    if (card.rank === 'A') return 11;
    return parseInt(card.rank, 10);
  }

  private calculateHandValue(cards: Card[]): HandValue {
    let hard = 0;
    let soft = 0;
    let aces = 0;

    for (const card of cards) {
      hard += card.value;
      if (card.rank === 'A') {
        aces++;
      }
    }

    soft = hard;
    while (soft > 21 && aces > 0) {
      soft -= 10;
      aces--;
    }

    return { hard, soft };
  }

  private isBlackjack(hand: Hand): boolean {
    return hand.cards.length === 2 && hand.value.soft === 21;
  }

  private isSoftHand(hand: Hand): boolean {
    // A hand is "soft" if it contains an Ace that is currently being counted as 11
    // We can determine this by checking if the soft total uses at least one Ace as 11
    const aces = hand.cards.filter(card => card.rank === 'A').length;
    if (aces === 0) return false;
    
    // Calculate what the total would be if all Aces counted as 1
    const hardTotalAllAcesAs1 = hand.cards.reduce((sum, card) => {
      return sum + (card.rank === 'A' ? 1 : card.value);
    }, 0);
    
    // If soft total > hard total with all aces as 1, then at least one ace counts as 11
    return hand.value.soft > hardTotalAllAcesAs1;
  }

  private isPair(hand: Hand): boolean {
    if (hand.cards.length !== 2) return false;
    const [card1, card2] = hand.cards;
    return card1.value === card2.value;
  }

  private getTrueCount(): number {
    const decksRemaining = this.shoe.length / 52;
    return decksRemaining > 0 ? this.runningCount / decksRemaining : 0;
  }

  private getBetSize(currentTrueCount: number): number {
    // Casino-realistic: Use the current true count as-is
    // Shuffle decisions are handled before the hand starts, not during bet sizing
    let trueCount = currentTrueCount;
    
    // If betting table is provided, use it
    if (this.config.bettingTable && this.config.bettingTable.length > 0) {
      // Debug logging disabled for cleaner test output
      // if (this.config.enableHandTracking && this.handsPlayed < 100) {
      //   console.log(`Hand ${this.handsPlayed + 1}: TC ${trueCount}, Checking betting table:`);
      //   console.table(this.config.bettingTable.map((row, i) => ({
      //     index: i,
      //     minCount: row.minCount,
      //     maxCount: row.maxCount, 
      //     betAmount: row.betAmount
      //   })));
      // }
      
      for (const betRow of this.config.bettingTable) {
        // Use >= min and < max range logic (no epsilon needed)
        if (trueCount >= betRow.minCount && trueCount < betRow.maxCount) {
          // Debug logging disabled for cleaner test output
          // if (this.config.enableHandTracking && this.handsPlayed < 100) {
          //   console.log(`Hand ${this.handsPlayed + 1}: TC ${trueCount} matches range [${betRow.minCount}, ${betRow.maxCount}), bet: $${betRow.betAmount}`);
          // }
          return betRow.betAmount;
        }
      }
      
      // If no range matches, use the last row (highest range)
      const lastRow = this.config.bettingTable[this.config.bettingTable.length - 1];
      if (this.config.enableHandTracking && this.handsPlayed < 100) {
        console.log(`Hand ${this.handsPlayed + 1}: No range matched TC ${trueCount}, using fallback: $${lastRow.betAmount}`);
        console.log(`Betting table ranges:`, this.config.bettingTable.map(row => `${row.minCount} to ${row.maxCount} = $${row.betAmount}`));
      }
      return lastRow.betAmount;
    }
    
    // Fallback to simple multiplication if no betting table
    if (trueCount < 1) return this.config.playerBet;
    const betMultiplier = Math.max(1, Math.floor(trueCount));
    return this.config.playerBet * betMultiplier;
  }

  private getBasicStrategyAction(
    playerHand: Hand,
    dealerUpCard: Card,
    canDouble: boolean,
    canSplit: boolean,
  ): string {
    const playerTotal = playerHand.value.soft;
    const dealerValue = dealerUpCard.value;
    const dealerIndex = dealerValue === 11 ? 9 : Math.min(dealerValue - 2, 8);
    const isH17 = this.config.dealerHitsOnSoft17;

    // Check surrender first (with H17 overrides if applicable)
    if (
      this.config.playerCanSurrender &&
      playerHand.cards.length === 2 &&
      !this.isSoftHand(playerHand)
    ) {
      // Check H17 surrender overrides first
      if (isH17) {
        const h17SurrenderOverride = H17_SURRENDER_OVERRIDES[playerHand.value.hard]?.[dealerIndex];
        if (h17SurrenderOverride === 'Y') return 'R';
      }
      
      // Use base surrender strategy  
      const surrenderAction = SURRENDER_STRATEGY[playerHand.value.hard]?.[dealerIndex];
      if (surrenderAction === 'Y') return 'R'; // Surrender
    }

    // Check pair splitting with DAS conditioning
    if (canSplit && this.isPair(playerHand)) {
      const pairCardRank = playerHand.cards[0].rank;
      const splitAction = PAIR_STRATEGY[pairCardRank]?.[dealerIndex];
      if (splitAction === 'Y') {
        // Check if this pair/dealer combination requires DAS
        const dasRequiredIndices = DAS_DEPENDENT_PAIRS[pairCardRank];
        if (dasRequiredIndices && dasRequiredIndices.includes(dealerIndex)) {
          // This split requires DAS - only split if DAS is enabled
          if (this.config.doubleAfterSplit !== false) {
            return 'P'; // Split with DAS
          }
          // DAS disabled for a DAS-dependent pair - don't split
        } else {
          // Non-DAS-dependent pair - always split when basic strategy says so
          return 'P'; // Split
        }
      }
    }

    // Handle soft hands with H17 conditioning
    if (this.isSoftHand(playerHand)) {
      // Check H17 soft overrides first
      if (isH17) {
        const h17SoftOverride = H17_SOFT_OVERRIDES[playerTotal]?.[dealerIndex];
        if (h17SoftOverride) {
          let action = h17SoftOverride;
          if (action === 'D' && !canDouble) action = 'H';
          return action;
        }
      }
      
      // Use base soft strategy (S17)
      const softStrategy = SOFT_STRATEGY[playerTotal];
      if (softStrategy) {
        let action = softStrategy[dealerIndex];
        if (action === 'D' && !canDouble) action = 'H';
        return action;
      }
    }

    // Handle hard hands with H17 conditioning
    const hardTotal = playerHand.value.hard;
    
    // Check H17 hard overrides first
    if (isH17) {
      const h17HardOverride = H17_HARD_OVERRIDES[hardTotal]?.[dealerIndex];
      if (h17HardOverride) {
        let action = h17HardOverride;
        if (action === 'D' && !canDouble) action = 'H';
        return action;
      }
    }
    
    // Use base hard strategy (S17)
    const strategy = BASIC_STRATEGY[hardTotal] || BASIC_STRATEGY[21];
    let action = strategy[dealerIndex];

    if (action === 'D' && !canDouble) action = 'H';

    return action;
  }

  private playHand(): void {
    // Casino-realistic: Check if we need to shuffle before the hand
    const willShuffleBeforeHand = this.needShuffleNext;
    if (this.needShuffleNext) {
      this.shoe = this.createShoe();
      this.runningCount = 0;
      this.cardsDealtThisShoe = {};
      this.needShuffleNext = false;
      this.shuffledThisHand = true;
    }
    
    // Calculate true count BEFORE any dealing for accurate bet sizing
    const trueCountStart = this.getTrueCount();
    const betSize = this.getBetSize(trueCountStart);
    const runningCountStart = this.runningCount;
    
    // Capture decks remaining for hand details (after any shuffle)
    const decksRemaining = this.shoe.length / 52;
    
    // Reset shuffle flag for this hand
    this.shuffledThisHand = false;

    const playerInitialCards = [this.dealCard(), this.dealCard()];
    const dealerInitialCards = [this.dealCard(), this.dealCard()];

    const playerHand: Hand = {
      cards: [...playerInitialCards],
      value: this.calculateHandValue(playerInitialCards),
      isBlackjack: this.isBlackjack({
        cards: playerInitialCards,
        value: this.calculateHandValue(playerInitialCards),
        isBlackjack: false,
      }),
      betAmount: betSize,
    };

    const dealerHand: Hand = {
      cards: [...dealerInitialCards],
      value: this.calculateHandValue(dealerInitialCards),
      isBlackjack: this.isBlackjack({
        cards: dealerInitialCards,
        value: this.calculateHandValue(dealerInitialCards),
        isBlackjack: false,
      }),
    };

    let totalBet = betSize;
    let winnings = 0;
    let initialAction = '';
    let playerHands: Hand[] = [playerHand]; // Initialize for all scenarios

    if (playerHand.isBlackjack && dealerHand.isBlackjack) {
      this.pushes++;
      winnings = 0;
      initialAction = 'Push';
    } else if (playerHand.isBlackjack && !playerHand.isSplitAces) {
      this.wins++;
      this.blackjacks++;
      winnings = betSize * 1.5;
      initialAction = 'Blackjack';
    } else if (playerHand.isSplitAces && playerHand.value.soft === 21) {
      // Split Aces that make 21 pay 1:1, not 3:2
      this.wins++;
      winnings = betSize;
      initialAction = '21 (Split Aces)';
    } else if (dealerHand.isBlackjack) {
      this.losses++;
      winnings = -betSize;
      initialAction = 'Loss';
    } else {
      // Player's turn - playerHands already initialized above
      let handIndex = 0;
      while (handIndex < playerHands.length) {
        const currentHand = playerHands[handIndex];
        // DAS rule: post-split hands can only double if doubleAfterSplit is enabled
        let canDouble = currentHand.isPostSplit 
          ? (this.config.doubleAfterSplit ?? true)
          : this.config.playerCanDouble;
        let canSplit = this.config.playerCanSplit && 
          (!currentHand.isPostSplit || currentHand.cards[0].rank !== 'A' || this.config.resplitAces);

        // Split Aces get only one card - skip the playing loop
        if (currentHand.isSplitAces) {
          // Split Aces hands already have their one additional card from the split
          // No further actions allowed - forced to stand
          if (handIndex === 0 && initialAction === '') {
            initialAction = 'S'; // Mark as stand for initial action tracking
          }
        } else {
          // Normal playing loop for non-split-Aces hands
          while (currentHand.value.soft < 21) {
            const action = this.getBasicStrategyAction(
              currentHand,
              dealerHand.cards[0],
              canDouble,
              canSplit && playerHands.length < 4,
            );
            if (handIndex === 0 && initialAction === '') {
              initialAction = action;
            }

            // Track hard 15 and 16 totals (important strategy decision points)
            if (handIndex === 0) { // Only count for the first hand to avoid double-counting splits
              const hardValue = currentHand.value.hard;
              if (hardValue === 15 && !this.isSoftHand(currentHand)) {
                this.hands15++;
              } else if (hardValue === 16 && !this.isSoftHand(currentHand)) {
                this.hands16++;
              }
            }

            if (action === 'S') break;

          if (action === 'R') {
            this.surrenders++;
            winnings = -betSize / 2;
            totalBet = betSize;
            break;
          }

          if (action === 'H') {
            currentHand.cards.push(this.dealCard());
            currentHand.value = this.calculateHandValue(currentHand.cards);
            canDouble = false;
          } else if (action === 'D') {
            this.doubles++;
            totalBet += betSize;
            currentHand.betAmount = (currentHand.betAmount || betSize) + betSize;
            currentHand.cards.push(this.dealCard());
            currentHand.value = this.calculateHandValue(currentHand.cards);
            break;
          } else if (action === 'P') {
            this.splits++;
            totalBet += betSize;
            const cardToSplit = currentHand.cards.pop()!;
            const isSplittingAces = cardToSplit.rank === 'A';
            
            const newHand: Hand = {
              cards: [cardToSplit, this.dealCard()],
              value: { hard: 0, soft: 0 },
              isBlackjack: false,
              betAmount: betSize,
              isSplitAces: isSplittingAces,
              isPostSplit: true,
            };
            newHand.value = this.calculateHandValue(newHand.cards);
            playerHands.push(newHand);

            currentHand.cards.push(this.dealCard());
            currentHand.value = this.calculateHandValue(currentHand.cards);
            currentHand.isSplitAces = isSplittingAces;
            currentHand.isPostSplit = true;
            
            // After splitting Aces, no further actions allowed and no re-splitting unless resplitAces is enabled
            canSplit = !isSplittingAces && this.config.playerCanSplit;
            }
          }
        }
        handIndex++;
      }

      // Dealer's turn
      const anyPlayerHandNotBusted = playerHands.some(
        (h) => h.value.soft <= 21,
      );
      if (anyPlayerHandNotBusted) {
        while (
          dealerHand.value.soft < 17 ||
          (dealerHand.value.soft === 17 &&
            this.isSoftHand(dealerHand) &&
            this.config.dealerHitsOnSoft17)
        ) {
          dealerHand.cards.push(this.dealCard());
          dealerHand.value = this.calculateHandValue(dealerHand.cards);
        }
      }

      // Settle bets
      for (const hand of playerHands) {
        const currentBet = hand.betAmount || betSize;
        if (hand.value.soft > 21) {
          this.losses++;
          this.playerBusts++;
          winnings -= currentBet;
        } else if (dealerHand.value.soft > 21) {
          this.wins++;
          this.dealerBusts++;
          winnings += currentBet;
        } else if (hand.value.soft > dealerHand.value.soft) {
          this.wins++;
          winnings += currentBet;
        } else if (hand.value.soft < dealerHand.value.soft) {
          this.losses++;
          winnings -= currentBet;
        } else {
          this.pushes++;
        }
      }
    }

    this.totalWagered += totalBet;
    
    // Use the sum of individual hand winnings for accuracy (matches HandDetails calculation)
    let actualTotalWinnings = 0;
    if (this.config.enableHandTracking) {
      // Sum the actual individual hand winnings from our corrected calculation
      const currentSplitHandCount = playerHands.length;
      for (let subHandId = 0; subHandId < playerHands.length; subHandId++) {
        const hand = playerHands[subHandId];
        const handBet = hand.betAmount || betSize;
        
        // Calculate individual hand winnings using the same logic as HandDetails
        let handWinnings = 0;
        if (currentSplitHandCount === 1) {
          if (playerHand.isBlackjack && dealerHand.isBlackjack) {
            handWinnings = 0;
          } else if (playerHand.isBlackjack && !playerHand.isSplitAces) {
            handWinnings = handBet * 1.5;
          } else if (playerHand.isSplitAces && playerHand.value.soft === 21) {
            handWinnings = handBet;
          } else if (dealerHand.isBlackjack) {
            handWinnings = -handBet;
          } else {
            if (hand.value.soft > 21) {
              handWinnings = -handBet;
            } else if (dealerHand.value.soft > 21) {
              handWinnings = handBet;
            } else if (hand.value.soft > dealerHand.value.soft) {
              handWinnings = handBet;
            } else if (hand.value.soft < dealerHand.value.soft) {
              handWinnings = -handBet;
            } else {
              handWinnings = 0;
            }
          }
        } else {
          if (dealerHand.isBlackjack) {
            handWinnings = -handBet;
          } else if (hand.value.soft > 21) {
            handWinnings = -handBet;
          } else if (dealerHand.value.soft > 21) {
            handWinnings = handBet;
          } else if (hand.value.soft > dealerHand.value.soft) {
            handWinnings = handBet;
          } else if (hand.value.soft < dealerHand.value.soft) {
            handWinnings = -handBet;
          } else {
            handWinnings = 0;
          }
        }
        actualTotalWinnings += handWinnings;
      }
    } else {
      // Fallback to original winnings calculation when hand tracking disabled
      actualTotalWinnings = winnings;
    }
    
    this.totalWon += actualTotalWinnings;
    this.currentBankroll += actualTotalWinnings;
    this.minBankroll = Math.min(this.minBankroll, this.currentBankroll);
    this.maxDrawdown = Math.max(
      this.maxDrawdown,
      this.currentBankroll - this.minBankroll,
    );

    // Track hand details if enabled - record each split hand separately
    if (this.config.enableHandTracking) {
      const handId = `H${this.handsPlayed + 1}`;
      const splitHandCount = playerHands.length;
      
      // Record each split hand as a separate HandDetails entry
      for (let subHandId = 0; subHandId < playerHands.length; subHandId++) {
        const hand = playerHands[subHandId];
        const handBet = hand.betAmount || betSize;
        
        // Calculate individual hand winnings
        let handWinnings = 0;
        
        // Special cases only apply to non-split scenarios or the original hand context
        if (splitHandCount === 1) {
          // No splits occurred - use the main simulation's special case logic
          if (playerHand.isBlackjack && dealerHand.isBlackjack) {
            handWinnings = 0; // Push
          } else if (playerHand.isBlackjack && !playerHand.isSplitAces) {
            handWinnings = handBet * 1.5; // Blackjack pays 3:2
          } else if (playerHand.isSplitAces && playerHand.value.soft === 21) {
            handWinnings = handBet; // Split Aces 21 pays 1:1
          } else if (dealerHand.isBlackjack) {
            handWinnings = -handBet; // Dealer blackjack
          } else {
            // Standard evaluation for single hand
            if (hand.value.soft > 21) {
              handWinnings = -handBet; // Player bust
            } else if (dealerHand.value.soft > 21) {
              handWinnings = handBet; // Dealer bust
            } else if (hand.value.soft > dealerHand.value.soft) {
              handWinnings = handBet; // Player wins
            } else if (hand.value.soft < dealerHand.value.soft) {
              handWinnings = -handBet; // Player loses
            } else {
              handWinnings = 0; // Push
            }
          }
        } else {
          // Split hands - evaluate each hand independently with standard logic
          if (dealerHand.isBlackjack) {
            handWinnings = -handBet; // Dealer blackjack beats all split hands
          } else if (hand.value.soft > 21) {
            handWinnings = -handBet; // Player bust
          } else if (dealerHand.value.soft > 21) {
            handWinnings = handBet; // Dealer bust
          } else if (hand.value.soft > dealerHand.value.soft) {
            handWinnings = handBet; // Player wins
          } else if (hand.value.soft < dealerHand.value.soft) {
            handWinnings = -handBet; // Player loses
          } else {
            handWinnings = 0; // Push
          }
        }

        this.handDetails.push({
          handNumber: this.handsPlayed + 1,
          handId,
          subHandId,
          splitHandCount,
          runningCountStart: willShuffleBeforeHand ? 0 : runningCountStart,
          trueCountStart: willShuffleBeforeHand ? 0 : trueCountStart,
          decksRemaining,
          betAmount: handBet,
          playerCardsInitial: playerInitialCards.map((c) => c.rank),
          dealerCardsInitial: dealerInitialCards.map((c) => c.rank),
          playerCardsInitialWithSuits: playerInitialCards.map((c) => formatCardWithSuit(c)),
          dealerCardsInitialWithSuits: dealerInitialCards.map((c) => formatCardWithSuit(c)),
          playerBlackjack: subHandId === 0 ? playerHand.isBlackjack : false, // Only first hand can be blackjack
          dealerBlackjack: dealerHand.isBlackjack,
          initialAction,
          totalBet,
          playerCardsFinal: hand.cards.map((c) => c.rank),
          dealerCardsFinal: dealerHand.cards.map((c) => c.rank),
          playerCardsFinalWithSuits: hand.cards.map((c) => formatCardWithSuit(c)),
          dealerCardsFinalWithSuits: dealerHand.cards.map((c) => formatCardWithSuit(c)),
          winnings: handWinnings,
          shuffleOccurred: this.shuffledThisHand,
        });
      }
    }

    // Casino-realistic: Check if we need to shuffle after this hand
    // (not during the hand like the old mid-hand shuffle logic)
    if (this.needReshuffle()) {
      this.needShuffleNext = true;
    }
    
    this.previousTrueCount = this.getTrueCount();
    this.handsPlayed++;
  }

  async simulate(
    progressCallback?: (current: number, total: number) => void,
  ): Promise<SimulationResults> {
    this.reset();

    const totalSimulations = this.config.numberOfSimulations;

    for (let i = 0; i < totalSimulations; i++) {
      this.playHand();

      if ((i + 1) % 100 === 0) {
        this.sessionResults.push({
          session: this.sessionResults.length + 1,
          bankroll: this.currentBankroll,
          hands: i + 1,
        });
      }

      // Progress callback every 1000 hands
      if (progressCallback && (i + 1) % 1000 === 0) {
        progressCallback(i + 1, totalSimulations);
      }

      // Yield to main thread more frequently for better UI responsiveness
      if ((i + 1) % 5000 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 0)); // Yield to main thread
      }
    }

    if (progressCallback) {
      progressCallback(totalSimulations, totalSimulations);
    }

    return this.getResults();
  }

  getResults(): SimulationResults {
    const totalOutcomes = this.wins + this.losses + this.pushes;
    return {
      handsPlayed: this.handsPlayed,
      totalOutcomes,
      wins: this.wins,
      losses: this.losses,
      pushes: this.pushes,
      blackjacks: this.blackjacks,
      playerBusts: this.playerBusts,
      dealerBusts: this.dealerBusts,
      surrenders: this.surrenders,
      winPercentage: (this.wins / totalOutcomes) * 100,
      lossPercentage: (this.losses / totalOutcomes) * 100,
      pushPercentage: (this.pushes / totalOutcomes) * 100,
      totalWagered: this.totalWagered,
      totalWon: this.totalWon,
      netResult: this.currentBankroll,
      expectedValue: this.totalWagered > 0 ? (this.totalWon / this.totalWagered) * 100 : 0,
      averageBetSize: this.totalWagered / this.handsPlayed,
      maxDrawdown: this.maxDrawdown,
      handsPerHour: this.config.handsPerHour ?? 80,
      countingSystem: this.countingSystem.name,
      sessionResults: this.sessionResults,
      handDetails: this.handDetails,
      busts: this.playerBusts,
      doubles: this.doubles,
      splits: this.splits,
      hands15: this.hands15,
      hands16: this.hands16,
    };
  }

  // Test-only getter methods (exposed for testing purposes)
  get testConfig() {
    return this.config;
  }
  get testCountingSystem() {
    return this.countingSystem;
  }
  get testShoe() {
    return this.shoe;
  }
  get testRunningCount() {
    return this.runningCount;
  }
  get testHandsPlayed() {
    return this.handsPlayed;
  }

  // Test-only methods (exposed for testing purposes)
  testGetCardValue(card: Pick<Card, 'rank'>): number {
    return this.getCardValue(card);
  }

  testCalculateHandValue(cards: Card[]): HandValue {
    return this.calculateHandValue(cards);
  }

  testIsBlackjack(hand: Hand): boolean {
    return this.isBlackjack(hand);
  }

  testIsSoftHand(hand: Hand): boolean {
    return this.isSoftHand(hand);
  }

  testIsPair(hand: Hand): boolean {
    return this.isPair(hand);
  }

  testGetTrueCount(): number {
    return this.getTrueCount();
  }

  testNeedReshuffle(): boolean {
    return this.needReshuffle();
  }

  testDealCard(): Card {
    return this.dealCard();
  }

  testGetBasicStrategyAction(playerHand: Hand, dealerUpCard: Card, canDouble: boolean, canSplit: boolean): string {
    return this.getBasicStrategyAction(playerHand, dealerUpCard, canDouble, canSplit);
  }

  updateCount(card: Card): void {
    this.runningCount += this.countingSystem.values[card.rank] || 0;
  }
}
