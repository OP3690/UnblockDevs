import type { Metadata } from 'next';
import CurlToPythonClient from './client';

const canonicalUrl = 'https://unblockdevs.com/curl-to-python';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'cURL to Python Converter',
  url: canonicalUrl,
  description: 'Convert cURL commands to Python Requests code instantly. GET, POST, headers, auth, JSON. Free, no signup.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Convert cURL to Python requests code',
    'Supports GET, POST, PUT, PATCH, DELETE',
    'Handles headers, authentication, and JSON payloads',
    '100% client-side — no data sent to any server',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '780',
    bestRating: '5',
  },
};

export const metadata: Metadata = {
  title: 'Convert cURL to Python Requests — Free Online Converter | UnblockDevs',
  description: 'Convert cURL commands to Python Requests code instantly. GET, POST, headers, auth, JSON. Free, no signup. Paste curl, get Python.',
  keywords: [
    'convert curl to python',
    'curl to python',
    'curl to python requests',
    'convert curl to python requests',
    'curl to requests python',
    'curl python converter',
    'convert curl command to python',
    'curl to python code',
    'python requests from curl',
  ],
  openGraph: {
    title: 'Convert cURL to Python Requests — Free Online Converter',
    description: 'Convert cURL to Python Requests instantly. Full auth, headers, JSON. No signup.',
    type: 'website',
    url: 'https://unblockdevs.com/curl-to-python',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - cURL to Python Converter' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/curl-to-python' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'cURL to Python', item: canonicalUrl },
  ],
};

export default function CurlToPythonPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CurlToPythonClient />
    </>
  );
}
