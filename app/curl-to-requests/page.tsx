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
  dateModified: '2026-05-27',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Convert cURL to Python, JavaScript, PHP, Ruby, Java, Go, C#',
    'Supports all HTTP methods with headers and auth',
    'Handles JSON body, form data, and query parameters',
    '100% client-side — no data sent to any server',
  ],};

export const metadata: Metadata = {
  title: 'Free cURL to Code Converter — Python, JS, PHP & More | UnblockDevs',
  description: 'Convert cURL commands to Python, JavaScript, PHP, Ruby, Java, Go, or C# code instantly. Handles all HTTP methods, headers, and auth. Free, no signup.',
  keywords: [
    'curl to requests',
    'convert curl to requests',
    'curl to python requests',
    'curl to javascript fetch',
    'curl to http request',
    'curl converter online',
    'convert curl command',
    'curl to code online',
  ],
  openGraph: {
    title: 'Free cURL to Code Converter — Python, JS, PHP & More | UnblockDevs',
    description: 'Convert cURL commands to Python, JavaScript, PHP, Ruby, Java, Go, or C# code instantly. Handles all HTTP methods, headers, auth, and JSON bodies. Free, no signup, browser-based.',
    type: 'website',
    url: 'https://unblockdevs.com/curl-to-requests',
    siteName: 'UnblockDevs',
    images: [{ url: 'https://unblockdevs.com/api/og?title=cURL%20to%20Code%20%E2%80%93%20Python%2C%20JS%2C%20PHP%20%26%20More&emoji=%E2%9A%A1&desc=Convert%20cURL%20to%20Python%2C%20JS%2C%20PHP%2C%20Ruby%2C%20Java%2C%20Go%2C%20C%23', width: 1200, height: 630, alt: 'cURL to Code – Python, JS, PHP & More — UnblockDevs' }],
  },
  twitter: { card: 'summary_large_image', title: 'Free cURL to Code Converter — Python, JS, PHP & More', description: 'Convert cURL commands to Python, JS, PHP, Ruby, Java, Go, or C# instantly. Full header & auth support. Free, browser-based, no signup.' },
  alternates: { canonical: 'https://unblockdevs.com/curl-to-requests' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Developer Tools', item: 'https://unblockdevs.com' },
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

