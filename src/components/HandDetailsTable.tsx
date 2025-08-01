import React, { useState } from 'react';
import { HandDetails } from '../types/blackjack';
import { Card, CardHeader, CardContent, CardTitle, Button } from './UI';

export interface HandDetailsTableProps {
  handDetails: HandDetails[];
}

/**
 * A component that displays a paginated table of hand-by-hand simulation results.
 * @param {HandDetailsTableProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered component or null if there are no details.
 */
const HandDetailsTable: React.FC<HandDetailsTableProps> = ({ handDetails }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [handsPerPage] = useState(50);

  if (!handDetails || handDetails.length === 0) {
    return null;
  }

  const totalPages = Math.ceil(handDetails.length / handsPerPage);
  const startIndex = currentPage * handsPerPage;
  const endIndex = startIndex + handsPerPage;
  const currentHands = handDetails.slice(startIndex, endIndex);

  const formatCards = (cards: string[]): string => {
    return cards.join(', ');
  };

  const downloadCSV = () => {
    const headers = [
      'Hand #',
      'Running Count',
      'True Count',
      'Initial Wager',
      'Initial Cards - Player',
      'Initial Cards - Dealer',
      'Initial Action',
      'Total Wager',
      'Final Cards - Player',
      'Final Cards - Dealer',
      'Outcome',
      'Bankroll',
    ];

    const csvData = handDetails.map((hand) => {
      const bankrollUpToHand = handDetails
        .slice(0, hand.handNumber)
        .reduce((sum, h) => sum + (h.winnings || 0), 0);

      return [
        hand.handNumber,
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
        hand.initialAction || 'N/A',
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
        `$${Math.abs(hand.winnings)}`,
        `$${bankrollUpToHand.toFixed(2)}`,
      ];
    });

    const csvContent = [headers, ...csvData]
      .map((row) => row.map((cell) => `"${String(cell)}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute(
        'download',
        `blackjack-hand-details-${new Date().toISOString().slice(0, 10)}.csv`,
      );
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const getOutcomeColor = (winnings: number): string => {
    if (winnings > 0) return 'text-green-600';
    if (winnings < 0) return 'text-red-600';
    return 'text-yellow-600'; // push (0)
  };

  // Calculate running bankroll for the current page
  const handsWithBankroll = currentHands.map((hand, index) => {
    const actualIndex = startIndex + index;
    const runningBankroll = handDetails
      .slice(0, actualIndex + 1)
      .reduce((sum, h) => sum + (h.winnings || 0), 0);
    return { ...hand, runningBankroll };
  });

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
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left font-semibold text-gray-600">
                  Hand
                </th>
                <th className="p-3 text-left font-semibold text-gray-600">
                  True Count
                </th>
                <th className="p-3 text-left font-semibold text-gray-600">
                  Initial Wager
                </th>
                <th className="p-3 text-left font-semibold text-gray-600">
                  Initial Cards
                </th>
                <th className="p-3 text-left font-semibold text-gray-600">
                  Initial Action
                </th>
                <th className="p-3 text-left font-semibold text-gray-600">
                  Total Wager
                </th>
                <th className="p-3 text-left font-semibold text-gray-600">
                  Final Cards
                </th>
                <th className="p-3 text-left font-semibold text-gray-600">
                  Outcome
                </th>
                <th className="p-3 text-left font-semibold text-gray-600">
                  Bankroll
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {handsWithBankroll.map((hand) => (
                <tr key={hand.handNumber} className="hover:bg-gray-50">
                  <td className="p-3">{hand.handNumber}</td>
                  <td className="p-3">
                    {hand.shuffleOccurred
                      ? 'Shuffle'
                      : hand.trueCountStart?.toFixed(1)}
                  </td>
                  <td className="p-3">${hand.betAmount}</td>
                  <td className="p-3">
                    P: {formatCards(hand.playerCardsInitial)}
                    {hand.playerBlackjack ? ' (BJ)' : ''}
                    <br />
                    D: {hand.dealerCardsInitial?.[0]}, X
                    {hand.dealerBlackjack ? ' (BJ)' : ''}
                  </td>
                  <td className="p-3">{hand.initialAction || 'N/A'}</td>
                  <td className="p-3">${hand.totalBet}</td>
                  <td className="p-3">
                    P:{' '}
                    {hand.playerCardsFinal
                      ? formatCards(hand.playerCardsFinal)
                      : formatCards(hand.playerCardsInitial)}
                    <br />
                    D:{' '}
                    {hand.dealerCardsFinal
                      ? formatCards(hand.dealerCardsFinal)
                      : formatCards(hand.dealerCardsInitial)}
                  </td>
                  <td
                    className={`p-3 font-medium ${getOutcomeColor(hand.winnings)}`}
                  >
                    {hand.winnings > 0
                      ? 'Win'
                      : hand.winnings < 0
                        ? 'Loss'
                        : 'Push'}{' '}
                    ($
                    {Math.abs(hand.winnings)})
                  </td>
                  <td className="p-3">${hand.runningBankroll.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      {totalPages > 1 && (
        <div className="p-4 border-t border-gray-200 flex justify-center items-center space-x-2">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="px-3 py-1"
          >
            Previous
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage + 1} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
            }
            disabled={currentPage === totalPages - 1}
            className="px-3 py-1"
          >
            Next
          </Button>
        </div>
      )}
    </Card>
  );
};

export default HandDetailsTable;
