import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Array vs Linked List Explained | UnblockDevs',
  description: 'Arrays vs linked lists: when to use each, time complexity, memory. Simple examples and use cases. For coding interviews.',
  keywords: [
    'array vs linked list',
    'difference between array and linked list',
    'array vs linked list difference',
    'when to use array vs linked list',
    'array linked list comparison',
    'data structures array linked list',
    'array vs linked list time complexity',
    'linked list vs array',
    'array and linked list explained',
    'coding interview array linked list'
  ],
  openGraph: {
    title: 'Array vs Linked List Explained | UnblockDevs',
    description: 'Learn the difference between arrays and linked lists with simple examples. Understand when to use each data structure.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/difference-between-array-and-linked-list-explained-simply',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/difference-between-array-and-linked-list-explained-simply',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
