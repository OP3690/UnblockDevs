import type { Metadata } from 'next';
import FixCannotReadPropertyMapOfUndefinedJavaScriptClient from './client';

export const metadata: Metadata = {
  title: 'Fix Cannot Read Property map of Undefined in JS | UnblockDevs',
  description: 'Fix "Cannot read property \'map\' of undefined" in JavaScript and React. Covers null checks, default values, and optional chaining, with clear code examples.',
  keywords: [
    'cannot read property map of undefined',
    'fix map undefined error',
    'javascript map undefined',
    'react map undefined error',
    'cannot read property map',
    'fix map error javascript',
    'react map undefined fix',
    'array map undefined',
    'map undefined solution',
    'javascript map error fix',
    'react rendering undefined array'
  ],
  openGraph: {
    title: 'Fix "Cannot read property map of undefined" in JavaScript and React',
    description: 'Learn to fix "Cannot read property \'map\' of undefined" in JavaScript and React with null checks, default empty arrays, and optional chaining. Code examples included for each solution.',
    type: 'article',
    publishedTime: '2026-01-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/fix-cannot-read-property-map-of-undefined-javascript',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Fix%20Cannot%20Read%20Property%20map%20of%20Undefined%20in%20JS&emoji=%E2%9A%A1&desc=Developer%20guide%20for%20modern%20web%20applications', width: 1200, height: 630, alt: 'Fix Cannot Read Property map of Undefined in JS — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix Cannot Read Property map of Undefined in JS',
    description: 'Fix "cannot read property map of undefined" in JS/React with null checks, default arrays, and optional chaining. Clear code examples included.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/fix-cannot-read-property-map-of-undefined-javascript' },

};

export default function FixCannotReadPropertyMapOfUndefinedJavaScriptPage() {
  return <FixCannotReadPropertyMapOfUndefinedJavaScriptClient />;
}
