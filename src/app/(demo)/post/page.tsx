import { CurrentCount } from '@/components/CurrentCount';
import { PostCard } from '@/components/PostCard';
import { Suspense } from 'react';

export default function PostPage() {
  return (
    <>
      <Suspense fallback={<p>Loading Post...</p>}>
        <PostCard />
      </Suspense>

      <p>Likes count</p>
      <Suspense fallback={<p>Loading likes...</p>}>
        <CurrentCount />
      </Suspense>
    </>
  );
}
