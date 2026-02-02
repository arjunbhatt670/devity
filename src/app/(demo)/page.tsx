import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to Home page!',
};

export default async function Index() {
  return <p>Welcome to Home page!</p>;
}
