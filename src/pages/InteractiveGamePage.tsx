import React from 'react';
import { InteractiveGame } from '../components/game/InteractiveGame';

export function InteractiveGamePage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed top-24 right-4 z-10 p-4 bg-black bg-opacity-50 max-w-xs">
        <h1 className="text-xl font-bold text-white mb-2">Interactive Blackjack</h1>
        <p className="text-sm text-gray-300">
          Place bets, make decisions, and play blackjack in 3D!
        </p>
        <div className="mt-2 text-xs text-gray-400">
          <div>• Click chips to bet</div>
          <div>• Use action buttons to play</div>
          <div>• Mouse drag to rotate camera</div>
        </div>
      </div>
      <InteractiveGame />
    </div>
  );
}

export default InteractiveGamePage;