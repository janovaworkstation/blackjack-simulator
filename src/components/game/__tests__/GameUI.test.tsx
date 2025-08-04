import GameUI from '../GameUI';

const mockGameState = {
  canHit: true,
  canStand: true,
  canDouble: false,
  canSplit: false,
  canDeal: false,
  currentBet: 25,
  bankroll: 1000,
  playerHand: ['AS', 'KH'],
  dealerHand: ['QD', '??'],
  handValue: 21,
  dealerValue: 10,
  gameStatus: 'playing' as const,
  message: 'Choose your action'
};

const mockHandlers = {
  onHit: jest.fn(),
  onStand: jest.fn(),
  onDouble: jest.fn(),
  onSplit: jest.fn(),
  onDeal: jest.fn(),
  onBet: jest.fn()
};

describe('GameUI Component', () => {
  it('should be a valid React component', () => {
    expect(typeof GameUI).toBe('function');
  });

  it('should accept required props', () => {
    expect(() => {
      GameUI({ ...mockHandlers, gameState: mockGameState });
    }).not.toThrow();
  });

  it('should handle different game states', () => {
    const bettingState = { ...mockGameState, gameStatus: 'betting' as const };
    const playingState = { ...mockGameState, gameStatus: 'playing' as const };
    const completeState = { ...mockGameState, gameStatus: 'complete' as const };

    expect(() => {
      GameUI({ ...mockHandlers, gameState: bettingState });
    }).not.toThrow();

    expect(() => {
      GameUI({ ...mockHandlers, gameState: playingState });
    }).not.toThrow();

    expect(() => {
      GameUI({ ...mockHandlers, gameState: completeState });
    }).not.toThrow();
  });

  it('should handle button enable/disable states', () => {
    const disabledState = {
      ...mockGameState,
      canHit: false,
      canStand: false,
      canDouble: false,
      canSplit: false
    };

    expect(() => {
      GameUI({ ...mockHandlers, gameState: disabledState });
    }).not.toThrow();
  });

  it('should handle different bankroll amounts', () => {
    const lowBankrollState = { ...mockGameState, bankroll: 5 };
    const highBankrollState = { ...mockGameState, bankroll: 10000 };

    expect(() => {
      GameUI({ ...mockHandlers, gameState: lowBankrollState });
    }).not.toThrow();

    expect(() => {
      GameUI({ ...mockHandlers, gameState: highBankrollState });
    }).not.toThrow();
  });

  it('should handle empty hands', () => {
    const emptyHandsState = {
      ...mockGameState,
      playerHand: [],
      dealerHand: [],
      handValue: 0,
      dealerValue: 0
    };

    expect(() => {
      GameUI({ ...mockHandlers, gameState: emptyHandsState });
    }).not.toThrow();
  });
});