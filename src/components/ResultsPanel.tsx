import React from 'react';
import { SimulationResults } from '../types/blackjack';
import { Card, CardHeader, CardContent, CardTitle } from './UI';

export interface ResultsPanelProps {
  results: SimulationResults | null;
  isRunning: boolean;
  progress: { current: number; total: number } | null;
}

/**
 * A component that displays the results of the simulation.
 * @param {ResultsPanelProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const ResultsPanel: React.FC<ResultsPanelProps> = ({
  results,
  isRunning,
  progress,
}) => {
  if (isRunning) {
    return (
      <Card className="bg-white shadow-md rounded-lg">
        <CardHeader className="border-b border-gray-200 px-6 py-4">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Running Simulation...
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              {progress
                ? `Processing ${progress.current.toLocaleString()} of ${progress.total.toLocaleString()} hands...`
                : 'Initializing simulation...'}
            </p>
            {progress && (
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${(progress.current / progress.total) * 100}%`,
                  }}
                ></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return (
      <Card className="bg-white shadow-md rounded-lg">
        <CardHeader className="border-b border-gray-200 px-6 py-4">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Simulation Results
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center text-gray-500 py-8">
            Configure your simulation parameters and click &quot;Run
            Simulation&quot; to begin
          </div>
        </CardContent>
      </Card>
    );
  }

  const safeNumber = (num: number | undefined): number => {
    if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) return 0;
    return num;
  };

  const calculatedTotalOutcomes =
    safeNumber(results.wins) +
    safeNumber(results.losses) +
    safeNumber(results.pushes);

  const safeResults: SimulationResults = {
    ...results,
    handsPlayed: safeNumber(results.handsPlayed),
    totalOutcomes: safeNumber(results.totalOutcomes) || calculatedTotalOutcomes,
    wins: safeNumber(results.wins),
    losses: safeNumber(results.losses),
    pushes: safeNumber(results.pushes),
    blackjacks: safeNumber(results.blackjacks),
    playerBusts: safeNumber(results.playerBusts),
    dealerBusts: safeNumber(results.dealerBusts),
    surrenders: safeNumber(results.surrenders),
    winPercentage: safeNumber(results.winPercentage),
    lossPercentage: safeNumber(results.lossPercentage),
    pushPercentage: safeNumber(results.pushPercentage),
    totalWagered: safeNumber(results.totalWagered),
    totalWon: safeNumber(results.totalWon),
    netResult: safeNumber(results.netResult),
    expectedValue: safeNumber(results.expectedValue),
    averageBetSize: safeNumber(results.averageBetSize),
    maxDrawdown: safeNumber(results.maxDrawdown),
    handsPerHour: safeNumber(results.handsPerHour) || 80,
    countingSystem: results.countingSystem || 'Unknown',
    sessionResults: results.sessionResults || [],
    handDetails: results.handDetails || [],
    busts: safeNumber(results.busts),
    doubles: safeNumber(results.doubles),
    splits: safeNumber(results.splits),
    hands15: safeNumber(results.hands15),
    hands16: safeNumber(results.hands16),
  };

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="border-b border-gray-200 px-6 py-4">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Simulation Results
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Summary Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Hands Played</div>
              <div className="text-xl font-bold text-blue-600">
                {safeResults.handsPlayed.toLocaleString()}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Win Rate</div>
              <div className="text-xl font-bold text-green-600">
                {safeResults.winPercentage.toFixed(2)}%
              </div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">EV</div>
              <div
                className={`text-xl font-bold ${
                  safeResults.expectedValue >= 0
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {safeResults.expectedValue.toFixed(4)}%
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Net Result</div>
              <div
                className={`text-xl font-bold ${
                  safeResults.netResult >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                $
                {safeResults.netResult.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>

          {/* Detailed Statistics */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">
              Detailed Statistics
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">
                  Total Wagered:
                </span>
                <span className="text-gray-900 ml-2">
                  ${safeResults.totalWagered.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Total Won:</span>
                <span className="text-gray-900 ml-2">
                  ${safeResults.totalWon.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Avg. Bet Size:
                </span>
                <span className="text-gray-900 ml-2">
                  ${safeResults.averageBetSize.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Max Drawdown:</span>
                <span className="text-gray-900 ml-2">
                  ${safeResults.maxDrawdown.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Hands per Hour:
                </span>
                <span className="text-gray-900 ml-2">
                  {safeResults.handsPerHour}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Counting System:
                </span>
                <span className="text-gray-900 ml-2">
                  {safeResults.countingSystem}
                </span>
              </div>
            </div>
          </div>

          {/* Hand Outcomes */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Hand Outcomes</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Wins:</span>
                <span className="text-green-600 ml-2">
                  {safeResults.wins.toLocaleString()} (
                  {safeResults.winPercentage.toFixed(2)}%)
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Losses:</span>
                <span className="text-red-600 ml-2">
                  {safeResults.losses.toLocaleString()} (
                  {safeResults.lossPercentage.toFixed(2)}%)
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Pushes:</span>
                <span className="text-gray-600 ml-2">
                  {safeResults.pushes.toLocaleString()} (
                  {safeResults.pushPercentage.toFixed(2)}%)
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Blackjacks:</span>
                <span className="text-yellow-600 ml-2">
                  {safeResults.blackjacks.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Player Busts:</span>
                <span className="text-gray-900 ml-2">
                  {safeResults.playerBusts.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Dealer Busts:</span>
                <span className="text-gray-900 ml-2">
                  {safeResults.dealerBusts.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Surrenders:</span>
                <span className="text-gray-900 ml-2">
                  {safeResults.surrenders.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Total Busts:</span>
                <span className="text-gray-900 ml-2">
                  {safeResults.busts.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Advanced Metrics */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">
              Advanced Metrics
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">
                  Risk of Ruin (1000 units):
                </span>
                <span className="text-gray-900 ml-2">
                  {/* Placeholder for RoR */}
                  N/A
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Kelly Criterion Bet:
                </span>
                <span className="text-gray-900 ml-2">
                  {/* Placeholder for Kelly Bet */}
                  N/A
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">
                  Standard Deviation:
                </span>
                <span className="text-gray-900 ml-2">
                  {/* Placeholder for Std Dev */}
                  N/A
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Hard 15s: {safeResults.hands15.toLocaleString()} (
              {((safeResults.hands15 / safeResults.handsPlayed) * 100).toFixed(
                2,
              )}
              %) | Hard 16s: {safeResults.hands16.toLocaleString()} (
              {((safeResults.hands16 / safeResults.handsPlayed) * 100).toFixed(
                2,
              )}
              %)
            </p>
          </div>

          {/* Player Actions */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Player Actions</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">Doubles:</span>
                <span className="text-gray-900 ml-2">
                  {safeResults.doubles.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">Splits:</span>
                <span className="text-gray-900 ml-2">
                  {safeResults.splits.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsPanel;
