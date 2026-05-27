import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Handle API Rate Limits in Production | UnblockDevs',
  description: 'Learn how to handle API rate limits: exponential backoff, retry strategies, rate limit headers, circuit breakers, and best practices for production applications. Complete guide with code examples.',
  keywords: [
    'api rate limits',
    'rate limiting',
    'handle rate limits',
    'api throttling',
    'exponential backoff',
    'retry strategy',
    'rate limit headers',
    '429 too many requests',
    'api rate limit handling',
    'production rate limits',
    'circuit breaker pattern',
    'api best practices',
    'rate limit retry',
    'throttling api calls'
  ],
  openGraph: {
    title: 'Handle API Rate Limits in Production | UnblockDevs',
    description: 'Learn how to handle API rate limits with exponential backoff, retry strategies, and best practices.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/how-to-handle-api-rate-limits-gracefully-in-production',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Handle%20API%20Rate%20Limits%20in%20Production&emoji=%E2%9A%A1&desc=Learn%20how%20to%20handle%20API%20rate%20limits%20with%20exponential%20backoff%2C%20retry%20strategies%2C', width: 1200, height: 630, alt: 'Handle API Rate Limits in Production — UnblockDevs Blog' }],

  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-handle-api-rate-limits-gracefully-in-production',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
