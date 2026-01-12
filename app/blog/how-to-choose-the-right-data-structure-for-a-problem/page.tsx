import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Choose the Right Data Structure for a Problem (Complete Guide)',
  description: 'Learn how to choose the right data structure: arrays, linked lists, stacks, queues, trees, hash maps. Decision framework with examples, time complexity comparison, and real-world use cases. Perfect for coding interviews.',
  keywords: [
    'choose data structure',
    'which data structure to use',
    'data structure selection',
    'how to choose data structure',
    'array vs linked list vs hashmap',
    'data structure decision tree',
    'when to use which data structure',
    'data structure guide',
    'coding interview data structures',
    'best data structure for problem'
  ],
  openGraph: {
    title: 'How to Choose the Right Data Structure for a Problem (Complete Guide)',
    description: 'Learn how to choose the right data structure with decision frameworks, examples, and real-world use cases.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-choose-the-right-data-structure-for-a-problem',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
