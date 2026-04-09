import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import ConfigComparatorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/config-comparator';

export const metadata: Metadata = {
  title: 'Config File Comparator — Diff JSON, YAML, ENV, TOML & Config Files Online Free | UnblockDevs',
  description:
    'Compare any two configuration files side by side. Supports JSON, YAML, .env, TOML, INI formats. Detect added, removed, and changed settings. Free, 100% browser-based, no data sent to servers.',
  keywords: [
    'config comparator',
    'compare config files',
    'configuration comparator',
    'config diff tool',
    'compare environment variables',
    'config file comparison',
    'settings comparator',
    'config diff',
    'compare json yaml',
    'env diff tool',
    'toml comparator',
    'diff config files online',
  ],
  openGraph: {
    title: 'Config File Comparator — Diff JSON, YAML, ENV, TOML & Config Files | UnblockDevs',
    description: 'Compare any two configuration files side by side. Detect added, removed, and changed settings. Free, 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs Config File Comparator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Config File Comparator — Diff JSON, YAML, ENV, TOML | UnblockDevs',
    description: 'Compare config files side by side. JSON, YAML, .env, TOML, INI support. 100% browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Config File Comparator',
  url: canonicalUrl,
  description: 'Compare any two configuration files side by side. Supports JSON, YAML, .env, TOML, INI formats. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Side-by-side config file diff',
    'JSON, YAML, .env, TOML, INI format support',
    'Detect added, removed, and changed keys',
    'Semantic diff — not line-based',
    '100% client-side — no data sent to servers',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '620',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I compare two JSON config files?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste the first JSON config into the left panel and the second into the right panel. The comparator performs a semantic diff — it compares key-value pairs rather than raw lines — so reordered keys are not flagged as differences unless the values actually changed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I spot a missing environment variable between staging and production?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your staging .env file in the left panel and your production .env in the right panel. The tool highlights keys that exist in one file but are absent in the other, making it easy to catch missing variables before a deployment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to paste my config files into this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All comparison logic runs entirely in your browser using JavaScript. Your config data — including secrets, API keys, and environment variables — is never sent to any server.',
      },
    },
  ],
};

export default function ConfigComparatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ConfigComparatorClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="What Is a Config File Comparator?">
          <SEOProse>
            A <strong>config file comparator</strong> lets you diff two configuration files side by side and
            instantly see what changed — added keys, removed keys, and modified values. Whether you are tracking
            down a broken deployment or reviewing a teammate's environment setup, a visual diff is far faster than
            reading both files line by line.
          </SEOProse>
          <SEOProse>
            Config drift is one of the most common sources of hard-to-debug production issues. A staging
            environment that works perfectly can fail in production because a single environment variable is
            missing or has a different value. Comparing your <C>.env</C>, <C>config.yaml</C>, or{' '}
            <C>appsettings.json</C> files before each deployment takes seconds and can save hours of incident
            investigation.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Diff Config Files in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste Config A', desc: 'Drop your baseline config — staging, last known good, or the original — into the left panel.' },
            { n: '02', title: 'Paste Config B', desc: 'Drop the config you want to compare — production, current, or the updated version — into the right panel.' },
            { n: '03', title: 'Review the diff', desc: 'Added keys are highlighted in green, removed keys in red, and changed values are shown inline for easy scanning.' },
            { n: '04', title: 'Copy or export changes', desc: 'Export only the changed keys or copy the full diff result to share with your team or paste into a ticket.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Compare Config Files">
          <UseCases cases={[
            { icon: '⚖️', title: 'Environment Parity', desc: 'Verify that staging and production configs are in sync before a release to avoid "works on my machine" failures.' },
            { icon: '🐛', title: 'Deployment Debugging', desc: 'Compare configs from before and after a failed deployment to immediately pinpoint which setting caused the regression.' },
            { icon: '🔑', title: '.env Differences', desc: 'Spot missing or mismatched environment variables across local, staging, and production .env files.' },
            { icon: '☸️', title: 'Kubernetes YAML Configs', desc: 'Diff Kubernetes ConfigMap or Helm values files to understand exactly what changed between chart versions.' },
            { icon: '👥', title: 'Team Config Reviews', desc: 'Review a teammate\'s config changes in a PR the same way you review code — with a clear diff instead of a wall of YAML.' },
            { icon: '🔍', title: 'Incident Investigation', desc: 'During an incident, quickly compare the current config against the last known good snapshot to find what changed.' },
          ]} />
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I compare two JSON config files?',
              a: 'Paste the first JSON config into the left panel and the second into the right. The comparator performs a semantic diff — comparing key-value pairs, not raw lines — so reordered keys are not flagged as differences unless the values actually changed.',
            },
            {
              q: 'How do I spot a missing environment variable?',
              a: 'Paste your staging .env on the left and production .env on the right. The tool highlights keys present in one file but absent in the other, making it easy to catch missing variables before a deployment.',
            },
            {
              q: 'Is it safe to paste my config files and secrets here?',
              a: 'Yes — all comparison logic runs entirely in your browser. Your config data, including API keys and environment variables, is never sent to any server.',
            },
            {
              q: 'What config formats are supported?',
              a: 'The comparator supports JSON, YAML, .env (KEY=VALUE), TOML, and INI files. Paste any of these formats and the tool automatically parses them before diffing.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-comparator', label: 'JSON Comparator', desc: 'Semantic diff for two JSON payloads side by side', icon: '🔀' },
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format and pretty-print JSON before comparing', icon: '{}' },
            { href: '/ai-schema-masker', label: 'AI Schema Masker', desc: 'Redact sensitive fields from JSON before sharing', icon: '🛡️' },
            { href: '/token-comparator', label: 'Token Comparator', desc: 'Decode and compare JWT tokens side by side', icon: '🔐' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="config_comparator" />
    </>
  );
}
