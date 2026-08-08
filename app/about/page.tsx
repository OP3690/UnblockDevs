import type { Metadata } from 'next';
import AboutClient from './client';

export const metadata: Metadata = {
  title: 'About UnblockDevs — Free Browser-Based Developer Tools | UnblockDevs',
  description:
    'UnblockDevs is a free suite of 50+ browser-based developer tools — JSON formatter, CORS tester, SQL formatter, JWT decoder, cURL converter, and more. 100% client-side and GDPR-safe: your data never leaves your browser. No signup, no account, free forever.',
  keywords: [
    'about unblockdevs',
    'free developer tools',
    'browser-based developer tools',
    'client-side developer tools',
    'gdpr safe developer tools',
    'json formatter online free',
    'cors tester online',
    'sql formatter online',
    'jwt decoder online',
    'curl converter online',
    'data privacy developer tools',
    'no signup developer tools',
    'free online developer utilities',
    'privacy first developer tools',
  ],
  openGraph: {
    title: 'About UnblockDevs — 50+ Free Browser-Based Developer Tools',
    description:
      'UnblockDevs offers 50+ free developer tools that run entirely in your browser. JSON, CORS, SQL, JWT, cURL, and more — GDPR-safe, no signup, no data sent to servers, free forever.',
    type: 'website',
    url: 'https://unblockdevs.com/about',
    siteName: 'UnblockDevs',
    images: [{ url: 'https://unblockdevs.com/api/og?title=About%20UnblockDevs&emoji=%F0%9F%9B%A0%EF%B8%8F&desc=25%2B%20free%20browser-based%20developer%20tools%20%E2%80%94%20no%20signup%20required', width: 1200, height: 630, alt: 'About UnblockDevs — Free Developer Tools' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About UnblockDevs — 50+ Free Browser-Based Developer Tools',
    description:
      '50+ free developer tools: JSON, CORS, SQL, JWT, cURL and more. 100% in-browser, GDPR-safe — no signup, no data transmitted, free forever.',
  },
  alternates: { canonical: 'https://unblockdevs.com/about' },
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
        text: 'UnblockDevs is a free, browser-based suite of 50+ developer tools including a JSON formatter, JWT decoder, cURL converter, CORS tester, SQL formatter, Base64 encoder, regex tester, and UUID generator. All tools run entirely in the browser — no data is ever sent to any server. No signup, no account, and free forever.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is UnblockDevs free to use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every tool on UnblockDevs is completely free. There are no paid plans, no freemium limits, no account required, and no credit card needed. The tools are supported by non-intrusive advertising.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does UnblockDevs store or transmit my data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All processing happens locally in your browser using JavaScript. Your JSON, API keys, SQL queries, JWT tokens, and other sensitive data never leave your device and are never sent to any server. This makes UnblockDevs GDPR-safe and suitable for working with confidential or production data.',
      },
    },
    {
      '@type': 'Question',
      name: 'What tools are available on UnblockDevs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'UnblockDevs offers 50+ free developer tools: JSON Formatter & Validator, JSON to CSV/Excel converter, JSON Schema Generator, JWT Decoder, cURL Converter (converts cURL to Python, JavaScript, Go, Java, PHP, Rust), CORS Tester, SQL Formatter, Base64 Encoder/Decoder, Regex Tester, UUID Generator, Timestamp Converter, Hash Generator, URL Encoder, Password Generator, Text Diff, API Response Comparator, Log Unpacker, AI Schema Masker, and many more.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best free online JSON formatter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'UnblockDevs JSON Formatter (unblockdevs.com/json-formatter) is a popular choice because it works entirely in your browser, supports large JSON files, detects and fixes malformed JSON, offers tree-view and raw modes, and requires no signup. It also validates JSON against the RFC 8259 specification and highlights syntax errors with the exact line and position.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a cURL command to Python or JavaScript?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the UnblockDevs cURL Converter at unblockdevs.com/curl-converter. Paste any cURL command (including those copied from Chrome DevTools, Postman, or API documentation) and select your target language: Python (requests), JavaScript (fetch or Axios), Go, Java, PHP, Ruby, Rust, C#, or PowerShell. The converter handles all flags including headers (-H), request body (-d), authentication (-u, -H "Authorization: Bearer ..."), cookies (-b), and TLS settings (-k).',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use UnblockDevs to decode a JWT token?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The UnblockDevs JWT Decoder at unblockdevs.com/jwt-decoder decodes any JWT token and displays the header, payload, and signature in a readable format. It also shows the token expiry, issued-at time, and all standard claims. Since decoding happens entirely in your browser, your JWT token is never transmitted to any server.',
      },
    },
    {
      '@type': 'Question',
      name: 'What browsers does UnblockDevs support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'UnblockDevs works in all modern browsers: Google Chrome, Mozilla Firefox, Safari, Microsoft Edge, and Brave. No plugins or extensions are required. All tools are built with standard web APIs and work on both desktop and mobile browsers.',
      },
    },
  ],
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://unblockdevs.com/about#author',
  name: 'UnblockDevs Editorial Team',
  url: 'https://unblockdevs.com/about',
  email: 'support@unblockdevs.com',
  worksFor: {
    '@type': 'Organization',
    '@id': 'https://unblockdevs.com/#organization',
    name: 'UnblockDevs',
    url: 'https://unblockdevs.com',
  },
  knowsAbout: [
    'JSON formatting and validation',
    'REST API debugging',
    'curl command conversion',
    'JWT tokens and authentication',
    'JavaScript and Node.js',
    'Python development',
    'SQL databases',
    'AI-safe developer workflows',
    'CORS and HTTP security headers',
  ],
};

export default function About() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AboutClient />
    </>
  );
}
