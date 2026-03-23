import type { Metadata } from 'next';
import Link from 'next/link';
import TrackedCtaLink from '@/components/TrackedCtaLink';
import CodePromptShieldClient from './client';

const canonicalUrl = 'https://unblockdevs.com/code-prompt-shield';

export const metadata: Metadata = {
  title: 'Code Prompt Shield — Mask API Keys, Variables & Secrets Before Sending Code to ChatGPT | UnblockDevs',
  description:
    'Mask API keys, function names, variables, and PII in your code before sending to ChatGPT or GitHub Copilot. Fully reversible. Free, 100% browser-based, nothing leaves your device.',
  keywords: [
    'mask code before chatgpt',
    'hide api keys from chatgpt',
    'mask variables before ai',
    'code privacy chatgpt',
    'hide secrets from ai coding assistant',
    'mask function names before ai',
    'code masking tool for ai',
    'sanitize code before chatgpt',
    'mask identifiers before sending to ai',
    'is it safe to paste api keys into chatgpt',
    'remove api keys before sending to ai',
    'accidentally pasted api key into chatgpt',
    'how to safely share code with chatgpt',
    'strip secrets from code before ai',
    'github copilot code privacy',
    'hide secrets from github copilot',
    'mask code before copilot',
    'claude code privacy secrets',
    'cursor ai code privacy',
    'mask pii in code before ai',
    'gdpr compliant ai coding',
    'hipaa safe ai code assistant',
    'is it safe to paste code into chatgpt',
    'can chatgpt see my api keys',
    'does chatgpt store the code i paste',
    'how do i hide secrets when using chatgpt for coding',
    'how to use ai for coding without exposing secrets',
    'Code Prompt Shield',
    'mask code for AI',
    'hipaa compliant developer tools',
    'hipaa safe coding assistant',
    'soc 2 compliant developer tools',
    'pci compliant developer tools',
    'mask credit card data before ai',
    'ccpa compliance developer',
  ],
  openGraph: {
    title: 'Code Prompt Shield — Mask API Keys & Secrets Before ChatGPT | UnblockDevs',
    description:
      'Mask API keys, variables, and PII in your code before sending to ChatGPT or Copilot. Fully reversible. Free, 100% browser-based. Nothing leaves your device.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code Prompt Shield — Mask API Keys & Secrets Before ChatGPT | UnblockDevs',
    description: 'Mask code before sending to AI. Fully reversible. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Code Prompt Shield — Mask API Keys, Variables & Secrets Before ChatGPT',
  description:
    'Mask API keys, function names, variables, and PII in your code before sending to ChatGPT or GitHub Copilot. Fully reversible. Free, 100% browser-based. Nothing sent to servers.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Mask variables, function names, class names before sending to AI',
    'Detect and mask API keys, tokens, connection strings, PII',
    '100% client-side — no code or mapping sent to any server',
    'Fully reversible — restore AI response with original identifiers',
    'JavaScript, TypeScript, Python, Java, Go, SQL, JSON, C#, PHP, Rust',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'Is it safe to paste code with API keys into ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'No. Pasting code with real API keys or secrets into ChatGPT sends them to OpenAI servers. Use Code Prompt Shield at unblockdevs.com/code-prompt-shield to mask all secrets before sending — fully reversible after AI responds.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can ChatGPT see my function and variable names?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. All identifiers in code you paste into ChatGPT are visible to OpenAI and may be retained. Code Prompt Shield masks variable names, function names, and class names before you send.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I hide API keys from ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your code into Code Prompt Shield. API keys and secrets are detected and masked automatically. Send the masked version to ChatGPT, then restore your real values after with one click.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I use ChatGPT for coding without leaking secrets?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your code into Code Prompt Shield. API keys, variables, and function names are masked with generic tokens. Send the masked version to ChatGPT, get help with the logic, then restore your real identifiers after.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Does GitHub Copilot see my API keys?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'GitHub Copilot processes code in your editor, including any hardcoded secrets or API keys present in the file. Masking code before sending to ChatGPT or other AI tools adds a security layer; use Code Prompt Shield to strip secrets before pasting elsewhere.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What languages does Code Prompt Shield support?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'JavaScript, TypeScript, Python, Java, Go, SQL, JSON, C#, PHP, and Rust — with more being added.',
      },
    },
  ],
};

