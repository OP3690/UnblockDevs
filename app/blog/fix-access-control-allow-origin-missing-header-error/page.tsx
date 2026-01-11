import type { Metadata } from 'next';
import FixAccessControlAllowOriginMissingHeaderErrorClient from './client';

export const metadata: Metadata = {
  title: 'Fix: "Access-Control-Allow-Origin" Missing Header Error | Complete Guide 2026',
  description: 'Learn how to fix "Access-Control-Allow-Origin" missing header error in JavaScript, Node.js, Express, and all browsers. Includes CORS solutions, server-side fixes, and troubleshooting steps.',
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
    'fix CORS all browsers'
  ],
  openGraph: {
    title: 'Fix: "Access-Control-Allow-Origin" Missing Header Error | Complete Guide 2026',
    description: 'Learn how to fix Access-Control-Allow-Origin missing header error with CORS solutions and server-side fixes.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix: "Access-Control-Allow-Origin" Missing Header Error | Complete Guide 2026',
    description: 'Learn how to fix Access-Control-Allow-Origin missing header error with CORS solutions and server-side fixes.',
  },
};

export default function FixAccessControlAllowOriginMissingHeaderErrorPage() {
  return <FixAccessControlAllowOriginMissingHeaderErrorClient />;
}
