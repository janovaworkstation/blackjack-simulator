/**
 * StrategyValidationPanel Component
 * Displays strategy validation results and provides "Save Strategy" functionality
 */

import React, { useState, useEffect } from 'react';
import { 
  SimulationResults, 
  SimulationConfig, 
  BetRow, 
  CountingSystemType, 
  ValidationResult 
} from '../types/blackjack';
import { useStrategyManager } from '../hooks/useStrategyManager';
import { Button, Card, CardHeader, CardContent, CardTitle } from './UI';

interface StrategyValidationPanelProps {
  results: SimulationResults;
  config: SimulationConfig;
  bettingStrategy: BetRow[];
  countingSystem: CountingSystemType;
}

interface CreateStrategyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, description?: string) => void;
  validation: ValidationResult;
}

const CreateStrategyModal: React.FC<CreateStrategyModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  validation
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onConfirm(name.trim(), description.trim() || undefined);
      setName('');
      setDescription('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Strategy</h3>
        
        {/* Validation Status */}
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-green-800 font-medium">Strategy Validated</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            This simulation meets all profitability criteria and is ready to be saved as a strategy.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="strategyName" className="block text-sm font-medium text-gray-700 mb-2">
              Strategy Name *
            </label>
            <input
              id="strategyName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Hi-Lo 6-Deck Conservative"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="strategyDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              id="strategyDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your strategy setup, goals, or notes..."
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!name.trim()}
              className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Save Strategy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const StrategyValidationPanel: React.FC<StrategyValidationPanelProps> = ({
  results,
  config,
  bettingStrategy,
  countingSystem
}) => {
  const { validateStrategy, createStrategy } = useStrategyManager();
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState<string | null>(null);
  const [createError, setCreateError] = useState<string | null>(null);

  useEffect(() => {
    const validationResult = validateStrategy(results);
    setValidation(validationResult);
  }, [results, validateStrategy]);

  const handleCreateStrategy = async (name: string, description?: string) => {
    try {
      setIsCreating(true);
      setCreateError(null);
      
      const strategy = await createStrategy(
        results,
        config,
        bettingStrategy,
        countingSystem,
        name,
        description
      );
      
      setCreateSuccess(`Strategy "${strategy.name}" created successfully!`);
      setIsModalOpen(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setCreateSuccess(null);
      }, 5000);
    } catch (error) {
      setCreateError(error instanceof Error ? error.message : 'Failed to create strategy');
    } finally {
      setIsCreating(false);
    }
  };

  if (!validation) {
    return (
      <Card className="bg-gray-50 border border-gray-200">
        <CardContent className="p-4">
          <div className="animate-pulse flex items-center">
            <div className="rounded-full bg-gray-300 h-4 w-4 mr-2"></div>
            <div className="text-sm text-gray-600">Validating strategy...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className={`${validation.isProfitable ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center">
            {validation.isProfitable ? (
              <>
                <span className="text-green-500 mr-2">✓</span>
                Strategy Validation: Passed
              </>
            ) : (
              <>
                <span className="text-red-500 mr-2">✗</span>
                Strategy Validation: Failed
              </>
            )}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="pt-0">
          {validation.isProfitable ? (
            <div className="space-y-3">
              <p className="text-sm text-green-700">
                This simulation meets all profitability criteria and can be saved as a strategy for AI coaching.
              </p>
              
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">ROI:</span>
                  <span className="text-green-600 ml-1">{results.expectedValue.toFixed(2)}%</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Win Rate:</span>
                  <span className="text-green-600 ml-1">{results.winPercentage.toFixed(1)}%</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Sample Size:</span>
                  <span className="text-green-600 ml-1">{results.handsPlayed.toLocaleString()}</span>
                </div>
              </div>

              {createSuccess && (
                <div className="p-3 bg-green-100 border border-green-300 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-green-800 text-sm">{createSuccess}</span>
                  </div>
                </div>
              )}

              {createError && (
                <div className="p-3 bg-red-100 border border-red-300 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2">✗</span>
                    <span className="text-red-800 text-sm">{createError}</span>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  disabled={isCreating}
                  className="px-6 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md disabled:opacity-50"
                >
                  {isCreating ? 'Creating...' : 'Save as Strategy'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-red-700">
                This simulation does not meet the minimum requirements for a profitable strategy.
              </p>
              
              <div className="space-y-2">
                {validation.validationErrors.map((error, index) => (
                  <div key={index} className="flex items-start text-sm">
                    <span className="text-red-500 mr-2">•</span>
                    <span className="text-red-700">{error}</span>
                  </div>
                ))}
              </div>

              {validation.recommendedImprovements.length > 0 && (
                <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="text-sm font-medium text-yellow-800 mb-2">Suggested Improvements:</div>
                  {validation.recommendedImprovements.map((improvement, index) => (
                    <div key={index} className="flex items-start text-sm">
                      <span className="text-yellow-600 mr-2">•</span>
                      <span className="text-yellow-700">{improvement}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <CreateStrategyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCreateError(null);
        }}
        onConfirm={handleCreateStrategy}
        validation={validation}
      />
    </>
  );
};

export default StrategyValidationPanel;