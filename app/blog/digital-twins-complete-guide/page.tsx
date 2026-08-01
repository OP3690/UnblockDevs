import type { Metadata } from 'next';
import DigitalTwinsCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Digital Twins: Complete Guide to Virtual Replicas | UnblockDevs',
  description: 'Digital Twins: IoT, real-time simulation, predictive maintenance, Industry 4.0. How they work and applications.',
  keywords: [
    'digital twins',
    'iot digital twins',
    'virtual replicas',
    'predictive maintenance',
    'industry 4.0',
    'smart manufacturing',
    'simulation technology'
  ],
  openGraph: {
    title: 'Digital Twins: Complete Guide to Virtual Replicas',
    description: 'Digital Twins: IoT, real-time simulation, predictive maintenance, Industry 4.0. How they work and applications.',
    type: 'article',
    publishedTime: '2025-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/digital-twins-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Digital%20Twins%3A%20Complete%20Guide%20to%20Virtual%20Replicas&emoji=%F0%9F%93%9D&desc=Digital%20Twins%3A%20IoT%2C%20real-time%20simulation%2C%20predictive%20maintenance%2C%20Industry%204.0.', width: 1200, height: 630, alt: 'Digital Twins: Complete Guide to Virtual Replicas — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Twins: Complete Guide to Virtual Replicas',
    description: 'Digital Twins: IoT, real-time simulation, predictive maintenance, Industry 4.0. How they work and applications.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/digital-twins-complete-guide' },

};

export default function DigitalTwinsCompleteGuide() {
  return <DigitalTwinsCompleteGuideClient />;
}

