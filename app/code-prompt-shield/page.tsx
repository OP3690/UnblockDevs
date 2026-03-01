import type { Metadata } from 'next';
import CodePromptShieldClient from './client';

const canonicalUrl = 'https://unblockdevs.com/code-prompt-shield';

export const metadata: Metadata = {
  title: 'Code Prompt Shield – Reversible Code Masking for AI | UnblockDevs',
  description:
    'Mask variables, function names, secrets, and PII in code before sending to AI. Deterministic, reversible, multi-language. Python, JavaScript, TypeScript, Java, Go, C#, PHP, Rust. 100% client-side.',
  keywords: [
    'code masking',
    'code prompt shield',
    'AI code privacy',
    'reversible code mask',
    'mask code for AI',
    'source code masker',
    'multi-language code masking',
    'client-side code masking',
  ],
  openGraph: {
    title: 'Code Prompt Shield – Reversible Code Masking for AI',
    description: 'Mask identifiers, secrets, and PII in code. Send safe prompts to AI. Restore original code from AI response. Client-side only.',
    type: 'website',
    url: canonicalUrl,
  },
  alternates: { canonical: canonicalUrl },
};

export default function CodePromptShieldPage() {
  return <CodePromptShieldClient />;
}
