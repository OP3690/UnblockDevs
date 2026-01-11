import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is BFS vs DFS? Differences Explained with Examples | Complete Guide 2026',
  description: 'Learn the differences between BFS (Breadth-First Search) and DFS (Depth-First Search) with simple examples. Complete beginner-friendly guide to graph traversal algorithms with visual diagrams. Perfect for coding interviews.',
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
    title: 'What Is BFS vs DFS? Differences Explained with Examples | Complete Guide 2026',
    description: 'Learn the differences between BFS and DFS with simple examples. Complete beginner-friendly guide with visual diagrams and code examples.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is BFS vs DFS? Differences Explained with Examples | Complete Guide 2026',
    description: 'Learn the differences between BFS and DFS with simple examples. Complete beginner-friendly guide with visual diagrams and code examples.',
  },
};

import WhatIsBfsVsDfsDifferencesExplainedWithExamplesClient from './client';

export default function WhatIsBfsVsDfsDifferencesExplainedWithExamplesPage() {
  return <WhatIsBfsVsDfsDifferencesExplainedWithExamplesClient />;
}
