import {
  Card,
  Hand,
  HandValue,
  SimulationConfig,
  HandDetails,
  SimulationResults,
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

// Basic Strategy Matrix
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

// Soft totals (with Ace)
export const SOFT_STRATEGY: { [key: number]: string[] } = {
  // Soft totals: A,2 through A,9
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

  constructor(config: SimulationConfig, countingSystem = 'HI_LO') {
    this.config = config;
    this.countingSystem = COUNTING_SYSTEMS[countingSystem];
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
    if (this.needReshuffle()) {
      this.shoe = this.createShoe();
      this.runningCount = 0;
      this.lastHandWasShuffle = true;
    } else {
      this.lastHandWasShuffle = false;
    }

    const card = this.shoe.pop();
    if (!card) {
      throw new Error('Shoe is empty, cannot deal card.');
    }
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
    return hand.value.hard !== hand.value.soft;
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

  private getBetSize(): number {
    const trueCount = this.previousTrueCount;
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

    if (
      this.config.playerCanSurrender &&
      playerHand.cards.length === 2 &&
      !this.isSoftHand(playerHand)
    ) {
      const surrenderAction =
        SURRENDER_STRATEGY[playerHand.value.hard]?.[dealerIndex];
      if (surrenderAction === 'Y') return 'R'; // Surrender
    }

    if (canSplit && this.isPair(playerHand)) {
      const pairCardRank = playerHand.cards[0].rank;
      const splitAction = PAIR_STRATEGY[pairCardRank]?.[dealerIndex];
      if (splitAction === 'Y') return 'P'; // Split
    }

    if (this.isSoftHand(playerHand)) {
      const softStrategy = SOFT_STRATEGY[playerTotal];
      if (softStrategy) {
        let action = softStrategy[dealerIndex];
        if (action === 'D' && !canDouble) action = 'H';
        return action;
      }
    }

    const hardTotal = playerHand.value.hard;
    const strategy = BASIC_STRATEGY[hardTotal] || BASIC_STRATEGY[21];
    let action = strategy[dealerIndex];

    if (action === 'D' && !canDouble) action = 'H';

    return action;
  }

  private playHand(): void {
    const betSize = this.getBetSize();
    const runningCountStart = this.runningCount;
    const trueCountStart = this.getTrueCount();

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

    if (playerHand.isBlackjack && dealerHand.isBlackjack) {
      this.pushes++;
      winnings = 0;
      initialAction = 'Push';
    } else if (playerHand.isBlackjack) {
      this.wins++;
      this.blackjacks++;
      winnings = betSize * 1.5;
      initialAction = 'Blackjack';
    } else if (dealerHand.isBlackjack) {
      this.losses++;
      winnings = -betSize;
      initialAction = 'Loss';
    } else {
      // Player's turn
      const playerHands: Hand[] = [playerHand];
      let handIndex = 0;
      while (handIndex < playerHands.length) {
        const currentHand = playerHands[handIndex];
        let canDouble = this.config.playerCanDouble;
        let canSplit = this.config.playerCanSplit;

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

          if (action === 'S') break;

          if (action === 'R') {
            this.surrenders++;
            winnings = -betSize / 2;
            totalBet = betSize / 2;
            break;
          }

          if (action === 'H') {
            currentHand.cards.push(this.dealCard());
            currentHand.value = this.calculateHandValue(currentHand.cards);
            canDouble = false;
          } else if (action === 'D') {
            this.doubles++;
            totalBet += betSize;
            currentHand.cards.push(this.dealCard());
            currentHand.value = this.calculateHandValue(currentHand.cards);
            break;
          } else if (action === 'P') {
            this.splits++;
            totalBet += betSize;
            const cardToSplit = currentHand.cards.pop()!;
            const newHand: Hand = {
              cards: [cardToSplit, this.dealCard()],
              value: { hard: 0, soft: 0 },
              isBlackjack: false,
            };
            newHand.value = this.calculateHandValue(newHand.cards);
            playerHands.push(newHand);

            currentHand.cards.push(this.dealCard());
            currentHand.value = this.calculateHandValue(currentHand.cards);
            canSplit = false;
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
        const currentBet = hand.cards.length > 2 ? betSize * 2 : betSize;
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
    this.totalWon += winnings;
    this.currentBankroll += winnings;
    this.minBankroll = Math.min(this.minBankroll, this.currentBankroll);
    this.maxDrawdown = Math.max(
      this.maxDrawdown,
      this.currentBankroll - this.minBankroll,
    );

    // Only track hand details if enabled and under limit
    if (this.config.enableHandTracking && this.handDetails.length < 1000) {
      this.handDetails.push({
        handNumber: this.handsPlayed + 1,
        runningCountStart,
        trueCountStart,
        betAmount: betSize,
        playerCardsInitial: playerInitialCards.map((c) => c.rank),
        dealerCardsInitial: dealerInitialCards.map((c) => c.rank),
        playerBlackjack: playerHand.isBlackjack,
        dealerBlackjack: dealerHand.isBlackjack,
        initialAction,
        totalBet,
        playerCardsFinal: playerHand.cards.map((c) => c.rank),
        dealerCardsFinal: dealerHand.cards.map((c) => c.rank),
        winnings,
        shuffleOccurred: this.lastHandWasShuffle,
      });
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

      if (progressCallback && (i + 1) % 1000 === 0) {
        progressCallback(i + 1, totalSimulations);
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
      expectedValue: this.currentBankroll / this.handsPlayed,
      averageBetSize: this.totalWagered / this.handsPlayed,
      maxDrawdown: this.maxDrawdown,
      handsPerHour: 100, // Placeholder
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
}
