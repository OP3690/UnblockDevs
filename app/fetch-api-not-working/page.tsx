import type { Metadata } from 'next';
import FetchApiNotWorkingClient from './client';

export const metadata: Metadata = {
  title: 'Fetch API Not Working? 8 Common Causes & Fixes | UnblockDevs',
  description:
    'Fix "fetch is not defined", CORS errors, 404s, and JSON parse failures in the Fetch API. Complete debugging guide with code examples. Free tools included.',
  keywords: [
    'fetch api not working',
    'fetch is not defined',
    'fetch api error',
    'fetch api cors error',
    'fetch api not returning data',
    'fetch api json not parsing',
    'fetch api 404',
    'how to debug fetch api',
    'fetch api request failed',
    'fetch api undefined',
    'javascript fetch not working',
    'fetch api network error',
    'fetch api response not json',
    'async fetch not working',
    'fetch api bearer token',
    'fetch api body json',
    'fetch api fix',
    'fetch request failing',
    'fetch post not working',
    'fetch missing await',
    'fetch content type json',
    'node fetch is not defined',
  ],
  openGraph: {
    title: 'Fetch API Not Working? 8 Common Causes & Fixes | UnblockDevs',
    description:
      'Fix "fetch is not defined", CORS errors, 404s, and JSON parse failures in the Fetch API. Complete debugging guide with code examples.',
    type: 'website',
    url: 'https://unblockdevs.com/fetch-api-not-working',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Fix Fetch API' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fetch API Not Working? 8 Causes & Fixes | UnblockDevs',
    description: 'Fix fetch is not defined, CORS errors, 404s, and JSON parse failures in the Fetch API.',
  },
  alternates: { canonical: 'https://unblockdevs.com/fetch-api-not-working' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fetch API Debugging Guide',
  url: 'https://unblockdevs.com/fetch-api-not-working',
  description:
    'Complete guide to fixing Fetch API errors — fetch is not defined, CORS failures, missing await, JSON parse errors, and more. Includes free debugging tools.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '980',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why is fetch returning undefined?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Fetch returns undefined when you forget to await the Promise. You must use "const res = await fetch(url)" and then "const data = await res.json()". Without await, you get a Promise object, not the actual data.',
      },
    },
    {
      '@type': 'Question',
      name: "How do I fix 'fetch is not defined' in Node.js?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "fetch is not defined in Node.js versions below 18. Solutions: (1) Upgrade to Node.js 18+ which has native fetch built-in. (2) Install node-fetch: npm install node-fetch and import it as: import fetch from 'node-fetch'. (3) Use axios as an alternative.",
      },
    },
    {
      '@type': 'Question',
      name: 'Why is my fetch not sending the body?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Common causes: (1) You forgot to set method: "POST" — GET requests cannot have a body. (2) You passed a plain object instead of JSON.stringify(data). (3) You forgot the Content-Type: application/json header, so the server doesn\'t parse the body.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I send JSON with fetch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }). You must stringify the body and set the Content-Type header, otherwise the server will not parse it as JSON.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is fetch returning a CORS error?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A CORS error means the server you are fetching from does not allow requests from your origin. The fix must be made on the server by adding Access-Control-Allow-Origin headers. In development, use your build tool proxy (Vite or CRA) to forward requests.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Debug a Failing Fetch Request',
  description: 'Step-by-step process for diagnosing and fixing Fetch API issues.',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Check the browser Network tab',
      text: 'Open DevTools (F12) > Network tab. Find the failing request and check its status code, response headers, and response body to understand what went wrong.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Check for CORS errors in the Console tab',
      text: 'If the console shows "blocked by CORS policy", the fix must be made on the server. See the CORS error fix guide for detailed instructions.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Verify you are awaiting the fetch and .json() calls',
      text: 'Ensure you use "const res = await fetch(url)" and "const data = await res.json()". Missing await is one of the most common fetch bugs.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Check request headers and body',
      text: 'In the Network tab, click the request and view the Request Headers and Payload tabs. Verify Content-Type is set for POST requests and the body is properly stringified.',
    },
    {
      '@type': 'HowToStep',
      position: 5,
      name: 'Test with cURL or a tool',
      text: 'Use a tool to replay the exact request. If it works in cURL but not fetch, the issue is likely CORS or a browser-specific header. Compare the request headers carefully.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools' },
    { '@type': 'ListItem', position: 3, name: 'Fetch API Not Working', item: 'https://unblockdevs.com/fetch-api-not-working' },
  ],
};

export default function FetchApiNotWorkingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <FetchApiNotWorkingClient />
    </>
  );
}
