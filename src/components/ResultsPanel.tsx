import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './UI';

const ResultsPanel = ({ results, isRunning, progress }) => {
  if (isRunning) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Running Simulation...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">
              {progress ? `Processing ${progress.current.toLocaleString()} of ${progress.total.toLocaleString()} hands...` : 'Initializing simulation...'}
            </p>
            {progress && (
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(progress.current / progress.total) * 100}%` }}
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
      <Card>
        <CardHeader>
          <CardTitle>Simulation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            Configure your simulation parameters and click "Run Simulation" to begin
          </div>
        </CardContent>
      </Card>
    );
  }

  // Validate results data
  const safeNumber = (num) => {
    if (typeof num !== 'number' || isNaN(num) || !isFinite(num)) return 0;
    return num;
  };

  // Calculate totalOutcomes in case it's not provided in results
  const calculatedTotalOutcomes = safeNumber(results.wins) + safeNumber(results.losses) + safeNumber(results.pushes);
  
  const safeResults = {
    ...results,
    handsPlayed: safeNumber(results.handsPlayed),
    totalOutcomes: safeNumber(results.totalOutcomes) || calculatedTotalOutcomes,
    wins: safeNumber(results.wins),
    losses: safeNumber(results.losses),
    pushes: safeNumber(results.pushes),
    blackjacks: safeNumber(results.blackjacks),
    doubles: safeNumber(results.doubles),
    splits: safeNumber(results.splits),
    surrenders: safeNumber(results.surrenders),
    busts: safeNumber(results.busts),
    hands15: safeNumber(results.hands15),
    hands16: safeNumber(results.hands16),
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
    countingSystem: results.countingSystem || 'Unknown'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simulation Results</CardTitle>
      </CardHeader>
      <CardContent>
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
                {safeResults.winPercentage}%
              </div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Expected Value</div>
              <div className={`text-xl font-bold ${safeResults.expectedValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {safeResults.expectedValue}%
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600">Net Result</div>
              <div className={`text-xl font-bold ${safeResults.netResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${parseFloat(safeResults.netResult.toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hand Outcomes */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Hand Outcomes</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Wins:</span>
                  <span className="text-green-600 font-medium">
                    {safeResults.wins.toLocaleString()} ({safeResults.winPercentage}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Losses:</span>
                  <span className="text-red-600 font-medium">
                    {safeResults.losses.toLocaleString()} ({safeResults.lossPercentage}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Pushes:</span>
                  <span className="text-yellow-600 font-medium">
                    {safeResults.pushes.toLocaleString()} ({safeResults.pushPercentage}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Blackjacks:</span>
                  <span className="text-blue-600 font-medium">
                    {safeResults.blackjacks.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Busts:</span>
                  <span className="text-red-600 font-medium">
                    {safeResults.busts.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Financial Summary */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Financial Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Wagered:</span>
                  <span className="font-medium">${parseFloat(safeResults.totalWagered.toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Won:</span>
                  <span className="font-medium">${parseFloat((safeResults.totalWagered + safeResults.totalWon).toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Profit/Loss:</span>
                  <span className={`font-medium ${safeResults.netResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${parseFloat(safeResults.netResult.toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Average Initial Bet:</span>
                  <span className="font-medium">${safeResults.averageBetSize.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Drawdown:</span>
                  <span className="text-red-600 font-medium">${parseFloat(safeResults.maxDrawdown.toFixed(2)).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Outcomes Summary */}
          <div className="text-center">
            <div className="text-xs text-gray-500">
              Total: {safeResults.totalOutcomes.toLocaleString()} outcomes from {safeResults.handsPlayed.toLocaleString()} hands dealt (includes splits)
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Hard 15s: {safeResults.hands15.toLocaleString()} ({((safeResults.hands15 / safeResults.handsPlayed) * 100).toFixed(1)}%) | 
              Hard 16s: {safeResults.hands16.toLocaleString()} ({((safeResults.hands16 / safeResults.handsPlayed) * 100).toFixed(1)}%)
            </div>
          </div>

          {/* Special Plays */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Special Plays</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex justify-between">
                <span>Doubles:</span>
                <span className="font-medium">{safeResults.doubles.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Splits:</span>
                <span className="font-medium">{safeResults.splits.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Surrenders:</span>
                <span className="font-medium">{safeResults.surrenders.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>System:</span>
                <span className="font-medium">{safeResults.countingSystem}</span>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="border-t pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Risk Analysis</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Win Probability:</span>
                  <div className="text-lg font-bold">{safeResults.winPercentage}%</div>
                </div>
                <div>
                  <span className="text-gray-600">Expected Hourly:</span>
                  <div className={`text-lg font-bold ${safeResults.expectedValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${((safeResults.averageBetSize * safeResults.expectedValue / 100) * safeResults.handsPerHour).toFixed(2)}/hr*
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Risk Rating:</span>
                  <div className={`text-lg font-bold ${
                    safeResults.maxDrawdown / safeResults.totalWagered < 0.1 ? 'text-green-600' : 
                    safeResults.maxDrawdown / safeResults.totalWagered < 0.2 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {safeResults.maxDrawdown / safeResults.totalWagered < 0.1 ? 'Low' : 
                     safeResults.maxDrawdown / safeResults.totalWagered < 0.2 ? 'Medium' : 'High'}
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Assumes {safeResults.handsPerHour} hands per hour
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsPanel;
