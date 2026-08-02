import type { Metadata } from 'next';
import BlogPostClient from './client';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24h cache, static at build

export const metadata: Metadata = {
  title: 'Structured vs Semi-Structured vs Unstructured Data | UnblockDevs',
  description: 'Structured vs semi-structured vs unstructured data: definitions, examples, storage, and processing. Learn which data type fits your use case and why it matters.',
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
    title: 'Structured vs Semi-Structured vs Unstructured Data: Full Comparison Guide',
    description: 'Understand the difference between structured, semi-structured, and unstructured data — with real examples, storage options, and processing approaches for each type. Learn when to use which.',
    type: 'article',
    publishedTime: '2026-02-07T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/difference-between-structured-semi-structured-and-unstructured-data',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Structured%20vs%20Semi-Structured%20vs%20Unstructured%20Data&emoji=%F0%9F%9B%A0%EF%B8%8F&desc=Learn%20the%20difference%20between%20structured%2C%20semi-structured%2C%20and%20unstructured%20data', width: 1200, height: 630, alt: 'Structured vs Semi-Structured vs Unstructured Data — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Structured vs Semi-Structured vs Unstructured Data',
    description: 'Structured vs semi-structured vs unstructured data explained — examples, storage, and processing for each type. Learn the differences clearly.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/difference-between-structured-semi-structured-and-unstructured-data',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
