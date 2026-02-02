import { PostCard } from '@/components/PostCard';
import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { guestbookSchema } from '@/models/Schema';
import { desc } from 'drizzle-orm';
import { connection } from 'next/server';
import { Suspense } from 'react';

async function fetchGuestbook(): Promise<typeof guestbookSchema.$inferSelect> {
  await connection();

  try {
    const latestGuestbook = await db
      .select()
      .from(guestbookSchema)
      .orderBy(desc(guestbookSchema.createdAt))
      .limit(1)
      .then(rows => rows[0]);

    logger.info('Guestbook fetched successfully');

    return latestGuestbook!;
  } catch (error) {
    logger.error(error, 'An error occurred while fetching the guestbook');
    throw error;
  }
}

export default async function PostPage() {
  const { username, body, htmlContent } = await fetchGuestbook();

  return (
    <>
      <Suspense fallback={<p>Loading Post...</p>}>
        <PostCard username={username} body={body} htmlContent={htmlContent} />
      </Suspense>
    </>
  );
}
