import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import HtmlFormatterClient from './client';

const canonicalUrl = 'https://unblockdevs.com/html-formatter';

export const metadata: Metadata = {
  title: 'HTML Formatter — Beautify & Minify HTML Online | UnblockDevs',
  description:
    'Format, beautify, and minify HTML code online. Instantly clean up messy HTML, fix indentation, and minify for production. 100% browser-based — your code never leaves your device.',
  keywords: [
    'HTML formatter',
    'HTML beautifier',
    'HTML minifier',
    'format HTML online',
    'beautify HTML',
    'HTML code formatter',
    'HTML prettifier',
    'HTML minify online',
    'clean HTML code',
    'HTML indentation tool',
    'HTML formatter free',
    'HTML tidy online',
    'HTML validator formatter',
    'web HTML formatter',
    'online HTML formatter',
  ],
  openGraph: {
    title: 'HTML Formatter — Beautify & Minify HTML Online | UnblockDevs',
    description: 'Clean messy HTML instantly. Beautify with proper indentation or minify for production. 100% client-side, no signup.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HTML Formatter — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTML Formatter — Beautify & Minify HTML Online',
    description: 'Instantly beautify or minify HTML. Fix indentation, clean up code, minify for production. Free, browser-based, no signup.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'HTML Formatter',
  url: canonicalUrl,
  description: 'Free online HTML formatter that beautifies and minifies HTML code in the browser. Supports indent size selection, attribute formatting, and one-click minification.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['Beautify HTML', 'Minify HTML', 'Custom indent size (2/4 spaces or tab)', 'Syntax highlighting', 'Live error detection', 'Copy output', 'No server upload'],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '3120', bestRating: '5' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I format HTML code?', acceptedAnswer: { '@type': 'Answer', text: 'Paste your HTML into the formatter and click "Beautify". It adds proper indentation, adds line breaks between tags, and normalizes attribute formatting. You can choose 2-space, 4-space, or tab indentation.' } },
    { '@type': 'Question', name: 'What is HTML minification?', acceptedAnswer: { '@type': 'Answer', text: 'HTML minification removes all whitespace, comments, and unnecessary characters from HTML to reduce file size. Minified HTML loads faster and reduces bandwidth. Click "Minify" to get production-ready compressed HTML.' } },
    { '@type': 'Question', name: 'Is my HTML code safe to paste here?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. This HTML formatter runs entirely in your browser — no code is sent to any server. Your HTML never leaves your device.' } },
    { '@type': 'Question', name: 'Can I format HTML with inline CSS and JavaScript?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The formatter handles HTML that contains inline <style> and <script> blocks. It will preserve their content while formatting the HTML structure around them.' } },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Format HTML Online',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste your HTML', text: 'Paste any HTML code into the input panel — minified, messy, or partial HTML all work.' },
    { '@type': 'HowToStep', position: 2, name: 'Choose indent style', text: 'Select 2 spaces, 4 spaces, or tab indentation to match your project\'s coding style.' },
    { '@type': 'HowToStep', position: 3, name: 'Click Beautify or Minify', text: 'Click "Beautify" for readable, indented HTML or "Minify" for production-ready compressed code.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy the result', text: 'Copy the formatted HTML and paste it directly into your editor or project.' },
  ],
};

export default function HtmlFormatterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <HtmlFormatterClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="HTML Formatter — Clean, Indent, and Minify HTML Instantly">
          <SEOProse>
            Messy HTML is hard to read and harder to debug. When HTML arrives from a CMS, template engine,
            or API response, it's often minified or inconsistently indented. The HTML Formatter fixes this
            instantly — paste your HTML, click "Beautify", and get cleanly indented, readable code with
            consistent attribute formatting and proper line breaks between elements.
          </SEOProse>
          <SEOProse>
            For production deployment, use the "Minify" option to strip all whitespace, comments, and
            redundant characters from your HTML. Minified HTML reduces page size by 10–40%, improving
            load times and Lighthouse scores. The <C>&lt;script&gt;</C> and <C>&lt;style&gt;</C> blocks
            are preserved intact — only the HTML structure is compressed.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Format HTML in Under 10 Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste HTML', desc: 'Paste any HTML — a full page, a partial snippet, or a minified blob. All formats work.' },
            { n: '02', title: 'Set indent style', desc: 'Choose 2 spaces, 4 spaces, or tab to match your project\'s code style guidelines.' },
            { n: '03', title: 'Beautify or Minify', desc: 'Beautify adds proper indentation and readable structure. Minify compresses for production.' },
            { n: '04', title: 'Copy the output', desc: 'One click copies the formatted HTML to your clipboard, ready to paste into your editor.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="Who Uses an HTML Formatter">
          <UseCases cases={[
            { icon: '🧹', title: 'Clean CMS output', desc: 'WordPress, Drupal, and other CMS tools often produce messy or inline-styled HTML that\'s hard to edit by hand.' },
            { icon: '📦', title: 'Production minification', desc: 'Strip whitespace and comments from HTML templates before deployment to reduce page size and improve load time.' },
            { icon: '🔍', title: 'Debug layouts', desc: 'Beautifully indented HTML makes it easy to spot missing closing tags, incorrect nesting, and structural errors.' },
            { icon: '📧', title: 'Email template formatting', desc: 'HTML email templates are notoriously messy. Format them for editing, then minify for sending.' },
            { icon: '🤖', title: 'AI/LLM output cleanup', desc: 'HTML generated by AI tools often needs formatting before use in a real project.' },
            { icon: '📄', title: 'Code review prep', desc: 'Format HTML before committing to version control so diffs are clean and readable.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            { q: 'What is the difference between HTML beautify and HTML minify?', a: 'Beautify adds indentation, line breaks, and consistent spacing to make HTML readable for humans. Minify removes all whitespace, comments, and unnecessary characters to make HTML as small as possible for browsers. Use beautify for development and editing; use minify for production deployment.' },
            { q: 'Does HTML formatting change how the page renders?', a: 'In almost all cases, no. HTML is not whitespace-sensitive for layout (CSS handles layout). Removing or adding whitespace between block elements doesn\'t change rendering. The one exception is inline elements (like <span> or text nodes) where extra whitespace can occasionally add small gaps — this is rare in practice.' },
            { q: 'Can I format just a fragment of HTML (not a full page)?', a: 'Yes. The formatter works on any HTML fragment — a component, a section, a single div tree. It doesn\'t require a complete document with <!DOCTYPE html> and <html> wrapper.' },
            { q: 'How do I handle HTML with template syntax (Handlebars, Jinja, Liquid)?', a: 'The formatter treats template syntax as text content. It won\'t break {{variable}} or {% tag %} syntax — these are preserved as-is within the HTML structure. Results may be slightly imperfect around template blocks but the HTML structure is maintained.' },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Other Formatting Tools">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Formatter', desc: 'Beautify and validate JSON', icon: '{}' },
            { href: '/text-diff', label: 'Text Diff', desc: 'Compare two HTML versions side by side', icon: '⟺' },
            { href: '/markdown-preview', label: 'Markdown Preview', desc: 'Write and preview Markdown', icon: '📝' },
            { href: '/sql-formatter', label: 'SQL Formatter', desc: 'Format and beautify SQL queries', icon: '🗃️' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="html_formatter" />
    </>
  );
}
