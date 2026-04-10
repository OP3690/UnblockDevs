import type { Metadata } from 'next';
import FixUnexpectedTokenClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: Fix "Unexpected token } in JSON" Error | UnblockDevs',
  description: 'Fix "Unexpected token } in JSON" error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
  keywords: [
    'fix unexpected token in json',
    'unexpected token json error',
    'fix unexpected token } in json',
    'json parse unexpected token',
    'json syntax error fix',
    'unexpected token error',
    'json error fixer',
    'fix broken json'
  ],
  openGraph: {
    title: 'Fix "Unexpected token } in JSON" Error | UnblockDevs',
    description: 'Fix "Unexpected token } in JSON" error instantly. Free guide with examples and JSON fixer tool. No signup required, works in your browser.',
    type: 'website',
    url: 'https://unblockdevs.com/fix-unexpected-token-in-json',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'Fix Unexpected token in JSON Error | UnblockDevs', description: 'Fix "Unexpected token } in JSON" error instantly. Free guide with examples and JSON fixer tool.' },
  alternates: { canonical: 'https://unblockdevs.com/fix-unexpected-token-in-json' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fix Unexpected token in JSON',
  url: 'https://unblockdevs.com/fix-unexpected-token-in-json',
  description: 'Fix "Unexpected token } in JSON" errors instantly. Detect trailing commas, single quotes, and other common JSON syntax errors. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1050',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What causes "Unexpected token } in JSON"?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This error usually means there is a trailing comma before the closing brace (e.g. {"a":1,}), the JSON contains comments (not valid in JSON), or a JavaScript object literal with unquoted keys was used instead of valid JSON.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix "Unexpected token } in JSON" error?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your JSON into the fixer above. It detects trailing commas, comments, and unquoted keys, and removes them automatically to produce valid JSON.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are trailing commas allowed in JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. JSON does not allow trailing commas after the last element in an array or object. This is a common mistake when converting JavaScript code to JSON. The JSON fixer removes trailing commas automatically.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix "Unexpected token } in JSON" Error',
  description: 'Step-by-step guide to fixing the "Unexpected token } in JSON" error.',
  totalTime: 'PT2M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Identify the problematic character',
      text: 'The error message names the unexpected token — usually } or , after a trailing comma. Check the area around that character in your JSON.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste your JSON into the fixer',
      text: 'Copy your broken JSON and paste it into the JSON Fixer above to highlight all syntax errors at once.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Click Auto-Fix',
      text: 'The auto-fixer removes trailing commas, replaces single quotes with double quotes, and fixes other common issues automatically.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Copy the fixed JSON',
      text: 'Copy the repaired JSON and use it in your application, API call, or config file.',
    },
  ],
};


const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Fix Unexpected Token in JSON', item: 'https://unblockdevs.com/fix-unexpected-token-in-json' },
  ],
};
export default function FixUnexpectedToken() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FixUnexpectedTokenClient />
    </>
  );
}

