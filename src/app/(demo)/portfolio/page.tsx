import Link from 'next/link';

export const metadata = {
  title: 'Portfolio',
  description: 'Welcome to my portfolio page!',
};

export default async function Portfolio() {
  return (
    <>
      <p>Welcome to my portfolio page! Here you will find a carefully curated collection of my work and accomplishments. Through this portfolio, I'm to showcase my expertise, creativity, and the value I can bring to your projects.</p>

      <div className="grid grid-cols-1 justify-items-start gap-3 md:grid-cols-2 xl:grid-cols-3">
        {Array.from(Array.from({ length: 6 }).keys()).map(elt => (
          <Link
            className="hover:text-blue-700"
            key={elt}
            href={`/portfolio/${elt}`}
          >
            {`Portfolio ${elt}`}
          </Link>
        ))}
      </div>
    </>
  );
};
