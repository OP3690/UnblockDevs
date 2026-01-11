import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prefix Sum Technique Explained Simply | Complete Guide 2026',
  description: 'Learn what prefix sum technique is with simple examples. Complete beginner-friendly guide to prefix sum array, range sum queries, and O(1) query time. Perfect for coding interviews.',
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
    description: 'Learn what prefix sum technique is with simple examples. Complete beginner-friendly guide with visual diagrams and code examples.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prefix Sum Technique Explained Simply | Complete Guide 2026',
    description: 'Learn what prefix sum technique is with simple examples. Complete beginner-friendly guide with visual diagrams and code examples.',
  },
};

import PrefixSumTechniqueExplainedSimplyClient from './client';

export default function PrefixSumTechniqueExplainedSimplyPage() {
  return <PrefixSumTechniqueExplainedSimplyClient />;
}
