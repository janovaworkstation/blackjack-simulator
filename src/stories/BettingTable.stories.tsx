import type { Meta, StoryObj } from '@storybook/react-vite';
import BettingTable from '../components/BettingTable';
import { useState } from 'react';

const meta: Meta<typeof BettingTable> = {
  title: 'Components/BettingTable',
  component: BettingTable,
};

export default meta;
type Story = StoryObj<typeof meta>;

const BettingTableWithState = () => {
  const [bettingTable, setBettingTable] = useState([
    { minCount: -10, maxCount: -0.1, betAmount: 5 },
    { minCount: 0, maxCount: 0.9, betAmount: 10 },
    { minCount: 1, maxCount: 1.9, betAmount: 25 },
    { minCount: 2, maxCount: 2.9, betAmount: 50 },
    { minCount: 3, maxCount: 3.9, betAmount: 75 },
    { minCount: 4, maxCount: 10, betAmount: 100 },
  ]);

  return (
    <BettingTable
      bettingTable={bettingTable}
      setBettingTable={setBettingTable}
      isRunning={false}
    />
  );
};

export const Default: Story = {
  render: () => <BettingTableWithState />,
};