export default function CodePromptShieldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div id="tool">
        <CodePromptShieldClient />
      </div>
      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12" aria-labelledby="code-shield-heading">
        <h2 id="code-shield-heading" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Mask Code Before Sending to ChatGPT or Copilot — 100% in Your Browser
        </h2>
        <p className="text-gray-700 text-base leading-relaxed mb-3">
          Use Code Prompt Shield to mask variables, function names, API keys, and PII in your source code before pasting into ChatGPT, Claude, or GitHub Copilot. Your real identifiers become generic tokens; get AI help with logic, then restore your original code with one click. No data leaves your device.
        </p>
        <p className="text-gray-600 text-sm leading-relaxed mb-2">
          How it works: Paste code, choose what to mask (identifiers, secrets, PII), copy the masked version. Send that to the AI. After you get a response, paste it back and restore with your mapping. No signup, no server — everything runs in your browser.
        </p>
        <p className="text-gray-600 text-sm italic mb-6">
          Used by healthcare and enterprise developers building HIPAA-compliant applications.
        </p>
        <TrackedCtaLink href="#tool" toolName="code_prompt_shield" className="inline-block text-sm font-semibold text-violet-600 hover:text-violet-700 mb-10">
          Use the tool →
        </TrackedCtaLink>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Is it safe to paste code into ChatGPT?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Pasting code into ChatGPT sends it to OpenAI&apos;s servers; your variable names, logic, and any secrets in the code are visible and may be retained. Use Code Prompt Shield to mask identifiers and secrets before sending so only generic tokens are exposed.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Can ChatGPT see my API keys?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Yes. Any code you paste that contains API keys, tokens, or connection strings sends those values to OpenAI. Mask your code with Code Prompt Shield first — secrets are replaced with placeholders, and you restore the AI&apos;s response with real values after.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Does ChatGPT store the code I paste?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          OpenAI may retain data you submit, including pasted code, per their usage policies. To avoid exposing proprietary logic or identifiers, mask your code with Code Prompt Shield before pasting — only generic tokens are sent.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">How do I hide secrets when using ChatGPT for coding?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Paste your code into Code Prompt Shield above. Enable &quot;Secrets&quot; (and optionally &quot;Identifiers&quot; and &quot;PII&quot;). Copy the masked output and send that to ChatGPT. After the AI responds, paste its code into the Restore section and apply your mapping to get back real names and values.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">Is GitHub Copilot safe for proprietary code?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          Copilot processes code in your editor; their policies describe how they use it. When you paste code into ChatGPT or other AI tools, use Code Prompt Shield to mask identifiers and secrets so you don&apos;t expose proprietary structure or credentials.
        </p>

        <h2 className="text-xl font-bold text-gray-900 mt-8 mb-2">What languages does Code Prompt Shield support?</h2>
        <p className="text-gray-700 text-base leading-relaxed mb-4">
          JavaScript, TypeScript, Python, Java, Go, SQL, JSON, C#, PHP, and Rust. Select your language in the tool; masking rules and identifier detection adapt automatically.
        </p>

        <p className="text-gray-600 text-sm mt-8">
          For masking <strong>database schemas</strong> (table/column names) before sending to AI, use{' '}
          <Link href="/ai-schema-masker" className="text-violet-600 hover:text-violet-700 font-medium">
            AI Schema Masker
          </Link>
          . For masking <strong>JSON payloads</strong> (keys and string values), use{' '}
          <Link href="/json-prompt-shield" className="text-violet-600 hover:text-violet-700 font-medium">
            JSON Prompt Shield
          </Link>
          —same privacy idea, for schemas and API data.
        </p>
      </article>
    </>
  );
}
