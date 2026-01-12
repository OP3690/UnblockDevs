import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Breadth-First Search Explained with Easy Tree Examples (Complete Guide)',
  description: 'Learn Breadth-First Search (BFS) algorithm with simple tree examples, step-by-step visualizations, code examples, and real-world use cases. Perfect for coding interviews and graph traversal.',
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
    title: 'Breadth-First Search Explained with Easy Tree Examples (Complete Guide)',
    description: 'Learn Breadth-First Search (BFS) algorithm with simple tree examples, step-by-step visualizations, and code examples.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/breadth-first-search-explained-with-easy-tree-examples',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
