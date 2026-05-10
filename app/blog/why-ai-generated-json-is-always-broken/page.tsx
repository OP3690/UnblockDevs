import type { Metadata } from 'next';
import WhyAiJsonBrokenClient from './client';

export const metadata: Metadata = {
  title: 'Why AI-Generated JSON Is Always Broken — and How to Fix Every Error | UnblockDevs',
  description: 'ChatGPT, Claude, and Gemini consistently produce invalid JSON. Learn exactly why AI models break JSON, the 8 patterns they get wrong, and how to auto-fix every error.',
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
  ],
  openGraph: {
    title: 'Why AI-Generated JSON Is Always Broken — and How to Fix Every Error',
    description: 'ChatGPT, Claude, and Gemini consistently produce invalid JSON. Learn exactly why AI breaks JSON and how to fix every error automatically.',
    type: 'article',
    publishedTime: '2026-05-10T08:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/why-ai-generated-json-is-always-broken',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs — AI JSON Error Fix Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why AI-Generated JSON Is Always Broken — and How to Fix Every Error',
    description: 'ChatGPT, Claude, and Gemini consistently produce invalid JSON. Learn exactly why and how to fix it.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/why-ai-generated-json-is-always-broken' },
};

export default function WhyAiJsonBrokenPage() {
  return <WhyAiJsonBrokenClient />;
}
