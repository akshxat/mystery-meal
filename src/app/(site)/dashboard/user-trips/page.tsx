'use client';

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

const data = [
  { month: 'Jan', trips: 120 },
  { month: 'Feb', trips: 160 },
  { month: 'Mar', trips: 190 },
  { month: 'Apr', trips: 170 },
  { month: 'May', trips: 250 },
];

export default function UserTripsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        User Trips
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Monthly trip completions started through the app.
      </p>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Trips Completed Monthly
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="trips" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
