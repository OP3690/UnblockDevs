import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BFS vs DFS Differences Explained with Examples | UnblockDevs',
  description: 'Learn the differences between BFS and DFS with diagrams, Python code examples, and clear explanations of when to use each traversal algorithm.',
  keywords: [
    'bfs vs dfs',
    'breadth first search explained',
    'depth first search explained',
    'bfs algorithm',
    'dfs algorithm',
    'graph traversal algorithms',
    'bfs vs dfs difference',
    'bfs dfs comparison',
    'bfs interview questions',
    'dfs interview questions',
    'bfs python example',
    'when to use bfs vs dfs',
    'graph traversal tutorial'
  ],
  openGraph: {
    title: 'BFS vs DFS Differences Explained with Examples and Diagrams',
    description: 'BFS explores nodes level by level, DFS dives deep first. Understand the differences with visual diagrams, code examples, and a clear guide to when each graph traversal algorithm shines.',
    type: 'article',
    publishedTime: '2026-02-04T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/what-is-bfs-vs-dfs-differences-explained-with-examples',
    images: [{ url: 'https://unblockdevs.com/api/og?title=BFS%20vs%20DFS%20Explained%20with%20Examples&emoji=%F0%9F%A4%96&desc=BFS%20vs%20DFS%3A%20differences%2C%20examples%2C%20diagrams', width: 1200, height: 630, alt: 'BFS vs DFS Explained with Examples — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'BFS vs DFS Differences Explained with Examples',
    description: 'BFS vs DFS explained with diagrams and code. Learn which graph traversal algorithm to use and why — perfect for coding interview prep.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-bfs-vs-dfs-differences-explained-with-examples',
  },
};

import WhatIsBfsVsDfsDifferencesExplainedWithExamplesClient from './client';

export default function WhatIsBfsVsDfsDifferencesExplainedWithExamplesPage() {
  return <WhatIsBfsVsDfsDifferencesExplainedWithExamplesClient />;
}
