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
  dateModified: '2026-05-27',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Convert cURL to Python requests library code',
    'Supports all HTTP methods with headers and auth',
    'Handles JSON body, form data, and file uploads',
    '100% client-side — no data sent to any server',
  ],};

export const metadata: Metadata = {
  title: 'Free cURL to Python Requests Converter | UnblockDevs',
  description: 'Convert cURL commands to Python Requests library code. Handles GET, POST, headers, authentication, JSON payloads, and file uploads. Free, browser-based, no signup.',
  keywords: [
    'curl to python requests',
    'convert curl to python',
    'curl to requests python',
    'python requests from curl',
    'convert curl command python',
    'curl python converter',
    'python http requests from curl',
    'curl to python online free',
    'curl command to python requests',
    'curl to requests library python',
    'curl to python code',
    'curl post to python requests',
    'curl bearer token python',
    'curl to python requests.get',
    'curl to python requests.post',
    'curl headers python requests',
    'curl json body python',
    'convert curl to python online',
    'curl to python script',
    'curl to python requests library',
    'how to use curl in python',
    'curl authentication python',
    'python requests equivalent of curl',
    'curl timeout python requests',
    'curl to httpx python',
    'curl to aiohttp python',
    'curl to urllib python',
    'requests.get from curl',
    'requests.post from curl',
    'curl to python3',
    'curl to python requests converter',
    'curl -d to python requests',
    'curl bearer token to python',
    'curl -u to python auth',
    'curl ssl verification python',
    'curl follow redirects python',
    'python requests from curl command',
    'convert curl get to python',
    'convert curl post to python',
    'curl form data python requests',
    'curl multipart python requests',
    'curl session python requests',
    'curl to python http client',
    'curl request to python code',
    'python equivalent of curl command',
    'curl command in python script',
    'curl to python converter free',
    'curl to python http library',
    'curl post json python requests',
    'curl headers to python dict',
  ],
  openGraph: {
    title: 'Free cURL to Python Requests Converter | UnblockDevs',
    description: 'Convert cURL commands to Python Requests library code instantly. Supports GET, POST, PUT, DELETE with headers, authentication, JSON payloads, and file uploads. 100% in-browser, no signup.',
    type: 'website',
    url: 'https://unblockdevs.com/curl-to-python-requests',
    siteName: 'UnblockDevs',
    images: [{ url: 'https://unblockdevs.com/api/og?title=cURL%20to%20Python%20Requests%20Converter&emoji=%E2%9A%A1&desc=Convert%20cURL%20to%20Python%20Requests%20instantly', width: 1200, height: 630, alt: 'cURL to Python Requests Converter — UnblockDevs' }],
  },
  twitter: { card: 'summary_large_image', title: 'Free cURL to Python Requests Converter', description: 'Convert cURL to Python Requests code instantly. Supports headers, auth, JSON payloads, and file uploads. Free, browser-based, no signup needed.' },
  alternates: { canonical: 'https://unblockdevs.com/curl-to-python-requests' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Developer Tools', item: 'https://unblockdevs.com' },
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

