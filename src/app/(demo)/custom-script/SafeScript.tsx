import { headers } from 'next/headers';
import Script from 'next/script';

export const SafeScript = async ({ url }: { url: string }) => {
  const nonce = (await headers()).get('x-nonce');

  return (
    <>
      <Script
        src={url}
        strategy="afterInteractive"
        nonce={nonce!}
      />
      <div id="custom-script-sink" />
    </>
  );
};
