import type { Metadata } from 'next';
import FixErrorListenEaddrinuseNodejsPortAlreadyInUseClient from './client';

export const metadata: Metadata = {
  title: 'Fix EADDRINUSE Port in Use – Node.js 2026 | UnblockDevs',
  description: 'Fix "Error: listen EADDRINUSE" in Node.js. Port conflicts, kill process, change port. With code examples.',
  keywords: [
    'error listen eaddrinuse',
    'fix eaddrinuse nodejs',
    'port already in use nodejs',
    'eaddrinuse error fix',
    'nodejs port conflict',
    'port already in use error',
    'fix port already in use',
    'nodejs eaddrinuse',
    'kill process on port',
    'change port nodejs',
    'port already in use solution',
    'nodejs port error',
    'eaddrinuse address already in use',
    'fix nodejs port error',
    'port conflict nodejs'
  ],
  openGraph: {
    title: 'Fix EADDRINUSE Port in Use – Node.js 2026 | UnblockDevs',
    description: 'Fix "Error: listen EADDRINUSE" in Node.js. Port conflicts, kill process, change port.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/fix-error-listen-eaddrinuse-nodejs-port-already-in-use',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix EADDRINUSE Port in Use – Node.js 2026 | UnblockDevs',
    description: 'Fix "Error: listen EADDRINUSE" in Node.js. Port conflicts, kill process, change port.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/fix-error-listen-eaddrinuse-nodejs-port-already-in-use' },

};

export default function FixErrorListenEaddrinuseNodejsPortAlreadyInUsePage() {
  return <FixErrorListenEaddrinuseNodejsPortAlreadyInUseClient />;
}
