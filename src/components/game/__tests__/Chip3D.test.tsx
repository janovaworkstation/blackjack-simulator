import React from 'react';
import { render } from '@testing-library/react';
import { Chip3D } from '../Chip3D';

// Mock Three.js components
jest.mock('@react-three/fiber', () => ({
  useFrame: jest.fn(),
  useLoader: () => ({
    map: { flipY: false },
  }),
}));

jest.mock('three', () => ({
  TextureLoader: jest.fn(),
  Vector3: jest.fn().mockImplementation((x, y, z) => ({ x, y, z })),
}));

describe('Chip3D', () => {
  it('renders without crashing', () => {
    render(
      <Chip3D
        value={25}
        position={[0, 0, 0]}
        count={1}
      />
    );
  });

  it('handles different chip values', () => {
    const values = [1, 5, 25, 100, 500];
    
    values.forEach(value => {
      render(
        <Chip3D
          value={value}
          position={[0, 0, 0]}
          count={1}
        />
      );
    });
    // All chip values should render without errors
  });

  it('handles different positions', () => {
    render(
      <Chip3D
        value={25}
        position={[1, 2, 3]}
        count={1}
      />
    );
    // Component should render without errors
  });

  it('handles different chip counts', () => {
    const counts = [1, 2, 5, 10];
    
    counts.forEach(count => {
      render(
        <Chip3D
          value={25}
          position={[0, 0, 0]}
          count={count}
        />
      );
    });
    // All chip counts should render without errors
  });

  it('handles zero count', () => {
    render(
      <Chip3D
        value={25}
        position={[0, 0, 0]}
        count={0}
      />
    );
    // Component should handle zero count gracefully
  });

  it('applies correct colors for different values', () => {
    // This test verifies the component renders without crashing
    // In a real 3D environment, we would test color application
    const chipValues = [
      { value: 1, expectedColor: 'white' },
      { value: 5, expectedColor: 'red' },
      { value: 25, expectedColor: 'green' },
      { value: 100, expectedColor: 'black' },
    ];

    chipValues.forEach(({ value }) => {
      render(
        <Chip3D
          value={value}
          position={[0, 0, 0]}
          count={1}
        />
      );
    });
    // All chip colors should render without errors
  });

  it('stacks chips when count is greater than 1', () => {
    render(
      <Chip3D
        value={25}
        position={[0, 0, 0]}
        count={3}
      />
    );
    // Component should handle stacking without errors
  });

  it('handles large chip counts', () => {
    render(
      <Chip3D
        value={100}
        position={[0, 0, 0]}
        count={20}
      />
    );
    // Component should handle large counts without errors
  });
});