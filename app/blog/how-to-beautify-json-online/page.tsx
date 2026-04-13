import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Beautify & Format JSON Online — Pretty Print, Indent & Minify | UnblockDevs',
  description:
    'Beautify compressed JSON into readable, indented format instantly. Learn 2-space vs 4-space indent, how to minify JSON back to compact, fix common JSON errors, and when to use each format in your workflow.',
  keywords: [
    'json beautifier online',
    'beautify json online',
    'format json online free',
    'json pretty print online',
    'prettify json',
    'json formatter online free',
    'json indent online',
    'how to beautify json',
    'json pretty printer',
    'json beautify tool',
    'format json string online',
    'json minifier online',
    'compress json online',
    'json formatter and beautifier',
    'json pretty print 2 spaces',
  ],
  openGraph: {
    title: 'How to Beautify & Format JSON Online — Pretty Print, Indent & Minify | UnblockDevs',
    description: 'Convert compressed JSON to readable indented format. 2-space vs 4-space, minify, fix syntax errors — with free online JSON beautifier.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/how-to-beautify-json-online',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Beautify & Format JSON Online — Pretty Print, Indent & Minify',
    description: 'Format compressed JSON instantly. 2-space vs 4-space, minify, fix errors — free online JSON beautifier.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/how-to-beautify-json-online' },
};

export default function HowToBeautifyJsonOnlinePage() {
  return <BlogPostClient />;
}
