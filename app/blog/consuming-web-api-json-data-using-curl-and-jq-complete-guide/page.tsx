import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Consume Web API JSON with curl and jq | UnblockDevs',
  description: 'How to consume Web API JSON data using curl and jq: step-by-step guide with real examples. Learn filtering, extraction, and best practices for API data processing.',
  keywords: [
    'consuming web api json data using curl and jq',
    'curl jq json',
    'curl jq tutorial',
    'curl jq examples',
    'curl jq filter json',
    'curl jq api testing',
    'curl jq json parsing',
    'curl jq json query',
    'jq command line json',
    'how to use jq with curl',
    'parse api json with jq',
    'curl jq bash script'
  ],
  openGraph: {
    title: 'Consuming Web API JSON Data with curl and jq: Complete Hands-On Guide',
    description: 'Learn how to consume Web API JSON data using curl and jq with this step-by-step guide. Includes real examples for fetching, filtering, extracting, and transforming JSON from APIs at the command line.',
    type: 'article',
    publishedTime: '2026-02-10T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/consuming-web-api-json-data-using-curl-and-jq-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Consuming%20Web%20API%20JSON%20Data%20Using%20curl%20and%20jq%3A%20Complete%20Guide%202026&emoji=%7B%7D&desc=Learn%20how%20to%20consume%20Web%20API%20JSON%20data%20using%20curl%20and%20jq', width: 1200, height: 630, alt: 'Consuming Web API JSON Data Using curl and jq: Complete Guide 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consume Web API JSON with curl and jq',
    description: 'How to consume Web API JSON with curl and jq — fetch, filter, extract, and transform API responses at the command line. Step-by-step with real examples.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/consuming-web-api-json-data-using-curl-and-jq-complete-guide',
  },
};

import ConsumingWebApiJsonDataUsingCurlAndJqCompleteGuideClient from './client';

export default function ConsumingWebApiJsonDataUsingCurlAndJqCompleteGuidePage() {
  return <ConsumingWebApiJsonDataUsingCurlAndJqCompleteGuideClient />;
}
