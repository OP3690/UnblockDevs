import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Mask SQL Table & Column Names Before Sending to AI | UnblockDevs',
  description:
    'Learn to mask SQL table and column names before sending queries to AI tools like ChatGPT. Client-side, reversible schema masking with step-by-step examples.',
  keywords: [
    'mask table names before AI',
    'hide database schema from AI',
    'SQL schema masking ChatGPT',
    'anonymize SQL before AI',
    'mask column names AI',
    'client-side schema masking',
    'safe SQL AI prompts',
    'protect database schema AI',
    'how to mask SQL before sending to AI',
    'SQL query anonymization',
    'secure database queries AI',
    'reverse schema masking',
  ],
  openGraph: {
    title: 'How to Safely Mask Table & Column Names Before Sending SQL Queries to AI',
    description: 'Keep your database schema private when using AI tools. Learn how to mask table names, column names, and query structure before sending SQL to ChatGPT, then restore the AI output automatically.',
    type: 'article',
    publishedTime: '2026-02-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-safely-mask-table-column-names-before-sending-queries-to-ai',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Safely%20Mask%20Table%20%26%20Column%20Names%20Before%20Sending%20Queries%20to%20AI&emoji=%F0%9F%A4%96&desc=Hide%20database%20schema%20from%20AI%2C%20anonymize%20tables%20and%20columns%2C%20restore%20AI%20output', width: 1200, height: 630, alt: 'How to Safely Mask Table & Column Names Before Sending Queries to AI — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mask SQL Table & Column Names Before Sending to AI',
    description: 'Mask SQL table and column names before sending to ChatGPT. Client-side, reversible schema masking — your real schema never leaves your browser.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-safely-mask-table-column-names-before-sending-queries-to-ai',
  },
};

export default function MaskTableColumnNamesBlogPage() {
  return <BlogPostClient />;
}
