import { BlackjackTable3D } from '../BlackjackTable3D';

describe('BlackjackTable3D Component', () => {
  it('should be a valid React component', () => {
    expect(typeof BlackjackTable3D).toBe('function');
  });

  it('should render without props', () => {
    expect(() => {
      BlackjackTable3D({});
    }).not.toThrow();
  });

  it('should be callable as a function component', () => {
    const result = BlackjackTable3D({});
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
  });

  it('should return JSX element structure', () => {
    const result = BlackjackTable3D({});
    expect(result).toHaveProperty('type');
    expect(result).toHaveProperty('props');
  });
});