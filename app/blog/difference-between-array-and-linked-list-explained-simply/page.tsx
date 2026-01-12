import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Difference Between Array and Linked List Explained Simply (Complete Guide)',
  description: 'Learn the difference between arrays and linked lists with simple examples. Understand when to use arrays vs linked lists, time complexity, memory usage, and real-world use cases. Perfect for coding interviews.',
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
    title: 'Difference Between Array and Linked List Explained Simply (Complete Guide)',
    description: 'Learn the difference between arrays and linked lists with simple examples. Understand when to use each data structure.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/difference-between-array-and-linked-list-explained-simply',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
