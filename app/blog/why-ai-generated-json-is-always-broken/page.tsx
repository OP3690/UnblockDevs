import type { Metadata } from 'next';
import WhyAiJsonBrokenClient from './client';

export const metadata: Metadata = {
  title: 'Why AI-Generated JSON Is Broken — Fix Every Error | UnblockDevs',
  description: 'Learn why AI models like ChatGPT and Gemini produce invalid JSON and how to fix trailing commas, undefined values, and other common AI JSON errors.',
  keywords: [
    'ai generated json broken',
    'chatgpt json errors',
    'llm json output invalid',
    'fix ai json errors',
    'trailing comma json ai',
    'gpt json undefined nan',
    'ai json auto fix',
    'json from chatgpt fix',
    'claude json errors',
    'json llm output broken',
    'fix json from ai',
    'ai produces invalid json',
    'why does chatgpt produce invalid json',
    'llm structured output errors'
  ],
  openGraph: {
    title: 'Why AI-Generated JSON Is Always Broken — and How to Fix Every Error',
    description: 'ChatGPT, Claude, and Gemini consistently produce invalid JSON. Learn exactly why AI breaks JSON — 8 common patterns — and how to fix every error automatically with a free JSON fixer.',
    type: 'article',
    publishedTime: '2026-05-10T08:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/why-ai-generated-json-is-always-broken',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Why%20AI-Generated%20JSON%20Is%20Always%20Broken%20%E2%80%94%20and%20How%20to%20Fix%20Every%20Error&emoji=%7B%7D&desc=ChatGPT%2C%20Claude%2C%20and%20Gemini%20consistently%20produce%20invalid%20JSON', width: 1200, height: 630, alt: 'Why AI-Generated JSON Is Always Broken — and How to Fix Every Error — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why AI-Generated JSON Is Broken — Fix Every Error',
    description: 'ChatGPT and Gemini consistently produce invalid JSON. Learn the 8 patterns that break AI output and how to fix every error automatically.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/why-ai-generated-json-is-always-broken' },
};

export default function WhyAiJsonBrokenPage() {
  return <WhyAiJsonBrokenClient />;
}
