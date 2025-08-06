import React from 'react';

interface GameUIProps {
  onHit: () => void;
  onStand: () => void;
  onDouble: () => void;
  onSplit: () => void;
  onSurrender: () => void;
  onDeal: () => void;
  onBet: (amount: number) => void;
  onClearBet?: () => void;
  onTakeInsurance?: () => void;
  onDeclineInsurance?: () => void;
  onTakeEvenMoney?: () => void;
  onDeclineEvenMoney?: () => void;
  isDealing?: boolean;
  gameState: {
    canHit: boolean;
    canStand: boolean;
    canDouble: boolean;
    canSplit: boolean;
    canSurrender: boolean;
    canDeal: boolean;
    currentBet: number;
    bankroll: number;
    playerHand: string[];
    dealerHand: string[];
    handValue: number;
    dealerValue: number;
    gameStatus: 'betting' | 'playing' | 'dealer-playing' | 'complete' | 'insurance-offered' | 'even-money-offered';
    message: string;
    insuranceBet: number;
    canTakeInsurance: boolean;
    canTakeEvenMoney: boolean;
    lastHandResult: 'won' | 'lost' | null;
    lastHandAmount: number;
  };
  // Shoe information
  cardsRemaining?: number;
  totalCardsInShoe?: number;
  penetration?: number;
  needsShuffle?: boolean;
  // Card counting
  runningCount?: number;
  trueCount?: number;
  // Testing mode
  isTestingMode?: boolean;
  onToggleTestingMode?: () => void;
}

