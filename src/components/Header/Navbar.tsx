'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import menuData from './menuData';

const NavMenu = () => {
  const { data: session } = useSession();

  // Combine base menu + conditional admin item
  const menuItems = [...menuData];

  console.log('Session: nav', session);

  

  return (
    <ul className="flex items-center gap-6">
      {menuItems.map((menu) => (
        <li key={menu.id}>
          <Link
            href={menu.path}
            target={menu.newTab ? '_blank' : '_self'}
            className="text-gray-700 dark:text-white hover:text-blue-500 transition"
          >
            {menu.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavMenu;
