import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GameUI } from '../GameUI';

const mockGameState = {
  canHit: true,
  canStand: true,
  canDouble: true,
  canSplit: false,
  canDeal: false,
  currentBet: 50,
  bankroll: 1000,
  playerHand: ['AH', 'KS'],
  dealerHand: ['7D', '??'],
  handValue: 21,
  dealerValue: 7,
  gameStatus: 'playing' as const,
  message: 'Player has 21!',
  insuranceBet: 0,
  canTakeInsurance: false,
  isSplit: false,
  activeHand: 0,
  splitHands: [],
  splitCount: 0,
};

const mockActions = {
  placeBet: jest.fn(),
  dealCards: jest.fn(),
  hit: jest.fn(),
  stand: jest.fn(),
  double: jest.fn(),
  split: jest.fn(),
  newHand: jest.fn(),
  takeInsurance: jest.fn(),
  declineInsurance: jest.fn(),
};

describe('GameUI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders betting interface correctly', () => {
    const bettingState = {
      ...mockGameState,
      gameStatus: 'betting' as const,
      canDeal: true,
      currentBet: 0,
      playerHand: [],
      dealerHand: [],
      handValue: 0,
      dealerValue: 0,
      message: 'Place your bet',
    };

    render(
      <GameUI
        gameState={bettingState}
        runningCount={0}
        trueCount={0}
        actions={mockActions}
      />
    );

    expect(screen.getByText('Bankroll: $1,000')).toBeInTheDocument();
    expect(screen.getByText('Place your bet')).toBeInTheDocument();
    expect(screen.getByText('$1')).toBeInTheDocument();
    expect(screen.getByText('$5')).toBeInTheDocument();
    expect(screen.getByText('$25')).toBeInTheDocument();
    expect(screen.getByText('$100')).toBeInTheDocument();
  });

  it('handles chip betting clicks', () => {
    const bettingState = {
      ...mockGameState,
      gameStatus: 'betting' as const,
      currentBet: 0,
      playerHand: [],
      dealerHand: [],
      handValue: 0,
      dealerValue: 0,
    };

    render(
      <GameUI
        gameState={bettingState}
        runningCount={0}
        trueCount={0}
        actions={mockActions}
      />
    );

    fireEvent.click(screen.getByText('$25'));
    expect(mockActions.placeBet).toHaveBeenCalledWith(25);

    fireEvent.click(screen.getByText('$100'));
    expect(mockActions.placeBet).toHaveBeenCalledWith(100);
  });

  it('shows deal cards button when bet is placed', () => {
    const bettingState = {
      ...mockGameState,
      gameStatus: 'betting' as const,
      canDeal: true,
      currentBet: 50,
      playerHand: [],
      dealerHand: [],
      handValue: 0,
      dealerValue: 0,
    };

    render(
      <GameUI
        gameState={bettingState}
        runningCount={0}
        trueCount={0}
        actions={mockActions}
      />
    );

    const dealButton = screen.getByText('Deal Cards');
    expect(dealButton).toBeInTheDocument();
    expect(dealButton).not.toBeDisabled();

    fireEvent.click(dealButton);
    expect(mockActions.dealCards).toHaveBeenCalled();
  });

  it('displays game action buttons during play', () => {
    render(
      <GameUI
        gameState={mockGameState}
        runningCount={2}
        trueCount={1.5}
        actions={mockActions}
      />
    );

    expect(screen.getByText('Hit')).toBeInTheDocument();
    expect(screen.getByText('Stand')).toBeInTheDocument();
    expect(screen.getByText('Double')).toBeInTheDocument();
    
    // Split button should not be visible if canSplit is false
    expect(screen.queryByText('Split')).not.toBeInTheDocument();
  });

  it('handles action button clicks', () => {
    render(
      <GameUI
        gameState={mockGameState}
        runningCount={0}
        trueCount={0}
        actions={mockActions}
      />
    );

    fireEvent.click(screen.getByText('Hit'));
    expect(mockActions.hit).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Stand'));
    expect(mockActions.stand).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Double'));
    expect(mockActions.double).toHaveBeenCalled();
  });

  it('displays split button when splitting is available', () => {
    const splitState = {
      ...mockGameState,
      canSplit: true,
      playerHand: ['KH', 'KS'],
    };

    render(
      <GameUI
        gameState={splitState}
        runningCount={0}
        trueCount={0}
        actions={mockActions}
      />
    );

    const splitButton = screen.getByText('Split');
    expect(splitButton).toBeInTheDocument();
    expect(splitButton).not.toBeDisabled();

    fireEvent.click(splitButton);
    expect(mockActions.split).toHaveBeenCalled();
  });

  it('displays insurance options when available', () => {
    const insuranceState = {
      ...mockGameState,
      canTakeInsurance: true,
      gameStatus: 'insurance-offered' as const,
      dealerHand: ['AD', '??'],
      message: 'Dealer shows Ace. Insurance?',
    };

    render(
      <GameUI
        gameState={insuranceState}
        runningCount={0}
        trueCount={0}
        actions={mockActions}
      />
    );

    expect(screen.getByText('Take Insurance')).toBeInTheDocument();
    expect(screen.getByText('Decline')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Take Insurance'));
    expect(mockActions.takeInsurance).toHaveBeenCalled();

    fireEvent.click(screen.getByText('Decline'));
    expect(mockActions.declineInsurance).toHaveBeenCalled();
  });

  it('shows new hand button when game is complete', () => {
    const completeState = {
      ...mockGameState,
      gameStatus: 'complete' as const,
      canHit: false,
      canStand: false,
      canDouble: false,
      message: 'You win!',
    };

    render(
      <GameUI
        gameState={completeState}
        runningCount={0}
        trueCount={0}
        actions={mockActions}
      />
    );

    const newHandButton = screen.getByText('New Hand');
    expect(newHandButton).toBeInTheDocument();

    fireEvent.click(newHandButton);
    expect(mockActions.newHand).toHaveBeenCalled();
  });

  it('displays hand values correctly', () => {
    render(
      <GameUI
        gameState={mockGameState}
        runningCount={0}
        trueCount={0}
        actions={mockActions}
      />
    );

    expect(screen.getByText('Your Hand: 21')).toBeInTheDocument();
    expect(screen.getByText('Dealer: 7')).toBeInTheDocument();
  });

  it('displays card counting information', () => {
    render(
      <GameUI
        gameState={mockGameState}
        runningCount={3}
        trueCount={2.1}
        actions={mockActions}
      />
    );

    expect(screen.getByText('Running Count: +3')).toBeInTheDocument();
    expect(screen.getByText('True Count: +2.1')).toBeInTheDocument();
  });

  it('displays current bet and bankroll', () => {
    render(
      <GameUI
        gameState={mockGameState}
        runningCount={0}
        trueCount={0}
        actions={mockActions}
      />
    );

    expect(screen.getByText('Current Bet: $50')).toBeInTheDocument();
    expect(screen.getByText('Bankroll: $1,000')).toBeInTheDocument();
  });

  it('displays split hands information when splitting', () => {
    const splitState = {
      ...mockGameState,
      isSplit: true,
      activeHand: 0,
      splitHands: [
        { cards: ['KH', '8D'], value: 18, isComplete: false, isBust: false, is21: false },
        { cards: ['KS', '9C'], value: 19, isComplete: true, isBust: false, is21: false },
      ],
    };

    render(
      <GameUI
        gameState={splitState}
        runningCount={0}
        trueCount={0}
        actions={mockActions}
      />
    );

    expect(screen.getByText('Hand 1: 18')).toBeInTheDocument();
    expect(screen.getByText('Hand 2: 19')).toBeInTheDocument();
  });

  it('disables action buttons appropriately', () => {
    const disabledState = {
      ...mockGameState,
      canHit: false,
      canStand: false,
      canDouble: false,
      canSplit: false,
    };

    render(
      <GameUI
        gameState={disabledState}
        runningCount={0}
        trueCount={0}
        actions={mockActions}
      />
    );

    expect(screen.getByText('Hit')).toBeDisabled();
    expect(screen.getByText('Stand')).toBeDisabled();
    expect(screen.getByText('Double')).toBeDisabled();
  });

  it('formats negative counts correctly', () => {
    render(
      <GameUI
        gameState={mockGameState}
        runningCount={-2}
        trueCount={-1.5}
        actions={mockActions}
      />
    );

    expect(screen.getByText('Running Count: -2')).toBeInTheDocument();
    expect(screen.getByText('True Count: -1.5')).toBeInTheDocument();
  });

  it('displays insurance bet when taken', () => {
    const insuranceState = {
      ...mockGameState,
      insuranceBet: 25,
    };

    render(
      <GameUI
        gameState={insuranceState}
        runningCount={0}
        trueCount={0}
        actions={mockActions}
      />
    );

    expect(screen.getByText('Insurance: $25')).toBeInTheDocument();
  });
});