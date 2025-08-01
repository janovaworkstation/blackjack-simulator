import type { Meta, StoryObj } from '@storybook/react-vite';
import ResultsPanel from '../components/ResultsPanel';
import { SimulationResults } from '../types/blackjack';

const meta: Meta<typeof ResultsPanel> = {
  title: 'Components/ResultsPanel',
  component: ResultsPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockResults: SimulationResults = {
  handsPlayed: 10000,
  totalOutcomes: 10000,
  wins: 4800,
  losses: 4200,
  pushes: 1000,
  blackjacks: 250,
  playerBusts: 1600,
  dealerBusts: 1700,
  surrenders: 50,
  winPercentage: 48.0,
  lossPercentage: 42.0,
  pushPercentage: 10.0,
  totalWagered: 100000,
  totalWon: 102500,
  netResult: 2500,
  expectedValue: 0.025,
  averageBetSize: 10,
  maxDrawdown: -1500,
  handsPerHour: 100,
  countingSystem: 'Hi-Lo',
  sessionResults: [
    { session: 1, bankroll: 1100, hands: 1000 },
    { session: 2, bankroll: 1200, hands: 1000 },
    { session: 3, bankroll: 1150, hands: 1000 },
    { session: 4, bankroll: 1300, hands: 1000 },
    { session: 5, bankroll: 1250, hands: 1000 },
    { session: 6, bankroll: 1400, hands: 1000 },
    { session: 7, bankroll: 1350, hands: 1000 },
    { session: 8, bankroll: 1500, hands: 1000 },
    { session: 9, bankroll: 1450, hands: 1000 },
    { session: 10, bankroll: 1600, hands: 1000 },
  ],
  handDetails: [], // Add empty array to satisfy type
  busts: 3300, // playerBusts + dealerBusts
  doubles: 500, // Example value
  splits: 200, // Example value
  hands15: 100, // Example value
  hands16: 120, // Example value
};

export const Default: Story = {
  args: {
    results: mockResults,
    isRunning: false,
  },
};

export const SimulationRunning: Story = {
  args: {
    results: null,
    isRunning: true,
    progress: { current: 3500, total: 10000 },
  },
};

export const NoResults: Story = {
  args: {
    results: null,
    isRunning: false,
  },
};
