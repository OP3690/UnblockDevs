import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON Tree View & JSONPath Explorer Online | UnblockDevs',
  description:
    'Navigate JSON with a collapsible tree view, run JSONPath queries to extract values, and generate TypeScript interfaces or SQL INSERT statements. Free, 100% browser-based.',
  keywords: [
    'json tree view online',
    'json tree viewer',
    'jsonpath online',
    'json to typescript generator',
    'json to sql converter',
    'json explorer online',
    'jsonpath query tool',
    'json workbench online',
    'how to query json with jsonpath',
    'generate typescript from json',
    'json to sql insert generator',
  ],
  openGraph: {
    title: 'Free JSON Tree View, JSONPath Explorer, JSON to TypeScript & SQL Online | UnblockDevs',
    description: 'Explore JSON with a collapsible tree, run JSONPath queries to extract values, generate TypeScript interfaces, and convert JSON arrays to SQL INSERT statements. Free, private, browser-based.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-tree-view-explorer',
    images: [{ url: 'https://unblockdevs.com/api/og?title=JSON%20Tree%20View%2C%20JSONPath%2C%20JSON%20to%20TypeScript%20%26%20SQL&emoji=%7B%7D&desc=Navigate%20JSON%20with%20tree%20view%2C%20query%20with%20JSONPath%2C%20generate%20TypeScript', width: 1200, height: 630, alt: 'JSON Tree View, JSONPath, JSON to TypeScript & SQL — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Tree View & JSONPath Explorer — Free Online Tool',
    description: 'Navigate JSON as a collapsible tree, query with JSONPath, export to TypeScript or SQL. Free online JSON workbench — nothing uploaded.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-tree-view-explorer' },
};

export default function JsonTreeViewExplorerPage() {
  return <BlogPostClient />;
}
