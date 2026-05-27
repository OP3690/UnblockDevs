import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import HtmlFormatterClient from './client';

const canonicalUrl = 'https://unblockdevs.com/html-formatter';

export const metadata: Metadata = {
  title: 'HTML Formatter & Minifier — Beautify Online | UnblockDevs',
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
    'html formatter online',
    'html pretty print',
    'tidy html online',
    'compress html',
    'minify html online',
    'html code cleaner',
    'html formatter no signup',
    'html linter online',
    'html editor online',
    'format html5',
    'html code beautify',
    'html whitespace formatter',
    'html formatter vscode',
    'prettier html',
    'html-tidy',
    'html formatter python',
    'beautifulsoup format html',
    'html formatter javascript',
    'html template formatter',
    'react jsx formatter',
    'html email formatter',
    'html email lint',
    'html entity encode',
    'html escape online',
    'html encode decode',
    'html entity decoder',
    'html special characters',
    'html comment formatter',
    'html formatter free online',
    'html beautifier online',
    'html code formatter tool',
    'html indenter online',
    'pretty print html online',
    'html format copy paste',
    'html tidy online',
    'html code cleaner',
    'format html code browser',
    'html minifier online',
    'html unminify online',
    'html formatter no upload',
    'html formatter no signup',
    'html code prettifier',
    'format html5 online',
    'html format api response',
    'html structure formatter',
    'auto format html code',
    'html nested tags formatter',
    'html whitespace formatter',
    'html attribute formatter',
    'html self-closing tag formatter',
    'html formatter vscode alternative',
  ],
  openGraph: {
    title: 'HTML Formatter — Beautify & Minify HTML Online | UnblockDevs',
    description: 'Clean messy HTML instantly. Beautify with proper indentation or minify for production. 100% client-side, no signup.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: 'https://unblockdevs.com/api/og?title=HTML%20Formatter%20%E2%80%94%20Beautify%20%26%20Minify%20HTML%20Online&emoji=%F0%9F%93%9D&desc=Clean%20messy%20HTML%20instantly', width: 1200, height: 630, alt: 'HTML Formatter — Beautify & Minify HTML Online — UnblockDevs' }],
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
  dateModified: '2026-05-27',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['Beautify HTML', 'Minify HTML', 'Custom indent size (2/4 spaces or tab)', 'Syntax highlighting', 'Live error detection', 'Copy output', 'No server upload'],};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I format HTML code?', acceptedAnswer: { '@type': 'Answer', text: 'Paste your HTML into the formatter and click "Beautify". It adds proper indentation, adds line breaks between tags, and normalizes attribute formatting. You can choose 2-space, 4-space, or tab indentation.' } },
    { '@type': 'Question', name: 'Why does my HTML look broken after minification?', acceptedAnswer: { '@type': 'Answer', text: 'HTML minification can break rendering in two situations: inline elements like <span> or text nodes where stripped whitespace causes words to run together, and JavaScript string literals containing HTML that relied on specific whitespace. If minification breaks your layout, check whether the issue is caused by whitespace between inline-block elements — add display:block or explicit spacing in CSS rather than relying on whitespace.' } },
    { '@type': 'Question', name: 'Is my HTML code safe to paste here?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. This HTML formatter runs entirely in your browser — no code is sent to any server. Your HTML never leaves your device.' } },
    { '@type': 'Question', name: 'Can I format HTML with inline CSS and JavaScript?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The formatter handles HTML that contains inline <style> and <script> blocks. It will preserve their content while formatting the HTML structure around them.' } },
    { '@type': 'Question', name: 'How do I diff two HTML files to find what changed?', acceptedAnswer: { '@type': 'Answer', text: 'Format both HTML files with the HTML Formatter first to normalise indentation and attribute order, then paste both into the Text Diff tool to see exactly which lines changed. Comparing minified HTML directly is nearly impossible since the entire file appears as one long line — formatting first makes the diff meaningful.' } },
    { '@type': 'Question', name: 'How do I beautify HTML online?', acceptedAnswer: { '@type': 'Answer', text: 'Paste your HTML into an online HTML formatter like UnblockDevs HTML Formatter and click Beautify. The tool adds proper indentation, line breaks between tags, and normalizes attribute formatting. You can choose 2-space, 4-space, or tab indentation to match your project style.' } },
    { '@type': 'Question', name: 'How do I minify HTML?', acceptedAnswer: { '@type': 'Answer', text: 'HTML minification removes all whitespace, comments, and redundant attributes from HTML to reduce file size. Click the Minify option in the formatter. Minified HTML can reduce page size by 10-40%, improving load times and Lighthouse performance scores.' } },
    { '@type': 'Question', name: 'How do I format HTML in VS Code?', acceptedAnswer: { '@type': 'Answer', text: 'Install the Prettier extension for VS Code. Prettier supports HTML formatting out of the box. Right-click in an HTML file and select "Format Document", or configure Prettier as the default formatter and enable Format on Save for automatic formatting.' } },
    { '@type': 'Question', name: 'How do I use Prettier to format HTML?', acceptedAnswer: { '@type': 'Answer', text: 'Run npx prettier --write "**/*.html" to format all HTML files in your project. Configure options in .prettierrc such as printWidth, tabWidth, and htmlWhitespaceSensitivity. Prettier integrates with VS Code, WebStorm, and most CI pipelines.' } },
    { '@type': 'Question', name: 'How do I format HTML in Python?', acceptedAnswer: { '@type': 'Answer', text: 'Use BeautifulSoup with prettify(): from bs4 import BeautifulSoup; soup = BeautifulSoup(html, "html.parser"); print(soup.prettify()). This adds proper indentation and line breaks. For more control, use the html.parser module or the lxml library.' } },
    { '@type': 'Question', name: 'How do I tidy messy HTML from a CMS?', acceptedAnswer: { '@type': 'Answer', text: 'Paste the CMS-generated HTML into the HTML Formatter and click Beautify. The tool normalizes inconsistent indentation, removes inline whitespace issues, and makes the markup readable. This is especially useful for WordPress, Drupal, and Squarespace output.' } },
    { '@type': 'Question', name: 'What is the difference between HTML beautify and HTML minify?', acceptedAnswer: { '@type': 'Answer', text: 'Beautify adds indentation, line breaks, and consistent spacing to make HTML readable for humans. Minify removes all whitespace, comments, and unnecessary characters to make HTML as small as possible for browsers. Use beautify for development and editing; use minify for production deployment.' } },
    { '@type': 'Question', name: 'How do I fix indentation in HTML generated by a template engine?', acceptedAnswer: { '@type': 'Answer', text: 'Template engines like Jinja2, Handlebars, and Liquid often produce inconsistently indented HTML because template tags and loops break indentation context. Paste the rendered output into the HTML Formatter and click Beautify — it normalises indentation regardless of what generated the HTML, without breaking template variable syntax like {{ variable }} or {% block %}.' } },
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
            { q: 'How do I diff two HTML files to find what changed?', a: 'Format both HTML files with the HTML Formatter first to normalise indentation and attribute order, then paste both into the Text Diff tool to see exactly which lines changed. Comparing minified HTML directly is nearly impossible — formatting first makes the diff meaningful.' },
            { q: 'How do I beautify HTML online?', a: 'Paste your HTML and click Beautify. The tool adds proper indentation, line breaks between tags, and normalizes attribute formatting. Choose 2-space, 4-space, or tab indentation to match your project style.' },
            { q: 'Why does my HTML look broken after minification?', a: 'Minification can break rendering when whitespace between inline elements like <span> is significant, or when JavaScript string literals contain HTML relying on whitespace. If layout breaks, use CSS display:block or explicit spacing rather than relying on whitespace between elements.' },
            { q: 'How do I format HTML in VS Code?', a: 'Install the Prettier extension for VS Code. Right-click in an HTML file and select "Format Document". Configure Prettier as the default formatter and enable Format on Save for automatic formatting.' },
            { q: 'How do I use Prettier to format HTML?', a: 'Run npx prettier --write "**/*.html" to format all HTML files. Configure options in .prettierrc such as printWidth, tabWidth, and htmlWhitespaceSensitivity.' },
            { q: 'How do I format HTML in Python?', a: 'Use BeautifulSoup: from bs4 import BeautifulSoup; soup = BeautifulSoup(html, "html.parser"); print(soup.prettify()). This adds proper indentation and line breaks.' },
            { q: 'How do I tidy messy HTML from a CMS?', a: 'Paste the CMS-generated HTML and click Beautify. The tool normalizes inconsistent indentation and makes markup readable. This is especially useful for WordPress, Drupal, and Squarespace output.' },
            { q: 'How do I fix indentation in HTML generated by a template engine?', a: 'Template engines like Jinja2, Handlebars, and Liquid often produce inconsistently indented HTML because template tags and loops break indentation context. Paste the rendered output into the HTML Formatter and click Beautify — it normalises indentation regardless of what generated the HTML, without breaking template variable syntax like {{ variable }} or {% block %}.' },
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
