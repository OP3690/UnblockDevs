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

const toolsItemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': 'https://unblockdevs.com/#tools-list',
  name: 'Free Developer Tools by UnblockDevs',
  description: '50+ free browser-based developer tools — no signup, no data upload, GDPR-safe.',
  url: 'https://unblockdevs.com',
  numberOfItems: 55,
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'JSON Formatter', url: 'https://unblockdevs.com/json-formatter', description: 'Format, beautify, and validate JSON in your browser — no upload.' },
    { '@type': 'ListItem', position: 2, name: 'JWT Decoder', url: 'https://unblockdevs.com/jwt-decoder', description: 'Decode JWT tokens client-side — header, payload, expiry, and security audit.' },
    { '@type': 'ListItem', position: 3, name: 'cURL Converter', url: 'https://unblockdevs.com/curl-converter', description: 'Convert cURL commands to Python, JavaScript, Go, Java, PHP, Ruby, Rust, and more.' },
    { '@type': 'ListItem', position: 4, name: 'CORS Tester', url: 'https://unblockdevs.com/cors-tester', description: 'Test CORS headers for any API endpoint and diagnose cross-origin errors.' },
    { '@type': 'ListItem', position: 5, name: 'SQL Formatter', url: 'https://unblockdevs.com/sql-formatter', description: 'Format and indent SQL queries for MySQL, PostgreSQL, SQLite, and T-SQL.' },
    { '@type': 'ListItem', position: 6, name: 'Base64 Encoder', url: 'https://unblockdevs.com/base64-encoder', description: 'Encode and decode Base64 strings including URL-safe Base64.' },
    { '@type': 'ListItem', position: 7, name: 'JSON Validator', url: 'https://unblockdevs.com/json-validator', description: 'Validate JSON syntax and structure against RFC 8259 and JSON Schema.' },
    { '@type': 'ListItem', position: 8, name: 'JSON Beautifier', url: 'https://unblockdevs.com/json-beautifier', description: 'Beautify and pretty-print JSON with syntax highlighting.' },
    { '@type': 'ListItem', position: 9, name: 'Regex Tester', url: 'https://unblockdevs.com/regex-tester', description: 'Test regular expressions with real-time match highlighting and group capture.' },
    { '@type': 'ListItem', position: 10, name: 'UUID Generator', url: 'https://unblockdevs.com/uuid-generator', description: 'Generate cryptographically random UUID v4 values in bulk.' },
    { '@type': 'ListItem', position: 11, name: 'Hash Generator', url: 'https://unblockdevs.com/hash-generator', description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes entirely in the browser.' },
    { '@type': 'ListItem', position: 12, name: 'URL Encoder', url: 'https://unblockdevs.com/url-encoder', description: 'Encode and decode URL components and query string parameters.' },
    { '@type': 'ListItem', position: 13, name: 'AI Schema Masker', url: 'https://unblockdevs.com/ai-schema-masker', description: 'Mask sensitive field values in JSON before sharing with ChatGPT or other AI tools.' },
    { '@type': 'ListItem', position: 14, name: 'HAR to cURL', url: 'https://unblockdevs.com/har-to-curl', description: 'Convert browser HAR export files to individual cURL commands.' },
    { '@type': 'ListItem', position: 15, name: 'JSON to Excel', url: 'https://unblockdevs.com/json-to-excel', description: 'Convert JSON arrays to Excel spreadsheet or CSV format.' },
    { '@type': 'ListItem', position: 16, name: 'JSON Schema Generator', url: 'https://unblockdevs.com/json-schema-generation', description: 'Generate JSON Schema from sample JSON data automatically.' },
    { '@type': 'ListItem', position: 17, name: 'Password Generator', url: 'https://unblockdevs.com/password-generator', description: 'Generate secure random passwords with custom length and character sets.' },
    { '@type': 'ListItem', position: 18, name: 'Timestamp Converter', url: 'https://unblockdevs.com/timestamp-converter', description: 'Convert Unix timestamps to human-readable dates and vice versa.' },
    { '@type': 'ListItem', position: 19, name: 'Log Unpacker', url: 'https://unblockdevs.com/log-unpacker', description: 'Unpack and decode nested JSON logs, escaped strings, and JWT tokens from logs.' },
    { '@type': 'ListItem', position: 20, name: 'Text Diff', url: 'https://unblockdevs.com/text-diff', description: 'Compare two text blocks side-by-side and highlight line-level differences.' },
    { '@type': 'ListItem', position: 21, name: 'JSON Comparator', url: 'https://unblockdevs.com/json-comparator', description: 'Compare two JSON objects and highlight added, removed, and changed keys.' },
    { '@type': 'ListItem', position: 22, name: 'JSON Fixer', url: 'https://unblockdevs.com/json-fixer', description: 'Auto-fix common JSON syntax errors: trailing commas, single quotes, and more.' },
    { '@type': 'ListItem', position: 23, name: 'SQL IN Generator', url: 'https://unblockdevs.com/sql-in-generator', description: 'Convert a list of values into a SQL IN clause instantly.' },
    { '@type': 'ListItem', position: 24, name: 'Number Base Converter', url: 'https://unblockdevs.com/number-base-converter', description: 'Convert between binary, octal, decimal, and hexadecimal number bases.' },
    { '@type': 'ListItem', position: 25, name: 'Color Converter', url: 'https://unblockdevs.com/color-converter', description: 'Convert colors between HEX, RGB, HSL, and HSV formats.' },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsItemListSchema) }} />
      <HomeClient hero={<HomeServerHero />} />
    </>
  );
}
