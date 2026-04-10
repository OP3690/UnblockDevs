import type { Metadata } from 'next';
import FixUnexpectedTokenLessThanClient from './client';

export const metadata: Metadata = {
  title: 'Free Guide: Fix "Unexpected token < in JSON" Error | UnblockDevs',
  description: 'Fix "Unexpected token < in JSON" error instantly. This means HTML was returned instead of JSON. Free guide with solutions and JSON fixer tool. No signup required.',
  keywords: [
    'fix unexpected token < in json',
    'unexpected token < json error',
    'html instead of json',
    'json parse error html',
    'fix json html error',
    'api returned html not json',
    'unexpected token < fix'
  ],
  openGraph: {
    title: 'Fix "Unexpected token < in JSON" Error | UnblockDevs',
    description: 'Fix "Unexpected token < in JSON" error instantly. This means HTML was returned instead of JSON. Free guide with solutions and JSON fixer tool. No signup required.',
    type: 'website',
    url: 'https://unblockdevs.com/fix-unexpected-token-less-than-json',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'Fix Unexpected token < in JSON Error | UnblockDevs', description: 'Fix "Unexpected token < in JSON" error. Free guide with solutions and JSON fixer tool.' },
  alternates: { canonical: 'https://unblockdevs.com/fix-unexpected-token-less-than-json' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fix Unexpected token < in JSON',
  url: 'https://unblockdevs.com/fix-unexpected-token-less-than-json',
  description: 'Fix "Unexpected token < in JSON" error — HTML returned instead of JSON. Check API endpoints, status codes, and authentication. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '720',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does "Unexpected token < in JSON" mean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It means JSON.parse() received an HTML response instead of JSON. The < character is the start of an HTML tag. This usually happens when an API returns a 404 or 500 HTML error page instead of a JSON body.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix "Unexpected token < in JSON"?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Check the HTTP status code and Content-Type header of the response. If status is 404 or 500, fix the API endpoint URL. If authentication is required, add the correct Authorization header. Always check response.ok before calling response.json().',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is my API returning HTML instead of JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common reasons: the endpoint URL is wrong and returns a 404 page, the server crashed and returned a 500 error page, authentication is required and the server redirected to a login page, or the Content-Type header is not being set correctly by the server.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix "Unexpected token < in JSON" Error',
  description: 'Step-by-step guide to fixing the error when an API returns HTML instead of JSON.',
  totalTime: 'PT3M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Check the API response in browser DevTools',
      text: 'Open DevTools Network tab and inspect the failing request. Check the Status Code and Response body to see what the server actually returned.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Verify the API endpoint URL',
      text: 'Confirm the URL is correct — a 404 returns an HTML "Not Found" page. Test the endpoint directly in your browser or with curl.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Check authentication',
      text: 'If the API requires authentication, ensure your Authorization header or API key is present and valid. A 401 redirect to a login page causes this error.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Add response validation to your code',
      text: 'Check response.ok and Content-Type before calling response.json(). Throw a descriptive error for non-2xx status codes instead of trying to parse HTML as JSON.',
    },
  ],
};


const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Fix Unexpected Token < in JSON', item: 'https://unblockdevs.com/fix-unexpected-token-less-than-json' },
  ],
};
export default function FixUnexpectedTokenLessThan() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FixUnexpectedTokenLessThanClient />
    </>
  );
}

