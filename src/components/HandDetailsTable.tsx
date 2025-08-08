import React, { useState, useMemo } from 'react';
import { HandDetails } from '../types/blackjack';
import { Card, CardHeader, CardContent, CardTitle, Button } from './UI';
import { debugContext } from '../utils/debug';

export interface HandDetailsTableProps {
  handDetails: HandDetails[];
}

/**
 * A component that displays a paginated table of hand-by-hand simulation results.
 * @param {HandDetailsTableProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered component or null if there are no details.
 */
const HandDetailsTable: React.FC<HandDetailsTableProps> = ({ handDetails }) => {
  if (!handDetails || handDetails.length === 0) {
    return null;
  }

  const formatCards = (cards: string[]): string => {
    return cards.join(', ');
  };

  const formatAction = (action: string | undefined): string => {
    if (!action) return 'N/A';
    
    const actionMap: { [key: string]: string } = {
      'H': 'Hit',
      'S': 'Stand',
      'D': 'Double',
      'P': 'Split',
      'R': 'Surrender',
    };
    
    return actionMap[action] || action;
  };

  const downloadCSV = () => {
    debugContext('EXPORT', `Download CSV clicked, processing ${handDetails.length} hands`);

    const headers = [
      'Hand #',
      'Decks Remaining',
      'Running Count',
      'True Count',
      'Initial Wager',
      'Initial Cards (Simple)',
      'Dealer Initial (Simple)',
      'Initial Cards (Suits)',
      'Dealer Initial (Suits)',
      'Initial Action',
      'Total Wager',
      'Final Cards (Simple)',
      'Dealer Final (Simple)',
      'Final Cards (Suits)',
      'Dealer Final (Suits)',
      'Outcome',
      'Running Bankroll',
    ];

    // Calculate running bankroll efficiently for CSV export
    let runningBankroll = 0;
    const csvData = handDetails.map((hand) => {
      runningBankroll += hand.winnings || 0;

      return [
        hand.handId && hand.splitHandCount > 1 
          ? `${hand.handNumber}${String.fromCharCode(97 + hand.subHandId)}`  // "123a", "123b", etc.
          : hand.handNumber,
        hand.shuffleOccurred
          ? 'Shuffle'
          : (hand.decksRemaining?.toFixed(1) ?? 'N/A'),
        hand.shuffleOccurred ? 'Shuffle' : hand.runningCountStart,
        hand.shuffleOccurred
          ? 'Shuffle'
          : (hand.trueCountStart?.toFixed(1) ?? 'N/A'),
        `$${hand.betAmount}`,
        `P: ${formatCards(hand.playerCardsInitial)}${
          hand.playerBlackjack ? ' (BJ)' : ''
        }`,
        `D: ${hand.dealerCardsInitial?.[0]}, X${
          hand.dealerBlackjack ? ' (BJ)' : ''
        }`,
        `P: ${formatCards(hand.playerCardsInitialWithSuits || [])}${
          hand.playerBlackjack ? ' (BJ)' : ''
        }`,
        `D: ${hand.dealerCardsInitialWithSuits?.[0] || 'N/A'}, X${
          hand.dealerBlackjack ? ' (BJ)' : ''
        }`,
        formatAction(hand.initialAction),
        `$${hand.totalBet}`,
        `P: ${
          hand.playerCardsFinal
            ? formatCards(hand.playerCardsFinal)
            : formatCards(hand.playerCardsInitial)
        }`,
        `D: ${
          hand.dealerCardsFinal
            ? formatCards(hand.dealerCardsFinal)
            : formatCards(hand.dealerCardsInitial)
        }`,
        `P: ${
          hand.playerCardsFinalWithSuits
            ? formatCards(hand.playerCardsFinalWithSuits)
            : formatCards(hand.playerCardsInitialWithSuits || [])
        }`,
        `D: ${
          hand.dealerCardsFinalWithSuits
            ? formatCards(hand.dealerCardsFinalWithSuits)
            : formatCards(hand.dealerCardsInitialWithSuits || [])
        }`,
        hand.winnings > 0 ? `Win ($${hand.winnings})` : 
        hand.winnings < 0 ? `Loss ($${Math.abs(hand.winnings)})` : 
        `Push ($0)`,
        `$${runningBankroll.toFixed(2)}`,
      ];
    });

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    debugContext('EXPORT', `CSV content generated`, { length: csvContent.length, hands: handDetails.length });
    
    try {
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = `blackjack-hand-details-${new Date().toISOString().slice(0, 10)}.csv`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      URL.revokeObjectURL(url);
      
      debugContext('EXPORT', 'CSV download initiated successfully');
    } catch (error) {
      console.error('Error downloading CSV:', error);
      alert('Error downloading CSV file. Check console for details.');
    }
  };

  const getOutcomeColor = (winnings: number): string => {
    if (winnings > 0) return 'text-green-600';
    if (winnings < 0) return 'text-red-600';
    return 'text-yellow-600'; // push (0)
  };

  // Calculate running bankroll efficiently in O(n) time instead of O(n²)
  const handsWithBankroll = useMemo(() => {
    let runningTotal = 0;
    return handDetails.map((hand) => {
      runningTotal += hand.winnings || 0;
      return { ...hand, runningBankroll: runningTotal };
    });
  }, [handDetails]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  const totalPages = Math.ceil(handsWithBankroll.length / itemsPerPage);
  
  // Get current page data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = handsWithBankroll.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="border-b border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Hand-by-Hand Details ({handDetails.length} hands tracked)
          </CardTitle>
          <Button
            onClick={downloadCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          >
            Download CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-16 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hand</th>
                <th className="w-20 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Decks Left</th>
                <th className="w-20 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">R-Count</th>
                <th className="w-20 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">T-Count</th>
                <th className="w-20 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bet</th>
                <th className="w-48 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Initial Cards</th>
                <th className="w-20 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                <th className="w-20 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Bet</th>
                <th className="w-48 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Cards</th>
                <th className="w-20 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Outcome</th>
                <th className="w-24 px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bankroll</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentPageData.map((hand, index) => {
                const globalIndex = startIndex + index;
                const isEven = globalIndex % 2 === 0;
                
                return (
                  <tr key={globalIndex} className={isEven ? 'bg-white' : 'bg-gray-50'}>
                    <td className="w-16 px-2 py-2 text-center text-xs">
                      {hand.handId && hand.splitHandCount > 1 
                        ? `${hand.handNumber}${String.fromCharCode(97 + hand.subHandId)}`
                        : hand.handNumber}
                    </td>
                    <td className="w-20 px-2 py-2 text-center text-xs">
                      {hand.shuffleOccurred
                        ? 'Shuffle'
                        : hand.decksRemaining?.toFixed(1)}
                    </td>
                    <td className="w-20 px-2 py-2 text-center text-xs">
                      {hand.shuffleOccurred
                        ? 'Shuffle'
                        : hand.runningCountStart}
                    </td>
                    <td className="w-20 px-2 py-2 text-center text-xs font-bold">
                      {hand.shuffleOccurred
                        ? 'Shuffle'
                        : hand.trueCountStart?.toFixed(1)}
                    </td>
                    <td className="w-20 px-2 py-2 text-center text-xs font-bold">${hand.betAmount}</td>
                    <td className="w-48 px-2 py-2 text-xs">
                      P: {formatCards(hand.playerCardsInitial)}
                      {hand.playerBlackjack ? ' (BJ)' : ''}
                      <br />
                      D: {hand.dealerCardsInitial?.[0]}, X
                      {hand.dealerBlackjack ? ' (BJ)' : ''}
                    </td>
                    <td className="w-20 px-2 py-2 text-center text-xs">{formatAction(hand.initialAction)}</td>
                    <td className="w-20 px-2 py-2 text-center text-xs">${hand.totalBet}</td>
                    <td className="w-48 px-2 py-2 text-xs">
                      P: {hand.playerCardsFinal
                        ? formatCards(hand.playerCardsFinal)
                        : formatCards(hand.playerCardsInitial)}
                      <br />
                      D: {hand.dealerCardsFinal
                        ? formatCards(hand.dealerCardsFinal)
                        : formatCards(hand.dealerCardsInitial)}
                    </td>
                    <td className={`w-20 px-2 py-2 text-center text-xs font-medium ${getOutcomeColor(hand.winnings)}`}>
                      {hand.winnings > 0
                        ? 'Win'
                        : hand.winnings < 0
                          ? 'Loss'
                          : 'Push'} (${Math.abs(hand.winnings)})
                    </td>
                    <td className="w-24 px-2 py-2 text-center text-xs">${hand.runningBankroll.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>
              Showing {startIndex + 1}-{Math.min(endIndex, handsWithBankroll.length)} of {handsWithBankroll.length} hands
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-xs"
              >
                First
              </Button>
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-xs"
              >
                Previous
              </Button>
              <span>Page {currentPage} of {totalPages}</span>
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-xs"
              >
                Next
              </Button>
              <Button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-xs"
              >
                Last
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HandDetailsTable;