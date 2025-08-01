// Card counting systems
export const COUNTING_SYSTEMS = {
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
export const BASIC_STRATEGY = {
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
export const SOFT_STRATEGY = {
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
export const SURRENDER_STRATEGY = {
  // Hard totals that should surrender: [2,3,4,5,6,7,8,9,10,A] dealer up cards
  15: ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'Y', 'N'], // 15 vs 10
  16: ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'Y', 'Y', 'Y'], // 16 vs 9, 10, A
};

// Pair splitting strategy
export const PAIR_STRATEGY = {
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
  J: ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'], // J,J (never split)
  Q: ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'], // Q,Q (never split)
  K: ['N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N', 'N'], // K,K (never split)
};

export class BlackjackSimulation {
  constructor(config, countingSystem = 'HI_LO') {
    this.config = config;
    this.countingSystem = COUNTING_SYSTEMS[countingSystem];
    this.handsPerHour = config.handsPerHour || 80; // Store at simulation time
    this.reset();
  }

  reset() {
    this.shoe = this.createShoe();
    this.runningCount = 0;
    this.handsPlayed = 0;
    this.totalWon = 0;
    this.totalWagered = 0;
    this.totalInitialBets = 0; // Track only initial bets (before doubles/splits)
    this.wins = 0;
    this.losses = 0;
    this.pushes = 0;
    this.doubles = 0;
    this.splits = 0;
    this.surrenders = 0;
    this.blackjacks = 0;
    this.busts = 0;
    this.hands15 = 0; // Track hands dealt as 15
    this.hands16 = 0; // Track hands dealt as 16
    this.maxDrawdown = 0;
    this.currentBankroll = 0;
    this.minBankroll = 0;
    this.sessionResults = [];
    this.handDetails = [];
    this.previousHandCount = 0; // Count from end of previous hand
    this.previousTrueCount = 0; // True count from end of previous hand
    this.lastHandWasShuffle = true; // First hand is always after initial shuffle
  }

  createShoe() {
    const cards = [];
    const cardTypes = [
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

    for (let deck = 0; deck < this.config.decks; deck++) {
      for (let suit = 0; suit < 4; suit++) {
        cardTypes.forEach((card) => cards.push(card));
      }
    }

    return this.shuffle(cards);
  }

  shuffle(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  needReshuffle() {
    const cardsRemaining = this.shoe.length;
    const totalCards = this.config.decks * 52;
    const penetrationPoint = totalCards * (1 - this.config.penetration);
    return cardsRemaining <= penetrationPoint;
  }

  dealCard() {
    if (this.shoe.length === 0 || this.needReshuffle()) {
      this.shoe = this.createShoe();
      this.runningCount = 0;
      this.lastHandWasShuffle = true; // Flag to track shuffle occurred
    }

    const card = this.shoe.pop();
    this.runningCount += this.countingSystem.values[card];
    return card;
  }

  getCardValue(card) {
    if (['J', 'Q', 'K'].includes(card)) return 10;
    if (card === 'A') return 11;
    return parseInt(card);
  }

  calculateHandValue(hand) {
    let value = 0;
    let aces = 0;

    hand.forEach((card) => {
      if (card === 'A') {
        aces++;
        value += 11;
      } else {
        value += this.getCardValue(card);
      }
    });

    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }

    return value;
  }

  isBlackjack(hand) {
    return hand.length === 2 && this.calculateHandValue(hand) === 21;
  }

  isSoftHand(hand) {
    let hasAce = false;
    let value = 0;

    hand.forEach((card) => {
      if (card === 'A') hasAce = true;
      value += this.getCardValue(card);
    });

    return hasAce && value <= 21 && value - 10 < 21;
  }

  isPair(hand) {
    if (hand.length !== 2) return false;
    const [card1, card2] = hand;
    return this.getCardValue(card1) === this.getCardValue(card2);
  }

  getTrueCount() {
    const decksRemaining = this.shoe.length / 52;
    return decksRemaining > 0 ? this.runningCount / decksRemaining : 0;
  }

  getBetSize() {
    // Use the count from the END of the previous hand for betting decisions
    const trueCount = this.handsPlayed === 0 ? 0 : this.previousTrueCount;
    const { bettingTable, minBet, maxBet } = this.config;

    // If betting table is available, use it
    if (bettingTable && bettingTable.length > 0) {
      for (const row of bettingTable) {
        if (trueCount >= row.minCount && trueCount <= row.maxCount) {
          return Math.min(row.betAmount, maxBet);
        }
      }
      // If no range matches, fall back to minimum bet
      return minBet;
    }

    // Legacy betting logic (fallback)
    if (trueCount < 1) return minBet;

    const betMultiplier = Math.max(1, Math.floor(trueCount));
    const betSize = minBet * betMultiplier;

    return Math.min(betSize, maxBet);
  }

  getBasicStrategyAction(
    playerHand,
    dealerUpCard,
    canDouble = true,
    canSplit = true,
  ) {
    const playerTotal = this.calculateHandValue(playerHand);

    // Normalize face cards to '10' for strategy lookup
    const normalizedDealerCard = ['J', 'Q', 'K'].includes(dealerUpCard)
      ? '10'
      : dealerUpCard;
    const dealerIndex = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'A',
    ].indexOf(normalizedDealerCard);

    // Safety check - if dealer card not found, default to 10
    if (dealerIndex === -1) {
      console.warn(`Unknown dealer card: ${dealerUpCard}, defaulting to 10`);
      return this.getBasicStrategyAction(playerHand, '10', canDouble, canSplit);
    }

    // Check for surrender first (only on initial 2-card hands)
    if (
      this.config.surrenderAllowed &&
      playerHand.length === 2 &&
      !this.isSoftHand(playerHand)
    ) {
      const surrenderAction = SURRENDER_STRATEGY[playerTotal]?.[dealerIndex];
      if (surrenderAction === 'Y') return 'R'; // Surrender
    }

    // Check for pair splitting
    if (canSplit && this.isPair(playerHand)) {
      const pairCard = playerHand[0];
      const splitAction = PAIR_STRATEGY[pairCard]?.[dealerIndex];
      if (splitAction === 'Y') return 'P'; // Split
    }

    // Check for soft hands
    if (this.isSoftHand(playerHand)) {
      const softStrategy = SOFT_STRATEGY[playerTotal];
      if (softStrategy) {
        let action = softStrategy[dealerIndex];
        if (action === 'D' && !canDouble) action = 'H';
        return action;
      }
    }

    // Hard totals
    const strategy = BASIC_STRATEGY[playerTotal] || BASIC_STRATEGY[21];
    let action = strategy[dealerIndex];

    if (action === 'D' && !canDouble) action = 'H';

    return action;
  }

  playHand() {
    // Capture the count that was used for betting (from previous hand)
    const bettingRunningCount =
      this.handsPlayed === 0 ? 0 : this.previousHandCount;
    const bettingTrueCount =
      this.handsPlayed === 0 ? 0 : this.previousTrueCount;

    // Determine bet size based on count from PREVIOUS hand
    const baseBetSize = this.getBetSize();
    let totalBet = baseBetSize;
    this.totalWagered += baseBetSize;
    this.totalInitialBets += baseBetSize; // Track the initial bet amount

    // NOW deal initial cards (this will change the count)
    const playerHand = [this.dealCard(), this.dealCard()];
    const dealerHand = [this.dealCard(), this.dealCard()];

    // Initialize hand tracking
    const handDetail = this.config.enableHandTracking
      ? {
          handNumber: this.handsPlayed + 1,
          playerCardsInitial: [...playerHand],
          dealerCardsInitial: [...dealerHand],
          playerCardsFinal: [],
          dealerCardsFinal: [],
          runningCountStart: bettingRunningCount,
          trueCountStart: bettingTrueCount,
          runningCountEnd: null,
          trueCountEnd: null,
          betAmount: baseBetSize,
          totalBet: baseBetSize,
          initialAction: null,
          actions: [],
          outcome: null,
          winnings: 0,
          playerTotal: this.calculateHandValue(playerHand),
          dealerTotal: this.calculateHandValue(dealerHand),
          playerBlackjack: false,
          dealerBlackjack: false,
          errors: [],
          shuffleOccurred: this.lastHandWasShuffle, // Track if shuffle happened before this hand
        }
      : null;

    // Reset shuffle flag after capturing it
    this.lastHandWasShuffle = false;

    // Track initial hand totals for surrender analysis
    const initialTotal = this.calculateHandValue(playerHand);
    if (initialTotal === 15 && !this.isSoftHand(playerHand)) this.hands15++;
    if (initialTotal === 16 && !this.isSoftHand(playerHand)) this.hands16++;

    // Capture initial basic strategy action
    if (
      handDetail &&
      !this.isBlackjack(playerHand) &&
      !this.isBlackjack(dealerHand)
    ) {
      const initialAction = this.getBasicStrategyAction(
        playerHand,
        dealerHand[0],
        true,
        true,
      );
      const actionMap = {
        H: 'Hit',
        S: 'Stand',
        D: 'Double',
        P: 'Split',
        R: 'Surrender',
      };
      handDetail.initialAction = actionMap[initialAction] || initialAction;
    } else if (handDetail) {
      handDetail.initialAction = this.isBlackjack(playerHand)
        ? 'Blackjack'
        : 'vs Dealer BJ';
    }

    // Check for blackjacks
    const playerBlackjack = this.isBlackjack(playerHand);
    const dealerBlackjack = this.isBlackjack(dealerHand);

    if (playerBlackjack && dealerBlackjack) {
      this.pushes++;
      if (handDetail) {
        handDetail.outcome = 'push';
        handDetail.winnings = 0;
        handDetail.actions = ['Blackjack Push'];
        handDetail.playerCardsFinal = playerHand.join(', ');
        handDetail.dealerCardsFinal = dealerHand;
        handDetail.runningCountEnd = this.runningCount;
        handDetail.trueCountEnd = this.getTrueCount();
        this.handDetails.push(handDetail);
      }
      // Store count from END of this hand for next hand's betting
      this.previousHandCount = this.runningCount;
      this.previousTrueCount = this.getTrueCount();
      return 0; // Push
    }

    if (playerBlackjack) {
      this.blackjacks++;
      this.wins++;
      const winnings = Math.floor(baseBetSize * 1.5); // 3:2 payout
      this.totalWon += winnings;
      this.currentBankroll += winnings;
      if (handDetail) {
        handDetail.outcome = 'win';
        handDetail.winnings = winnings;
        handDetail.actions = ['Blackjack'];
        handDetail.playerCardsFinal = playerHand.join(', ');
        handDetail.dealerCardsFinal = dealerHand;
        handDetail.runningCountEnd = this.runningCount;
        handDetail.trueCountEnd = this.getTrueCount();
        this.handDetails.push(handDetail);
      }
      // Store count from END of this hand for next hand's betting
      this.previousHandCount = this.runningCount;
      this.previousTrueCount = this.getTrueCount();
      return winnings;
    }

    if (dealerBlackjack) {
      this.losses++;
      this.currentBankroll -= baseBetSize;
      if (handDetail) {
        handDetail.outcome = 'loss';
        handDetail.winnings = -baseBetSize;
        handDetail.actions = ['Lost to Dealer Blackjack'];
        handDetail.playerCardsFinal = playerHand.join(', ');
        handDetail.dealerCardsFinal = dealerHand;
        handDetail.runningCountEnd = this.runningCount;
        handDetail.trueCountEnd = this.getTrueCount();
        this.handDetails.push(handDetail);
      }
      // Store count from END of this hand for next hand's betting
      this.previousHandCount = this.runningCount;
      this.previousTrueCount = this.getTrueCount();
      return -baseBetSize;
    }

    // Player plays
    const hands = [{ cards: playerHand, bet: baseBetSize, canDouble: true }];
    const handResults = [];

    // Process each hand (for splits)
    for (let handIndex = 0; handIndex < hands.length; handIndex++) {
      const currentHand = hands[handIndex];
      let playerTotal = this.calculateHandValue(currentHand.cards);

      // Player decision loop
      let decisionCount = 0;
      let hasActed = false;
      while (playerTotal < 21 && decisionCount < 10) {
        // Safety limit
        decisionCount++;
        const action = this.getBasicStrategyAction(
          currentHand.cards,
          dealerHand[0],
          currentHand.canDouble,
          hands.length < 4 && currentHand.cards.length === 2,
        );

        if (action === 'S') {
          if (handDetail && handDetail.actions && !hasActed)
            handDetail.actions.push('Stand');
          break;
        }

        if (action === 'R') {
          // Surrender - lose half the bet
          if (handDetail && handDetail.actions)
            handDetail.actions.push('Surrender');
          this.surrenders++;
          handResults.push({
            cards: currentHand.cards,
            total: playerTotal,
            bet: currentHand.bet,
            busted: false,
            surrendered: true,
          });
          break;
        }

        hasActed = true;

        if (action === 'H') {
          const hitCard = this.dealCard();
          if (handDetail && handDetail.actions) {
            handDetail.actions.push(`Hit:${hitCard}`);
          }
          currentHand.cards.push(hitCard);
          currentHand.canDouble = false;
        } else if (action === 'D') {
          const doubleCard = this.dealCard();
          if (handDetail && handDetail.actions) {
            handDetail.actions.push(`Double:${doubleCard}`);
          }
          currentHand.cards.push(doubleCard);
          // Add the additional bet amount (equal to original bet)
          this.totalWagered += currentHand.bet;
          totalBet += currentHand.bet;
          currentHand.bet *= 2; // Now the hand bet represents total amount at risk
          this.doubles++;
          break;
        } else if (action === 'P') {
          // Split
          const splitCard1 = this.dealCard();
          const splitCard2 = this.dealCard();
          if (handDetail && handDetail.actions) {
            handDetail.actions.push(`Split:${splitCard1},${splitCard2}`);
          }
          const newHand = {
            cards: [currentHand.cards.pop()],
            bet: currentHand.bet,
            canDouble: true,
          };
          currentHand.cards.push(splitCard1);
          newHand.cards.push(splitCard2);
          hands.push(newHand);
          this.totalWagered += newHand.bet;
          totalBet += newHand.bet;
          this.splits++;
          currentHand.canDouble = true;
        }

        playerTotal = this.calculateHandValue(currentHand.cards);
      }

      const isBusted = playerTotal > 21;
      if (isBusted && handDetail && handDetail.actions) {
        handDetail.actions.push('Bust');
      } else if (!hasActed && handDetail && handDetail.actions) {
        // Player stood on initial hand (like 20 or 21)
        handDetail.actions.push('Stand');
      }

      // Only add to results if hand wasn't surrendered
      const wasSurrendered = handResults.some(
        (h) => h.cards === currentHand.cards && h.surrendered,
      );
      if (!wasSurrendered) {
        // Recalculate final total after all cards added
        const finalTotal = this.calculateHandValue(currentHand.cards);
        handResults.push({
          cards: currentHand.cards,
          total: finalTotal,
          bet: currentHand.bet,
          busted: finalTotal > 21,
        });
      }
    }

    // Dealer plays only if at least one player hand didn't bust
    const anyPlayerHandsAlive = handResults.some(
      (hand) => !hand.busted && !hand.surrendered,
    );
    let dealerTotal = this.calculateHandValue(dealerHand);

    if (anyPlayerHandsAlive) {
      while (
        dealerTotal < 17 ||
        (dealerTotal === 17 &&
          this.config.dealerHitsSoft17 &&
          this.isSoftHand(dealerHand))
      ) {
        const dealerCard = this.dealCard();
        dealerHand.push(dealerCard);
        dealerTotal = this.calculateHandValue(dealerHand);
      }
    }
    // If all player hands busted/surrendered, dealer just reveals hole card (no additional draws)

    // Determine results for each hand
    let totalWinnings = 0;

    handResults.forEach((hand) => {
      if (hand.surrendered) {
        this.losses++;
        totalWinnings -= hand.bet / 2; // Lose half bet on surrender
      } else if (hand.busted) {
        this.losses++;
        this.busts++;
        totalWinnings -= hand.bet;
      } else if (dealerTotal > 21) {
        this.wins++;
        totalWinnings += hand.bet;
      } else if (hand.total > dealerTotal) {
        this.wins++;
        totalWinnings += hand.bet;
      } else if (dealerTotal > hand.total) {
        this.losses++;
        totalWinnings -= hand.bet;
      } else {
        this.pushes++;
        // Push - no change to winnings
      }
    });

    this.totalWon += totalWinnings;
    this.currentBankroll += totalWinnings;
    this.minBankroll = Math.min(this.minBankroll, this.currentBankroll);
    this.maxDrawdown = Math.max(this.maxDrawdown, -this.minBankroll);

    // Complete hand tracking
    if (handDetail) {
      handDetail.runningCountEnd = this.runningCount;
      handDetail.trueCountEnd = this.getTrueCount();
      handDetail.totalBet = totalBet;
      handDetail.winnings = totalWinnings;
      handDetail.dealerTotal = dealerTotal;
      handDetail.playerBlackjack = playerBlackjack;
      handDetail.dealerBlackjack = dealerBlackjack;
      handDetail.playerCardsFinal = handResults
        .map((h) => h.cards.join(', '))
        .join(' | ');
      handDetail.dealerCardsFinal = dealerHand;

      if (totalWinnings > 0) {
        handDetail.outcome = 'win';
      } else if (totalWinnings < 0) {
        handDetail.outcome = 'loss';
      } else {
        handDetail.outcome = 'push';
      }

      this.handDetails.push(handDetail);
    }

    // Store count from END of this hand for next hand's betting
    this.previousHandCount = this.runningCount;
    this.previousTrueCount = this.getTrueCount();

    return totalWinnings;
  }

  async simulate(progressCallback) {
    console.log('Simulation starting, hands:', this.config.hands);
    this.reset();
    console.log('Reset complete, starting loop...');

    // Limit hands when tracking is enabled for performance
    const maxHands = this.config.enableHandTracking
      ? Math.min(this.config.hands, 1000)
      : this.config.hands;

    for (let i = 0; i < maxHands; i++) {
      if (i === 0) console.log('Playing first hand...');

      try {
        this.playHand();
        this.handsPlayed++;

        // Update progress every 1000 hands
        if (progressCallback && (i + 1) % 1000 === 0) {
          progressCallback(i + 1, maxHands);
        }

        // Store session data every 1000 hands for charting
        if (i % 1000 === 0) {
          this.sessionResults.push({
            hand: i,
            bankroll: this.currentBankroll,
            runningCount: this.runningCount,
            trueCount: this.getTrueCount(),
          });
          // Yield control after storing data to keep UI responsive
          await new Promise((resolve) => setTimeout(resolve, 10));
        }

        if (i === 0) console.log('First hand completed successfully');
      } catch (error) {
        console.error('Error playing hand', i, ':', error);
        throw error;
      }
    }

    // Final progress update
    if (progressCallback) {
      progressCallback(maxHands, maxHands);
    }

    console.log('Simulation loop complete, getting results...');
    return this.getResults();
  }

  getResults() {
    // Total outcomes includes split hands
    const totalOutcomes = this.wins + this.losses + this.pushes;

    // Calculate percentages based on total outcomes (including splits)
    const winPercentage =
      totalOutcomes > 0 ? (this.wins / totalOutcomes) * 100 : 0;
    const lossPercentage =
      totalOutcomes > 0 ? (this.losses / totalOutcomes) * 100 : 0;
    const pushPercentage =
      totalOutcomes > 0 ? (this.pushes / totalOutcomes) * 100 : 0;
    // Expected Value should be based on net profit (final bankroll)
    const netProfit = this.currentBankroll;
    const expectedValue =
      this.totalWagered > 0 ? (netProfit / this.totalWagered) * 100 : 0;
    const avgBetSize =
      this.handsPlayed > 0 ? this.totalInitialBets / this.handsPlayed : 0;

    return {
      handsPlayed: this.handsPlayed,
      totalOutcomes: totalOutcomes, // Include total outcomes for clarity
      wins: this.wins,
      losses: this.losses,
      pushes: this.pushes,
      blackjacks: this.blackjacks,
      doubles: this.doubles,
      splits: this.splits,
      surrenders: this.surrenders,
      busts: this.busts,
      hands15: this.hands15,
      hands16: this.hands16,
      winPercentage: parseFloat(winPercentage.toFixed(2)),
      lossPercentage: parseFloat(lossPercentage.toFixed(2)),
      pushPercentage: parseFloat(pushPercentage.toFixed(2)),
      totalWagered: this.totalWagered,
      totalWon: this.totalWon,
      netResult: this.currentBankroll,
      expectedValue: parseFloat(expectedValue.toFixed(2)),
      averageBetSize: parseFloat(avgBetSize.toFixed(2)),
      maxDrawdown: this.maxDrawdown,
      finalBankroll: this.currentBankroll,
      sessionResults: this.sessionResults,
      countingSystem: this.countingSystem.name,
      handsPerHour: this.handsPerHour,
      handDetails: this.config.enableHandTracking ? this.handDetails : null,
    };
  }
}
