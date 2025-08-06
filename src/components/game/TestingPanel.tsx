import React, { useState } from 'react';
import { TESTING_SCENARIOS, getScenariosByCategory, TestScenario } from '../../utils/testingScenarios';

interface TestingPanelProps {
  isTestingMode: boolean;
  onToggleTestingMode: () => void;
  onApplyTestCards: (cards: {
    playerCards: [string, string];
    dealerCards: [string, string];
    additionalCards: string[];
  }, autoDeal?: boolean) => void;
  onClearTestCards: () => void;
  onApplyTestCardsAndDeal: (cards: {
    playerCards: [string, string];
    dealerCards: [string, string];
    additionalCards: string[];
  }) => void;
  bankroll: number;
}

// Card ranks and suits for dropdowns
const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const SUITS = ['H', 'D', 'C', 'S'];
const SUIT_SYMBOLS: { [key: string]: string } = {
  H: '♥',
  D: '♦',
  C: '♣',
  S: '♠',
};
const SUIT_COLORS: { [key: string]: string } = {
  H: 'text-red-500',
  D: 'text-red-500',
  C: 'text-black',
  S: 'text-black',
};

export function TestingPanel({ isTestingMode, onToggleTestingMode, onApplyTestCards, onClearTestCards, onApplyTestCardsAndDeal, bankroll }: TestingPanelProps) {
  const [selectedScenario, setSelectedScenario] = useState<string>('');
  const [playerCard1, setPlayerCard1] = useState<string>('');
  const [playerCard2, setPlayerCard2] = useState<string>('');
  const [dealerCard1, setDealerCard1] = useState<string>('');
  const [dealerCard2, setDealerCard2] = useState<string>('');
  const [additionalCards, setAdditionalCards] = useState<string>('');

  const handleScenarioSelect = (scenarioKey: string) => {
    const scenario = TESTING_SCENARIOS[scenarioKey];
    if (scenario) {
      setSelectedScenario(scenarioKey);
      setPlayerCard1(scenario.playerCards[0]);
      setPlayerCard2(scenario.playerCards[1]);
      setDealerCard1(scenario.dealerCards[0]);
      setDealerCard2(scenario.dealerCards[1]);
      setAdditionalCards(scenario.additionalCards?.join(', ') || '');
    }
  };

  const handleApply = () => {
    if (!playerCard1 || !playerCard2 || !dealerCard1 || !dealerCard2) {
      alert('Please select all required cards');
      return;
    }

    // Validate card counts for 6-deck shoe (max 6 of each card)
    const initialCards = [playerCard1, playerCard2, dealerCard1, dealerCard2];
    const cardCounts = new Map<string, number>();
    
    // Count occurrences of each card
    for (const card of initialCards) {
      cardCounts.set(card, (cardCounts.get(card) || 0) + 1);
    }
    
    // Check if any card appears more than 6 times (impossible in 6-deck shoe)
    for (const [card, count] of cardCounts) {
      if (count > 6) {
        alert(`Card ${card} selected ${count} times, but only 6 copies exist in 6-deck shoe.`);
        return;
      }
    }

    // Check if player has enough bankroll for $50 bet
    if (bankroll < 50) {
      alert('Insufficient bankroll for $50 test bet. Need at least $50.');
      return;
    }

    // Parse additional cards
    const additionalCardsList = additionalCards
      .split(',')
      .map(card => card.trim())
      .filter(card => card.length > 0);

    // Apply test cards and immediately deal
    onApplyTestCardsAndDeal({
      playerCards: [playerCard1, playerCard2],
      dealerCards: [dealerCard1, dealerCard2],
      additionalCards: additionalCardsList,
    });
  };

  const handleClear = () => {
    setSelectedScenario('');
    setPlayerCard1('');
    setPlayerCard2('');
    setDealerCard1('');
    setDealerCard2('');
    setAdditionalCards('');
    onClearTestCards();
  };

  const renderCardDropdown = (value: string, onChange: (value: string) => void, label: string) => {
    return (
      <div className="flex flex-col">
        <label className="text-xs text-gray-600 mb-1">{label}</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
        >
          <option value="">Select...</option>
          {RANKS.map(rank => 
            SUITS.map(suit => {
              const cardValue = `${rank}${suit}`;
              const suitSymbol = SUIT_SYMBOLS[suit];
              return (
                <option key={cardValue} value={cardValue}>
                  {rank}{suitSymbol}
                </option>
              );
            })
          )}
        </select>
      </div>
    );
  };

  const renderCardPreview = (card: string) => {
    if (!card) return <div className="w-12 h-16 border-2 border-dashed border-gray-300 rounded" />;
    
    const rank = card.slice(0, -1);
    const suit = card.slice(-1);
    const suitSymbol = SUIT_SYMBOLS[suit];
    const colorClass = SUIT_COLORS[suit];
    
    return (
      <div className="w-12 h-16 bg-white border-2 border-gray-400 rounded shadow-sm flex flex-col items-center justify-center">
        <span className={`text-lg font-bold ${colorClass}`}>{rank}</span>
        <span className={`text-xl ${colorClass}`}>{suitSymbol}</span>
      </div>
    );
  };

  return (
    <div className="absolute top-20 right-4 z-20">
      {/* Testing Mode Toggle */}
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">Testing Mode</span>
          <button
            onClick={onToggleTestingMode}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isTestingMode ? 'bg-green-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isTestingMode ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Testing Panel */}
      {isTestingMode && (
        <div className="bg-white rounded-lg shadow-lg p-4 w-96">
          <h3 className="text-lg font-semibold mb-4">Test Card Selection</h3>

          {/* Scenario Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quick Scenarios
            </label>
            <select
              value={selectedScenario}
              onChange={(e) => handleScenarioSelect(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            >
              <option value="">Select a scenario...</option>
              {Object.entries(getScenariosByCategory()).map(([category, scenarios]) => (
                <optgroup key={category} label={category.charAt(0).toUpperCase() + category.slice(1)}>
                  {scenarios.map((scenario) => {
                    const key = Object.keys(TESTING_SCENARIOS).find(
                      k => TESTING_SCENARIOS[k] === scenario
                    );
                    return (
                      <option key={key} value={key}>
                        {scenario.name}
                      </option>
                    );
                  })}
                </optgroup>
              ))}
            </select>
          </div>

          {/* Card Selection */}
          <div className="space-y-4">
            {/* Player Cards */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Player Cards</h4>
              <div className="flex space-x-2">
                {renderCardDropdown(playerCard1, setPlayerCard1, 'Card 1')}
                {renderCardDropdown(playerCard2, setPlayerCard2, 'Card 2')}
              </div>
              <div className="flex space-x-2 mt-2">
                {renderCardPreview(playerCard1)}
                {renderCardPreview(playerCard2)}
              </div>
            </div>

            {/* Dealer Cards */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Dealer Cards</h4>
              <div className="flex space-x-2">
                {renderCardDropdown(dealerCard1, setDealerCard1, 'Up Card')}
                {renderCardDropdown(dealerCard2, setDealerCard2, 'Hole Card')}
              </div>
              <div className="flex space-x-2 mt-2">
                {renderCardPreview(dealerCard1)}
                {renderCardPreview(dealerCard2)}
              </div>
            </div>

            {/* Additional Cards */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Cards (comma-separated)
              </label>
              <input
                type="text"
                value={additionalCards}
                onChange={(e) => setAdditionalCards(e.target.value)}
                placeholder="e.g., KH, 2D, AS"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Cards for hits, splits, dealer draws
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleApply}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm font-medium"
            >
              Apply & Deal ($50)
            </button>
            <button
              onClick={handleClear}
              className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors text-sm font-medium"
            >
              Clear
            </button>
          </div>

          {/* Selected Scenario Description */}
          {selectedScenario && TESTING_SCENARIOS[selectedScenario] && (
            <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-700">
              <p className="font-medium">{TESTING_SCENARIOS[selectedScenario].name}</p>
              <p className="text-xs mt-1">{TESTING_SCENARIOS[selectedScenario].description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TestingPanel;