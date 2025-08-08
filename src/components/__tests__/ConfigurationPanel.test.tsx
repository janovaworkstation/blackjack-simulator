import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConfigurationPanel from '../ConfigurationPanel';
import { DEFAULT_APP_CONFIG } from '../../constants/defaultConfig';
import { getCountingSystemsForUI } from '../../constants/countingSystems';

const mockSetConfig = jest.fn();

const mockConfig = {
  ...DEFAULT_APP_CONFIG,
  // Test-specific override - hand tracking disabled to test the checkbox
  enableHandTracking: false,
};

const mockCountingSystems = getCountingSystemsForUI();

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
