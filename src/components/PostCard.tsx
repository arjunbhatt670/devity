import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { guestbookSchema } from '@/models/Schema';
import { desc } from 'drizzle-orm';
import { connection } from 'next/server';

type Post = {
  title: string;
  content: string;
};

async function fetchPost(): Promise<Post> {
  await connection();

  const latestGuestbook = await db
    .select()
    .from(guestbookSchema)
    .orderBy(desc(guestbookSchema.createdAt))
    .limit(1)
    .then(rows => rows[0]);

  const post = {
    title: latestGuestbook?.username ?? '',
    content: latestGuestbook?.body ?? '',
  };

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
