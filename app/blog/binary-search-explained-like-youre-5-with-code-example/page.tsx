import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Binary Search Explained Like You\'re 5 | UnblockDevs',
  description: 'Binary search explained simply: diagrams, code, examples. Beginner-friendly. For coding interviews.',
  keywords: [
    'binary search explained',
    'binary search like you\'re 5',
    'binary search simple explanation',
    'binary search algorithm',
    'binary search tutorial',
    'binary search example',
    'binary search code',
    'binary search beginner',
    'binary search visualization',
    'binary search step by step',
    'how binary search works',
    'binary search diagram',
    'binary search interview',
    'binary search python',
    'binary search javascript'
  ],
  openGraph: {
    title: 'Binary Search Explained Like You\'re 5 | UnblockDevs',
    description: 'Binary search explained simply: diagrams, code. For interviews.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/binary-search-explained-like-youre-5-with-code-example',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Binary Search Explained Like You\'re 5 | UnblockDevs',
    description: 'Binary search explained simply: diagrams, code. For interviews.',
  },
};

import BinarySearchExplainedLikeYoure5WithCodeExampleClient from './client';

export default function BinarySearchExplainedLikeYoure5WithCodeExamplePage() {
  return <BinarySearchExplainedLikeYoure5WithCodeExampleClient />;
}
