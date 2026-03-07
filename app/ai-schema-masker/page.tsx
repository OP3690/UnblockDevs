import type { Metadata } from 'next';
import Link from 'next/link';
import AiSchemaMaskerClient from './client';

const canonicalUrl = 'https://unblockdevs.com/ai-schema-masker';

export const metadata: Metadata = {
  title: "World's First AI Schema Masker – 100% Data Security, Client-Side Only | UnblockDevs",
  description:
    "Stop leaking secrets to AI tools. World's first fully client-side AI schema masker. 100% data security—your SQL and schemas never leave your browser. Mask tables & columns for AI. No server, no signup.",
  keywords: [
    'stop leaking secrets to ai tools',
    'AI schema masker',
    'client-side SQL masking',
    '100% data security SQL',
    'SQL identifier masking',
    'mask database schema for AI',
    'secure SQL prompt generator',
    'AI safe SQL prompts',
    'private SQL masking tool',
    'DITE deterministic masking',
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

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'How do I mask SQL schema before sending to AI?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your SQL or schema into the AI Schema Masker. The tool replaces table and column names with deterministic placeholders (e.g. T_001, C_001). Send the masked version to ChatGPT or any AI. Use the mapping to convert AI-generated SQL back to your real identifiers.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Does the AI Schema Masker send my database structure to a server?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'No. All processing is client-side. Your SQL and schemas never leave your browser. No account or upload is required.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is SQL schema masking for AI?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'SQL schema masking replaces real table and column names with anonymous placeholders before you paste code or schema into an AI. This lets you get help without exposing your real database structure. You can restore AI output to your names using a mapping.',
      },
    },
  ],
};

export default function AiSchemaMaskerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="schema-masker-heading">
        <h1 id="schema-masker-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          SQL Schema Masking for AI — Sanitize Data Before ChatGPT
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          The AI Schema Masker lets you mask table and column names in SQL and schema definitions before sending them to AI. Your database structure never leaves your browser. Deterministic mapping lets you restore AI-generated SQL to your real identifiers in one click.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          How it works: Paste SQL or build a prompt from your schema. Mask identifiers (e.g. tables → T_001, columns → C_001). Send the masked version to AI. Use the mapping to convert AI output back to your real names. 100% client-side, no server, no signup.
        </p>
        <Link href="#tool" className="inline-block text-sm font-semibold text-teal-600 hover:text-teal-700">
          Use the tool →
        </Link>
      </article>
      <div id="tool">
        <AiSchemaMaskerClient />
      </div>
    </>
  );
}
