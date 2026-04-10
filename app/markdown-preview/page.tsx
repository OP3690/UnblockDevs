import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts, ProTip,
} from '@/components/tools/ToolSEOContent';
import MarkdownPreviewClient from './client';

export const metadata: Metadata = {
  title: 'Markdown Preview & Editor — Live GitHub Markdown Renderer | UnblockDevs',
  description: 'Preview Markdown live in real time. GitHub Flavored Markdown (GFM) support with tables, task lists, code blocks, and more. Copy HTML, download, 100% browser-based.',
  keywords: [
    'markdown preview',
    'markdown editor online',
    'markdown to html',
    'github flavored markdown',
    'markdown renderer',
    'markdown live preview',
    'gfm preview',
    'markdown viewer',
  ],
  openGraph: {
    title: 'Markdown Preview & Editor — Live GitHub Markdown Renderer | UnblockDevs',
    description: 'Preview Markdown live in real time. GitHub Flavored Markdown (GFM) support with tables, task lists, code blocks, and more. Copy HTML, download, 100% browser-based.',
    type: 'website',
    url: 'https://unblockdevs.com/markdown-preview',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown Preview & Editor — Live GitHub Markdown Renderer | UnblockDevs',
    description: 'Preview Markdown live in real time. GitHub Flavored Markdown (GFM) support with tables, task lists, code blocks, and more. Copy HTML, download, 100% browser-based.',
  },
  alternates: { canonical: 'https://unblockdevs.com/markdown-preview' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Markdown Preview & Editor',
  url: 'https://unblockdevs.com/markdown-preview',
  description: 'Preview Markdown live in real time. GitHub Flavored Markdown (GFM) support with tables, task lists, code blocks, and more. Copy HTML, download, 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Live Markdown preview with 150ms debounce',
    'GitHub Flavored Markdown (GFM) support',
    'Tables, task lists, code blocks with language badges',
    'Copy HTML or raw Markdown to clipboard',
    'Download as .html or .md file',
    '100% client-side — no data sent to servers',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '980',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'FAQPage' as const,
  mainEntity: [
    {
      '@type': 'Question' as const,
      name: 'What is GitHub Flavored Markdown (GFM)?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'GitHub Flavored Markdown (GFM) is a superset of standard Markdown that adds support for tables, task lists (- [ ] and - [x]), strikethrough (~~text~~), fenced code blocks with syntax highlighting, and autolinks. It is the dialect used on GitHub, GitLab, and many documentation platforms.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'Can I use this Markdown editor offline?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Yes. The Markdown preview tool at unblockdevs.com/markdown-preview runs entirely in your browser with no server calls. Once the page loads, you can use it without an internet connection. Your Markdown is never sent to any server.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'How do I convert Markdown to HTML?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'Type or paste your Markdown in the editor on the left. The rendered HTML preview appears on the right in real time. Click "Copy HTML" to copy the rendered HTML to your clipboard, or click "Download HTML" to save it as a .html file.',
      },
    },
    {
      '@type': 'Question' as const,
      name: 'What Markdown features are supported?',
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: 'This editor supports all GitHub Flavored Markdown features: headings (H1–H6), bold, italic, strikethrough, inline code, fenced code blocks with language labels, links, images, ordered and unordered lists, nested lists, blockquotes, tables, horizontal rules, and task lists (- [ ] / - [x]).',
      },
    },
  ],
};

const canonicalUrl = 'https://unblockdevs.com/markdown-preview';

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Preview Markdown Online',
  description: 'Step-by-step guide to previewing and converting Markdown to HTML instantly in your browser.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Type or paste Markdown', text: 'Enter your Markdown text in the left editor panel. The preview updates automatically as you type.' },
    { '@type': 'HowToStep', position: 2, name: 'See the live preview', text: 'The right panel renders your Markdown as styled HTML in real time, including tables, code blocks, and task lists.' },
    { '@type': 'HowToStep', position: 3, name: 'Copy or download', text: 'Click "Copy HTML" to copy the rendered HTML, "Copy Markdown" to copy the raw source, or use the Download buttons to save as .html or .md.' },
    { '@type': 'HowToStep', position: 4, name: 'Switch view modes', text: 'Toggle between Split view, Preview only, or Editor only using the view mode buttons in the toolbar.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools' },
    { '@type': 'ListItem', position: 3, name: 'Markdown Preview & Editor', item: canonicalUrl },
  ],
};

