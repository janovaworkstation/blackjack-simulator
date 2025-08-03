import Chip3D from '../Chip3D';

describe('Chip3D Component', () => {
  it('should be a valid React component', () => {
    expect(typeof Chip3D).toBe('function');
  });

  it('should accept position and value props', () => {
    const position: [number, number, number] = [1, 2, 3];
    expect(() => {
      Chip3D({ position, value: 25 });
    }).not.toThrow();
  });

  it('should handle different chip values', () => {
    const values = [1, 5, 25, 100, 500];
    values.forEach(value => {
      expect(() => {
        Chip3D({ position: [0, 0, 0], value });
      }).not.toThrow();
    });
  });

  it('should accept custom color prop', () => {
    expect(() => {
      Chip3D({ 
        position: [0, 0, 0], 
        value: 10, 
        color: "#FF5500" 
      });
    }).not.toThrow();
  });

  it('should handle standard casino chip values', () => {
    const standardValues = [1, 5, 25, 100, 500, 1000];
    standardValues.forEach(value => {
      expect(() => {
        Chip3D({ position: [0, 0, 0], value });
      }).not.toThrow();
    });
  });

  it('should handle non-standard chip values', () => {
    expect(() => {
      Chip3D({ 
        position: [0, 0, 0], 
        value: 50, 
        color: "#FF00FF" 
      });
    }).not.toThrow();
  });

  it('should render without color prop', () => {
    expect(() => {
      Chip3D({ position: [0, 0, 0], value: 10 });
    }).not.toThrow();
  });

  it('should handle edge cases', () => {
    expect(() => {
      Chip3D({ position: [0, 0, 0], value: 0 });
    }).not.toThrow();
    
    expect(() => {
      Chip3D({ position: [0, 0, 0], value: -1 });
    }).not.toThrow();
  });
});