import type { Metadata } from 'next';
import AiSchemaMaskerClient from './client';

const canonicalUrl = 'https://unblockdevs.com/ai-schema-masker';

export const metadata: Metadata = {
  title: "World's First AI Schema Masker – 100% Data Security, Client-Side Only | UnblockDevs",
  description:
    "World's first fully client-side AI schema masker. 100% data security—your SQL and schemas never leave your browser. Mask tables & columns for AI prompts, restore AI output with deterministic mapping. No server, no signup, zero data transfer.",
  keywords: [
    'AI schema masker',
    'world first AI schema masker',
    'client-side SQL masking',
    '100% data security SQL',
    'SQL identifier masking',
    'client-side SQL anonymizer',
    'mask database schema for AI',
    'secure SQL prompt generator',
    'AI safe SQL prompts',
    'private SQL masking tool',
    'browser-only SQL masker',
    'DITE deterministic masking',
    'no server SQL tool',
  ],
  openGraph: {
    title: "World's First AI Schema Masker – 100% Data Security, Client-Side Only",
    description:
      "Fully client-side. 100% data security. Your SQL and schemas never leave your browser. Mask identifiers for AI, restore with one click. No server, no signup.",
    type: 'website',
    url: canonicalUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: "World's First AI Schema Masker – 100% Data Security, Client-Side Only",
    description: "100% client-side. Your data never leaves your browser. Mask SQL for AI, restore securely.",
  },
  alternates: {
    canonical: canonicalUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'theme-color': '#0d9488',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: "AI Schema Masker – World's First 100% Client-Side SQL Masker",
  description:
    "World's first fully client-side AI schema masker. 100% data security—SQL and schemas never leave your browser. Mask tables and columns for AI prompts, restore AI output with deterministic mapping. No server, no signup.",
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    '100% data security – all processing in your browser',
    'Client-side only – no data sent to any server',
    'World\'s first client-side DITE-based SQL identifier masking',
    'Mask raw SQL or build prompts from schema with JOIN support',
    'Deterministic mapping – restore AI output to original identifiers',
  ],
};

export default function AiSchemaMaskerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AiSchemaMaskerClient />
    </>
  );
}
