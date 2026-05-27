import type { Metadata } from 'next';
import BlogPostClient from './client';

export const metadata: Metadata = {
  title: 'Mask JSON Payloads Before Sending to AI | UnblockDevs',
  description:
    'Learn how to mask JSON before ChatGPT: anonymize API payloads, hide sensitive JSON data, secure API logs. Preserve structure, keep numbers, restore exactly. Step-by-step with examples.',
  keywords: [
    'mask json before sending to ai',
    'sanitize data before chatgpt',
    'json masking tool online',
    'sql schema masking ai',
    'hide sensitive data before chatgpt',
    'mask api response before ai',
    'safe json for chatgpt',
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
    url: 'https://unblockdevs.com/blog/how-to-mask-json-payloads-before-sending-to-ai-without-breaking-structure',
    images: [{ url: 'https://unblockdevs.com/api/og?title=How%20to%20Mask%20JSON%20Payloads%20Before%20Sending%20Data%20to%20AI%20%28Without%20Breaking%20Structure%29&emoji=%7B%7D&desc=Anonymize%20API%20payloads%20and%20JSON%20for%20AI', width: 1200, height: 630, alt: 'How to Mask JSON Payloads Before Sending Data to AI (Without Breaking Structure) — UnblockDevs Blog' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/how-to-mask-json-payloads-before-sending-to-ai-without-breaking-structure',
  },
};

export default function MaskJsonPayloadsBlogPage() {
  return <BlogPostClient />;
}
