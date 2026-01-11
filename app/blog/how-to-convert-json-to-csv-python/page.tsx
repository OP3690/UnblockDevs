import type { Metadata } from 'next';
import HowToConvertJsonToCsvPythonClient from './client';

export const metadata: Metadata = {
  title: 'How to Convert JSON to CSV in Python | Complete Guide 2026',
  description: 'Learn how to convert JSON to CSV in Python using pandas, csv module, and json_normalize. Includes examples for nested JSON, arrays, and handling different JSON structures.',
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Convert JSON to CSV in Python | Complete Guide 2026',
    description: 'Learn how to convert JSON to CSV in Python with examples for nested JSON and arrays.',
  },
};

export default function HowToConvertJsonToCsvPythonPage() {
  return <HowToConvertJsonToCsvPythonClient />;
}
