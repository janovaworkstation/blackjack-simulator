import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle, Button, Input } from './UI';
import { BetRow } from '../types/blackjack';

export interface BettingTableProps {
  bettingTable: BetRow[];
  setBettingTable: (table: BetRow[]) => void;
  isRunning: boolean;
}

/**
 * A component that allows the user to configure a custom betting table based on true count.
 * @param {BettingTableProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const BettingTable: React.FC<BettingTableProps> = ({
  bettingTable,
  setBettingTable,
  isRunning,
}) => {
  // Local state to track input values during editing
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

  // Initialize input values from bettingTable
  useEffect(() => {
    const newInputValues: { [key: string]: string } = {};
    bettingTable.forEach((row, index) => {
      newInputValues[`minCount-${index}`] = row.minCount.toString();
      newInputValues[`maxCount-${index}`] = row.maxCount.toString();
      newInputValues[`betAmount-${index}`] = row.betAmount.toString();
    });
    setInputValues(newInputValues);
  }, [bettingTable]);

  const sortBettingTable = (table: BetRow[]) => {
    return [...table].sort((a, b) => a.minCount - b.minCount);
  };

  const updateBettingRow = (
    index: number,
    field: keyof BetRow,
    value: string,
  ) => {
    // Update input value immediately for responsive typing
    const inputKey = `${field}-${index}`;
    setInputValues(prev => ({ ...prev, [inputKey]: value }));

    // Allow intermediate states for better UX when typing negative numbers
    if (value === '' || value === '-' || value === '.' || value === '-.') {
      return; // Don't update the actual data yet, keep the input state
    }

    // Only update actual data if value is a valid number
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      const newTable = [...bettingTable];
      newTable[index] = { ...newTable[index], [field]: numericValue };
      setBettingTable(newTable);
    }
  };

  const addBettingRow = () => {
    const lastRow = bettingTable[bettingTable.length - 1];
    const newRow: BetRow = {
      minCount: lastRow.maxCount,
      maxCount: lastRow.maxCount + 1,
      betAmount: lastRow.betAmount,
    };
    const newTable = [...bettingTable, newRow];
    setBettingTable(newTable);
  };

  const removeBettingRow = (index: number) => {
    if (bettingTable.length > 1) {
      const newTable = bettingTable.filter((_, i) => i !== index);
      setBettingTable(newTable);
    }
  };

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="border-b border-gray-200 px-6 py-4">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Betting Strategy
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Define your bet amounts for different true count ranges. Each range includes the minimum value but excludes the maximum value. For example: "0 to 1" covers 0.0 ≤ TC &lt; 1.0.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm table-fixed">
              <thead>
                <tr className="border-b">
                  <th className="text-center py-2 px-2 whitespace-nowrap w-20">
                    From (≥)
                  </th>
                  <th className="text-center py-2 px-2 whitespace-nowrap w-20">
                    To (&lt;)
                  </th>
                  <th className="text-center py-2 px-2 whitespace-nowrap w-24">
                    Wager ($)
                  </th>
                  <th className="text-left py-2 px-2 whitespace-nowrap w-20">
                    Delete?
                  </th>
                </tr>
              </thead>
              <tbody>
                {bettingTable.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-2">
                      <input
                        id={`minCount-${index}`}
                        type="number"
                        value={inputValues[`minCount-${index}`] ?? row.minCount ?? ''}
                        onChange={(e) =>
                          updateBettingRow(index, 'minCount', e.target.value)
                        }
                        className="w-16 px-1 py-1 text-xs text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        step="0.1"
                        disabled={isRunning}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        id={`maxCount-${index}`}
                        type="number"
                        value={inputValues[`maxCount-${index}`] ?? row.maxCount ?? ''}
                        onChange={(e) =>
                          updateBettingRow(index, 'maxCount', e.target.value)
                        }
                        className="w-16 px-1 py-1 text-xs text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        step="0.1"
                        disabled={isRunning}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <input
                        id={`betAmount-${index}`}
                        type="number"
                        value={inputValues[`betAmount-${index}`] ?? row.betAmount ?? ''}
                        onChange={(e) =>
                          updateBettingRow(index, 'betAmount', e.target.value)
                        }
                        className="w-16 px-1 py-1 text-xs text-center border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        min="0"
                        disabled={isRunning}
                      />
                    </td>
                    <td className="py-2 px-2">
                      <Button
                        onClick={() => removeBettingRow(index)}
                        disabled={isRunning || bettingTable.length <= 1}
                        variant="secondary"
                        className="text-xs px-1 py-0.5 !text-red-500 hover:!text-red-700 hover:font-bold transition-transform hover:scale-110"
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Button
            onClick={addBettingRow}
            disabled={isRunning}
            className="mt-4 w-full"
          >
            Add True Count Range
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BettingTable;
