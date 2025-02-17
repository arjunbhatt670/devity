/* eslint-disable react-refresh/only-export-components */

import type { GetStaticPaths } from 'next';
import { routing } from '@/libs/i18nNavigation';

const fetchBlog = () => Promise.resolve({
  name: 'test',
  id: 'test_id',
});

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: routing.locales.map(locale => ({
      params: { locale },
    })),
    fallback: false,
  };
};

export async function getStaticProps() {
  const blog = await fetchBlog();
  return { props: { blog } };
}

export default function Page({ blog }: { blog: any }) {
  return <div>{blog.name}</div>;
}
