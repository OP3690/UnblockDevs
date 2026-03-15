import type { Metadata } from 'next';
import IsItSafeToPasteSqlIntoChatgptClient from './client';

export const metadata: Metadata = {
  title: 'Is It Safe to Paste SQL Into ChatGPT? Risks & How to Mask Data | UnblockDevs',
  description: 'Is it safe to paste SQL into ChatGPT? Learn the risks of exposing schema and data, and how to mask tables and columns before sending to AI.',
  keywords: [
    'is it safe to paste sql into chatgpt',
    'paste sql chatgpt safe',
    'chatgpt sql schema',
    'mask sql before chatgpt',
    'mask database table before chatgpt',
    'sql chatgpt privacy',
    'send sql to ai safely',
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/is-it-safe-to-paste-sql-into-chatgpt' },
};

export default function IsItSafeToPasteSqlIntoChatgptPage() {
  return <IsItSafeToPasteSqlIntoChatgptClient />;
}
