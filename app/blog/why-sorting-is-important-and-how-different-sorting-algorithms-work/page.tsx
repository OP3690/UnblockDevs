import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Sorting Algorithms Explained | UnblockDevs',
  description: 'Why sorting matters. How Bubble, Quick, Merge, Heap Sort work. Examples, time complexity, when to use each. For coding interviews.',
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
    title: 'Sorting Algorithms Explained | UnblockDevs',
    description: 'Learn why sorting is important and understand how different sorting algorithms work with examples and comparisons.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/why-sorting-is-important-and-how-different-sorting-algorithms-work',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/why-sorting-is-important-and-how-different-sorting-algorithms-work',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
