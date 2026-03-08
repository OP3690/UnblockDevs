import type { Metadata } from 'next';
import AiToolsDevelopersGuideClient from './client';

export const metadata: Metadata = {
  title: 'AI Tools for Developers: Cursor, Copilot & More | UnblockDevs',
  description: 'AI tools for developers: Cursor, Copilot, ChatGPT. When to use each, best practices.',
  keywords: [
    'unblock devs ai',
    'unblockdevs ai',
    'ai tools for developers',
    'cursor ai',
    'github copilot',
    'ai coding tools',
    'developer ai tools',
    'ai code editor',
    'best ai tools developers'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-tools-developers-guide' },

};

export default function AiToolsDevelopersGuide() {
  return <AiToolsDevelopersGuideClient />;
}

