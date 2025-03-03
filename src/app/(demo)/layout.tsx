import { BaseTemplate } from '@/templates/BaseTemplate';
import Link from 'next/link';

export default function DemoLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <BaseTemplate
      leftNav={(
        <>
          <li>
            <Link
              href="/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/counter/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              Counter
            </Link>
          </li>
          <li>
            <Link
              href="/guestbook/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              Guestbook
            </Link>
          </li>
          <li>
            <Link
              href="/portfolio/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link
              href="/dog-facts/"
              className="border-none text-gray-700 hover:text-gray-900"
            >
              Dog Facts
            </Link>
          </li>
        </>
      )}
    >
      <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
    </BaseTemplate>
  );
}
