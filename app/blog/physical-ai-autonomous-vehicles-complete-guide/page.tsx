import type { Metadata } from 'next';
import PhysicalAiAutonomousVehiclesClient from './client';

export const metadata: Metadata = {
  title: 'Physical AI in Autonomous Vehicles 2026 | UnblockDevs',
  description: 'Physical AI in self-driving cars: sensor fusion, perception, planning, control. What it is, how it works.',
  keywords: [
    'physical ai autonomous vehicles',
    'autonomous vehicles ai',
    'self-driving cars ai',
    'autonomous vehicle systems',
    'ai in self-driving cars',
    'autonomous driving ai',
    'vehicle perception ai',
    'autonomous vehicle sensors',
    'self-driving car technology',
    'autonomous vehicle control',
    'ai vehicle navigation',
    'autonomous vehicle safety',
    'self-driving car systems',
    'autonomous vehicle perception',
    'ai driving systems',
    'autonomous vehicle guide',
    'self-driving car ai',
    'autonomous vehicle technology',
    'ai-powered vehicles',
    'autonomous vehicle sensors ai'
  ],
  openGraph: {
    title: 'Physical AI in Autonomous Vehicles 2026',
    description: 'Physical AI in self-driving cars: sensor fusion, perception, planning, control',
    type: 'article',
    url: 'https://unblockdevs.com/blog/physical-ai-autonomous-vehicles-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Physical%20AI%20in%20Autonomous%20Vehicles%202026&emoji=%F0%9F%A4%96&desc=Physical%20AI%20in%20self-driving%20cars%3A%20sensor%20fusion%2C%20perception%2C%20planning%2C%20control', width: 1200, height: 630, alt: 'Physical AI in Autonomous Vehicles 2026 — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Physical AI in Autonomous Vehicles 2026',
    description: 'Physical AI in self-driving cars: sensor fusion, perception, planning, control',
    images: ['https://unblockdevs.com/api/og?title=Physical%20AI%20in%20Autonomous%20Vehicles%202026&emoji=%F0%9F%A4%96&desc=Physical%20AI%20in%20self-driving%20cars%3A%20sensor%20fusion%2C%20perception%2C%20planning%2C%20control'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/physical-ai-autonomous-vehicles-complete-guide' },

};

export default function PhysicalAiAutonomousVehicles() {
  return <PhysicalAiAutonomousVehiclesClient />;
}

