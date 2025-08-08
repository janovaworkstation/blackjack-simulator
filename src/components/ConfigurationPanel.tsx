import React from 'react';
import { AppConfig } from '../types/blackjack';
import { Card, CardHeader, CardContent, CardTitle, Input, Select } from './UI';

export interface ConfigurationPanelProps {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  countingSystems: { value: string; label: string }[];
  isRunning: boolean;
}

/**
 * A component for configuring the simulation settings.
 * @param {ConfigurationPanelProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  config,
  setConfig,
  countingSystems,
  isRunning,
}) => {
  const updateConfig = (
    key: keyof AppConfig,
    value: string | number | boolean,
  ) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
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
          <Select
            label="Number of Hands"
            id="numberOfSimulations"
            value={config.numberOfSimulations.toString()}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              updateConfig('numberOfSimulations', parseInt(e.target.value, 10))
            }
            options={[
              { value: '10000', label: '10,000' },
              { value: '50000', label: '50,000' },
              { value: '100000', label: '100,000' },
              { value: '250000', label: '250,000' },
              { value: '500000', label: '500,000' },
              { value: '1000000', label: '1,000,000' },
              { value: '2000000', label: '2,000,000' }
            ]}
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

          <Select
            label="Number of Decks"
            id="numberOfDecks"
            value={config.numberOfDecks.toString()}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              updateConfig('numberOfDecks', parseInt(e.target.value, 10))
            }
            options={[
              { value: '1', label: '1 Deck' },
              { value: '2', label: '2 Decks' },
              { value: '4', label: '4 Decks' },
              { value: '6', label: '6 Decks' },
              { value: '8', label: '8 Decks' }
            ]}
            disabled={isRunning}
            className="w-full"
          />

          <Select
            label="Penetration (%)"
            id="deckPenetration"
            value={config.deckPenetration.toString()}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              updateConfig('deckPenetration', parseFloat(e.target.value))
            }
            options={[
              { value: '50', label: '50%' },
              { value: '60', label: '60%' },
              { value: '70', label: '70%' },
              { value: '75', label: '75%' },
              { value: '80', label: '80%' },
              { value: '85', label: '85%' },
              { value: '90', label: '90%' }
            ]}
            disabled={isRunning}
            className="w-full"
          />

          <Select
            label="Maximum Bet Limit ($)"
            id="maxBet"
            value={config.maxBet.toString()}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              updateConfig('maxBet', parseInt(e.target.value, 10))
            }
            options={[
              { value: '25', label: '$25' },
              { value: '50', label: '$50' },
              { value: '100', label: '$100' },
              { value: '200', label: '$200' },
              { value: '500', label: '$500' },
              { value: '1000', label: '$1,000' },
              { value: '2500', label: '$2,500' },
              { value: '5000', label: '$5,000' }
            ]}
            disabled={isRunning}
            className="w-full"
          />

          <Select
            label="Hands per Hour"
            id="handsPerHour"
            value={config.handsPerHour.toString()}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              updateConfig('handsPerHour', parseInt(e.target.value, 10))
            }
            options={[
              { value: '50', label: '50 (Crowded)' },
              { value: '70', label: '70 (Normal)' },
              { value: '80', label: '80 (Average)' },
              { value: '100', label: '100 (Fast)' },
              { value: '120', label: '120 (Head-to-head)' }
            ]}
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
                id="playerCanDouble"
                checked={config.playerCanDouble}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig('playerCanDouble', e.target.checked)
                }
                disabled={isRunning}
                className="mr-2"
              />
              <label
                htmlFor="playerCanDouble"
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

            <div className="flex items-center">
              <input
                type="checkbox"
                id="doubleAfterSplit"
                checked={config.doubleAfterSplit}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig('doubleAfterSplit', e.target.checked)
                }
                disabled={isRunning}
                className="mr-2"
              />
              <label htmlFor="doubleAfterSplit" className="text-sm text-gray-700">
                Double After Split (DAS)
              </label>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-900 mb-3">
            Advanced Analysis
          </h4>
          <div className={`p-3 rounded-lg border-2 ${config.enableHandTracking ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'}`}>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="enableHandTracking"
                checked={config.enableHandTracking}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateConfig('enableHandTracking', e.target.checked)
                }
                disabled={isRunning}
                className="mr-3 w-4 h-4"
              />
              <label
                htmlFor="enableHandTracking"
                className={`text-sm font-medium ${config.enableHandTracking ? 'text-green-800' : 'text-blue-800'}`}
              >
                Enable Hand-by-Hand Tracking (Required for Strategy Validation)
              </label>
            </div>
            <p className={`text-xs mt-2 ml-7 ${config.enableHandTracking ? 'text-green-700' : 'text-blue-700'}`}>
              {config.enableHandTracking 
                ? "✅ Detailed analysis enabled: Track individual hands, strategy validation, and export capabilities"
                : "ℹ️ Fast simulation mode: Enable for detailed hand analysis, strategy validation, and Hand-by-Hand table"
              }
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfigurationPanel;
