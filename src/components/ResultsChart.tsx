import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { SimulationResults } from '../types/blackjack';
import { Card, CardHeader, CardContent, CardTitle } from './UI';

export interface ResultsChartProps {
  results: SimulationResults | null;
}

/**
 * A component that displays a chart of the simulation results.
 * @param {ResultsChartProps} props - The props for the component.
 * @returns {JSX.Element | null} The rendered component or null if there are no results.
 */
const ResultsChart: React.FC<ResultsChartProps> = ({ results }) => {
  if (!results?.sessionResults || results.sessionResults.length === 0) {
    return null;
  }

  const validSessionData = results.sessionResults.filter(
    (session) =>
      session &&
      typeof session.hands === 'number' &&
      typeof session.bankroll === 'number' &&
      isFinite(session.hands) &&
      isFinite(session.bankroll),
  );

  if (validSessionData.length === 0) {
    return (
      <Card className="bg-white shadow-md rounded-lg">
        <CardHeader className="border-b border-gray-200 px-6 py-4">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Session Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center text-gray-500 py-8">
            No valid chart data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="border-b border-gray-200 px-6 py-4">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Session Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={validSessionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="hands"
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => `Hand: ${value.toLocaleString()}`}
                formatter={(value: number, name: string) => [
                  name === 'bankroll'
                    ? `$${value.toLocaleString()}`
                    : value.toFixed(1),
                  name === 'bankroll' ? 'Bankroll' : 'True Count',
                ]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="bankroll"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsChart;
