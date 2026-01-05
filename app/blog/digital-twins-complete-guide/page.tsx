import type { Metadata } from 'next';
import DigitalTwinsCompleteGuideClient from './client';

export const metadata: Metadata = {
  title: 'Digital Twins: Complete Guide to Virtual Replicas | UnblockDevs',
  description: 'Comprehensive guide to Digital Twins: IoT integration, real-time simulation, predictive maintenance, and Industry 4.0. Learn how digital twins work and their applications.',
  keywords: [
    'digital twins',
    'iot digital twins',
    'virtual replicas',
    'predictive maintenance',
    'industry 4.0',
    'smart manufacturing',
    'simulation technology'
  ],
};

export default function DigitalTwinsCompleteGuide() {
  return <DigitalTwinsCompleteGuideClient />;
}

