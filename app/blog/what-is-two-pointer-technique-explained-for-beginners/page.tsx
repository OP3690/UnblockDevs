import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Two Pointer Technique Explained | UnblockDevs',
  description: 'Two pointer technique: sliding window, fast/slow pointers, O(n). Simple examples. For interviews.',
  keywords: [
    'two pointer technique',
    'two pointers',
    'two pointer algorithm',
    'two pointer explained',
    'two pointer tutorial',
    'fast and slow pointers',
    'sliding window',
    'two pointer array',
    'two pointer string',
    'two pointer examples',
    'two pointer interview',
    'two pointer python',
    'two pointer javascript',
    'two pointer java',
    'two pointer leetcode'
  ],
  openGraph: {
    title: 'Two Pointer Technique Explained | UnblockDevs',
    description: 'Two pointer technique: examples, diagrams, code. For interviews.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/what-is-two-pointer-technique-explained-for-beginners',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Two Pointer Technique Explained | UnblockDevs',
    description: 'Two pointer technique: examples, diagrams, code. For interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-two-pointer-technique-explained-for-beginners',
  },
};

import WhatIsTwoPointerTechniqueExplainedForBeginnersClient from './client';

export default function WhatIsTwoPointerTechniqueExplainedForBeginnersPage() {
  return <WhatIsTwoPointerTechniqueExplainedForBeginnersClient />;
}
