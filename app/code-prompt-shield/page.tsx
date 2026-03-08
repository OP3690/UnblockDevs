import type { Metadata } from 'next';
import CodePromptShieldClient from './client';

const canonicalUrl = 'https://unblockdevs.com/code-prompt-shield';

export const metadata: Metadata = {
  title: 'Stop Leaking Secrets to AI Tools – Code Prompt Shield | UnblockDevs',
  description: 'Stop leaking secrets to AI. Mask variables, secrets, schema, PII for ChatGPT, Claude, Copilot. 100% client-side.',
  keywords: [
    'stop leaking secrets to ai tools',
    'anonymize code for ChatGPT',
    'mask code before AI',
    'protect secrets in AI prompts',
    'AI prompt privacy tool',
    'code prompt shield',
    'mask code for AI',
    'protect code before sending to AI',
  ],
  openGraph: {
    title: 'Stop Leaking Secrets to AI Tools – Code Prompt Shield | UnblockDevs',
    description: 'Stop leaking secrets to AI. Mask identifiers, secrets, schema, PII. Copy safe prompts for ChatGPT, Claude, Copilot. Client-side only.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: { canonical: canonicalUrl },
};

export default function CodePromptShieldPage() {
  return <CodePromptShieldClient />;
}
