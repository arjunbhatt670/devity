'use client';

import { AddGuestbookForm } from '@/components/AddGuestbookForm';
import { Suspense, useEffect, useState } from 'react';
import { GuestbookList } from './GuestbookList';

const Guestbook = () => {
  const [guestbookPromise, setGuestbookPromise] = useState<Promise<{ id: number; username: string; body: string; htmlContent: string }[]>>(Promise.resolve([]));

  useEffect(() => {
    setGuestbookPromise(fetch('/api/guestbook').then(resp => resp.json()).then((data) => {
      console.log('Get all guestbook entries - client');

      return data;
    }));
  }, []);

  useEffect(() => {
    const metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    metaDescription.content = 'An example of CRUD operation - Client';
    document.head.appendChild(metaDescription);

    const title = document.createElement('title');
    title.textContent = 'Guestbook | Client';
    document.head.appendChild(title);

    return () => {
      document.head.removeChild(metaDescription);
      document.head.removeChild(title);
    };
  }, []);

  return (
    <>
      <AddGuestbookForm />

      <Suspense fallback={<p>Loading guestbook...</p>}>
        <GuestbookList guestbookPromise={guestbookPromise} />
      </Suspense>
    </>
  );
};

export default Guestbook;