export default function MarkdownPreviewPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <MarkdownPreviewClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="Markdown Preview — Live GitHub Markdown Renderer">
          <SEOProse>
            A <strong>Markdown preview editor</strong> lets you write and render Markdown side by side in real time. Paste or type any Markdown — README files, documentation, blog posts, notes — and see the formatted HTML output instantly. This tool supports <strong>GitHub Flavored Markdown (GFM)</strong>, including tables, task lists, strikethrough, fenced code blocks, and nested lists.
          </SEOProse>
          <SEOProse>
            The rendered preview is styled with beautiful typography so you can see exactly how your content will look when published. Use the Copy HTML button to grab the rendered output, or download your Markdown as a <code>.md</code> file for use in any project.
          </SEOProse>
          <ProTip>Press <strong>⌘+Enter</strong> (Mac) or <strong>Ctrl+Enter</strong> (Windows) to instantly copy the rendered HTML to your clipboard without clicking.</ProTip>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Preview Markdown in Real Time">
          <HowItWorks steps={[
            { n: '01', title: 'Type Markdown', desc: 'Enter or paste Markdown into the left editor. Supports all GFM syntax including tables, task lists, and fenced code blocks.' },
            { n: '02', title: 'Live preview', desc: 'The right panel renders your Markdown as styled HTML in real time with a 150ms debounce — no button click required.' },
            { n: '03', title: 'Copy or download', desc: 'Copy the rendered HTML or raw Markdown to clipboard, or download as .html or .md file with one click.' },
            { n: '04', title: 'Switch views', desc: 'Toggle between Split, Preview only, or Editor only layouts. Check word count, character count, and reading time at a glance.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When to Use a Markdown Preview Tool">
          <UseCases cases={[
            { icon: '📄', title: 'README Files', desc: 'Preview GitHub README files before committing to see how badges, tables, and code blocks will render.' },
            { icon: '📝', title: 'Documentation', desc: 'Author and preview technical documentation with tables, code examples, and structured headings.' },
            { icon: '✅', title: 'Task Lists', desc: 'Create and preview task lists with checkboxes using GFM task list syntax (- [ ] and - [x]).' },
            { icon: '📊', title: 'Tables', desc: 'Write Markdown tables and see them rendered with clean borders and alternating row styles.' },
            { icon: '💻', title: 'Code Blocks', desc: 'Preview syntax-highlighted code blocks with language badges for dozens of programming languages.' },
            { icon: '🔄', title: 'Markdown to HTML', desc: 'Convert Markdown to clean HTML for pasting into CMS platforms, email templates, or static sites.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'What is GitHub Flavored Markdown (GFM)?',
              a: 'GFM is a superset of standard Markdown that adds tables, task lists (- [ ] / - [x]), strikethrough (~~text~~), and fenced code blocks with language hints. It is the format used on GitHub and many developer platforms.',
            },
            {
              q: 'How do I convert Markdown to HTML?',
              a: 'Type or paste your Markdown in the editor. The preview renders the HTML automatically. Click "Copy HTML" to copy the rendered output, or "Download HTML" to save it as a .html file.',
            },
            {
              q: 'Is my Markdown content safe and private?',
              a: 'Yes. All Markdown parsing and rendering happens in your browser. Nothing is sent to any server, making it safe for private notes, proprietary documentation, or sensitive content.',
            },
            {
              q: 'What Markdown syntax is supported?',
              a: 'The editor supports all GitHub Flavored Markdown: headings H1–H6, bold, italic, strikethrough, inline code, fenced code blocks with language labels, links, images, ordered/unordered/nested lists, blockquotes, tables, horizontal rules, and task lists.',
            },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Workbench', desc: 'Format, validate, and convert JSON with tree view and TypeScript generator', icon: '{}' },
            { href: '/json-formatter', label: 'JSON Formatter', desc: 'Quickly format and validate JSON with custom indentation', icon: '📋' },
            { href: '/url-encoder', label: 'URL Encoder / Decoder', desc: 'Encode and decode URL components and query strings', icon: '🔗' },
            { href: '/base64-encoder', label: 'Base64 Encoder', desc: 'Encode and decode Base64 strings and files in your browser', icon: '🔐' },
            { href: '/code-prompt-shield', label: 'Code Prompt Shield', desc: 'Sanitize and escape code snippets for safe use in AI prompts', icon: '🛡️' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/github-flavored-markdown-guide', label: 'GitHub Flavored Markdown Complete Guide' },
            { href: '/blog/markdown-to-html-conversion', label: 'Converting Markdown to HTML' },
            { href: '/blog/readme-best-practices', label: 'README Best Practices for Open Source Projects' },
            { href: '/blog/markdown-tables-tips', label: 'Mastering Markdown Tables' },
          ]} />
        </SEOSection>
      </ToolSEOContent>
      <ToolPageFooterBand toolName="markdown_preview" />
    </>
  );
}
