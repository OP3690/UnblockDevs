import type { Metadata } from 'next';
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

export default function JsonPromptShieldPage() {
  return <JsonPromptShieldClient />;
}
