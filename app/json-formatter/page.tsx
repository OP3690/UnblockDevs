import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import JsonFormatterClient from './client';

export const metadata: Metadata = {
  title: 'Free JSON Formatter & Validator – No Login Required | UnblockDevs',
  description: 'Format and validate JSON instantly. Free formatter, custom indentation. No signup, 100% in-browser.',
  keywords: [
    'json formatter',
    'json formatter online',
    'json formatter online free',
    'json formatter free',
    'format json online',
    'beautify json',
    'prettify json',
    'json beautifier',
    'format json tool',
  ],
  openGraph: {
    title: 'Free JSON Formatter & Validator | UnblockDevs',
    description: 'Format and validate JSON instantly. Free formatter, custom indentation. No signup, 100% in-browser.',
    type: 'website',
    url: 'https://unblockdevs.com/json-formatter',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free JSON Formatter & Validator | UnblockDevs',
    description: 'Format and validate JSON instantly. Free formatter, custom indentation. No signup, 100% in-browser.',
  },
  alternates: { canonical: 'https://unblockdevs.com/json-formatter' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'JSON Formatter',
  url: 'https://unblockdevs.com/json-formatter',
  description: 'Format and validate JSON instantly. Free formatter, custom indentation. No signup, 100% in-browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Format JSON with 2-space, 4-space, or tab indentation',
    'Validate JSON syntax with error highlighting',
    'Copy to clipboard or download as .json file',
    '100% client-side — no data sent to servers',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '2200',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is a JSON formatter?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A JSON formatter (or beautifier) takes minified or messy JSON and adds indentation, line breaks, and spacing so it is readable. It does not change the data—only the formatting. Use it to inspect API responses, config files, or any JSON string.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Is this JSON formatter free and safe to use?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. The formatter at unblockdevs.com/json-formatter is free with no signup. All processing runs in your browser—your JSON is never sent to any server, so it is safe for sensitive or private data.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What is the difference between JSON formatter and JSON validator?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'A JSON formatter makes valid JSON readable by adding indentation and line breaks. A JSON validator checks whether a string is valid JSON and reports syntax errors. Often you validate first, then format. This formatter also helps spot errors by making structure visible.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I format JSON with custom indentation?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. Use the formatter options to choose 2, 4, or a custom number of spaces for indentation. You can also switch to tabs if preferred. The tool preserves your data and only changes whitespace.',
      },
    },
  ],
};

export default function JsonFormatter() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <JsonFormatterClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="JSON Formatter — Format and Validate JSON Instantly">
          <SEOProse>
            A <strong>JSON formatter</strong> adds indentation, line breaks, and consistent spacing to minified or messy JSON, making it instantly readable. Paste any JSON — a compressed API response, a log entry, or a config file — and get back properly structured output with 2-space, 4-space, or tab indentation. The formatter also validates JSON syntax, making it easy to spot the exact location of an error.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Format JSON in One Step">
          <HowItWorks steps={[
            { n: '01', title: 'Paste JSON', desc: 'Drop in any JSON string — minified, partially formatted, or pasted from a browser console or API response.' },
            { n: '02', title: 'Choose indent', desc: 'Select 2 spaces, 4 spaces, or tabs. The formatter applies consistent indentation throughout.' },
            { n: '03', title: 'Validate & format', desc: 'Syntax errors are flagged with the exact line and position. Valid JSON is formatted instantly.' },
            { n: '04', title: 'Copy or download', desc: 'Copy the formatted output to clipboard or download it as a .json file.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Format JSON">
          <UseCases cases={[
            { icon: '🐛', title: 'Debug API Responses', desc: 'Expand a compressed API response to read its structure and find missing or unexpected fields.' },
            { icon: '📝', title: 'Config File Editing', desc: 'Format appsettings.json, package.json, or any config file before editing to avoid structural mistakes.' },
            { icon: '🔍', title: 'Log Inspection', desc: 'Parse JSON-formatted log entries to read them without writing a script.' },
            { icon: '📋', title: 'Code Reviews', desc: 'Format JSON fixtures or test data before committing to make PR diffs readable.' },
            { icon: '📐', title: 'Generate TypeScript', desc: 'Use the advanced workbench to generate TypeScript interfaces from formatted JSON objects.' },
            { icon: '✅', title: 'Validate Syntax', desc: 'Catch JSON syntax errors before passing data to an API or storing in a database.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is a JSON formatter?',
              a: 'A JSON formatter adds indentation and line breaks to minified or messy JSON to make it human-readable. It does not change the data — only the whitespace and layout.',
            },
            {
              q: 'What is the difference between JSON formatter and JSON validator?',
              a: 'A formatter makes valid JSON readable. A validator checks whether a string is valid JSON and reports errors. This tool does both: it formats valid JSON and highlights syntax errors in invalid JSON.',
            },
            {
              q: 'Is my JSON data safe?',
              a: 'Yes. All formatting runs in your browser. Your JSON is never uploaded or sent to any server, making it safe for API responses, config files, and sensitive payloads.',
            },
            {
              q: 'Can I format JSON with custom indentation?',
              a: 'Yes. Choose 2 spaces, 4 spaces, or tabs. The formatter applies your chosen indent consistently throughout the output.',
            },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Workbench', desc: 'Advanced formatter with tree view, JSONPath, TypeScript & SQL generator', icon: '{}' },
            { href: '/json-validator', label: 'JSON Validator', desc: 'Validate JSON syntax with inline error highlighting', icon: '✅' },
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Semantic diff two JSON objects side by side', icon: '🔀' },
            { href: '/json-fixer-online', label: 'JSON Fixer', desc: 'Auto-fix trailing commas, single quotes, and other common JSON errors', icon: '🔧' },
          ]} />
        </SEOSection>
      </ToolSEOContent>
      <ToolPageFooterBand toolName="json_formatter" />
    </>
  );
}
