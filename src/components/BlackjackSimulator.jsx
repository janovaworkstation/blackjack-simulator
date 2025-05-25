import React, { useState } from 'react';
import { Button } from './UI';
import ConfigurationPanel from './ConfigurationPanel';
import ResultsPanel from './ResultsPanel';
import { useSimulation } from '../hooks/useSimulation';

const BlackjackSimulator = () => {
  const { isRunning, results, progress, runSimulation } = useSimulation();
  
  const [config, setConfig] = useState({
    hands: 100000,
    decks: 6,
    penetration: 0.75,
    minBet: 10,
    maxBet: 100,
    handsPerHour: 80,
    countingSystem: 'HI_LO',
    dealerHitsSoft17: true,
    doubleAfterSplit: true,
    surrenderAllowed: false,
    resplitAces: false
  });

  const countingSystems = [
    { value: 'HI_LO', label: 'Hi-Lo' },
    { value: 'KO', label: 'Knock-Out (KO)' },
    { value: 'HI_OPT_I', label: 'Hi-Opt I' }
  ];

  const handleRunSimulation = () => {
    console.log('Button clicked! Config:', config);
    console.log('runSimulation function:', runSimulation);
    runSimulation(config);
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
            Advanced simulation with multiple counting systems and comprehensive analysis
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <ConfigurationPanel
              config={config}
              setConfig={setConfig}
              countingSystems={countingSystems}
              isRunning={isRunning}
            />
            
            {/* Run Button */}
            <div className="mt-6">
              <Button
                onClick={handleRunSimulation}
                disabled={isRunning}
                className="w-full py-3 text-lg"
              >
                {isRunning ? 'Running Simulation...' : 'Run Simulation'}
              </Button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            <ResultsPanel
              results={results}
              isRunning={isRunning}
              progress={progress}
            />
          </div>
        </div>

        {/* Charts Section - Disabled due to rendering issues */}
        {results && results.sessionResults && results.sessionResults.length > 0 && (
          <div className="mb-8">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              Chart feature temporarily disabled - Results displayed above
            </div>
          </div>
        )}

        {/* Information Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Simulator</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
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
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Next Features</h3>
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
              <strong>Note:</strong> This simulator is for educational purposes and strategy development. 
              It implements mathematically correct basic strategy and card counting principles used by 
              professional advantage players. Results assume perfect play and may not reflect real-world 
              casino conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlackjackSimulator;
