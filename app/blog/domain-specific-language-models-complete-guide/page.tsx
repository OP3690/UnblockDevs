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
  alternates: { canonical: 'https://unblockdevs.com/blog/domain-specific-language-models-complete-guide' },

};

export default function DomainSpecificLanguageModels() {
  return <DomainSpecificLanguageModelsClient />;
}

