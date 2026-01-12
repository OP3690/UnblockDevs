import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Difference Between Structured, Semi-Structured, and Unstructured Data (Complete Guide)',
  description: 'Learn the difference between structured, semi-structured, and unstructured data with examples. Understand when to use each type, storage options, and processing methods. Complete comparison guide.',
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
    title: 'Difference Between Structured, Semi-Structured, and Unstructured Data (Complete Guide)',
    description: 'Learn the difference between structured, semi-structured, and unstructured data with examples and comparisons.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/difference-between-structured-semi-structured-and-unstructured-data',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
