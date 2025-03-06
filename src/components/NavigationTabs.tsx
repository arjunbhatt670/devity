'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }, { name: 'Counter', path: '/counter' }, { name: 'Guestbook', path: '/guestbook' }, { name: 'Guestbook Client', path: '/guestbook-client' }, { name: 'Portfolio', path: '/portfolio' }, { name: 'Dog Facts', path: '/dog-facts' }];

export function NavigationTabs() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-wrap gap-x-5 text-xl">
      {tabs.map(tab => (
        <li key={tab.path}>
          <Link
            href={tab.path}
            className={tab.path === pathname ? 'text-blue-500 border-b-2 border-blue-500' : 'border-none text-gray-700 hover:text-gray-900'}
          >
            {tab.name}
          </Link>
        </li>
      ))}
    </ul>

  );
}
