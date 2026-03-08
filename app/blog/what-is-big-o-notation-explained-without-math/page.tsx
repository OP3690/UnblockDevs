import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'What Is Big-O Notation? Explained Without Math (Complete Guide)',
  description: 'Big-O notation explained simply. O(1), O(n), O(log n), O(n²) with examples. Beginner-friendly. For coding interviews.',
  keywords: [
    'big o notation',
    'big o notation explained',
    'time complexity',
    'o1 on olog n',
    'big o notation examples',
    'algorithm complexity',
    'time complexity explained',
    'big o notation simple',
    'o notation explained',
    'algorithm efficiency',
    'big o notation chart',
    'time complexity big o',
    'coding interview big o',
    'algorithm analysis'
  ],
  openGraph: {
    title: 'What Is Big-O Notation? Explained Without Math (Complete Guide)',
    description: 'Learn Big-O notation explained simply without complex math. Understand O(1), O(n), O(log n), O(n²) with real-world examples.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/what-is-big-o-notation-explained-without-math',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-big-o-notation-explained-without-math',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
