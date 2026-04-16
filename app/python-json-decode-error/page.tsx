import type { Metadata } from 'next';
import PythonJsonDecodeErrorClient from './client';

export const metadata: Metadata = {
  title: 'Fix Python json.JSONDecodeError — Causes & Solutions | UnblockDevs',
  description:
    'Fix Python json.loads() JSONDecodeError and ValueError. Covers HTML responses, BOM characters, trailing commas, encoding issues, and safe parsing patterns.',
  keywords: [
    'python json decode error',
    'python json loads error',
    'python jsondecodeerror fix',
    'json loads valueerror',
    'python json parse error',
    'python requests json error',
    'python invalid json',
    'python json response error',
    'python json unexpected token',
    'python json encoding fix',
    'json loads expecting value',
    'python json loads none',
    'python fix json response',
    'requests get json error',
    'python json bom fix',
    'python json loads html response',
    'python json loads empty string',
    'python json loads single quotes',
    'python json trailing comma',
    'python json loads bytes',
    'python json 500 error response',
    'python safe json parsing',
  ],
  openGraph: {
    title: 'Fix Python json.JSONDecodeError — Causes & Solutions | UnblockDevs',
    description:
      'Fix Python json.loads() JSONDecodeError and ValueError. Covers HTML responses, BOM characters, trailing commas, encoding issues, and safe parsing patterns.',
    type: 'website',
    url: 'https://unblockdevs.com/python-json-decode-error',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Fix Python JSONDecodeError' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix Python json.JSONDecodeError | UnblockDevs',
    description: 'Fix Python JSONDecodeError: HTML responses, BOM, empty string, trailing commas, and more.',
  },
  alternates: { canonical: 'https://unblockdevs.com/python-json-decode-error' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Python JSONDecodeError Fix Guide',
  url: 'https://unblockdevs.com/python-json-decode-error',
  description:
    'Complete guide to fixing Python json.JSONDecodeError — HTML responses, BOM characters, empty strings, trailing commas, and safe parsing patterns.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '860',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is json.JSONDecodeError in Python?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'json.JSONDecodeError is a subclass of ValueError raised by json.loads() and json.load() when the input is not valid JSON. It includes the position of the error, making it easier to debug. Common causes include receiving an HTML error page instead of JSON, an empty response body, BOM characters, single quotes, or trailing commas.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does requests.json() raise JSONDecodeError?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'requests.json() calls json.loads() on the response body. If the server returns an HTML error page (e.g., a 500 Internal Server Error page), an empty body, or non-JSON content, JSONDecodeError is raised. Always check response.status_code and response.headers["Content-Type"] before calling .json().',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I handle JSONDecodeError safely?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wrap json.loads() in a try/except json.JSONDecodeError block. Log the raw text for debugging. For requests, check the HTTP status code and Content-Type header before calling .json(). Always have a fallback return value such as None or an empty dict.',
      },
    },
    {
      '@type': 'Question',
      name: "What causes 'Expecting value: line 1 column 1'?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "This specific message means json.loads() received an empty string or a string that starts with a character that is not valid JSON (such as '<' from an HTML page). Check that response.text is not empty and that the Content-Type is application/json before parsing.",
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix BOM characters in JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A BOM (Byte Order Mark, \\ufeff) at the start of a file causes json.loads() to fail. Strip it with: json.loads(text.lstrip("\\ufeff")). Alternatively, open the file with encoding="utf-8-sig" which strips the BOM automatically: json.load(open(path, encoding="utf-8-sig")).',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix Python json.JSONDecodeError in 4 Steps',
  description: 'Step-by-step guide to diagnosing and fixing Python JSONDecodeError exceptions.',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Check the HTTP status code and Content-Type header',
      text: 'Before calling .json(), verify response.status_code is 200 and response.headers.get("Content-Type", "") contains "application/json". A 4xx or 5xx response often returns HTML, not JSON.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Print response.text to see what was actually returned',
      text: 'Add a debug line: print(repr(response.text[:500])). This shows if you received HTML, an empty string, a BOM character, or malformed JSON.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Wrap json.loads() in try/except json.JSONDecodeError',
      text: 'Catch the exception, log the raw text for debugging, and return a safe fallback value. Never let a JSONDecodeError crash a production service.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Validate the JSON with a linter or validator tool',
      text: 'Paste the raw response into a JSON validator to identify exactly which character or line is invalid. Fix the source (server configuration, encoding settings) if it is under your control.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools' },
    { '@type': 'ListItem', position: 3, name: 'Fix Python JSONDecodeError', item: 'https://unblockdevs.com/python-json-decode-error' },
  ],
};

export default function PythonJsonDecodeErrorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PythonJsonDecodeErrorClient />
    </>
  );
}
