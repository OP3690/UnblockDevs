import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Use ChatGPT for SQL Without Exposing Your Schema | UnblockDevs',
  description:
    'ChatGPT writes great SQL — but pasting real table names leaks your database architecture. Learn how to mask your schema before sending to AI and restore original names.',
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
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Use%20ChatGPT%20for%20SQL%20Without%20Exposing%20Your%20Database%20Schema&emoji=%F0%9F%97%84%EF%B8%8F&desc=Mask%20table%20and%20column%20names%20before%20sending%20to%20ChatGPT', width: 1200, height: 630, alt: 'How to Use ChatGPT for SQL Without Exposing Your Database Schema — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Use ChatGPT for SQL Without Exposing Your Database Schema',
    description: 'Mask your database schema before sending to ChatGPT and restore original names from the AI response. Step-by-step secure SQL + AI workflow guide.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-use-chatgpt-for-sql-safely' },
};

export default function HowToUseChatGptForSqlSafelyPage() {
  return <BlogPostClient />;
}
