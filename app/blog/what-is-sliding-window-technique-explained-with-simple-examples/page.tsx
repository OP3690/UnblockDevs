import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sliding Window Technique Explained | UnblockDevs',
  description: 'Sliding window technique: fixed vs variable window, O(n). Simple examples. For interviews.',
  keywords: [
    'sliding window technique',
    'sliding window algorithm',
    'sliding window explained',
    'sliding window tutorial',
    'sliding window pattern',
    'fixed sliding window',
    'variable sliding window',
    'sliding window examples',
    'sliding window interview',
    'sliding window python',
    'sliding window javascript',
    'sliding window java',
    'sliding window leetcode',
    'two pointer sliding window',
    'window sliding technique'
  ],
  openGraph: {
    title: 'Sliding Window Technique Explained | UnblockDevs',
    description: 'Sliding window: examples, diagrams, code. For interviews.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/what-is-sliding-window-technique-explained-with-simple-examples',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sliding Window Technique Explained | UnblockDevs',
    description: 'Sliding window: examples, diagrams, code. For interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-sliding-window-technique-explained-with-simple-examples',
  },
};

import WhatIsSlidingWindowTechniqueExplainedWithSimpleExamplesClient from './client';

export default function WhatIsSlidingWindowTechniqueExplainedWithSimpleExamplesPage() {
  return <WhatIsSlidingWindowTechniqueExplainedWithSimpleExamplesClient />;
}
