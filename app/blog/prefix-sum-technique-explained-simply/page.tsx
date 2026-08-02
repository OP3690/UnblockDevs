import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prefix Sum Technique Explained Simply | UnblockDevs',
  description: 'Master the prefix sum technique with simple examples and code. Learn cumulative sums and range sum queries in O(1) time — perfect for coding interviews and algorithm practice.',
  keywords: [
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
    'prefix sum leetcode',
    'running sum'
  ],
  openGraph: {
    title: 'Prefix Sum Technique Simply Explained — Range Sum Queries in O(1) Time',
    description: 'Prefix sum is one of the most elegant algorithm patterns. Learn how to precompute cumulative sums and answer any range query in O(1) time — with diagrams, Python, and JavaScript code examples.',
    type: 'article',
    publishedTime: '2026-02-05T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/prefix-sum-technique-explained-simply',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Prefix%20Sum%20Technique%20Explained%20Simply%20%7C%20Complete%20Guide%202026&emoji=%F0%9F%A4%96&desc=Prefix%20sum%20technique%3A%20simple%20examples%2C%20diagrams%2C%20code', width: 1200, height: 630, alt: 'Prefix Sum Technique Explained Simply | Complete Guide 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prefix Sum Technique Explained Simply',
    description: 'Learn the prefix sum technique with diagrams and code examples in Python and JavaScript. Solve range sum queries in constant time.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/prefix-sum-technique-explained-simply',
  },
};

import PrefixSumTechniqueExplainedSimplyClient from './client';

export default function PrefixSumTechniqueExplainedSimplyPage() {
  return <PrefixSumTechniqueExplainedSimplyClient />;
}
