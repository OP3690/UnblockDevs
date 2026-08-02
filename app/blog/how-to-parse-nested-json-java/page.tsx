import type { Metadata } from 'next';
import HowToParseNestedJsonJavaClient from './client';

export const metadata: Metadata = {
  title: 'Parse Nested JSON in Java with Jackson and Gson | UnblockDevs',
  description: 'Parse nested JSON in Java using Jackson, Gson, and org.json. Covers deep objects, arrays, and complex JSON structures with working code examples for all three libraries.',
  keywords: [
    'parse nested json java',
    'java json parser',
    'jackson nested json java',
    'gson nested json',
    'org json java',
    'jackson objectmapper java',
    'parse complex json java',
    'java json library comparison',
    'how to parse nested json in java',
    'jackson vs gson java',
    'java read nested json object',
    'parse json array java'
  ],
  openGraph: {
    title: 'Parse Nested JSON in Java: Jackson, Gson & org.json Complete Guide',
    description: 'Learn how to parse nested JSON in Java using three popular libraries: Jackson ObjectMapper, Gson fromJson, and org.json. Covers nested objects, arrays, and deep structures with practical code examples.',
    type: 'article',
    publishedTime: '2026-01-27T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-parse-nested-json-java',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Parse%20Nested%20JSON%20in%20Java%20%7C%20Complete%20Guide%202026&emoji=%7B%7D&desc=Parse%20nested%20JSON%20in%20Java', width: 1200, height: 630, alt: 'How to Parse Nested JSON in Java | Complete Guide 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Parse Nested JSON in Java with Jackson and Gson',
    description: 'Parse nested JSON in Java with Jackson, Gson, and org.json. Covers deep objects, arrays, and complex structures with complete code examples.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-parse-nested-json-java' },

};

export default function HowToParseNestedJsonJavaPage() {
  return <HowToParseNestedJsonJavaClient />;
}
