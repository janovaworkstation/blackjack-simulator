export const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'] as const;
export const ranks = [
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
] as const;

export type Suit = (typeof suits)[number];
export type Rank = (typeof ranks)[number];

export interface Card {
  suit: Suit;
  rank: Rank;
}

export type Hand = Card[];
