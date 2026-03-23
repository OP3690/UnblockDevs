import type { Metadata } from 'next';
import ToolsJsonHubClient from './hub-client';
import { TOOLS_DIRECTORY, TOOL_COUNT } from './tools-data';

const canonicalUrl = 'https://unblockdevs.com/tools/json';
const siteOrigin = 'https://unblockdevs.com';

const hubTitle = `Developer Tools Directory — AI Schema Masker, Code & JSON Prompt Shield + ${TOOL_COUNT}+ Tools | UnblockDevs`;
const hubDescription = `Mask SQL for ChatGPT, scrub secrets in code, and abstract JSON before AI — plus ${TOOL_COUNT}+ tools: JSON formatter, diff, APIs, JWT, cURL, encoding & more. 100% in your browser; no signup.`;

export const metadata: Metadata = {
  title: hubTitle,
  description: hubDescription,
  keywords: [
    'free developer tools',
    'online json tools',
    'json formatter online free',
    'json viewer online',
    'api tools online',
    'jwt decoder online',
    'curl to python online',
    'mask json for chatgpt',
    'ai schema masking tool',
    'base64 encode decode online',
    'uuid generator online',
    'developer tools directory',
    'browser based tools no signup',
    'json to excel online',
    'smart json diff',
    'cors tester online',
    'hash generator online',
    'password generator developer',
  ],
  openGraph: {
    title: `Free Developer Tools — ${TOOL_COUNT}+ JSON, API & AI Utilities | UnblockDevs`,
    description: `Directory of ${TOOL_COUNT}+ free tools: JSON, APIs, AI-safe masking, crypto, and dev utilities. All client-side.`,
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Free dev tools directory — ${TOOL_COUNT}+ tools`,
    description: `JSON, API, AI masking, JWT, cURL, hashes & more. Runs in your browser.`,
  },
  alternates: {
    canonical: canonicalUrl,
  },
};

function toolAbsoluteUrl(href: string) {
  if (href === '/') return siteOrigin;
  return `${siteOrigin}${href.startsWith('/') ? href : `/${href}`}`;
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'UnblockDevs free developer tools directory',
  description: 'JSON, API, AI safety, encoding, and developer utilities that run in the browser.',
  numberOfItems: TOOL_COUNT,
  itemListElement: TOOLS_DIRECTORY.map((tool, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: tool.name,
    description: tool.description,
    url: toolAbsoluteUrl(tool.href),
  })),
};

const webPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: hubTitle,
  description: hubDescription,
  url: canonicalUrl,
  isPartOf: { '@type': 'WebSite', name: 'UnblockDevs', url: siteOrigin },
  about: {
    '@type': 'Thing',
    name: 'Developer tools and JSON utilities',
  },
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Are UnblockDevs tools free?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Every tool in this directory is free to use with no signup. There are no paywalls for core features.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my JSON or API data sent to your servers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Tools run entirely in your browser. Your JSON, tokens, passwords, and API responses are not uploaded or stored on UnblockDevs servers for processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I safely use ChatGPT with production JSON?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the AI Schema Masker or JSON Prompt Shield to replace real table names, keys, and sensitive strings with reversible placeholders before pasting into ChatGPT or other LLMs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best tool to fix broken JSON from an API?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the JSON fixer and recovery tool for malformed JSON, trailing commas, and AI-generated errors. Pair it with the log unpacker if JSON is nested inside log lines.',
      },
    },
  ],
};

export default function JsonToolsHubPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ToolsJsonHubClient />
      <article
        className="border-t border-zinc-200 bg-white"
        aria-labelledby="tools-hub-faq-heading"
      >
        <div className="ud-content-tool py-12 sm:py-16">
          <h2 id="tools-hub-faq-heading" className="text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
            Frequently asked questions
          </h2>
          <dl className="mt-8 space-y-8">
            <div>
              <dt className="text-base font-semibold text-zinc-900">Are these developer tools free?</dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Yes. The full directory of {TOOL_COUNT}+ utilities is free and does not require an account.
              </dd>
            </div>
            <div>
              <dt className="text-base font-semibold text-zinc-900">Does my data leave my device?</dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
                Core tools process input in your browser. Do not paste truly secret production credentials into any online
                tool if your security policy forbids it — but UnblockDevs does not receive your payloads for those
                client-side tools.
              </dd>
            </div>
            <div>
              <dt className="text-base font-semibold text-zinc-900">Which tool should I use for ChatGPT and JSON?</dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
                For SQL schemas use <strong className="text-zinc-800">AI Schema Masker</strong>. For arbitrary JSON use{' '}
                <strong className="text-zinc-800">JSON Prompt Shield</strong>. Both support reversible masking so you can
                map answers back to real names later.
              </dd>
            </div>
            <div>
              <dt className="text-base font-semibold text-zinc-900">Where can I learn more about JSON best practices?</dt>
              <dd className="mt-2 text-sm leading-relaxed text-zinc-600 sm:text-base">
                See our{' '}
                <a href="/blog/json-best-practices-production-guide" className="font-medium text-emerald-800 underline-offset-2 hover:underline">
                  JSON best practices guide
                </a>{' '}
                and{' '}
                <a href="/blog/complete-guide-json-viewer-parser-beautifier" className="font-medium text-emerald-800 underline-offset-2 hover:underline">
                  JSON viewer &amp; formatter guide
                </a>
                .
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </>
  );
}
