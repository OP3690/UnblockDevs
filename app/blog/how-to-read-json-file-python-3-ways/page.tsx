import type { Metadata } from 'next';
import HowToReadJsonFilePythonClient from './client';

export const metadata: Metadata = {
  title: 'How to Read JSON File in Python (3 Ways) | Complete Guide 2026',
  description: 'Read JSON in Python: json.load(), json.loads(), pandas.read_json(). Examples, error handling.',
  keywords: [
    'read JSON file Python',
    'Python JSON parser',
    'json.load Python',
    'json.loads Python',
    'pandas read JSON',
    'parse JSON file Python',
    'Python JSON tutorial',
    'read JSON data Python',
    'JSON file handling Python',
    'Python JSON examples',
    'load JSON file Python',
    'Python JSON library',
    'read JSON from file',
    'Python JSON parsing',
    'JSON file Python tutorial'
  ],
  openGraph: {
    title: 'How to Read JSON File in Python (3 Ways) | Complete Guide 2026',
    description: '3 ways to read JSON in Python. Examples and error handling.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/how-to-read-json-file-python-3-ways',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Read%20JSON%20File%20in%20Python%20%283%20Ways%29%20%7C%20Complete%20Guide%202026&emoji=%7B%7D&desc=3%20ways%20to%20read%20JSON%20in%20Python', width: 1200, height: 630, alt: 'How to Read JSON File in Python (3 Ways) | Complete Guide 2026 — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Read JSON File in Python (3 Ways) | Complete Guide 2026',
    description: '3 ways to read JSON in Python. Examples and error handling.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-read-json-file-python-3-ways' },

};

export default function HowToReadJsonFilePythonPage() {
  return <HowToReadJsonFilePythonClient />;
}
