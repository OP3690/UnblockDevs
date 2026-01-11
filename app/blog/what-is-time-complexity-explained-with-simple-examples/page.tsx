import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is Time Complexity? Explained with Simple Examples | Complete Guide 2026',
  description: 'Learn what time complexity is with simple examples. Complete guide to Big O notation, O(1), O(n), O(log n), O(n²) with visual graphs, charts, and beginner-friendly explanations. Perfect for coding interviews.',
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
    title: 'What Is Time Complexity? Explained with Simple Examples | Complete Guide 2026',
    description: 'Learn what time complexity is with simple examples. Complete guide to Big O notation with visual graphs and beginner-friendly explanations.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Time Complexity? Explained with Simple Examples | Complete Guide 2026',
    description: 'Learn what time complexity is with simple examples. Complete guide to Big O notation with visual graphs and beginner-friendly explanations.',
  },
};

import WhatIsTimeComplexityExplainedWithSimpleExamplesClient from './client';

export default function WhatIsTimeComplexityExplainedWithSimpleExamplesPage() {
  return <WhatIsTimeComplexityExplainedWithSimpleExamplesClient />;
}
