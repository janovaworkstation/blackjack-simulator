import React from 'react';
import { SimulationConfig } from '../types/blackjack';
import { Card, CardHeader, CardContent, CardTitle, Input, Select } from './UI';

// Extends SimulationConfig to include UI-specific fields
export interface PanelConfig extends SimulationConfig {
  maxBet: number;
  handsPerHour: number;
  countingSystem: string;
  resplitAces: boolean;
  enableHandTracking: boolean;
}

export interface ConfigurationPanelProps<T extends PanelConfig = PanelConfig> {
  config: T;
  setConfig: React.Dispatch<React.SetStateAction<T>>;
  countingSystems: { value: string; label: string }[];
  isRunning: boolean;
}

/**
 * A component for configuring the simulation settings.
 * @param {ConfigurationPanelProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const ConfigurationPanel = <T extends PanelConfig = PanelConfig>({
  config,
  setConfig,
  countingSystems,
  isRunning,
}: ConfigurationPanelProps<T>) => {
  const updateConfig = (
    key: keyof PanelConfig,
    value: string | number | boolean,
  ) => {
    setConfig((prev: T) => ({ ...prev, [key]: value }) as T);
  };

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="border-b border-gray-200 px-6 py-4">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Simulation Configuration
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Number of Hands"
            type="number"
            id="numberOfSimulations"
            value={config.numberOfSimulations}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig('numberOfSimulations', parseInt(e.target.value, 10))
            }
            min="1000"
            max="10000000"
            step="1000"
            disabled={isRunning}
            className="w-full"
          />

          <Select
            label="Counting System"
            id="countingSystem"
            value={config.countingSystem}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              updateConfig('countingSystem', e.target.value)
            }
            options={countingSystems}
            disabled={isRunning}
            className="w-full"
          />

          <Input
            label="Number of Decks"
            type="number"
            id="numberOfDecks"
            value={config.numberOfDecks}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig('numberOfDecks', parseInt(e.target.value, 10))
            }
            min="1"
            max="8"
            disabled={isRunning}
            className="w-full"
          />

          <Input
            label="Penetration (%)"
            type="number"
            id="deckPenetration"
            value={config.deckPenetration}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig('deckPenetration', parseFloat(e.target.value))
            }
            min="50"
            max="95"
            step="5"
            disabled={isRunning}
            className="w-full"
          />

          <Input
            label="Maximum Bet Limit ($)"
            type="number"
            id="maxBet"
            value={config.maxBet}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig('maxBet', parseInt(e.target.value, 10))
            }
            min="25"
            max="10000"
            disabled={isRunning}
            className="w-full"
          />

          <Input
            label="Hands per Hour"
            type="number"
            id="handsPerHour"
            value={config.handsPerHour}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateConfig('handsPerHour', parseInt(e.target.value, 10))
            }
            min="30"
            max="150"
            step="5"
            disabled={isRunning}
            className="w-full"
          />
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-900 mb-3">Game Rules</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="dealerHitsSoft17"
                checked={config.dealerHitsOnSoft17}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig('dealerHitsOnSoft17', e.target.checked)
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
                checked={config.playerCanDouble}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig('playerCanDouble', e.target.checked)
                }
                disabled={isRunning}
                className="mr-2"
              />
              <label
                htmlFor="doubleAfterSplit"
                className="text-sm text-gray-700"
              >
                Player Can Double
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="playerCanSplit"
                checked={config.playerCanSplit}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig('playerCanSplit', e.target.checked)
                }
                disabled={isRunning}
                className="mr-2"
              />
              <label htmlFor="playerCanSplit" className="text-sm text-gray-700">
                Player Can Split
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="surrenderAllowed"
                checked={config.playerCanSurrender}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig('playerCanSurrender', e.target.checked)
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig('resplitAces', e.target.checked)
                }
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
