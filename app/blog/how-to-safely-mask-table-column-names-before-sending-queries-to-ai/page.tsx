import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Safely Mask Table & Column Names Before Sending Queries to AI | UnblockDevs',
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
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-safely-mask-table-column-names-before-sending-queries-to-ai',
  },
};

export default function MaskTableColumnNamesBlogPage() {
  return <BlogPostClient />;
}
