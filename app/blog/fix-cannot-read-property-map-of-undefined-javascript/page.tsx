import type { Metadata } from 'next';
import FixCannotReadPropertyMapOfUndefinedJavaScriptClient from './client';

export const metadata: Metadata = {
  title: 'Fix Cannot Read Property map of Undefined in JS | UnblockDevs',
  description: 'Fix "Cannot read property \'map\' of undefined" in JavaScript/React. Solutions and code examples.',
  keywords: [
    'cannot read property map of undefined',
    'fix map undefined error',
    'javascript map undefined',
    'react map undefined error',
    'cannot read property map',
    'map undefined javascript',
    'fix map error javascript',
    'undefined map error',
    'javascript map undefined fix',
    'react map undefined fix',
    'array map undefined',
    'fix cannot read property',
    'map undefined solution',
    'javascript map error',
    'react map error fix'
  ],
  openGraph: {
    title: 'Fix Cannot Read Property map of Undefined in JS | UnblockDevs',
    description: 'Fix "Cannot read property \'map\' of undefined" in JavaScript/React. Solutions and examples.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/fix-cannot-read-property-map-of-undefined-javascript',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix Cannot Read Property map of Undefined in JS | UnblockDevs',
    description: 'Fix "Cannot read property \'map\' of undefined" in JavaScript/React. Solutions and examples.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/fix-cannot-read-property-map-of-undefined-javascript' },

};

export default function FixCannotReadPropertyMapOfUndefinedJavaScriptPage() {
  return <FixCannotReadPropertyMapOfUndefinedJavaScriptClient />;
}
