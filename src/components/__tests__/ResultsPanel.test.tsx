import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultsPanel from '../ResultsPanel';
import { SimulationResults } from '../../types/blackjack';

const mockResults: SimulationResults = {
  handsPlayed: 1000,
  totalOutcomes: 1000,
  wins: 480,
  losses: 500,
  pushes: 20,
  blackjacks: 45,
  playerBusts: 180,
  dealerBusts: 150,
  surrenders: 0,
  winPercentage: 48.0,
  lossPercentage: 50.0,
  pushPercentage: 2.0,
  totalWagered: 25000,
  totalWon: 24500,
  netResult: -500,
  expectedValue: -0.5,
  averageBetSize: 25,
  maxDrawdown: 1200,
  handsPerHour: 100,
  countingSystem: 'Hi-Lo',
  sessionResults: [
    { session: 1, bankroll: -100, hands: 100 },
    { session: 2, bankroll: -300, hands: 200 },
  ],
  handDetails: [],
  busts: 180,
  doubles: 120,
  splits: 45,
  hands15: 80,
  hands16: 95,
};

const mockProgress = {
  current: 750,
  total: 1000,
};

describe('ResultsPanel', () => {
  it('displays loading state when simulation is running without progress', () => {
    render(<ResultsPanel results={null} isRunning={true} progress={null} />);

    expect(screen.getByText('Running Simulation...')).toBeInTheDocument();
    expect(screen.getByText('Initializing simulation...')).toBeInTheDocument();
    // Check for spinner element by class instead of role
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('displays progress when simulation is running with progress data', () => {
    render(
      <ResultsPanel results={null} isRunning={true} progress={mockProgress} />,
    );

    expect(screen.getByText('Running Simulation...')).toBeInTheDocument();
    expect(
      screen.getByText('Processing 750 of 1,000 hands...'),
    ).toBeInTheDocument();

    // Check progress bar by class
    const progressBar = document.querySelector('.bg-blue-600');
    expect(progressBar).toBeInTheDocument();
  });

  it('displays empty state when no results and not running', () => {
    render(<ResultsPanel results={null} isRunning={false} progress={null} />);

    expect(screen.getByText('Simulation Results')).toBeInTheDocument();
    expect(
      screen.getByText(
        /Configure your simulation parameters and click "Run Simulation" to begin/,
      ),
    ).toBeInTheDocument();
  });

  it('displays complete results when simulation is finished', () => {
    render(
      <ResultsPanel results={mockResults} isRunning={false} progress={null} />,
    );

    expect(screen.getByText('Simulation Results')).toBeInTheDocument();

    // Check summary statistics
    expect(screen.getByText('Hands Played')).toBeInTheDocument();
    expect(screen.getByText('1,000')).toBeInTheDocument();

    expect(screen.getByText('Win Rate')).toBeInTheDocument();
    expect(screen.getByText('48.00%')).toBeInTheDocument();

    expect(screen.getByText('EV')).toBeInTheDocument();
    expect(screen.getByText('-0.5000%')).toBeInTheDocument();

    expect(screen.getByText('Net Result')).toBeInTheDocument();
    expect(screen.getByText('$-500.00')).toBeInTheDocument();
  });

  it('applies correct colors for positive and negative values', () => {
    const positiveResults = {
      ...mockResults,
      netResult: 1500,
      expectedValue: 1.5,
    };

    render(
      <ResultsPanel
        results={positiveResults}
        isRunning={false}
        progress={null}
      />,
    );

    // Positive net result should be green
    const netResultValue = screen.getByText('$1,500.00');
    expect(netResultValue).toHaveClass('text-green-600');

    // Positive EV should be green
    const evValue = screen.getByText('1.5000%');
    expect(evValue).toHaveClass('text-green-600');
  });

  it('displays detailed statistics correctly', () => {
    render(
      <ResultsPanel results={mockResults} isRunning={false} progress={null} />,
    );

    expect(screen.getByText('Detailed Statistics')).toBeInTheDocument();

    // Check detailed stats
    expect(screen.getByText('Total Wagered:')).toBeInTheDocument();
    expect(screen.getByText('$25,000')).toBeInTheDocument();

    expect(screen.getByText('Total Won:')).toBeInTheDocument();
    expect(screen.getByText('$24,500')).toBeInTheDocument();

    expect(screen.getByText('Avg. Bet Size:')).toBeInTheDocument();
    expect(screen.getByText('$25.00')).toBeInTheDocument();

    expect(screen.getByText('Max Drawdown:')).toBeInTheDocument();
    expect(screen.getByText('$1,200')).toBeInTheDocument();

    expect(screen.getByText('Hands per Hour:')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();

    expect(screen.getByText('Counting System:')).toBeInTheDocument();
    expect(screen.getByText('Hi-Lo')).toBeInTheDocument();
  });

  it('displays hand outcomes section correctly', () => {
    render(
      <ResultsPanel results={mockResults} isRunning={false} progress={null} />,
    );

    expect(screen.getByText('Hand Outcomes')).toBeInTheDocument();

    // Check wins
    expect(screen.getByText('Wins:')).toBeInTheDocument();
    expect(screen.getByText('480 (48.00%)')).toBeInTheDocument();

    // Check losses
    expect(screen.getByText('Losses:')).toBeInTheDocument();
    expect(screen.getByText('500 (50.00%)')).toBeInTheDocument();

    // Check pushes
    expect(screen.getByText('Pushes:')).toBeInTheDocument();
    expect(screen.getByText('20 (2.00%)')).toBeInTheDocument();

    // Check blackjacks - be more specific about which "45" we want
    expect(screen.getByText('Blackjacks:')).toBeInTheDocument();
    const blackjacksContainer = screen.getByText('Blackjacks:').closest('div');
    expect(blackjacksContainer).toHaveTextContent('45');
  });

  it('displays player actions section correctly', () => {
    render(
      <ResultsPanel results={mockResults} isRunning={false} progress={null} />,
    );

    expect(screen.getByText('Player Actions')).toBeInTheDocument();

    expect(screen.getByText('Doubles:')).toBeInTheDocument();
    expect(screen.getByText('120')).toBeInTheDocument();

    expect(screen.getByText('Splits:')).toBeInTheDocument();
    const splitsContainer = screen.getByText('Splits:').closest('div');
    expect(splitsContainer).toHaveTextContent('45');
  });

  it('displays bust information in hand outcomes section', () => {
    render(
      <ResultsPanel results={mockResults} isRunning={false} progress={null} />,
    );

    expect(screen.getByText('Player Busts:')).toBeInTheDocument();
    const playerBustsContainer = screen.getByText('Player Busts:').closest('div');
    expect(playerBustsContainer).toHaveTextContent('180');

    expect(screen.getByText('Dealer Busts:')).toBeInTheDocument();
    const dealerBustsContainer = screen.getByText('Dealer Busts:').closest('div');
    expect(dealerBustsContainer).toHaveTextContent('150');
  });

  it('handles undefined or invalid numbers gracefully', () => {
    const invalidResults = {
      ...mockResults,
      handsPlayed: undefined as unknown as number,
      winPercentage: NaN,
      expectedValue: Infinity,
      netResult: null as unknown as number,
    };

    render(
      <ResultsPanel
        results={invalidResults}
        isRunning={false}
        progress={null}
      />,
    );

    // Should default to 0 for invalid numbers - check in specific containers
    const handsPlayedContainer = screen.getByText('Hands Played').parentElement;
    expect(handsPlayedContainer).toHaveTextContent('0');
    
    const winRateContainer = screen.getByText('Win Rate').parentElement;
    expect(winRateContainer).toHaveTextContent('0.00%');
    
    const evContainer = screen.getByText('EV').parentElement;
    expect(evContainer).toHaveTextContent('0.0000%');
    
    const netResultContainer = screen.getByText('Net Result').parentElement;
    expect(netResultContainer).toHaveTextContent('$0.00');
  });

  it('uses default counting system when missing', () => {
    const noCountingSystemResults = {
      ...mockResults,
      countingSystem: undefined as unknown as string,
    };

    render(
      <ResultsPanel
        results={noCountingSystemResults}
        isRunning={false}
        progress={null}
      />,
    );

    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });

  it('uses default hands per hour when missing', () => {
    const noHandsPerHourResults = {
      ...mockResults,
      handsPerHour: undefined as unknown as number,
    };

    render(
      <ResultsPanel
        results={noHandsPerHourResults}
        isRunning={false}
        progress={null}
      />,
    );

    expect(screen.getByText('80')).toBeInTheDocument(); // default value
  });

  it('formats large numbers with commas correctly', () => {
    const largeNumberResults = {
      ...mockResults,
      handsPlayed: 1000000,
      totalWagered: 25000000,
      wins: 480000,
    };

    render(
      <ResultsPanel
        results={largeNumberResults}
        isRunning={false}
        progress={null}
      />,
    );

    expect(screen.getByText('1,000,000')).toBeInTheDocument();
    expect(screen.getByText('$25,000,000')).toBeInTheDocument();
    expect(screen.getByText('480,000 (48.00%)')).toBeInTheDocument();
  });

  it('handles zero values correctly', () => {
    const zeroResults = {
      ...mockResults,
      wins: 0,
      losses: 0,
      pushes: 0,
      surrenders: 0,
      winPercentage: 0,
      lossPercentage: 0,
      pushPercentage: 0,
    };

    render(
      <ResultsPanel results={zeroResults} isRunning={false} progress={null} />,
    );

    // Check for zero percentages in win rate - look for the percentage value directly
    const winRateSection = screen.getByText('Win Rate').parentElement;
    expect(winRateSection).toHaveTextContent('0.00%');
    
    // Check for zero wins with percentage
    const winsSection = screen.getByText('Wins:').closest('div');
    expect(winsSection).toHaveTextContent('0 (0.00%)');
  });

  it('applies correct color classes for outcome types', () => {
    render(
      <ResultsPanel results={mockResults} isRunning={false} progress={null} />,
    );

    // Wins should be green
    const winsText = screen.getByText('480 (48.00%)');
    expect(winsText).toHaveClass('text-green-600');

    // Losses should be red
    const lossesText = screen.getByText('500 (50.00%)');
    expect(lossesText).toHaveClass('text-red-600');

    // Pushes should be gray
    const pushesText = screen.getByText('20 (2.00%)');
    expect(pushesText).toHaveClass('text-gray-600');

    // Blackjacks should be yellow
    const blackjacksLabel = screen.getByText('Blackjacks:');
    const blackjacksText = blackjacksLabel.parentElement?.querySelector('.text-yellow-600');
    expect(blackjacksText).toBeInTheDocument();
  });

  it('calculates total outcomes correctly when missing', () => {
    const missingTotalResults = {
      ...mockResults,
      totalOutcomes: undefined as unknown as number,
    };

    render(
      <ResultsPanel
        results={missingTotalResults}
        isRunning={false}
        progress={null}
      />,
    );

    // Should still display percentages - check in specific containers to avoid ambiguity
    const winRateContainer = screen.getByText('Win Rate').parentElement;
    expect(winRateContainer).toHaveTextContent('48.00%');
    
    const winsContainer = screen.getByText('Wins:').closest('div');
    expect(winsContainer).toHaveTextContent('48.00%');
    
    const lossesContainer = screen.getByText('Losses:').closest('div');
    expect(lossesContainer).toHaveTextContent('50.00%');
    
    const pushesContainer = screen.getByText('Pushes:').closest('div');
    expect(pushesContainer).toHaveTextContent('2.00%');
  });
});
