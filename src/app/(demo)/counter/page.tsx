import { CounterForm } from '@/components/CounterForm';
import { CurrentCount } from '@/components/CurrentCount';
import { Suspense } from 'react';

export const metadata = {
  title: 'Counter',
  description: 'An example of DB operation',
};

export default function Counter() {
  return (
    <>
      <CounterForm />

      <div className="mt-3">
        <Suspense fallback={<p>Loading counter...</p>}>
          <CurrentCount />
        </Suspense>
      </div>
    </>
  );
};
