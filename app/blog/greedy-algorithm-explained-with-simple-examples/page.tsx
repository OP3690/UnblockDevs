import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Greedy Algorithm Explained with Simple Examples | Complete Guide 2026',
  description: 'Learn what greedy algorithm is with simple examples. Complete beginner-friendly guide to greedy algorithms, when to use them, and step-by-step examples. Perfect for coding interviews.',
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
    description: 'Learn what greedy algorithm is with simple examples. Complete beginner-friendly guide with visual diagrams and code examples.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greedy Algorithm Explained with Simple Examples | Complete Guide 2026',
    description: 'Learn what greedy algorithm is with simple examples. Complete beginner-friendly guide with visual diagrams and code examples.',
  },
};

import GreedyAlgorithmExplainedWithSimpleExamplesClient from './client';

export default function GreedyAlgorithmExplainedWithSimpleExamplesPage() {
  return <GreedyAlgorithmExplainedWithSimpleExamplesClient />;
}
