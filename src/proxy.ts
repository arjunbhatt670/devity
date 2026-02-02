import type { NextRequest } from 'next/server';
import { Buffer } from 'node:buffer';
import { NextResponse } from 'next/server';

function generateNonce(): string {
  return Buffer.from(crypto.getRandomValues(new Uint8Array(16))).toString('base64');
}

const isDevelopment = process.env.NODE_ENV === 'development';

export function proxy(request: NextRequest) {
  const nonce = generateNonce();

  const styleSrc = `style-src 'self' ${isDevelopment ? '\'unsafe-inline\'' : `'nonce-${nonce}'`}`;

  const cspHeader = [
    'default-src \'self\'',
    `script-src 'self' 'nonce-${nonce}'`,
    styleSrc,
    'img-src \'self\' data: images.google.com',
    'font-src \'self\' fonts.gstatic.com',
  ]
    .join('; ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set('Content-Security-Policy', cspHeader);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
