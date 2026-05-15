import type { Metadata } from 'next';
import LlmStructuredJsonOutputsClient from './client';

export const metadata: Metadata = {
  title: 'LLM Structured JSON Outputs in 2026: OpenAI, Anthropic & Gemini Complete Guide | UnblockDevs',
  description: 'Master structured JSON outputs for every major LLM: OpenAI function calling, Anthropic tool use, Gemini response schemas, and open-source alternatives. Full code, benchmarks, and decision guide.',
  keywords: [
    'llm structured output 2026',
    'openai function calling json',
    'openai structured outputs',
    'anthropic tool use json',
    'gemini json response schema',
    'llm json output',
    'structured output ai',
    'json mode llm',
    'function calling vs structured output',
    'openai json schema response',
    'claude tool use schema',
    'ai reliable json output',
    'llm json extraction',
    'pydantic llm output',
    'zod llm response validation',
    'structured generation ai 2026',
  ],
  openGraph: {
    title: 'LLM Structured JSON Outputs in 2026: OpenAI, Anthropic & Gemini Complete Guide',
    description: 'Master structured JSON outputs for every major LLM: OpenAI, Anthropic, Gemini. Full code examples, benchmarks, and a clear decision guide.',
    type: 'article',
    publishedTime: '2026-05-15T10:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/llm-structured-json-outputs-complete-guide-2026',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs — LLM Structured JSON Outputs Guide 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LLM Structured JSON Outputs 2026: OpenAI, Anthropic & Gemini Complete Guide',
    description: 'Function calling, JSON mode, tool use, response schemas — every method compared with real code.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/llm-structured-json-outputs-complete-guide-2026' },
};

export default function LlmStructuredJsonOutputsPage() {
  return <LlmStructuredJsonOutputsClient />;
}
