import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import CssBoxShadowClient from './client';

const canonicalUrl = 'https://unblockdevs.com/css-box-shadow';

export const metadata: Metadata = {
  title: 'CSS Box Shadow Generator — Visual Builder with Live Preview | UnblockDevs',
  description:
    'Build beautiful CSS box shadows visually. Multi-layer support, live preview, 8 presets (soft card, glow, brutal, inner shadow), and instant CSS copy. 100% browser-based — no signup required.',
  keywords: [
    'css box shadow generator',
    'box shadow generator',
    'css shadow generator',
    'box shadow css generator online',
    'css box shadow builder',
    'css shadow builder',
    'box shadow tool',
    'inner shadow css',
    'css glow effect generator',
    'css shadow code generator',
    'multi layer box shadow',
    'css box shadow generator free',
    'box shadow generator online',
    'css box shadow online',
    'box shadow code generator',
    'css drop shadow generator',
    'css shadow tool online',
    'css shadow preview',
    'css box shadow visual',
    'box shadow designer',
    'css box shadow examples',
    'css box shadow presets',
    'soft shadow css',
    'card shadow css',
    'button shadow css',
    'modal shadow css',
    'css box shadow tailwind',
    'tailwind box shadow custom',
    'box shadow inset css',
    'css inner shadow generator',
    'css pressed shadow',
    'css elevation shadow',
    'material design shadow css',
    'css box shadow rgba',
    'box shadow opacity css',
    'css box shadow color',
    'css shadow offset',
    'css shadow blur radius',
    'css shadow spread radius',
    'css shadow x y offset',
    'css box shadow multiple layers',
    'stacked shadows css',
    'layered shadow css',
    'css glow shadow',
    'neon glow css',
    'css box shadow generator no signup',
    'css shadow copy paste',
    'box shadow code copy',
    'css box shadow figma',
    'css shadow web tool',
    'box shadow generator bootstrap',
    'css shadow generator react',
    'box shadow design tool',
    'css box shadow vs drop shadow',
    'filter drop shadow css',
    'box shadow dark mode',
    'css box shadow playground',
    'box shadow tool free',
    'css shadow code copy',
    'css box shadow 2024',
    'box shadow generator tailwind',
    'drop shadow css generator',
    'css shadow visual editor',
    'css box shadow rgba generator',
    'css box shadow preview tool',
    'css multi-layer shadow generator',
  ],
  openGraph: {
    title: 'CSS Box Shadow Generator — Visual Builder | UnblockDevs',
    description: 'Build multi-layer CSS box shadows visually. 8 presets, live preview, instant CSS copy. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs CSS Box Shadow Generator' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSS Box Shadow Generator | UnblockDevs',
    description: 'Build beautiful CSS box shadows visually. Multi-layer, 8 presets, live preview, instant CSS copy.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CSS Box Shadow Generator',
  url: canonicalUrl,
  description: 'Build beautiful CSS box shadows visually. Multi-layer support, live preview, 8 presets, and instant CSS copy.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Visual box shadow builder with sliders',
    'Multi-layer shadow support',
    '8 design presets (soft card, glow, brutal, inner shadow)',
    'Live preview on light and dark backgrounds',
    'Adjustable border-radius on preview card',
    'One-click CSS copy',
    '100% client-side',
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', ratingCount: '1560', bestRating: '5' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is CSS box-shadow?', acceptedAnswer: { '@type': 'Answer', text: 'The CSS box-shadow property adds shadow effects around an element\'s frame. It accepts comma-separated shadow definitions, each specifying X offset, Y offset, blur radius, spread radius, color, and an optional inset keyword for inner shadows.' } },
    { '@type': 'Question', name: 'Can I layer multiple box shadows?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. CSS box-shadow supports multiple comma-separated shadows on one element. Layering shadows creates richer depth effects — for example, a tight sharp shadow plus a wide diffuse shadow produces a more natural look than a single shadow.' } },
    { '@type': 'Question', name: 'What does the "inset" keyword do?', acceptedAnswer: { '@type': 'Answer', text: 'The inset keyword changes the shadow from an outer shadow (drawn outside the element) to an inner shadow (drawn inside the element\'s border). Inset shadows are useful for pressed button states, input focus styles, and glass-morphism effects.' } },
    { '@type': 'Question', name: 'How do I create a glow effect with box-shadow?', acceptedAnswer: { '@type': 'Answer', text: 'Set X and Y offset to 0, use a moderate blur radius (20-60px), set spread to 2-8px, and use a colored semi-transparent RGBA value. Layer two shadows — one with higher opacity for tight glow and one with lower opacity for the wider ambient glow.' } },
    { '@type': 'Question', name: 'What is the difference between box-shadow and filter: drop-shadow()?', acceptedAnswer: { '@type': 'Answer', text: 'CSS box-shadow applies a shadow to the element\'s rectangular bounding box, regardless of the element\'s visual shape. filter: drop-shadow() follows the actual rendered shape of the element, including transparent areas — making it ideal for PNG images, SVGs, and non-rectangular elements. box-shadow supports inset shadows and multiple layers; drop-shadow does not.' } },
    { '@type': 'Question', name: 'How do I make a CSS box shadow for dark mode?', acceptedAnswer: { '@type': 'Answer', text: 'On dark backgrounds, traditional dark shadows become invisible because they blend with the dark surface. Use a lighter, colored shadow or a colored glow instead. Set the shadow color to a semi-transparent version of your brand color (e.g., rgba(139, 92, 246, 0.4)) with zero offset and a large blur radius for a subtle neon glow effect that works on dark backgrounds.' } },
    { '@type': 'Question', name: 'How do I create a pressed or active button shadow in CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Use the inset keyword to create an inner shadow on the :active state. A typical pressed button uses: box-shadow: inset 0 2px 6px rgba(0,0,0,0.3). This creates the illusion of the button being pushed into the page. Combine with a transform: translateY(2px) for extra realism.' } },
    { '@type': 'Question', name: 'How do I create a material design elevation shadow in CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Material Design elevation is created with two layered shadows: a key shadow (smaller, more opaque, sharper) and an ambient shadow (larger, less opaque, softer). For elevation 4dp: box-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 3px 10px rgba(0,0,0,0.15). Higher elevation values increase offset and blur for both shadows.' } },
    { '@type': 'Question', name: 'Can I use CSS box-shadow for a border effect?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Set the X offset, Y offset, and blur to 0, and use only the spread value: box-shadow: 0 0 0 2px #3B82F6. This creates a clean 2px solid border that does not affect the element\'s layout (unlike border which adds to box model dimensions). It is particularly useful for focus rings and outline-style borders.' } },
    { '@type': 'Question', name: 'How do I make a card with a soft shadow in CSS?', acceptedAnswer: { '@type': 'Answer', text: 'For a natural card shadow, use a low-opacity dark color with small offset and moderate blur: box-shadow: 0 4px 24px rgba(0,0,0,0.08). Layer a second tight shadow for depth: 0 1px 4px rgba(0,0,0,0.06). This two-layer approach mimics how real physical shadows look — a sharp contact shadow plus a wide diffuse shadow.' } },
    { '@type': 'Question', name: 'How do I add a box-shadow in Tailwind CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Tailwind provides built-in shadow utilities: shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl, shadow-2xl, shadow-inner, and shadow-none. For custom shadows, use arbitrary values: shadow-[0_4px_24px_rgba(0,0,0,0.08)]. You can also extend the theme in tailwind.config.js under theme.extend.boxShadow to define named custom shadows.' } },
    { '@type': 'Question', name: 'Can I layer multiple box-shadows on a single element?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. CSS allows multiple comma-separated box-shadow values on a single element. The first value in the list is drawn on top: box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06). Layering a sharp, close shadow with a soft, far shadow creates a realistic depth effect similar to Material Design elevation. This generator supports multi-layer shadows with the "Add layer" button.' } },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate a CSS Box Shadow',
  totalTime: 'PT2M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Choose a preset or start from scratch', text: 'Click any preset (Soft card, Glow, Brutal, etc.) to load it, or adjust the sliders to build your own shadow from scratch.' },
    { '@type': 'HowToStep', position: 2, name: 'Adjust shadow properties', text: 'Use the sliders to set X offset, Y offset, blur, spread, opacity, and color. Toggle "Inset" for inner shadows.' },
    { '@type': 'HowToStep', position: 3, name: 'Add more layers if needed', text: 'Click "Add layer" to stack multiple shadows. Each layer is independently controllable.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy the CSS', text: 'Click "Copy CSS" to copy the complete box-shadow property to your clipboard and paste it into your stylesheet.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'CSS Box Shadow Generator', item: canonicalUrl },
  ],
};

