import React from 'react';
import { BlackjackTable3D } from '../components/game/BlackjackTable3D';

export function Game3DDemo() {
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="fixed top-0 left-0 z-10 p-4 bg-black bg-opacity-50">
        <h1 className="text-2xl font-bold text-white mb-2">Blackjack 3D Demo</h1>
        <p className="text-sm text-gray-300">
          Use mouse to rotate camera. Scroll to zoom.
        </p>
      </div>
      <BlackjackTable3D />
    </div>
  );
}

export default Game3DDemo;