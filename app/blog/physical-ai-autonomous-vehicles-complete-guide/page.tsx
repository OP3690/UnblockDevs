import type { Metadata } from 'next';
import PhysicalAiAutonomousVehiclesClient from './client';

export const metadata: Metadata = {
  title: 'Physical AI in Autonomous Vehicles: Complete Guide 2026 | Self-Driving Cars & AI',
  description: 'Complete guide to Physical AI in autonomous vehicles: definition, what it is, when to use it, how it works, and why it matters. Learn about self-driving cars, autonomous vehicle AI, sensor fusion, perception, planning, and control systems.',
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
};

export default function PhysicalAiAutonomousVehicles() {
  return <PhysicalAiAutonomousVehiclesClient />;
}

