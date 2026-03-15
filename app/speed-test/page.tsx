import type { Metadata } from 'next';
import SpeedTestClient from './SpeedTestClient';

export const metadata: Metadata = {
  title: 'Internet Speed Test — Check Download, Upload & Ping Free | UnblockDevs',
  description:
    'Test your internet speed instantly. Check download speed, upload speed, ping, and jitter. No account required, no data stored. 100% browser-based, privacy-first speed test.',
  keywords: [
    'internet speed test',
    'speed test',
    'download speed test',
    'upload speed test',
    'ping test',
    'jitter test',
    'broadband speed test',
    'wifi speed test',
    'network speed test',
    'free speed test',
    'speed test online',
  ],
  openGraph: {
    title: 'Internet Speed Test — Check Download, Upload & Ping Free | UnblockDevs',
    description:
      'Test your internet speed instantly. Download, upload, ping, jitter. No account, no data stored. 100% browser-based.',
    type: 'website',
    url: 'https://unblockdevs.com/speed-test',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: 'https://unblockdevs.com/speed-test' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How accurate is this speed test?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "This speed test measures your connection speed to Cloudflare's nearest server. Results reflect real-world performance for most internet activities. Results may differ slightly from other speed tests depending on which server location they use.",
      },
    },
    {
      '@type': 'Question',
      name: 'Why is my speed test result lower than my plan speed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Several factors affect speed test results: WiFi signal strength, router performance, number of devices on your network, time of day (peak hours), and distance from the test server. Connect via ethernet cable for the most accurate result.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is a good internet speed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For general browsing: 25 Mbps. For HD streaming: 25 Mbps. For 4K streaming: 50 Mbps. For video calls: 10 Mbps. For online gaming: 25 Mbps with low ping under 50ms. For remote work and cloud development: 100 Mbps recommended.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is ping and jitter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ping (latency) is the time in milliseconds for data to travel to a server and back. Lower is better — under 20ms is excellent, under 50ms is good, over 100ms causes noticeable lag. Jitter is the variation in ping over time — low jitter means a stable connection, important for video calls and gaming.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this speed test store my data?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. This speed test runs entirely in your browser. Your IP address, speed results, and location are not stored on any server. Test history is saved locally in your browser only and never transmitted anywhere.',
      },
    },
    {
      '@type': 'Question',
      name: 'WiFi vs ethernet — which gives better speed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ethernet almost always gives faster and more stable results than WiFi. WiFi speed is affected by distance from router, interference from other devices, and walls. For the most accurate speed test, connect your device directly to your router via ethernet cable.',
      },
    },
  ],
};

export default function SpeedTestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SpeedTestClient />
    </>
  );
}
