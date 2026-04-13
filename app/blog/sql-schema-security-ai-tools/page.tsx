import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'SQL Schema Security — Why You Should Never Paste Production Database Names into AI Tools | UnblockDevs',
  description:
    'Pasting real table and column names into ChatGPT, GitHub Copilot, or Claude exposes your database architecture, violates GDPR and HIPAA, and creates competitive and security risks. Learn the threats and how schema masking protects you.',
  keywords: [
    'sql schema security ai',
    'database schema privacy ai tools',
    'chatgpt database security risk',
    'pasting database schema ai danger',
    'sql schema gdpr compliance ai',
    'database names ai privacy',
    'ai tool sql data leak',
    'schema security chatgpt copilot',
    'production database ai risk',
    'sql ai security best practices',
    'database schema exposure risk',
    'sql copilot security',
    'ai sql gdpr hipaa',
    'protect database schema ai',
    'sql schema leak ai tools',
  ],
  openGraph: {
    title: 'SQL Schema Security — Never Paste Production Database Names into AI Tools | UnblockDevs',
    description: 'Real table and column names in AI prompts expose your architecture, violate compliance, and create security risks. Learn what is at stake and how schema masking protects you.',
    type: 'article',
    publishedTime: '2026-04-13T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/sql-schema-security-ai-tools',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SQL Schema Security — Never Paste Production Database Names into AI Tools',
    description: 'Database schema in AI prompts: real risks, GDPR/HIPAA implications, and how schema masking protects you.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/sql-schema-security-ai-tools' },
};

export default function SqlSchemaSecurityAiToolsPage() {
  return <BlogPostClient />;
}
