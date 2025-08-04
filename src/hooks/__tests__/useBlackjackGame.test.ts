import { renderHook, act } from '@testing-library/react';
import { useBlackjackGame } from '../useBlackjackGame';

describe('useBlackjackGame Hook', () => {
  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    expect(result.current.gameState.bankroll).toBe(1000);
    expect(result.current.gameState.currentBet).toBe(0);
    expect(result.current.gameState.gameStatus).toBe('betting');
    expect(result.current.gameState.playerHand).toEqual([]);
    expect(result.current.gameState.dealerHand).toEqual([]);
  });

  it('should handle betting correctly', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    act(() => {
      result.current.onBet(25);
    });
    
    expect(result.current.gameState.currentBet).toBe(25);
    expect(result.current.gameState.bankroll).toBe(975);
    expect(result.current.gameState.canDeal).toBe(true);
  });

  it('should not allow betting more than bankroll', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    act(() => {
      result.current.onBet(1500); // More than initial bankroll
    });
    
    expect(result.current.gameState.currentBet).toBe(0);
    expect(result.current.gameState.bankroll).toBe(1000);
  });

  it('should allow multiple bets', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    act(() => {
      result.current.onBet(25);
    });
    
    act(() => {
      result.current.onBet(25);
    });
    
    expect(result.current.gameState.currentBet).toBe(50);
    expect(result.current.gameState.bankroll).toBe(950);
  });

  it('should deal cards when onDeal is called', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    // Place bet first
    act(() => {
      result.current.onBet(25);
    });
    
    // Deal cards
    act(() => {
      result.current.onDeal();
    });
    
    expect(result.current.gameState.gameStatus).toBe('playing');
    expect(result.current.gameState.playerHand).toHaveLength(2);
    expect(result.current.gameState.dealerHand).toHaveLength(2);
    expect(result.current.gameState.handValue).toBeGreaterThan(0);
  });

  it('should not deal cards without a bet', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    act(() => {
      result.current.onDeal();
    });
    
    expect(result.current.gameState.gameStatus).toBe('betting');
    expect(result.current.gameState.playerHand).toHaveLength(0);
  });

  it('should handle hit action', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    // Set up a game
    act(() => {
      result.current.onBet(25);
    });
    
    act(() => {
      result.current.onDeal();
    });
    
    const initialHandSize = result.current.gameState.playerHand.length;
    
    // Hit
    act(() => {
      result.current.onHit();
    });
    
    expect(result.current.gameState.playerHand.length).toBe(initialHandSize + 1);
  });

  it('should reset game correctly for new hand', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    // Play a complete hand
    act(() => {
      result.current.onBet(25);
    });
    
    act(() => {
      result.current.onDeal();
    });
    
    // Force game to complete state
    act(() => {
      result.current.onStand();
    });
    
    expect(result.current.gameState.gameStatus).toBe('complete');
    
    // Start new hand
    act(() => {
      result.current.onDeal();
    });
    
    expect(result.current.gameState.gameStatus).toBe('betting');
    expect(result.current.gameState.currentBet).toBe(0);
    expect(result.current.gameState.playerHand).toEqual([]);
  });

  it('should handle component and card states', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    expect(result.current.playerCards).toEqual([]);
    expect(result.current.dealerCards).toEqual([]);
    
    // After dealing
    act(() => {
      result.current.onBet(25);
    });
    
    act(() => {
      result.current.onDeal();
    });
    
    expect(result.current.playerCards.length).toBe(2);
    expect(result.current.dealerCards.length).toBe(2);
  });
});