import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Why Sorting Matters and How Sorting Algorithms Work | UnblockDevs',
  description: 'Learn why sorting matters and how Bubble, Quick, Merge, and Heap Sort work. Includes time complexity charts and when to use each sorting algorithm.',
  keywords: [
    'sorting algorithms explained',
    'why sorting is important',
    'bubble sort explained',
    'quick sort explained',
    'merge sort explained',
    'heap sort explained',
    'sorting algorithm comparison',
    'best sorting algorithm',
    'sorting algorithms time complexity',
    'when to use which sorting algorithm',
    'sorting algorithms tutorial',
    'how do sorting algorithms work',
    'sorting algorithms for coding interviews'
  ],
  openGraph: {
    title: 'Sorting Algorithms Explained: Bubble, Quick, Merge, Heap Sort',
    description: 'Sorting is one of the most fundamental problems in computer science. Learn why it matters and how Bubble, Quick, Merge, and Heap Sort work — with diagrams, code, and time complexity comparisons.',
    type: 'article',
    publishedTime: '2026-02-06T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/why-sorting-is-important-and-how-different-sorting-algorithms-work',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Sorting%20Algorithms%20Explained&emoji=%F0%9F%9B%A0%EF%B8%8F&desc=Learn%20why%20sorting%20is%20important%20and%20understand%20how%20different%20sorting%20algorithms', width: 1200, height: 630, alt: 'Sorting Algorithms Explained — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Sorting Matters and How Sorting Algorithms Work',
    description: 'Learn why sorting is fundamental and how Bubble, Quick, Merge, and Heap Sort work — with time complexity charts and guidance on when to use each.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/why-sorting-is-important-and-how-different-sorting-algorithms-work',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
