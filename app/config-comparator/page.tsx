import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
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
    'config comparator online',
    'configuration diff tool',
    'yaml diff online',
    'json config diff',
    'toml diff',
    'env file comparison',
    'compare .env files',
    'compare yaml files',
    'compare json configs',
    'compare ini files',
    'compare xml configs',
    'compare dotenv',
    'config change detection',
    'configuration audit',
    'config version diff',
    'compare dev prod config',
    'compare staging production config',
    'environment config diff',
    'config migration diff',
    'breaking config change',
    'compare kubernetes configs',
    'compare docker compose',
    'compare nginx configs',
    'compare terraform configs',
    'compare ansible configs',
    'compare helm values',
    'compare gitlab ci',
    'compare github actions',
    'compare package json',
    'compare tsconfig json',
    'compare eslint config',
    'compare webpack config',
    'compare vite config',
    'config file audit',
    'config drift detection',
    'config review tool',
    'compare feature flags',
    'config comparison tool free',
    'yaml comparison tool',
    'configuration diff free',
    'env file diff tool',
    'config diff online free',
    'compare config files online',
    'json config diff tool',
    'yaml diff online',
    'env diff tool',
    'toml diff online',
    'config file comparison online',
    'configuration comparison tool',
    'config file diff browser',
    'compare appsettings json',
    'compare environment config',
    'diff dotenv files',
    'config drift detection online',
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
    {
      '@type': 'Question',
      name: 'What is a configuration comparator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A configuration comparator diffs two config files (JSON, YAML, .env, TOML) and highlights exactly what changed — added keys, removed keys, and modified values. It helps developers catch configuration drift between environments before deploying to production.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compare YAML config files?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your first YAML file in the left panel and the second YAML file in the right panel. Select YAML as the format if not auto-detected. The comparator parses both files and performs a semantic diff on the key-value structure, flagging changed values, added keys, and removed keys.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I detect configuration drift?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Configuration drift happens when environments gradually diverge — a key added to staging but not production, or a value changed for debugging but never reverted. Compare your staging and production configs regularly to detect drift before it causes production incidents.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compare Kubernetes YAML?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste two Kubernetes manifest files (ConfigMap, Deployment, Service) or Helm values files. The comparator shows which labels, annotations, resource limits, or environment variables changed between versions — useful during chart upgrades or namespace migrations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compare package.json files?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste two package.json files into the comparator. The semantic diff shows which dependencies were added, removed, or version-bumped in dependencies and devDependencies — faster than reading git diff output for large package files.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is configuration drift?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Configuration drift is the gradual divergence of configuration settings across environments over time — when staging, QA, and production configs start to differ without a deliberate reason. Drift often causes "works in staging but fails in production" bugs that are hard to diagnose.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compare Docker Compose files?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste two docker-compose.yml or docker-compose.override.yml files. The YAML comparator shows which services were added or removed, which environment variables changed, which ports or volumes were modified, and which image tags differ.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to paste config files with secrets?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All comparison runs entirely in your browser using JavaScript. Your config data — including API keys, database passwords, and environment variables — is never sent to any server. You can verify by checking the DevTools Network tab while comparing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compare configuration files between staging and production environments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Export your config from both environments (e.g., copy appsettings.json, download .env, or export kubectl configmap). Paste one into the left panel and the other into the right panel. The comparator highlights keys that are missing, added, or have different values between the two environments — making it easy to spot configuration drift before a deployment.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare Two Config Files',
  description: 'Use the Config Comparator to diff JSON, YAML, .env, TOML, and INI configuration files side by side and detect added, removed, and changed keys.',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your config files', text: 'Paste two configuration files (JSON, YAML, TOML, or env) into the left and right panels.' },
    { '@type': 'HowToStep', position: 2, name: 'Select format', text: 'Choose the file format if not auto-detected: JSON, YAML, .env, TOML, or INI.' },
    { '@type': 'HowToStep', position: 3, name: 'Click Compare', text: 'The tool compares the two configs and highlights added, removed, and changed keys side by side.' },
    { '@type': 'HowToStep', position: 4, name: 'Export the diff', text: 'Copy the diff or export it for your deployment runbook or PR description.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Config File Comparator', item: canonicalUrl },
  ],
};

export default function ConfigComparatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
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
            {
              q: 'What is a configuration comparator?',
              a: 'A configuration comparator diffs two config files and highlights added keys, removed keys, and modified values. It helps catch configuration drift between environments before deploying to production.',
            },
            {
              q: 'How do I compare YAML config files?',
              a: 'Paste your first YAML file in the left panel and the second in the right. The comparator parses both files and performs a semantic diff, flagging changed values, added keys, and removed keys.',
            },
            {
              q: 'How do I detect configuration drift?',
              a: 'Configuration drift happens when environments gradually diverge. Compare staging and production configs regularly to detect drift before it causes production incidents.',
            },
            {
              q: 'How do I compare Kubernetes YAML?',
              a: 'Paste two Kubernetes manifests or Helm values files. The comparator shows which labels, resource limits, or environment variables changed — useful during chart upgrades or namespace migrations.',
            },
            {
              q: 'How do I compare package.json files?',
              a: 'Paste two package.json files. The semantic diff shows which dependencies were added, removed, or version-bumped in dependencies and devDependencies.',
            },
            {
              q: 'What is configuration drift?',
              a: 'Configuration drift is the gradual divergence of settings across environments over time. It causes "works in staging but fails in production" bugs that are hard to diagnose.',
            },
            {
              q: 'How do I compare Docker Compose files?',
              a: 'Paste two docker-compose.yml files. The YAML comparator shows which services were added or removed, which environment variables changed, and which image tags differ.',
            },
            {
              q: 'Is it safe to paste config files with secrets?',
              a: 'Yes. All comparison runs entirely in your browser. Your API keys, database passwords, and environment variables are never sent to any server.',
            },
            {
              q: 'How do I compare configuration between staging and production?',
              a: 'Export your config from both environments (e.g., copy appsettings.json or .env). Paste one into the left panel and the other into the right panel. The comparator highlights missing, added, and changed keys — making it easy to spot configuration drift before a deployment.',
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

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Config File Best Practices' },
            { href: '/blog/json-best-practices-production-guide', label: 'Managing JSON Configs' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Config Drift in Production' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Debugging Config Errors' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="config_comparator" />
    </>
  );
}
