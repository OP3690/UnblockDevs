import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Beautify HTML Code Online — Formatter, Live Preview & Indenter',
  description: 'Messy HTML code? Here\'s how to beautify HTML instantly online — format, indent properly, and preview it live in the browser. Free tools, no install.',
  keywords: [
    'how to view html code in browser online',
    'best html formatter online free',
    'how to beautify html code instantly',
    'tool to preview html code live',
    'how to fix messy html formatting',
    'html viewer with live preview',
    'how to indent html code properly',
    'format html code online without editor',
    'html beautifier for large files',
    'how to clean up html code quickly',
  ],
  openGraph: {
    title: 'How to Beautify HTML Code Online — Formatter, Live Preview & Indenter',
    description: 'Messy HTML code? Here\'s how to beautify HTML instantly online — format, indent properly, and preview it live in the browser. Free tools, no install.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-beautify-html-code-online',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Beautify HTML Code Online — Formatter, Live Preview & Indenter',
    description: 'Messy HTML code? Here\'s how to beautify HTML instantly online — format, indent properly, and preview it live in the browser. Free tools, no install.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-beautify-html-code-online' },
};

export default function HowToBeautifyHtmlCodeOnline() {
  return <BlogPostClient />;
}
