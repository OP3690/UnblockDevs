import type { Metadata } from 'next';
import CurlToPythonRequestsClient from './client';

const canonicalUrl = 'https://unblockdevs.com/curl-to-python-requests';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'cURL to Python Requests Converter',
  url: canonicalUrl,
  description: 'Convert cURL to Python Requests instantly. Full auth, headers, JSON. No signup, in-browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Convert cURL to Python requests library code',
    'Supports all HTTP methods with headers and auth',
    'Handles JSON body, form data, and file uploads',
    '100% client-side — no data sent to any server',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1050',
    bestRating: '5',
  },
};

export const metadata: Metadata = {
  title: 'cURL to Python Requests Converter | UnblockDevs',
  description: 'Convert cURL to Python Requests instantly. Full auth, headers, JSON. No signup, in-browser.',
  keywords: [
    'curl to python requests',
    'convert curl to python',
    'curl to requests python',
    'python requests from curl',
    'convert curl command python',
    'curl python converter',
    'python http requests from curl'
  ],
  openGraph: {
    title: 'cURL to Python Requests Converter | UnblockDevs',
    description: 'Convert cURL to Python Requests instantly. Full auth, headers, JSON. No signup, in-browser.',
    type: 'website',
    url: 'https://unblockdevs.com/curl-to-python-requests',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'cURL to Python Requests Converter | UnblockDevs', description: 'Convert cURL to Python Requests instantly. Full auth, headers, JSON. No signup, in-browser.' },
  alternates: { canonical: 'https://unblockdevs.com/curl-to-python-requests' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'cURL to Python Requests Converter', item: canonicalUrl },
  ],
};

export default function CurlToPythonRequests() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CurlToPythonRequestsClient />
    </>
  );
}

