import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'HTTP Security Headers Explained — CSP, HSTS, X-Frame-Options & How to Get an A+ Grade | UnblockDevs',
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
    title: 'HTTP Security Headers Explained — CSP, HSTS, X-Frame-Options & How to Get an A+ Grade | UnblockDevs',
    description:
      'Complete guide to HTTP security headers: CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy — with examples and a free grader tool.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/http-security-headers-explained',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
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
