import type { Metadata } from 'next';
import PromptChunkerLandingClient from './client';

export const metadata: Metadata = {
  title: 'AI Prompt Chunker - Split Long Prompts into Manageable Chunks | UnblockDevs',
  description: 'Free AI Prompt Chunker tool. Split long AI prompts into manageable chunks with overlap for better context. Perfect for ChatGPT, Claude, and other AI tools with token limits. No signup required.',
  keywords: [
    'ai prompt chunker',
    'prompt chunker',
    'split ai prompts',
    'chunk ai prompts',
    'prompt splitter',
    'ai prompt tool',
    'chatgpt prompt chunker',
    'claude prompt chunker',
    'long prompt splitter',
    'prompt organizer',
    'ai prompt manager',
    'token limit prompt tool',
    'prompt chunking tool',
    'split prompts online',
    'free prompt chunker'
  ],
  openGraph: {
    title: 'AI Prompt Chunker - Split Long Prompts into Manageable Chunks',
    description: 'Free tool to split long AI prompts into manageable chunks with overlap. Perfect for AI tools with token limits.',
    type: 'website',
    url: 'https://unblockdevs.com/prompt-chunker',
  },
};

export default function PromptChunkerLanding() {
  return <PromptChunkerLandingClient />;
}

