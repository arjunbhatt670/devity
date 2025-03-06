import type { Metadata } from 'next';
import { logger } from '@/libs/Logger';

export const metadata: Metadata = {
  title: 'Dog Facts',
  description: 'Dog Facts description',
};

const DogFacts = async () => {
  const response = await fetch('https://dogapi.dog/api/facts?number=2');

  const data = await response.json() as { facts: string[]; success: boolean };

  logger.info('Dog facts fetched');

  return (
    <>
      <div className="mb-4">
        <h3 className="text-2xl font-bold">Dog Facts</h3>
        <h4 className="text-base">Here are some listed facts for your pet.</h4>
      </div>

      <ol className="list-disc">
        {data.facts.map(fact => <li className="list-item" key={fact}>{fact}</li>)}
      </ol>
    </>
  );
};

export const revalidate = 300;

export default DogFacts;
