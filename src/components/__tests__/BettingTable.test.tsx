import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BettingTable from '../BettingTable';

const mockSetBettingTable = jest.fn();

const mockBettingTable = [
  { minCount: -10, maxCount: -0.1, betAmount: 5 },
  { minCount: 0, maxCount: 0.9, betAmount: 10 },
  { minCount: 1, maxCount: 1.9, betAmount: 25 },
];

describe('BettingTable', () => {
  beforeEach(() => {
    mockSetBettingTable.mockClear();
  });

  it('renders with correct column headers', () => {
    render(
      <BettingTable
        bettingTable={mockBettingTable}
        setBettingTable={mockSetBettingTable}
        isRunning={false}
      />,
    );
    expect(screen.getByText('True Count Range')).toBeInTheDocument();
    expect(screen.getByText('Wager ($)')).toBeInTheDocument();
    expect(screen.getByText('Delete?')).toBeInTheDocument();
  });

  it('renders Add True Count Range button with correct text', () => {
    render(
      <BettingTable
        bettingTable={mockBettingTable}
        setBettingTable={mockSetBettingTable}
        isRunning={false}
      />,
    );
    const addButton = screen.getByRole('button', {
      name: 'Add True Count Range',
    });
    expect(addButton).toBeInTheDocument();
  });

  it('renders delete buttons as red X', () => {
    render(
      <BettingTable
        bettingTable={mockBettingTable}
        setBettingTable={mockSetBettingTable}
        isRunning={false}
      />,
    );
    const deleteButtons = screen.getAllByRole('button', { name: 'X' });
    expect(deleteButtons).toHaveLength(mockBettingTable.length);

    // Check that delete buttons have red color class (using partial match)
    deleteButtons.forEach((button) => {
      expect(button.className).toContain('!text-red-500');
    });
  });

  it('calls setBettingTable when adding a new row', () => {
    render(
      <BettingTable
        bettingTable={mockBettingTable}
        setBettingTable={mockSetBettingTable}
        isRunning={false}
      />,
    );
    const addButton = screen.getByRole('button', {
      name: 'Add True Count Range',
    });
    fireEvent.click(addButton);

    expect(mockSetBettingTable).toHaveBeenCalledWith([
      ...mockBettingTable,
      { minCount: 2, maxCount: 2.9, betAmount: 25 },
    ]);
  });

  it('calls setBettingTable when removing a row', () => {
    render(
      <BettingTable
        bettingTable={mockBettingTable}
        setBettingTable={mockSetBettingTable}
        isRunning={false}
      />,
    );
    const deleteButtons = screen.getAllByRole('button', { name: 'X' });
    fireEvent.click(deleteButtons[1]); // Remove second row

    expect(mockSetBettingTable).toHaveBeenCalledWith([
      mockBettingTable[0],
      mockBettingTable[2],
    ]);
  });

  it('does not allow removing the last row', () => {
    // Render with only one row
    render(
      <BettingTable
        bettingTable={[mockBettingTable[0]]}
        setBettingTable={mockSetBettingTable}
        isRunning={false}
      />,
    );

    const deleteButton = screen.getAllByRole('button', { name: 'X' }).pop();
    expect(deleteButton).toBeDisabled();
  });

  it('disables buttons when simulation is running', () => {
    render(
      <BettingTable
        bettingTable={mockBettingTable}
        setBettingTable={mockSetBettingTable}
        isRunning={true}
      />,
    );

    const addButton = screen.getByRole('button', {
      name: 'Add True Count Range',
    });
    expect(addButton).toBeDisabled();

    const deleteButtons = screen.getAllByRole('button', { name: 'X' });
    // First button should always be disabled when only one row
    // Additional buttons should be disabled when running
    deleteButtons.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('updates betting row values when inputs change', () => {
    render(
      <BettingTable
        bettingTable={mockBettingTable}
        setBettingTable={mockSetBettingTable}
        isRunning={false}
      />,
    );
    const minCountInput = screen.getByDisplayValue('-10');
    fireEvent.change(minCountInput, { target: { value: '-5' } });

    expect(mockSetBettingTable).toHaveBeenCalledWith([
      { ...mockBettingTable[0], minCount: -5 },
      mockBettingTable[1],
      mockBettingTable[2],
    ]);
  });
});
