import React from 'react';
import { InteractiveGame } from '../components/game/InteractiveGame';

type ViewType = 'simulator' | '3d-demo' | 'interactive';

interface InteractiveGamePageProps {
  setView: (view: ViewType) => void;
}

export function InteractiveGamePage({ setView }: InteractiveGamePageProps) {
  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* End Game button in top-right */}
      <button
        onClick={() => setView('simulator')}
        className="fixed top-4 right-4 z-20 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        End Game
      </button>

      {/* Top-centered Interactive Blackjack info box */}
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-10 p-6 bg-black bg-opacity-70 rounded-lg max-w-sm text-center">
        <h1 className="text-2xl font-bold text-white mb-3">Interactive Blackjack</h1>
        <p className="text-sm text-gray-300 mb-4">
          Place bets, make decisions, and play blackjack in 3D!
        </p>
        <div className="text-xs text-gray-400 space-y-1">
          <div>• Click chips to bet</div>
          <div>• Use action buttons to play</div>
        </div>
      </div>

      <InteractiveGame />
    </div>
  );
}

export default InteractiveGamePage;