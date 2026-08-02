import type { Metadata } from 'next';
import FixUncaughtInPromiseErrorJavaScriptExplainedClient from './client';

export const metadata: Metadata = {
  title: 'Fix Uncaught (in promise) Error in JavaScript | UnblockDevs',
  description: 'Fix "Uncaught (in promise)" errors in JavaScript. Understand unhandled promise rejections, add .catch(), wrap async/await in try/catch, and prevent silent failures.',
  keywords: [
    'uncaught in promise error javascript',
    'unhandled promise rejection javascript',
    'fix promise rejection error',
    'javascript async await error handling',
    'promise catch not working',
    'javascript promise error fix',
    'handle promise rejection javascript',
    'uncaught in promise typeerror',
    'how to fix uncaught in promise error',
    'why does uncaught in promise occur',
    'javascript promise rejection handling',
    'async await try catch javascript'
  ],
  openGraph: {
    title: 'Fix Uncaught (in promise) Error in JavaScript: Promise Rejection Guide',
    description: 'Getting \'Uncaught (in promise)\' errors in JavaScript? Learn why promises reject silently, how to add .catch() handlers, use async/await with try/catch, and set up global unhandledrejection listeners.',
    type: 'article',
    publishedTime: '2026-01-31T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/fix-uncaught-in-promise-error-javascript-explained',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Fix%20Uncaught%20%28in%20promise%29%20Error%20in%20JavaScript&emoji=%E2%9A%A1&desc=Developer%20guide%20for%20modern%20web%20applications', width: 1200, height: 630, alt: 'Fix Uncaught (in promise) Error in JavaScript — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix Uncaught (in promise) Error in JavaScript',
    description: 'Fix \'Uncaught (in promise)\' JavaScript errors. Add .catch() handlers, wrap async/await in try/catch, and handle promise rejections properly.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/fix-uncaught-in-promise-error-javascript-explained' },

};

export default function FixUncaughtInPromiseErrorJavaScriptExplainedPage() {
  return <FixUncaughtInPromiseErrorJavaScriptExplainedClient />;
}
