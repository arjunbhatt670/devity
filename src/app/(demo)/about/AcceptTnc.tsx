'use client';
import { useRouter } from 'next/navigation';

export function AcceptTnc({ returnTo }: { returnTo: string }) {
  const router = useRouter();

  return (
    <button
      className="rounded bg-blue-500 px-5 py-1 font-bold text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300/50"
      type="button"
      onClick={() => {
        router.push(returnTo);
        // window.location.href = returnTo;
      }}
    >
      Accept T&C
    </button>
  );
};
