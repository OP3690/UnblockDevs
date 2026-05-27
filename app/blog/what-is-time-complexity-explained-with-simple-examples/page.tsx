import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Time Complexity Explained – Simple Examples | UnblockDevs',
  description: 'Time complexity: Big O, O(1), O(n), O(log n), O(n²). Simple examples, graphs. For interviews.',
  keywords: [
    'what is time complexity',
    'time complexity explained',
    'big o notation explained',
    'time complexity examples',
    'o1 on olog n time complexity',
    'time complexity tutorial',
    'algorithm time complexity',
    'time complexity graph',
    'big o notation examples',
    'time complexity beginner',
    'coding interview time complexity',
    'time complexity visualization',
    'algorithm efficiency',
    'time complexity chart',
    'big o notation tutorial'
  ],
  openGraph: {
    title: 'Time Complexity Explained – Simple Examples | UnblockDevs',
    description: 'Time complexity: Big O with examples and graphs. For interviews.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/what-is-time-complexity-explained-with-simple-examples',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Time%20Complexity%20Explained%20%E2%80%93%20Simple%20Examples&emoji=%F0%9F%A4%96&desc=Time%20complexity%3A%20Big%20O%20with%20examples%20and%20graphs', width: 1200, height: 630, alt: 'Time Complexity Explained – Simple Examples — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Complexity Explained – Simple Examples | UnblockDevs',
    description: 'Time complexity: Big O with examples and graphs. For interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-time-complexity-explained-with-simple-examples',
  },
};

import WhatIsTimeComplexityExplainedWithSimpleExamplesClient from './client';

export default function WhatIsTimeComplexityExplainedWithSimpleExamplesPage() {
  return <WhatIsTimeComplexityExplainedWithSimpleExamplesClient />;
}
