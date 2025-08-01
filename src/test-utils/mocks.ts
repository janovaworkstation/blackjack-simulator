import { Card, Hand, Rank, Suit, ranks, suits } from '../types/card';

/**
 * Creates a mock card.
 * @param overrides - Partial card data to override the defaults.
 * @returns A mock card object.
 */
export const createMockCard = (overrides: Partial<Card> = {}): Card => {
  return {
    suit: suits[0],
    rank: ranks[0],
    ...overrides,
  };
};

/**
 * Creates a mock hand from an array of partial card data.
 * @param cards - An array of partial card objects.
 * @returns An array of card objects representing a hand.
 */
export const createMockHand = (cards: Partial<Card>[]): Hand => {
  return cards.map(createMockCard);
};

// Example mock hands for common scenarios
export const mockPlayerHand: Hand = createMockHand([
  { rank: '10', suit: 'Hearts' },
  { rank: 'A', suit: 'Clubs' },
]);

export const mockDealerHand: Hand = createMockHand([
  { rank: '7', suit: 'Spades' },
  { rank: 'K', suit: 'Diamonds' },
]);

export const mockBlackjackHand: Hand = createMockHand([
  { rank: 'A', suit: 'Spades' },
  { rank: 'K', suit: 'Spades' },
]);

export const mockBustedHand: Hand = createMockHand([
  { rank: '10', suit: 'Hearts' },
  { rank: '10', suit: 'Clubs' },
  { rank: '5', suit: 'Diamonds' },
]);
