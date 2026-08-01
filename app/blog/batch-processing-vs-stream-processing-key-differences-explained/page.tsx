import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Batch vs Stream Processing Explained | UnblockDevs',
  description: 'Learn the difference between batch processing and stream processing. Understand when to use each, latency, throughput, use cases, and real-world examples. Complete comparison guide.',
  keywords: [
    'batch processing vs stream processing',
    'batch vs stream processing',
    'batch processing',
    'stream processing',
    'real-time processing',
    'batch vs real-time',
    'streaming data processing',
    'batch processing examples',
    'stream processing examples',
    'data processing batch stream',
    'apache spark vs kafka',
    'when to use batch vs stream'
  ],
  openGraph: {
    title: 'Batch vs Stream Processing Explained | UnblockDevs',
    description: 'Learn the difference between batch processing and stream processing. Understand when to use each and real-world examples.',
    type: 'article',
    publishedTime: '2026-02-08T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/batch-processing-vs-stream-processing-key-differences-explained',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Batch%20vs%20Stream%20Processing%20Explained&emoji=%F0%9F%A4%96&desc=Learn%20the%20difference%20between%20batch%20processing%20and%20stream%20processing', width: 1200, height: 630, alt: 'Batch vs Stream Processing Explained — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Batch vs Stream Processing Explained | UnblockDevs',
    description: 'Learn the difference between batch processing and stream processing. Understand when to use each and real-world examples.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/batch-processing-vs-stream-processing-key-differences-explained',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
