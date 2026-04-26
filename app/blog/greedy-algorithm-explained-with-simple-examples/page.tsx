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
    url: 'https://unblockdevs.com/blog/greedy-algorithm-explained-with-simple-examples',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

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
