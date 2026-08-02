import type { Metadata } from 'next';
import FixErrorListenEaddrinuseNodejsPortAlreadyInUseClient from './client';

export const metadata: Metadata = {
  title: 'Fix EADDRINUSE Port in Use – Node.js 2026 | UnblockDevs',
  description: 'Fix "Error: listen EADDRINUSE" in Node.js: how to find and kill the conflicting process, change ports, and prevent port conflicts. With code examples.',
  keywords: [
    'error listen eaddrinuse',
    'fix eaddrinuse nodejs',
    'port already in use nodejs',
    'eaddrinuse error fix',
    'nodejs port conflict',
    'fix port already in use',
    'nodejs eaddrinuse',
    'kill process on port',
    'change port nodejs',
    'eaddrinuse address already in use',
    'fix nodejs port error',
    'how to free up a port nodejs'
  ],
  openGraph: {
    title: 'Fix Error listen EADDRINUSE Address Already in Use in Node.js',
    description: 'Learn how to fix "Error: listen EADDRINUSE" in Node.js — find which process is using the port, kill it, change the port, or prevent conflicts altogether. Code examples included.',
    type: 'article',
    publishedTime: '2026-02-01T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/fix-error-listen-eaddrinuse-nodejs-port-already-in-use',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Fix%20EADDRINUSE%20Port%20in%20Use%20%E2%80%93%20Node.js%202026&emoji=%E2%9A%A1&desc=Developer%20guide%20for%20modern%20web%20applications', width: 1200, height: 630, alt: 'Fix EADDRINUSE Port in Use – Node.js 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix EADDRINUSE Port in Use – Node.js 2026',
    description: 'Fix Node.js EADDRINUSE: find and kill the conflicting process, change ports, or prevent conflicts. Quick guide with terminal commands.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/fix-error-listen-eaddrinuse-nodejs-port-already-in-use' },

};

export default function FixErrorListenEaddrinuseNodejsPortAlreadyInUsePage() {
  return <FixErrorListenEaddrinuseNodejsPortAlreadyInUseClient />;
}
