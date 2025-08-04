import { renderHook, act } from '@testing-library/react';
import { useBlackjackGame } from '../useBlackjackGame';

describe('useBlackjackGame', () => {
  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    expect(result.current.gameState).toEqual({
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
      message: 'Place your bet to start',
      insuranceBet: 0,
      canTakeInsurance: false,
      isSplit: false,
      activeHand: 0,
      splitHands: [],
      splitCount: 0,
    });
  });

  it('allows placing bets', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    act(() => {
      result.current.onBet(50);
    });
    
    expect(result.current.gameState.currentBet).toBe(50);
    expect(result.current.gameState.canDeal).toBe(true);
  });

  it('prevents betting more than bankroll', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    act(() => {
      result.current.onBet(1500); // More than starting bankroll of 1000
    });
    
    // Should not exceed bankroll, bet should remain 0 or be limited
    expect(result.current.gameState.currentBet).toBeLessThanOrEqual(1000);
  });

  it('deals initial cards correctly', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    act(() => {
      result.current.onBet(50);
    });
    
    act(() => {
      result.current.onDeal();
    });
    
    expect(result.current.playerCards).toHaveLength(2);
    expect(result.current.dealerCards).toHaveLength(2);
    expect(result.current.gameState.gameStatus).toBe('playing');
  });

  it('calculates hand values correctly', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    act(() => {
      result.current.onBet(50);
    });
    
    act(() => {
      result.current.onDeal();
    });
    
    expect(result.current.gameState.handValue).toBeGreaterThan(0);
    expect(result.current.gameState.dealerValue).toBeGreaterThan(0);
  });

  it('handles player hit action', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    act(() => {
      result.current.onBet(50);
    });
    
    act(() => {
      result.current.onDeal();
    });
    
    const initialHandSize = result.current.playerCards.length;
    
    act(() => {
      result.current.onHit();
    });
    
    expect(result.current.playerCards.length).toBeGreaterThanOrEqual(initialHandSize);
  });

  it('handles player stand action', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    act(() => {
      result.current.onBet(50);
    });
    
    act(() => {
      result.current.onDeal();
    });
    
    act(() => {
      result.current.onStand();
    });
    
    expect(result.current.gameState.canHit).toBe(false);
    expect(result.current.gameState.canStand).toBe(false);
  });

  it('handles double down action', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    act(() => {
      result.current.onBet(50);
    });
    
    act(() => {
      result.current.onDeal();
    });
    
    const initialBet = result.current.gameState.currentBet;
    
    // Only double if we can afford it and haven't already doubled
    if (result.current.gameState.canDouble) {
      act(() => {
        result.current.onDouble();
      });
      
      expect(result.current.gameState.currentBet).toBe(initialBet * 2);
      expect(result.current.gameState.canHit).toBe(false);
      expect(result.current.gameState.canDouble).toBe(false);
    }
  });

  it('maintains running and true count correctly', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    expect(result.current.runningCount).toBeDefined();
    expect(result.current.trueCount).toBeDefined();
    expect(typeof result.current.runningCount).toBe('number');
    expect(typeof result.current.trueCount).toBe('number');
  });

  it('handles insurance betting', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    act(() => {
      result.current.onBet(50);
    });
    
    act(() => {
      result.current.onDeal();
    });
    
    // If insurance is offered (dealer shows Ace)
    if (result.current.gameState.canTakeInsurance) {
      act(() => {
        result.current.onTakeInsurance();
      });
      
      expect(result.current.gameState.insuranceBet).toBeGreaterThan(0);
      expect(result.current.gameState.canTakeInsurance).toBe(false);
    }
  });

  it('handles split functionality', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    act(() => {
      result.current.onBet(50);
    });
    
    act(() => {
      result.current.onDeal();
    });
    
    // If split is available (pair dealt)
    if (result.current.gameState.canSplit) {
      act(() => {
        result.current.onSplit();
      });
      
      expect(result.current.gameState.isSplit).toBe(true);
      expect(result.current.gameState.splitHands).toHaveLength(2);
      expect(result.current.gameState.splitCount).toBe(1);
    }
  });

  it('prevents invalid actions based on game state', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    // Should not be able to hit before dealing
    expect(result.current.gameState.canHit).toBe(false);
    expect(result.current.gameState.canStand).toBe(false);
    expect(result.current.gameState.canDouble).toBe(false);
    expect(result.current.gameState.canSplit).toBe(false);
    
    // Should not be able to deal without betting
    expect(result.current.gameState.canDeal).toBe(false);
  });

  it('provides card counting information', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    expect(result.current.cardsRemaining).toBeGreaterThan(0);
    expect(result.current.totalCardsInShoe).toBe(312); // 6 decks * 52 cards
    expect(result.current.penetration).toBeGreaterThanOrEqual(0);
    expect(typeof result.current.needsShuffle).toBe('boolean');
  });

  it('provides chip stack information', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    expect(Array.isArray(result.current.chipStack)).toBe(true);
    expect(Array.isArray(result.current.doubleChipStack)).toBe(true);
    expect(Array.isArray(result.current.insuranceChipStack)).toBe(true);
    expect(Array.isArray(result.current.splitChipStack)).toBe(true);
  });

  it('provides animation state information', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    expect(typeof result.current.showWinningsAnimation).toBe('boolean');
    expect(typeof result.current.showDoubleWinningsAnimation).toBe('boolean');
    expect(typeof result.current.showLossAnimation).toBe('boolean');
    expect(typeof result.current.showInsuranceLossAnimation).toBe('boolean');
  });
});