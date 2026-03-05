import type { Metadata } from 'next';
import CodePromptShieldClient from './client';

const canonicalUrl = 'https://unblockdevs.com/code-prompt-shield';

export const metadata: Metadata = {
  title: 'Code Prompt Shield – Protect Your Code Before Sending to AI | UnblockDevs',
  description:
    'Anonymize code for ChatGPT, Claude, Copilot. Mask variables, functions, secrets, database schema, and PII before sending to AI. Deterministic mapping, SQL/JSON support, risk score, .maskmap export. 100% client-side.',
  keywords: [
    'anonymize code for ChatGPT',
    'mask code before AI',
    'protect secrets in AI prompts',
    'AI prompt privacy tool',
    'code prompt shield',
    'mask code for AI',
    'reversible code mask',
    'protect code before sending to AI',
  ],
  openGraph: {
    title: 'Code Prompt Shield – Protect Your Code Before Sending to AI',
    description: 'Mask identifiers, secrets, schema, and PII. Copy safe prompts for ChatGPT, Claude, Copilot. Restore AI response with original names. Client-side only.',
    type: 'website',
    url: canonicalUrl,
  },
  alternates: { canonical: canonicalUrl },
};

export default function CodePromptShieldPage() {
  return <CodePromptShieldClient />;
}
