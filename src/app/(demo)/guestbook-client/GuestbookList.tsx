import { DeleteGuestbookEntry } from '@/components/DeleteGuestbookEntry';
import { EditableGuestbookEntry } from '@/components/EditableGuestbookEntry';
import { use } from 'react';

const GuestbookList = ({ guestbookPromise }: { guestbookPromise: Promise<{ id: number; username: string; body: string }[]> }) => {
  const guestbook = use(guestbookPromise);

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
