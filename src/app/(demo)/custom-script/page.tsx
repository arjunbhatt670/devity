import type { Metadata } from 'next';

import { SafeScript } from './SafeScript';

export const metadata: Metadata = {
  title: 'Custom Script',
  description: 'Custom Script description',
};

const scriptUrl = 'http://localhost:3000/scripts/index.js';

const CustomScript = async () => {
  return <SafeScript url={scriptUrl} />;

  // const resp = await fetch(scriptUrl);
  // const script = await resp.text();

  // return <EvaledScript script={script} url={scriptUrl} />;
};

export default CustomScript;
