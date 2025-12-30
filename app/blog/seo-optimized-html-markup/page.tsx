import type { Metadata } from 'next';
import SEOOptimizedHTMLClient from './client';

export const metadata: Metadata = {
  title: 'SEO-Optimized HTML Markup: Complete Guide for Better Rankings | UnblockDevs Blog',
  description: 'Master SEO-optimized HTML markup. Learn semantic HTML, meta tags, structured data, and best practices to improve your website\'s search engine rankings.',
  keywords: [
    'SEO HTML',
    'SEO markup',
    'semantic HTML',
    'meta tags',
    'structured data',
    'HTML SEO',
    'search engine optimization',
    'HTML best practices',
    'schema markup',
    'Open Graph',
    'HTML accessibility',
    'SEO guide'
  ],
  openGraph: {
    title: 'SEO-Optimized HTML Markup: Complete Guide for Better Rankings',
    description: 'Master SEO-optimized HTML markup with semantic HTML, meta tags, and structured data.',
    type: 'article',
    publishedTime: '2024-01-24T00:00:00Z',
    authors: ['UnblockDevs'],
  },
};

export default function SEOOptimizedHTMLGuide() {
  return <SEOOptimizedHTMLClient />;
}

