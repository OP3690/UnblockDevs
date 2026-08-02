import type { Metadata } from 'next';
import HowToConvertJsonToCsvPythonClient from './client';

export const metadata: Metadata = {
  title: 'Convert JSON to CSV in Python: pandas & csv Module | UnblockDevs',
  description: 'Convert JSON to CSV in Python using pandas, the csv module, and json_normalize. Covers flat and nested JSON, arrays, and file export with complete code examples.',
  keywords: [
    'convert json to csv python',
    'python json to csv',
    'pandas json to csv',
    'json normalize python',
    'python csv module json',
    'nested json to csv python',
    'python export json as csv',
    'flatten json to csv python',
    'how to convert json to csv in python',
    'python pandas read json to csv',
    'json array to csv python',
    'convert json file to csv python code'
  ],
  openGraph: {
    title: 'Convert JSON to CSV in Python: pandas, csv Module & json_normalize',
    description: 'Three ways to convert JSON to CSV in Python: pandas, the csv module, and json_normalize. Covers nested JSON, arrays, and file export with working code examples.',
    type: 'article',
    publishedTime: '2026-01-26T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-convert-json-to-csv-python',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Convert%20JSON%20to%20CSV%20in%20Python%20%7C%20Complete%20Guide%202026&emoji=%7B%7D&desc=Learn%20how%20to%20convert%20JSON%20to%20CSV%20in%20Python%20with%20examples%20for%20nested%20JSON%20and', width: 1200, height: 630, alt: 'How to Convert JSON to CSV in Python | Complete Guide 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Convert JSON to CSV in Python: pandas & csv Module',
    description: 'Convert JSON to CSV in Python with pandas, csv module, and json_normalize. Handles nested JSON and arrays with complete code examples.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-convert-json-to-csv-python' },

};

export default function HowToConvertJsonToCsvPythonPage() {
  return <HowToConvertJsonToCsvPythonClient />;
}
