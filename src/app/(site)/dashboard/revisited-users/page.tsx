'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const data = [
  { date: 'Jan', users: 120 },
  { date: 'Feb', users: 180 },
  { date: 'Mar', users: 240 },
  { date: 'Apr', users: 200 },
  { date: 'May', users: 300 },
];

export default function RevisitedUsersPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Revisited Users
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        This graph shows returning user trends over the past few months.
      </p>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Monthly Revisited Users
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
