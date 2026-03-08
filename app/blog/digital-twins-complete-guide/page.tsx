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
  alternates: { canonical: 'https://unblockdevs.com/blog/digital-twins-complete-guide' },

};

export default function DigitalTwinsCompleteGuide() {
  return <DigitalTwinsCompleteGuideClient />;
}

