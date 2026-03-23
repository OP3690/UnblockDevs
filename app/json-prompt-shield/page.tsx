import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import JsonPromptShieldClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-prompt-shield';

export const metadata: Metadata = {
  title: 'JSON Prompt Shield — Mask JSON Keys & Values Before Sending to ChatGPT | UnblockDevs',
  description:
    'Mask JSON keys and string values before sending to ChatGPT or any AI. K_00001, S_00001 format — fully reversible. Free, 100% browser-based, no data leaves your device.',
  keywords: [
    'mask json before chatgpt',
    'hide json keys from ai',
    'json privacy chatgpt',
    'mask json payload for ai',
    'json field masking tool',
    'anonymize json for chatgpt',
    'hide json values from chatgpt',
    'json key masking online',
    'mask json fields before ai',
    'json data masking tool free',
    'json masking for ai prompts',
    'gdpr compliant json ai tool',
    'mask api response before chatgpt',
    'pii masking json tool',
    'json anonymizer for ai',
    'hipaa safe json ai tool',
    'sanitize json before sending to ai',
    'is it safe to paste json into chatgpt',
    'how to hide json keys before sending to chatgpt',
    'mask json field names for ai prompts',
    'json masking tool no server free',
    'reversible json masking for ai',
    'client side json masking browser',
    'JSON Prompt Shield',
    'mask JSON for AI',
    'hipaa compliant json masking',
    'mask patient data before ai',
    'hipaa chatgpt sql',
    'soc 2 data masking',
    'pci dss chatgpt policy',
    'ccpa data masking',
  ],
  openGraph: {
    title: 'JSON Prompt Shield — Mask JSON Keys & Values Before ChatGPT | UnblockDevs',
    description:
      'Mask JSON keys and string values before sending to ChatGPT. K_00001, S_00001 — fully reversible. Free, 100% browser-based. No data leaves your device.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Prompt Shield — Mask JSON Before ChatGPT | UnblockDevs',
    description: 'Mask keys and string values before sending to AI. Fully reversible. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Prompt Shield — Mask JSON Keys & Values Before ChatGPT',
  description:
    'Mask JSON keys and string values before sending to AI. K_00001, S_00001 — fully reversible. Free, 100% browser-based. Nothing sent to servers.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Mask JSON keys to K_00001, string values to S_00001',
    '100% client-side — no data sent to any server',
    'Fully reversible with mapping — restore AI output to real names',
    'Works with API responses, REST, GraphQL — any JSON',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'Is it safe to paste JSON into ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'When you paste JSON into ChatGPT, your real field names and string values are sent to OpenAI servers. Use JSON Prompt Shield to mask keys to K_00001 and values to S_00001 before sending — fully reversible after AI responds.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can ChatGPT see my JSON field names?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Any JSON pasted into ChatGPT exposes your real key names, string values, and payload structure to OpenAI servers.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I hide JSON keys from ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your JSON into JSON Prompt Shield at unblockdevs.com/json-prompt-shield. Keys become K_00001, strings become S_00001. Send masked version to AI, restore real names after with one click.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I mask JSON before sending to ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your JSON into the JSON Prompt Shield, enable "Mask keys" and "Mask strings", then copy the masked output. Paste that into ChatGPT. Your real field names are replaced with placeholders like K_00001 and S_00001. Use the mapping file to restore AI responses to your original names.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is my data sent to your servers?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'No. All masking runs in your browser. Nothing is uploaded or stored. You can verify by using the tool offline or inspecting network requests.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I restore AI output to my real field names?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. The tool gives you a mapping file (or in-page restore). Paste the AI response and the mapping to get back your original keys and string values.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Does this work for API responses?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Paste any API response JSON — REST, GraphQL, webhooks. Mask the sensitive fields, get AI help with the structure, restore after.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is JSON Prompt Shield free?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Completely free, no signup, runs entirely in your browser. Nothing is sent to any server.',
      },
    },
  ],
};

export default function JsonPromptShieldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div id="tool">
        <JsonPromptShieldClient />
      </div>
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12" aria-labelledby="json-shield-heading">
        <h2 id="json-shield-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Mask JSON Before Sending to AI — 100% in Your Browser
        </h2>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Use the JSON Prompt Shield to mask keys and string values in any JSON payload before pasting into ChatGPT or other AI tools. Numbers stay unchanged; structure is preserved. Fully reversible with a mapping file—no data is ever sent to our servers.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-2">
          How it works: Paste your JSON, choose what to mask (keys, strings, or both), copy the masked output. Send that to AI. Use the mapping to restore AI responses to your real field names. No signup, no tracking.
        </p>
        <p className="text-gray-600 text-sm italic mb-6">
          Used by healthcare and enterprise developers building HIPAA-compliant applications.
        </p>
        <TrackedCtaLink href="#json-shield-output" toolName="json_prompt_shield" className="inline-block text-sm font-semibold text-violet-600 hover:text-violet-700 mb-10">
          Use the tool →
        </TrackedCtaLink>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Is it safe to paste JSON into ChatGPT?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          When you paste JSON into ChatGPT, your real field names, string values, and data structure are sent to OpenAI&apos;s servers and may be retained. Use JSON Prompt Shield to replace keys and values with generic tokens (K_00001, S_00001) before sending, then restore after you get the AI response.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Can ChatGPT see my JSON field names?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Yes. Any JSON you paste into ChatGPT exposes your real key names, string values, and payload structure to OpenAI&apos;s servers. Mask your JSON with JSON Prompt Shield first so the AI only sees placeholders—your schema stays private.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">How do I mask JSON before sending to AI?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Paste your JSON into JSON Prompt Shield above, enable &quot;Mask keys&quot; and &quot;Mask string values&quot;, then copy the masked output. Send that to ChatGPT or any AI. After you get a response, paste it back into the Restore section with your mapping to get real field names and values again.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Does ChatGPT store JSON data I paste?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          OpenAI may retain data you submit, including pasted JSON, per their usage policies. To avoid exposing real keys and values, mask your payload with JSON Prompt Shield before pasting—only generic placeholders are sent.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">How do I hide sensitive JSON values from ChatGPT?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Use JSON Prompt Shield to replace string values with S_00001-style placeholders and keys with K_00001. Your sensitive data never leaves your browser; the AI only sees the masked structure. Restore the AI&apos;s output with the mapping when you&apos;re done.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Does this work for API responses?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Yes. Paste any API response JSON—REST, GraphQL, webhooks. Mask the sensitive fields, get AI help with the structure or debugging, then restore real names and values after with the in-page restore or mapping file.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Is JSON Prompt Shield free?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Yes. It&apos;s completely free, no signup, and runs entirely in your browser. Nothing is sent to any server—mask and restore locally for full privacy.
        </p>

        <p className="text-gray-600 text-sm mt-8">
          For masking database schemas (SQL/table names) before sending to AI, use our{' '}
          <Link href="/ai-schema-masker" className="text-violet-600 hover:text-violet-700 font-medium">
            AI Schema Masker
          </Link>
          —same idea, for schemas.
        </p>
      </article>
    </>
  );
}
