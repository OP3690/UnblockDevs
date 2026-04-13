import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'JSON Tree View, JSONPath, JSON to TypeScript & SQL — Advanced JSON Exploration | UnblockDevs',
  description:
    'Navigate JSON with a collapsible tree view, query values with JSONPath, generate TypeScript interfaces, and convert JSON arrays to SQL INSERT statements. Full guide for advanced JSON workflows.',
  keywords: [
    'json tree view online',
    'json tree viewer',
    'jsonpath online',
    'json to typescript',
    'json to typescript generator online',
    'json to sql generator',
    'json to sql insert',
    'json tree explorer',
    'jsonpath query online',
    'generate typescript from json',
    'json to typescript interface',
    'json explore online',
    'json workbench online',
    'json to sql converter',
    'json path query tool',
  ],
  openGraph: {
    title: 'JSON Tree View, JSONPath, JSON to TypeScript & SQL | UnblockDevs',
    description: 'Navigate JSON with tree view, query with JSONPath, generate TypeScript interfaces, convert arrays to SQL — all in one JSON workbench.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/json-tree-view-explorer',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Tree View, JSONPath, JSON to TypeScript & SQL',
    description: 'Tree view navigation, JSONPath queries, TypeScript interface generation, and SQL conversion — advanced JSON workflow guide.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/json-tree-view-explorer' },
};

export default function JsonTreeViewExplorerPage() {
  return <BlogPostClient />;
}
