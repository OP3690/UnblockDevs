import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Depth-First Search Explained Step by Step (Complete Guide)',
  description: 'Depth-First Search (DFS) step by step. Examples, recursive and iterative. Use cases. For coding interviews.',
  keywords: [
    'depth first search',
    'dfs algorithm',
    'dfs explained',
    'depth first search example',
    'dfs tree traversal',
    'graph traversal dfs',
    'dfs algorithm explained',
    'depth first search tutorial',
    'dfs vs bfs',
    'dfs code example',
    'tree traversal dfs',
    'dfs recursive iterative',
    'depth-first search uses stack or recursion',
    'dfs uses stack',
    'depth first search stack implementation',
    'dfs iterative stack vs recursive'
  ],
  openGraph: {
    title: 'Depth-First Search Explained Step by Step (Complete Guide)',
    description: 'Learn Depth-First Search (DFS) algorithm step by step with simple examples, visualizations, and code examples.',
    type: 'article',
    publishedTime: '2026-02-06T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/depth-first-search-explained-step-by-step',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Depth-First%20Search%20Explained%20Step%20by%20Step%20%28Complete%20Guide%29&emoji=%F0%9F%A4%96&desc=Learn%20Depth-First%20Search%20%28DFS%29%20algorithm%20step%20by%20step%20with%20simple%20examples%2C', width: 1200, height: 630, alt: 'Depth-First Search Explained Step by Step (Complete Guide) — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Depth-First Search Explained Step by Step (Complete Guide)',
    description: 'Learn Depth-First Search (DFS) algorithm step by step with simple examples, visualizations, and code examples.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/depth-first-search-explained-step-by-step',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
