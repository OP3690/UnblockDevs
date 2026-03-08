import type { Metadata } from 'next';
import FixMaximumCallStackSizeExceededJavaScriptClient from './client';

export const metadata: Metadata = {
  title: 'Fix Maximum Call Stack Exceeded in JavaScript | UnblockDevs',
  description: 'Fix "Maximum call stack size exceeded" in JavaScript. Infinite recursion, circular refs. Solutions and tips.',
  keywords: [
    'maximum call stack size exceeded',
    'javascript stack overflow',
    'infinite recursion javascript',
    'fix call stack exceeded',
    'javascript recursion error',
    'stack overflow javascript',
    'maximum call stack exceeded fix',
    'javascript infinite loop',
    'recursion error javascript',
    'call stack size exceeded',
    'javascript stack error',
    'fix recursion error',
    'javascript circular reference',
    'stack overflow error',
    'javascript debugging recursion'
  ],
  openGraph: {
    title: 'Fix Maximum Call Stack Exceeded in JavaScript | UnblockDevs',
    description: 'Fix "Maximum call stack size exceeded" in JavaScript. Recursion, circular refs. With code.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/fix-maximum-call-stack-size-exceeded-javascript',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix Maximum Call Stack Exceeded in JavaScript | UnblockDevs',
    description: 'Fix "Maximum call stack size exceeded" in JavaScript. Recursion, circular refs. With code.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/fix-maximum-call-stack-size-exceeded-javascript' },

};

export default function FixMaximumCallStackSizeExceededJavaScriptPage() {
  return <FixMaximumCallStackSizeExceededJavaScriptClient />;
}
