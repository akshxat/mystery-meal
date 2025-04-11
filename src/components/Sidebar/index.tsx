'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const navItems = [
  { label: 'Revisited Users', href: '/dashboard/revisited-users' },
  { label: 'User Trips', href: '/dashboard/user-trips' },
  { label: 'Plus Membership Users', href: '/dashboard/plus-members' },
];

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const pathname = usePathname();

  return (
    <aside
      className={`
        ${isCollapsed ? 'w-20' : 'w-64'}
        bg-white dark:bg-gray-800 shadow-md p-4 transition-all duration-300 overflow-hidden
      `}
    >
      <div className="flex justify-between items-center mb-4">
        {!isCollapsed && (
          <Link href="/dashboard">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white whitespace-nowrap overflow-hidden cursor-pointer hover:underline">
              MYSTERY MEALS
            </h2>
          </Link>
        )}
        <button
          className="text-gray-500 hover:text-black"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>


      <nav className="space-y-2 mt-4">
        {navItems.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            className={`
              flex items-center p-2 rounded text-sm transition
              ${pathname === href
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}
              ${isCollapsed ? 'justify-center' : ''}
            `}
          >
            <span
              className={`
                ${isCollapsed ? 'sr-only' : 'truncate'}
              `}
            >
              {label}
            </span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
