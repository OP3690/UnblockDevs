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
    publishedTime: '2026-02-05T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/prefix-sum-technique-explained-simply',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Prefix%20Sum%20Technique%20Explained%20Simply%20%7C%20Complete%20Guide%202026&emoji=%F0%9F%A4%96&desc=Prefix%20sum%20technique%3A%20simple%20examples%2C%20diagrams%2C%20code', width: 1200, height: 630, alt: 'Prefix Sum Technique Explained Simply | Complete Guide 2026 — UnblockDevs Blog' }],

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