export default function CssBoxShadowPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CssBoxShadowClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="Design Better Shadows — Stop Guessing Values">
          <SEOProse>
            Writing CSS box-shadow by hand is a guessing game. You set <C>box-shadow: 0 4px 16px rgba(0,0,0,0.1)</C>,
            reload the page, it is too light, you try <C>0.15</C>, still not right, now try adding a second layer,
            adjust the spread, realize the blur is too aggressive… and twenty minutes later you have a shadow that
            is fine but not great.
          </SEOProse>
          <SEOProse>
            This tool gives you visual sliders for every property — X offset, Y offset, blur, spread, color, and
            opacity — with a live preview that updates as you drag. Stack multiple shadow layers for depth.
            Preview on white, grey, dark, or navy backgrounds. Start from one of 8 presets (soft card, float,
            glow, brutal offset, pressed inset, layered) and customize from there. Copy the ready-to-paste CSS
            in one click.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Build the Perfect Shadow in Under 2 Minutes">
          <HowItWorks steps={[
            { n: '01', title: 'Pick a preset', desc: 'Start from Soft card, Float, Glow, Brutal, Pressed, or Layered — each is a production-ready shadow pattern used by real design systems.' },
            { n: '02', title: 'Adjust with sliders', desc: 'Drag X offset, Y offset, Blur, Spread, and Opacity sliders. The preview card updates in real time on your chosen background.' },
            { n: '03', title: 'Layer shadows', desc: 'Click "Add layer" to stack multiple shadows. Toggle visibility or delete any layer independently. Multi-layer shadows create more realistic depth.' },
            { n: '04', title: 'Copy the CSS', desc: 'The CSS output panel shows the complete box-shadow property with correct rgba values. Click "Copy CSS" and paste into your stylesheet.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When to Reach for a CSS Shadow Generator">
          <UseCases cases={[
            { icon: '🃏', title: 'Card Components', desc: 'Create the perfect card elevation shadow that looks natural on both white and near-white backgrounds without a harsh outline.' },
            { icon: '🔘', title: 'Buttons & CTAs', desc: 'Add a subtle lift shadow to primary buttons that deepens on hover, and an inset pressed shadow for the active/click state.' },
            { icon: '✨', title: 'Glow Effects', desc: 'Design colored glow effects for brand elements, neon UI, or highlight states using layered zero-offset colored shadows.' },
            { icon: '🪟', title: 'Modal & Drawer', desc: 'Build the deep, wide shadow that makes modals and side drawers feel elevated above the rest of the page content.' },
            { icon: '🗿', title: 'Brutalist UI', desc: 'Generate the sharp, hard-offset box shadows used in neo-brutalist and retro UI design styles (no blur, full opacity).' },
            { icon: '💎', title: 'Glassmorphism', desc: 'Combine inset top-highlight shadows with outer glow shadows to achieve the glass-like frosted depth effect.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            { q: 'What is CSS box-shadow?', a: 'The CSS box-shadow property adds shadow effects around an element. Each shadow has X offset, Y offset, blur radius, spread radius, color, and an optional inset keyword. Multiple shadows are comma-separated.' },
            { q: 'Can I layer multiple box shadows?', a: 'Yes. CSS allows multiple comma-separated shadows on one element. Layering a tight sharp shadow with a wide diffuse shadow creates more realistic and visually rich depth than a single shadow.' },
            { q: 'What does "inset" do?', a: 'Inset changes the shadow from outside the element to inside. It is used for pressed button states, input focus rings, and inner-light glass effects.' },
            { q: 'How do I create a glow effect?', a: 'Set X and Y to 0, use a moderate blur (20-60px), spread of 2-8px, and a colored semi-transparent color. Layer two shadows: one tight with higher opacity, one wider with lower opacity for an ambient glow.' },
            { q: 'What is the difference between box-shadow and filter: drop-shadow()?', a: <>CSS <C>box-shadow</C> applies to the element's rectangular box. <C>filter: drop-shadow()</C> follows the actual rendered shape including transparent areas — ideal for PNG images and SVGs. Only <C>box-shadow</C> supports inset shadows and multiple layers.</> },
            { q: 'How do I make a CSS box-shadow work on dark backgrounds?', a: 'On dark backgrounds, dark shadows are invisible. Use a colored glow instead: set shadow color to a semi-transparent brand color (e.g., rgba(139,92,246,0.4)) with zero offset and large blur. This creates a neon glow effect visible on dark surfaces.' },
            { q: 'How do I create a pressed button shadow in CSS?', a: <>Use <C>inset</C> on the <C>:active</C> state: <C>box-shadow: inset 0 2px 6px rgba(0,0,0,0.3)</C>. Combine with <C>transform: translateY(2px)</C> for a realistic pressed effect.</> },
            { q: 'How do I create a material design elevation shadow?', a: 'Material elevation uses two layered shadows: a key shadow (smaller, more opaque) and an ambient shadow (larger, less opaque). For 4dp elevation: box-shadow: 0 2px 4px rgba(0,0,0,0.3), 0 3px 10px rgba(0,0,0,0.15).' },
            { q: 'Can I use box-shadow to create a border effect?', a: <>Yes. Set X, Y, and blur to 0 and use only spread: <C>box-shadow: 0 0 0 2px #3B82F6</C>. This creates a solid border that does not affect the element's layout — ideal for focus rings.</> },
            { q: 'How do I make a soft card shadow in CSS?', a: 'For a natural card shadow: box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.06). Two layers — a wide diffuse shadow plus a tight contact shadow — mimic real physical shadow behavior.' },
            { q: 'How do I add a custom box-shadow in Tailwind CSS?', a: <>Use built-in utilities (<C>shadow-sm</C> to <C>shadow-2xl</C>) or arbitrary values: <C>shadow-[0_4px_24px_rgba(0,0,0,0.08)]</C>. Extend named shadows in <C>tailwind.config.js</C> under <C>theme.extend.boxShadow</C>.</> },
            { q: 'Can I layer multiple box-shadows on a single element?', a: <>Yes — CSS supports comma-separated shadow layers, drawn front to back. Combine a tight contact shadow with a wide diffuse one: <C>box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.06)</C>. This generator's "Add layer" button lets you build and preview multi-layer shadows visually.</> },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/color-picker', label: 'Color Picker', desc: 'Pick RGBA shadow colors and check contrast ratios', icon: '🎨' },
            { href: '/svg-to-image', label: 'SVG to Image', desc: 'Export your shadowed component design as PNG or JPEG', icon: '🖼️' },
            { href: '/markdown-preview', label: 'Markdown Preview', desc: 'Preview CSS code in documentation with syntax highlighting', icon: '📝' },
            { href: '/regex-tester', label: 'Regex Tester', desc: 'Test CSS selector patterns and media query expressions', icon: '🔍' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'CSS Shadow Design Patterns' },
            { href: '/blog/json-best-practices-production-guide', label: 'Tailwind CSS Shadow Guide' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Glassmorphism UI Design' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'CSS Performance Best Practices' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="css_box_shadow" />
    </>
  );
}
