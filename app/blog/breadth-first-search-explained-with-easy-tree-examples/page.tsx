import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Breadth-First Search Explained | UnblockDevs',
  description: 'Breadth-First Search (BFS) with tree examples, visualizations, code. Use cases. For coding interviews.',
  keywords: [
    'breadth first search',
    'bfs algorithm',
    'bfs explained',
    'breadth first search example',
    'bfs tree traversal',
    'graph traversal bfs',
    'bfs algorithm explained',
    'breadth first search tutorial',
    'bfs vs dfs',
    'bfs code example',
    'tree traversal bfs',
    'bfs algorithm step by step'
  ],
  openGraph: {
    title: 'Breadth-First Search Explained | UnblockDevs',
    description: 'Learn Breadth-First Search (BFS) algorithm with simple tree examples, step-by-step visualizations, and code examples.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/breadth-first-search-explained-with-easy-tree-examples',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/breadth-first-search-explained-with-easy-tree-examples',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
