import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Choose the Right Data Structure | UnblockDevs',
  description: 'Choose the right data structure for any problem. Learn when to use arrays, linked lists, stacks, queues, trees, and hash maps with a clear decision framework and examples.',
  keywords: [
    'choose data structure',
    'which data structure to use',
    'data structure selection guide',
    'how to choose data structure',
    'array vs linked list vs hashmap',
    'data structure decision framework',
    'when to use which data structure',
    'coding interview data structures',
    'best data structure for problem',
    'when to use array vs linked list',
    'when to use a hash map vs array',
    'how do i choose the best data structure',
    'what data structure should i use',
    'data structure use cases guide'
  ],
  openGraph: {
    title: 'How to Choose the Right Data Structure for Any Problem (Complete Guide)',
    description: 'Not sure which data structure to pick? Get a decision framework for choosing between arrays, linked lists, stacks, queues, trees, and hash maps — with real examples.',
    type: 'article',
    publishedTime: '2026-02-05T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-choose-the-right-data-structure-for-a-problem',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Choose%20the%20Right%20Data%20Structure%20for%20a%20Problem%20%28Complete%20Guide%29&emoji=%F0%9F%9B%A0%EF%B8%8F&desc=Learn%20how%20to%20choose%20the%20right%20data%20structure%20with%20decision%20frameworks%2C', width: 1200, height: 630, alt: 'How to Choose the Right Data Structure for a Problem (Complete Guide) — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Choose the Right Data Structure for Any Problem',
    description: 'Learn when to use arrays, linked lists, stacks, queues, trees, and hash maps. A decision framework for picking the right data structure fast.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-choose-the-right-data-structure-for-a-problem',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
