import type { Metadata } from 'next';
import ConvertCurlToHttpRequestClient from './client';

const canonicalUrl = 'https://unblockdevs.com/convert-curl-to-http-request';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'cURL to HTTP Request Converter',
  url: canonicalUrl,
  description: 'Convert cURL commands to HTTP request format. All methods, headers, auth. Free, in-browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  dateModified: '2026-05-27',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Convert cURL to raw HTTP request format',
    'Supports GET, POST, PUT, PATCH, DELETE methods',
    'Handles custom headers and authentication',
    '100% client-side — no data sent to any server',
  ],};

export const metadata: Metadata = {
  title: 'Free cURL to HTTP Request Converter — Instant | UnblockDevs',
  description: 'Convert cURL commands to raw HTTP request format. Supports all HTTP methods, custom headers, and authentication. Free, in-browser, no signup needed.',
  keywords: [
    'convert curl to http request',
    'curl to http request',
    'convert curl command to http',
    'curl http request converter',
    'curl to http online',
    'transform curl to http',
    'curl to raw http',
    'curl to http format online',
    'curl to http request converter',
    'curl command to http',
    'curl to fetch request',
    'curl to http nodejs',
    'curl to axios request',
    'curl to http python',
    'curl to java httpclient',
    'curl to c# httpclient',
    'curl to php curl',
    'curl to golang http',
    'curl to ruby net http',
    'parse curl command',
    'curl http request generator',
    'convert curl to code online',
    'curl command parser',
    'curl to http headers',
    'curl post to http request',
    'curl bearer token to http',
    'curl to javascript http',
    'curl command to api call',
    'how to convert curl to http request',
    'curl to postman collection',
    'curl http request format',
    'curl to insomnia',
    'curl to rest api',
    'curl command converter online',
    'curl request converter',
    'curl to nodejs http',
    'curl options to http',
    'curl -H to http headers',
    'curl -d to http body',
    'curl -X to http method',
    'free curl converter',
    'curl api call converter',
    'curl to http request tool',
    'curl multipart to http',
    'curl syntax parser',
    'curl command to fetch api',
    'curl command to xmlhttprequest',
    'curl to http request online free',
    'curl to go http',
    'curl to c plus plus http',
  ],
  twitter: {
    card: 'summary_large_image',
    title: 'Convert cURL to HTTP Request | UnblockDevs',
    description: 'Convert cURL commands to readable HTTP request format. Supports all methods, headers, cookies, auth, and body parsing. Free, browser-based, no signup.',
  },
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: 'Free cURL to HTTP Request Converter – Instant Conversion | UnblockDevs',
    description: 'Convert cURL commands to HTTP request format instantly. Free online converter supporting all HTTP methods, headers, and authentication. No signup, no login, works in your browser.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: 'https://unblockdevs.com/api/og?title=Free%20cURL%20to%20HTTP%20Request%20Converter%20%E2%80%93%20Instant%20Conversion&emoji=%E2%9A%A1&desc=Convert%20cURL%20commands%20to%20HTTP%20request%20format%20instantly', width: 1200, height: 630, alt: 'Free cURL to HTTP Request Converter – Instant Conversion — UnblockDevs' }],
  },
};

export default function ConvertCurlToHttpRequest() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ConvertCurlToHttpRequestClient />
    </>
  );
}

