import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import JsonPromptShieldClient from './client';

const canonicalUrl = 'https://unblockdevs.com/json-prompt-shield';

export const metadata: Metadata = {
  title: 'JSON Prompt Shield — Mask JSON Keys & Values Before Sending to ChatGPT | UnblockDevs',
  description:
    'Mask JSON keys and string values before sending to ChatGPT or any AI. K_00001, S_00001 format — fully reversible. Free, 100% browser-based, no data leaves your device.',
  keywords: [
    'mask json before chatgpt',
    'hide json keys from ai',
    'json privacy chatgpt',
    'mask json payload for ai',
    'json field masking tool',
    'anonymize json for chatgpt',
    'hide json values from chatgpt',
    'json key masking online',
    'mask json fields before ai',
    'json data masking tool free',
    'json masking for ai prompts',
    'gdpr compliant json ai tool',
    'mask api response before chatgpt',
    'pii masking json tool',
    'json anonymizer for ai',
    'hipaa safe json ai tool',
    'sanitize json before sending to ai',
    'is it safe to paste json into chatgpt',
    'how to hide json keys before sending to chatgpt',
    'mask json field names for ai prompts',
    'json masking tool no server free',
    'reversible json masking for ai',
    'client side json masking browser',
    'JSON Prompt Shield',
    'mask JSON for AI',
    'hipaa compliant json masking',
    'mask patient data before ai',
    'hipaa chatgpt sql',
    'soc 2 data masking',
    'pci dss chatgpt policy',
    'ccpa data masking',
    'json privacy ai',
    'mask json chatgpt',
    'json anonymizer online',
    'protect json ai',
    'json key masker',
    'json value masker',
    'json redaction tool',
    'anonymize json fields',
    'json pii masker',
    'json sensitive data',
    'mask json api response',
    'json masker free',
    'json data privacy',
    'json compliance tool',
    'gdpr json masker',
    'hipaa json redaction',
    'mask json field names',
    'mask json string values',
    'mask json nested',
    'json privacy online',
    'json secret detector',
    'json key anonymizer',
    'json masker browser',
    'json data scrubber',
    'json sanitizer online',
    'mask json payload',
    'json payload privacy',
    'json schema privacy',
    'remove pii json',
    'json anonymization',
    'json de-identification',
    'mask json emails',
    'mask json phone numbers',
    'mask json credit card',
    'json masker no signup',
    'json redact tool free',
  ],
  openGraph: {
    title: 'JSON Prompt Shield — Mask JSON Keys & Values Before ChatGPT | UnblockDevs',
    description:
      'Mask JSON keys and string values before sending to ChatGPT. K_00001, S_00001 — fully reversible. Free, 100% browser-based. No data leaves your device.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON Prompt Shield — Mask JSON Before ChatGPT | UnblockDevs',
    description: 'Mask keys and string values before sending to AI. Fully reversible. 100% in your browser.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Prompt Shield — Mask JSON Keys & Values Before ChatGPT',
  description:
    'Mask JSON keys and string values before sending to AI. K_00001, S_00001 — fully reversible. Free, 100% browser-based. Nothing sent to servers.',
  url: canonicalUrl,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Mask JSON keys to K_00001, string values to S_00001',
    '100% client-side — no data sent to any server',
    'Fully reversible with mapping — restore AI output to real names',
    'Works with API responses, REST, GraphQL — any JSON',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '780',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'Is it safe to paste JSON into ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'When you paste JSON into ChatGPT, your real field names and string values are sent to OpenAI servers. Use JSON Prompt Shield to mask keys to K_00001 and values to S_00001 before sending — fully reversible after AI responds.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can ChatGPT see my JSON field names?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Any JSON pasted into ChatGPT exposes your real key names, string values, and payload structure to OpenAI servers.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I hide JSON keys from ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your JSON into JSON Prompt Shield at unblockdevs.com/json-prompt-shield. Keys become K_00001, strings become S_00001. Send masked version to AI, restore real names after with one click.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I mask JSON before sending to ChatGPT?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Paste your JSON into the JSON Prompt Shield, enable "Mask keys" and "Mask strings", then copy the masked output. Paste that into ChatGPT. Your real field names are replaced with placeholders like K_00001 and S_00001. Use the mapping file to restore AI responses to your original names.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is my data sent to your servers?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'No. All masking runs in your browser. Nothing is uploaded or stored. You can verify by using the tool offline or inspecting network requests.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I restore AI output to my real field names?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. The tool gives you a mapping file (or in-page restore). Paste the AI response and the mapping to get back your original keys and string values.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Does this work for API responses?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Paste any API response JSON — REST, GraphQL, webhooks. Mask the sensitive fields, get AI help with the structure, restore after.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is JSON Prompt Shield free?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Completely free, no signup, runs entirely in your browser. Nothing is sent to any server.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can it detect PII automatically?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'The tool masks all string values and keys by default, which inherently protects any PII in the JSON payload. For targeted PII detection (email addresses, phone numbers, credit card numbers in string values), enable the string masking option to replace all string values with S_00001 placeholders.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Does it work with deeply nested JSON?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. The masker recursively processes all levels of JSON nesting. Objects within arrays, arrays within objects, and multiple levels of nesting are all fully traversed. Every key and string value at any depth is masked with a consistent placeholder.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I mask only specific JSON fields?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'The current tool masks all keys or all string values depending on your toggle settings. For field-specific masking, you can manually edit the JSON to replace only the sensitive fields before pasting, or mask the full payload and use the mapping to selectively restore the fields that are not sensitive.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I use it for GDPR compliance?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'JSON Prompt Shield helps reduce GDPR risk by preventing personal data from being sent to AI providers. Masking JSON before pasting into ChatGPT means your personal data fields are represented as anonymous placeholders. Consult your Data Protection Officer for full compliance requirements.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between redaction and masking?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Redaction permanently removes or replaces data with a fixed marker like [REDACTED], with no way to recover the original. Masking (as used here) replaces data with a reversible placeholder using a mapping table, so the original can be restored. Use masking when you need to share JSON with AI and restore the response.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is the JSON sent to any server?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'No. All masking and restoring happens in your browser using JavaScript. Nothing is uploaded or sent to any external server. You can confirm this by disabling your internet connection before masking — the tool works completely offline.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can it mask email addresses in JSON?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Email addresses stored as string values in JSON are masked when you enable string value masking. The email becomes S_00001, S_00002 etc. in the masked output. The original email is stored in the mapping for later restoration after the AI responds.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is JSON de-identification?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'JSON de-identification is the process of removing or transforming information in a JSON document so it cannot be linked back to a specific individual. This is required under HIPAA for health data and GDPR for personal data. JSON Prompt Shield performs reversible de-identification by replacing values with anonymous placeholders.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Mask JSON Before Sending to ChatGPT',
  description: 'Step-by-step guide to masking JSON keys and values before pasting into AI assistants.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your JSON', text: 'Paste any JSON payload — API response, database record, configuration, or GraphQL result.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose what to mask', text: 'Toggle "Mask keys", "Mask string values", or both. Numbers, booleans, and null are preserved so the AI understands types.' },
    { '@type': 'HowToStep', position: 3, name: 'Copy masked JSON to AI', text: 'Copy the masked output and paste it into ChatGPT, Claude, or any AI. Your real field names are replaced with generic placeholders.' },
    { '@type': 'HowToStep', position: 4, name: 'Restore real names', text: 'Paste the AI response into the Restore tab along with your mapping. Real field names and string values are substituted back instantly.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'JSON Prompt Shield', item: canonicalUrl },
  ],
};

