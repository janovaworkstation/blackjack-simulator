import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfigurationPanel from '../ConfigurationPanel';

const mockSetConfig = jest.fn();

const mockConfig = {
  numberOfSimulations: 100000,
  numberOfDecks: 6,
  deckPenetration: 75,
  playerBet: 10,
  dealerHitsOnSoft17: true,
  playerCanDouble: true,
  playerCanSplit: true,
  playerCanSurrender: false,
  maxBet: 100,
  handsPerHour: 80,
  countingSystem: 'HI_LO',
  resplitAces: false,
  enableHandTracking: false,
};

const mockCountingSystems = [
  { value: 'HI_LO', label: 'Hi-Lo' },
  { value: 'KO', label: 'Knock-Out (KO)' },
];

describe('ConfigurationPanel', () => {
  beforeEach(() => {
    render(
      <ConfigurationPanel
        config={mockConfig}
        setConfig={mockSetConfig}
        countingSystems={mockCountingSystems}
        isRunning={false}
      />,
    );
  });

  it('renders all configuration inputs', () => {
    expect(screen.getByLabelText('Number of Hands')).toBeInTheDocument();
    expect(screen.getByLabelText('Counting System')).toBeInTheDocument();
    expect(screen.getByLabelText('Number of Decks')).toBeInTheDocument();
    expect(screen.getByLabelText('Penetration (%)')).toBeInTheDocument();
    expect(screen.getByLabelText('Maximum Bet Limit ($)')).toBeInTheDocument();
    expect(screen.getByLabelText('Hands per Hour')).toBeInTheDocument();
    expect(screen.getByLabelText('Dealer Hits Soft 17')).toBeInTheDocument();
    expect(screen.getByLabelText('Player Can Double')).toBeInTheDocument();
    expect(screen.getByLabelText('Player Can Split')).toBeInTheDocument();
    expect(screen.getByLabelText('Surrender Allowed')).toBeInTheDocument();
    expect(screen.getByLabelText('Re-split Aces')).toBeInTheDocument();
    expect(
      screen.getByLabelText(
        'Enable Hand-by-Hand Tracking (Required for Strategy Validation)',
      ),
    ).toBeInTheDocument();
  });

  it('calls setConfig with the correct value when an input is changed', () => {
    const numberOfHandsInput = screen.getByLabelText('Number of Hands');
    fireEvent.change(numberOfHandsInput, { target: { value: '200000' } });
    expect(mockSetConfig).toHaveBeenCalledWith(expect.any(Function));
  });

  it('calls setConfig with the correct value when a checkbox is toggled', () => {
    const dealerHitsSoft17Checkbox = screen.getByLabelText(
      'Dealer Hits Soft 17',
    );
    fireEvent.click(dealerHitsSoft17Checkbox);
    expect(mockSetConfig).toHaveBeenCalledWith(expect.any(Function));
  });
});
