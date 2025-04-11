'use client';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const data = [
  { month: 'Jan', members: 40 },
  { month: 'Feb', members: 80 },
  { month: 'Mar', members: 130 },
  { month: 'Apr', members: 160 },
  { month: 'May', members: 220 },
];

export default function PlusMembersPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Plus Membership Users
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Monthly growth in Mystery Meals Plus subscriptions.
      </p>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Plus Members Growth
        </h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorPlus" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="members"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorPlus)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
