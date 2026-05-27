import type { Metadata } from 'next';
import ApiRateLimitingGuideClient from './client';

export const metadata: Metadata = {
  title: 'API Rate Limiting Complete Guide 2026: Algorithms, Implementation & 429 Handling | UnblockDevs',
  description: 'Master API rate limiting in 2026: token bucket vs sliding window vs fixed window algorithms, Node.js + Redis implementation, standard rate limit headers, exponential backoff for 429 errors, and fair usage design.',
  keywords: [
    'api rate limiting 2026',
    'rate limiting algorithms',
    'token bucket algorithm',
    'sliding window rate limiting',
    'redis rate limiting nodejs',
    '429 too many requests',
    'rate limit headers',
    'exponential backoff retry',
    'api throttling implementation',
    'rate limiter node js',
    'ratelimit-remaining header',
    'fixed window vs sliding window',
    'leaky bucket algorithm',
    'api fair use policy',
    'ddos protection rate limiting',
  ],
  openGraph: {
    title: 'API Rate Limiting Complete Guide 2026: Algorithms, Redis Implementation & 429 Handling',
    description: 'Token bucket, sliding window, fixed window — all algorithms explained with Node.js + Redis code, standard headers, and exponential backoff patterns.',
    type: 'article',
    publishedTime: '2026-05-15T18:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/api-rate-limiting-complete-guide-2026',
    images: [{ url: 'https://unblockdevs.com/api/og?title=API%20Rate%20Limiting%20Complete%20Guide%202026%3A%20Algorithms%2C%20Redis%20Implementation%20%26%20429...&emoji=%E2%9A%A1&desc=Token%20bucket%2C%20sliding%20window%2C%20fixed%20window', width: 1200, height: 630, alt: 'API Rate Limiting Complete Guide 2026: Algorithms, Redis Implementation & 429... — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'API Rate Limiting Complete Guide 2026',
    description: 'All 4 algorithms compared, Redis implementation, 429 headers, exponential backoff — everything about rate limiting.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/api-rate-limiting-complete-guide-2026' },
};

export default function ApiRateLimitingGuidePage() {
  return <ApiRateLimitingGuideClient />;
}
