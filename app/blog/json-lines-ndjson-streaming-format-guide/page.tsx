import type { Metadata } from 'next';
import JsonLinesNdjsonClient from './client';

export const metadata: Metadata = {
  title: 'JSON Lines & NDJSON Streaming Format Guide | UnblockDevs',
  description: 'NDJSON powers OpenAI, Anthropic, and Gemini streaming APIs. Learn JSON Lines format, parse streaming LLM responses, and build real-time AI UIs with examples.',
  keywords: [
    'ndjson guide',
    'json lines format',
    'streaming json ai',
    'llm streaming format',
    'openai streaming json',
    'ndjson vs json',
    'json lines parsing javascript',
    'streaming llm response',
    'server-sent events json',
    'json lines big data',
    'ndjson processing nodejs',
    'how to parse ndjson streaming response',
    'what is json lines format',
    'ndjson vs regular json',
  ],
  openGraph: {
    title: 'JSON Lines & NDJSON: The Streaming Format Behind Every Major AI API',
    description: 'NDJSON powers OpenAI, Anthropic, and Gemini streaming APIs. This guide covers JSON Lines format, how to parse streaming LLM responses in JavaScript and Python, and how to build real-time AI UIs.',
    type: 'article',
    publishedTime: '2026-05-15T09:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-lines-ndjson-streaming-format-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=JSON%20Lines%20%26%20NDJSON%3A%20The%20Streaming%20Format%20Powering%20Every%20AI%20API%20in%202026&emoji=%7B%7D&desc=NDJSON%20powers%20OpenAI%2C%20Anthropic%2C%20and%20Gemini%20streaming', width: 1200, height: 630, alt: 'JSON Lines & NDJSON: The Streaming Format Powering Every AI API in 2026 — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Lines & NDJSON Streaming Format Guide',
    description: 'NDJSON powers ChatGPT, Claude, and Gemini streaming. Learn JSON Lines format, parse LLM responses, and build real-time AI UIs fast.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-lines-ndjson-streaming-format-guide' },
};

export default function JsonLinesNdjsonPage() {
  return <JsonLinesNdjsonClient />;
}
