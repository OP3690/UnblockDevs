import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Use ChatGPT for SQL Without Exposing Your Database Schema | UnblockDevs',
  description:
    'ChatGPT writes great SQL — but pasting real table and column names leaks your database architecture. Learn how to mask your schema before sending to AI and restore original names from the AI response. Step-by-step guide.',
  keywords: [
    'chatgpt sql safely',
    'use chatgpt for sql without exposing database',
    'chatgpt sql database security',
    'mask database schema chatgpt',
    'safe sql with ai',
    'chatgpt sql schema privacy',
    'ai sql generator security',
    'send sql to chatgpt safely',
    'database schema protection ai',
    'chatgpt sql production database',
    'sql ai privacy',
    'schema masking chatgpt',
    'secure chatgpt sql workflow',
    'ai sql security best practices',
    'chatgpt sql without real table names',
  ],
  openGraph: {
    title: 'How to Use ChatGPT for SQL Without Exposing Your Database Schema | UnblockDevs',
    description: 'Mask table and column names before sending to ChatGPT. Restore original names from AI response. Step-by-step secure SQL AI workflow with schema masking.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-use-chatgpt-for-sql-safely',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Use ChatGPT for SQL Without Exposing Your Database Schema',
    description: 'Mask schema identifiers before sending to AI. Restore original names from the response. Secure SQL + AI workflow.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-use-chatgpt-for-sql-safely' },
};

export default function HowToUseChatGptForSqlSafelyPage() {
  return <BlogPostClient />;
}
