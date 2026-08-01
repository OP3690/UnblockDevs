import type { Metadata } from 'next';
import AdvancedHTML5APIsClient from './client';

export const metadata: Metadata = {
  title: 'Advanced HTML5 APIs: Complete Guide with Examples | UnblockDevs Blog',
  description: 'Master advanced HTML5 APIs including Geolocation, Web Storage, Canvas, Web Workers, and more. Learn with interactive examples and real-world use cases.',
  keywords: [
    'HTML5 APIs',
    'HTML5 Geolocation',
    'Web Storage API',
    'Canvas API',
    'Web Workers',
    'HTML5 features',
    'HTML5 tutorial',
    'localStorage',
    'sessionStorage',
    'HTML5 advanced',
    'Web APIs',
    'HTML5 examples',
    'modern HTML5'
  ],
  openGraph: {
    title: 'Advanced HTML5 APIs: Complete Guide with Examples',
    description: 'Master advanced HTML5 APIs including Geolocation, Web Storage, Canvas, Web Workers, and more.',
    type: 'article',
    publishedTime: '2024-01-22T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/advanced-html5-apis-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Advanced%20HTML5%20APIs%3A%20Complete%20Guide%20with%20Examples&emoji=%F0%9F%93%96&desc=Master%20advanced%20HTML5%20APIs%20including%20Geolocation%2C%20Web%20Storage%2C%20Canvas%2C%20Web', width: 1200, height: 630, alt: 'Advanced HTML5 APIs: Complete Guide with Examples — UnblockDevs Blog' }],

  },  twitter: {
    card: 'summary_large_image',
    title: 'Advanced HTML5 APIs: Complete Guide with Examples',
    description: 'Master advanced HTML5 APIs including Geolocation, Web Storage, Canvas, Web Workers, and more.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/advanced-html5-apis-guide' },

};

export default function AdvancedHTML5APIsGuide() {
  return <AdvancedHTML5APIsClient />;
}

