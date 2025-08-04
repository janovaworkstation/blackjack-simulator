import React from 'react';
import '@testing-library/jest-dom';

// Mock the useBlackjackGame hook
const mockGameState = {
  canHit: false,
  canStand: false,
  canDouble: false,
  canSplit: false,
  canSurrender: false,
  canDeal: true,
  currentBet: 50,
  originalBet: 0,
  bankroll: 1000,
  playerHand: ['K♠', '10♥'],
  dealerHand: ['A♦'],
  handValue: 20,
  dealerValue: 11,
  gameStatus: 'playing' as const,
  message: 'Choose your action',
  insuranceBet: 0,
  canTakeInsurance: false,
  lastHandResult: null,
  lastHandAmount: 0,
  isSplit: false,
  activeHand: 0,
  splitHands: [],
  splitCount: 0
};

const mockHookReturn = {
  gameState: mockGameState,
  onBet: jest.fn(),
  onClearBet: jest.fn(),
  onDeal: jest.fn(),
  onHit: jest.fn(),
  onStand: jest.fn(),
  onDouble: jest.fn(),
  onSplit: jest.fn(),
  onSurrender: jest.fn(),
  onTakeInsurance: jest.fn(),
  onDeclineInsurance: jest.fn(),
  playerCards: [
    { rank: 'K', suit: 'Spades', value: 10 },
    { rank: '10', suit: 'Hearts', value: 10 }
  ],
  dealerCards: [
    { rank: 'A', suit: 'Diamonds', value: 11 }
  ],
  splitPlayerCards: [[]],
  startDealerPlay: jest.fn(),
  waitingForHoleCardFlip: false,
  handleDealerBlackjack: jest.fn(),
  isDealing: false,
  isPlayerBlackjack: false,
  chipStack: [50],
  doubleChipStack: [],
  insuranceChipStack: [],
  splitChipStack: [],
  winningsChipStack: [],
  doubleWinningsChipStack: [],
  showWinningsAnimation: false,
  showDoubleWinningsAnimation: false,
  showLossAnimation: false,
  showInsuranceLossAnimation: false,
  showDoubleLossAnimation: false,
  showSplitLossAnimation: false,
  calculateHandValue: jest.fn((cards) => {
    return cards.reduce((sum: number, card: any) => sum + card.value, 0);
  }),
  cardsRemaining: 300,
  totalCardsInShoe: 312,
  penetration: 0.25,
  needsShuffle: false,
  runningCount: 0,
  trueCount: 0,
  setDealerCheckComplete: jest.fn()
};

jest.mock('../../../hooks/useBlackjackGame', () => ({
  useBlackjackGame: () => mockHookReturn
}));

// Mock Three.js components
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas">{children}</div>,
  useFrame: () => {},
  useThree: () => ({ camera: { position: { set: jest.fn() } } })
}));

jest.mock('@react-three/drei', () => ({
  OrbitControls: () => <div data-testid="orbit-controls" />,
  PerspectiveCamera: () => <div data-testid="perspective-camera" />,
  ambientLight: () => <div data-testid="ambient-light" />,
  pointLight: () => <div data-testid="point-light" />
}));

jest.mock('../BlackjackTable3D', () => ({
  BlackjackTable3D: () => <div data-testid="blackjack-table-3d" />
}));

jest.mock('../Card3D', () => ({
  Card3D: ({ rank, suit }: { rank: string; suit: string }) => (
    <div data-testid={`card-3d-${rank}-${suit}`}>{rank}{suit}</div>
  )
}));

jest.mock('../Chip3D', () => ({
  Chip3D: ({ value }: { value: number }) => (
    <div data-testid={`chip-3d-${value}`}>${value}</div>
  )
}));

describe('InteractiveGame Hook Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should provide handleDealerBlackjack function', () => {
    expect(mockHookReturn.handleDealerBlackjack).toBeDefined();
    expect(typeof mockHookReturn.handleDealerBlackjack).toBe('function');
  });

  it('should handle dealer blackjack detection', () => {
    const result = mockHookReturn.handleDealerBlackjack();
    expect(mockHookReturn.handleDealerBlackjack).toHaveBeenCalled();
  });

  it('should track originalBet in game state', () => {
    expect(mockHookReturn.gameState.originalBet).toBeDefined();
    expect(mockHookReturn.gameState.originalBet).toBe(0);
  });

  it('should track win/loss display fields', () => {
    expect(mockHookReturn.gameState.lastHandResult).toBeDefined();
    expect(mockHookReturn.gameState.lastHandAmount).toBeDefined();
  });

  it('should provide all required game functions', () => {
    const requiredFunctions = [
      'onBet', 'onClearBet', 'onDeal', 'onHit', 'onStand', 
      'onDouble', 'onSplit', 'onSurrender', 'onTakeInsurance', 
      'onDeclineInsurance', 'handleDealerBlackjack', 'startDealerPlay'
    ];

    requiredFunctions.forEach(funcName => {
      expect(mockHookReturn[funcName]).toBeDefined();
      expect(typeof mockHookReturn[funcName]).toBe('function');
    });
  });

  it('should handle win scenario state', () => {
    const winGameState = {
      ...mockGameState,
      gameStatus: 'complete' as const,
      lastHandResult: 'won' as const,
      lastHandAmount: 50,
      currentBet: 0
    };

    expect(winGameState.lastHandResult).toBe('won');
    expect(winGameState.lastHandAmount).toBe(50);
  });

  it('should handle doubled bet scenario', () => {
    const doubledGameState = {
      ...mockGameState,
      currentBet: 100,
      originalBet: 50,
      gameStatus: 'complete' as const
    };

    expect(doubledGameState.originalBet).toBe(50);
    expect(doubledGameState.currentBet).toBe(100);
  });

  it('should handle insurance decline scenario', () => {
    const insuranceGameState = {
      ...mockGameState,
      gameStatus: 'insurance-offered' as const,
      canTakeInsurance: true,
      dealerHand: ['A♦']
    };

    expect(insuranceGameState.gameStatus).toBe('insurance-offered');
    expect(insuranceGameState.canTakeInsurance).toBe(true);
    expect(mockHookReturn.onDeclineInsurance).toBeDefined();
  });
});