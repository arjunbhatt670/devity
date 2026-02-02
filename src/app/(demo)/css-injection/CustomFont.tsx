'use client';

import { useEffect } from 'react';

export const CustomFont = ({ fontUrl, fontFamily }: { fontUrl: string; fontFamily: string }) => {
  useEffect(() => {
    // const style = document.createElement('style');
    // style.textContent = `
    //     @font-face {
    //   font-family: '${fontFamily}';
    //   font-style: normal;
    //   font-weight: 400;
    //   font-display: swap;
    //   src: url(${fontUrl}) format('woff2');
    // }`;
    // document.body.appendChild(style);

    // const style = document.createElement('style');
    // style.textContent = `
    // @font-face {
    //   font-family: '${CSS.escape(fontFamily)}';
    //   font-style: normal;
    //   font-weight: 400;
    //   font-display: swap;
    //   src: url(${encodeURI(fontUrl)}) format('woff2');
    // }`;
    // document.body.appendChild(style);

    //  Using CSS Font Loading API (no style injection needed)
    const fontFace = new FontFace(fontFamily, `url(${fontUrl}) format('woff2')`, {
      style: 'normal',
      weight: '400',
      display: 'swap',
    });

    fontFace.load().then((loadedFace) => {
      document.fonts.add(loadedFace);
    });
  }, [fontUrl, fontFamily]);

  return (
    // Using the font family name directly for testing purposes
    <p className="font-[Playwrite_NZ_Basic_Guides]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
  );
};
