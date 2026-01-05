import type { Metadata } from 'next';
import ChatgptRealLifeUsageGuideClient from './client';

export const metadata: Metadata = {
  title: 'ChatGPT Real-Life Usage Guide: How, What, When & Best Prompts | UnblockDevs',
  description: 'Complete guide to using ChatGPT in real life: practical use cases, best prompts, when to use it, and how to get great results. Learn prompt engineering techniques for developers, writers, and professionals.',
  keywords: [
    'chatgpt real life usage',
    'chatgpt prompts',
    'how to use chatgpt',
    'chatgpt for developers',
    'chatgpt best practices',
    'chatgpt examples',
    'prompt engineering chatgpt'
  ],
};

export default function ChatgptRealLifeUsageGuide() {
  return <ChatgptRealLifeUsageGuideClient />;
}
