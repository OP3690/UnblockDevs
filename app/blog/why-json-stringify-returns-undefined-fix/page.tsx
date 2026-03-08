import type { Metadata } from 'next';
import WhyJsonStringifyReturnsUndefinedFixClient from './client';

export const metadata: Metadata = {
  title: 'Why JSON.stringify() Returns Undefined – Fix | UnblockDevs',
  description: 'Why JSON.stringify() returns undefined and how to fix it. Undefined, circular refs, special values.',
  keywords: [
    'json.stringify returns undefined',
    'json.stringify undefined fix',
    'why json.stringify undefined',
    'json.stringify undefined value',
    'fix json.stringify undefined',
    'json.stringify undefined property',
    'json.stringify undefined error',
    'json.stringify undefined solution',
    'json.stringify undefined handling',
    'json.stringify undefined values',
    'json.stringify undefined property',
    'json.stringify undefined fix javascript',
    'json.stringify undefined null',
    'json.stringify undefined replacer',
    'json.stringify undefined filter'
  ],
  openGraph: {
    title: 'Why JSON.stringify() Returns Undefined – Fix | UnblockDevs',
    description: 'Why JSON.stringify() returns undefined and how to fix it.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/why-json-stringify-returns-undefined-fix',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why JSON.stringify() Returns Undefined – Fix | UnblockDevs',
    description: 'Why JSON.stringify() returns undefined and how to fix it.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/why-json-stringify-returns-undefined-fix' },

};

export default function WhyJsonStringifyReturnsUndefinedFixPage() {
  return <WhyJsonStringifyReturnsUndefinedFixClient />;
}
