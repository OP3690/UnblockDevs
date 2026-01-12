import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Why Sorting Is Important and How Different Sorting Algorithms Work (Complete Guide)',
  description: 'Learn why sorting is important in programming. Understand how different sorting algorithms work: Bubble Sort, Quick Sort, Merge Sort, Heap Sort with examples, time complexity, and when to use each. Perfect for coding interviews.',
  keywords: [
    'sorting algorithms',
    'why sorting is important',
    'sorting algorithms explained',
    'bubble sort',
    'quick sort',
    'merge sort',
    'heap sort',
    'sorting algorithm comparison',
    'best sorting algorithm',
    'sorting algorithms time complexity',
    'when to use which sorting algorithm',
    'sorting algorithms tutorial'
  ],
  openGraph: {
    title: 'Why Sorting Is Important and How Different Sorting Algorithms Work (Complete Guide)',
    description: 'Learn why sorting is important and understand how different sorting algorithms work with examples and comparisons.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/why-sorting-is-important-and-how-different-sorting-algorithms-work',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
