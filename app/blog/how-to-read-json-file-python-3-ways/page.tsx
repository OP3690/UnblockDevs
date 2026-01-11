import type { Metadata } from 'next';
import HowToReadJsonFilePythonClient from './client';

export const metadata: Metadata = {
  title: 'How to Read JSON File in Python (3 Ways) | Complete Guide 2026',
  description: 'Learn 3 methods to read JSON files in Python: json.load(), json.loads(), and pandas.read_json(). Includes examples, error handling, and best practices for parsing JSON data in Python.',
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
    description: 'Learn 3 methods to read JSON files in Python with examples, error handling, and best practices.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Read JSON File in Python (3 Ways) | Complete Guide 2026',
    description: 'Learn 3 methods to read JSON files in Python with examples, error handling, and best practices.',
  },
};

export default function HowToReadJsonFilePythonPage() {
  return <HowToReadJsonFilePythonClient />;
}
