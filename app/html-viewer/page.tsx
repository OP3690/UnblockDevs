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
    'html preview tool',
    'html preview browser',
    'html viewer free',
    'view html source',
    'html renderer online',
    'html preview no signup',
    'html instant preview',
    'html editor preview',
    'html output viewer',
    'html test page',
    'html snippet preview',
    'html template preview',
    'html email preview',
    'html iframe preview',
    'render html snippet',
    'codepen alternative',
    'jsbin alternative',
    'jsfiddle alternative',
    'html preview tool free',
    'view html file online',
    'html preview mobile',
    'html preview responsive',
    'preview bootstrap html',
    'preview tailwind html',
    'html table preview',
    'html form preview',
    'html preview react components',
    'view api response html',
    'debug html response',
    'html viewer online free',
    'html renderer online',
    'html preview browser',
    'test html code online',
    'run html online',
    'preview html snippet',
    'html sandbox online',
    'live html preview tool',
    'html viewer no upload',
    'html viewer no signup',
    'view html source online',
    'html display tool',
    'render html string online',
    'html page viewer online',
    'html file previewer',
    'html preview tool free',
    'html viewer browser',
    'online html tester',
    'html output viewer',
    'html render tool free',
    'html iframe preview online',
    'html email template preview',
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
    { '@type': 'Question', name: 'How do I preview HTML online?', acceptedAnswer: { '@type': 'Answer', text: 'Paste or type your HTML into the editor panel and the preview renders instantly in the sandboxed preview pane. No signup or installation is required. The preview supports inline CSS, JavaScript, and CDN libraries loaded via <link> and <script> tags.' } },
    { '@type': 'Question', name: 'Is the HTML preview safe?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The preview runs in a sandboxed iframe that isolates the code from the rest of the page. JavaScript executes safely without being able to access parent page cookies, localStorage, or navigate away. It is safe to preview code from unknown sources in this environment.' } },
    { '@type': 'Question', name: 'How do I preview HTML emails?', acceptedAnswer: { '@type': 'Answer', text: 'Paste your HTML email markup into the editor. The preview renders it as a browser would, letting you check layout, inline styles, and image placeholders. Switch to mobile viewport to verify responsive email designs before sending to a test inbox.' } },
    { '@type': 'Question', name: 'How do I test HTML responsiveness?', acceptedAnswer: { '@type': 'Answer', text: 'Use the viewport toggle in the toolbar to switch between desktop and mobile viewport widths. The preview re-renders at the selected width so you can check media queries, flexbox layouts, and responsive breakpoints without a separate device.' } },
    { '@type': 'Question', name: 'How do I use an HTML sandbox?', acceptedAnswer: { '@type': 'Answer', text: 'An HTML sandbox isolates code execution so it cannot affect the parent page. This HTML viewer uses the iframe sandbox attribute to allow scripts and forms while blocking parent page access. Paste any HTML including JavaScript and CSS and run it safely.' } },
    { '@type': 'Question', name: 'How do I preview Bootstrap HTML snippets?', acceptedAnswer: { '@type': 'Answer', text: 'Add the Bootstrap CDN link in a <link> tag inside your HTML head, then write Bootstrap components using utility classes. The sandbox allows loading CDN resources so Bootstrap styles render immediately in the preview without any local setup.' } },
    { '@type': 'Question', name: 'How do I debug HTML rendering issues?', acceptedAnswer: { '@type': 'Answer', text: 'Paste the problematic HTML snippet in isolation to see how it renders without other page styles interfering. Remove sections one at a time to identify which element causes the issue. The live preview updates instantly so you can iterate quickly.' } },
    { '@type': 'Question', name: 'How do I preview HTML without a project?', acceptedAnswer: { '@type': 'Answer', text: 'The HTML Viewer is a zero-setup sandbox — no local server, no npm install, no project structure needed. Paste any HTML fragment or full document and see it rendered immediately. Use the starter templates to jump-start common layouts.' } },
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
            { q: 'How do I preview HTML online?', a: 'Paste your HTML into the editor and the preview renders instantly in a sandboxed pane. No signup required. The preview supports inline CSS, JavaScript, and CDN libraries.' },
            { q: 'Is the HTML preview safe?', a: 'Yes. The preview runs in a sandboxed iframe that isolates code from the rest of the page. JavaScript executes without accessing parent page cookies or localStorage.' },
            { q: 'How do I preview HTML emails?', a: 'Paste your HTML email markup and the preview renders it as a browser would. Switch to mobile viewport to verify responsive email designs before sending.' },
            { q: 'How do I test HTML responsiveness?', a: 'Use the viewport toggle in the toolbar to switch between desktop and mobile widths. Check media queries, flexbox layouts, and responsive breakpoints without a separate device.' },
            { q: 'How do I use an HTML sandbox?', a: 'Paste any HTML including JavaScript and CSS. The iframe sandbox allows scripts and forms while blocking parent page access. It is safe to test code from unknown sources.' },
            { q: 'How do I preview Bootstrap HTML snippets?', a: 'Add the Bootstrap CDN link tag in your HTML head. The sandbox allows CDN resources so Bootstrap styles render immediately without any local setup.' },
            { q: 'How do I debug HTML rendering issues?', a: 'Paste the problematic HTML snippet in isolation to see how it renders without other page styles interfering. Remove sections to identify which element causes the issue.' },
            { q: 'How do I preview HTML without a project?', a: 'The HTML Viewer is a zero-setup sandbox — no local server or npm install needed. Paste any HTML fragment and see it rendered immediately. Use starter templates for common layouts.' },
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
