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
  },
};

export default function AdvancedHTML5APIsGuide() {
  return <AdvancedHTML5APIsClient />;
}

