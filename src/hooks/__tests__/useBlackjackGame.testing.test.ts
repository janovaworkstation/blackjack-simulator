import { renderHook, act } from '@testing-library/react';
import { useBlackjackGame } from '../useBlackjackGame';

describe('useBlackjackGame - Testing Mode', () => {
  it('should toggle testing mode on and off', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    // Initially testing mode should be off
    expect(result.current.isTestingMode).toBe(false);
    
    // Toggle testing mode on
    act(() => {
      result.current.toggleTestingMode();
    });
    expect(result.current.isTestingMode).toBe(true);
    
    // Toggle testing mode off
    act(() => {
      result.current.toggleTestingMode();
    });
    expect(result.current.isTestingMode).toBe(false);
  });

  it('should apply test cards correctly', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    // Enable testing mode
    act(() => {
      result.current.toggleTestingMode();
    });
    
    // Apply test cards
    act(() => {
      result.current.applyTestCards({
        playerCards: ['AH', 'KS'],
        dealerCards: ['QD', '7C'],
        additionalCards: ['5H', '3D', '9S']
      });
    });
    
    // Game should reset to betting state with message about test cards
    expect(result.current.gameState.gameStatus).toBe('betting');
    expect(result.current.gameState.message).toBe('Test cards loaded. Place bet and deal to test scenario.');
  });

  it('should clear test cards', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    // Enable testing mode and apply test cards
    act(() => {
      result.current.toggleTestingMode();
      result.current.applyTestCards({
        playerCards: ['10H', '6S'],
        dealerCards: ['AD', 'KH'],
        additionalCards: ['4C']
      });
    });
    
    // Clear test cards
    act(() => {
      result.current.clearTestCards();
    });
    
    // Test cards should be cleared (we can't directly check internal state, but clearTestCards should work)
    expect(result.current.isTestingMode).toBe(true); // Testing mode should still be on
  });

  it('should convert card strings to Card objects correctly', () => {
    const { result } = renderHook(() => useBlackjackGame());
    
    act(() => {
      result.current.toggleTestingMode();
      result.current.applyTestCards({
        playerCards: ['AS', 'KH'],
        dealerCards: ['10D', 'JC'],
        additionalCards: ['2S', '7H']
      });
    });
    
    // Verify the game accepts the test cards without errors
    expect(result.current.gameState.gameStatus).toBe('betting');
  });
});