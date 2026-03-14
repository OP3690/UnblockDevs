import type { Metadata } from 'next';
import JsonValidatorClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON Validator & Syntax Checker – Instant Results | UnblockDevs',
  description: 'Validate JSON syntax instantly. Free JSON validator, detailed errors. No signup, 100% in-browser.',
  keywords: [
    'json validator',
    'json validator online',
    'json validator free',
    'validate json online',
    'json syntax validator',
    'json checker',
    'json validation tool',
    'validate json syntax'
  ],
  openGraph: {
    title: 'Free JSON Validator & Syntax Checker | UnblockDevs',
    description: 'Validate JSON syntax instantly. Free JSON validator, detailed errors. No signup, 100% in-browser.',
    type: 'website',
    url: 'https://unblockdevs.com/json-validator',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'Free JSON Validator | UnblockDevs', description: 'Validate JSON syntax instantly. Free JSON validator, detailed errors. No signup, 100% in-browser.' },
  alternates: { canonical: 'https://unblockdevs.com/json-validator' },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is JSON validation?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'JSON validation checks if a JSON string follows the correct syntax rules and structure according to the JSON specification. Invalid keys, missing commas, trailing commas, or wrong brackets cause validation to fail.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Why should I validate JSON?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Validating JSON before using it prevents runtime errors in your application. It is essential when working with APIs, config files, or user input. Catching errors early saves debugging time.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is the JSON Validator free and private?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. The validator at unblockdevs.com/json-validator is 100% free with no signup. All processing happens in your browser, so your JSON is never sent to any server—safe for sensitive data.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What does “Unexpected token” mean in JSON?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'An “Unexpected token” error means the parser found a character or symbol where it did not expect one—for example a comma after the last item, a missing comma between properties, or an unquoted key. The validator will point to the line and position so you can fix it.',
      },
    },
  ],
};

export default function JsonValidator() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <JsonValidatorClient />
    </>
  );
}

