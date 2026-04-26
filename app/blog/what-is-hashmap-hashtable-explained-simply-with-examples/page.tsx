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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

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
