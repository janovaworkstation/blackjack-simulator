// Card counting systems
export const COUNTING_SYSTEMS = {
  HI_LO: {
    name: 'Hi-Lo',
    values: {
      'A': -1, '2': 1, '3': 1, '4': 1, '5': 1, '6': 1,
      '7': 0, '8': 0, '9': 0, '10': -1, 'J': -1, 'Q': -1, 'K': -1
    }
  },
  KO: {
    name: 'Knock-Out (KO)',
    values: {
      'A': -1, '2': 1, '3': 1, '4': 1, '5': 1, '6': 1, '7': 1,
      '8': 0, '9': 0, '10': -1, 'J': -1, 'Q': -1, 'K': -1
    }
  },
  HI_OPT_I: {
    name: 'Hi-Opt I',
    values: {
      'A': 0, '2': 0, '3': 1, '4': 1, '5': 1, '6': 1,
      '7': 0, '8': 0, '9': 0, '10': -1, 'J': -1, 'Q': -1, 'K': -1
    }
  }
};

// Basic Strategy Matrix
export const BASIC_STRATEGY = {
  // Hard totals: [2,3,4,5,6,7,8,9,10,A] dealer up cards
  5: ['H','H','H','H','H','H','H','H','H','H'],
  6: ['H','H','H','H','H','H','H','H','H','H'],
  7: ['H','H','H','H','H','H','H','H','H','H'],
  8: ['H','H','H','H','H','H','H','H','H','H'],
  9: ['H','D','D','D','D','H','H','H','H','H'],
  10: ['D','D','D','D','D','D','D','D','H','H'],
  11: ['D','D','D','D','D','D','D','D','D','H'],
  12: ['H','H','S','S','S','H','H','H','H','H'],
  13: ['S','S','S','S','S','H','H','H','H','H'],
  14: ['S','S','S','S','S','H','H','H','H','H'],
  15: ['S','S','S','S','S','H','H','H','H','H'],
  16: ['S','S','S','S','S','H','H','H','H','H'],
  17: ['S','S','S','S','S','S','S','S','S','S'],
  18: ['S','S','S','S','S','S','S','S','S','S'],
  19: ['S','S','S','S','S','S','S','S','S','S'],
  20: ['S','S','S','S','S','S','S','S','S','S'],
  21: ['S','S','S','S','S','S','S','S','S','S']
};

// Soft totals (with Ace)
export const SOFT_STRATEGY = {
  // Soft totals: A,2 through A,9
  13: ['H','H','H','D','D','H','H','H','H','H'], // A,2
  14: ['H','H','H','D','D','H','H','H','H','H'], // A,3
  15: ['H','H','D','D','D','H','H','H','H','H'], // A,4
  16: ['H','H','D','D','D','H','H','H','H','H'], // A,5
  17: ['H','D','D','D','D','H','H','H','H','H'], // A,6
  18: ['S','D','D','D','D','S','S','H','H','H'], // A,7
  19: ['S','S','S','S','S','S','S','S','S','S'], // A,8
  20: ['S','S','S','S','S','S','S','S','S','S'], // A,9
};

