import type { Metadata } from 'next';
import AiToolsDevelopersGuideClient from './client';

export const metadata: Metadata = {
  title: 'AI Tools for Developers: Complete Guide to Cursor, GitHub Copilot & More | UnblockDevs',
  description: 'Complete guide to AI tools for developers: Cursor, GitHub Copilot, ChatGPT, and more. Learn how, what, when to use each tool, and best practices for maximum productivity.',
  keywords: [
    'ai tools for developers',
    'cursor ai',
    'github copilot',
    'ai coding tools',
    'developer ai tools',
    'ai code editor',
    'best ai tools developers'
  ],
};

export default function AiToolsDevelopersGuide() {
  return <AiToolsDevelopersGuideClient />;
}

