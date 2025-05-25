import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from './UI';

const HandDetailsTable = ({ handDetails }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [handsPerPage] = useState(50);
  
  if (!handDetails || handDetails.length === 0) {
    return null;
  }

  const totalPages = Math.ceil(handDetails.length / handsPerPage);
  const startIndex = currentPage * handsPerPage;
  const endIndex = startIndex + handsPerPage;
  const currentHands = handDetails.slice(startIndex, endIndex);

  const formatCards = (cards) => {
    return cards.join(', ');
  };

  const getOutcomeColor = (winnings) => {
    if (winnings > 0) return 'text-green-600';
    if (winnings < 0) return 'text-red-600';
    return 'text-yellow-600'; // push (0)
  };

  // Calculate running bankroll
  const handsWithBankroll = currentHands.map((hand, index) => {
    const startIndex = currentPage * handsPerPage;
    const actualIndex = startIndex + index;
    
    // Calculate bankroll up to this point
    let runningBankroll = 0;
    for (let i = 0; i <= actualIndex && i < handDetails.length; i++) {
      runningBankroll += handDetails[i].winnings || 0;
    }
    
    return { ...hand, runningBankroll };
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hand-by-Hand Details ({handDetails.length} hands tracked)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-center p-2">
                    <div>Running</div>
                    <div>Count</div>
                  </th>
                  <th className="text-center p-2">
                    <div>True</div>
                    <div>Count</div>
                  </th>
                  <th className="text-center p-2">
                    <div>Hand</div>
                    <div>#</div>
                  </th>
                  <th className="text-center p-2">
                    <div>Initial</div>
                    <div>Cards</div>
                  </th>
                  <th className="text-center p-2">
                    <div>Initial</div>
                    <div>Action</div>
                  </th>
                  <th className="text-center p-2">
                    <div>Final</div>
                    <div>Cards</div>
                  </th>
                  <th className="text-center p-2">Bet</th>
                  <th className="text-center p-2">Outcome</th>
                  <th className="text-center p-2">Bankroll</th>
                </tr>
              </thead>
              <tbody>
                {handsWithBankroll.map((hand, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 text-center">{hand.runningCountStart}</td>
                    <td className="p-2 text-center">{hand.trueCountStart?.toFixed(1)}</td>
                    <td className="p-2 text-center">{hand.handNumber}</td>
                    <td className="p-2 text-center">
                      <div className="text-xs">
                        <div>P: {formatCards(hand.playerCardsInitial)} {hand.playerBlackjack && <span className="text-blue-600">(BJ)</span>}</div>
                        <div>D: {hand.dealerCardsInitial?.[0]}, X {hand.dealerBlackjack && <span className="text-blue-600">(BJ)</span>}</div>
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      <div className="text-xs">
                        {hand.initialAction || 'N/A'}
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      <div className="text-xs">
                        <div>P: {hand.playerCardsFinal || formatCards(hand.playerCardsInitial)}</div>
                        <div>D: {formatCards(hand.dealerCardsFinal || hand.dealerCardsInitial)}</div>
                      </div>
                    </td>
                    <td className="p-2 text-center">${hand.totalBet}</td>
                    <td className={`p-2 text-center font-medium ${getOutcomeColor(hand.winnings)}`}>
                      ${Math.abs(hand.winnings)}
                    </td>
                    <td className={`p-2 text-center font-medium ${hand.runningBankroll >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${Math.abs(hand.runningBankroll)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:bg-gray-300"
              >
                Previous
              </button>
              
              <span className="text-sm text-gray-600">
                Page {currentPage + 1} of {totalPages} 
                (Hands {startIndex + 1}-{Math.min(endIndex, handDetails.length)})
              </span>
              
              <button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:bg-gray-300"
              >
                Next
              </button>
            </div>
          )}
          
          <div className="mt-4 p-3 bg-blue-50 rounded text-xs">
            <h4 className="font-semibold mb-2">Column Explanations:</h4>
            <ul className="space-y-1 text-blue-800 mb-3">
              <li>• <strong>Initial Cards:</strong> Player's 2 cards vs Dealer's up card, X (hole card hidden)</li>
              <li>• <strong>Initial Action:</strong> What basic strategy says to do with these cards</li>
              <li>• <strong>Final Cards:</strong> All cards after hits, doubles, splits for both player and dealer</li>
              <li>• <strong>Outcome:</strong> Amount won/lost for this hand (+$15, -$10, $0)</li>
              <li>• <strong>Bankroll:</strong> Running total of all outcomes from hand 1 to current hand</li>
            </ul>
            <h4 className="font-semibold mb-2">Basic Strategy Verification:</h4>
            <ul className="space-y-1 text-blue-800">
              <li>• Check if Initial Action matches correct basic strategy for the situation</li>
              <li>• Compare bet amounts to your betting table for the given true count</li>
              <li>• Verify Final Cards show proper play execution (hits, doubles, stands)</li>
              <li>• Confirm dealer follows rules: hits until 17+, hits soft 17 if enabled</li>
              <li>• Look for patterns in losses - concentrated at certain counts or situations?</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HandDetailsTable;