import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Choose the Right Data Structure for a Problem (Complete Guide)',
  description: 'Choose the right data structure: arrays, linked lists, stacks, queues, trees, hash maps. Framework, examples, use cases.',
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
    url: 'https://unblockdevs.com/blog/how-to-choose-the-right-data-structure-for-a-problem',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Choose%20the%20Right%20Data%20Structure%20for%20a%20Problem%20%28Complete%20Guide%29&emoji=%F0%9F%9B%A0%EF%B8%8F&desc=Learn%20how%20to%20choose%20the%20right%20data%20structure%20with%20decision%20frameworks%2C', width: 1200, height: 630, alt: 'How to Choose the Right Data Structure for a Problem (Complete Guide) — UnblockDevs Blog' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-choose-the-right-data-structure-for-a-problem',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
