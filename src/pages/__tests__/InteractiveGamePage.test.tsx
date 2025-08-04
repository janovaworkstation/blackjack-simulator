import { InteractiveGamePage } from '../InteractiveGamePage';

// Mock the complex 3D components
jest.mock('../../components/game/InteractiveGame', () => ({
  InteractiveGame: function MockInteractiveGame() {
    return <div data-testid="interactive-game-mock">Interactive Game</div>;
  },
}));

describe('InteractiveGamePage Component', () => {
  it('should be a valid React component', () => {
    expect(typeof InteractiveGamePage).toBe('function');
  });

  it('should render without props', () => {
    expect(() => {
      InteractiveGamePage({});
    }).not.toThrow();
  });

  it('should be callable as a function component', () => {
    const result = InteractiveGamePage({});
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });

  it('should return JSX element structure', () => {
    const result = InteractiveGamePage({});
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('props');
  });
});