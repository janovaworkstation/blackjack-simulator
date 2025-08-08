import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './UI';
import { BetRow, HandDetails, SimulationResults } from '../types/blackjack';

export interface StrategyValidationProps {
  bettingTable: BetRow[];
  handDetails: HandDetails[];
  results: SimulationResults;
  isRunning: boolean;
}

interface RangeStats {
  handsPlayed: number;
  wins: number;
  losses: number;
  pushes: number;
  blackjacks: number;
  totalWagered: number;
  totalWinnings: number;
  winRate: number;
  expectedValue: number;
  netResult: number;
}

const StrategyValidation: React.FC<StrategyValidationProps> = ({
  bettingTable,
  handDetails,
  results,
  isRunning,
}) => {
  // Pre-process handDetails into a Map for O(1) lookup performance
  const handIdMap = React.useMemo(() => {
    const map = new Map<string, HandDetails[]>();
    handDetails.forEach(hand => {
      if (hand.handId) {
        if (!map.has(hand.handId)) {
          map.set(hand.handId, []);
        }
        map.get(hand.handId)!.push(hand);
      }
    });
    return map;
  }, [handDetails]);

  // Calculate statistics for each betting range
  const calculateRangeStats = (minCount: number, maxCount: number): RangeStats => {
    // Get original hands in this true count range
    const originalHands = handDetails.filter(hand => {
      const tc = hand.trueCountStart;
      const isOriginalHand = hand.subHandId === undefined || hand.subHandId === 0;
      return isOriginalHand && tc >= minCount && tc < maxCount;
    });
    
    // For each original hand, collect all split hands with same handId using pre-built map
    const handGroups = originalHands.map(originalHand => {
      const handId = originalHand.handId;
      if (handId && handIdMap.has(handId)) {
        // Use O(1) map lookup instead of O(n) filter
        return handIdMap.get(handId)!;
      } else {
        // Legacy hand without handId - just return the original hand
        return [originalHand];
      }
    });

    // Check for unmatched hands that fall outside betting ranges
    const unmatchedHands = originalHands.filter(hand => {
      const tc = hand.trueCountStart;
      return !bettingTable.some(row => tc >= row.minCount && tc < row.maxCount);
    });
    
    if (unmatchedHands.length > 0 && minCount === bettingTable[0].minCount) {
      console.warn(`Strategy Validation: ${unmatchedHands.length} hands fall outside betting ranges and will be excluded from analysis`);
      console.warn(`Example excluded TC values: ${unmatchedHands.slice(0, 5).map(h => h.trueCountStart).join(', ')}`);
      console.warn(`Betting ranges: ${bettingTable.map(r => `[${r.minCount}, ${r.maxCount})`).join(', ')}`);
    }

    const stats: RangeStats = {
      handsPlayed: handGroups.length, // Count original hands only
      wins: 0,
      losses: 0,
      pushes: 0,
      blackjacks: 0,
      totalWagered: 0,
      totalWinnings: 0,
      winRate: 0,
      expectedValue: 0,
      netResult: 0,
    };

    // Calculate stats for each hand group (original hand + all its split hands)
    handGroups.forEach(handGroup => {
      // Sum up all split hand results for this original hand
      const totalHandWinnings = handGroup.reduce((sum, h) => sum + h.winnings, 0);
      const totalHandWagered = handGroup.reduce((sum, h) => sum + h.betAmount, 0);
      const hasBlackjack = handGroup.some(h => h.playerBlackjack);
      
      stats.totalWagered += totalHandWagered;
      stats.totalWinnings += totalHandWinnings;
      
      // Count each individual split hand's outcome (matching main simulation logic)
      handGroup.forEach(hand => {
        if (hand.winnings > 0) {
          stats.wins++;
          if (hand.playerBlackjack) stats.blackjacks++;
        } else if (hand.winnings < 0) {
          stats.losses++;
        } else {
          stats.pushes++;
        }
      });
    });

    stats.netResult = stats.totalWinnings;
    stats.winRate = stats.handsPlayed > 0 ? (stats.wins / stats.handsPlayed) * 100 : 0;
    stats.expectedValue = stats.totalWagered > 0 ? (stats.totalWinnings / stats.totalWagered) * 100 : 0;

    return stats;
  };

  const rangeStats = bettingTable.map(row => calculateRangeStats(row.minCount, row.maxCount));


  // Calculate totals across all ranges
  const totals: RangeStats = rangeStats.reduce((acc, stats) => ({
    handsPlayed: acc.handsPlayed + stats.handsPlayed,
    wins: acc.wins + stats.wins,
    losses: acc.losses + stats.losses,
    pushes: acc.pushes + stats.pushes,
    blackjacks: acc.blackjacks + stats.blackjacks,
    totalWagered: acc.totalWagered + stats.totalWagered,
    totalWinnings: acc.totalWinnings + stats.totalWinnings,
    winRate: 0, // Will be calculated below
    expectedValue: 0, // Will be calculated below
    netResult: acc.netResult + stats.netResult,
  }), {
    handsPlayed: 0,
    wins: 0,
    losses: 0,
    pushes: 0,
    blackjacks: 0,
    totalWagered: 0,
    totalWinnings: 0,
    winRate: 0,
    expectedValue: 0,
    netResult: 0,
  });

  // Calculate overall percentages
  totals.winRate = totals.handsPlayed > 0 ? (totals.wins / totals.handsPlayed) * 100 : 0;
  totals.expectedValue = totals.totalWagered > 0 ? (totals.totalWinnings / totals.totalWagered) * 100 : 0;

  // Calculate overall strategy validation - use more realistic criteria for blackjack
  // Only count original hands to match the simulation's hand count
  const totalHands = handDetails.filter(hand => hand.subHandId === undefined || hand.subHandId === 0).length;
  
  // Use flexible minimum based on range frequency: low counts need more data, high counts need less
  const getMinHandsForRange = (stats: RangeStats, rangeIndex: number) => {
    const rangeMinCount = bettingTable[rangeIndex].minCount;
    // Lower count ranges (more common) need more hands, higher counts (rare) need fewer
    if (rangeMinCount <= 1) return 200;  // Common ranges need decent sample
    if (rangeMinCount <= 3) return 100;  // Medium ranges 
    if (rangeMinCount <= 6) return 50;   // High count ranges
    return 25; // Extreme high count ranges (very rare)
  };
  
  // Check if any range with hands fails its minimum requirement
  const hasInsufficientData = rangeStats.some((stats, i) => 
    stats.handsPlayed > 0 && stats.handsPlayed < getMinHandsForRange(stats, i)
  );
  
  // Use the main simulation results EV for consistency 
  const overallEV = results?.expectedValue ?? 0;
  const strategyPassed = !hasInsufficientData && overallEV > -0.5; // Strategy passes if EV > -0.5%

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Strategy Validation
          </CardTitle>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            totalHands === 0 ? 'bg-gray-100 text-gray-600' :
            strategyPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {totalHands === 0 ? 'No Data' : strategyPassed ? 'Passed' : 'Failed'}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Performance analysis for each true count range in your betting strategy.
          </p>

          {!strategyPassed && totalHands > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">
                <strong>Strategy Validation: Failed</strong>
              </p>
              <p className="text-red-700 text-xs mt-1">
                This simulation does not meet the minimum requirements for a profitable strategy.
              </p>
              <ul className="text-red-700 text-xs mt-2 space-y-1">
                {hasInsufficientData && <li>• Not enough data (some betting ranges need more hands for reliable statistics)</li>}
                {overallEV <= -0.5 && <li>• Expected value too low ({overallEV.toFixed(2)}% EV, need &gt; -0.5%)</li>}
              </ul>
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-sm font-medium text-yellow-800 mb-2">Suggested Improvements:</div>
                <ul className="text-yellow-700 text-xs space-y-1">
                  <li>• Consider tighter bet spread or betting strategy</li>
                  <li>• Increase simulation size for more reliable data</li>
                </ul>
              </div>
            </div>
          )}

          {strategyPassed && totalHands > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                <strong>Strategy Validation: Passed</strong>
              </p>
              <p className="text-green-700 text-xs mt-1">
                This strategy shows positive expected value with sufficient data coverage.
              </p>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm table-fixed">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-center py-2 px-2 whitespace-nowrap w-20">
                    TC Range
                  </th>
                  <th className="text-center py-2 px-2 whitespace-nowrap w-16">
                    # Hands
                  </th>
                  <th className="text-center py-2 px-2 whitespace-nowrap w-12">
                    Wins
                  </th>
                  <th className="text-center py-2 px-2 whitespace-nowrap w-12">
                    Losses
                  </th>
                  <th className="text-center py-2 px-2 whitespace-nowrap w-12">
                    Pushes
                  </th>
                  <th className="text-center py-2 px-2 whitespace-nowrap w-12">
                    BJs
                  </th>
                  <th className="text-center py-2 px-2 whitespace-nowrap w-16">
                    Win Rate %
                  </th>
                  <th className="text-center py-2 px-2 whitespace-nowrap w-16">
                    EV %
                  </th>
                  <th className="text-center py-2 px-2 whitespace-nowrap w-20">
                    Net Result
                  </th>
                </tr>
              </thead>
              <tbody>
                {bettingTable.map((row, index) => {
                  const stats = rangeStats[index];
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-2 text-center text-xs">
                        [{row.minCount}, {row.maxCount})
                      </td>
                      <td className="py-2 px-2 text-center text-xs">
                        {stats.handsPlayed.toLocaleString()}
                      </td>
                      <td className="py-2 px-2 text-center text-xs">
                        {stats.wins.toLocaleString()}
                      </td>
                      <td className="py-2 px-2 text-center text-xs">
                        {stats.losses.toLocaleString()}
                      </td>
                      <td className="py-2 px-2 text-center text-xs">
                        {stats.pushes.toLocaleString()}
                      </td>
                      <td className="py-2 px-2 text-center text-xs">
                        {stats.blackjacks.toLocaleString()}
                      </td>
                      <td className="py-2 px-2 text-center text-xs">
                        {stats.winRate.toFixed(1)}
                      </td>
                      <td className={`py-2 px-2 text-center text-xs font-medium ${
                        stats.expectedValue >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stats.expectedValue >= 0 ? '+' : ''}{stats.expectedValue.toFixed(2)}
                      </td>
                      <td className={`py-2 px-2 text-center text-xs font-medium ${
                        stats.netResult >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        ${Math.abs(stats.netResult).toLocaleString(undefined, {maximumFractionDigits: 0})}
                      </td>
                    </tr>
                  );
                })}
                {/* Totals Row */}
                <tr className="border-t-2 border-gray-300 bg-gray-50 font-medium">
                  <td className="py-2 px-2 text-center text-xs font-semibold">
                    Total
                  </td>
                  <td className="py-2 px-2 text-center text-xs font-semibold">
                    {totals.handsPlayed.toLocaleString()}
                  </td>
                  <td className="py-2 px-2 text-center text-xs font-semibold">
                    {totals.wins.toLocaleString()}
                  </td>
                  <td className="py-2 px-2 text-center text-xs font-semibold">
                    {totals.losses.toLocaleString()}
                  </td>
                  <td className="py-2 px-2 text-center text-xs font-semibold">
                    {totals.pushes.toLocaleString()}
                  </td>
                  <td className="py-2 px-2 text-center text-xs font-semibold">
                    {totals.blackjacks.toLocaleString()}
                  </td>
                  <td className="py-2 px-2 text-center text-xs font-semibold">
                    {totals.winRate.toFixed(1)}
                  </td>
                  <td className={`py-2 px-2 text-center text-xs font-semibold ${
                    totals.expectedValue >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {totals.expectedValue >= 0 ? '+' : ''}{totals.expectedValue.toFixed(2)}
                  </td>
                  <td className={`py-2 px-2 text-center text-xs font-semibold ${
                    totals.netResult >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    ${Math.abs(totals.netResult).toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Comparison with Main Results */}
          {results && totals.handsPlayed > 0 && (
            <div className={`mt-4 p-3 border rounded-lg ${
              totals.handsPlayed !== results.handsPlayed 
                ? 'bg-red-50 border-red-200' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className={`text-sm font-medium mb-2 ${
                totals.handsPlayed !== results.handsPlayed 
                  ? 'text-red-800' 
                  : 'text-blue-800'
              }`}>
                Comparison with Main Results:
                {totals.handsPlayed !== results.handsPlayed && (
                  <span className="ml-2 text-red-600">⚠️ MISMATCH DETECTED</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-medium text-blue-700">Strategy Validation Net:</span>
                  <span className={`ml-1 ${totals.netResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(totals.netResult).toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-blue-700">Main Results Net:</span>
                  <span className={`ml-1 ${results.netResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(results.netResult).toLocaleString(undefined, {maximumFractionDigits: 0})}
                  </span>
                </div>
                <div>
                  <span className={`font-medium ${
                    totals.handsPlayed !== results.handsPlayed ? 'text-red-700' : 'text-blue-700'
                  }`}>Strategy Hands:</span>
                  <span className={`ml-1 ${
                    totals.handsPlayed !== results.handsPlayed ? 'text-red-900 font-bold' : 'text-blue-900'
                  }`}>{totals.handsPlayed.toLocaleString()}</span>
                </div>
                <div>
                  <span className={`font-medium ${
                    totals.handsPlayed !== results.handsPlayed ? 'text-red-700' : 'text-blue-700'
                  }`}>Main Results Hands:</span>
                  <span className={`ml-1 ${
                    totals.handsPlayed !== results.handsPlayed ? 'text-red-900 font-bold' : 'text-blue-900'
                  }`}>{results.handsPlayed.toLocaleString()}</span>
                </div>
              </div>
              {totals.handsPlayed !== results.handsPlayed && (
                <div className="mt-2 text-xs text-red-700">
                  <strong>Missing:</strong> {(results.handsPlayed - totals.handsPlayed).toLocaleString()} hands fall outside betting table ranges
                  <div className="mt-1 text-xs text-orange-700">
                    <strong>Tip:</strong> Check console for excluded True Count values. Consider expanding betting table ranges to cover all possible TC values (e.g., [-99, 99]).
                  </div>
                </div>
              )}
            </div>
          )}

          {handDetails.length === 0 && !isRunning && (
            <div className="text-center py-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
                <div className="text-blue-800 text-lg font-semibold mb-2">
                  ℹ️ Strategy Validation Requires Hand Tracking
                </div>
                <div className="text-blue-700 text-sm mb-4">
                  To see detailed strategy validation results, enable "Hand-by-Hand Tracking" in the configuration panel above, then run a new simulation.
                </div>
                <div className="text-blue-600 text-xs">
                  This will show performance analysis for each true count range in your betting strategy.
                </div>
              </div>
            </div>
          )}

          {isRunning && (
            <div className="text-center text-blue-500 py-4">
              Analyzing strategy performance...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StrategyValidation;