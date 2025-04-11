
'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Breadcrumb from '@/components/Common/Breadcrumb';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <main>
      <Breadcrumb pageName="Admin Dashboard Page" />
      <div className="flex min-h-[calc(100vh-64px)] bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        <div className="flex-1 min-w-0 p-6">
          {children}
        </div>
      </div>
    </main>
  );
}
