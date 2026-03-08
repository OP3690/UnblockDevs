import type { Metadata } from 'next';
import HowToFixModuleNotFoundErrorClient from './client';

export const metadata: Metadata = {
  title: 'Fix Module Not Found Error in Node.js 2026 | UnblockDevs',
  description: 'Fix "Module not found" in Node.js. Causes, solutions, npm/yarn. Step-by-step. 2026.',
  keywords: [
    'module not found error nodejs',
    'fix module not found error',
    'nodejs module not found',
    'cannot find module nodejs',
    'module not found npm',
    'node module not found',
    'fix cannot find module',
    'module not found error fix',
    'nodejs module error',
    'npm module not found',
    'yarn module not found',
    'node module resolution',
    'module not found troubleshooting',
    'nodejs require error',
    'fix module not found'
  ],
  openGraph: {
    title: 'How to Fix "Module Not Found" Error in Node.js: Complete Guide 2026',
    description: 'Fix "Module not found" in Node.js. Solutions and troubleshooting.',
    type: 'article',
    publishedTime: '2026-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-fix-module-not-found-error-nodejs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-fix-module-not-found-error-nodejs' },

};

export default function HowToFixModuleNotFoundErrorGuide() {
  return <HowToFixModuleNotFoundErrorClient />;
}