// Pair splitting strategy
export const PAIR_STRATEGY = {
  'A': ['Y','Y','Y','Y','Y','Y','Y','Y','Y','Y'], // A,A
  '2': ['Y','Y','Y','Y','Y','Y','N','N','N','N'], // 2,2
  '3': ['Y','Y','Y','Y','Y','Y','N','N','N','N'], // 3,3
  '4': ['N','N','N','Y','Y','N','N','N','N','N'], // 4,4
  '5': ['N','N','N','N','N','N','N','N','N','N'], // 5,5 (never split)
  '6': ['Y','Y','Y','Y','Y','N','N','N','N','N'], // 6,6
  '7': ['Y','Y','Y','Y','Y','Y','N','N','N','N'], // 7,7
  '8': ['Y','Y','Y','Y','Y','Y','Y','Y','Y','Y'], // 8,8
  '9': ['Y','Y','Y','Y','Y','N','Y','Y','N','N'], // 9,9
  '10': ['N','N','N','N','N','N','N','N','N','N'], // 10,10 (never split)
  'J': ['N','N','N','N','N','N','N','N','N','N'], // J,J (never split)
  'Q': ['N','N','N','N','N','N','N','N','N','N'], // Q,Q (never split)
  'K': ['N','N','N','N','N','N','N','N','N','N'], // K,K (never split)
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
    this.wins = 0;
    this.losses = 0;
    this.pushes = 0;
    this.doubles = 0;
    this.splits = 0;
    this.blackjacks = 0;
    this.busts = 0;
    this.maxDrawdown = 0;
    this.currentBankroll = 0;
    this.minBankroll = 0;
    this.sessionResults = [];
  }

  createShoe() {
    const cards = [];
    const cardTypes = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    
    for (let deck = 0; deck < this.config.decks; deck++) {
      for (let suit = 0; suit < 4; suit++) {
        cardTypes.forEach(card => cards.push(card));
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
    }
    
    const card = this.shoe.pop();
    this.runningCount += this.countingSystem.values[card];
    return card;
  }

  getCardValue(card) {
    if (['J','Q','K'].includes(card)) return 10;
    if (card === 'A') return 11;
    return parseInt(card);
  }

  calculateHandValue(hand) {
    let value = 0;
    let aces = 0;
    
    hand.forEach(card => {
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
    
    hand.forEach(card => {
      if (card === 'A') hasAce = true;
      value += this.getCardValue(card);
    });
    
    return hasAce && value <= 21 && (value - 10) < 21;
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
    const trueCount = this.getTrueCount();
    const { minBet, maxBet } = this.config;
    
    if (trueCount < 1) return minBet;
    
    const betMultiplier = Math.max(1, Math.floor(trueCount));
    const betSize = minBet * betMultiplier;
    
    return Math.min(betSize, maxBet);
  }

  getBasicStrategyAction(playerHand, dealerUpCard, canDouble = true, canSplit = true) {
    const playerTotal = this.calculateHandValue(playerHand);
    const dealerIndex = ['2','3','4','5','6','7','8','9','10','A'].indexOf(dealerUpCard);
    
    // Check for pair splitting first
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
    // Deal initial cards
    const playerHand = [this.dealCard(), this.dealCard()];
    const dealerHand = [this.dealCard(), this.dealCard()];
    
    const baseBetSize = this.getBetSize();
    let totalBet = baseBetSize;
    this.totalWagered += baseBetSize;
    
    // Check for blackjacks
    const playerBlackjack = this.isBlackjack(playerHand);
    const dealerBlackjack = this.isBlackjack(dealerHand);
    
    if (playerBlackjack && dealerBlackjack) {
      this.pushes++;
      return 0; // Push
    }
    
    if (playerBlackjack) {
      this.blackjacks++;
      this.wins++;
      const winnings = Math.floor(baseBetSize * 1.5); // 3:2 payout
      this.totalWon += winnings;
      this.currentBankroll += winnings;
      return winnings;
    }
    
    if (dealerBlackjack) {
      this.losses++;
      this.currentBankroll -= baseBetSize;
      return -baseBetSize;
    }
    
    // Player plays
    let hands = [{ cards: playerHand, bet: baseBetSize, canDouble: true }];
    let handResults = [];
    
    // Process each hand (for splits)
    for (let handIndex = 0; handIndex < hands.length; handIndex++) {
      const currentHand = hands[handIndex];
      let playerTotal = this.calculateHandValue(currentHand.cards);
      
      // Player decision loop
      let decisionCount = 0;
      while (playerTotal < 21 && decisionCount < 10) { // Safety limit
        decisionCount++;
        const action = this.getBasicStrategyAction(
          currentHand.cards,
          dealerHand[0],
          currentHand.canDouble,
          hands.length < 4 && currentHand.cards.length === 2
        );
        
        if (action === 'S') break;
        
        if (action === 'H') {
          currentHand.cards.push(this.dealCard());
          currentHand.canDouble = false;
        } else if (action === 'D') {
          currentHand.cards.push(this.dealCard());
          this.totalWagered += currentHand.bet;
          totalBet += currentHand.bet;
          currentHand.bet *= 2;
          this.doubles++;
          break;
        } else if (action === 'P') {
          // Split
          const newHand = {
            cards: [currentHand.cards.pop()],
            bet: currentHand.bet,
            canDouble: true
          };
          currentHand.cards.push(this.dealCard());
          newHand.cards.push(this.dealCard());
          hands.push(newHand);
          this.totalWagered += newHand.bet;
          totalBet += newHand.bet;
          this.splits++;
          currentHand.canDouble = true;
        }
        
        playerTotal = this.calculateHandValue(currentHand.cards);
      }
      
      handResults.push({
        cards: currentHand.cards,
        total: playerTotal,
        bet: currentHand.bet,
        busted: playerTotal > 21
      });
    }
    
    // Dealer plays
    let dealerTotal = this.calculateHandValue(dealerHand);
    while (dealerTotal < 17) {
      dealerHand.push(this.dealCard());
      dealerTotal = this.calculateHandValue(dealerHand);
    }
    
    // Determine results for each hand
    let totalWinnings = 0;
    
    handResults.forEach(hand => {
      if (hand.busted) {
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
    
    return totalWinnings;
  }

  async simulate(progressCallback) {
    console.log('Simulation starting, hands:', this.config.hands);
    this.reset();
    console.log('Reset complete, starting loop...');
    
    for (let i = 0; i < this.config.hands; i++) {
      if (i === 0) console.log('Playing first hand...');
      
      try {
        this.playHand();
        this.handsPlayed++;
        
        // Update progress every 1000 hands
        if (progressCallback && (i + 1) % 1000 === 0) {
          progressCallback(i + 1, this.config.hands);
        }
        
        // Store session data every 1000 hands for charting
        if (i % 1000 === 0) {
          this.sessionResults.push({
            hand: i,
            bankroll: this.currentBankroll,
            runningCount: this.runningCount,
            trueCount: this.getTrueCount()
          });
          // Yield control after storing data to keep UI responsive
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        
        if (i === 0) console.log('First hand completed successfully');
      } catch (error) {
        console.error('Error playing hand', i, ':', error);
        throw error;
      }
    }
    
    // Final progress update
    if (progressCallback) {
      progressCallback(this.config.hands, this.config.hands);
    }
    
    console.log('Simulation loop complete, getting results...');
    return this.getResults();
  }

  getResults() {
    const winPercentage = this.handsPlayed > 0 ? (this.wins / this.handsPlayed * 100) : 0;
    const lossPercentage = this.handsPlayed > 0 ? (this.losses / this.handsPlayed * 100) : 0;
    const pushPercentage = this.handsPlayed > 0 ? (this.pushes / this.handsPlayed * 100) : 0;
    const expectedValue = this.totalWagered > 0 ? (this.totalWon / this.totalWagered * 100) : 0;
    const avgBetSize = this.handsPlayed > 0 ? (this.totalWagered / this.handsPlayed) : 0;
    
    return {
      handsPlayed: this.handsPlayed,
      wins: this.wins,
      losses: this.losses,
      pushes: this.pushes,
      blackjacks: this.blackjacks,
      doubles: this.doubles,
      splits: this.splits,
      busts: this.busts,
      winPercentage: parseFloat(winPercentage.toFixed(2)),
      lossPercentage: parseFloat(lossPercentage.toFixed(2)),
      pushPercentage: parseFloat(pushPercentage.toFixed(2)),
      totalWagered: this.totalWagered,
      totalWon: this.totalWon,
      netResult: this.totalWon,
      expectedValue: parseFloat(expectedValue.toFixed(2)),
      averageBetSize: parseFloat(avgBetSize.toFixed(2)),
      maxDrawdown: this.maxDrawdown,
      finalBankroll: this.currentBankroll,
      sessionResults: this.sessionResults,
      countingSystem: this.countingSystem.name,
      handsPerHour: this.handsPerHour
    };
  }
}
