import type { Metadata } from 'next';
import PromptChunkerLandingClient from './client';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection,
  SEOProse,
  C,
  HowItWorks,
  UseCases,
  FAQ,
  RelatedTools,
} from '@/components/tools/ToolSEOContent';

const canonicalUrl = 'https://unblockdevs.com/prompt-chunker';

export const metadata: Metadata = {
  title:
    'Prompt Chunker — Split Large Text into AI Context Window Chunks, Token Counter & LLM Context Optimizer Online Free | UnblockDevs',
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
    'llm context window',
    'token counter',
  ],
  openGraph: {
    title: 'Prompt Chunker — Split Large Text into AI Context Window Chunks | UnblockDevs',
    description:
      'Split long prompts into chunks with overlap, auto consolidation instructions, and token counts. Free, 100% browser-based, no signup.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Chunker — Split Large Text into AI Context Window Chunks | UnblockDevs',
    description: 'Chunk long prompts with overlap + consolidation instructions. Token counter included. 100% browser-based.',
  },
  alternates: {
    canonical: canonicalUrl,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Prompt Chunker — Split Large Text into AI Context Window Chunks',
  description:
    'Split long prompts into chunks with smart overlap for ChatGPT, Claude, and Gemini. Auto-adds consolidation instructions. Includes token counter. Free, 100% browser-based.',
  url: canonicalUrl,
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Chunk by words or characters',
    'Configurable overlap for context preservation',
    'Token count per chunk',
    'Automatic AI consolidation instructions',
    'Preset templates for popular models',
    '100% client-side — no data sent to servers',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '880',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is a context window in AI models?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A context window is the maximum amount of text (measured in tokens) that an AI model can process in a single request. GPT-4o supports ~128k tokens, Claude 3.5 Sonnet supports 200k tokens, and Gemini 1.5 Pro supports up to 1M tokens. When input exceeds the context window, content is truncated or rejected.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I split a long prompt for an AI model?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your text into Prompt Chunker, set the chunk size to fit your model\'s context window, configure overlap (30-50% for narrative text), and click Split. Send each numbered chunk to the AI in order. The tool automatically adds instructions telling the AI to hold chunks in memory and consolidate them on the final chunk.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between tokens and words?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Tokens are the units AI models use to process text. On average, 1 token ≈ 0.75 words in English, so 1,000 tokens ≈ 750 words. Punctuation, whitespace, and subword pieces each consume tokens. The exact count depends on the tokenizer (e.g., cl100k_base for GPT-4, Claude\'s tokenizer for Claude models).',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the best chunk size for GPT-4?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'For GPT-4 (8k context), keep chunks under 6,000 tokens (~4,500 words) to leave room for the system prompt and response. For GPT-4o (128k context), chunks of 50,000-80,000 tokens work well. Always add 20-30% headroom for overlap, system prompts, and model responses.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Chunk Long Prompts for AI Models Online',
  description: 'Step-by-step guide to splitting long documents or prompts into AI-compatible chunks with configurable overlap.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your text', text: 'Paste any long document, prompt, or codebase into the input area. The tool shows a live token count as you type.' },
    { '@type': 'HowToStep', position: 2, name: 'Set chunk size & overlap', text: 'Choose chunk size (words or characters) and overlap percentage (30-50% for narrative text, 10-20% for code blocks).' },
    { '@type': 'HowToStep', position: 3, name: 'See chunks with token counts', text: 'Instantly view each numbered chunk with its token count, so you know it fits your target model context window.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy each chunk', text: 'Copy individual chunks or download all at once. Send them to the AI in order — consolidation instructions are added automatically.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Prompt Chunker', item: canonicalUrl },
  ],
};

