import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How to POST JSON Data with cURL — Complete Guide | UnblockDevs',
  description: 'POST JSON data with cURL: complete examples with headers, authentication, and error handling. Step-by-step guide for API testing and backend integration.',
  keywords: [
    'how to post json data using curl',
    'curl post json',
    'curl post json data',
    'curl send json',
    'curl post json example',
    'curl json post request',
    'curl post json body',
    'curl post json api',
    'curl post json authentication',
    'curl post json tutorial',
    'curl -d json content-type application/json',
    'curl post request with json body and headers',
  ],
  openGraph: {
    title: 'How to Post JSON Data Using cURL: Complete Guide 2026',
    description: 'Learn how to POST JSON data with cURL with complete examples for headers, authentication, and error handling. Step-by-step API testing guide.',
    type: 'article',
    publishedTime: '2026-02-10T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-post-json-data-using-curl-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Post%20JSON%20Data%20Using%20cURL%3A%20Complete%20Guide%202026&emoji=%7B%7D&desc=Learn%20how%20to%20post%20JSON%20data%20using%20cURL%20with%20complete%20examples', width: 1200, height: 630, alt: 'How to Post JSON Data Using cURL: Complete Guide 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Post JSON Data Using cURL: Complete Guide 2026',
    description: 'Learn how to POST JSON data with cURL with complete examples for headers, authentication, and error handling. Step-by-step API testing guide.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-post-json-data-using-curl-complete-guide',
  },
};

import HowToPostJsonDataUsingCurlCompleteGuideClient from './client';

export default function HowToPostJsonDataUsingCurlCompleteGuidePage() {
  return <HowToPostJsonDataUsingCurlCompleteGuideClient />;
}
