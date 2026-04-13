import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Remove Extra Spaces, Trim & Clean String Formatting Issues Online | UnblockDevs',
  description:
    'Extra spaces, wrong case, special characters, missing quotes — here\'s how to fix the most common string formatting problems developers hit daily, with a free online string utility tool.',
  keywords: [
    'how to remove extra spaces from string',
    'how to convert string to lowercase or uppercase',
    'how to replace text in string online',
    'how to split string into parts',
    'how to trim whitespace from string',
    'fix messy string formatting',
    'how to remove special characters from string',
    'how to format text data for api',
    'how to clean string before processing',
    'how to debug string formatting issues',
    'remove whitespace from string tool',
    'split string online tool',
  ],
  openGraph: {
    title: 'How to Remove Extra Spaces, Trim & Clean String Formatting Issues Online | UnblockDevs',
    description:
      'Extra spaces, wrong case, special characters — fix the most common string formatting problems developers hit daily with a free online string utility tool.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-remove-extra-spaces-from-string',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Remove Extra Spaces, Trim & Clean String Formatting Issues Online',
    description:
      'Fix extra spaces, wrong case, special characters, and other common string formatting problems with a free online string utility tool.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-remove-extra-spaces-from-string' },
};

export default function HowToRemoveExtraSpacesFromStringPage() {
  return <BlogPostClient />;
}
