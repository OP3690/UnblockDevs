import type { Metadata } from 'next';
import HowToParseNestedJsonJavaClient from './client';

export const metadata: Metadata = {
  title: 'How to Parse Nested JSON in Java | Complete Guide 2026',
  description: 'Parse nested JSON in Java: Jackson, Gson, org.json. Deep objects, arrays. Examples.',
  keywords: [
    'parse nested JSON Java',
    'Java JSON parser',
    'Jackson nested JSON',
    'Gson nested JSON',
    'parse JSON Java',
    'Java JSON parsing',
    'nested JSON Java',
    'JSON object Java',
    'Java JSON library',
    'parse complex JSON Java',
    'JSON parsing tutorial Java',
    'Jackson ObjectMapper',
    'Gson fromJson',
    'Java JSON example',
    'nested JSON structure Java'
  ],
  openGraph: {
    title: 'How to Parse Nested JSON in Java | Complete Guide 2026',
    description: 'Parse nested JSON in Java. Jackson, Gson. Examples for deep objects and arrays.',
    type: 'article',
    publishedTime: '2026-01-27T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-parse-nested-json-java',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Parse%20Nested%20JSON%20in%20Java%20%7C%20Complete%20Guide%202026&emoji=%7B%7D&desc=Parse%20nested%20JSON%20in%20Java', width: 1200, height: 630, alt: 'How to Parse Nested JSON in Java | Complete Guide 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Parse Nested JSON in Java | Complete Guide 2026',
    description: 'Parse nested JSON in Java. Jackson, Gson. Examples for deep objects and arrays.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-parse-nested-json-java' },

};

export default function HowToParseNestedJsonJavaPage() {
  return <HowToParseNestedJsonJavaClient />;
}
