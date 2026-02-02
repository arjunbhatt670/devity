import type { Metadata } from 'next';
import { connection } from 'next/server';
import { Suspense } from 'react';
import '@/styles/global.css';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

async function RootLayout(props: {
  children: React.ReactNode;
}) {
  await connection();
  return (
    <html lang="en">
      <body>
        {props.children}
      </body>
    </html>
  );
}

export default function RootLayoutWithSuspense({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<p>Loading Root Layout...</p>}>
      <RootLayout children={children} />
    </Suspense>
  );
};
