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

export const dynamic = 'force-dynamic';

export default Guestbook;
