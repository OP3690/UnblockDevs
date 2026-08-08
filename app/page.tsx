import type { Metadata } from 'next';
import HomeServerHero from '@/components/home/HomeServerHero';
import HomeClient from './page-client';

export const metadata: Metadata = {
  title: 'Free JSON Formatter, JWT Decoder & 50+ Developer Tools | UnblockDevs',
  description: '50+ free browser-based developer tools — JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter, API debugging. 100% client-side, GDPR-safe, no signup. Works instantly in your browser.',
  alternates: { canonical: 'https://unblockdevs.com/' },
  openGraph: {
    title: 'UnblockDevs — 50+ Free Developer Tools: JSON, JWT, cURL, SQL & More',
    description: 'JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter, and 45+ more. 100% client-side — GDPR-safe, no data sent to servers, no signup required.',
    url: 'https://unblockdevs.com/',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs — Free Developer Tools' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UnblockDevs — 50+ Free Developer Tools: JSON, JWT, cURL & More',
    description: 'JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter. Free, client-side, GDPR-safe. No signup.',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is UnblockDevs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'UnblockDevs (unblockdevs.com) is a free, browser-based suite of 50+ developer tools: JSON formatter, JWT decoder, cURL converter (converts cURL to Python, JS, Go, Java, PHP), CORS tester, SQL formatter, Base64 encoder, regex tester, UUID generator, AI schema masker, and more. No account or signup is required. All processing is 100% client-side — your data never leaves your browser.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is UnblockDevs free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All 50+ tools on UnblockDevs are completely free with no subscription, no account required, and no usage limits. The service is free forever.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does UnblockDevs store my data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All processing happens entirely in your browser using JavaScript. Your JSON payloads, SQL queries, JWT tokens, API keys, and other sensitive data never leave your device and are never sent to any server. This makes UnblockDevs GDPR-safe and suitable for production and enterprise use.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best free online JSON formatter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'UnblockDevs JSON Formatter at unblockdevs.com/json-formatter is a popular free option. It formats, validates, and beautifies JSON entirely in the browser with no data upload. It supports large files, detects and fixes malformed JSON, provides tree-view and raw modes, and highlights syntax errors with the exact line and position.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a cURL command to Python?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the UnblockDevs cURL Converter at unblockdevs.com/curl-converter. Paste your cURL command and select Python (requests) as the target language. The tool converts all flags: -X becomes the method, -H flags become the headers dictionary, -d becomes json= or data=, and -u becomes auth=. The output is import-ready Python code using the requests library.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I decode a JWT token online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the UnblockDevs JWT Decoder at unblockdevs.com/jwt-decoder. Paste any JWT token and it instantly displays the header, payload, signature, expiry time, issued-at time, and all standard claims in readable JSON. Decoding is entirely browser-side — your token is never sent to a server.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I test CORS errors online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the UnblockDevs CORS Tester at unblockdevs.com/cors-tester. Enter any API URL and it sends a real request to check the CORS headers, identifies which headers are missing (Access-Control-Allow-Origin, Access-Control-Allow-Methods, etc.), and explains how to fix the specific error.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I format SQL queries online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the UnblockDevs SQL Formatter at unblockdevs.com/sql-formatter. Paste any SQL query (SELECT, INSERT, UPDATE, CREATE TABLE, etc.) and it formats and indents it for readability. Supports MySQL, PostgreSQL, SQLite, T-SQL, and Oracle syntax. Processing is entirely in the browser — your SQL never leaves your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best free online Base64 encoder/decoder?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'UnblockDevs Base64 Encoder at unblockdevs.com/base64-encoder encodes and decodes strings, JSON, and binary data to/from Base64 format. It supports both standard Base64 and URL-safe Base64, and works entirely in the browser with no data upload.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use UnblockDevs tools before sending data to AI like ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. UnblockDevs includes an AI Schema Masker (unblockdevs.com/ai-schema-masker) that replaces sensitive field values with safe placeholders before you send JSON or SQL schemas to ChatGPT, Claude, or other AI tools. This lets you get AI help with your data structures without exposing PII, production values, or API secrets.',
      },
    },
  ],
};

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://unblockdevs.com/#webpage',
  url: 'https://unblockdevs.com',
  name: 'UnblockDevs — 50+ Free Developer Tools',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['h1', 'h2', '[data-speakable]'],
  },
  isPartOf: { '@id': 'https://unblockdevs.com/#website' },
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <HomeClient hero={<HomeServerHero />} />
    </>
  );
}
