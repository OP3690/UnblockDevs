import type { Metadata } from 'next';
import AiPromptEngineeringGuideClient from './client';

export const metadata: Metadata = {
  title: 'AI Prompt Engineering: Guide to Better AI Prompts | UnblockDevs',
  description: 'AI prompt engineering: how to write effective prompts for ChatGPT, Cursor, and more. Learn best practices, proven techniques, and ready-to-use templates for better outputs.',
  keywords: [
    'ai prompt engineering',
    'how to write ai prompts',
    'best ai prompts',
    'prompt engineering techniques',
    'chatgpt prompts',
    'ai prompt templates',
    'effective ai prompts',
    'prompt engineering guide',
    'ai prompting best practices',
    'claude prompts',
    'what is prompt engineering',
    'how to prompt ai models'
  ],
  openGraph: {
    title: 'AI Prompt Engineering Guide: Write Better Prompts for ChatGPT, Claude & Cursor',
    description: 'Master AI prompt engineering — learn to write clear, effective prompts for ChatGPT, Claude, and Cursor. Includes best practices, proven techniques, and ready-to-use templates for better AI outputs.',
    type: 'article',
    publishedTime: '2025-01-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/ai-prompt-engineering-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=AI%20Prompt%20Engineering%20Guide&emoji=%F0%9F%93%9D&desc=AI%20prompt%20engineering%3A%20effective%20prompts%2C%20best%20practices%2C%20techniques%2C%20templates.', width: 1200, height: 630, alt: 'AI Prompt Engineering Guide — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Prompt Engineering: Guide to Better AI Prompts',
    description: 'Learn AI prompt engineering: effective prompts, best practices, and templates for ChatGPT, Cursor, and more. Get consistently better AI outputs.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-prompt-engineering-guide' },

};

export default function AiPromptEngineeringGuide() {
  return <AiPromptEngineeringGuideClient />;
}

