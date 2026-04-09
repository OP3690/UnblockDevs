import type { Metadata } from 'next';
import HowToFixBrokenJsonClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: How to Fix Broken JSON Online – Step by Step | UnblockDevs',
  description: 'Fix broken JSON online with our step-by-step guide. Free JSON fixer tool included. No signup required. Works entirely in your browser.',
  keywords: [
    'how to fix broken json online',
    'fix broken json',
    'repair json online',
    'fix malformed json',
    'json error fixer',
    'fix invalid json',
    'json repair tool',
    'fix json syntax errors'
  ],
  openGraph: {
    title: 'How to Fix Broken JSON Online | UnblockDevs',
    description: 'Fix broken JSON online with our step-by-step guide. Free JSON fixer tool included. No signup required. Works entirely in your browser.',
    type: 'website',
    url: 'https://unblockdevs.com/how-to-fix-broken-json-online',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'How to Fix Broken JSON Online | UnblockDevs', description: 'Fix broken JSON online with our step-by-step guide. Free JSON fixer tool included. No signup required.' },
  alternates: { canonical: 'https://unblockdevs.com/how-to-fix-broken-json-online' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'How to Fix Broken JSON Online',
  url: 'https://unblockdevs.com/how-to-fix-broken-json-online',
  description: 'Fix broken JSON online instantly. Step-by-step guide with free JSON fixer tool. No signup, 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1120',
    bestRating: '5',
  },
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix Broken JSON Online',
  description: 'A beginner-friendly step-by-step guide to fixing broken JSON using a free online tool.',
  totalTime: 'PT3M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Identify the error message',
      text: 'Look at the JSON parse error message. It will tell you what went wrong — unexpected token, trailing comma, unexpected end of input, or invalid character.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Paste your broken JSON into the fixer',
      text: 'Copy your broken JSON and paste it into the JSON Fixer tool on this page. The tool highlights the exact location of every error.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Click Fix JSON',
      text: 'The fixer automatically repairs common errors: removes trailing commas, fixes single quotes, adds missing closing brackets. Click the Fix button.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Copy the fixed JSON',
      text: 'Once the JSON is valid, copy it to your clipboard. Verify the structure looks right before using it in your application.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I fix broken JSON online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your broken JSON into the JSON Fixer tool on this page and click Fix. The tool automatically detects and repairs common errors like trailing commas, single quotes, unquoted keys, and missing closing brackets.',
      },
    },
    {
      '@type': 'Question',
      name: 'What are the most common JSON errors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common JSON errors are: trailing commas after the last element, using single quotes instead of double quotes, unquoted object keys, missing closing brackets or braces, and invalid characters like comments or undefined values.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to paste my JSON here?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All processing happens entirely in your browser. Your JSON is never sent to any server, making it safe to use with sensitive or confidential data.',
      },
    },
  ],
};

export default function HowToFixBrokenJson() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <HowToFixBrokenJsonClient />
    </>
  );
}

