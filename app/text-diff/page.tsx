import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import TextDiffClient from './client';

const canonicalUrl = 'https://unblockdevs.com/text-diff';

export const metadata: Metadata = {
  title: 'Free Text Diff Tool — Compare Text Side by Side | UnblockDevs',
  description:
    'Compare two texts or code files and see exactly what changed. Line-level and character diff, unified or side-by-side view. Free diff checker — nothing uploaded.',
  keywords: [
    'text diff tool online',
    'diff checker online',
    'compare two files online',
    'code diff online',
    'text compare online',
    'side by side diff',
    'unified diff viewer',
    'find differences in text',
    'how to compare two texts online',
    'diff tool free',
    'character diff online',
    'online diff checker',
  ],
  openGraph: {
    title: 'Free Text & Code Diff Checker — Compare Files Side by Side | UnblockDevs',
    description: 'Compare two texts or code files with line-level and character-level diffs. Unified and side-by-side views, ignore whitespace, show only changes. 100% browser-based, nothing uploaded.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: 'https://unblockdevs.com/api/og?title=Text%20%26%20Code%20Diff%20Checker%20%E2%80%94%20Compare%20Files%20Online&emoji=%F0%9F%93%9D&desc=Compare%20two%20texts%20or%20code%20files%20with%20line-level%20and%20character-level%20diffs', width: 1200, height: 630, alt: 'Text & Code Diff Checker — Compare Files Online — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Text & Code Diff Checker — Compare Files Online',
    description: 'Paste two texts and see added, removed, and changed lines instantly. Line-level and character diff, unified or side-by-side view.',
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
  dateModified: '2026-05-27',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Line-level LCS diff algorithm',
    'Inline character-level diff for changed lines',
    'Unified and side-by-side view modes',
    'Ignore whitespace and case options',
    'Show only changed lines filter',
    '100% client-side — no server upload',
  ],};

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
    {
      '@type': 'Question',
      name: 'How do I diff two HTML files to find what changed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Format both HTML files first to normalise indentation and whitespace — otherwise minified or inconsistently indented HTML will show the entire file as one changed line. Paste both formatted versions into the two inputs and the diff highlights exactly which tags, attributes, or text changed. Enable "Ignore whitespace" to skip formatting-only differences.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does a diff algorithm work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The most common diff algorithm is the Myers algorithm, which finds the shortest edit script to transform one text into another. It is based on the Longest Common Subsequence (LCS) problem. Git uses a variation of this algorithm for git diff output.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my diff show the entire file as changed when only one line changed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'This usually means line endings differ between the two versions — Windows uses CRLF (\\r\\n) and Unix/Mac uses LF (\\n). When one file uses CRLF and the other uses LF, every line appears different. Enable "Ignore whitespace" to strip trailing carriage returns and normalise line endings. Another cause is inconsistent indentation (tabs vs spaces) — "Ignore whitespace" handles this too.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I ignore whitespace in a diff?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enable the "Ignore whitespace" option to strip leading and trailing spaces from each line before comparison. This is useful when comparing code reformatted by a linter or indented differently, where only the logical content has changed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compare JSON with a diff tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste both JSON objects — one in each input. For semantic JSON comparison that normalizes key order, use the JSON Comparator tool. For a raw text comparison of two JSON strings, this diff tool shows exactly which characters and lines changed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the unified diff format?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The unified diff format is the standard output of the Unix diff -u command and git diff. It shows context lines, then additions prefixed with + and removals prefixed with -. Patch files in this format can be applied with the patch command to reproduce the changes.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compare code changes without Git?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste the original code in the left input and the modified code in the right input. The diff tool shows additions and removals with color highlighting — no Git repository or command-line tools required. Copy the diff output with one click.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is character-level vs word-level diff?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Line-level diff marks entire lines as added or removed. Character-level diff (also called inline diff) shows exactly which characters within a changed line were added or removed, highlighted inline. Enable "Inline char diff" to see character-level highlighting within changed lines.',
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
            {
              q: 'How do I diff two HTML files to find what changed?',
              a: 'Format both HTML files first to normalise indentation and whitespace — otherwise minified HTML will show the entire file as one changed line. Paste both formatted versions into the two inputs and the diff highlights exactly which tags, attributes, or text changed. Enable "Ignore whitespace" to skip formatting-only differences.',
            },
            {
              q: 'How does a diff algorithm work?',
              a: 'The most common diff algorithm (Myers) finds the shortest edit script to transform one text into another based on the Longest Common Subsequence problem. Git uses a variation of this for git diff output.',
            },
            {
              q: 'Why does my diff show the entire file as changed when only one line changed?',
              a: 'This usually means line endings differ — Windows uses CRLF (\\r\\n) and Unix/Mac uses LF (\\n). When files mix line endings, every line appears different. Enable "Ignore whitespace" to normalise line endings. Inconsistent indentation (tabs vs spaces) causes the same problem.',
            },
            {
              q: 'How do I ignore whitespace in a diff?',
              a: 'Enable "Ignore whitespace" to strip leading and trailing spaces before comparison. This is useful when comparing code reformatted by a linter where only logical content changed.',
            },
            {
              q: 'How do I compare JSON with a diff tool?',
              a: 'Paste both JSON objects in the two inputs. For semantic JSON comparison, use the JSON Comparator tool. For raw text diff, this tool shows exactly which characters and lines changed.',
            },
            {
              q: 'What is the unified diff format?',
              a: 'The unified diff format is the standard output of git diff and Unix diff -u. It shows context lines, additions (+), and removals (-). Patch files in this format can be applied with the patch command.',
            },
            {
              q: 'How do I compare code changes without Git?',
              a: 'Paste the original code in the left input and modified code in the right. The diff tool shows additions and removals with color highlighting — no Git or command-line tools required.',
            },
            {
              q: 'What is character-level vs word-level diff?',
              a: 'Line-level diff marks entire lines as changed. Character-level (inline) diff shows exactly which characters within a changed line were added or removed. Enable "Inline char diff" to see this highlighting.',
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
