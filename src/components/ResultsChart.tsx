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
import { Card, CardHeader, CardContent, CardTitle } from './UI';

const ResultsChart = ({ results }) => {
  if (!results?.sessionResults || results.sessionResults.length === 0) {
    return null;
  }

  // Validate and clean session data
  const validSessionData = results.sessionResults.filter(
    (session) =>
      session &&
      typeof session.hand === 'number' &&
      typeof session.bankroll === 'number' &&
      typeof session.trueCount === 'number' &&
      isFinite(session.hand) &&
      isFinite(session.bankroll) &&
      isFinite(session.trueCount),
  );

  if (validSessionData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Session Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-gray-500 py-8">
            No valid chart data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Session Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={validSessionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="hand"
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(value) => `Hand: ${value.toLocaleString()}`}
                formatter={(value, name) => [
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
              <Line
                type="monotone"
                dataKey="trueCount"
                stroke="#dc2626"
                strokeWidth={1}
                dot={false}
                yAxisId="right"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsChart;
