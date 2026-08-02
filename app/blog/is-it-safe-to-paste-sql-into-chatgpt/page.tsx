import type { Metadata } from 'next';
import IsItSafeToPasteSqlIntoChatgptClient from './client';

export const metadata: Metadata = {
  title: 'Is It Safe to Paste SQL Into ChatGPT? | UnblockDevs',
  description: 'Is it safe to paste SQL into ChatGPT? Learn the real risks of exposing your database schema and data, and how to mask tables and columns before sending to AI.',
  keywords: [
    'is it safe to paste sql into chatgpt',
    'paste sql chatgpt risks',
    'chatgpt sql schema security',
    'mask sql before chatgpt',
    'sql chatgpt data privacy',
    'send sql to ai safely',
    'chatgpt database schema exposure',
    'sql privacy AI tools',
    'safely share sql with AI',
    'sql anonymization before AI',
    'chatgpt sql safety',
    'does chatgpt store sql queries',
  ],
  openGraph: {
    title: 'Is It Safe to Paste SQL Into ChatGPT? Risks & How to Mask Your Data',
    description: 'Pasting SQL into ChatGPT can expose your database schema and sensitive data. Learn the real risks, what ChatGPT does with your data, and how to mask tables and columns before you send any query.',
    type: 'article',
    publishedTime: '2026-03-02T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/is-it-safe-to-paste-sql-into-chatgpt',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Is%20It%20Safe%20to%20Paste%20SQL%20Into%20ChatGPT%3F%20Risks%20%26%20How%20to%20Mask%20Data&emoji=%F0%9F%93%9D&desc=Is%20it%20safe%20to%20paste%20SQL%20into%20ChatGPT%3F%20Learn%20the%20risks%20of%20exposing%20schema%20and%20dat', width: 1200, height: 630, alt: 'Is It Safe to Paste SQL Into ChatGPT? Risks & How to Mask Data — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is It Safe to Paste SQL Into ChatGPT?',
    description: 'Pasting SQL into ChatGPT exposes your schema. Learn the risks and how to safely mask tables and columns before sending queries to AI.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/is-it-safe-to-paste-sql-into-chatgpt' },
};

export default function IsItSafeToPasteSqlIntoChatgptPage() {
  return <IsItSafeToPasteSqlIntoChatgptClient />;
}
