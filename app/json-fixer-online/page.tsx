import type { Metadata } from 'next';
import JsonFixerOnlineClient from './client';

export const metadata: Metadata = {
  title: 'Fix Invalid JSON Online – Trailing Comma, AI JSON | UnblockDevs',
  description: 'Paste → instant fix. Remove trailing commas, fix quotes, broken arrays, AI JSON. 100% client-side.',
  keywords: [
    'fix invalid json',
    'remove trailing comma json',
    'json fixer online',
    'advanced json fixer',
    'repair json',
    'trailing comma json',
    'json repair tool',
    'json syntax fixer',
    'fix json from api error',
    'extract json from logs',
    'fix ai generated json',
    'broken json fixer',
  ],
  openGraph: {
    title: 'Fix Invalid JSON Online | UnblockDevs',
    description: 'Paste → instant fix. Remove trailing commas, fix quotes, broken arrays, AI JSON. 100% client-side.',
    type: 'website',
    url: 'https://unblockdevs.com/json-fixer-online',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'Fix Invalid JSON Online | UnblockDevs', description: 'Paste → instant fix. Remove trailing commas, fix quotes, broken arrays, AI JSON. 100% client-side.' },
  alternates: { canonical: 'https://unblockdevs.com/json-fixer-online' },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What does a JSON fixer do?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A JSON fixer automatically detects and repairs common JSON syntax errors such as trailing commas, missing or extra quotes, unclosed brackets or braces, and unquoted keys. Paste broken JSON and get valid, parseable JSON without editing by hand.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can it fix JSON from AI or API errors?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. The fixer handles typical issues from AI-generated JSON (e.g. trailing commas, single quotes, comments) and malformed API responses. It can also extract JSON from log lines or mixed text when the structure is recoverable.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is my JSON sent to a server?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'No. All fixing runs in your browser. Your JSON is never uploaded or stored. Safe for sensitive data, API keys, and production payloads.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between JSON fixer and JSON validator?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A validator only checks if JSON is valid and reports errors. A fixer attempts to repair invalid JSON automatically. Use the fixer when you have broken JSON to recover; use the validator when you want to check without changing the content.',
      },
    },
  ],
};

export default function JsonFixerOnline() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <JsonFixerOnlineClient />
    </>
  );
}

