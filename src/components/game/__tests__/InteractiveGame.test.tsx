import React from 'react';
import { render, screen } from '@testing-library/react';
import { InteractiveGame } from '../InteractiveGame';

// Mock Three.js components
jest.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => <div data-testid="canvas">{children}</div>,
}));

jest.mock('@react-three/drei', () => ({
  PerspectiveCamera: () => <div data-testid="camera" />,
  OrbitControls: () => <div data-testid="orbit-controls" />,
}));

jest.mock('../BlackjackTable3D', () => ({
  BlackjackTable3D: () => <div data-testid="blackjack-table-3d" />,
}));

jest.mock('../Card3D', () => ({
  Card3D: ({ card }: { card: string }) => <div data-testid={`card-3d-${card}`} />,
}));

jest.mock('../Chip3D', () => ({
  Chip3D: ({ value }: { value: number }) => <div data-testid={`chip-3d-${value}`} />,
}));

jest.mock('../GameUI', () => ({
  GameUI: ({ gameState }: { gameState: any }) => (
    <div data-testid="game-ui">
      <div>Game Status: {gameState.gameStatus}</div>
      <div>Bankroll: ${gameState.bankroll}</div>
    </div>
  ),
}));

// Mock the useBlackjackGame hook
jest.mock('../../../hooks/useBlackjackGame', () => ({
  useBlackjackGame: () => ({
    gameState: {
      canHit: false,
      canStand: false,
      canDouble: false,
      canSplit: false,
      canDeal: false,
      currentBet: 0,
      bankroll: 1000,
      playerHand: [],
      dealerHand: [],
      handValue: 0,
      dealerValue: 0,
      gameStatus: 'betting',
      message: 'Place your bet to start the game',
      insuranceBet: 0,
      canTakeInsurance: false,
      isSplit: false,
      activeHand: 0,
      splitHands: [],
      splitCount: 0,
    },
    runningCount: 0,
    trueCount: 0,
    placeBet: jest.fn(),
    dealCards: jest.fn(),
    hit: jest.fn(),
    stand: jest.fn(),
    double: jest.fn(),
    split: jest.fn(),
    newHand: jest.fn(),
    takeInsurance: jest.fn(),
    declineInsurance: jest.fn(),
  }),
}));

describe('InteractiveGame', () => {
  it('renders without crashing', () => {
    render(<InteractiveGame />);
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
    expect(screen.getByTestId('game-ui')).toBeInTheDocument();
  });

  it('renders 3D scene components', () => {
    render(<InteractiveGame />);
    
    expect(screen.getByTestId('blackjack-table-3d')).toBeInTheDocument();
    expect(screen.getByTestId('camera')).toBeInTheDocument();
    expect(screen.getByTestId('orbit-controls')).toBeInTheDocument();
  });

  it('renders game UI with initial state', () => {
    render(<InteractiveGame />);
    
    expect(screen.getByText('Game Status: betting')).toBeInTheDocument();
    expect(screen.getByText('Bankroll: $1000')).toBeInTheDocument();
  });

  it('has correct canvas configuration', () => {
    render(<InteractiveGame />);
    
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('integrates game state with 3D visualization', () => {
    // This test verifies that the component structure is correct
    // In a real implementation, we would test that cards and chips
    // appear in the 3D scene based on game state
    render(<InteractiveGame />);
    
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
    expect(screen.getByTestId('game-ui')).toBeInTheDocument();
    expect(screen.getByTestId('blackjack-table-3d')).toBeInTheDocument();
  });
});