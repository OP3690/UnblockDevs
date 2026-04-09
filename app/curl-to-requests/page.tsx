import type { Metadata } from 'next';
import CurlToRequestsClient from './client';

const canonicalUrl = 'https://unblockdevs.com/curl-to-requests';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'cURL to Code Converter',
  url: canonicalUrl,
  description: 'Convert cURL to Python, JS, PHP, Ruby, Java, Go, C#. Full auth & headers. No signup, instant.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Convert cURL to Python, JavaScript, PHP, Ruby, Java, Go, C#',
    'Supports all HTTP methods with headers and auth',
    'Handles JSON body, form data, and query parameters',
    '100% client-side — no data sent to any server',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '560',
    bestRating: '5',
  },
};

export const metadata: Metadata = {
  title: 'cURL to Code – Python, JS, PHP & More | UnblockDevs',
  description: 'Convert cURL to Python, JS, PHP, Ruby, Java, Go, C#. Full auth & headers. No signup, instant.',
  keywords: [
    'curl to requests',
    'convert curl to requests',
    'curl to python requests',
    'curl to javascript fetch',
    'curl to http request',
    'curl converter online',
    'convert curl command'
  ],
  openGraph: {
    title: 'cURL to Code – Python, JS, PHP & More | UnblockDevs',
    description: 'Convert cURL to Python, JS, PHP, Ruby, Java, Go, C#. Full auth & headers. No signup, instant.',
    type: 'website',
    url: 'https://unblockdevs.com/curl-to-requests',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: { card: 'summary_large_image', title: 'cURL to Code | UnblockDevs', description: 'Convert cURL to Python, JS, PHP, Ruby, Java, Go, C#. Full auth & headers. No signup, instant.' },
  alternates: { canonical: 'https://unblockdevs.com/curl-to-requests' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'cURL to Code', item: canonicalUrl },
  ],
};

export default function CurlToRequests() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CurlToRequestsClient />
    </>
  );
}

