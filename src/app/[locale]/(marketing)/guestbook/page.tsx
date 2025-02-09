import { AddGuestbookForm } from '@/components/AddGuestbookForm';
import { GuestbookList } from '@/components/GuestbookList';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Suspense } from 'react';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  const t = await getTranslations({
    locale,
    namespace: 'Guestbook',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const Guestbook = () => {
  const t = useTranslations('Guestbook');

  return (
    <>
      <AddGuestbookForm />

      <Suspense fallback={<p>{t('loading_guestbook')}</p>}>
        <GuestbookList />
      </Suspense>
    </>
  );
};

export const dynamic = 'force-dynamic';

export default Guestbook;
