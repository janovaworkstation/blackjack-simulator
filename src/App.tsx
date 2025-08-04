import { useState } from 'react';
import BlackjackSimulator from './components/BlackjackSimulator';
import { Game3DDemo } from './pages/Game3DDemo';
import { InteractiveGamePage } from './pages/InteractiveGamePage';

type ViewType = 'simulator' | '3d-demo' | 'interactive';

function App() {
  const [view, setView] = useState<ViewType>('simulator');

  return (
    <div className="min-h-screen bg-gray-50" data-testid="blackjack-simulator">
      {/* Navigation - Hidden on interactive game page */}
      {view !== 'interactive' && (
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <h1 className="text-xl font-semibold text-gray-900">Blackjack Strategy Simulator</h1>
              <div className="flex space-x-4">
                <button
                  onClick={() => setView('simulator')}
                  className={`px-4 py-2 rounded-md ${
                    view === 'simulator'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Simulator
                </button>
                <button
                  onClick={() => setView('3d-demo')}
                  className={`px-4 py-2 rounded-md ${
                    view === '3d-demo'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  3D Demo
                </button>
                <button
                  onClick={() => setView('interactive')}
                  className={`px-4 py-2 rounded-md ${
                    view === 'interactive'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Play Game
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {view === 'simulator' && <BlackjackSimulator />}
      {view === '3d-demo' && <Game3DDemo />}
      {view === 'interactive' && <InteractiveGamePage setView={setView} />}
    </div>
  );
}

export default App;
