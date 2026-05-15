import type { Metadata } from 'next';
import JsonPromptInjectionClient from './client';

export const metadata: Metadata = {
  title: 'JSON Prompt Injection: How Attackers Manipulate AI Apps Through JSON Data | UnblockDevs',
  description: 'JSON prompt injection attacks let hackers hijack your AI app through user-supplied JSON data. Learn how every attack vector works and build a complete defense layer.',
  keywords: [
    'json prompt injection',
    'ai security json',
    'llm prompt injection attack',
    'json injection attack 2026',
    'ai app security json',
    'prompt injection via json',
    'llm data poisoning json',
    'json sanitization ai',
    'chatgpt prompt injection',
    'secure json ai pipeline',
    'ai security best practices',
    'llm security json validation',
    'json attack vector ai',
    'indirect prompt injection json',
    'ai jailbreak json',
  ],
  openGraph: {
    title: 'JSON Prompt Injection: How Attackers Manipulate AI Apps Through JSON Data',
    description: 'JSON prompt injection attacks let hackers hijack your AI through user-supplied data. Learn every attack vector and build a complete defense layer.',
    type: 'article',
    publishedTime: '2026-05-15T08:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-prompt-injection-ai-security-guide',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs — JSON Prompt Injection Security Guide' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Prompt Injection: How Attackers Manipulate AI Apps Through JSON Data',
    description: 'How hackers hijack AI apps through user-supplied JSON — and the complete defense playbook.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-prompt-injection-ai-security-guide' },
};

export default function JsonPromptInjectionPage() {
  return <JsonPromptInjectionClient />;
}
