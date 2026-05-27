import type { Metadata } from 'next';
import DomainSpecificLanguageModelsClient from './client';

export const metadata: Metadata = {
  title: 'Domain-Specific Language Models: Complete Guide 2026 | UnblockDevs',
  description: 'Domain-specific LLMs: what they are, when to use, fine-tuning, domain adaptation. Industry AI.',
  keywords: [
    'domain-specific language models',
    'domain-specific llm',
    'specialized language models',
    'domain-specific ai models',
    'fine-tuned language models',
    'domain adaptation',
    'specialized llm',
    'industry-specific ai',
    'domain-specific nlp',
    'custom language models',
    'domain-specific models',
    'specialized ai models',
    'domain fine-tuning',
    'domain-specific training',
    'custom llm',
    'domain-specific ml',
    'specialized nlp models',
    'domain-specific ai',
    'industry ai models',
    'domain-specific model training'
  ],
  openGraph: {
    title: 'Domain-Specific Language Models: Complete Guide 2026',
    description: 'Domain-specific LLMs: what they are, when to use, fine-tuning, domain adaptation',
    type: 'article',
    url: 'https://unblockdevs.com/blog/domain-specific-language-models-complete-guide',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Domain-Specific%20Language%20Models%3A%20Complete%20Guide%202026&emoji=%F0%9F%A4%96&desc=Domain-specific%20LLMs%3A%20what%20they%20are%2C%20when%20to%20use%2C%20fine-tuning%2C%20domain%20adaptation', width: 1200, height: 630, alt: 'Domain-Specific Language Models: Complete Guide 2026 — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Domain-Specific Language Models: Complete Guide 2026',
    description: 'Domain-specific LLMs: what they are, when to use, fine-tuning, domain adaptation',
    images: ['https://unblockdevs.com/api/og?title=Domain-Specific%20Language%20Models%3A%20Complete%20Guide%202026&emoji=%F0%9F%A4%96&desc=Domain-specific%20LLMs%3A%20what%20they%20are%2C%20when%20to%20use%2C%20fine-tuning%2C%20domain%20adaptation'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/domain-specific-language-models-complete-guide' },
  robots: { index: false, follow: false },
};

export default function DomainSpecificLanguageModels() {
  return <DomainSpecificLanguageModelsClient />;
}

