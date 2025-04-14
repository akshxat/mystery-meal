"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const UserDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        aria-label="User menu"
      >
        <div className="relative w-8 h-8 overflow-hidden rounded-full">
          <Image
            src="/images/user/user-01.png"
            alt="User"
            fill
            className="object-cover"
          />
        </div>
        <span className="hidden text-sm font-medium lg:block">John Doe</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div className="p-2">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown; 