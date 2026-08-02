import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Use AI for MySQL Without Exposing Database Schema | UnblockDevs',
  description:
    'Use ChatGPT with MySQL safely by anonymizing schema before sending queries. Client-side masking hides table and column names — no server, no data exposure.',
  keywords: [
    'use AI for MySQL safely',
    'MySQL schema masking AI',
    'anonymize MySQL schema before AI',
    'hide MySQL column names from ChatGPT',
    'ChatGPT MySQL without exposing schema',
    'client-side MySQL masking',
    'MySQL table name anonymization AI',
    'secure MySQL AI queries',
    'AI MySQL without database exposure',
    'how to use ChatGPT with MySQL securely',
    'MySQL schema privacy AI tools',
    'protect MySQL schema from AI',
  ],
  openGraph: {
    title: 'How to Use AI for MySQL Without Exposing Your Database Schema',
    description: 'Want to get AI help with MySQL queries without exposing sensitive table or column names? This guide shows client-side schema masking that\'s reversible — your schema never leaves your browser.',
    type: 'article',
    publishedTime: '2026-02-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-use-ai-for-mysql-without-exposing-database-schema',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Use%20AI%20for%20MySQL%20Without%20Exposing%20Your%20Database%20Schema&emoji=%F0%9F%97%84%EF%B8%8F&desc=Anonymize%20MySQL%20schema%20before%20AI', width: 1200, height: 630, alt: 'How to Use AI for MySQL Without Exposing Your Database Schema — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Use AI for MySQL Without Exposing Database Schema',
    description: 'Anonymize MySQL schema before sending to ChatGPT. Client-side masking hides table and column names with no server storage required.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-use-ai-for-mysql-without-exposing-database-schema',
  },
};

export default function UseAIForMySQLBlogPage() {
  return <BlogPostClient />;
}
