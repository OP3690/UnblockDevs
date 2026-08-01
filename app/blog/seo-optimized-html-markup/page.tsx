import type { Metadata } from 'next';
import SEOOptimizedHTMLClient from './client';

export const metadata: Metadata = {
  title: 'SEO-Optimized HTML Markup Guide | UnblockDevs',
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
    url: 'https://unblockdevs.com/blog/seo-optimized-html-markup',
    images: [{ url: 'https://unblockdevs.com/api/og?title=SEO-Optimized%20HTML%20Markup%3A%20Complete%20Guide%20for%20Better%20Rankings&emoji=%F0%9F%8E%A8&desc=Master%20SEO-optimized%20HTML%20markup%20with%20semantic%20HTML%2C%20meta%20tags%2C%20and%20structured', width: 1200, height: 630, alt: 'SEO-Optimized HTML Markup: Complete Guide for Better Rankings — UnblockDevs Blog' }],

  },  twitter: {
    card: 'summary_large_image',
    title: 'SEO-Optimized HTML Markup: Complete Guide for Better Rankings',
    description: 'Master SEO-optimized HTML markup with semantic HTML, meta tags, and structured data.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/seo-optimized-html-markup' },

};

export default function SEOOptimizedHTMLGuide() {
  return <SEOOptimizedHTMLClient />;
}

