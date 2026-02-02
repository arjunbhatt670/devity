import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Array.from(Array.from({ length: 6 }).keys()).map(elt => ({
    slug: `${elt}`,
  }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { slug } = await props.params;

  return {
    title: `Portfolio ${slug}`,
    description: `Portfolio ${slug} description`,
  };
}

export default async function PortfolioDetail(props: Props) {
  const { slug } = await props.params;
  const decodedSlug = decodeURIComponent(slug);

  return (
    <>
      {/* <h1
        className="capitalize"
        dangerouslySetInnerHTML={{
          __html: `Portfolio ${decodedSlug}`,
        }}
      /> */}
      <h1 className="capitalize">{`Portfolio ${decodedSlug}`}</h1>
      <p>Created a set of promotional materials and branding elements for a corporate event. Crafted a visually unified theme, encompassing a logo, posters, banners, and digital assets. Integrated the client's brand identity while infusing it with a contemporary and innovative approach. Garnered favorable responses from event attendees, resulting in a successful event with heightened participant engagement and increased brand visibility.</p>
    </>
  );
};

// http://localhost:3000/portfolio/%3Cimg%20src=x%20onerror=alert(%22XSS%22)%3E
