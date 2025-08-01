import { Card, CardHeader, CardContent, CardTitle } from './UI';

const BettingTable = ({ bettingTable, setBettingTable, isRunning }) => {
  const updateBettingRow = (index, field, value) => {
    const newTable = [...bettingTable];
    newTable[index] = { ...newTable[index], [field]: parseFloat(value) };
    setBettingTable(newTable);
  };

  const addBettingRow = () => {
    const lastRow = bettingTable[bettingTable.length - 1];
    const newRow = {
      minCount: lastRow.maxCount + 0.1,
      maxCount: lastRow.maxCount + 1,
      betAmount: lastRow.betAmount,
    };
    setBettingTable([...bettingTable, newRow]);
  };

  const removeBettingRow = (index) => {
    if (bettingTable.length > 1) {
      const newTable = bettingTable.filter((_, i) => i !== index);
      setBettingTable(newTable);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Betting Strategy</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Define your bet amounts for different true count ranges. The
            simulator will use these values instead of simple multiplication.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">True Count Range</th>
                  <th className="text-left py-2">Bet Amount ($)</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bettingTable.map((row, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={row.minCount}
                          onChange={(e) =>
                            updateBettingRow(index, 'minCount', e.target.value)
                          }
                          className="w-16 px-2 py-1 border rounded text-xs"
                          step="0.1"
                          disabled={isRunning}
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="number"
                          value={row.maxCount}
                          onChange={(e) =>
                            updateBettingRow(index, 'maxCount', e.target.value)
                          }
                          className="w-16 px-2 py-1 border rounded text-xs"
                          step="0.1"
                          disabled={isRunning}
                        />
                      </div>
                    </td>
                    <td className="py-2">
                      <input
                        type="number"
                        value={row.betAmount}
                        onChange={(e) =>
                          updateBettingRow(index, 'betAmount', e.target.value)
                        }
                        className="w-20 px-2 py-1 border rounded text-xs"
                        min="1"
                        disabled={isRunning}
                      />
                    </td>
                    <td className="py-2">
                      <button
                        onClick={() => removeBettingRow(index)}
                        disabled={isRunning || bettingTable.length <= 1}
                        className="text-red-600 hover:text-red-800 disabled:text-gray-400 text-xs"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={addBettingRow}
            disabled={isRunning}
            className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:bg-blue-300"
          >
            Add Row
          </button>

          <div className="mt-4 p-3 bg-gray-50 rounded text-xs">
            <h4 className="font-semibold mb-2">Tips:</h4>
            <ul className="space-y-1 text-gray-600">
              <li>• Negative counts indicate dealer advantage (bet smaller)</li>
              <li>• Positive counts indicate player advantage (bet larger)</li>
              <li>• Ensure ranges don&apos;t overlap for consistent betting</li>
              <li>• Professional spreads typically range from 1:4 to 1:12</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BettingTable;
