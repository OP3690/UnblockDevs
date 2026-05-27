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
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Use%20AI%20for%20MySQL%20Without%20Exposing%20Your%20Database%20Schema&emoji=%F0%9F%97%84%EF%B8%8F&desc=Anonymize%20MySQL%20schema%20before%20AI', width: 1200, height: 630, alt: 'How to Use AI for MySQL Without Exposing Your Database Schema — UnblockDevs Blog' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-use-ai-for-mysql-without-exposing-database-schema',
  },
};

export default function UseAIForMySQLBlogPage() {
  return <BlogPostClient />;
}
