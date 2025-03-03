import { db } from '@/libs/DB';
import { logger } from '@/libs/Logger';
import { guestbookSchema } from '@/models/Schema';

import { DeleteGuestbookEntry } from './DeleteGuestbookEntry';
import { EditableGuestbookEntry } from './EditableGuestbookEntry';
// import { getBaseUrl } from '@/utils/Helpers';

// const cb = unstable_cache(async () => {
//   return await db
//     .select()
//     .from(guestbookSchema)
//     .orderBy(guestbookSchema.createdAt);
// }, [], {
//   revalidate: 10,
// });

const GuestbookList = async () => {
  const guestbook = await db
    .select()
    .from(guestbookSchema)
    .orderBy(guestbookSchema.createdAt);

  // const guestbook = await fetch(`${getBaseUrl()}/api/guestbook`, {
  //   // cache: 'force-cache',
  // }).then(resp => resp.json());

  logger.info('Get all guestbook entries');

  return (
    <div className="mt-5" data-testid="guestbook-list">
      {guestbook.map(elt => (
        <div key={elt.id} className="mb-1 flex items-center gap-x-1">
          <DeleteGuestbookEntry id={elt.id} />

          <EditableGuestbookEntry
            id={elt.id}
            username={elt.username}
            body={elt.body}
          />
        </div>
      ))}
    </div>
  );
};

export { GuestbookList };
