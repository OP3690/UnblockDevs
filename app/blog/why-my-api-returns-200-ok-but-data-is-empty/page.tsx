import type { Metadata } from 'next';
import WhyMyApiReturns200OkButDataIsEmptyClient from './client';

export const metadata: Metadata = {
  title: 'Why My API Returns 200 OK but Data Is Empty | UnblockDevs',
  description: 'Fix your API returning 200 OK with empty data. Learn the top causes — wrong field mapping, missing await, incorrect parsing — with step-by-step debugging.',
  keywords: [
    'api returns 200 but empty data',
    'api returns 200 ok but no data',
    'api response empty',
    'api returns empty array',
    'api 200 ok but null',
    'api returns 200 but data is null',
    'empty api response fix',
    'api 200 empty response',
    'api returns empty json',
    'debug empty api response',
    'api returns success but no data',
    'why is my api response empty',
    'api data missing in response'
  ],
  openGraph: {
    title: 'Why My API Returns 200 OK but Data Is Empty — Full Debug Guide',
    description: 'A 200 OK response with empty data is one of the most frustrating API bugs. Learn the most common causes — wrong field mapping, missing await, pagination, incorrect parsing — and how to diagnose them.',
    type: 'article',
    publishedTime: '2026-01-30T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/why-my-api-returns-200-ok-but-data-is-empty',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Why%20My%20API%20Returns%20200%20OK%20but%20Data%20Is%20Empty%20%7C%20Complete%20Guide%202026&emoji=%F0%9F%9B%A0%EF%B8%8F&desc=API%20returns%20200%20OK%20but%20empty%20data', width: 1200, height: 630, alt: 'Why My API Returns 200 OK but Data Is Empty | Complete Guide 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why My API Returns 200 OK but Data Is Empty',
    description: 'API returns 200 OK but data is empty? Learn the top causes and debugging steps — from wrong field names to missing await and pagination issues.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/why-my-api-returns-200-ok-but-data-is-empty' },

};

export default function WhyMyApiReturns200OkButDataIsEmptyPage() {
  return <WhyMyApiReturns200OkButDataIsEmptyClient />;
}
