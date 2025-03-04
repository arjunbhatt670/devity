import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { counterSchema } from '@/models/Schema';
import { eq } from 'drizzle-orm';
import { headers } from 'next/headers';

export const CurrentCount = async () => {
  const id = Number((await headers()).get('id')) ?? 0;
  const result = await db.query.counterSchema.findMany({
    where: eq(counterSchema.id, id),
  });
  const count = result[0]?.count ?? 0;

  logger.info('Counter fetched successfully');

  return (
    <div>
      {`Count: ${count}`}
    </div>
  );
};
