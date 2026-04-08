import type { Metadata } from 'next';
import FixAccessControlAllowOriginMissingHeaderErrorClient from './client';

export const metadata: Metadata = {
  title: 'Fix Access-Control-Allow-Origin Missing 2026 | UnblockDevs',
  description: 'Fix "Access-Control-Allow-Origin" missing header. CORS, server-side fixes. JS, Node, Express.',
  keywords: [
    'access-control-allow-origin missing',
    'CORS error fix',
    'CORS header missing',
    'fix CORS error',
    'access-control-allow-origin error',
    'CORS policy error',
    'CORS header not set',
    'fix CORS JavaScript',
    'CORS server fix',
    'CORS Express fix',
    'CORS Node.js fix',
    'CORS error solution',
    'missing CORS header',
    'CORS troubleshooting',
    'fix CORS all browsers',
    'blocked by cors policy no access-control-allow-origin header is present on the requested resource',
    'no access-control-allow-origin header is present on the requested resource',
    'public cors proxy',
    'cors proxy workaround',
    'cors anywhere proxy'
  ],
  openGraph: {
    title: 'Fix Access-Control-Allow-Origin Missing 2026 | UnblockDevs',
    description: 'Fix Access-Control-Allow-Origin missing. CORS and server-side fixes.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/fix-access-control-allow-origin-missing-header-error',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix Access-Control-Allow-Origin Missing 2026 | UnblockDevs',
    description: 'Fix Access-Control-Allow-Origin missing. CORS and server-side fixes.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/fix-access-control-allow-origin-missing-header-error' },

};

export default function FixAccessControlAllowOriginMissingHeaderErrorPage() {
  return <FixAccessControlAllowOriginMissingHeaderErrorClient />;
}
