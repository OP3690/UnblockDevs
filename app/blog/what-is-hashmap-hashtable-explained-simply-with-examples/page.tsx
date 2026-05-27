import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HashMap / HashTable Explained – Examples | UnblockDevs',
  description: 'HashMap and HashTable: simple examples, hash functions, collision handling, O(1) lookup. For interviews.',
  keywords: [
    'what is hashmap',
    'what is hashtable',
    'hashmap explained',
    'hashtable explained',
    'hash map tutorial',
    'hash table tutorial',
    'hashmap vs hashtable',
    'hash function',
    'hash collision',
    'hashmap example',
    'hashtable example',
    'hashmap java',
    'hashmap python',
    'hashmap javascript',
    'hashmap interview'
  ],
  openGraph: {
    title: 'HashMap / HashTable Explained – Examples | UnblockDevs',
    description: 'HashMap and HashTable: simple examples, diagrams, code. For interviews.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/what-is-hashmap-hashtable-explained-simply-with-examples',
    images: [{ url: 'https://unblockdevs.com/api/og?title=HashMap%20/%20HashTable%20Explained%20%E2%80%93%20Examples&emoji=%F0%9F%A4%96&desc=HashMap%20and%20HashTable%3A%20simple%20examples%2C%20diagrams%2C%20code', width: 1200, height: 630, alt: 'HashMap / HashTable Explained – Examples — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'HashMap / HashTable Explained – Examples | UnblockDevs',
    description: 'HashMap and HashTable: simple examples, diagrams, code. For interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-hashmap-hashtable-explained-simply-with-examples',
  },
};

import WhatIsHashMapHashTableExplainedSimplyWithExamplesClient from './client';

export default function WhatIsHashMapHashTableExplainedSimplyWithExamplesPage() {
  return <WhatIsHashMapHashTableExplainedSimplyWithExamplesClient />;
}
