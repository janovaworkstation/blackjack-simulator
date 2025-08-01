import { Card, CardHeader, CardContent, CardTitle, Input, Select } from './UI';

const ConfigurationPanel = ({
  config,
  setConfig,
  countingSystems,
  isRunning,
}) => {
  const updateConfig = (key, value) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulation Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Number of Hands"
            type="number"
            value={config.hands}
            onChange={(e) => updateConfig('hands', parseInt(e.target.value))}
            min="1000"
            max="10000000"
            step="1000"
            disabled={isRunning}
          />

          <Select
            label="Counting System"
            value={config.countingSystem}
            onChange={(e) => updateConfig('countingSystem', e.target.value)}
            options={countingSystems}
            disabled={isRunning}
          />

          <Input
            label="Number of Decks"
            type="number"
            value={config.decks}
            onChange={(e) => updateConfig('decks', parseInt(e.target.value))}
            min="1"
            max="8"
            disabled={isRunning}
          />

          <Input
            label="Penetration (%)"
            type="number"
            value={config.penetration * 100}
            onChange={(e) =>
              updateConfig('penetration', parseFloat(e.target.value) / 100)
            }
            min="50"
            max="95"
            step="5"
            disabled={isRunning}
          />

          <Input
            label="Maximum Bet Limit ($)"
            type="number"
            value={config.maxBet}
            onChange={(e) => updateConfig('maxBet', parseInt(e.target.value))}
            min="25"
            max="10000"
            disabled={isRunning}
          />

          <Input
            label="Hands per Hour"
            type="number"
            value={config.handsPerHour}
            onChange={(e) =>
              updateConfig('handsPerHour', parseInt(e.target.value))
            }
            min="30"
            max="150"
            step="5"
            disabled={isRunning}
          />
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-900 mb-3">Game Rules</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dealerHitsSoft17"
                checked={config.dealerHitsSoft17}
                onChange={(e) =>
                  updateConfig('dealerHitsSoft17', e.target.checked)
                }
                disabled={isRunning}
                className="mr-2"
              />
              <label
                htmlFor="dealerHitsSoft17"
                className="text-sm text-gray-700"
              >
                Dealer Hits Soft 17
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="doubleAfterSplit"
                checked={config.doubleAfterSplit}
                onChange={(e) =>
                  updateConfig('doubleAfterSplit', e.target.checked)
                }
                disabled={isRunning}
                className="mr-2"
              />
              <label
                htmlFor="doubleAfterSplit"
                className="text-sm text-gray-700"
              >
                Double After Split
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="surrenderAllowed"
                checked={config.surrenderAllowed}
                onChange={(e) =>
                  updateConfig('surrenderAllowed', e.target.checked)
                }
                disabled={isRunning}
                className="mr-2"
              />
              <label
                htmlFor="surrenderAllowed"
                className="text-sm text-gray-700"
              >
                Surrender Allowed
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="resplitAces"
                checked={config.resplitAces}
                onChange={(e) => updateConfig('resplitAces', e.target.checked)}
                disabled={isRunning}
                className="mr-2"
              />
              <label htmlFor="resplitAces" className="text-sm text-gray-700">
                Re-split Aces
              </label>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-900 mb-3">
            Debugging Options
          </h4>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="enableHandTracking"
              checked={config.enableHandTracking}
              onChange={(e) =>
                updateConfig('enableHandTracking', e.target.checked)
              }
              disabled={isRunning}
              className="mr-2"
            />
            <label
              htmlFor="enableHandTracking"
              className="text-sm text-gray-700"
            >
              Enable Hand-by-Hand Tracking (Limits to 1000 hands max)
            </label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Track detailed information for each hand including cards, counts,
            bets, and outcomes
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigurationPanel;
