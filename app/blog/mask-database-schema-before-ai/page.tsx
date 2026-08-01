import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Mask Your Database Schema Before Using AI | UnblockDevs',
  description:
    'Complete guide to SQL schema masking: what it is, why it matters, how DITE (Deterministic Identifier Transformation Engine) works, how to mask identifiers and IN clause values, and how to restore AI-generated SQL to original names.',
  keywords: [
    'mask database schema ai',
    'sql schema obfuscation',
    'sql schema masking tool',
    'database identifier masking',
    'sql masking before chatgpt',
    'schema obfuscation tool online',
    'mask table names column names ai',
    'sql identifier obfuscation',
    'DITE sql masking',
    'deterministic identifier transformation',
    'sql privacy tool online',
    'mask sql schema free',
    'schema masking and restore',
    'obfuscate sql schema browser',
    'sql schema anonymization',
  ],
  openGraph: {
    title: 'How to Mask Database Schema Before Using AI — Complete SQL Schema Obfuscation Guide | UnblockDevs',
    description: 'SQL schema masking explained: DITE engine, identifier masking, IN clause value masking, restore workflow. Complete guide for developers using AI SQL tools safely.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/mask-database-schema-before-ai',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Mask%20Database%20Schema%20Before%20Using%20AI%20%E2%80%94%20Complete%20SQL%20Schema%20Obfuscation...&emoji=%F0%9F%97%84%EF%B8%8F&desc=SQL%20schema%20masking%20explained%3A%20DITE%20engine%2C%20identifier%20masking%2C%20IN%20clause%20value', width: 1200, height: 630, alt: 'How to Mask Database Schema Before Using AI — Complete SQL Schema Obfuscation... — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Mask Database Schema Before Using AI — Complete Guide',
    description: 'DITE schema masking: table names → T_000001, columns → C_000001, IN values → V_000001. Full restore from AI response. Free browser tool.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/mask-database-schema-before-ai' },
};

export default function MaskDatabaseSchemaBeforeAiPage() {
  return <BlogPostClient />;
}
