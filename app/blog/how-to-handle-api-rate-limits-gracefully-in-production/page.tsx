import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Handle API Rate Limits Gracefully in Production (Complete Guide)',
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
    title: 'How to Handle API Rate Limits Gracefully in Production (Complete Guide)',
    description: 'Learn how to handle API rate limits with exponential backoff, retry strategies, and best practices.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-handle-api-rate-limits-gracefully-in-production',
  },
};

export default function BlogPost() {
  return <BlogPostClient />;
}
