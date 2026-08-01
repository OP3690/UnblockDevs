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
    publishedTime: '2026-02-05T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/what-is-big-o-notation-explained-without-math',
    images: [{ url: 'https://unblockdevs.com/api/og?title=What%20Is%20Big-O%20Notation%3F%20Explained%20Without%20Math%20%28Complete%20Guide%29&emoji=%F0%9F%A4%96&desc=Learn%20Big-O%20notation%20explained%20simply%20without%20complex%20math', width: 1200, height: 630, alt: 'What Is Big-O Notation? Explained Without Math (Complete Guide) — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Big-O Notation? Explained Without Math (Complete Guide)',
    description: 'Learn Big-O notation explained simply without complex math. Understand O(1), O(n), O(log n), O(n²) with real-world examples.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-big-o-notation-explained-without-math',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
