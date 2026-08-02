import type { Metadata } from 'next';
import LlmStructuredJsonOutputsClient from './client';

export const metadata: Metadata = {
  title: 'LLM Structured JSON Output: Complete 2026 Guide | UnblockDevs',
  description: 'Master LLM structured JSON outputs in 2026: OpenAI function calling, Anthropic tool use, Gemini response schemas, and open-source alternatives with real code.',
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
    'ai reliable json output',
    'llm json extraction',
    'how to get structured json from llm',
    'openai json schema response format',
  ],
  openGraph: {
    title: 'LLM Structured JSON Outputs in 2026: OpenAI, Anthropic & Gemini Guide',
    description: 'Master structured JSON outputs for every major LLM: OpenAI function calling, Anthropic tool use, Gemini response schemas, and open-source alternatives — full code examples and benchmarks included.',
    type: 'article',
    publishedTime: '2026-05-15T10:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/llm-structured-json-outputs-complete-guide-2026',
    images: [{ url: 'https://unblockdevs.com/api/og?title=LLM%20Structured%20JSON%20Outputs%20in%202026%3A%20OpenAI%2C%20Anthropic%20%26%20Gemini%20Complete%20Guide&emoji=%7B%7D&desc=Master%20structured%20JSON%20outputs%20for%20every%20major%20LLM%3A%20OpenAI%2C%20Anthropic%2C%20Gemini', width: 1200, height: 630, alt: 'LLM Structured JSON Outputs in 2026: OpenAI, Anthropic & Gemini Complete Guide — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LLM Structured JSON Output: Complete 2026 Guide',
    description: 'Function calling, JSON mode, tool use, and response schemas — every major LLM method compared with real code examples and benchmarks.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/llm-structured-json-outputs-complete-guide-2026' },
};

export default function LlmStructuredJsonOutputsPage() {
  return <LlmStructuredJsonOutputsClient />;
}
