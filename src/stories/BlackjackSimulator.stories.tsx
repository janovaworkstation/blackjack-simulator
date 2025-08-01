import type { Meta, StoryObj } from '@storybook/react-vite';
import BlackjackSimulator from '../components/BlackjackSimulator';

const meta: Meta<typeof BlackjackSimulator> = {
  title: 'Components/BlackjackSimulator',
  component: BlackjackSimulator,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
