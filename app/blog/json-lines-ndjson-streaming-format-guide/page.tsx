import type { Metadata } from 'next';
import JsonLinesNdjsonClient from './client';

export const metadata: Metadata = {
  title: 'JSON Lines & NDJSON: The Streaming Format Powering Every AI API in 2026 | UnblockDevs',
  description: 'NDJSON powers OpenAI, Anthropic, and Gemini streaming APIs. Learn JSON Lines format, how to parse streaming LLM responses, build real-time AI UIs, and process massive datasets.',
  keywords: [
    'ndjson guide',
    'json lines format',
    'streaming json ai',
    'llm streaming format',
    'openai streaming json',
    'ndjson vs json',
    'json lines parsing javascript',
    'streaming llm response',
    'ndjson python',
    'json newline delimited',
    'server-sent events json',
    'claude streaming api',
    'gemini streaming json',
    'json lines big data',
    'ndjson processing nodejs',
    'real-time ai json streaming',
  ],
  openGraph: {
    title: 'JSON Lines & NDJSON: The Streaming Format Powering Every AI API in 2026',
    description: 'NDJSON powers OpenAI, Anthropic, and Gemini streaming. Master JSON Lines parsing, streaming AI UIs, and massive dataset processing.',
    type: 'article',
    publishedTime: '2026-05-15T09:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-lines-ndjson-streaming-format-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs — JSON Lines NDJSON Streaming Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Lines & NDJSON: The Streaming Format Powering Every AI API in 2026',
    description: 'NDJSON powers ChatGPT, Claude, and Gemini streaming. Master it in 15 minutes.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-lines-ndjson-streaming-format-guide' },
};

export default function JsonLinesNdjsonPage() {
  return <JsonLinesNdjsonClient />;
}
