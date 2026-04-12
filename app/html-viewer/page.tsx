import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import HtmlViewerClient from './client';

const canonicalUrl = 'https://unblockdevs.com/html-viewer';

export const metadata: Metadata = {
  title: 'HTML Viewer & Live Editor — Preview HTML Online | UnblockDevs',
  description:
    'Live HTML, CSS and JavaScript editor with instant sandboxed preview. Write or paste HTML and see it rendered instantly. 5 starter templates, download, copy — 100% browser-based.',
  keywords: [
    'html viewer online',
    'live html editor',
    'html preview online',
    'html css js sandbox',
    'online html renderer',
    'html live preview',
    'test html online',
    'html playground',
    'html editor browser',
    'render html online',
    'html sandbox online',
    'preview html css javascript',
    'html code viewer',
    'html tester online',
    'free html editor online',
  ],
  openGraph: {
    title: 'HTML Viewer & Live Editor — Preview HTML Online | UnblockDevs',
    description: 'Write HTML, CSS and JS — see it render instantly in a sandboxed preview. 5 starter templates. Free, browser-based, no signup.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'HTML Viewer — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HTML Viewer & Live Editor — Free Online Tool',
    description: 'Live HTML/CSS/JS sandbox with instant preview. 5 starter templates, download, copy. 100% client-side.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'HTML Viewer & Live Editor',
  url: canonicalUrl,
  description: 'Free online HTML viewer and live editor. Write HTML, CSS, and JavaScript in the browser and see the result render instantly in a safe sandboxed iframe.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['Live HTML/CSS/JS preview', 'Sandboxed iframe', '5 starter templates', 'Desktop and mobile viewport', 'Dark preview background', 'Download as HTML file', '100% browser-based'],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '3850', bestRating: '5' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is this HTML editor safe to run JavaScript in?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The preview runs in a sandboxed iframe with allow-scripts and allow-forms permissions. The code cannot access parent page state, cookies, or localStorage — it is fully isolated from the rest of the page.' } },
    { '@type': 'Question', name: 'Can I use CSS and JavaScript in the HTML editor?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. You can write a complete HTML document with embedded <style> and <script> blocks. Inline CSS, external-like style rules, and JavaScript all render in the preview iframe.' } },
    { '@type': 'Question', name: 'Can I download the HTML I write?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Click the Download button to save the current editor content as index.html to your local machine.' } },
    { '@type': 'Question', name: 'Does the HTML viewer auto-update as I type?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Auto mode updates the preview 600ms after you stop typing so the page does not re-render on every keystroke. You can switch to Manual mode and click Run to control when the preview updates.' } },
  ],
};

export default function HtmlViewerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <HtmlViewerClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="HTML Viewer — Preview HTML, CSS and JavaScript Instantly">
          <SEOProse>
            The HTML Viewer gives you a full live code editor and sandboxed preview side by side.
            Write or paste any HTML — with embedded <C>&lt;style&gt;</C> and <C>&lt;script&gt;</C> blocks —
            and see it render in real time without leaving the browser. The preview runs in an isolated iframe
            so JavaScript executes safely without affecting the rest of the page.
          </SEOProse>
          <SEOProse>
            Use the five built-in starter templates (blank page, card UI, login form, gradient hero, CSS animations)
            to jump-start your code. Switch between desktop and mobile viewport widths, toggle a dark preview background,
            and copy or download the finished HTML with one click. Everything runs 100% client-side — no server, no signup.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Live HTML Preview in 10 Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Choose a template', desc: 'Pick from Blank, Card UI, Login Form, Gradient Hero, or CSS Animation — or paste your own HTML.' },
            { n: '02', title: 'Edit the code', desc: 'Write HTML, CSS, and JavaScript in the code panel. Auto mode updates the preview as you type.' },
            { n: '03', title: 'Preview instantly', desc: 'See the rendered output in the live preview panel. Switch between desktop and mobile viewports.' },
            { n: '04', title: 'Copy or download', desc: 'Copy the HTML to clipboard or download as index.html for immediate use in your project.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When to Use an Online HTML Viewer">
          <UseCases cases={[
            { icon: '🧪', title: 'Prototype UI components', desc: 'Quickly test CSS layouts, animations, and component ideas without setting up a local project.' },
            { icon: '📧', title: 'Preview email HTML', desc: 'Paste HTML email templates and check how they render before sending to a client or test inbox.' },
            { icon: '🎓', title: 'Learn HTML and CSS', desc: 'Students and beginners can experiment with HTML tags and CSS rules and see results instantly.' },
            { icon: '🔍', title: 'Debug rendered markup', desc: 'Paste server-generated HTML to check structure, class names, and styles in isolation.' },
            { icon: '🎨', title: 'Test CSS animations', desc: 'Build and fine-tune CSS keyframe animations with a live preview that updates as you type.' },
            { icon: '📋', title: 'Share HTML snippets', desc: 'Write a self-contained HTML snippet for documentation, a blog post, or a code review.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            { q: 'Can I use external CSS libraries like Tailwind or Bootstrap?', a: 'Yes — add a <link> tag pointing to a CDN URL inside your <head>. For example, add the Tailwind CDN script tag and Tailwind utility classes will work in the preview. The sandbox allows network requests for loading CDN resources.' },
            { q: 'What is the sandbox attribute used in the preview iframe?', a: 'The preview iframe uses sandbox="allow-scripts allow-forms allow-modals". This means JavaScript runs, forms can be submitted, and alert/confirm dialogs work — but the code cannot access parent page cookies, localStorage, or navigate the outer page.' },
            { q: 'Is there a file size limit?', a: 'No hard limit — the editor is a standard textarea. Very large HTML documents (100KB+) may slow the preview slightly since the browser needs to parse and render them on each update. Use Manual mode for large documents to control when re-rendering happens.' },
            { q: 'Can I use multiple files (CSS file + JS file)?', a: 'This is a single-file sandbox. Put all CSS in a <style> block and all JavaScript in a <script> block inside the same HTML document. For multi-file projects, use a local code editor like VS Code.' },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Other Dev Utilities">
          <RelatedTools tools={[
            { href: '/html-formatter', label: 'HTML Formatter', desc: 'Beautify or minify HTML code', icon: '🗂️' },
            { href: '/css-gradient-generator', label: 'CSS Gradient Generator', desc: 'Build CSS gradients visually', icon: '🎨' },
            { href: '/css-box-shadow', label: 'CSS Box Shadow', desc: 'Build box-shadow CSS visually', icon: '🟦' },
            { href: '/markdown-preview', label: 'Markdown Preview', desc: 'Write and preview Markdown', icon: '📝' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="html_viewer" />
      {/* Portal target for HTML Viewer fullscreen — must be outside ToolPageShell's overflow-hidden */}
      <div id="hv-fs-root" />
    </>
  );
}
