import type { Metadata } from 'next';
import JsonEscapeCharactersClient from './client';

export const metadata: Metadata = {
  title: 'JSON Escape Characters — Complete Reference & Fixer | UnblockDevs',
  description:
    'Learn which characters must be escaped in JSON strings. Fix escape errors in API payloads, config files, and JavaScript. Free JSON formatter tool included.',
  keywords: [
    'json escape characters',
    'json string escape',
    'json escape backslash',
    'json escape double quote',
    'json escape newline',
    'json special characters',
    'json escape sequence',
    'json escape forward slash',
    'json escape unicode',
    'json invalid escape',
    'json escape apostrophe',
    'json escape tab',
    'json escape carriage return',
    'json string characters',
    'escape json for api',
    'json backslash escape',
    'json escape online',
    'json escape windows path',
    'json multiline string fix',
    'json escape html characters',
    'json stringify escape',
    'json dumps escape python',
  ],
  openGraph: {
    title: 'JSON Escape Characters — Complete Reference & Fixer | UnblockDevs',
    description:
      'Learn which characters must be escaped in JSON strings. Fix escape errors in API payloads, config files, and JavaScript. Free JSON formatter tool included.',
    type: 'website',
    url: 'https://unblockdevs.com/json-escape-characters',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - JSON Escape Characters' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Escape Characters — Complete Reference | UnblockDevs',
    description: 'Complete reference for JSON escape sequences. Fix backslash, newline, quote, and Unicode escape errors.',
  },
  alternates: { canonical: 'https://unblockdevs.com/json-escape-characters' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Escape Characters Reference',
  url: 'https://unblockdevs.com/json-escape-characters',
  description:
    'Complete reference guide for JSON escape characters — backslash, double quote, newline, tab, Unicode, and more. With broken/fixed examples and free formatter.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '740',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What characters must be escaped in JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The JSON specification requires these characters to be escaped inside strings: double quote (\\"), backslash (\\\\), and control characters including newline (\\n), carriage return (\\r), tab (\\t), form feed (\\f), and backspace (\\b). Unicode characters can optionally be escaped as \\uXXXX. Forward slash (\\/) can also be escaped but is optional.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I escape a backslash in JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A backslash in JSON must be doubled: use \\\\ to represent a single backslash character. This is important for Windows file paths — C:\\Users\\name must be written as "C:\\\\Users\\\\name" in a JSON string.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I use single quotes in JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. JSON strings must use double quotes. Single quotes are not valid in JSON and will cause a parse error. There is no need to escape single quotes inside a JSON string — they can appear as-is between double quotes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I include a newline in a JSON string?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the escape sequence \\n for a newline inside a JSON string. You cannot include a literal newline (pressing Enter) inside a JSON string — it will cause a parse error. For multi-line text, join lines with \\n: "line1\\nline2".',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I escape Unicode characters in JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the \\uXXXX format where XXXX is the 4-digit hexadecimal Unicode code point. For example, the euro sign € is \\u20AC. Most JSON serializers (json.dumps in Python, JSON.stringify in JavaScript) handle Unicode escaping automatically when needed.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix JSON Escape Character Errors in 4 Steps',
  description: 'Step-by-step guide to identifying and fixing JSON string escape errors.',
  totalTime: 'PT3M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Identify the invalid character in the error message',
      text: 'JSON parse errors for escape issues typically say "Invalid escape sequence" or "Unexpected token" at a specific position. The position tells you which character in the string is the problem.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Locate unescaped special characters in the string',
      text: 'Look for raw backslashes, double quotes, newlines, or tab characters inside JSON string values. These must be replaced with their escape sequences.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Replace each character with its JSON escape sequence',
      text: 'Use the reference table: \\ → \\\\, " → \\", newline → \\n, tab → \\t, carriage return → \\r. For Windows paths, double all backslashes.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Use JSON.stringify() or json.dumps() to escape automatically',
      text: 'Let the language built-in serializer handle escaping. In JavaScript: JSON.stringify(value). In Python: json.dumps(value). These functions correctly escape all required characters.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools' },
    { '@type': 'ListItem', position: 3, name: 'JSON Escape Characters', item: 'https://unblockdevs.com/json-escape-characters' },
  ],
};

export default function JsonEscapeCharactersPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <JsonEscapeCharactersClient />
    </>
  );
}
