import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Data Quality Issues & How Engineers Fix Them | UnblockDevs',
  description: 'Common data quality issues: missing values, duplicates, inconsistencies. How data engineers identify, fix, and prevent them.',
  keywords: [
    'data quality issues',
    'data quality problems',
    'data quality fixes',
    'data cleaning',
    'data validation',
    'missing data',
    'duplicate data',
    'data inconsistency',
    'data quality solutions',
    'data quality best practices',
    'data engineering data quality',
    'how to fix data quality'
  ],
  openGraph: {
    title: 'Data Quality Issues & How Engineers Fix Them | UnblockDevs',
    description: 'Learn common data quality issues and how data engineers identify, fix, and prevent data quality problems.',
    type: 'article',
    publishedTime: '2026-02-08T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/common-data-quality-issues-and-how-data-engineers-fix-them',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Data%20Quality%20Issues%20%26%20How%20Engineers%20Fix%20Them&emoji=%F0%9F%94%A7&desc=Learn%20common%20data%20quality%20issues%20and%20how%20data%20engineers%20identify%2C%20fix%2C%20and', width: 1200, height: 630, alt: 'Data Quality Issues & How Engineers Fix Them — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Quality Issues & How Engineers Fix Them | UnblockDevs',
    description: 'Learn common data quality issues and how data engineers identify, fix, and prevent data quality problems.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/common-data-quality-issues-and-how-data-engineers-fix-them',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
