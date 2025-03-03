/* eslint-disable react-refresh/only-export-components */

const fetchBlog = () => Promise.resolve({
  name: 'test',
  id: 'test_id',
});

export async function getStaticProps() {
  const blog = await fetchBlog();
  return { props: { blog } };
}

export default function Page({ blog }: { blog: any }) {
  return <div>{blog.name}</div>;
}
