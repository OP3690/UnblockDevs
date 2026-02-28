import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'How to Mask JSON Payloads Before Sending Data to AI (Without Breaking Structure) | UnblockDevs',
  description:
    'Learn how to mask JSON before ChatGPT: anonymize API payloads, hide sensitive JSON data, secure API logs. Preserve structure, keep numbers, restore exactly. Step-by-step with examples.',
  keywords: [
    'mask JSON before ChatGPT',
    'anonymize API payload',
    'hide sensitive JSON data',
    'secure API logs before AI',
    'JSON masking for AI',
    'client-side JSON anonymize',
  ],
  openGraph: {
    title: 'How to Mask JSON Payloads Before Sending Data to AI (Without Breaking Structure)',
    description: 'Anonymize API payloads and JSON for AI. Preserve structure and numbers; restore exactly. Client-side only.',
    type: 'article',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-mask-json-payloads-before-sending-to-ai-without-breaking-structure',
  },
};

export default function MaskJsonPayloadsBlogPage() {
  return <BlogPostClient />;
}
