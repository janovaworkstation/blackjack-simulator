/**
 * SavedStrategies Component
 * Displays and manages saved profitable strategies
 */

import React, { useState } from 'react';
import { useStrategyManager } from '../hooks/useStrategyManager';
import { Strategy } from '../types/blackjack';
import { Card, CardHeader, CardContent, CardTitle, Button } from './UI';

interface SavedStrategiesProps {
  onLoadStrategy?: (strategy: Strategy) => void;
}

const SavedStrategies: React.FC<SavedStrategiesProps> = ({ onLoadStrategy }) => {
  const { 
    strategies, 
    isLoading, 
    error, 
    deleteStrategy, 
    exportStrategy,
    getStrategyStats 
  } = useStrategyManager();
  
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [loadSuccess, setLoadSuccess] = useState<string | null>(null);

  if (isLoading) {
    return (
      <Card className="bg-white shadow-md rounded-lg">
        <CardContent className="p-6">
          <div className="animate-pulse flex items-center">
            <div className="rounded-full bg-gray-300 h-4 w-4 mr-2"></div>
            <div className="text-sm text-gray-600">Loading saved strategies...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-6">
          <div className="text-red-800 text-sm">
            Error loading strategies: {error}
          </div>
        </CardContent>
      </Card>
    );
  }

  const stats = getStrategyStats();

  const handleDelete = async (strategyId: string) => {
    try {
      await deleteStrategy(strategyId);
      setDeleteConfirm(null);
    } catch (err) {
      console.error('Failed to delete strategy:', err);
    }
  };

  const handleExport = (strategy: Strategy) => {
    const exportData = exportStrategy(strategy);
    const blob = new Blob([exportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${strategy.name.replace(/[^a-zA-Z0-9]/g, '_')}_strategy.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleLoad = (strategy: Strategy) => {
    if (onLoadStrategy) {
      onLoadStrategy(strategy);
      setLoadSuccess(`"${strategy.name}" loaded successfully!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setLoadSuccess(null);
      }, 3000);
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (strategies.length === 0) {
    return (
      <Card className="bg-white shadow-md rounded-lg">
        <CardHeader className="border-b border-gray-200 px-6 py-4">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Saved Strategies
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center text-gray-500 py-8">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">No Strategies Saved Yet</h3>
            <p className="text-sm text-gray-600">
              Run simulations with positive expected value to save profitable strategies.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Saved Strategies ({stats.totalStrategies})
          </CardTitle>
          {stats.bestStrategy && (
            <div className="text-sm text-gray-600">
              Best: {stats.bestStrategy.name} ({stats.bestStrategy.performance?.roiPercentage?.toFixed(2) || 'N/A'}% ROI)
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {loadSuccess && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-green-800 text-sm">{loadSuccess}</span>
            </div>
          </div>
        )}
        <div className="space-y-4">
          {strategies.map((strategy) => (
            <div key={strategy.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <h3 className="text-base font-semibold text-gray-900">{strategy.name}</h3>
                  <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                    {strategy.simulationConfig.countingSystem}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    (strategy.performance?.roiPercentage || 0) >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {strategy.performance?.roiPercentage?.toFixed(2) || 'N/A'}% ROI
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-3 text-sm">
                <div>
                  <span className="text-gray-500">Win Rate:</span>
                  <span className="ml-1 font-medium">{strategy.performance?.winPercentage?.toFixed(1) || 'N/A'}%</span>
                </div>
                <div>
                  <span className="text-gray-500">Hands:</span>
                  <span className="ml-1 font-medium">{strategy.performance?.handsSimulated?.toLocaleString() || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Drawdown:</span>
                  <span className="ml-1 font-medium">${strategy.performance?.maxDrawdown?.toLocaleString() || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-500">Created:</span>
                  <span className="ml-1 font-medium">{formatDate(new Date(strategy.createdAt))}</span>
                </div>
              </div>

              {strategy.description && (
                <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleLoad(strategy)}
                    disabled={!onLoadStrategy}
                    className="px-3 py-1 text-xs bg-green-100 text-green-700 hover:bg-green-200 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Load Strategy
                  </Button>
                  <Button
                    onClick={() => setExpandedStrategy(expandedStrategy === strategy.id ? null : strategy.id)}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 rounded"
                  >
                    {expandedStrategy === strategy.id ? 'Hide Details' : 'Show Details'}
                  </Button>
                  <Button
                    onClick={() => handleExport(strategy)}
                    className="px-3 py-1 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 rounded"
                  >
                    Export
                  </Button>
                </div>
                
                <Button
                  onClick={() => setDeleteConfirm(strategy.id)}
                  className="px-3 py-1 text-xs bg-red-100 text-red-700 hover:bg-red-200 rounded"
                >
                  Delete
                </Button>
              </div>

              {expandedStrategy === strategy.id && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-800 mb-3">Strategy Configuration</h4>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-600">Decks:</span>
                      <span className="ml-1">{strategy.simulationConfig.numberOfDecks}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Penetration:</span>
                      <span className="ml-1">{strategy.simulationConfig.deckPenetration}%</span>
                    </div>
                    <div>
                      <span className="text-gray-600">S17:</span>
                      <span className="ml-1">{strategy.simulationConfig.dealerHitsOnSoft17 ? 'Yes' : 'No'}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Surrender:</span>
                      <span className="ml-1">{strategy.simulationConfig.playerCanSurrender ? 'Yes' : 'No'}</span>
                    </div>
                  </div>

                  <h5 className="text-sm font-semibold text-gray-800 mb-2">Betting Strategy</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs border border-gray-200 rounded">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-2 py-1 text-center">TC Range</th>
                          <th className="px-2 py-1 text-center">Bet</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(strategy.bettingStrategy || []).map((bet, index) => (
                          <tr key={index} className="border-t">
                            <td className="px-2 py-1 text-center">[{bet.minCount}, {bet.maxCount})</td>
                            <td className="px-2 py-1 text-center">${bet.betAmount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {deleteConfirm === strategy.id && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm mb-3">
                    Are you sure you want to delete "{strategy.name}"? This action cannot be undone.
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleDelete(strategy.id)}
                      className="px-3 py-1 text-xs bg-red-600 text-white hover:bg-red-700 rounded"
                    >
                      Yes, Delete
                    </Button>
                    <Button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-3 py-1 text-xs bg-gray-300 text-gray-700 hover:bg-gray-400 rounded"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedStrategies;