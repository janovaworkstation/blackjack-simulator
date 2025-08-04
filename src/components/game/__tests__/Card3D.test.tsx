import React from 'react';
import { render } from '@testing-library/react';
import { Card3D } from '../Card3D';

// Mock Three.js components
jest.mock('@react-three/fiber', () => ({
  useFrame: jest.fn(),
  useLoader: () => ({
    map: { flipY: false },
  }),
}));

jest.mock('@react-three/drei', () => ({
  Text: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('three', () => ({
  TextureLoader: jest.fn(),
  DoubleSide: 2,
  Vector3: jest.fn().mockImplementation((x, y, z) => ({ x, y, z })),
}));

// Mock the React Three Fiber context
const mockThreeContext = {
  scene: {},
  camera: {},
  renderer: {},
  clock: {},
};

jest.mock('@react-three/fiber', () => ({
  ...jest.requireActual('@react-three/fiber'),
  useThree: () => mockThreeContext,
  useFrame: jest.fn(),
  useLoader: () => ({
    map: { flipY: false },
  }),
}));

describe('Card3D', () => {
  it('renders without crashing', () => {
    const mockRef = { current: null };
    render(
      <Card3D
        card="AH"
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        faceUp={true}
        ref={mockRef}
      />
    );
  });

  it('handles face-up cards', () => {
    const mockRef = { current: null };
    render(
      <Card3D
        card="KS"
        position={[1, 0, 0]}
        rotation={[0, 0, 0]}
        faceUp={true}
        ref={mockRef}
      />
    );
    // Component should render without errors
  });

  it('handles face-down cards', () => {
    const mockRef = { current: null };
    render(
      <Card3D
        card="??"
        position={[0, 0, 1]}
        rotation={[0, Math.PI, 0]}
        faceUp={false}
        ref={mockRef}
      />
    );
    // Component should render without errors
  });

  it('accepts different positions', () => {
    const mockRef = { current: null };
    render(
      <Card3D
        card="QD"
        position={[2, 1, -1]}
        rotation={[0, 0, 0]}
        faceUp={true}
        ref={mockRef}
      />
    );
    // Component should render without errors
  });

  it('accepts different rotations', () => {
    const mockRef = { current: null };
    render(
      <Card3D
        card="JC"
        position={[0, 0, 0]}
        rotation={[Math.PI / 4, Math.PI / 2, 0]}
        faceUp={true}
        ref={mockRef}
      />
    );
    // Component should render without errors
  });

  it('handles various card types', () => {
    const mockRef = { current: null };
    const cards = ['AH', 'KS', '2D', '10C', 'JH'];
    
    cards.forEach(card => {
      render(
        <Card3D
          card={card}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          faceUp={true}
          ref={mockRef}
        />
      );
    });
    // All cards should render without errors
  });

  it('forwards ref correctly', () => {
    const mockRef = React.createRef();
    render(
      <Card3D
        card="AH"
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        faceUp={true}
        ref={mockRef}
      />
    );
    // Ref should be handled by forwardRef
  });
});