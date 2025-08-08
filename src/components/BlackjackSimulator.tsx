import { useState } from 'react';
import { Button } from './UI';
import ConfigurationPanel, { PanelConfig } from './ConfigurationPanel';
import BettingTable from './BettingTable';
import StrategyValidation from './StrategyValidation';
import StrategyValidationPanel from './StrategyValidationPanel';
import SavedStrategies from './SavedStrategies';
import { BetRow, Strategy } from '../types/blackjack';
import ResultsPanel from './ResultsPanel';
import HandDetailsTable from './HandDetailsTable';
import { useSimulation } from '../hooks/useSimulation';
import { SimulationConfig } from '../types/blackjack';
import { getSimulationConfig } from '../utils/configUtils';

const BlackjackSimulator = () => {
  const { isRunning, results, progress, runSimulation } = useSimulation();

  const [config, setConfig] = useState<
    PanelConfig & { bettingTable: BetRow[] }
  >({
    numberOfSimulations: 100000,
    numberOfDecks: 6,
    deckPenetration: 75,
    playerBet: 10,
    dealerHitsOnSoft17: true,
    playerCanDouble: true,
    playerCanSplit: true,
    playerCanSurrender: false,
    // UI-specific or other config
    maxBet: 100,
    handsPerHour: 80,
    countingSystem: 'HI_LO',
    resplitAces: false,
    enableHandTracking: true,
    doubleAfterSplit: true,
    bettingTable: [
      { minCount: -10, maxCount: 0, betAmount: 5 },
      { minCount: 0, maxCount: 1, betAmount: 10 },
      { minCount: 1, maxCount: 2, betAmount: 25 },
      { minCount: 2, maxCount: 3, betAmount: 50 },
      { minCount: 3, maxCount: 4, betAmount: 75 },
      { minCount: 4, maxCount: 10, betAmount: 100 },
    ],
  });

  const countingSystems = [
    { value: 'HI_LO', label: 'Hi-Lo' },
    { value: 'KO', label: 'Knock-Out (KO)' },
    { value: 'HI_OPT_I', label: 'Hi-Opt I' },
  ];

  const handleRunSimulation = () => {
    console.log('Button clicked! Config:', config);
    const simulationConfig = getSimulationConfig(config);
    console.log('runSimulation function:', runSimulation);
    runSimulation(simulationConfig);
  };

  const setBettingTable = (newBettingTable: BetRow[]) => {
    setConfig((prev) => ({ ...prev, bettingTable: newBettingTable }));
  };

  const handleLoadStrategy = (strategy: Strategy) => {
    // Load strategy configuration into current config
    setConfig((prev) => ({
      ...prev,
      numberOfDecks: strategy.simulationConfig.numberOfDecks,
      deckPenetration: strategy.simulationConfig.deckPenetration,
      playerBet: strategy.simulationConfig.playerBet,
      dealerHitsOnSoft17: strategy.simulationConfig.dealerHitsOnSoft17,
      playerCanDouble: strategy.simulationConfig.playerCanDouble,
      playerCanSplit: strategy.simulationConfig.playerCanSplit,
      playerCanSurrender: strategy.simulationConfig.playerCanSurrender,
      numberOfSimulations: strategy.simulationConfig.numberOfSimulations,
      countingSystem: strategy.countingSystem,
      enableHandTracking: strategy.simulationConfig.enableHandTracking,
      doubleAfterSplit: strategy.simulationConfig.doubleAfterSplit ?? true,
      bettingTable: [...strategy.bettingStrategy], // Deep copy the betting table
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Blackjack Strategy Simulator
          </h1>
          <p className="text-xl text-gray-600">
            Advanced simulation with multiple counting systems and comprehensive
            analysis
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Configuration Panel */}
          <div className="xl:col-span-1">
            <div className="space-y-6">
              <ConfigurationPanel
                config={config}
                setConfig={setConfig}
                countingSystems={countingSystems}
                isRunning={isRunning}
              />

              <BettingTable
                bettingTable={config.bettingTable}
                setBettingTable={setBettingTable}
                isRunning={isRunning}
              />

              {/* Run Button */}
              <div>
                <Button
                  onClick={handleRunSimulation}
                  disabled={isRunning}
                  className="w-full py-3 text-lg"
                >
                  {isRunning ? 'Running Simulation...' : 'Run Simulation'}
                </Button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="xl:col-span-2">
            <div className="space-y-6">
              {/* Simulation Results - Back to Original */}
              <ResultsPanel
                results={results}
                isRunning={isRunning}
                progress={progress}
                config={getSimulationConfig(config)}
                bettingStrategy={config.bettingTable}
                countingSystem={config.countingSystem}
              />

              {/* Strategy Validation - Only show after simulation has been run */}
              {results && (
                <StrategyValidation
                  bettingTable={config.bettingTable}
                  handDetails={results.handDetails || []}
                  results={results}
                  isRunning={isRunning}
                />
              )}

              {/* Strategy Saving Panel - Only show after simulation has been run */}
              {results && (
                <StrategyValidationPanel
                  results={results}
                  config={getSimulationConfig(config)}
                  bettingStrategy={config.bettingTable}
                  countingSystem={config.countingSystem}
                />
              )}
            </div>
          </div>
        </div>

        {/* Saved Strategies Section */}
        <div className="mb-8">
          <SavedStrategies onLoadStrategy={handleLoadStrategy} />
        </div>

        {/* Hand Details Section */}
        {results && results.handDetails && results.handDetails.length > 0 && (
          <div className="mb-8">
            <HandDetailsTable handDetails={results.handDetails} />
          </div>
        )}

        {/* Charts Section - Disabled due to rendering issues */}
        {results &&
          results.sessionResults &&
          results.sessionResults.length > 0 && (
            <div className="mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                Chart feature temporarily disabled - Results displayed above
              </div>
            </div>
          )}

        {/* Information Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About This Simulator
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Features
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Multiple card counting systems (Hi-Lo, KO, Hi-Opt I)
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Complete basic strategy implementation
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Realistic game rules and variations
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Advanced betting strategies with count-based sizing
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Comprehensive risk analysis and statistics
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Real-time performance visualization
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Next Features
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  Risk of Ruin calculations with Kelly Criterion
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  Strategy deviations (Illustrious 18, Fab 4)
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  Bankroll management recommendations
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  Side bet analysis (Perfect Pairs, 21+3)
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  Team play and multiple player simulations
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">→</span>
                  Export/import simulation configurations
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Note:</strong> This simulator is for educational purposes
              and strategy development. It implements mathematically correct
              basic strategy and card counting principles used by professional
              advantage players. Results assume perfect play and may not reflect
              real-world casino conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackjackSimulator;
