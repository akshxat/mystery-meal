'use client';

import { useEffect, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid,
} from 'recharts';

const data = [
  { year: '2020', sales: 5200 },
  { year: '2021', sales: 8700 },
  { year: '2022', sales: 11900 },
  { year: '2023', sales: 14300 },
  { year: '2024', sales: 16500 },
];

const SalesChart = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkDarkMode();

    const observer = new MutationObserver(() => {
      checkDarkMode();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow mb-10">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Sales Per Year
      </h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="year"
              stroke="#4B5563"
              tick={{ fill: 'currentColor' }}
            />
            <YAxis
              stroke="#4B5563"
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                color: 'white',
              }}
              labelStyle={{ color: '#9ca3af' }}
              itemStyle={{ color: 'white' }}
            />
            <Bar
              dataKey="sales"
              fill={isDarkMode ? '#60a5fa' : '#000080'}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default SalesChart;
