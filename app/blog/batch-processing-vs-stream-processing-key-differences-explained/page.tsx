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
    url: 'https://unblockdevs.com/blog/batch-processing-vs-stream-processing-key-differences-explained',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/batch-processing-vs-stream-processing-key-differences-explained',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