export default function PromptChunkerLanding() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PromptChunkerLandingClient />
      <ToolSEOContent>
        <SEOSection id="what" heading="What Is a Prompt Chunker?">
          <SEOProse>
            A <strong>prompt chunker</strong> splits large text or documents into smaller pieces that fit inside an AI
            model&apos;s <strong>context window</strong> — the maximum number of tokens a model can process at once.
            Every LLM has a hard limit: GPT-4 caps at 8k–32k tokens, GPT-4o at 128k, Claude 3.5 Sonnet and Claude 3
            Opus at 200k, and Gemini 1.5 Pro at 1M. When your input exceeds that limit the model silently truncates
            content or returns an error — and you lose critical context.
          </SEOProse>
          <SEOProse>
            Chunking matters because many real-world tasks involve long inputs: entire codebases, research papers, legal
            documents, or multi-turn conversation histories. By splitting text into overlapping chunks and sending them
            sequentially with consolidation instructions, you work within any model&apos;s token budget while preserving
            the full context of your document.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Split Prompts in Seconds">
          <HowItWorks
            steps={[
              {
                n: '01',
                title: 'Paste Your Text',
                desc: 'Paste any long document, prompt, or codebase into the input area. The tool shows a live token count as you type.',
              },
              {
                n: '02',
                title: 'Set Chunk Size & Overlap',
                desc: 'Choose chunk size (words or characters) and overlap percentage (30-50% for narrative text, 10-20% for code blocks).',
              },
              {
                n: '03',
                title: 'See Chunks With Token Counts',
                desc: 'Instantly view each numbered chunk with its token count, so you know it fits your target model\'s context window.',
              },
              {
                n: '04',
                title: 'Copy Each Chunk',
                desc: 'Copy individual chunks or download all at once. Send them to the AI in order — consolidation instructions are added automatically.',
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="models" heading="Context Window Limits by Model">
          <SEOProse>
            Use this reference to choose the right chunk size for your target model. Always leave 20-30% headroom for
            system prompts, overlap, and the model&apos;s response.
          </SEOProse>
          <div className="mt-4 overflow-x-auto rounded-xl border border-zinc-200">
            <table className="w-full text-[13.5px]">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Model</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Context Window</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">≈ Words</th>
                  <th className="px-4 py-3 text-left font-semibold text-zinc-700">Safe Chunk Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-900">GPT-4o</td>
                  <td className="px-4 py-3 text-zinc-600">128k tokens</td>
                  <td className="px-4 py-3 text-zinc-600">~96,000 words</td>
                  <td className="px-4 py-3 text-zinc-600">80k tokens</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="px-4 py-3 font-medium text-zinc-900">GPT-4</td>
                  <td className="px-4 py-3 text-zinc-600">8k / 32k tokens</td>
                  <td className="px-4 py-3 text-zinc-600">~6,000 / ~24,000 words</td>
                  <td className="px-4 py-3 text-zinc-600">6k / 24k tokens</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-900">Claude 3.5 Sonnet</td>
                  <td className="px-4 py-3 text-zinc-600">200k tokens</td>
                  <td className="px-4 py-3 text-zinc-600">~150,000 words</td>
                  <td className="px-4 py-3 text-zinc-600">150k tokens</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="px-4 py-3 font-medium text-zinc-900">Claude 3 Opus</td>
                  <td className="px-4 py-3 text-zinc-600">200k tokens</td>
                  <td className="px-4 py-3 text-zinc-600">~150,000 words</td>
                  <td className="px-4 py-3 text-zinc-600">150k tokens</td>
                </tr>
                <tr className="bg-white">
                  <td className="px-4 py-3 font-medium text-zinc-900">Gemini 1.5 Pro</td>
                  <td className="px-4 py-3 text-zinc-600">1M tokens</td>
                  <td className="px-4 py-3 text-zinc-600">~750,000 words</td>
                  <td className="px-4 py-3 text-zinc-600">800k tokens</td>
                </tr>
                <tr className="bg-zinc-50">
                  <td className="px-4 py-3 font-medium text-zinc-900">Llama 3</td>
                  <td className="px-4 py-3 text-zinc-600">8k / 128k tokens</td>
                  <td className="px-4 py-3 text-zinc-600">~6,000 / ~96,000 words</td>
                  <td className="px-4 py-3 text-zinc-600">6k / 90k tokens</td>
                </tr>
              </tbody>
            </table>
          </div>
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Chunk Prompts">
          <UseCases
            cases={[
              {
                icon: '📄',
                title: 'Long Document Analysis',
                desc: 'Send entire PDFs, research papers, or legal documents to an LLM for summarization or Q&A without truncation.',
              },
              {
                icon: '💻',
                title: 'Codebase Summarization',
                desc: 'Chunk large source files or multi-file repos to ask an AI to explain architecture, find bugs, or write tests.',
              },
              {
                icon: '📚',
                title: 'Book & Article Processing',
                desc: 'Process full books or long-form articles for translation, rewriting, or extracting structured data.',
              },
              {
                icon: '⚙️',
                title: 'Batch API Calls',
                desc: 'Pre-split large inputs into model-safe chunks before sending to the OpenAI or Anthropic API to avoid 413 errors.',
              },
              {
                icon: '🔍',
                title: 'RAG Preparation',
                desc: 'Generate evenly-sized, overlapping chunks for embedding in vector databases as part of a RAG pipeline.',
              },
              {
                icon: '💬',
                title: 'Multi-Turn Conversations',
                desc: 'Compress long conversation histories into chunks and re-inject them as context when the window fills up.',
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ
            items={[
              {
                q: 'What is a token in AI models?',
                a: (
                  <>
                    A token is the smallest unit of text an LLM processes. Tokens are not the same as words — they are
                    sub-word pieces determined by the model&apos;s tokenizer. In English, 1 token ≈ 0.75 words on
                    average. Common words like &quot;the&quot; are one token; rare or long words may be split into 2–4
                    tokens. Punctuation and whitespace also consume tokens.
                  </>
                ),
              },
              {
                q: 'How many tokens are in a word?',
                a: 'On average, 1,000 tokens ≈ 750 words in English. So 1 word ≈ 1.33 tokens. This varies by language — non-Latin scripts like Chinese or Arabic are often less efficient and use more tokens per word. Use the live token counter in the tool to get an exact count for your specific text.',
              },
              {
                q: 'What is overlap and why does it help?',
                a: 'Overlap repeats a portion of the previous chunk at the start of the next chunk, preserving context at the boundary. Without overlap, the AI loses continuity between chunks — it might not know that a sentence interrupted at the end of chunk 2 continues in chunk 3. Use 30–50% overlap for narrative or research text, and 10–20% for self-contained sections like code blocks or lists.',
              },
              {
                q: 'What chunk size should I use?',
                a: 'As a rule, leave 20–30% of the context window for system prompts, overlap, and the model\'s response. For GPT-4 (8k), target chunks under 6,000 tokens. For GPT-4o (128k), 80,000 tokens is a safe ceiling. For Claude models (200k), chunks of 150,000 tokens work well. Always verify with the live token counter before sending.',
              },
              {
                q: 'What is the difference between tiktoken and cl100k_base?',
                a: (
                  <>
                    <strong>tiktoken</strong> is OpenAI&apos;s open-source tokenizer library. <C>cl100k_base</C> is the
                    specific encoding used by GPT-4, GPT-4o, and GPT-3.5-turbo. It defines exactly how text is split
                    into tokens. Claude and Gemini use different tokenizers, so the same text may have a slightly
                    different token count on each model. The tool provides an approximate count — always add headroom
                    when targeting a specific model.
                  </>
                ),
              },
            ]}
          />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools
            tools={[
              {
                href: '/code-prompt-shield',
                label: 'Code Prompt Shield',
                desc: 'Mask secrets and API keys before chunking sensitive code.',
                icon: '🛡️',
              },
              {
                href: '/base64-encoder',
                label: 'Base64 Encoder',
                desc: 'Encode or decode Base64 strings in your browser.',
                icon: '🔠',
              },
              {
                href: '/json-beautifier',
                label: 'JSON Beautifier',
                desc: 'Format and pretty-print JSON before feeding it to an LLM.',
                icon: '{}',
              },
              {
                href: '/hash-generator',
                label: 'Hash Generator',
                desc: 'Generate MD5, SHA-1, SHA-256 hashes for text or files.',
                icon: '#',
              },
            ]}
          />
        </SEOSection>
      </ToolSEOContent>
      <ToolPageFooterBand />
    </>
  );
}