export function GameUI({ onHit, onStand, onDouble, onSplit, onSurrender, onDeal, onBet, onClearBet, onTakeInsurance, onDeclineInsurance, onTakeEvenMoney, onDeclineEvenMoney, isDealing = false, gameState, cardsRemaining = 0, totalCardsInShoe = 0, penetration = 0, needsShuffle = false, runningCount = 0, trueCount = 0, isTestingMode = false, onToggleTestingMode }: GameUIProps) {
  const chipValues = [1, 5, 25, 100];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Game Status Panel */}
      <div className="absolute top-4 left-4 pointer-events-auto">
        <div className="bg-black bg-opacity-75 text-white p-4 rounded-lg min-w-64">
          <h2 className="text-xl font-bold mb-2">Game Status</h2>
          <div className="space-y-2 text-sm">
            <div>Bankroll: ${gameState.bankroll}</div>
            <div>
              {gameState.gameStatus === 'complete' && gameState.lastHandResult === 'won' 
                ? `Won: $${gameState.lastHandAmount.toFixed(2)}`
                : gameState.gameStatus === 'complete' && gameState.lastHandResult === 'lost'
                ? `Lost: $${gameState.lastHandAmount.toFixed(2)}`
                : `Current Bet: $${gameState.currentBet}`
              }
            </div>
            <div>Status: {gameState.message}</div>
            <div className="border-t border-gray-600 pt-2 mt-2">
              <div className="text-xs text-gray-300">6-Deck Shoe:</div>
              <div>Decks Left: {Math.floor(cardsRemaining / 52) + (cardsRemaining % 52 >= 26 ? 0.5 : 0.0)}</div>
              <div>Penetration: {(penetration * 100).toFixed(1)}%</div>
              <div>Cut Card Position: 75%</div>
              <div className="pt-2">
                <div>Running Count: {runningCount >= 0 ? '+' : ''}{runningCount.toFixed(1)}</div>
                <div>True Count: {trueCount >= 0 ? '+' : ''}{trueCount.toFixed(1)}</div>
              </div>
              {needsShuffle && <div className="text-yellow-400">🔄 Shuffle Next</div>}
            </div>
            {/* Testing Mode Toggle */}
            {onToggleTestingMode && (
              <div className="border-t border-gray-600 pt-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-300">Testing Mode</span>
                  <button
                    onClick={onToggleTestingMode}
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      isTestingMode ? 'bg-green-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        isTestingMode ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hand Information - Moved to bottom right */}
      <div className="absolute bottom-32 right-4 pointer-events-auto">
        <div className="bg-black bg-opacity-75 text-white p-4 rounded-lg min-w-48">
          <div className="space-y-3 text-sm">
            <div>
              <div className="font-semibold">Player Hand</div>
              <div>Value: {gameState.handValue}</div>
              <div className="text-xs text-gray-300">
                {gameState.playerHand.join(', ')}
              </div>
            </div>
            <div>
              <div className="font-semibold">Dealer Hand</div>
              <div>Value: {gameState.dealerValue}</div>
              <div className="text-xs text-gray-300">
                {gameState.dealerHand.join(', ')}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Betting Interface - Reorganized with centered title and horizontal layout */}
      {gameState.gameStatus === 'betting' && !isDealing && (
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <div className="bg-black bg-opacity-90 px-6 py-4 rounded-lg">
            {/* Top Row - Centered Title */}
            <div className="text-center mb-4">
              <span className="text-white text-lg font-semibold">Place Your Bet</span>
            </div>
            
            {/* Second Row - Clear, Chips, Deal */}
            <div className="flex items-center justify-center space-x-4">
              {/* Clear Button - shown when there are chips on table */}
              {gameState.currentBet > 0 && (
                <button
                  onClick={onClearBet}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm font-semibold transition-colors"
                >
                  Clear
                </button>
              )}
              
              {/* Spacer when no Clear button */}
              {gameState.currentBet === 0 && <div className="w-16"></div>}
              
              {/* Chip Selection - Horizontal layout with labels */}
              <div className="flex space-x-3">
                {chipValues.map((value) => (
                  <div key={value} className="flex flex-col items-center space-y-1">
                    {/* Denomination label above chip */}
                    <span className="text-white text-xs font-semibold">${value}</span>
                    
                    {/* Chip button */}
                    <button
                      onClick={() => onBet(value)}
                      disabled={gameState.bankroll < value}
                      className={`
                        relative w-12 h-12 transition-all border-2 border-transparent
                        ${gameState.bankroll >= value
                          ? 'hover:scale-110 cursor-pointer shadow-lg hover:shadow-xl'
                          : 'opacity-50 cursor-not-allowed grayscale'
                        }
                      `}
                      style={{
                        background: 'none',
                        padding: 0,
                      }}
                    >
                      {/* Chip Image */}
                      <img
                        src={`/chips/chip-${value}.png`}
                        alt={`$${value} Chip`}
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          if (target.src.includes('.png')) {
                            target.src = `/chips/chip-${value}-hq.svg`;
                          } else if (target.src.includes('-hq.svg')) {
                            target.src = `/chips/chip-${value}.svg`;
                          } else {
                            target.style.display = 'none';
                            const button = target.parentElement;
                            if (button) {
                              button.innerHTML += `<span class="absolute inset-0 flex items-center justify-center text-white font-bold bg-gray-600 rounded-full text-xs">$${value}</span>`;
                            }
                          }
                        }}
                      />
                    </button>
                  </div>
                ))}
              </div>

              {/* Deal Button - shown when bet is placed */}
              {gameState.currentBet > 0 && (
                <button
                  onClick={onDeal}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition-colors text-sm"
                >
                  Deal Cards
                </button>
              )}
              
              {/* Spacer when no Deal button */}
              {gameState.currentBet === 0 && <div className="w-20"></div>}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {(gameState.gameStatus === 'playing' || gameState.gameStatus === 'insurance-offered') && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <div className="bg-black bg-opacity-75 p-6 rounded-lg">
            <div className="flex space-x-4">
              <button
                onClick={onHit}
                disabled={!gameState.canHit}
                className={`
                  px-6 py-3 rounded-lg font-semibold transition-all
                  ${gameState.canHit
                    ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Hit
              </button>
              
              <button
                onClick={onStand}
                disabled={!gameState.canStand}
                className={`
                  px-6 py-3 rounded-lg font-semibold transition-all
                  ${gameState.canStand
                    ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Stand
              </button>
              
              <button
                onClick={onDouble}
                disabled={!gameState.canDouble}
                className={`
                  px-6 py-3 rounded-lg font-semibold transition-all
                  ${gameState.canDouble
                    ? 'bg-yellow-600 hover:bg-yellow-700 text-white cursor-pointer'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Double
              </button>
              
              <button
                onClick={onSplit}
                disabled={!gameState.canSplit}
                className={`
                  px-6 py-3 rounded-lg font-semibold transition-all
                  ${gameState.canSplit
                    ? 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Split
              </button>
              
              <button
                onClick={onSurrender}
                disabled={!gameState.canSurrender}
                className={`
                  px-6 py-3 rounded-lg font-semibold transition-all
                  ${gameState.canSurrender
                    ? 'bg-orange-600 hover:bg-orange-700 text-white cursor-pointer'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Surrender
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Insurance Offer - When dealer shows Ace */}
      {gameState.gameStatus === 'insurance-offered' && (() => {
        const insuranceAmount = Math.floor(gameState.currentBet / 2);
        return (
          <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 pointer-events-auto">
            <div className="bg-black bg-opacity-90 p-6 rounded-lg text-center">
              <div className="text-white mb-4">
                <div className="text-lg font-semibold mb-2">Insurance Available</div>
                <div className="text-sm mb-4">Dealer shows Ace. Take insurance for ${insuranceAmount}?</div>
              </div>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={onTakeInsurance}
                  disabled={!gameState.canTakeInsurance}
                  className={`
                    px-6 py-3 rounded-lg font-semibold transition-all
                    ${gameState.canTakeInsurance
                      ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  Yes (${insuranceAmount})
                </button>
                <button
                  onClick={onDeclineInsurance}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Even Money Offer - When player has blackjack and dealer shows Ace */}
      {gameState.gameStatus === 'even-money-offered' && (
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <div className="bg-black bg-opacity-90 p-6 rounded-lg text-center">
            <div className="text-white mb-4">
              <div className="text-lg font-semibold mb-2">Even Money Available</div>
              <div className="text-sm mb-4">You have blackjack! Take even money (1:1) for guaranteed win?</div>
              <div className="text-xs text-gray-300 mb-4">
                Even money: ${gameState.currentBet} guaranteed vs Risk push for ${Math.floor(gameState.currentBet * 1.5)} payout
              </div>
            </div>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={onTakeEvenMoney}
                disabled={!gameState.canTakeEvenMoney}
                className={`
                  px-6 py-3 rounded-lg font-semibold transition-all
                  ${gameState.canTakeEvenMoney
                    ? 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                Take Even Money (${gameState.currentBet})
              </button>
              <button
                onClick={onDeclineEvenMoney}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all cursor-pointer"
              >
                Risk It (3:2 payout)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dealer Playing - Show status without New Hand button */}
      {gameState.gameStatus === 'dealer-playing' && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <div className="bg-black bg-opacity-75 text-white p-6 rounded-lg text-center">
            <div className="text-lg font-semibold">{gameState.message}</div>
          </div>
        </div>
      )}

      {/* Game Complete - Show final result with New Hand button */}
      {gameState.gameStatus === 'complete' && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <div className="bg-black bg-opacity-75 text-white p-6 rounded-lg text-center">
            <div className="text-lg font-semibold mb-4">{gameState.message}</div>
            <button
              onClick={onDeal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              New Hand
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GameUI;