import type { Metadata } from 'next';
import PromptChunkerLandingClient from './client';

export const metadata: Metadata = {
  title: 'Free AI Prompt Chunker & Simplifier – Split & Optimize Prompts | UnblockDevs',
  description: 'Split long AI prompts into chunks with overlap, or simplify messy prompts into optimized, structured prompts. Intent detection, quality scoring, safety scan. Free for ChatGPT, Claude, Gemini.',
  keywords: [
    'ai prompt chunker',
    'prompt simplifier',
    'prompt optimizer',
    'split ai prompts',
    'optimize prompts',
    'prompt engineering',
    'chatgpt prompt',
    'claude prompt',
    'prompt templates',
    'prompt quality score',
    'free prompt chunker',
    'prompt chunking tool',
    'split prompts online',
  ],
  openGraph: {
    title: 'AI Prompt Chunker & Simplifier - Split & Optimize Prompts',
    description: 'Split long prompts into chunks or simplify messy prompts into structured, high-quality prompts. Intent detection, quality score, safety scan.',
    type: 'website',
    url: 'https://unblockdevs.com/prompt-chunker',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/prompt-chunker',
  },
};

export default function PromptChunkerLanding() {
  return <PromptChunkerLandingClient />;
}

