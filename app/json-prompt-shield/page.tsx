import type { Metadata } from 'next';
import Link from 'next/link';
import JsonPromptShieldClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-prompt-shield';

export const metadata: Metadata = {
  title: 'Secure AI JSON Prompt Shield – Mask Keys & Values, 100% Client-Side | UnblockDevs',
  description:
    'High-performance JSON payload masking: mask keys (K_00001), string values (S_00001), keep numbers unchanged. Preserves structure, supports MBs, fully reversible. 100% data security, client-side only.',
  keywords: [
    'JSON masker',
    'AI JSON shield',
    'mask JSON for AI',
    'JSON payload masking',
    'client-side JSON mask',
    'secure AI prompts',
    'JSON key value mask',
    'privacy preserving JSON',
  ],
  openGraph: {
    title: 'Secure AI JSON Prompt Shield – Mask Keys & Values, 100% Client-Side',
    description: 'Mask JSON keys and string values for AI prompts. Numbers unchanged. Fully reversible. No data leaves your browser.',
    type: 'website',
    url: canonicalUrl,
  },
  alternates: { canonical: canonicalUrl },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
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
  ],
};

export default function JsonPromptShieldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4" aria-labelledby="json-shield-heading">
        <h1 id="json-shield-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Mask JSON Before Sending to AI — 100% in Your Browser
        </h1>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Use the JSON Prompt Shield to mask keys and string values in any JSON payload before pasting into ChatGPT or other AI tools. Numbers stay unchanged; structure is preserved. Fully reversible with a mapping file—no data is ever sent to our servers.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          How it works: Paste your JSON, choose what to mask (keys, strings, or both), copy the masked output. Send that to AI. Use the mapping to restore AI responses to your real field names. No signup, no tracking.
        </p>
        <Link href="#tool" className="inline-block text-sm font-semibold text-violet-600 hover:text-violet-700">
          Use the tool →
        </Link>
      </article>
      <div id="tool">
        <JsonPromptShieldClient />
      </div>
    </>
  );
}
