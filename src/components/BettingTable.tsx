import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, Button, Input } from './UI';

export interface BetRow {
  minCount: number;
  maxCount: number;
  betAmount: number;
}

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
  const updateBettingRow = (
    index: number,
    field: keyof BetRow,
    value: string,
  ) => {
    const newTable = [...bettingTable];
    newTable[index] = { ...newTable[index], [field]: parseFloat(value) };
    setBettingTable(newTable);
  };

  const addBettingRow = () => {
    const lastRow = bettingTable[bettingTable.length - 1];
    const newRow: BetRow = {
      minCount: lastRow.maxCount + 0.1,
      maxCount: lastRow.maxCount + 1,
      betAmount: lastRow.betAmount,
    };
    setBettingTable([...bettingTable, newRow]);
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
            Define your bet amounts for different true count ranges. The
            simulator will use these values instead of simple multiplication.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm table-fixed">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-2 whitespace-nowrap w-40">
                    True Count Range
                  </th>
                  <th className="text-left py-2 px-2 whitespace-nowrap w-24">
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
                      <div className="flex items-center space-x-2">
                        <Input
                          id={`minCount-${index}`}
                          type="number"
                          value={row.minCount}
                          onChange={(e) =>
                            updateBettingRow(index, 'minCount', e.target.value)
                          }
                          className="w-14 px-2 py-1 border rounded text-xs"
                          step="0.1"
                          disabled={isRunning}
                        />
                        <span className="text-gray-500">to</span>
                        <Input
                          id={`maxCount-${index}`}
                          type="number"
                          value={row.maxCount}
                          onChange={(e) =>
                            updateBettingRow(index, 'maxCount', e.target.value)
                          }
                          className="w-14 px-2 py-1 border rounded text-xs"
                          step="0.1"
                          disabled={isRunning}
                        />
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <Input
                        id={`betAmount-${index}`}
                        type="number"
                        value={row.betAmount}
                        onChange={(e) =>
                          updateBettingRow(index, 'betAmount', e.target.value)
                        }
                        className="w-16 px-2 py-1 border rounded text-xs"
                        min="1"
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
