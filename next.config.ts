import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';
import './src/libs/Env';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  cacheComponents: true,
  // async headers() {
  //   return [
  //     {
  //       // source: '/:path*',
  //       source: '/((?!counter).*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: [
  //             'default-src \'self\'',
  //             'script-src \'self\' \'unsafe-inline\'',
  //             'style-src \'self\' \'unsafe-inline\'',
  //           ].join('; '),
  //         },
  //       ],
  //     },
  //   ];
  // },
};

export default bundleAnalyzer(nextConfig);