export default function JsonPromptShieldPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <JsonPromptShieldClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="Why Mask JSON Before Sending to AI?">
          <SEOProse>
            When you paste JSON into ChatGPT or any AI assistant, your real field names, string values, and data structure are sent to the AI provider&apos;s servers and may be retained under their data policies. For developers handling PII, healthcare records (HIPAA), financial data (PCI DSS), or enterprise schemas, this is a privacy and compliance risk. <strong>JSON Prompt Shield</strong> replaces every key with <C>K_00001</C> and every string value with <C>S_00001</C> before you paste — so the AI only sees a sanitized structure, never your real data.
          </SEOProse>
          <SEOProse>
            The masking is fully reversible. After the AI responds with advice about the structure, paste the response back alongside the mapping table and restore your original field names in one click.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Mask and Restore in 4 Steps">
          <HowItWorks steps={[
            { n: '01', title: 'Paste your JSON', desc: 'Paste any JSON payload — API response, database record, configuration, or GraphQL result.' },
            { n: '02', title: 'Choose what to mask', desc: 'Toggle "Mask keys", "Mask string values", or both. Numbers, booleans, and null are left as-is so the AI can reason about types.' },
            { n: '03', title: 'Copy masked JSON to AI', desc: 'Copy the masked output and paste it into ChatGPT, Claude, or any AI. Ask your question about the structure — the AI sees only generic placeholders.' },
            { n: '04', title: 'Restore real names', desc: 'Paste the AI response into the Restore tab along with your mapping. Real field names and string values are substituted back instantly.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="Who Uses JSON Prompt Shield?">
          <UseCases cases={[
            { icon: '🏥', title: 'Healthcare (HIPAA)', desc: 'Mask patient record fields before asking AI to help design transformations or queries without exposing PHI.' },
            { icon: '💳', title: 'Finance (PCI DSS)', desc: 'Sanitize payment API responses containing card or account data before using AI for schema analysis.' },
            { icon: '🏢', title: 'Enterprise APIs', desc: 'Protect internal field naming conventions and business logic from being sent to third-party AI services.' },
            { icon: '🛡️', title: 'GDPR Compliance', desc: 'Mask any field that could identify a natural person before processing with external AI tools.' },
            { icon: '👩‍💻', title: 'API Debugging', desc: 'Get AI help debugging a complex JSON structure without exposing real user data or tokens.' },
            { icon: '📋', title: 'Code Review AI Assistance', desc: 'Ask AI to review your API schema design while keeping actual field names and business logic private.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'Is it safe to paste JSON into ChatGPT?',
              a: 'When you paste JSON into ChatGPT, your real field names and string values are sent to OpenAI servers. Use JSON Prompt Shield to mask keys to K_00001 and values to S_00001 before sending — fully reversible after the AI responds.',
            },
            {
              q: 'Can ChatGPT see my JSON field names?',
              a: 'Yes. Any JSON pasted into ChatGPT exposes your real key names, string values, and payload structure to OpenAI servers. Use JSON Prompt Shield first so the AI only sees generic placeholders.',
            },
            {
              q: 'How do I hide sensitive JSON values from AI?',
              a: 'Paste your JSON, enable "Mask strings", and copy the masked output. String values are replaced with S_00001, S_00002, etc. Numbers, booleans, and null are preserved so the AI understands types.',
            },
            {
              q: 'How do I restore my original field names after?',
              a: 'Use the Restore tab. Paste the AI response and the mapping table. The tool substitutes every K_00001 and S_00001 placeholder back to the original name or value.',
            },
            {
              q: 'Is my data sent to your servers?',
              a: 'No. All masking and restoring runs in your browser. Nothing is uploaded or stored. You can verify by turning off your internet before masking.',
            },
            {
              q: 'Does this work for HIPAA or PCI DSS compliance?',
              a: 'JSON Prompt Shield is a practical tool for reducing risk, but not a certified HIPAA or PCI DSS compliance solution. Consult your compliance officer before using AI tools with regulated data.',
            },
            {
              q: 'Can it detect PII automatically?',
              a: 'The tool masks all string values by default, inherently protecting any PII. Enable string masking to replace all string values with S_00001 placeholders regardless of content type.',
            },
            {
              q: 'Does it work with deeply nested JSON?',
              a: 'Yes. The masker recursively processes all levels of JSON nesting. Objects within arrays, arrays within objects, and deep nesting are all fully traversed and masked.',
            },
            {
              q: 'How do I mask only specific JSON fields?',
              a: 'Mask the full payload and use the mapping to selectively restore the fields that are not sensitive, or manually edit the JSON before pasting to remove only the specific sensitive fields.',
            },
            {
              q: 'Can I use it for GDPR compliance?',
              a: 'JSON Prompt Shield helps reduce GDPR risk by masking personal data before sending to AI providers. Consult your Data Protection Officer for full compliance requirements.',
            },
            {
              q: 'What is the difference between redaction and masking?',
              a: 'Redaction permanently removes data with no recovery option (e.g. [REDACTED]). Masking replaces data with a reversible placeholder using a mapping table so the original can be restored after AI responds.',
            },
            {
              q: 'Is the JSON sent to any server?',
              a: 'No. All masking runs in your browser. Nothing is uploaded. You can confirm by disabling your internet before masking — the tool works completely offline.',
            },
            {
              q: 'Can it mask email addresses in JSON?',
              a: 'Yes. Email addresses stored as string values are masked with S_00001 placeholders when string masking is enabled. The original email is stored in the mapping for later restoration.',
            },
            {
              q: 'What is JSON de-identification?',
              a: 'JSON de-identification transforms data so it cannot be linked to a specific individual — required under HIPAA and GDPR. JSON Prompt Shield performs reversible de-identification with anonymous placeholders and a mapping for restoration.',
            },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/ai-schema-masker', label: 'AI Schema Masker', desc: 'Mask SQL table and column names before asking AI about database schema', icon: '🔒' },
            { href: '/code-prompt-shield', label: 'Code Prompt Shield', desc: 'Sanitize code files before pasting into AI — remove tokens, secrets, paths', icon: '🛡️' },
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and validate JSON before masking to ensure it is clean', icon: '{}' },
            { href: '/json-validator', label: 'JSON Validator', desc: 'Validate JSON syntax to catch errors before processing', icon: '✅' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'JSON Privacy for AI' },
            { href: '/blog/json-best-practices-production-guide', label: 'Masking JSON for LLMs' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Safe AI API Workflows' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'JSON Prompt Engineering' },
          ]} />
        </SEOSection>
      </ToolSEOContent>
      <ToolPageFooterBand toolName="json_prompt_shield" />
    </>
  );
}
