import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  Button,
  Input,
  Select,
  Alert,
} from '../components/UI';

const meta: Meta = {
  title: 'Components/UI',
};

export default meta;

export const CardStory: StoryObj<typeof Card> = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>This is the card content.</p>
      </CardContent>
    </Card>
  ),
  name: 'Card',
};

export const ButtonStory: StoryObj<typeof Button> = {
  render: () => (
    <div className="space-x-4">
      <Button>Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </div>
  ),
  name: 'Button',
};

export const InputStory: StoryObj<typeof Input> = {
  render: () => (
    <div className="space-y-4">
      <Input id="input1" label="Input with label" />
      <Input id="input2" placeholder="Input without label" />
    </div>
  ),
  name: 'Input',
};

export const SelectStory: StoryObj<typeof Select> = {
  render: () => (
    <Select
      id="select1"
      label="Select with label"
      options={[
        { value: '1', label: 'Option 1' },
        { value: '2', label: 'Option 2' },
        { value: '3', label: 'Option 3' },
      ]}
    />
  ),
  name: 'Select',
};

export const AlertStory: StoryObj<typeof Alert> = {
  render: () => <Alert title="Alert Title">This is the alert message.</Alert>,
  name: 'Alert',
};
