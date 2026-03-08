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
    'dfs recursive iterative'
  ],
  openGraph: {
    title: 'Depth-First Search Explained Step by Step (Complete Guide)',
    description: 'Learn Depth-First Search (DFS) algorithm step by step with simple examples, visualizations, and code examples.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/depth-first-search-explained-step-by-step',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/depth-first-search-explained-step-by-step',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
