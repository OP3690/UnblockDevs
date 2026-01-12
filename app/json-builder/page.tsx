import type { Metadata } from 'next';
import JsonBuilderClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON Builder Online - Build JSON Interactively | UnblockDevs',
  description: 'Build JSON structures interactively. Free online JSON builder tool to create, edit, and construct JSON objects and arrays with a visual interface. No signup required.',
  keywords: [
    'json builder',
    'build json online',
    'json creator',
    'json editor',
    'interactive json builder',
    'json structure builder',
    'create json online',
    'json maker'
  ],
  openGraph: {
    title: 'Free JSON Builder Online - Build JSON Interactively',
    description: 'Build JSON structures interactively. Free online JSON builder tool.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/json-builder',
  },
};

export default function JsonBuilderPage() {
  return <JsonBuilderClient />;
}
