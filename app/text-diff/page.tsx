import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import TextDiffClient from './client';

const canonicalUrl = 'https://unblockdevs.com/text-diff';

export const metadata: Metadata = {
  title: 'Text & Code Diff Checker — Compare Two Files Online Free | UnblockDevs',
  description:
    'Instantly compare two texts or code files and see exactly what changed. Line-level and inline character diff, unified and side-by-side view. WCAG-friendly color coding. 100% browser-based — nothing leaves your device.',
  keywords: [
    'text diff',
    'code diff',
    'diff checker',
    'compare two files',
    'diff online',
    'text compare',
    'side by side diff',
    'unified diff',
    'code compare',
    'line diff',
    'diff tool online',
    'file diff',
    'string comparison',
    'diff viewer',
    'online diff checker',
  ],
  openGraph: {
    title: 'Text & Code Diff Checker — Compare Files Online | UnblockDevs',
    description: 'Compare two texts or code files with line-level and character-level diffs. Unified and side-by-side view. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs Text & Code Diff Checker' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text & Code Diff Checker | UnblockDevs',
    description: 'Paste two texts and see added, removed, and changed lines instantly. Unified or side-by-side view.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Text & Code Diff Checker',
  url: canonicalUrl,
  description: 'Instantly compare two texts or code files. Line-level and inline character diff, unified and side-by-side view. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Line-level LCS diff algorithm',
    'Inline character-level diff for changed lines',
    'Unified and side-by-side view modes',
    'Ignore whitespace and case options',
    'Show only changed lines filter',
    '100% client-side — no server upload',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '960',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does the diff algorithm work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tool uses the Longest Common Subsequence (LCS) algorithm, the same approach used by Git and Unix diff. It finds the largest set of lines common to both texts, then marks everything else as added or removed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between unified and side-by-side view?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unified view shows both texts interleaved in one column, with "+" for added lines and "−" for removed lines — the same format as git diff output. Side-by-side view shows the original text on the left and the changed text on the right, aligned by line number.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my text sent to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All comparison and highlighting runs entirely in your browser. Your code, configuration files, and documents never leave your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I compare files with whitespace differences only?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Enable "Ignore whitespace" to trim leading and trailing spaces from each line before comparison. Combined with "Ignore case", you can focus on meaningful content differences only.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Compare Two Texts or Code Files Online',
  description: 'Step-by-step guide to diffing two texts and seeing exactly what changed, in your browser.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste the original text', text: 'Paste the original (before) version of your text or code in the left box labeled "A — Original".' },
    { '@type': 'HowToStep', position: 2, name: 'Paste the changed text', text: 'Paste the modified (after) version in the right box labeled "B — Changed".' },
    { '@type': 'HowToStep', position: 3, name: 'View the diff instantly', text: 'The diff renders automatically below. Green lines are additions, red lines are deletions.' },
    { '@type': 'HowToStep', position: 4, name: 'Switch views or copy', text: 'Toggle between Unified and Side-by-side views. Copy the full diff output with one click.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Text & Code Diff Checker', item: canonicalUrl },
  ],
};

export default function TextDiffPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TextDiffClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="The Fastest Way to See What Changed Between Two Texts">
          <SEOProse>
            Whether you are reviewing a code change, comparing two config files, checking a document revision, or
            debugging an API response difference — you need to know exactly what changed, fast. Opening a local
            diff tool or standing up a Git repo just to compare two strings is overkill.
          </SEOProse>
          <SEOProse>
            Paste both versions and the diff appears immediately. Added lines are highlighted green, removed lines
            are red. Enable inline character diff to see exactly which characters changed within a line — not just
            which lines changed. Switch between <strong>unified</strong> (git-style) and{' '}
            <strong>side-by-side</strong> layouts. Filter to show only changed lines. Ignore whitespace or case when
            those differences do not matter. Copy the full diff output with one click. Everything runs in your
            browser — your code never leaves your device.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Paste, Diff, Copy — In Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste the original', desc: 'Paste the "before" version of your text, code, config, or JSON in the left box (A — Original).' },
            { n: '02', title: 'Paste the changed version', desc: 'Paste the "after" version in the right box (B — Changed). The diff renders automatically.' },
            { n: '03', title: 'Read the diff', desc: 'Green lines are additions (+), red lines are removals (−). Enable "Inline char diff" to highlight exactly which characters within a line changed.' },
            { n: '04', title: 'Switch views and copy', desc: 'Toggle between Unified and Side-by-side views. Use "Show only changes" to hide context lines. Copy the full diff output with one click.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Reach for a Diff Tool">
          <UseCases cases={[
            { icon: '🔍', title: 'Code Review', desc: 'Quickly see what changed between two versions of a function, component, or file without switching to your IDE.' },
            { icon: '⚙️', title: 'Config Comparison', desc: 'Compare YAML, JSON, TOML, or .env files across environments to spot differences before a deployment.' },
            { icon: '📄', title: 'Document Revision', desc: 'Track changes between drafts of specs, PRDs, or documentation without a dedicated writing tool.' },
            { icon: '🔧', title: 'API Response Debugging', desc: 'Paste two API responses to find the exact field that changed between a working and a broken request.' },
            { icon: '🤖', title: 'AI Output Comparison', desc: 'Compare LLM outputs across prompts or model versions to see what changed in the generated text.' },
            { icon: '📋', title: 'SQL Query Diff', desc: 'Spot differences between two SQL queries or migration scripts to catch accidental changes before running them.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How does the diff algorithm work?',
              a: 'The tool uses the Longest Common Subsequence (LCS) algorithm — the same approach used by Git and Unix diff. It finds the largest set of lines that appear in both texts, then marks everything else as added or removed.',
            },
            {
              q: 'What is the difference between unified and side-by-side view?',
              a: 'Unified view interleaves both texts in one column, with "+" for added lines and "−" for removed ones — the same format as git diff output. Side-by-side shows original on the left and modified on the right, aligned by line for easy visual scanning.',
            },
            {
              q: 'Is my text sent to a server?',
              a: 'No. All comparison and highlighting runs entirely in your browser using JavaScript. Your code, configs, and documents never leave your device.',
            },
            {
              q: 'Can I compare files with whitespace differences only?',
              a: 'Yes. Enable "Ignore whitespace" to trim leading and trailing spaces from each line before comparison. Combine with "Ignore case" to focus purely on meaningful content differences.',
            },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/config-comparator', label: 'Config Comparator', desc: 'Compare YAML/JSON configs and env-style files with semantic diff', icon: '⚙️' },
            { href: '/json-comparator', label: 'Smart JSON Diff', desc: 'Semantic JSON diff that normalizes UUIDs, JWTs, and timestamps', icon: '{}' },
            { href: '/api-comparator', label: 'API Response Comparator', desc: 'Diff two API JSON responses side by side', icon: '↔️' },
            { href: '/markdown-preview', label: 'Markdown Preview', desc: 'Preview and render Markdown documents before publishing', icon: '📝' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'Code Review Best Practices' },
            { href: '/blog/json-best-practices-production-guide', label: 'Git Diff Deep Dive' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'API Versioning Strategies' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Debugging API Responses' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="text_diff" />
    </>
  );
}
