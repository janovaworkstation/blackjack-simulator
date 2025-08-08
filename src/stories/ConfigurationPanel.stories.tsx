import type { Meta, StoryObj } from '@storybook/react-vite';
import ConfigurationPanel from '../components/ConfigurationPanel';
import { useState } from 'react';
import { getCountingSystemsForUI, DEFAULT_COUNTING_SYSTEM } from '../constants/countingSystems';

const meta: Meta<typeof ConfigurationPanel> = {
  title: 'Components/ConfigurationPanel',
  component: ConfigurationPanel,
};

export default meta;
type Story = StoryObj<typeof meta>;

const ConfigurationPanelWithState = () => {
  const [config, setConfig] = useState({
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
    countingSystem: DEFAULT_COUNTING_SYSTEM,
    resplitAces: false,
    enableHandTracking: false,
  });

  const countingSystems = getCountingSystemsForUI();

  return (
    <ConfigurationPanel
      config={config}
      setConfig={setConfig}
      countingSystems={countingSystems}
      isRunning={false}
    />
  );
};

export const Default: Story = {
  render: () => <ConfigurationPanelWithState />,
};
