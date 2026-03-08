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
  alternates: { canonical: 'https://unblockdevs.com/blog/physical-ai-autonomous-vehicles-complete-guide' },

};

export default function PhysicalAiAutonomousVehicles() {
  return <PhysicalAiAutonomousVehiclesClient />;
}

