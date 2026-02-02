'use client';

import { useEffect } from 'react';

export const EvaledScript = ({ script, url }: { script: string; url: string }) => {
  useEffect(() => {
    eval(script);
    console.log('script evaluated in client');

    // const script = document.createElement('script');
    // script.src = url;
    // script.onload = () => {
    //   console.log('script loaded in client');
    // };
    // document.body.appendChild(script);
  }, [script, url]);

  return <div id="custom-script-sink" />;
};
