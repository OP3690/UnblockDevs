import type { Metadata } from 'next';
import HowToConvertJsonToCsvPythonClient from './client';

export const metadata: Metadata = {
  title: 'How to Convert JSON to CSV in Python | Complete Guide 2026',
  description: 'Convert JSON to CSV in Python with pandas, csv module, json_normalize. Nested JSON, arrays, examples.',
  keywords: [
    'convert JSON to CSV Python',
    'JSON to CSV Python',
    'pandas JSON to CSV',
    'json_normalize Python',
    'convert JSON CSV',
    'JSON CSV conversion',
    'Python JSON CSV',
    'export JSON to CSV',
    'JSON to CSV pandas',
    'convert JSON file CSV',
    'Python JSON CSV tutorial',
    'JSON CSV converter',
    'pandas to_csv JSON',
    'flatten JSON CSV',
    'JSON array to CSV'
  ],
  openGraph: {
    title: 'How to Convert JSON to CSV in Python | Complete Guide 2026',
    description: 'Learn how to convert JSON to CSV in Python with examples for nested JSON and arrays.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/how-to-convert-json-to-csv-python',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Convert JSON to CSV in Python | Complete Guide 2026',
    description: 'Learn how to convert JSON to CSV in Python with examples for nested JSON and arrays.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-convert-json-to-csv-python' },

};

export default function HowToConvertJsonToCsvPythonPage() {
  return <HowToConvertJsonToCsvPythonClient />;
}
