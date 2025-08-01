import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the main UI component', () => {
    render(<App />);
    const uiElement = screen.getByTestId('blackjack-simulator');
    expect(uiElement).toBeInTheDocument();
  });
});
