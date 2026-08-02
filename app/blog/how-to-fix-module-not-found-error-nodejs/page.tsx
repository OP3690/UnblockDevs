import type { Metadata } from 'next';
import HowToFixModuleNotFoundErrorClient from './client';

export const metadata: Metadata = {
  title: 'Fix Module Not Found Error in Node.js 2026 | UnblockDevs',
  description: 'Fix "Module not found" and "Cannot find module" errors in Node.js. Covers npm install issues, path resolution, ESM vs CJS, and yarn. Step-by-step guide.',
  keywords: [
    'module not found error nodejs',
    'fix module not found error',
    'cannot find module nodejs',
    'module not found npm',
    'fix cannot find module',
    'nodejs module error',
    'yarn module not found',
    'err_module_not_found nodejs',
    'node module resolution',
    'nodejs require error',
  ],
  openGraph: {
    title: 'Fix "Module Not Found" Error in Node.js — Complete Guide | UnblockDevs',
    description: 'Fix "Module not found" and "Cannot find module" errors in Node.js. Covers npm install issues, path resolution, ESM vs CommonJS, and yarn. Step-by-step guide.',
    type: 'article',
    publishedTime: '2026-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-fix-module-not-found-error-nodejs',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Fix&emoji=%E2%9A%A1&desc=Developer%20guide%20for%20modern%20web%20applications', width: 1200, height: 630, alt: 'How to Fix — UnblockDevs Blog' }],

  },  twitter: {
    card: 'summary_large_image',
    title: 'Fix "Module Not Found" Error in Node.js',
    description: 'Fix "Module not found" and "Cannot find module" errors in Node.js. Covers npm install, path resolution, ESM vs CommonJS, and yarn fixes.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-fix-module-not-found-error-nodejs' },

};

export default function HowToFixModuleNotFoundErrorGuide() {
  return <HowToFixModuleNotFoundErrorClient />;
}
