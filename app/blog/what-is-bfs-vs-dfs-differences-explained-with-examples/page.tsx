import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BFS vs DFS Explained with Examples | UnblockDevs',
  description: 'BFS vs DFS: differences, simple examples, graph traversal. Visual diagrams. For coding interviews.',
  keywords: [
    'bfs vs dfs',
    'breadth first search',
    'depth first search',
    'bfs algorithm',
    'dfs algorithm',
    'graph traversal',
    'tree traversal',
    'bfs explained',
    'dfs explained',
    'bfs vs dfs difference',
    'bfs dfs comparison',
    'bfs interview',
    'dfs interview',
    'bfs python',
    'dfs python'
  ],
  openGraph: {
    title: 'BFS vs DFS Explained with Examples | UnblockDevs',
    description: 'BFS vs DFS: differences, examples, diagrams. For interviews.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/what-is-bfs-vs-dfs-differences-explained-with-examples',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'BFS vs DFS Explained with Examples | UnblockDevs',
    description: 'BFS vs DFS: differences, examples, diagrams. For interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-bfs-vs-dfs-differences-explained-with-examples',
  },
};

import WhatIsBfsVsDfsDifferencesExplainedWithExamplesClient from './client';

export default function WhatIsBfsVsDfsDifferencesExplainedWithExamplesPage() {
  return <WhatIsBfsVsDfsDifferencesExplainedWithExamplesClient />;
}
