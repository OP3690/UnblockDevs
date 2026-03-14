import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import AiSchemaMaskerClient from './client';

const canonicalUrl = 'https://unblockdevs.com/ai-schema-masker';

export const metadata: Metadata = {
  title: "AI SQL Schema Masker — Hide Table & Column Names Before Sending to ChatGPT | UnblockDevs",
  description:
    "Mask SQL identifiers before sending to AI. Tables become T_001, columns C_001 — fully reversible. Free, 100% browser-based, nothing sent to servers.",
  keywords: [
    'mask sql before chatgpt',
    'hide table names from chatgpt',
    'sql schema privacy chatgpt',
    'safe way to use chatgpt with database',
    'chatgpt sql without exposing schema',
    'mask database schema ai',
    'anonymize sql for ai',
    'sql identifier masking tool',
    'hide column names from ai',
    'chatgpt database security',
    'is it safe to paste sql into chatgpt',
    'chatgpt data privacy sql',
    'sql chatgpt privacy risk',
    'gdpr compliant ai sql tool',
    'hipaa safe ai coding assistant',
    'sql masking compliance ai',
    'anonymize database schema before ai',
    'data masking tool for ai prompts',
    'mask pii before sending to llm',
    'how to use chatgpt for sql without leaking schema',
    'mask table names before sending to chatgpt',
    'sql column name masking for ai prompts',
    'sql schema anonymizer for chatgpt',
    'AI schema masker',
    'client-side SQL masking',
    'DITE deterministic masking',
    'hipaa compliant developer tools',
    'hipaa safe api testing',
    'hipaa compliant json masking',
    'mask phi before chatgpt',
    'phi masking tool developer',
    'soc 2 compliant developer tools',
    'soc 2 data masking',
    'pci dss compliant api testing',
    'ccpa compliant tools',
  ],
  openGraph: {
    title: "AI SQL Schema Masker — Hide Table & Column Names Before ChatGPT | UnblockDevs",
    description:
      "Mask SQL identifiers before sending to AI. Tables → T_001, columns → C_001. Fully reversible, 100% in your browser. No server, no signup.",
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI SQL Schema Masker — Hide Schema Before ChatGPT | UnblockDevs",
    description: "Mask SQL before sending to AI. Fully reversible. 100% browser-based, nothing sent to servers.",
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
  name: "AI SQL Schema Masker — Hide Table & Column Names Before ChatGPT",
  description:
    "Mask SQL identifiers before sending to AI. Tables become T_001, columns C_001 — fully reversible. Free, 100% browser-based. Nothing sent to servers. Safe for GDPR, HIPAA, and PCI-DSS workflows.",
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '2500',
    bestRating: '5',
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
    {
      '@type': 'Question' as const,
      name: 'Can ChatGPT see my real table names?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. When you paste SQL into ChatGPT, the model and OpenAI see every identifier—table names, column names, and aliases. To hide them, mask your SQL first with a client-side tool so only placeholders (e.g. T_001, C_001) are sent. Then restore AI output using the mapping.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Does OpenAI store the SQL I paste?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'OpenAI may retain inputs for abuse detection and product improvement. Their policy states that API data is not used to train models by default, but pasting raw SQL still exposes your schema. Mask identifiers before sending so no real table or column names leave your control.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I mask SQL before sending to AI?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Use a client-side SQL schema masker: paste your SQL, run the masker to replace table and column names with placeholders (e.g. T_001, C_001), then paste the masked version into ChatGPT or any AI. Keep the mapping to restore AI-generated SQL to your real identifiers.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is SQL identifier masking?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'SQL identifier masking replaces real table names, column names, and aliases with anonymous placeholders (e.g. T_001, C_001) so you can share SQL with AI or others without exposing your database structure. A mapping lets you reverse the process and restore original names.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is this tool safe for enterprise use?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. The AI Schema Masker runs entirely in your browser—no SQL or schema is sent to any server. That makes it suitable for teams under GDPR, HIPAA, or PCI-DSS who need to use AI for SQL without exposing real identifiers or PII.',
      },
    },
  ],
};

export default function AiSchemaMaskerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div id="tool">
        <AiSchemaMaskerClient />
      </div>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 space-y-8" aria-labelledby="schema-masker-heading">
        <header>
          <h2 id="schema-masker-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            SQL Schema Masker for AI — Mask Before ChatGPT, Restore After
          </h2>
          <p className="text-gray-700 text-base leading-relaxed mb-3">
            Before sending your SQL to ChatGPT, mask the table and column names so your real database schema stays private. The AI Schema Masker replaces identifiers with placeholders (T_001, C_001), so you get AI help without exposing your schema. Use the mapping to convert AI output back to your real names in one click.
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-2">
            Paste SQL or build a prompt from your schema. Mask identifiers, send the masked version to AI, then restore the response. 100% client-side, no server, no signup.
          </p>
          <p className="text-gray-600 text-sm italic mb-4">
            Used by healthcare and enterprise developers building HIPAA-compliant applications.
          </p>
          <TrackedCtaLink href="#schema-masker-output" toolName="ai_schema_masker" className="inline-block text-sm font-semibold text-teal-600 hover:text-teal-700">
            Use the tool →
          </TrackedCtaLink>
        </header>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Is it safe to paste SQL into ChatGPT?</h3>
          <p className="text-gray-700 leading-relaxed">
            Not if you need to keep your database structure private. When you paste SQL into ChatGPT, your real table names, column names, and aliases are sent to OpenAI. Many developers don&apos;t realize that pasting SQL into AI tools exposes their real identifier names to third-party servers. Use the tool above to mask identifiers first—then paste the masked SQL so only placeholders are sent.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-2">What data does ChatGPT see in your SQL queries?</h3>
          <p className="text-gray-700 leading-relaxed">
            ChatGPT sees everything in the text you paste: every table name, column name, alias, and literal. That can reveal your schema, naming conventions, and sometimes data shape. To use AI for SQL securely, mask identifiers with a client-side tool so only generic placeholders (e.g. T_001, C_001) are sent. You keep the mapping to restore AI-generated SQL to your real names.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-2">How to use AI for SQL without exposing your schema</h3>
          <p className="text-gray-700 leading-relaxed">
            Paste your SQL into the AI Schema Masker above and click Mask. Copy the masked output (real names replaced with T_001, C_001, etc.) and paste that into ChatGPT or any AI. Get help with queries, optimization, or debugging. When the AI returns SQL, paste it into the Restore section with your mapping to get back your real table and column names. Your schema never leaves your browser.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-2">SQL masking for GDPR, HIPAA, and PCI-DSS compliance</h3>
          <p className="text-gray-700 leading-relaxed">
            For teams working under GDPR, HIPAA, or PCI-DSS, sending raw SQL to AI assistants may violate data handling policies because identifier names can be personal or sensitive. Anonymize database schema before AI: mask table and column names with a client-side tool so no real identifiers are sent. Use the mapping only in your environment to restore AI output. This keeps schema and PII under your control.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-2">How AI Schema Masker works — the DITE engine explained</h3>
          <p className="text-gray-700 leading-relaxed">
            The tool uses a deterministic identifier-masking engine (DITE): each distinct table name maps to the same placeholder every time (e.g. <code className="bg-gray-100 px-1 rounded">users</code> → T_001), and the same for columns and aliases. That way, when ChatGPT returns SQL using T_001, you can reverse the mapping reliably. All processing runs in your browser; nothing is sent to our servers. You can download the mapping to restore AI output later or in another session.
          </p>
        </section>
      </article>
    </>
  );
}
