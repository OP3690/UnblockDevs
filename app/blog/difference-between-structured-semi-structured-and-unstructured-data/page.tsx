import type { Metadata } from 'next';
import BlogPostClient from './client';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24h cache, static at build

export const metadata: Metadata = {
  title: 'Structured vs Semi-Structured vs Unstructured Data | UnblockDevs',
  description: 'Structured vs semi-structured vs unstructured data. When to use each, storage, processing. Comparison guide.',
  keywords: [
    'structured data',
    'semi structured data',
    'unstructured data',
    'difference between structured and unstructured data',
    'structured vs unstructured data',
    'data types structured unstructured',
    'structured data example',
    'unstructured data example',
    'semi structured data example',
    'data structure types',
    'structured data storage',
    'unstructured data processing'
  ],
  openGraph: {
    title: 'Structured vs Semi-Structured vs Unstructured Data | UnblockDevs',
    description: 'Learn the difference between structured, semi-structured, and unstructured data with examples and comparisons.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/difference-between-structured-semi-structured-and-unstructured-data',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/difference-between-structured-semi-structured-and-unstructured-data',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
