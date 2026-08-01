import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'HTTP Security Headers: CSP, HSTS & X-Frame-Options Explained | UnblockDevs',
  description:
    'What are HTTP security headers and why do they matter? Complete guide to Content-Security-Policy, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy — with examples and a free grader tool.',
  keywords: [
    'http security headers explained',
    'what is content security policy',
    'what is hsts header',
    'x-frame-options explained',
    'http security headers best practices',
    'how to get a+ security headers',
    'check http security headers online',
    'how to add security headers to website',
    'http headers analyzer tool',
    'security headers for nodejs express',
    'security headers for nginx',
    'security headers checker free',
    'how to check content-type header',
    'inspect api headers without postman',
    'http header analyzer tool free',
  ],
  openGraph: {
    title: 'HTTP Security Headers: CSP, HSTS & X-Frame-Options Explained',
    description:
      'Complete guide to HTTP security headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy — with examples and a free grader tool.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/http-security-headers-explained',
    images: [{ url: 'https://unblockdevs.com/api/og?title=HTTP%20Security%20Headers%20Explained%20%E2%80%94%20CSP%2C%20HSTS%2C%20X-Frame-Options%20%26%20How%20to%20Get%20an%20...&emoji=%F0%9F%94%92&desc=Complete%20guide%20to%20HTTP%20security%20headers%3A%20CSP%2C%20HSTS%2C%20X-Frame-Options%2C', width: 1200, height: 630, alt: 'HTTP Security Headers Explained — CSP, HSTS, X-Frame-Options & How to Get an ... — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTTP Security Headers Explained — CSP, HSTS, X-Frame-Options & How to Get an A+ Grade',
    description:
      'Complete guide to HTTP security headers: CSP, HSTS, X-Frame-Options and more. Get an A+ security score with examples for Express, Nginx, and Next.js.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/http-security-headers-explained' },
};

export default function HttpSecurityHeadersExplainedPage() {
  return <BlogPostClient />;
}
