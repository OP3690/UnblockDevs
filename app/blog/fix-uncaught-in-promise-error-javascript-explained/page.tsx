import type { Metadata } from 'next';
import FixUncaughtInPromiseErrorJavaScriptExplainedClient from './client';

export const metadata: Metadata = {
  title: 'Fix Uncaught (in promise) Error in JavaScript | UnblockDevs',
  description: 'Fix "Uncaught (in promise)" in JavaScript. Promise rejections, async/await, error catch. Solutions.',
  keywords: [
    'uncaught in promise error',
    'fix uncaught in promise',
    'unhandled promise rejection',
    'uncaught promise error',
    'fix promise rejection',
    'javascript promise error',
    'uncaught in promise javascript',
    'promise rejection handling',
    'async await error handling',
    'fix promise error',
    'javascript unhandled rejection',
    'promise catch error',
    'uncaught promise rejection fix',
    'javascript promise catch',
    'fix async promise error'
  ],
  openGraph: {
    title: 'Fix Uncaught (in promise) Error in JavaScript | UnblockDevs',
    description: 'Fix "Uncaught (in promise)" in JavaScript. Promise rejections, error handling.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/fix-uncaught-in-promise-error-javascript-explained',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Fix%20Uncaught%20%28in%20promise%29%20Error%20in%20JavaScript&emoji=%E2%9A%A1&desc=Developer%20guide%20for%20modern%20web%20applications', width: 1200, height: 630, alt: 'Fix Uncaught (in promise) Error in JavaScript — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix Uncaught (in promise) Error in JavaScript | UnblockDevs',
    description: 'Fix "Uncaught (in promise)" in JavaScript. Promise rejections, error handling.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/fix-uncaught-in-promise-error-javascript-explained' },

};

export default function FixUncaughtInPromiseErrorJavaScriptExplainedPage() {
  return <FixUncaughtInPromiseErrorJavaScriptExplainedClient />;
}
