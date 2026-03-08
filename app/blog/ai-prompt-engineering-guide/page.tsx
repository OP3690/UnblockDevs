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
  alternates: { canonical: 'https://unblockdevs.com/blog/ai-prompt-engineering-guide' },

};

export default function AiPromptEngineeringGuide() {
  return <AiPromptEngineeringGuideClient />;
}

