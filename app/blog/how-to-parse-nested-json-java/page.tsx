import type { Metadata } from 'next';
import HowToParseNestedJsonJavaClient from './client';

export const metadata: Metadata = {
  title: 'How to Parse Nested JSON in Java | Complete Guide 2026',
  description: 'Learn how to parse nested JSON in Java using Jackson, Gson, and org.json. Includes examples for deeply nested objects, arrays, and handling complex JSON structures in Java applications.',
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
    description: 'Learn how to parse nested JSON in Java with examples for deeply nested objects and arrays.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Parse Nested JSON in Java | Complete Guide 2026',
    description: 'Learn how to parse nested JSON in Java with examples for deeply nested objects and arrays.',
  },
};

export default function HowToParseNestedJsonJavaPage() {
  return <HowToParseNestedJsonJavaClient />;
}
