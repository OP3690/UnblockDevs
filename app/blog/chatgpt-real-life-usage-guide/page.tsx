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
  openGraph: {
    title: 'ChatGPT Usage Guide: Best Prompts',
    description: 'ChatGPT in real life: use cases, best prompts, when to use. Prompt engineering for developers and pros.',
    type: 'article',
    publishedTime: '2025-01-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/chatgpt-real-life-usage-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=ChatGPT%20Usage%20Guide%3A%20Best%20Prompts&emoji=%F0%9F%93%9D&desc=ChatGPT%20in%20real%20life%3A%20use%20cases%2C%20best%20prompts%2C%20when%20to%20use.%20Prompt%20engineering%20f', width: 1200, height: 630, alt: 'ChatGPT Usage Guide: Best Prompts — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChatGPT Usage Guide: Best Prompts',
    description: 'ChatGPT in real life: use cases, best prompts, when to use. Prompt engineering for developers and pros.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/chatgpt-real-life-usage-guide' },

};

export default function ChatgptRealLifeUsageGuide() {
  return <ChatgptRealLifeUsageGuideClient />;
}
