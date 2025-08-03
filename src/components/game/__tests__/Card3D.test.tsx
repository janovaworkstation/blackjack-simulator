import Card3D from '../Card3D';

describe('Card3D Component', () => {
  it('should be a valid React component', () => {
    expect(typeof Card3D).toBe('function');
  });

  it('should accept position prop', () => {
    const position: [number, number, number] = [1, 2, 3];
    expect(() => {
      Card3D({ position });
    }).not.toThrow();
  });

  it('should accept optional rotation prop', () => {
    const rotation: [number, number, number] = [0.1, 0.2, 0.3];
    expect(() => {
      Card3D({ position: [0, 0, 0], rotation });
    }).not.toThrow();
  });

  it('should accept rank and suit props', () => {
    expect(() => {
      Card3D({ 
        position: [0, 0, 0], 
        rank: 'K', 
        suit: 'Hearts', 
        faceUp: true 
      });
    }).not.toThrow();
  });

  it('should handle face-down cards', () => {
    expect(() => {
      Card3D({ 
        position: [0, 0, 0], 
        faceUp: false 
      });
    }).not.toThrow();
  });

  it('should handle all suit types', () => {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    suits.forEach(suit => {
      expect(() => {
        Card3D({ 
          position: [0, 0, 0], 
          suit,
          faceUp: true 
        });
      }).not.toThrow();
    });
  });

  it('should handle all rank types', () => {
    const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    ranks.forEach(rank => {
      expect(() => {
        Card3D({ 
          position: [0, 0, 0], 
          rank,
          faceUp: true 
        });
      }).not.toThrow();
    });
  });

  it('should use default values', () => {
    expect(() => {
      Card3D({ position: [0, 0, 0] });
    }).not.toThrow();
  });
});