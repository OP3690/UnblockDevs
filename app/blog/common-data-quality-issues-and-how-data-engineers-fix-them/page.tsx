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
    url: 'https://unblockdevs.com/blog/common-data-quality-issues-and-how-data-engineers-fix-them',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/common-data-quality-issues-and-how-data-engineers-fix-them',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
