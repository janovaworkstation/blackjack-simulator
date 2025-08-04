import { useState, useCallback, useEffect } from 'react';

interface Card {
  rank: string;
  suit: string;
  value: number;
}

interface GameState {
  canHit: boolean;
  canStand: boolean;
  canDouble: boolean;
  canSplit: boolean;
  canSurrender: boolean;
  canDeal: boolean;
  currentBet: number;
  originalBet: number; // Track original bet before doubling
  bankroll: number;
  playerHand: string[];
  dealerHand: string[];
  handValue: number;
  dealerValue: number;
  gameStatus: 'betting' | 'playing' | 'dealer-playing' | 'complete' | 'insurance-offered';
  message: string;
  insuranceBet: number;
  canTakeInsurance: boolean;
  // Win/Loss tracking for display
  lastHandResult: 'won' | 'lost' | null;
  lastHandAmount: number;
  // Split hands
  isSplit: boolean;
  activeHand: number; // 0 or 1 for which split hand is active
  splitHands: {
    cards: string[];
    value: number;
    isComplete: boolean;
    isBust: boolean;
    is21: boolean;
  }[];
  splitCount: number; // Track number of splits (max 2 total hands)
}

export function useBlackjackGame() {
  const [gameState, setGameState] = useState<GameState>({
    canHit: false,
    canStand: false,
    canDouble: false,
    canSplit: false,
    canSurrender: false,
    canDeal: false,
    currentBet: 0,
    originalBet: 0,
    bankroll: 1000,
    playerHand: [],
    dealerHand: [],
    handValue: 0,
    dealerValue: 0,
    gameStatus: 'betting',
    message: 'Place your bet to start',
    insuranceBet: 0,
    canTakeInsurance: false,
    // Win/Loss tracking
    lastHandResult: null,
    lastHandAmount: 0,
    // Split hands
    isSplit: false,
    activeHand: 0,
    splitHands: [],
    splitCount: 0
  });

  const [deck, setDeck] = useState<Card[]>([]);
  const [shoeSize] = useState<number>(6); // 6-deck shoe
  const [penetrationLevel] = useState<number>(0.75); // Shuffle at 75% penetration
  const [totalCardsInShoe, setTotalCardsInShoe] = useState<number>(312); // 6 * 52 = 312
  const [needsShuffle, setNeedsShuffle] = useState<boolean>(true);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [dealerIsPlaying, setDealerIsPlaying] = useState(false);
  const [waitingForHoleCardFlip, setWaitingForHoleCardFlip] = useState(false);
  const [isDealing, setIsDealing] = useState(false);
  const [isPlayerBlackjack, setIsPlayerBlackjack] = useState(false);
  const [shouldDealerContinue, setShouldDealerContinue] = useState(false);
  const [chipStack, setChipStack] = useState<number[]>([]); // Array of chip values in betting stack
  const [doubleChipStack, setDoubleChipStack] = useState<number[]>([]); // Second chip stack for double bets
  const [previousBaseBet, setPreviousBaseBet] = useState<number>(0); // Store last base bet amount for auto-default
  const [previousBaseChipStack, setPreviousBaseChipStack] = useState<number[]>([]); // Store last base chip stack for auto-default
  const [dealerCheckComplete, setDealerCheckComplete] = useState<boolean>(false); // Track when dealer blackjack check is complete
  const [runningCount, setRunningCount] = useState<number>(0); // Hi-Lo running count
  const [trueCount, setTrueCount] = useState<number>(0); // True count (running count / decks remaining)
  const [insuranceChipStack, setInsuranceChipStack] = useState<number[]>([]); // Array of chip values for insurance bet
  const [splitChipStack, setSplitChipStack] = useState<number[]>([]); // Array of chip values for split bet
  const [splitPlayerCards, setSplitPlayerCards] = useState<Card[][]>([[]]); // Array of card arrays for split hands
  const [winningsChipStack, setWinningsChipStack] = useState<number[]>([]); // Array of chip values for winnings
  const [doubleWinningsChipStack, setDoubleWinningsChipStack] = useState<number[]>([]); // Array of chip values for double bet winnings
  const [showWinningsAnimation, setShowWinningsAnimation] = useState<boolean>(false); // Control win animation
  const [showDoubleWinningsAnimation, setShowDoubleWinningsAnimation] = useState<boolean>(false); // Control double bet win animation
  const [showLossAnimation, setShowLossAnimation] = useState<boolean>(false); // Control loss animation
  const [showInsuranceLossAnimation, setShowInsuranceLossAnimation] = useState<boolean>(false); // Control insurance loss animation
  const [showDoubleLossAnimation, setShowDoubleLossAnimation] = useState<boolean>(false); // Control double bet loss animation
  const [showSplitLossAnimation, setShowSplitLossAnimation] = useState<boolean>(false); // Control split bet loss animation

  // Check if surrender is strategically recommended
  const shouldOfferSurrender = useCallback((playerValue: number, dealerUpCard: Card): boolean => {
    // Surrender strategy from BlackjackEngine
    // Hand 15: Surrender vs dealer 10 only
    // Hand 16: Surrender vs dealer 9, 10, or Ace
    
    const dealerValue = dealerUpCard.rank === 'A' ? 11 : (dealerUpCard.rank === 'K' || dealerUpCard.rank === 'Q' || dealerUpCard.rank === 'J') ? 10 : parseInt(dealerUpCard.rank);
    
    if (playerValue === 15) {
      return dealerValue === 10; // 15 vs 10
    } else if (playerValue === 16) {
      return dealerValue === 9 || dealerValue === 10 || dealerValue === 11; // 16 vs 9, 10, A
    }
    
    return false; // No other hands should surrender
  }, []);

  // Update game state when dealer check completes
  useEffect(() => {
    if (dealerCheckComplete && gameState.gameStatus === 'playing' && !gameState.canHit) {
      console.log('Dealer check completed - re-enabling player actions');
      const isBlackjack = gameState.handValue === 21 && playerCards.length === 2;
      const canDouble = gameState.bankroll >= gameState.currentBet;
      const canSplit = playerCards.length === 2 && playerCards[0].rank === playerCards[1].rank && gameState.bankroll >= gameState.currentBet;
      
      setGameState(prev => ({
        ...prev,
        canHit: !isBlackjack,
        canStand: !isBlackjack,
        canDouble: !isBlackjack && canDouble,
        canSplit: !isBlackjack && canSplit,
        canSurrender: !isBlackjack && dealerCards.length > 0 && shouldOfferSurrender(gameState.handValue, dealerCards[0]),
        message: 'Choose your action'
      }));
    }
  }, [dealerCheckComplete, gameState.gameStatus, gameState.canHit, gameState.handValue, gameState.bankroll, gameState.currentBet, playerCards, dealerCards, shouldOfferSurrender]);

  // Calculate Hi-Lo count value for a card
  const getHiLoValue = useCallback((card: Card): number => {
    if (['2', '3', '4', '5', '6'].includes(card.rank)) {
      return 1; // Low cards +1
    } else if (['10', 'J', 'Q', 'K', 'A'].includes(card.rank)) {
      return -1; // High cards -1
    } else {
      return 0; // Neutral cards (7, 8, 9)
    }
  }, []);

  // Update running count when a card is dealt
  const updateRunningCount = useCallback((card: Card) => {
    const cardValue = getHiLoValue(card);
    setRunningCount(prev => {
      const newRunningCount = prev + cardValue;
      
      // Calculate true count (running count / decks remaining)
      const decksRemaining = Math.max(0.5, Math.floor(deck.length / 52) + (deck.length % 52 >= 26 ? 0.5 : 0.0));
      const newTrueCount = newRunningCount / decksRemaining;
      setTrueCount(newTrueCount);
      
      return newRunningCount;
    });
  }, [getHiLoValue, deck.length]);

  // Create a multi-deck shoe
  const createShoe = useCallback((): Card[] => {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    const shoe: Card[] = [];

    // Create multiple decks
    for (let deckNum = 0; deckNum < shoeSize; deckNum++) {
      for (const suit of suits) {
        for (const rank of ranks) {
          let value = parseInt(rank);
          if (rank === 'A') value = 11;
          if (['J', 'Q', 'K'].includes(rank)) value = 10;
          
          shoe.push({ rank, suit, value });
        }
      }
    }

    // Shuffle the entire shoe using Fisher-Yates algorithm
    for (let i = shoe.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shoe[i], shoe[j]] = [shoe[j], shoe[i]];
    }

    console.log(`Created and shuffled ${shoeSize}-deck shoe with ${shoe.length} cards`);
    return shoe;
  }, [shoeSize]);

  // Check if shoe needs shuffling based on penetration
  const checkIfNeedsShuffle = useCallback((currentDeck: Card[]): boolean => {
    const cardsUsed = totalCardsInShoe - currentDeck.length;
    const penetration = cardsUsed / totalCardsInShoe;
    return penetration >= penetrationLevel;
  }, [totalCardsInShoe, penetrationLevel]);

  // Calculate hand value considering aces
  const calculateHandValue = useCallback((cards: Card[]): number => {
    let value = 0;
    let aces = 0;

    for (const card of cards) {
      if (card.rank === 'A') {
        aces++;
        value += 11;
      } else {
        value += card.value;
      }
    }

    // Convert aces from 11 to 1 if needed
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }

    return value;
  }, []);

  // Check if hand is soft (contains an ace counted as 11)
  const isSoftHand = useCallback((cards: Card[]): boolean => {
    let value = 0;
    let aces = 0;

    // Calculate value same way as calculateHandValue
    for (const card of cards) {
      if (card.rank === 'A') {
        aces++;
        value += 11;
      } else {
        value += card.value;
      }
    }

    // Convert aces from 11 to 1 if needed (same logic as calculateHandValue)
    let usableAces = aces;
    while (value > 21 && usableAces > 0) {
      value -= 10;
      usableAces--;
    }

    // Hand is soft if we still have at least one ace counted as 11
    return usableAces > 0;
  }, []);

  // Check if dealer should hit (hits soft 17)
  const dealerShouldHit = useCallback((cards: Card[]): boolean => {
    const value = calculateHandValue(cards);
    const isSoft = isSoftHand(cards);
    
    // Dealer hits on any total < 17 or on soft 17
    return value < 17 || (value === 17 && isSoft);
  }, [calculateHandValue, isSoftHand]);

  // Deal a card from the shoe
  const dealCard = useCallback((currentDeck: Card[]): { card: Card; remainingDeck: Card[] } => {
    // If deck is empty or needs shuffle, create new shoe
    if (currentDeck.length === 0 || needsShuffle) {
      console.log('Creating new shoe due to:', currentDeck.length === 0 ? 'empty deck' : 'penetration reached');
      const newShoe = createShoe();
      setTotalCardsInShoe(newShoe.length);
      setNeedsShuffle(false);
      // Update running count for the dealt card
      updateRunningCount(newShoe[0]);
      return { card: newShoe[0], remainingDeck: newShoe.slice(1) };
    }
    
    // Check if we need to shuffle after this card
    const remainingAfterDeal = currentDeck.slice(1);
    if (checkIfNeedsShuffle(remainingAfterDeal)) {
      console.log(`Penetration reached: ${((totalCardsInShoe - remainingAfterDeal.length) / totalCardsInShoe * 100).toFixed(1)}% - will shuffle after this hand`);
      setNeedsShuffle(true);
    }
    
    // Update running count for the dealt card
    updateRunningCount(currentDeck[0]);
    
    return { card: currentDeck[0], remainingDeck: remainingAfterDeal };
  }, [createShoe, needsShuffle, checkIfNeedsShuffle, totalCardsInShoe, updateRunningCount]);

  // Place bet - add chip to stack
  const onBet = useCallback((amount: number) => {
    if (gameState.bankroll >= amount) {
      setChipStack(prev => {
        // Insert chip in correct position (larger values toward bottom)
        const newStack = [...prev, amount].sort((a, b) => b - a);
        return newStack;
      });
      
      setGameState(prev => ({
        ...prev,
        currentBet: prev.currentBet + amount,
        bankroll: prev.bankroll - amount,
        canDeal: true,
        message: `Bet: $${prev.currentBet + amount}. Click Deal to start.`
      }));
      
      // User is manually adding chips
    }
  }, [gameState.bankroll]);

  // Clear bet - remove all chips from table
  const onClearBet = useCallback(() => {
    const refundAmount = gameState.currentBet;
    setChipStack([]);
    
    setGameState(prev => ({
      ...prev,
      currentBet: 0,
      originalBet: 0,
      bankroll: prev.bankroll + refundAmount,
      canDeal: false,
      message: 'Place your bet to start'
    }));
  }, [gameState.currentBet]);

  // Player surrenders
  const onSurrender = useCallback(() => {
    // Surrender loses half the bet
    const halfBet = gameState.currentBet / 2;
    const refund = halfBet;

    // Store the previous bet amount for next hand
    setPreviousBaseBet(gameState.currentBet);
    setPreviousBaseChipStack([...chipStack]);

    // Calculate dealer's hole card value for display
    const dealerValue = calculateHandValue(dealerCards);
    const dealerHandDisplay = dealerCards.map(c => `${c.rank}${c.suit[0]}`);

    setGameState(prev => ({
      ...prev,
      bankroll: prev.bankroll + refund,
      currentBet: 0, // Set to 0 when hand ends
      dealerHand: dealerHandDisplay, // Show dealer's cards including hole card
      dealerValue: dealerValue, // Show dealer's true value
      lastHandResult: 'lost', // Track result for display
      lastHandAmount: halfBet, // Track amount lost
      gameStatus: 'complete',
      canHit: false,
      canStand: false,
      canDouble: false,
      canSplit: false,
      canSurrender: false,
      message: `Surrendered. Lost $${halfBet.toFixed(2)}. Dealer had ${dealerValue}.`
    }));

    // Trigger hole card flip to show dealer's hidden card
    setWaitingForHoleCardFlip(true);

    // Clear chip stacks after a delay
    setTimeout(() => {
      setChipStack([]);
      setDoubleChipStack([]);
    }, 2000);
  }, [gameState.currentBet, chipStack, dealerCards, calculateHandValue]);

  // Take insurance bet
  const onTakeInsurance = useCallback(() => {
    const insuranceAmount = Math.floor(gameState.currentBet / 2);
    if (gameState.bankroll >= insuranceAmount) {
      // Step 1: Place insurance bet chips and update state
      const insuranceChips = [...chipStack].slice(0, Math.ceil(chipStack.length / 2));
      setInsuranceChipStack(insuranceChips);
      
      setGameState(prev => ({
        ...prev,
        insuranceBet: insuranceAmount,
        bankroll: prev.bankroll - insuranceAmount,
        canTakeInsurance: false,
        gameStatus: 'playing',
        canHit: false,
        canStand: false,
        canDouble: false,
        canSplit: false,
        message: 'Insurance bet placed. Dealer checking for blackjack...'
      }));
      
      // Step 2: Pause to show insurance bet placement, then check for dealer blackjack
      setTimeout(() => {
        if (dealerCards.length >= 2) {
          const dealerValue = calculateHandValue(dealerCards);
          console.log('Dealer total after insurance taken:', dealerValue);
          
          if (dealerValue === 21) {
            console.log('Dealer has blackjack - insurance pays out');
            const insuranceWinnings = insuranceAmount * 3; // Insurance pays 2:1 (return bet + 2x payout)
            setGameState(prev => ({
              ...prev,
              dealerValue: dealerValue,
              gameStatus: 'complete',
              canHit: false,
              canStand: false,
              canDouble: false,
              canSplit: false,
              bankroll: prev.bankroll + insuranceWinnings,
              insuranceBet: 0,
              message: gameState.handValue === 21 ? 'Push! Both have blackjack. Insurance pays 2:1.' : 'Dealer has Blackjack! Insurance pays 2:1.'
            }));
            setInsuranceChipStack([]); // Clear insurance chips
            // Trigger hole card flip
            setWaitingForHoleCardFlip(true);
          } else {
            console.log('Dealer does not have blackjack after insurance taken - enabling player actions');
            const isBlackjack = gameState.handValue === 21 && playerCards.length === 2;
            const canDouble = gameState.bankroll >= gameState.currentBet;
            const canSplit = playerCards.length === 2 && playerCards[0].rank === playerCards[1].rank && gameState.bankroll >= gameState.currentBet;
            
            // Show clear message about insurance result first and trigger insurance loss animation
            setGameState(prev => ({
              ...prev,
              message: 'Dealer does not have blackjack. Insurance lost.'
            }));
            setShowInsuranceLossAnimation(true); // Trigger insurance chips fade-out animation
            
            // After a brief pause, clear insurance and enable player actions
            setTimeout(() => {
              setGameState(prev => ({
                ...prev,
                insuranceBet: 0, // Clear insurance bet from display
                canHit: !isBlackjack,
                canStand: !isBlackjack,
                canDouble: !isBlackjack && canDouble,
                canSplit: !isBlackjack && canSplit,
                message: isBlackjack ? 'Blackjack! Choose your action.' : 'Choose your action'
              }));
              setInsuranceChipStack([]); // Clear insurance chips since they're lost
              setShowInsuranceLossAnimation(false); // Reset animation state
            }, 2000); // 2 second pause to show the insurance result message
          }
        }
      }, 2000); // 2 second pause to show insurance bet placement
    }
  }, [gameState.currentBet, gameState.bankroll, gameState.handValue, chipStack, dealerCards, calculateHandValue, playerCards]);

  // Decline insurance bet
  const onDeclineInsurance = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      canTakeInsurance: false,
      gameStatus: 'playing',
      canHit: false,
      canStand: false,
      canDouble: false,
      canSplit: false,
      message: 'Insurance declined. Dealer checking for blackjack...'
    }));
    
    // The visual peek animation and blackjack check will be handled by InteractiveGame.tsx
    // based on dealer showing Ace and insuranceBet being 0
  }, []);

  // Deal initial cards one at a time with realistic timing
  const dealInitialCards = useCallback((currentDeck: Card[], step: number = 0, currentPlayerCards: Card[] = [], currentDealerCards: Card[] = []) => {
    const dealSequence = [
      { target: 'player', position: 1, message: 'Dealing first card to player...' },
      { target: 'dealer', position: 1, message: 'Dealing first card to dealer...' },
      { target: 'player', position: 2, message: 'Dealing second card to player...' },
      { target: 'dealer', position: 2, message: 'Dealing hole card to dealer...' }
    ];

    if (step >= dealSequence.length) {
      // All cards dealt, finalize the hand
      const playerValue = calculateHandValue(currentPlayerCards);
      const dealerValue = calculateHandValue([currentDealerCards[0]]); // Only show first card
      
      const isBlackjack = playerValue === 21;
      const canDouble = gameState.bankroll >= gameState.currentBet;
      const canSplit = currentPlayerCards[0].rank === currentPlayerCards[1].rank && gameState.bankroll >= gameState.currentBet;

      // Check if dealer shows Ace (offer insurance) or 10-value (check for blackjack)
      const dealerShowingAce = currentDealerCards[0].rank === 'A';
      const dealerShowingTen = currentDealerCards[0].rank === '10' || 
                               currentDealerCards[0].rank === 'J' || 
                               currentDealerCards[0].rank === 'Q' || 
                               currentDealerCards[0].rank === 'K';
      
      const dealerHasBlackjack = dealerShowingTen && currentDealerCards[1].rank === 'A';
      
      if (dealerShowingTen && dealerHasBlackjack) {
        // Dealer has blackjack - immediately reveal and end game
        const fullDealerValue = calculateHandValue(currentDealerCards);
        
        let message = '';
        let winnings = 0;
        
        if (isBlackjack) {
          message = 'Push! Both have blackjack.';
          winnings = gameState.currentBet; // Return original bet only
        } else {
          message = 'Dealer has Blackjack!';
          winnings = 0; // Lose the bet (already deducted)
        }
        
        // Store previous bet for next hand (use original bet if doubled, otherwise current bet)
        setPreviousBaseBet(gameState.originalBet > 0 ? gameState.originalBet : gameState.currentBet);
        setPreviousBaseChipStack([...chipStack]);
        
        // Calculate win/loss for display
        let resultType: 'won' | 'lost' | null = null;
        let resultAmount = 0;
        
        if (isBlackjack) {
          // Push - both have blackjack
          resultType = null;
          resultAmount = 0;
        } else {
          // Dealer blackjack, player doesn't - loss
          resultType = 'lost';
          resultAmount = gameState.currentBet;
        }
        
        setGameState(prev => ({
          ...prev,
          playerHand: currentPlayerCards.map(c => `${c.rank}${c.suit[0]}`),
          dealerHand: currentDealerCards.map(c => `${c.rank}${c.suit[0]}`),
          handValue: playerValue,
          dealerValue: fullDealerValue,
          currentBet: 0, // Set to 0 when hand ends
          originalBet: 0,
          lastHandResult: resultType, // Track result for display
          lastHandAmount: resultAmount, // Track amount won/lost
          gameStatus: 'complete',
          canHit: false,
          canStand: false,
          canDouble: false,
          canSplit: false,
          canDeal: false,
          bankroll: prev.bankroll + winnings,
          message
        }));
        
        setIsDealing(false);
        return;
      }
      
      // Check if dealer shows Ace and offer insurance
      if (dealerShowingAce && !isBlackjack) {
        const insuranceAmount = Math.floor(gameState.currentBet / 2);
        const canAffordInsurance = gameState.bankroll >= insuranceAmount;
        
        setGameState(prev => ({
          ...prev,
          playerHand: currentPlayerCards.map(c => `${c.rank}${c.suit[0]}`),
          dealerHand: [`${currentDealerCards[0].rank}${currentDealerCards[0].suit[0]}`, '??'],
          handValue: playerValue,
          dealerValue: dealerValue,
          gameStatus: 'insurance-offered',
          canHit: false,
          canStand: false,
          canDouble: false,
          canSplit: false,
          canDeal: false,
          canTakeInsurance: canAffordInsurance,
          message: `Dealer shows Ace. Insurance available for $${insuranceAmount}`
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          playerHand: currentPlayerCards.map(c => `${c.rank}${c.suit[0]}`),
          dealerHand: [`${currentDealerCards[0].rank}${currentDealerCards[0].suit[0]}`, '??'],
          handValue: playerValue,
          dealerValue: dealerValue,
          gameStatus: isBlackjack ? 'complete' : 'playing',
          canHit: !isBlackjack && (!dealerShowingTen || dealerCheckComplete),
          canStand: !isBlackjack && (!dealerShowingTen || dealerCheckComplete),
          canDouble: !isBlackjack && canDouble && (!dealerShowingTen || dealerCheckComplete),
          canSplit: !isBlackjack && canSplit && (!dealerShowingTen || dealerCheckComplete),
          canSurrender: !isBlackjack && shouldOfferSurrender(playerValue, currentDealerCards[0]) && (!dealerShowingTen || dealerCheckComplete),
          canDeal: false,
          message: isBlackjack ? 'Blackjack! Checking for dealer blackjack...' : (dealerShowingTen && !dealerCheckComplete ? 'Dealer checking for blackjack...' : 'Choose your action')
        }));
      }
      
      // Set blackjack flag for special handling
      if (isBlackjack) {
        setIsPlayerBlackjack(true);
        setWaitingForHoleCardFlip(true);
      }
      
      setIsDealing(false);
      return;
    }

    const currentStep = dealSequence[step];
    const { card, remainingDeck } = dealCard(currentDeck);
    
    // Update message
    setGameState(prev => ({
      ...prev,
      message: currentStep.message
    }));

    // Track cards locally and update state
    let newPlayerCards = [...currentPlayerCards];
    let newDealerCards = [...currentDealerCards];
    
    if (currentStep.target === 'player') {
      newPlayerCards.push(card);
      setPlayerCards(newPlayerCards);
    } else {
      newDealerCards.push(card);
      setDealerCards(newDealerCards);
    }
    
    setDeck(remainingDeck);
    
    // Continue to next card after delay
    setTimeout(() => {
      dealInitialCards(remainingDeck, step + 1, newPlayerCards, newDealerCards);
    }, 800); // 0.8 second delay between each card
  }, [dealCard, calculateHandValue]);

  // Deal initial cards
  const onDeal = useCallback(() => {
    console.log('onDeal called with gameStatus:', gameState.gameStatus, 'currentBet:', gameState.currentBet);
    if (gameState.gameStatus === 'betting' && gameState.currentBet > 0 && !isDealing) {
      // Initialize shoe if needed
      let currentDeck = deck;
      if (deck.length === 0) {
        currentDeck = createShoe();
        setTotalCardsInShoe(currentDeck.length);
        setNeedsShuffle(false);
        console.log('Initialized new shoe, length:', currentDeck.length);
      }
      
      // Reset cards and start dealing sequence
      setPlayerCards([]);
      setDealerCards([]);
      setDeck(currentDeck);
      setIsDealing(true);
      
      setGameState(prev => ({
        ...prev,
        canDeal: false,
        message: 'Dealing cards...'
      }));
      
      // Start the dealing sequence
      dealInitialCards(currentDeck, 0);

    } else if (gameState.gameStatus === 'complete') {
      // Use stored previous bet for auto-default (already stored when hand ended)
      const baseBetAmount = previousBaseBet;
      console.log('Using stored previous bet:', { previousBaseBet, baseBetAmount });
      
      // Auto-default to previous base bet for new hand
      const shouldAutoDefault = baseBetAmount > 0 && gameState.bankroll >= baseBetAmount;
      console.log('Auto-default check:', { baseBetAmount, shouldAutoDefault, bankroll: gameState.bankroll });
      
      // Show shuffle message if needed
      const shuffleMessage = needsShuffle ? ' Shuffling shoe...' : '';
      
      // New hand
      setGameState(prev => ({
        ...prev,
        currentBet: shouldAutoDefault ? baseBetAmount : 0,
        originalBet: 0, // Reset original bet for new hand
        bankroll: shouldAutoDefault ? prev.bankroll - baseBetAmount : prev.bankroll,
        playerHand: [],
        dealerHand: [],
        handValue: 0,
        dealerValue: 0,
        gameStatus: 'betting',
        canHit: false,
        canStand: false,
        canDouble: false,
        canSplit: false,
        canDeal: shouldAutoDefault,
        insuranceBet: 0,
        canTakeInsurance: false,
        // Reset win/loss tracking
        lastHandResult: null,
        lastHandAmount: 0,
        // Reset split state
        isSplit: false,
        activeHand: 0,
        splitHands: [],
        splitCount: 0,
        message: shouldAutoDefault ? `Previous bet: $${baseBetAmount}. Add more chips or click Deal.${shuffleMessage}` : `Place your bet to start${shuffleMessage}`
      }));
      
      // Set chip stack to previous base bet if auto-defaulting
      if (shouldAutoDefault && previousBaseChipStack.length > 0) {
        setChipStack([...previousBaseChipStack]); // Restore previous chip stack
      } else {
        setChipStack([]);
      }
      
      setPlayerCards([]);
      setDealerCards([]);
      setDealerIsPlaying(false);
      setWaitingForHoleCardFlip(false);
      setIsDealing(false);
      setIsPlayerBlackjack(false);
      setShouldDealerContinue(false);
      setDoubleChipStack([]);
      setInsuranceChipStack([]);
      setSplitChipStack([]);
      setSplitPlayerCards([[]]);
      setWinningsChipStack([]);
      setDoubleWinningsChipStack([]);
      setShowWinningsAnimation(false);
      setShowDoubleWinningsAnimation(false);
      setShowLossAnimation(false);
      setShowInsuranceLossAnimation(false);
      setShowDoubleLossAnimation(false);
      setShowSplitLossAnimation(false);
      setDealerCheckComplete(false);
      setRunningCount(0);
      setTrueCount(0);
    }
  }, [gameState.gameStatus, gameState.currentBet, isDealing, createShoe, previousBaseBet, previousBaseChipStack]);

  // Player hits
  const onHit = useCallback(() => {
    if (gameState.isSplit) {
      // Handle split hand hit
      const { card, remainingDeck } = dealCard(deck);
      setDeck(remainingDeck);
      const activeHandIndex = gameState.activeHand;
      
      // Update split cards and game state together
      setSplitPlayerCards(prev => {
        const newSplitCards = [...prev];
        newSplitCards[activeHandIndex] = [...newSplitCards[activeHandIndex], card];
        
        // Update split hand state with the new cards
        const newCards = newSplitCards[activeHandIndex];
        const newValue = calculateHandValue(newCards);
        const isBust = newValue > 21;
        const is21 = newValue === 21;
        
        setGameState(prevState => {
          const newSplitHands = [...prevState.splitHands];
          newSplitHands[activeHandIndex] = {
            ...newSplitHands[activeHandIndex],
            cards: newCards.map(c => `${c.rank}${c.suit[0]}`),
            value: newValue,
            isComplete: isBust || is21,
            isBust: isBust,
            is21: is21
          };
          
          return {
            ...prevState,
            splitHands: newSplitHands,
            playerHand: newCards.map(c => `${c.rank}${c.suit[0]}`),
            handValue: newValue,
            canHit: !isBust && !is21,
            canStand: !isBust && !is21,
            canDouble: false,
            canSplit: false,
            message: isBust ? `Hand ${activeHandIndex + 1} busts!` : 
                     is21 ? `Hand ${activeHandIndex + 1} gets 21!` : 
                     `Hand ${activeHandIndex + 1} value: ${newValue}`
          };
        });
        
        // Handle hand completion
        if (isBust || is21) {
          setTimeout(() => {
            moveToNextSplitHand();
          }, is21 ? 2000 : 1000);
        }
        
        return newSplitCards;
      });
    } else {
      // Handle regular hit
      const { card, remainingDeck } = dealCard(deck);
      const newPlayerCards = [...playerCards, card];
      const newValue = calculateHandValue(newPlayerCards);
      
      setDeck(remainingDeck);
      setPlayerCards(newPlayerCards);
      
      const isBust = newValue > 21;
      const is21 = newValue === 21;
      
      setGameState(prev => ({
        ...prev,
        playerHand: newPlayerCards.map(c => `${c.rank}${c.suit[0]}`),
        handValue: newValue,
        canHit: !isBust && !is21,
        canStand: !isBust && !is21,
        canDouble: false,
        canSplit: false,
        canSurrender: false,
        gameStatus: (isBust || is21) ? 'dealer-playing' : 'playing',
        message: isBust ? 'Bust! Revealing dealer cards...' : 
                 is21 ? '21! Revealing dealer cards...' : 
                 'Choose your action'
      }));

      if (isBust) {
        // Player busts - reveal dealer hole card immediately
        setWaitingForHoleCardFlip(true);
      } else if (is21) {
        // Player gets 21 - pause briefly before revealing dealer hole card
        setTimeout(() => {
          setWaitingForHoleCardFlip(true);
        }, 2000); // 2 second pause to appreciate the 21
      }
    }
  }, [deck, playerCards, dealCard, calculateHandValue, gameState.isSplit, gameState.activeHand, splitPlayerCards]);

  // Move to next split hand or dealer if all hands complete
  const moveToNextSplitHand = useCallback(() => {
    setGameState(prev => {
      // For split hands, we go from right to left: 1 -> 0 -> dealer
      const nextHandIndex = prev.activeHand - 1;
      
      if (nextHandIndex >= 0) {
        // Move to next hand (going right to left)
        const nextHand = prev.splitHands[nextHandIndex];
        
        return {
          ...prev,
          activeHand: nextHandIndex,
          playerHand: nextHand.cards,
          handValue: nextHand.value,
          canHit: false, // Disable actions until card is dealt
          canStand: false,
          canDouble: false,
          canSplit: false,
          canSurrender: false,
          message: `Moving to leftmost hand. Dealing card...`
        };
      } else {
        // All hands complete - move to dealer
        return {
          ...prev,
          gameStatus: 'dealer-playing',
          canHit: false,
          canStand: false,
          canDouble: false,
          canSplit: false,
          canSurrender: false,
          message: 'All hands complete. Revealing dealer cards...'
        };
      }
    });
    
    // If moving to dealer, trigger hole card flip
    if (gameState.activeHand - 1 < 0) {
      setTimeout(() => {
        setWaitingForHoleCardFlip(true);
      }, 1000);
    }
  }, [gameState.activeHand, gameState.splitHands.length, splitPlayerCards]);

  // UseEffect to deal ONE additional card to split hand when it becomes active (only if it has exactly 1 card)
  useEffect(() => {
    if (gameState.isSplit && gameState.gameStatus === 'playing' && gameState.activeHand >= 0) {
      const activeHand = gameState.splitHands[gameState.activeHand];
      const activeSplitCards = splitPlayerCards[gameState.activeHand];
      
      // Only deal ONE additional card if the hand has exactly 1 card
      if (activeHand && activeHand.cards.length === 1 && activeSplitCards && activeSplitCards.length === 1) {
        setTimeout(() => {
          const { card, remainingDeck } = dealCard(deck);
          setDeck(remainingDeck);
          
          // Update both split cards and game state together
          setSplitPlayerCards(prev => {
            const newSplitCards = [...prev];
            newSplitCards[gameState.activeHand] = [...newSplitCards[gameState.activeHand], card];
            
            // Update game state with the new cards
            const newCards = newSplitCards[gameState.activeHand];
            const newValue = calculateHandValue(newCards);
            
            setGameState(prevState => {
              const newSplitHands = [...prevState.splitHands];
              const isBust = newValue > 21;
              const is21 = newValue === 21;
              
              newSplitHands[gameState.activeHand] = {
                ...newSplitHands[gameState.activeHand],
                cards: newCards.map(c => `${c.rank}${c.suit[0]}`),
                value: newValue,
                is21: is21,
                isBust: isBust,
                isComplete: isBust || is21 // Complete if bust or 21
              };
              
              return {
                ...prevState,
                splitHands: newSplitHands,
                playerHand: newSplitHands[gameState.activeHand].cards,
                handValue: newValue,
                // Enable player actions after dealing the second card
                canHit: !isBust && !is21,
                canStand: !isBust && !is21,
                canDouble: false, // Can't double on split hands after first card
                canSplit: false,
                canSurrender: false,
                message: isBust ? `Hand ${gameState.activeHand === 1 ? 'right' : 'left'} busts!` : 
                        is21 ? `Hand ${gameState.activeHand === 1 ? 'right' : 'left'} has 21!` :
                        `Hand ${gameState.activeHand === 1 ? 'right' : 'left'} - Your turn (${newValue})`
              };
            });
            
            return newSplitCards;
          });
        }, 800); // Slightly longer delay to see the card being dealt
      }
    }
  }, [gameState.activeHand, gameState.isSplit, gameState.gameStatus, gameState.splitHands, splitPlayerCards, deck, dealCard, calculateHandValue]);

  // UseEffect to update split hand display when split hands change
  useEffect(() => {
    if (gameState.isSplit && gameState.gameStatus === 'playing' && gameState.activeHand >= 0) {
      const activeHand = gameState.splitHands[gameState.activeHand];
      if (activeHand && activeHand.cards.length >= 2) {
        // Update the display for the current active hand
        const newValue = activeHand.value;
        const isBust = newValue > 21;
        const is21 = newValue === 21;
        
        setGameState(prevState => ({
          ...prevState,
          playerHand: activeHand.cards,
          handValue: newValue,
          canHit: !isBust && !is21,
          canStand: !isBust && !is21,
          canDouble: false, // Can't double after dealing second card to split hand
          canSplit: false, // Can't split again
          canSurrender: false, // Can't surrender on split hands
          message: isBust ? `Hand ${gameState.activeHand + 1} busts!` : 
                  is21 ? `Hand ${gameState.activeHand + 1} has 21!` :
                  `Hand ${gameState.activeHand + 1} - Your turn`
        }));
      }
    }
  }, [gameState.splitHands, gameState.activeHand, gameState.isSplit, gameState.gameStatus]);

  // UseEffect to handle dealer play without recursion
  useEffect(() => {
    if (!shouldDealerContinue || dealerIsPlaying) return;
    
    const timer = setTimeout(() => {
      if (!dealerShouldHit(dealerCards)) {
        // Dealer stops - either stands or busts
        const dealerValue = calculateHandValue(dealerCards);
        const isBlackjack = dealerValue === 21 && dealerCards.length === 2;
        const isBust = dealerValue > 21;
        
        let message = '';
        if (isBust) {
          message = 'Dealer busts! You win!';
        } else if (isBlackjack) {
          message = 'Dealer has Blackjack!';
        } else {
          const finalIsSoft = isSoftHand(dealerCards);
          const finalHandDescription = finalIsSoft ? `soft ${dealerValue}` : `${dealerValue}`;
          message = `Dealer stands on ${finalHandDescription}.`;
        }
        
        setGameState(prev => ({
          ...prev,
          message
        }));
        setShouldDealerContinue(false);
        setTimeout(() => {
          finalizeDealerPlay(dealerCards, dealerValue);
        }, 1000);
        return;
      }
      
      // Deal one card
      setDealerIsPlaying(true);
      const { card, remainingDeck } = dealCard(deck);
      const newDealerCards = [...dealerCards, card];
      const newDealerValue = calculateHandValue(newDealerCards);
      
      setDealerCards(newDealerCards);
      setDeck(remainingDeck);
      
      const isSoft = isSoftHand(newDealerCards);
      const handDescription = isSoft ? `soft ${newDealerValue}` : `${newDealerValue}`;
      
      // Check if dealer is done after drawing this card
      const dealerShouldStand = !dealerShouldHit(newDealerCards);
      
      setGameState(prev => ({
        ...prev,
        dealerHand: newDealerCards.map(c => `${c.rank}${c.suit[0]}`),
        dealerValue: newDealerValue,
        message: dealerShouldStand 
          ? `Dealer draws ${card.rank} of ${card.suit}.` // Don't show total if dealer will stand
          : `Dealer draws ${card.rank} of ${card.suit}. Dealer has ${handDescription}.` // Show total if dealer continues
      }));
      
      setDealerIsPlaying(false);
      
      // Check if dealer is done
      if (dealerShouldStand) {
        const isBlackjack = newDealerValue === 21 && newDealerCards.length === 2;
        const isBust = newDealerValue > 21;
        
        let message = '';
        if (isBust) {
          message = 'Dealer busts! You win!';
        } else if (isBlackjack) {
          message = 'Dealer has Blackjack!';
        } else {
          const finalIsSoft = isSoftHand(newDealerCards);
          const finalHandDescription = finalIsSoft ? `soft ${newDealerValue}` : `${newDealerValue}`;
          message = `Dealer stands on ${finalHandDescription}.`;
        }
        
        // Short delay to show the card draw, then show the final message
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            message
          }));
          setShouldDealerContinue(false);
          setTimeout(() => {
            finalizeDealerPlay(newDealerCards, newDealerValue);
          }, 1000);
        }, 800);
      }
      // If dealer still needs to hit, useEffect will trigger again
      
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [shouldDealerContinue, dealerCards, deck, dealerIsPlaying, dealCard, calculateHandValue, dealerShouldHit, isSoftHand]);

  // Finalize dealer play and determine winner
  const finalizeDealerPlay = useCallback((finalDealerCards: Card[], finalDealerValue: number) => {
    const playerValue = gameState.handValue;
    let message = '';
    let winnings = 0;
    let isWin = false;
    let isLoss = false;

    if (finalDealerValue > 21) {
      message = 'Dealer busts! You win!';
      winnings = gameState.currentBet + gameState.currentBet; // Return original bet + equal winnings
      isWin = true;
    } else if (playerValue > finalDealerValue) {
      message = 'You win!';
      winnings = gameState.currentBet + gameState.currentBet; // Return original bet + equal winnings
      isWin = true;
    } else if (playerValue < finalDealerValue) {
      message = 'Dealer wins.';
      winnings = 0; // Lose the bet (already deducted)
      isLoss = true;
    } else {
      message = 'Push (tie)';
      winnings = gameState.currentBet; // Return original bet only
    }

    // Store previous bet for next hand (use original bet if doubled, otherwise current bet)
    setPreviousBaseBet(gameState.originalBet > 0 ? gameState.originalBet : gameState.currentBet);
    setPreviousBaseChipStack([...chipStack]);

    // Calculate win/loss for display
    let resultType: 'won' | 'lost' | null = null;
    let resultAmount = 0;
    
    if (isWin) {
      resultType = 'won';
      resultAmount = winnings - gameState.currentBet; // Net profit (winnings minus original bet)
    } else if (isLoss) {
      resultType = 'lost';
      resultAmount = gameState.currentBet; // Amount lost (original bet)
    }
    // For push, keep resultType as null (will show as bet)

    setGameState(prev => ({
      ...prev,
      dealerHand: finalDealerCards.map(c => `${c.rank}${c.suit[0]}`),
      dealerValue: finalDealerValue,
      bankroll: prev.bankroll + winnings,
      currentBet: 0, // Set to 0 when hand ends
      originalBet: 0,
      lastHandResult: resultType, // Track result for display
      lastHandAmount: resultAmount, // Track amount won/lost
      gameStatus: 'complete', // Ensure game status is set to complete
      canHit: false,
      canStand: false,
      canDouble: false,
      canSplit: false,
      message
    }));
    
    // Trigger win/loss animations
    if (isWin) {
      // Create winnings chip stack (matching the bet amount won)
      const netWinnings = winnings - gameState.currentBet; // Subtract original bet to get profit
      const hasDoubleChips = doubleChipStack.length > 0;
      console.log('Player win detected:', { winnings, currentBet: gameState.currentBet, netWinnings, chipStack, hasDoubleChips });
      
      if (netWinnings > 0) {
        if (hasDoubleChips) {
          // For doubled hands, create winnings for both original and double bets
          const originalBetAmount = gameState.currentBet / 2; // Half of total bet is original
          setWinningsChipStack([...chipStack]); // Winnings for original bet
          setDoubleWinningsChipStack([...doubleChipStack]); // Winnings for double bet
          console.log('Setting double winnings animations to true');
          setShowWinningsAnimation(true);
          setShowDoubleWinningsAnimation(true);
        } else {
          // Regular hand, single winnings stack
          setWinningsChipStack([...chipStack]); // Copy current chip stack for winnings
          console.log('Setting winnings animation to true, chip stack:', chipStack);
          setShowWinningsAnimation(true);
        }
      }
    } else if (isLoss) {
      setShowLossAnimation(true);
      
      // Trigger loss animations for all additional bet types
      if (doubleChipStack.length > 0) {
        setShowDoubleLossAnimation(true);
      }
      if (splitChipStack.length > 0) {
        setShowSplitLossAnimation(true);
      }
    }
    
    setDealerIsPlaying(false);
    setWaitingForHoleCardFlip(false);
  }, [gameState.handValue, gameState.currentBet, chipStack]);

  // Start dealer play after hole card flip
  const startDealerPlay = useCallback(() => {
    if (waitingForHoleCardFlip && !dealerIsPlaying) {
      setWaitingForHoleCardFlip(false);
      
      // If player has blackjack, only check for dealer blackjack - don't play out hand
      if (isPlayerBlackjack) {
        const dealerValue = calculateHandValue(dealerCards);
        const dealerHasBlackjack = dealerValue === 21;
        
        let message = '';
        let winnings = 0;
        let insuranceWinnings = 0;
        
        // Handle insurance payout
        if (gameState.insuranceBet > 0) {
          if (dealerHasBlackjack) {
            insuranceWinnings = gameState.insuranceBet * 3; // Insurance pays 2:1 (return bet + 2x payout)
            message = dealerHasBlackjack ? 'Push! Both have blackjack. Insurance pays 2:1.' : 'Blackjack! You win! Insurance pays 2:1.';
          } else {
            insuranceWinnings = 0; // Insurance bet lost
            message = 'Blackjack! You win! Insurance lost.';
          }
          setInsuranceChipStack([]); // Clear insurance chips
        }
        
        if (dealerHasBlackjack) {
          message = gameState.insuranceBet > 0 ? 'Push! Both have blackjack. Insurance pays 2:1.' : 'Push! Both have blackjack.';
          winnings = gameState.currentBet; // Return bet
        } else {
          message = gameState.insuranceBet > 0 ? 'Blackjack! You win! Insurance lost.' : 'Blackjack! You win!';
          winnings = gameState.currentBet + (gameState.currentBet * 1.5); // Return original bet + 1.5x winnings (3:2 payout)
        }
        
        // Store previous bet for next hand (use original bet if doubled, otherwise current bet)
        setPreviousBaseBet(gameState.originalBet > 0 ? gameState.originalBet : gameState.currentBet);
        setPreviousBaseChipStack([...chipStack]);
        
        // Calculate win/loss for display
        let resultType: 'won' | 'lost' | null = null;
        let resultAmount = 0;
        
        if (dealerHasBlackjack) {
          // Push - no win/loss (will show as bet)
          resultType = null;
          resultAmount = 0;
        } else {
          // Blackjack win
          resultType = 'won';
          resultAmount = winnings - gameState.currentBet; // Net profit (1.5x bet)
        }
        
        setGameState(prev => ({
          ...prev,
          dealerHand: dealerCards.map(c => `${c.rank}${c.suit[0]}`),
          dealerValue: dealerValue,
          bankroll: prev.bankroll + winnings + insuranceWinnings,
          currentBet: 0, // Set to 0 when hand ends
          originalBet: 0,
          lastHandResult: resultType, // Track result for display
          lastHandAmount: resultAmount, // Track amount won/lost
          gameStatus: 'complete', // Set to complete when blackjack resolution is done
          insuranceBet: 0,
          message
        }));
        
        // Trigger win/loss animations for blackjack scenarios
        if (dealerHasBlackjack) {
          // Push or insurance win - no loss animation needed
        } else {
          // Player blackjack wins - show winnings animation
          setWinningsChipStack([...chipStack]); // Blackjack pays 3:2, but use same chip stack for simplicity
          setShowWinningsAnimation(true);
        }
        
        setIsPlayerBlackjack(false);
      } else if (gameState.handValue > 21) {
        // Player busted - only reveal dealer cards, no hitting
        const dealerValue = calculateHandValue(dealerCards);
        
        // Store previous bet for next hand (use original bet if doubled, otherwise current bet)
        setPreviousBaseBet(gameState.originalBet > 0 ? gameState.originalBet : gameState.currentBet);
        setPreviousBaseChipStack([...chipStack]);
        
        setGameState(prev => ({
          ...prev,
          dealerHand: dealerCards.map(c => `${c.rank}${c.suit[0]}`),
          dealerValue: dealerValue,
          currentBet: 0, // Set to 0 when hand ends
          originalBet: 0,
          lastHandResult: 'lost', // Track result for display
          lastHandAmount: gameState.currentBet, // Track amount lost
          gameStatus: 'complete', // Set to complete when player busts
          message: 'Bust! You lose.'
        }));
        
        // Trigger loss animation for player bust and all additional bets
        setShowLossAnimation(true);
        if (doubleChipStack.length > 0) {
          setShowDoubleLossAnimation(true);
        }
        if (splitChipStack.length > 0) {
          setShowSplitLossAnimation(true);
        }
      } else {
        // Normal dealer play - player stood
        // First check for insurance payout and clear insurance chips
        const fullDealerValue = calculateHandValue(dealerCards);
        const dealerHasBlackjack = fullDealerValue === 21;
        let insuranceWinnings = 0;
        let insuranceMessage = '';
        
        if (gameState.insuranceBet > 0) {
          if (dealerHasBlackjack) {
            insuranceWinnings = gameState.insuranceBet * 3; // Insurance pays 2:1 (return bet + 2x payout)
            insuranceMessage = ' Insurance pays 2:1.';
          } else {
            insuranceWinnings = 0; // Insurance bet lost
            insuranceMessage = ' Insurance lost.';
          }
          setInsuranceChipStack([]); // Clear insurance chips
        }
        
        setGameState(prev => ({
          ...prev,
          dealerHand: dealerCards.map(c => `${c.rank}${c.suit[0]}`),
          dealerValue: fullDealerValue,
          bankroll: prev.bankroll + insuranceWinnings,
          insuranceBet: 0,
          message: `Dealer shows ${fullDealerValue}.${insuranceMessage}`
        }));
        
        // Then start dealer play
        setShouldDealerContinue(true);
      }
    }
  }, [waitingForHoleCardFlip, isPlayerBlackjack, dealerCards, calculateHandValue, gameState.currentBet, gameState.handValue]);

  // Player stands
  const onStand = useCallback(() => {
    if (gameState.isSplit) {
      // Handle split hand stand
      const activeHandIndex = gameState.activeHand;
      
      setGameState(prev => {
        const newSplitHands = [...prev.splitHands];
        newSplitHands[activeHandIndex] = {
          ...newSplitHands[activeHandIndex],
          isComplete: true
        };
        
        return {
          ...prev,
          splitHands: newSplitHands,
          canHit: false,
          canStand: false,
          canDouble: false,
          canSplit: false,
          message: `Hand ${activeHandIndex + 1} stands with ${prev.handValue}`
        };
      });
      
      setTimeout(() => {
        moveToNextSplitHand();
      }, 1000);
    } else {
      // Handle regular stand
      setGameState(prev => ({
        ...prev,
        gameStatus: 'dealer-playing',
        canHit: false,
        canStand: false,
        canDouble: false,
        canSplit: false,
        canSurrender: false,
        message: 'Revealing dealer cards...'
      }));
      
      setWaitingForHoleCardFlip(true);
    }
  }, [gameState.isSplit, gameState.activeHand, gameState.handValue, moveToNextSplitHand]);

  // Player doubles
  const onDouble = useCallback(() => {
    if (gameState.bankroll >= gameState.currentBet) {
      // Step 1: Place the double bet chips and update game state
      // Create a single chip representing the double bet amount (equal to original bet)
      setDoubleChipStack([gameState.currentBet]);
      
      setGameState(prev => ({
        ...prev,
        currentBet: prev.currentBet * 2,
        originalBet: prev.currentBet, // Store original bet before doubling
        bankroll: prev.bankroll - prev.currentBet,
        canHit: false,
        canStand: false,
        canDouble: false,
        canSplit: false,
        message: 'Double bet placed. Dealing one card...'
      }));
      
      // Step 2: After a brief pause, deal one card then stand
      setTimeout(() => {
        onHit();
        setTimeout(() => {
          onStand();
        }, 1000);
      }, 1500); // 1.5 second pause to show the double bet placement
    }
  }, [gameState.bankroll, gameState.currentBet, chipStack, onHit, onStand]);

  // Player splits
  const onSplit = useCallback(() => {
    if (gameState.bankroll >= gameState.currentBet && playerCards.length === 2 && playerCards[0].rank === playerCards[1].rank) {
      // Step 1: Place split bet chips and create split hands
      setSplitChipStack([...chipStack]);
      
      // Create two hands from the pair
      const firstCard = playerCards[0];
      const secondCard = playerCards[1];
      
      const splitHand1 = {
        cards: [`${firstCard.rank}${firstCard.suit[0]}`],
        value: calculateHandValue([firstCard]),
        isComplete: false,
        isBust: false,
        is21: false
      };
      
      const splitHand2 = {
        cards: [`${secondCard.rank}${secondCard.suit[0]}`],
        value: calculateHandValue([secondCard]),
        isComplete: false,
        isBust: false,
        is21: false
      };
      
      // Set up split card arrays for 3D rendering
      setSplitPlayerCards([[firstCard], [secondCard]]);
      
      setGameState(prev => ({
        ...prev,
        currentBet: prev.currentBet * 2, // Double the total bet
        bankroll: prev.bankroll - prev.currentBet, // Deduct split bet
        isSplit: true,
        activeHand: 1, // Start with rightmost hand (index 1)
        splitHands: [splitHand1, splitHand2],
        splitCount: 1, // One split made (2 hands total)
        playerHand: splitHand2.cards, // Show rightmost hand initially
        handValue: splitHand2.value,
        canHit: true,
        canStand: true,
        canDouble: prev.bankroll >= prev.currentBet, // Can double if bankroll allows
        canSplit: false, // Will check after dealing additional cards
        message: `Split! Playing rightmost hand first. Current value: ${splitHand2.value}`
      }));
      
      // Deal one card to the rightmost hand only (hand index 1)
      setTimeout(() => {
        dealCardToSplitHand(1); // Deal to rightmost hand first
      }, 1000);
    }
  }, [gameState.bankroll, gameState.currentBet, playerCards, chipStack, calculateHandValue]);

  // Deal a card to a specific split hand
  const dealCardToSplitHand = useCallback((handIndex: number) => {
    const { card, remainingDeck } = dealCard(deck);
    setDeck(remainingDeck);
    
    // Update both split cards and game state together
    setSplitPlayerCards(prev => {
      const newSplitCards = [...prev];
      newSplitCards[handIndex] = [...newSplitCards[handIndex], card];
      
      // Update game state with the new cards
      const newCards = newSplitCards[handIndex];
      const newValue = calculateHandValue(newCards);
      
      setGameState(prevState => {
        const newSplitHands = [...prevState.splitHands];
        const isBust = newValue > 21;
        const is21 = newValue === 21;
        
        newSplitHands[handIndex] = {
          ...newSplitHands[handIndex],
          cards: newCards.map(c => `${c.rank}${c.suit[0]}`),
          value: newValue,
          is21: is21,
          isBust: isBust,
          isComplete: isBust || is21 // Complete if bust or 21
        };
        
        return {
          ...prevState,
          splitHands: newSplitHands
        };
      });
      
      return newSplitCards;
    });
  }, [deck, dealCard, calculateHandValue]);

  // Update display for current split hand
  const updateSplitHandDisplay = useCallback((handIndex: number) => {
    // Get current split cards to avoid stale closure
    setSplitPlayerCards(currentSplitCards => {
      setGameState(prev => {
        const currentHand = prev.splitHands[handIndex];
        const canDouble = prev.bankroll >= prev.currentBet && currentHand.cards.length === 2;
        const canSplit = currentHand.cards.length === 2 && 
                        currentSplitCards[handIndex] && 
                        currentSplitCards[handIndex].length >= 2 &&
                        currentSplitCards[handIndex][0].rank === currentSplitCards[handIndex][1].rank &&
                        prev.bankroll >= prev.currentBet &&
                        prev.splitCount < 2; // Max 2 total hands
        
        // Check if current hand is complete (bust or 21)
        if (currentHand.isComplete) {
          // If hand is complete, automatically move to next hand after a delay
          setTimeout(() => {
            moveToNextSplitHand();
          }, currentHand.isBust ? 1000 : 2000); // Shorter delay for bust, longer for 21
          
          return {
            ...prev,
            activeHand: handIndex,
            playerHand: currentHand.cards,
            handValue: currentHand.value,
            canHit: false,
            canStand: false,
            canDouble: false,
            canSplit: false,
            canSurrender: false,
            message: currentHand.isBust ? 
              `Hand ${handIndex + 1} busts! Moving to next hand...` : 
              `Hand ${handIndex + 1} gets 21! Moving to next hand...`
          };
        }
        
        return {
          ...prev,
          activeHand: handIndex,
          playerHand: currentHand.cards,
          handValue: currentHand.value,
          canHit: !currentHand.isComplete && !currentHand.isBust && !currentHand.is21,
          canStand: !currentHand.isComplete && !currentHand.isBust && !currentHand.is21,
          canDouble: canDouble && !currentHand.isComplete,
          canSplit: canSplit && !currentHand.isComplete,
          canSurrender: !currentHand.isComplete && currentSplitCards[handIndex] && currentSplitCards[handIndex].length === 2 && shouldOfferSurrender(currentHand.value, dealerCards[0]),
          message: `Playing hand ${handIndex + 1} of ${prev.splitHands.length}. Current value: ${currentHand.value}`
        };
      });
      
      return currentSplitCards; // Return unchanged
    });
  }, [moveToNextSplitHand, shouldOfferSurrender, dealerCards]);

  // Handle dealer blackjack after peek
  const handleDealerBlackjack = useCallback(() => {
    if (dealerCards.length >= 2) {
      const dealerValue = calculateHandValue(dealerCards);
      console.log('handleDealerBlackjack called - dealer value:', dealerValue);
      
      if (dealerValue === 21) {
        // Dealer has blackjack - end the game immediately
        const playerValue = gameState.handValue;
        let message = '';
        let winnings = 0;
        
        if (playerValue === 21) {
          message = 'Push! Both have blackjack.';
          winnings = gameState.currentBet; // Return bet
        } else {
          message = 'Dealer has blackjack! You lose.';
          winnings = 0; // Lose the bet
        }
        
        // Store previous bet for next hand (use original bet if doubled, otherwise current bet)
        setPreviousBaseBet(gameState.originalBet > 0 ? gameState.originalBet : gameState.currentBet);
        setPreviousBaseChipStack([...chipStack]);
        
        // Calculate win/loss for display
        let resultType: 'won' | 'lost' | null = null;
        let resultAmount = 0;
        
        if (playerValue === 21) {
          // Push - no win/loss (will show as bet)
          resultType = null;
          resultAmount = 0;
        } else {
          // Loss
          resultType = 'lost';
          resultAmount = gameState.currentBet; // Amount lost
        }
        
        setGameState(prev => ({
          ...prev,
          dealerHand: dealerCards.map(c => `${c.rank}${c.suit[0]}`),
          dealerValue: dealerValue,
          bankroll: prev.bankroll + winnings,
          currentBet: 0, // Set to 0 when hand ends
          originalBet: 0,
          lastHandResult: resultType, // Track result for display
          lastHandAmount: resultAmount, // Track amount won/lost
          gameStatus: 'complete', // End the game
          canHit: false,
          canStand: false,
          canDouble: false,
          canSplit: false,
          message
        }));
        
        return true; // Dealer had blackjack
      }
    }
    return false; // No blackjack
  }, [dealerCards, gameState.handValue, gameState.currentBet, gameState.originalBet, chipStack]);

  return {
    gameState,
    onBet,
    onClearBet,
    onDeal,
    onHit,
    onStand,
    onDouble,
    onSplit,
    onSurrender,
    onTakeInsurance,
    onDeclineInsurance,
    playerCards,
    dealerCards,
    splitPlayerCards,
    startDealerPlay,
    waitingForHoleCardFlip,
    handleDealerBlackjack,
    isDealing,
    isPlayerBlackjack,
    chipStack,
    doubleChipStack,
    insuranceChipStack,
    splitChipStack,
    winningsChipStack,
    doubleWinningsChipStack,
    showWinningsAnimation,
    showDoubleWinningsAnimation,
    showLossAnimation,
    showInsuranceLossAnimation,
    showDoubleLossAnimation,
    showSplitLossAnimation,
    calculateHandValue,
    // Shoe information
    cardsRemaining: deck.length,
    totalCardsInShoe,
    penetration: totalCardsInShoe > 0 ? ((totalCardsInShoe - deck.length) / totalCardsInShoe) : 0,
    needsShuffle,
    // Card counting
    runningCount,
    trueCount,
    // Dealer check management
    setDealerCheckComplete
  };
}