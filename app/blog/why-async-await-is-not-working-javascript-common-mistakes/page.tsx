import type { Metadata } from 'next';
import WhyAsyncAwaitIsNotWorkingJavaScriptCommonMistakesClient from './client';

export const metadata: Metadata = {
  title: 'Why async/await Not Working in JavaScript 2026 | UnblockDevs',
  description: 'Fix async/await not working in JavaScript with clear code examples. Covers missing await, promise rejection, and error handling mistakes that trip up developers.',
  keywords: [
    'async await not working javascript',
    'why async await not working',
    'fix async await',
    'async await common mistakes',
    'async await error javascript',
    'await not working',
    'promise not resolving',
    'async await troubleshooting',
    'async await not waiting',
    'async await returns promise',
    'async await debugging',
    'missing await javascript',
    'async function not returning value'
  ],
  openGraph: {
    title: 'Why async/await Is Not Working in JavaScript — Common Mistakes & Fixes',
    description: "async/await confuses even experienced JavaScript developers. Learn the most common mistakes — forgetting await, not catching errors, and misusing Promises — with clear code fixes.",
    type: 'article',
    publishedTime: '2026-01-31T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/why-async-await-is-not-working-javascript-common-mistakes',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Why%20async/await%20Not%20Working%20in%20JavaScript%202026&emoji=%E2%9A%A1&desc=Why%20async/await%20not%20working%20in%20JS', width: 1200, height: 630, alt: 'Why async/await Not Working in JavaScript 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why async/await Not Working in JavaScript 2026',
    description: 'The most common async/await mistakes in JavaScript — missing await, unhandled rejections, wrong error catching — and how to fix each one.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/why-async-await-is-not-working-javascript-common-mistakes' },

};

export default function WhyAsyncAwaitIsNotWorkingJavaScriptCommonMistakesPage() {
  return <WhyAsyncAwaitIsNotWorkingJavaScriptCommonMistakesClient />;
}
