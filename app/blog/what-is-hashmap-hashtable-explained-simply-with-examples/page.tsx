import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HashMap / HashTable Explained Simply with Examples | UnblockDevs',
  description: 'Understand HashMap and HashTable with simple examples. Learn hash functions, collision handling, and O(1) lookups — with Java, Python, and JavaScript code.',
  keywords: [
    'what is hashmap',
    'what is hashtable',
    'hashmap explained',
    'hashmap vs hashtable',
    'hash function explained',
    'hash collision handling',
    'hashmap example',
    'hashmap java',
    'hashmap python',
    'hashmap javascript',
    'hashmap interview questions',
    'how does hashmap work',
    'o1 lookup hashmap'
  ],
  openGraph: {
    title: 'HashMap and HashTable Explained Simply with Code Examples',
    description: 'Learn how HashMap and HashTable work, how they handle collisions, and why they offer O(1) average lookups — with code examples in Java, Python, and JavaScript.',
    type: 'article',
    publishedTime: '2026-02-03T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/what-is-hashmap-hashtable-explained-simply-with-examples',
    images: [{ url: 'https://unblockdevs.com/api/og?title=HashMap%20/%20HashTable%20Explained%20%E2%80%93%20Examples&emoji=%F0%9F%A4%96&desc=HashMap%20and%20HashTable%3A%20simple%20examples%2C%20diagrams%2C%20code', width: 1200, height: 630, alt: 'HashMap / HashTable Explained – Examples — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'HashMap / HashTable Explained Simply with Examples',
    description: 'HashMap vs HashTable explained with diagrams and code. Learn O(1) lookups, hash functions, and collision handling for coding interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-hashmap-hashtable-explained-simply-with-examples',
  },
};

import WhatIsHashMapHashTableExplainedSimplyWithExamplesClient from './client';

export default function WhatIsHashMapHashTableExplainedSimplyWithExamplesPage() {
  return <WhatIsHashMapHashTableExplainedSimplyWithExamplesClient />;
}
