import { logger } from '@/libs/Logger';
import { unstable_cache } from 'next/cache';

type Post = {
  title: string;
  content: string;
};

async function fetchPost() {
  const cache_get = unstable_cache(() => new Promise<Post>(res => setTimeout(() => {
    res({
      title: 'Post Title',
      content: 'Post content',
    });
  }, 3000)));

  const post = await cache_get();
  logger.info('Post fetched successfully');

  return post;
}

export async function PostCard() {
  const post = await fetchPost();

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.content}</p>
    </div>
  );
}
