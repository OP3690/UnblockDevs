import type { Metadata } from 'next';
import AiPromptEngineeringGuideClient from './client';

export const metadata: Metadata = {
  title: 'AI Prompt Engineering Guide: Best Prompts for Great Results | UnblockDevs',
  description: 'Complete guide to AI prompt engineering: how to write effective prompts, best practices, techniques, and templates. Learn how to get great results from ChatGPT, Cursor, and other AI tools.',
  keywords: [
    'ai prompt engineering',
    'how to write ai prompts',
    'best ai prompts',
    'prompt engineering techniques',
    'chatgpt prompts',
    'ai prompt templates',
    'effective ai prompts'
  ],
};

export default function AiPromptEngineeringGuide() {
  return <AiPromptEngineeringGuideClient />;
}

