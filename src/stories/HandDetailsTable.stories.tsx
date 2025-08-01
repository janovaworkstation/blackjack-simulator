import type { Meta, StoryObj } from '@storybook/react-vite';
import HandDetailsTable from '../components/HandDetailsTable';
import { HandDetails } from '../types/blackjack';

const meta: Meta<typeof HandDetailsTable> = {
  title: 'Components/HandDetailsTable',
  component: HandDetailsTable,
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockHandDetails: HandDetails[] = Array.from({ length: 150 }, (_, i) => ({
  handNumber: i + 1,
  runningCountStart: (i % 10) - 5,
  trueCountStart: ((i % 10) - 5) / 2,
  betAmount: 10,
  playerCardsInitial: ['AS', 'TC'],
  dealerCardsInitial: ['7D', 'QH'],
  playerBlackjack: i % 20 === 0,
  dealerBlackjack: i % 25 === 0,
  initialAction: 'Hit',
  totalBet: 20,
  playerCardsFinal: ['AS', 'TC', '5H'],
  dealerCardsFinal: ['7D', 'QH', 'KS'],
  winnings: i % 3 === 0 ? 20 : -20,
  shuffleOccurred: i > 0 && i % 50 === 0,
}));

export const Default: Story = {
  args: {
    handDetails: mockHandDetails,
  },
};

export const Empty: Story = {
  args: {
    handDetails: [],
  },
};
