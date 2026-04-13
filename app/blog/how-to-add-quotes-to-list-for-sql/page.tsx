import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Add Quotes to a List for SQL IN Clause (Fast Online Tool) | UnblockDevs',
  description: "Need to add single quotes, commas, and parentheses to a list of IDs for a SQL IN clause? Here's exactly how — with an instant online formatter that handles Excel lists, CSV, and JSON arrays.",
  keywords: [
    'how to add quotes to list for sql',
    'add single quotes to list for sql query',
    'how to format list for sql in clause',
    'convert list to sql in clause',
    'add quotes to each value sql',
    'wrap values in single quotes sql',
    'how to add commas and quotes to list',
    'how to convert excel list to sql in clause',
    'sql in clause not working with list',
    'format ids for sql in statement',
    'how to prepare id list for sql query',
    'convert newline list to sql format',
    'bulk add single quotes to values',
    'add delimiter to each line online',
    'how to wrap list in single quotes automatically',
    'sql in clause formatter online',
  ],
  openGraph: {
    title: 'How to Add Quotes to a List for SQL IN Clause | UnblockDevs',
    description: "Add single quotes, commas, and parentheses to a list of IDs for SQL IN clause instantly. Works with Excel, CSV, JSON. Free online tool.",
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-add-quotes-to-list-for-sql',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Add Quotes to a List for SQL IN Clause | UnblockDevs',
    description: 'Convert any list to SQL IN clause with single quotes and commas. Handles Excel, CSV, JSON. Free tool.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-add-quotes-to-list-for-sql' },
};

export default function HowToAddQuotesToListForSqlPage() {
  return <BlogPostClient />;
}
