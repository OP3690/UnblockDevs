import type { Metadata } from 'next';
import HipaaCompliantAiClient from './client';

export const metadata: Metadata = {
  title: 'HIPAA-Compliant AI Development — Use ChatGPT Without Exposing Patient Data | UnblockDevs',
  description:
    'How healthcare developers can use ChatGPT and AI coding assistants without exposing PHI. Mask SQL, JSON, and code in your browser before sending. Client-side only, no server. HIPAA-safe workflow.',
  keywords: [
    'hipaa compliant developer tools',
    'hipaa safe api testing',
    'mask phi before chatgpt',
    'hipaa chatgpt sql',
    'hipaa compliant json masking',
    'mask patient data before ai',
    'phi masking tool developer',
    'hipaa safe coding assistant',
    'hipaa compliant ai coding',
    'chatgpt without exposing patient data',
    'healthcare developer ai tools',
    'hipaa ai coding policy',
  ],
  openGraph: {
    title: 'HIPAA-Compliant AI Development — How to Use ChatGPT Without Exposing Patient Data',
    description: 'Mask SQL, JSON, and code in your browser before sending to AI. No PHI leaves your device. HIPAA-safe workflow for healthcare developers.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/hipaa-compliant-ai-development',
    images: [{ url: 'https://unblockdevs.com/api/og?title=HIPAA-Compliant%20AI%20Development%20%E2%80%94%20How%20to%20Use%20ChatGPT%20Without%20Exposing%20Patient%20...&emoji=%F0%9F%A4%96&desc=Mask%20SQL%2C%20JSON%2C%20and%20code%20in%20your%20browser%20before%20sending%20to%20AI', width: 1200, height: 630, alt: 'HIPAA-Compliant AI Development — How to Use ChatGPT Without Exposing Patient ... — UnblockDevs Blog' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/hipaa-compliant-ai-development',
  },
};

export default function HipaaCompliantAiBlogPage() {
  return <HipaaCompliantAiClient />;
}
