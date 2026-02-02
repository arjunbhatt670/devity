import type { Metadata } from 'next';
import { AcceptTnc } from './AcceptTnc';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page description',
};

type PageProps = {
  searchParams: Promise<{ returnTo: string }>;
};

export default async function About({ searchParams }: PageProps) {
  const { returnTo } = await searchParams;

  return (
    <>
      <p>Welcome to About page!</p>
      <AcceptTnc returnTo={returnTo} />
    </>
  );
};

// http://localhost:3000/about?returnTo=javascript:alert(%27XSS%27)
