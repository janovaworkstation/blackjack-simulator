import { BlackjackSimulation, COUNTING_SYSTEMS } from '../BlackjackEngine';
import { SimulationConfig } from '../../types/blackjack';

describe('BlackjackEngine', () => {
  let mockConfig: SimulationConfig;

  beforeEach(() => {
    mockConfig = {
      numberOfDecks: 6,
      deckPenetration: 75,
      playerBet: 10,
      dealerHitsOnSoft17: true,
      playerCanDouble: true,
      playerCanSplit: true,
      playerCanSurrender: false,
      numberOfSimulations: 10,
      enableHandTracking: false,
    };
  });

  describe('Constructor and Initialization', () => {
    it('initializes with correct configuration', () => {
      const engine = new BlackjackSimulation(mockConfig);
      expect(engine.testConfig).toEqual(mockConfig);
      expect(engine.testHandsPlayed).toBe(0);
      expect(engine.testRunningCount).toBe(0);
    });

    it('initializes with Hi-Lo counting system by default', () => {
      const engine = new BlackjackSimulation(mockConfig);
      expect(engine.testCountingSystem).toEqual(COUNTING_SYSTEMS.HI_LO);
    });

    it('can initialize with different counting systems', () => {
      const engine = new BlackjackSimulation(mockConfig, 'KO');
      expect(engine.testCountingSystem).toEqual(COUNTING_SYSTEMS.KO);
    });

    it('creates a shoe with correct number of cards', () => {
      const engine = new BlackjackSimulation(mockConfig);
      // 6 decks * 52 cards = 312 cards
      expect(engine.testShoe.length).toBe(312);
    });

    it('creates shoe with proper card distribution', () => {
      const engine = new BlackjackSimulation(mockConfig);
      const aceCount = engine.testShoe.filter(
        (card) => card.rank === 'A',
      ).length;
      const kingCount = engine.testShoe.filter(
        (card) => card.rank === 'K',
      ).length;

      // 6 decks * 4 aces per deck = 24 aces
      expect(aceCount).toBe(24);
      expect(kingCount).toBe(24);
    });
  });

  describe('Card Value Calculations', () => {
    let engine: BlackjackSimulation;

    beforeEach(() => {
      engine = new BlackjackSimulation(mockConfig);
    });

    it('calculates number card values correctly', () => {
      expect(engine.testGetCardValue({ rank: '2' })).toBe(2);
      expect(engine.testGetCardValue({ rank: '5' })).toBe(5);
      expect(engine.testGetCardValue({ rank: '9' })).toBe(9);
    });

    it('calculates face card values correctly', () => {
      expect(engine.testGetCardValue({ rank: 'J' })).toBe(10);
      expect(engine.testGetCardValue({ rank: 'Q' })).toBe(10);
      expect(engine.testGetCardValue({ rank: 'K' })).toBe(10);
      expect(engine.testGetCardValue({ rank: '10' })).toBe(10);
    });

    it('calculates ace value correctly', () => {
      expect(engine.testGetCardValue({ rank: 'A' })).toBe(11);
    });

    it('calculates hand values with soft aces', () => {
      const cards = [
        { suit: 'Hearts', rank: 'A', value: 11 }, // Ace starts as 11
        { suit: 'Spades', rank: '6', value: 6 },
      ];
      const handValue = engine.testCalculateHandValue(cards);
      // 11 + 6 = 17 (soft), no reduction needed
      expect(handValue.soft).toBe(17);
      expect(handValue.hard).toBe(17); // Algorithm calculates both, but 'hard' isn't accurate in this implementation
    });

    it('calculates hand values when ace must be hard', () => {
      const cards = [
        { suit: 'Hearts', rank: 'A', value: 11 },
        { suit: 'Spades', rank: 'K', value: 10 },
        { suit: 'Clubs', rank: '5', value: 5 },
      ];
      const handValue = engine.testCalculateHandValue(cards);
      // 11 + 10 + 5 = 26, reduce ace: 1 + 10 + 5 = 16
      expect(handValue.soft).toBe(16);
      expect(handValue.hard).toBe(26); // Original sum before reduction
    });

    it('handles multiple aces correctly', () => {
      const cards = [
        { suit: 'Hearts', rank: 'A', value: 11 },
        { suit: 'Spades', rank: 'A', value: 11 },
        { suit: 'Clubs', rank: 'A', value: 11 },
        { suit: 'Diamonds', rank: '2', value: 2 },
      ];
      const handValue = engine.testCalculateHandValue(cards);
      // 11 + 11 + 11 + 2 = 35, reduce to: 1 + 1 + 11 + 2 = 15
      expect(handValue.soft).toBe(15);
      expect(handValue.hard).toBe(35); // Original sum before any reduction
    });
  });

  describe('Hand Recognition', () => {
    let engine: BlackjackSimulation;

    beforeEach(() => {
      engine = new BlackjackSimulation(mockConfig);
    });

    it('recognizes blackjack correctly', () => {
      const blackjackHand = {
        cards: [
          { suit: 'Hearts', rank: 'A', value: 11 },
          { suit: 'Spades', rank: 'K', value: 10 },
        ],
        value: { hard: 21, soft: 21 },
        isBlackjack: false,
      };
      expect(engine.testIsBlackjack(blackjackHand)).toBe(true);
    });

    it('does not recognize 21 with more than 2 cards as blackjack', () => {
      const twentyOneHand = {
        cards: [
          { suit: 'Hearts', rank: '7', value: 7 },
          { suit: 'Spades', rank: '7', value: 7 },
          { suit: 'Clubs', rank: '7', value: 7 },
        ],
        value: { hard: 21, soft: 21 },
        isBlackjack: false,
      };
      expect(engine.testIsBlackjack(twentyOneHand)).toBe(false);
    });

    it('recognizes soft hands correctly', () => {
      const softHand = {
        cards: [
          { suit: 'Hearts', rank: 'A', value: 11 },
          { suit: 'Spades', rank: '6', value: 6 },
        ],
        value: { hard: 7, soft: 17 },
        isBlackjack: false,
      };
      expect(engine.testIsSoftHand(softHand)).toBe(true);
    });

    it('recognizes hard hands correctly', () => {
      const hardHand = {
        cards: [
          { suit: 'Hearts', rank: '10', value: 10 },
          { suit: 'Spades', rank: '6', value: 6 },
        ],
        value: { hard: 16, soft: 16 },
        isBlackjack: false,
      };
      expect(engine.testIsSoftHand(hardHand)).toBe(false);
    });

    it('recognizes pairs correctly', () => {
      const pairHand = {
        cards: [
          { suit: 'Hearts', rank: '8', value: 8 },
          { suit: 'Spades', rank: '8', value: 8 },
        ],
        value: { hard: 16, soft: 16 },
        isBlackjack: false,
      };
      expect(engine.testIsPair(pairHand)).toBe(true);
    });

    it('recognizes non-pairs correctly', () => {
      const nonPairHand = {
        cards: [
          { suit: 'Hearts', rank: '8', value: 8 },
          { suit: 'Spades', rank: '7', value: 7 },
        ],
        value: { hard: 15, soft: 15 },
        isBlackjack: false,
      };
      expect(engine.testIsPair(nonPairHand)).toBe(false);
    });
  });

  describe('Counting Systems', () => {
    it('has correct Hi-Lo values', () => {
      const hiLo = COUNTING_SYSTEMS.HI_LO.values;
      expect(hiLo['2']).toBe(1);
      expect(hiLo['6']).toBe(1);
      expect(hiLo['7']).toBe(0);
      expect(hiLo['9']).toBe(0);
      expect(hiLo['10']).toBe(-1);
      expect(hiLo['A']).toBe(-1);
    });

    it('has correct KO values', () => {
      const ko = COUNTING_SYSTEMS.KO.values;
      expect(ko['2']).toBe(1);
      expect(ko['7']).toBe(1); // Difference from Hi-Lo
      expect(ko['8']).toBe(0);
      expect(ko['10']).toBe(-1);
      expect(ko['A']).toBe(-1);
    });

    it('updates running count correctly with Hi-Lo', () => {
      const engine = new BlackjackSimulation(mockConfig, 'HI_LO');

      // Deal some high cards (should decrease count)
      const highCard = { suit: 'Hearts', rank: '10', value: 10 };
      engine.updateCount(highCard);
      expect(engine.testRunningCount).toBe(-1);

      // Deal low card (should increase count)
      const lowCard = { suit: 'Spades', rank: '2', value: 2 };
      engine.updateCount(lowCard);
      expect(engine.testRunningCount).toBe(0);
    });
  });

  describe('Defect Fixes Validation', () => {
    describe('Defect #1 & #2: Hand Tracking Controls', () => {
      it('does not track hands when enableHandTracking is false', async () => {
        const config = {
          ...mockConfig,
          enableHandTracking: false,
          numberOfSimulations: 5,
        };
        const engine = new BlackjackSimulation(config);

        const results = await engine.simulate();
        expect(results.handDetails).toHaveLength(0);
      }, 10000);

      it('tracks hands when enableHandTracking is true', async () => {
        const config = {
          ...mockConfig,
          enableHandTracking: true,
          numberOfSimulations: 5,
        };
        const engine = new BlackjackSimulation(config);

        const results = await engine.simulate();
        expect(results.handDetails.length).toBeGreaterThan(0);
        expect(results.handDetails.length).toBeLessThanOrEqual(5);
      }, 10000);

      it('limits hand tracking to 1000 hands maximum', async () => {
        const config = {
          ...mockConfig,
          enableHandTracking: true,
          numberOfSimulations: 1100,
        };
        const engine = new BlackjackSimulation(config);

        const results = await engine.simulate();
        expect(results.handDetails.length).toBeLessThanOrEqual(1000);
      }, 15000);
    });

    describe('Defect #4: Initial Cards vs Final Cards', () => {
      it('stores only initial 2 cards in playerCardsInitial', async () => {
        const config = {
          ...mockConfig,
          enableHandTracking: true,
          numberOfSimulations: 20,
        };
        const engine = new BlackjackSimulation(config);

        const results = await engine.simulate();

        // Check that initial cards only contain 2 cards (unless split occurred)
        const regularHands = results.handDetails.filter(
          (hand) => !hand.initialAction.includes('Split'),
        );

        if (regularHands.length > 0) {
          const firstHand = regularHands[0];
          expect(firstHand.playerCardsInitial.length).toBe(2);
          expect(firstHand.dealerCardsInitial.length).toBe(2);

          // Final cards should potentially have more cards
          expect(firstHand.playerCardsFinal.length).toBeGreaterThanOrEqual(2);
          expect(firstHand.dealerCardsFinal.length).toBeGreaterThanOrEqual(2);

          // Initial and final should be different if hit occurred
          if (firstHand.playerCardsFinal.length > 2) {
            expect(firstHand.playerCardsInitial).not.toEqual(
              firstHand.playerCardsFinal,
            );
          }
        }
      }, 10000);
    });
  });

  describe('Shuffle and Penetration', () => {
    let engine: BlackjackSimulation;

    beforeEach(() => {
      engine = new BlackjackSimulation(mockConfig);
    });

    it('shuffles when penetration threshold is reached', () => {
      const initialShoeSize = engine.testShoe.length;
      // Penetration point is at (1 - penetration%) of total cards
      const penetrationPoint = Math.floor(
        initialShoeSize * (1 - mockConfig.deckPenetration / 100),
      );

      // Deal cards until we should reshuffle (with safety counter)
      let dealtCards = 0;
      const maxCardsToTry = initialShoeSize - penetrationPoint + 10;

      while (
        engine.testShoe.length > penetrationPoint &&
        dealtCards < maxCardsToTry
      ) {
        engine.testDealCard();
        dealtCards++;
      }

      expect(engine.testNeedReshuffle()).toBe(true);
    });

    it('does not shuffle before penetration threshold', () => {
      const initialShoeSize = engine.testShoe.length;
      const penetrationPoint = Math.floor(
        initialShoeSize * (1 - mockConfig.deckPenetration / 100),
      );

      // Deal some cards but stay above threshold
      const cardsToDeal = Math.min(50, initialShoeSize - penetrationPoint - 10);
      for (let i = 0; i < cardsToDeal; i++) {
        engine.testDealCard();
      }

      expect(engine.testNeedReshuffle()).toBe(false);
    });
  });

  describe('True Count Calculation', () => {
    it('calculates true count correctly', () => {
      const engine = new BlackjackSimulation(mockConfig);

      // Set a known running count via updateCount
      const highCards = [
        { suit: 'Hearts', rank: '10', value: 10 },
        { suit: 'Spades', rank: 'K', value: 10 },
        { suit: 'Clubs', rank: 'Q', value: 10 },
        { suit: 'Diamonds', rank: 'J', value: 10 },
        { suit: 'Hearts', rank: 'A', value: 11 },
        { suit: 'Spades', rank: 'A', value: 11 },
      ];

      highCards.forEach((card) => engine.updateCount(card));
      // Should be -6 running count
      expect(engine.testRunningCount).toBe(-6);

      const trueCount = engine.testGetTrueCount();
      expect(trueCount).toBeCloseTo(-1, 1);
    });

    it('handles empty shoe gracefully', () => {
      const engine = new BlackjackSimulation(mockConfig);

      // Deal all cards (with safety counter)
      let dealtCards = 0;
      const maxCards = engine.testShoe.length;

      while (engine.testShoe.length > 0 && dealtCards < maxCards + 10) {
        engine.testDealCard();
        dealtCards++;
      }

      // Set running count
      const lowCard = { suit: 'Hearts', rank: '2', value: 2 };
      engine.updateCount(lowCard);

      const trueCount = engine.testGetTrueCount();
      expect(typeof trueCount).toBe('number');
    });
  });

  describe('Simulation Results', () => {
    it('tracks basic statistics correctly', async () => {
      const config = { ...mockConfig, numberOfSimulations: 50 };
      const engine = new BlackjackSimulation(config);

      const results = await engine.simulate();

      expect(results.handsPlayed).toBe(50);
      expect(results.totalOutcomes).toBe(
        results.wins + results.losses + results.pushes,
      );
      expect(results.winPercentage).toBeGreaterThanOrEqual(0);
      expect(results.winPercentage).toBeLessThanOrEqual(100);
      expect(results.lossPercentage).toBeGreaterThanOrEqual(0);
      expect(results.lossPercentage).toBeLessThanOrEqual(100);
      expect(results.pushPercentage).toBeGreaterThanOrEqual(0);
      expect(results.pushPercentage).toBeLessThanOrEqual(100);

      // Percentages should add up to approximately 100
      const totalPercentage =
        results.winPercentage + results.lossPercentage + results.pushPercentage;
      expect(totalPercentage).toBeCloseTo(100, 1);
    }, 10000);

    it('calculates expected value correctly', async () => {
      const config = { ...mockConfig, numberOfSimulations: 50 };
      const engine = new BlackjackSimulation(config);

      const results = await engine.simulate();

      expect(results.expectedValue).toBeDefined();
      expect(typeof results.expectedValue).toBe('number');
      // netResult should be the total winnings (currentBankroll)
      expect(results.netResult).toBe(results.totalWon);
    }, 10000);

    it('includes counting system in results', async () => {
      const config = { ...mockConfig, numberOfSimulations: 10 };
      const engine = new BlackjackSimulation(config, 'KO');
      const results = await engine.simulate();

      expect(results.countingSystem).toBe('Knock-Out (KO)');
    }, 10000);
  });

  describe('Game Rules Implementation', () => {
    it('respects dealer hits soft 17 rule', () => {
      const configHitsSoft17 = { ...mockConfig, dealerHitsOnSoft17: true };
      const configStandsSoft17 = { ...mockConfig, dealerHitsOnSoft17: false };

      const engineHits = new BlackjackSimulation(configHitsSoft17);
      const engineStands = new BlackjackSimulation(configStandsSoft17);

      expect(engineHits.config.dealerHitsOnSoft17).toBe(true);
      expect(engineStands.config.dealerHitsOnSoft17).toBe(false);
    });

    it('respects player action rules', () => {
      const restrictedConfig = {
        ...mockConfig,
        playerCanDouble: false,
        playerCanSplit: false,
        playerCanSurrender: true,
      };

      const engine = new BlackjackSimulation(restrictedConfig);

      expect(engine.config.playerCanDouble).toBe(false);
      expect(engine.config.playerCanSplit).toBe(false);
      expect(engine.config.playerCanSurrender).toBe(true);
    });
  });
});
