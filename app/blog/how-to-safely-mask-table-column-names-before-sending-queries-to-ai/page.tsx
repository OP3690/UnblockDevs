import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Mask Table & Column Names Before Sending to AI | UnblockDevs',
  description:
    'Learn how to mask table names and column names before sending SQL to ChatGPT or any AI. Hide database schema from AI, anonymize schema, and restore AI output securely. Step-by-step with examples.',
  keywords: [
    'mask table name for ChatGPT',
    'hide database schema from AI',
    'secure SQL before AI',
    'anonymize database schema',
    'mask column names AI',
    'safe SQL AI prompts',
    'client-side SQL masking',
  ],
  openGraph: {
    title: 'How to Safely Mask Table & Column Names Before Sending Queries to AI',
    description: 'Hide database schema from AI, anonymize tables and columns, restore AI output. Client-side, reversible masking.',
    type: 'article',
    publishedTime: '2026-02-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-safely-mask-table-column-names-before-sending-queries-to-ai',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Safely%20Mask%20Table%20%26%20Column%20Names%20Before%20Sending%20Queries%20to%20AI&emoji=%F0%9F%A4%96&desc=Hide%20database%20schema%20from%20AI%2C%20anonymize%20tables%20and%20columns%2C%20restore%20AI%20output', width: 1200, height: 630, alt: 'How to Safely Mask Table & Column Names Before Sending Queries to AI — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Safely Mask Table & Column Names Before Sending Queries to AI',
    description: 'Hide database schema from AI, anonymize tables and columns, restore AI output. Client-side, reversible masking.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-safely-mask-table-column-names-before-sending-queries-to-ai',
  },
};

export default function MaskTableColumnNamesBlogPage() {
  return <BlogPostClient />;
}
