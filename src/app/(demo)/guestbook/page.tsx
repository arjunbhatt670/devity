import type { Metadata } from 'next';
import { AddGuestbookForm } from '@/components/AddGuestbookForm';
import { GuestbookList } from '@/components/GuestbookList';

import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Guestbook',
  description: 'An example of CRUD operation',
};

const Guestbook = () => {
  return (
    <>
      <AddGuestbookForm />

      <Suspense fallback={<p>Loading guestbook...</p>}>
        <GuestbookList />
      </Suspense>
    </>
  );
};

export default Guestbook;

// <img src=x onerror="javascript:alert('XSS')">
// <a href="javascript:alert('XSS')">Click me</a>
// <script>alert('XSS')</script>
