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
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Convert cURL to raw HTTP request format',
    'Supports GET, POST, PUT, PATCH, DELETE methods',
    'Handles custom headers and authentication',
    '100% client-side — no data sent to any server',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '640',
    bestRating: '5',
  },
};

export const metadata: Metadata = {
  title: 'Free cURL to HTTP Request Converter – Instant Conversion | UnblockDevs',
  description: 'Convert cURL to HTTP request format. All methods, headers, auth. Free, in-browser.',
  keywords: [
    'convert curl to http request',
    'curl to http request',
    'convert curl command to http',
    'curl http request converter',
    'curl to http online',
    'transform curl to http'
  ],
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: 'Free cURL to HTTP Request Converter – Instant Conversion | UnblockDevs',
    description: 'Convert cURL commands to HTTP request format instantly. Free online converter supporting all HTTP methods, headers, and authentication. No signup, no login, works in your browser.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
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

