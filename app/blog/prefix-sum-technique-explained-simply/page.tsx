import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prefix Sum Technique Explained Simply | Complete Guide 2026',
  description: 'Prefix sum technique: simple examples, range sum queries, O(1) time. Beginner-friendly. For interviews.',
  keywords: [
    'prefix sum',
    'prefix sum technique',
    'prefix sum array',
    'prefix sum explained',
    'prefix sum tutorial',
    'range sum query',
    'cumulative sum',
    'prefix sum example',
    'prefix sum interview',
    'prefix sum python',
    'prefix sum javascript',
    'prefix sum java',
    'prefix sum leetcode',
    'running sum',
    'prefix sum algorithm'
  ],
  openGraph: {
    title: 'Prefix Sum Technique Explained Simply | Complete Guide 2026',
    description: 'Prefix sum technique: simple examples, diagrams, code. For interviews.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/prefix-sum-technique-explained-simply',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prefix Sum Technique Explained Simply | Complete Guide 2026',
    description: 'Prefix sum technique: simple examples, diagrams, code. For interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/prefix-sum-technique-explained-simply',
  },
};

import PrefixSumTechniqueExplainedSimplyClient from './client';

export default function PrefixSumTechniqueExplainedSimplyPage() {
  return <PrefixSumTechniqueExplainedSimplyClient />;
}
