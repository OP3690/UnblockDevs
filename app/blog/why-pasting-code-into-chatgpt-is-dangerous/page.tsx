import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Why Pasting Code into ChatGPT Is Dangerous — API Keys, Secrets & IP Risks | UnblockDevs',
  description:
    'Every time you paste code into ChatGPT or Copilot you expose API keys, database credentials, proprietary logic, and PII. Learn exactly what risks you are taking and how to eliminate them with code masking.',
  keywords: [
    'pasting code into chatgpt dangerous',
    'chatgpt api key exposure',
    'is it safe to paste code into chatgpt',
    'chatgpt see my api keys',
    'does chatgpt store code i paste',
    'github copilot code privacy risk',
    'code secrets leak ai',
    'chatgpt intellectual property risk',
    'ai coding assistant security risk',
    'accidentally pasted api key chatgpt',
    'openai training data developer code',
    'chatgpt code confidentiality',
    'developer code privacy ai tools',
    'can chatgpt steal my code',
    'is github copilot safe for proprietary code',
  ],
  openGraph: {
    title: 'Why Pasting Code into ChatGPT Is Dangerous — API Keys, Secrets & IP Risks',
    description: 'API keys, database credentials, proprietary logic, PII — all exposed when you paste code into ChatGPT. Learn the real risks and how to protect yourself.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/why-pasting-code-into-chatgpt-is-dangerous',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Why%20Pasting%20Code%20into%20ChatGPT%20Is%20Dangerous%20%E2%80%94%20API%20Keys%2C%20Secrets%20%26%20IP%20Risks&emoji=%F0%9F%A4%96&desc=API%20keys%2C%20database%20credentials%2C%20proprietary%20logic%2C%20PII', width: 1200, height: 630, alt: 'Why Pasting Code into ChatGPT Is Dangerous — API Keys, Secrets & IP Risks — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Pasting Code into ChatGPT Is Dangerous',
    description: 'API keys, secrets, PII, proprietary logic — all exposed. Learn the risks and how to protect yourself.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/why-pasting-code-into-chatgpt-is-dangerous' },
};

export default function WhyPastingCodeIntoGhatGptIsDangerousPage() {
  return <BlogPostClient />;
}
