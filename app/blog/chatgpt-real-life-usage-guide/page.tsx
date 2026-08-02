import type { Metadata } from 'next';
import ChatgptRealLifeUsageGuideClient from './client';

export const metadata: Metadata = {
  title: 'ChatGPT Real-World Usage Guide: Best Prompts | UnblockDevs',
  description: 'ChatGPT real-world usage guide: best prompts, use cases, and when to use it vs other AI tools. Learn prompt engineering for developers and professionals.',
  keywords: [
    'chatgpt real life usage',
    'chatgpt prompts',
    'how to use chatgpt',
    'chatgpt for developers',
    'chatgpt best practices',
    'chatgpt examples',
    'prompt engineering chatgpt',
    'chatgpt use cases',
    'chatgpt tips and tricks',
    'chatgpt vs claude',
    'best chatgpt prompts for developers'
  ],
  openGraph: {
    title: 'ChatGPT Real-World Usage Guide: Best Prompts & Use Cases for Developers',
    description: 'Learn how to use ChatGPT in real life — the best prompts, practical use cases, when to use it vs other AI tools, and prompt engineering tips for developers and professionals.',
    type: 'article',
    publishedTime: '2025-01-28T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/chatgpt-real-life-usage-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=ChatGPT%20Usage%20Guide%3A%20Best%20Prompts&emoji=%F0%9F%93%9D&desc=ChatGPT%20in%20real%20life%3A%20use%20cases%2C%20best%20prompts%2C%20when%20to%20use.%20Prompt%20engineering%20f', width: 1200, height: 630, alt: 'ChatGPT Usage Guide: Best Prompts — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChatGPT Real-World Usage Guide: Best Prompts',
    description: 'ChatGPT real-life usage: best prompts, top use cases, and when to use it vs Claude or Perplexity. Practical guide for developers.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/chatgpt-real-life-usage-guide' },

};

export default function ChatgptRealLifeUsageGuide() {
  return <ChatgptRealLifeUsageGuideClient />;
}
