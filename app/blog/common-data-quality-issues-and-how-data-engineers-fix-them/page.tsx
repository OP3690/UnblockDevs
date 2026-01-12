import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Common Data Quality Issues and How Data Engineers Fix Them (Complete Guide)',
  description: 'Learn common data quality issues: missing values, duplicates, inconsistencies, format errors. Understand how data engineers identify, fix, and prevent data quality problems. Complete guide with solutions.',
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
    title: 'Common Data Quality Issues and How Data Engineers Fix Them (Complete Guide)',
    description: 'Learn common data quality issues and how data engineers identify, fix, and prevent data quality problems.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/common-data-quality-issues-and-how-data-engineers-fix-them',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
