import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Greedy Algorithm Explained with Simple Examples | Complete Guide 2026',
  description: 'Greedy algorithm: simple examples, when to use, step-by-step. For coding interviews.',
  keywords: [
    'greedy algorithm',
    'greedy algorithm explained',
    'greedy algorithm tutorial',
    'greedy algorithm examples',
    'greedy algorithm interview',
    'greedy approach',
    'greedy strategy',
    'greedy algorithm python',
    'greedy algorithm javascript',
    'greedy algorithm java',
    'greedy algorithm leetcode',
    'greedy vs dynamic programming',
    'greedy algorithm problems',
    'greedy algorithm definition',
    'when to use greedy algorithm'
  ],
  openGraph: {
    title: 'Greedy Algorithm Explained with Simple Examples | Complete Guide 2026',
    description: 'Greedy algorithm: examples, diagrams, code. For interviews.',
    type: 'article',
    publishedTime: '2026-02-05T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/greedy-algorithm-explained-with-simple-examples',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Greedy%20Algorithm%20Explained%20with%20Simple%20Examples%20%7C%20Complete%20Guide%202026&emoji=%F0%9F%A4%96&desc=Greedy%20algorithm%3A%20examples%2C%20diagrams%2C%20code', width: 1200, height: 630, alt: 'Greedy Algorithm Explained with Simple Examples | Complete Guide 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greedy Algorithm Explained with Simple Examples | Complete Guide 2026',
    description: 'Greedy algorithm: examples, diagrams, code. For interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/greedy-algorithm-explained-with-simple-examples',
  },
};

import GreedyAlgorithmExplainedWithSimpleExamplesClient from './client';

export default function GreedyAlgorithmExplainedWithSimpleExamplesPage() {
  return <GreedyAlgorithmExplainedWithSimpleExamplesClient />;
}
