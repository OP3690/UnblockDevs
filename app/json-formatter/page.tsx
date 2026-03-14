import type { Metadata } from 'next';
import JsonFormatterClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON Formatter & Validator – No Login Required | UnblockDevs',
  description: 'Format and validate JSON instantly. Free formatter, custom indentation. No signup, 100% in-browser.',
  keywords: [
    'json formatter',
    'json formatter online',
    'json formatter online free',
    'json formatter free',
    'format json online',
    'beautify json',
    'prettify json',
    'json beautifier',
    'format json tool',
  ],
  openGraph: {
    title: 'Free JSON Formatter & Validator | UnblockDevs',
    description: 'Format and validate JSON instantly. Free formatter, custom indentation. No signup, 100% in-browser.',
    type: 'website',
    url: 'https://unblockdevs.com/json-formatter',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Formatter & Validator | UnblockDevs',
    description: 'Format and validate JSON instantly. Free formatter, custom indentation. No signup, 100% in-browser.',
  },
  alternates: { canonical: 'https://unblockdevs.com/json-formatter' },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is a JSON formatter?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A JSON formatter (or beautifier) takes minified or messy JSON and adds indentation, line breaks, and spacing so it is readable. It does not change the data—only the formatting. Use it to inspect API responses, config files, or any JSON string.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is this JSON formatter free and safe to use?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. The formatter at unblockdevs.com/json-formatter is free with no signup. All processing runs in your browser—your JSON is never sent to any server, so it is safe for sensitive or private data.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between JSON formatter and JSON validator?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A JSON formatter makes valid JSON readable by adding indentation and line breaks. A JSON validator checks whether a string is valid JSON and reports syntax errors. Often you validate first, then format. This formatter also helps spot errors by making structure visible.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I format JSON with custom indentation?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Use the formatter options to choose 2, 4, or a custom number of spaces for indentation. You can also switch to tabs if preferred. The tool preserves your data and only changes whitespace.',
      },
    },
  ],
};

export default function JsonFormatter() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <JsonFormatterClient />
    </>
  );
}

