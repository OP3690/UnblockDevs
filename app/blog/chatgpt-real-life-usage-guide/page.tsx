import type { Metadata } from 'next';
import ChatgptRealLifeUsageGuideClient from './client';

export const metadata: Metadata = {
  title: 'ChatGPT Usage Guide: Best Prompts | UnblockDevs',
  description: 'ChatGPT in real life: use cases, best prompts, when to use. Prompt engineering for developers and pros.',
  keywords: [
    'chatgpt real life usage',
    'chatgpt prompts',
    'how to use chatgpt',
    'chatgpt for developers',
    'chatgpt best practices',
    'chatgpt examples',
    'prompt engineering chatgpt'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/chatgpt-real-life-usage-guide' },

};

export default function ChatgptRealLifeUsageGuide() {
  return <ChatgptRealLifeUsageGuideClient />;
}
