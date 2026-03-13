import type { Metadata } from 'next';
import PromptChunkerLandingClient from './client';

const canonicalUrl = 'https://unblockdevs.com/prompt-chunker';

export const metadata: Metadata = {
  title:
    'AI Prompt Chunker — Split Long Prompts for ChatGPT, Claude & Gemini, Bypass Token Limits & Optimize Prompts Free Online | UnblockDevs',
  description:
    'Split long prompts into chunks with smart overlap for ChatGPT, Claude, and Gemini. Auto-adds AI consolidation instructions. Simplify and optimize messy prompts. Free, 100% browser-based, no signup.',
  keywords: [
    'prompt chunker online',
    'ai prompt chunker',
    'split prompt chatgpt',
    'chatgpt prompt splitter',
    'ai prompt splitter tool',
    'split long prompt ai',
    'chunk prompt for chatgpt',
    'prompt chunker free',
    'ai token limit workaround',
    'chatgpt token limit workaround',
    'send long text to chatgpt',
    'chatgpt prompt too long',
    'split prompt for claude',
    'split prompt gemini',
    'prompt simplifier',
    'ai prompt simplifier',
    'prompt optimizer',
    'prompt engineering',
    'send long document to chatgpt',
    'split text for ai processing',
    'how to send a long prompt to chatgpt',
    'prompt chunking overlap',
    'AI Prompt Chunker',
  ],
  openGraph: {
    title: 'AI Prompt Chunker — Split Long Prompts for ChatGPT, Claude & Gemini | UnblockDevs',
    description:
      'Split long prompts into chunks with overlap, auto consolidation instructions, and prompt simplifier mode. Free, 100% browser-based, no signup.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Prompt Chunker — Split Long Prompts & Bypass Token Limits | UnblockDevs',
    description: 'Chunk long prompts with overlap + consolidation instructions. Simplify messy prompts. 100% browser-based.',
  },
  alternates: {
    canonical: canonicalUrl,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'AI Prompt Chunker — Split Long Prompts for ChatGPT, Claude & Gemini',
  description:
    'Split long prompts into chunks with smart overlap for ChatGPT, Claude, and Gemini. Auto-adds consolidation instructions. Includes prompt simplifier mode. Free, 100% browser-based.',
  url: canonicalUrl,
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Chunk by words or characters',
    'Configurable overlap for context preservation',
    'Automatic AI consolidation instructions',
    'Prompt simplifier mode to optimize messy prompts',
    'Preset templates',
    '100% client-side — no data sent to servers',
  ],
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: "What is ChatGPT's token limit?",
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'ChatGPT-4o allows approximately 128,000 tokens (~96,000 words) per context window. Free tier GPT-3.5 allows around 16,000 tokens. Claude 3.5 allows up to 200,000 tokens. When prompts exceed these limits, content gets truncated. Prompt Chunker at unblockdevs.com/prompt-chunker splits prompts into model-safe pieces automatically.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is prompt chunking?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: "Prompt chunking splits a long prompt or document into smaller pieces that fit within an AI model's token limit. Each chunk includes overlap with the previous chunk to preserve context, plus automatic instructions telling the AI to hold chunks in memory and consolidate them for the final response.",
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I send a long document to ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: "Paste your document into Prompt Chunker at unblockdevs.com/prompt-chunker. Set your chunk size based on the model's token limit, configure overlap at 30-50% for context preservation, and click Split. Send each numbered chunk to ChatGPT in order — the tool adds automatic consolidation instructions.",
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between prompt chunking and prompt simplifying?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Chunking splits a long prompt into multiple pieces for sequential sending when your content exceeds token limits. Simplifying restructures a single messy prompt into a clean, optimized, structured prompt without splitting. Use chunking for length problems, simplifying for clarity problems.',
      },
    },
  ],
};

export default function PromptChunkerLanding() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div id="tool">
        <PromptChunkerLandingClient />
      </div>
    </>
  );
}

