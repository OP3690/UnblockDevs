import type { Metadata } from 'next';
import WhyAsyncAwaitIsNotWorkingJavaScriptCommonMistakesClient from './client';

export const metadata: Metadata = {
  title: 'Why async/await Not Working in JavaScript 2026 | UnblockDevs',
  description: 'Why async/await not working in JavaScript. Missing await, promise handling, error catch. Fixes and code.',
  keywords: [
    'async await not working',
    'why async await not working',
    'async await javascript not working',
    'fix async await',
    'async await common mistakes',
    'async await error',
    'await not working',
    'async function not working',
    'promise not resolving',
    'async await troubleshooting',
    'javascript async await issues',
    'fix async await promise',
    'async await not waiting',
    'async await returns promise',
    'async await debugging'
  ],
  openGraph: {
    title: 'Why async/await Not Working in JavaScript 2026 | UnblockDevs',
    description: 'Why async/await not working in JS. Common mistakes, missing await. Fixes and code.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/why-async-await-is-not-working-javascript-common-mistakes',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why async/await Not Working in JavaScript 2026 | UnblockDevs',
    description: 'Why async/await not working in JS. Common mistakes, missing await. Fixes and code.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/why-async-await-is-not-working-javascript-common-mistakes' },

};

export default function WhyAsyncAwaitIsNotWorkingJavaScriptCommonMistakesPage() {
  return <WhyAsyncAwaitIsNotWorkingJavaScriptCommonMistakesClient />;
}
