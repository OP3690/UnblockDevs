import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sliding Window Technique Explained with Examples | UnblockDevs',
  description: 'Master the sliding window technique with clear examples and code. Learn fixed and variable window patterns, O(n) time complexity, and when to use it for coding interviews.',
  keywords: [
    'sliding window technique',
    'sliding window algorithm',
    'sliding window explained',
    'sliding window pattern',
    'fixed sliding window',
    'variable sliding window',
    'sliding window examples',
    'sliding window interview',
    'sliding window python',
    'sliding window leetcode',
    'two pointer sliding window',
    'how does sliding window work',
    'sliding window vs brute force'
  ],
  openGraph: {
    title: 'Sliding Window Technique Explained with Examples and Code',
    description: 'Learn fixed vs variable sliding window patterns with diagrams and code. Solve array and string problems in O(n) time — perfect for LeetCode and coding interviews.',
    type: 'article',
    publishedTime: '2026-02-04T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/what-is-sliding-window-technique-explained-with-simple-examples',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Sliding%20Window%20Technique%20Explained&emoji=%F0%9F%A4%96&desc=Sliding%20window%3A%20examples%2C%20diagrams%2C%20code', width: 1200, height: 630, alt: 'Sliding Window Technique Explained — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sliding Window Technique Explained with Examples',
    description: 'Master the sliding window technique with examples and code in Python and JavaScript. Covers fixed and variable windows for LeetCode interview prep.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-sliding-window-technique-explained-with-simple-examples',
  },
};

import WhatIsSlidingWindowTechniqueExplainedWithSimpleExamplesClient from './client';

export default function WhatIsSlidingWindowTechniqueExplainedWithSimpleExamplesPage() {
  return <WhatIsSlidingWindowTechniqueExplainedWithSimpleExamplesClient />;
}
