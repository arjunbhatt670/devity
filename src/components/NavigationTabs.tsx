'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about?returnTo=/' },
  // { name: 'Counter', path: '/counter' },
  { name: 'Guestbook', path: '/guestbook' },
  { name: 'Portfolio', path: '/portfolio' },
  // { name: 'Dog Facts', path: '/dog-facts' },
  { name: 'Post', path: '/post' },
  { name: 'Custom Script', path: '/custom-script' },
  { name: 'CSS Injection', path: '/css-injection' },
];

export function NavigationTabs() {
  const pathname = usePathname();

  return (
    <ul className="flex flex-wrap gap-x-5 text-xl">
      {tabs.map(tab => (
        <li key={tab.path}>
          <Link
            href={tab.path}
            className={tab.path.split('?')[0] === pathname ? 'text-blue-500 border-b-2 border-blue-500' : 'border-none text-gray-700 hover:text-gray-900'}
          >
            {tab.name}
          </Link>
        </li>
      ))}
    </ul>

  );
}
