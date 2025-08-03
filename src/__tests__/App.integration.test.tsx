import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

// Mock the 3D components to avoid WebGL issues in tests
jest.mock('../pages/Game3DDemo', () => ({
  Game3DDemo: function MockGame3DDemo() {
    return <div data-testid="game-3d-demo-mock">3D Demo Content</div>;
  },
}));

jest.mock('../components/BlackjackSimulator', () => {
  return function MockBlackjackSimulator() {
    return <div data-testid="blackjack-simulator-mock">Simulator Content</div>;
  };
});

describe('App Integration Tests', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('blackjack-simulator')).toBeInTheDocument();
  });

  it('renders navigation header', () => {
    render(<App />);
    expect(screen.getByText('Blackjack Strategy Simulator')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<App />);
    expect(screen.getByText('Simulator')).toBeInTheDocument();
    expect(screen.getByText('3D Demo')).toBeInTheDocument();
  });

  it('starts with simulator view by default', () => {
    render(<App />);
    expect(screen.getByTestId('blackjack-simulator-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('game-3d-demo-mock')).not.toBeInTheDocument();
  });

  it('switches to 3D demo when button is clicked', () => {
    render(<App />);
    
    const threeDButton = screen.getByText('3D Demo');
    fireEvent.click(threeDButton);
    
    expect(screen.getByTestId('game-3d-demo-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('blackjack-simulator-mock')).not.toBeInTheDocument();
  });

  it('switches back to simulator when button is clicked', () => {
    render(<App />);
    
    // Switch to 3D Demo first
    const threeDButton = screen.getByText('3D Demo');
    fireEvent.click(threeDButton);
    expect(screen.getByTestId('game-3d-demo-mock')).toBeInTheDocument();
    
    // Switch back to Simulator
    const simulatorButton = screen.getByText('Simulator');
    fireEvent.click(simulatorButton);
    
    expect(screen.getByTestId('blackjack-simulator-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('game-3d-demo-mock')).not.toBeInTheDocument();
  });

  it('highlights active navigation button correctly', () => {
    render(<App />);
    
    const simulatorButton = screen.getByText('Simulator');
    const threeDButton = screen.getByText('3D Demo');
    
    // Initially simulator should be active
    expect(simulatorButton).toHaveClass('bg-blue-600', 'text-white');
    expect(threeDButton).toHaveClass('bg-gray-200', 'text-gray-700');
    
    // Click 3D Demo button
    fireEvent.click(threeDButton);
    
    // Now 3D Demo should be active
    expect(threeDButton).toHaveClass('bg-blue-600', 'text-white');
    expect(simulatorButton).toHaveClass('bg-gray-200', 'text-gray-700');
  });

  it('maintains proper layout structure', () => {
    render(<App />);
    
    // Check main container
    const mainContainer = screen.getByTestId('blackjack-simulator');
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gray-50');
    
    // Check navigation structure
    const navigation = screen.getByText('Blackjack Strategy Simulator').closest('div');
    expect(navigation).toHaveClass('bg-white', 'shadow-sm', 'border-b');
  });

  it('handles rapid navigation switching', () => {
    render(<App />);
    
    const simulatorButton = screen.getByText('Simulator');
    const threeDButton = screen.getByText('3D Demo');
    
    // Rapidly switch between views
    fireEvent.click(threeDButton);
    fireEvent.click(simulatorButton);
    fireEvent.click(threeDButton);
    fireEvent.click(simulatorButton);
    
    // Should end up on simulator view
    expect(screen.getByTestId('blackjack-simulator-mock')).toBeInTheDocument();
    expect(screen.queryByTestId('game-3d-demo-mock')).not.toBeInTheDocument();
  });

  it('maintains testid for backward compatibility', () => {
    render(<App />);
    expect(screen.getByTestId('blackjack-simulator')).toBeInTheDocument();
  });
});