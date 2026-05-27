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
    images: [{ url: 'https://unblockdevs.com/api/og?title=Breadth-First%20Search%20Explained&emoji=%F0%9F%A4%96&desc=Learn%20Breadth-First%20Search%20%28BFS%29%20algorithm%20with%20simple%20tree%20examples%2C', width: 1200, height: 630, alt: 'Breadth-First Search Explained — UnblockDevs Blog' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/breadth-first-search-explained-with-easy-tree-examples',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
