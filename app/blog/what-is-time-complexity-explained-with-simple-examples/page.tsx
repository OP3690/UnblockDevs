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
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Time Complexity Explained – Simple Examples | UnblockDevs',
    description: 'Time complexity: Big O with examples and graphs. For interviews.',
  },
};

import WhatIsTimeComplexityExplainedWithSimpleExamplesClient from './client';

export default function WhatIsTimeComplexityExplainedWithSimpleExamplesPage() {
  return <WhatIsTimeComplexityExplainedWithSimpleExamplesClient />;
}
