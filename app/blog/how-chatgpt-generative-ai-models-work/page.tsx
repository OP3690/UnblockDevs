import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: "How ChatGPT & Generative AI Work | UnblockDevs",
  description: "How ChatGPT and generative AI work: LLMs, training data, tokens. Why AI sometimes makes mistakes.",
  keywords: [
    "how ChatGPT works",
    "how generative AI works",
    "what is large language model",
    "LLM explained",
    "ChatGPT behind the scenes",
    "how AI generates text",
    "tokens AI",
    "why AI makes mistakes",
    "AI hallucination",
    "generative AI explained",
    "language model training",
    "GPT how it works",
  ],
  openGraph: {
    title: "How ChatGPT and Generative AI Models Work (Behind the Scenes)",
    description: "What is an LLM, training data, tokens and probability prediction, and why AI sometimes makes mistakes.",
    type: "article",    url: 'https://unblockdevs.com/blog/how-chatgpt-generative-ai-models-work',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  alternates: {
    canonical: "https://unblockdevs.com/blog/how-chatgpt-generative-ai-models-work",
  },
};

export default function HowChatGPTWorksBlog() {
  return <BlogPostClient />;
}
