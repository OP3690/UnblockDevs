import type { Metadata } from 'next';
import AiPromptEngineeringGuideClient from './client';

export const metadata: Metadata = {
  title: 'AI Prompt Engineering Guide | UnblockDevs',
  description: 'AI prompt engineering: effective prompts, best practices, techniques, templates. ChatGPT, Cursor, and more.',
  keywords: [
    'unblock devs ai',
    'unblockdevs ai',
    'ai prompt engineering',
    'how to write ai prompts',
    'best ai prompts',
    'prompt engineering techniques',
    'chatgpt prompts',
    'ai prompt templates',
    'effective ai prompts'
  ],
  openGraph: {
    title: 'AI Prompt Engineering Guide',
    description: 'AI prompt engineering: effective prompts, best practices, techniques, templates',
    type: 'article',
    url: 'https://unblockdevs.com/blog/ai-prompt-engineering-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=AI%20Prompt%20Engineering%20Guide&emoji=%F0%9F%A4%96&desc=AI%20prompt%20engineering%3A%20effective%20prompts%2C%20best%20practices%2C%20techniques%2C%20templates', width: 1200, height: 630, alt: 'AI Prompt Engineering Guide — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Prompt Engineering Guide',
    description: 'AI prompt engineering: effective prompts, best practices, techniques, templates',
    images: ['https://unblockdevs.com/api/og?title=AI%20Prompt%20Engineering%20Guide&emoji=%F0%9F%A4%96&desc=AI%20prompt%20engineering%3A%20effective%20prompts%2C%20best%20practices%2C%20techniques%2C%20templates'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-prompt-engineering-guide' },

};

export default function AiPromptEngineeringGuide() {
  return <AiPromptEngineeringGuideClient />;
}

