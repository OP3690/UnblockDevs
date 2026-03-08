import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Use AI for MySQL Without Exposing Schema | UnblockDevs',
  description:
    'Use ChatGPT with MySQL safely: anonymize MySQL schema, hide column names and table names before AI. Client-side reversible masking, no server storage. Step-by-step with MySQL example.',
  keywords: [
    'clean sql queries instantly',
    'format messy sql query',
    'secure MySQL AI queries',
    'anonymize MySQL schema',
    'use ChatGPT with MySQL safely',
    'hide column names before AI',
    'MySQL schema masking',
    'AI MySQL without exposing schema',
  ],
  openGraph: {
    title: 'How to Use AI for MySQL Without Exposing Your Database Schema',
    description: 'Anonymize MySQL schema before AI. Client-side masking, reversible. No server, no logging.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/how-to-use-ai-for-mysql-without-exposing-database-schema',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-use-ai-for-mysql-without-exposing-database-schema',
  },
};

export default function UseAIForMySQLBlogPage() {
  return <BlogPostClient />;
}
