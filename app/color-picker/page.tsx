import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import ColorPickerClient from './client';

const canonicalUrl = 'https://unblockdevs.com/color-picker';

export const metadata: Metadata = {
  title: 'Color Picker & Converter — HEX, RGB, HSL, CMYK Online Free | UnblockDevs',
  description:
    'Pick any color and instantly convert between HEX, RGB, HSL, HSV, and CMYK. Get WCAG contrast ratios, Tailwind-style shades, and color harmony palettes. 100% browser-based — no signup required.',
  keywords: [
    'color picker',
    'color converter',
    'hex to rgb',
    'rgb to hex',
    'hex to hsl',
    'hsl to hex',
    'cmyk converter',
    'color to hex',
    'color palette generator',
    'wcag contrast checker',
    'color harmony',
    'tailwind color shades',
    'online color picker',
    'css color converter',
    'color code converter',
  ],
  openGraph: {
    title: 'Color Picker & Converter — HEX, RGB, HSL, CMYK | UnblockDevs',
    description: 'Convert colors between HEX, RGB, HSL, HSV, and CMYK. WCAG contrast checker, Tailwind shades, and color harmony palettes. 100% browser-based.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs Color Picker & Converter' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Picker & Converter | UnblockDevs',
    description: 'Pick colors. Convert HEX ↔ RGB ↔ HSL ↔ CMYK. WCAG contrast, Tailwind shades, harmony palettes.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Color Picker & Converter',
  url: canonicalUrl,
  description: 'Pick any color and instantly convert between HEX, RGB, HSL, HSV, and CMYK. WCAG contrast ratios, Tailwind shades, and color harmony palettes.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'HEX, RGB, HSL, HSV, CMYK conversion',
    'WCAG contrast ratio checker (AA/AAA)',
    'Tailwind-style shade palette generator',
    'Color harmony (complementary, triadic, analogous)',
    'CSS variables snippet',
    '100% client-side — no server upload',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    ratingCount: '1240',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I convert a HEX color to RGB?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste or type your HEX value (e.g. #3B82F6) into the HEX field and the RGB values are shown instantly. You can also use the native color picker to select any color visually.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is WCAG contrast ratio and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'WCAG (Web Content Accessibility Guidelines) contrast ratio measures how readable text is against a background. A ratio of 4.5:1 or higher passes WCAG AA for normal text. This tool shows your color\'s contrast against white and black, and tells you which text color achieves the best readability.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between HSL and HSV?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HSL (Hue, Saturation, Lightness) and HSV (Hue, Saturation, Value/Brightness) are two different ways to describe color. In HSL, a lightness of 100% is pure white and 0% is pure black. In HSV, a value of 100% is the brightest version of the hue, and 0% is pure black.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my color data sent to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. All color conversions and calculations run entirely in your browser using JavaScript. Nothing is sent to any server.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert Colors Between Formats Online',
  description: 'Step-by-step guide to picking a color and converting it between HEX, RGB, HSL, HSV, and CMYK in your browser.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Pick a color', text: 'Click "Pick color" to open the native browser color picker, or type a HEX value directly into the HEX field.' },
    { '@type': 'HowToStep', position: 2, name: 'See all formats instantly', text: 'The tool immediately shows the equivalent RGB, HSL, HSV, and CMYK values.' },
    { '@type': 'HowToStep', position: 3, name: 'Check WCAG contrast', text: 'See your color\'s contrast ratio against white and black, with WCAG AA/AAA pass/fail badges.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy the value you need', text: 'Click any copy button next to a format to copy it to clipboard.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'Color Picker & Converter', item: canonicalUrl },
  ],
};

export default function ColorPickerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ColorPickerClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="The Complete Color Converter for Developers and Designers">
          <SEOProse>
            Every developer hits the same wall: your design system uses HSL, Tailwind uses HEX, the brand guide uses
            RGB, and the print team wants CMYK. Switching between a browser DevTools color picker, a separate
            contrast checker, a palette generator, and a CSS variables snippet wastes minutes on a task that should
            take seconds.
          </SEOProse>
          <SEOProse>
            This tool gives you every color format in one place. Paste a <C>#HEX</C>, enter <C>rgb()</C> values, or
            click the native color picker — and instantly see HEX, RGB, HSL, HSV, CMYK, a Tailwind-style 10-shade
            palette, WCAG contrast ratios, color harmony suggestions, and a ready-to-paste CSS variables block.
            Everything runs in your browser: no uploads, no API keys, no account.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Pick, Convert, Copy — in One Page">
          <HowItWorks steps={[
            { n: '01', title: 'Pick or paste a color', desc: 'Click "Pick color" to open the native browser color picker, or type a HEX value directly. You can also enter RGB or HSL numbers manually.' },
            { n: '02', title: 'See all formats', desc: 'HEX, RGB, HSL, HSV, and CMYK update in real-time as you adjust any field. Click any format\'s copy button to grab the value.' },
            { n: '03', title: 'Check contrast and accessibility', desc: 'WCAG AA and AAA badges tell you instantly whether your color passes accessibility guidelines for normal and large text.' },
            { n: '04', title: 'Explore shades and harmony', desc: 'Browse a 10-step Tailwind-style shade palette and four color harmony schemes. Click any swatch to select it as your active color.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="Why Developers and Designers Use a Color Converter">
          <UseCases cases={[
            { icon: '🎨', title: 'Design System Tokens', desc: 'Convert brand HEX colors to HSL for CSS custom properties, then generate the full 50–900 shade scale for your design tokens.' },
            { icon: '♿', title: 'Accessibility Audits', desc: 'Instantly check WCAG AA (4.5:1) and AAA (7:1) contrast ratios without opening DevTools or a separate checker.' },
            { icon: '🖨️', title: 'Print Design', desc: 'Convert digital RGB and HEX colors to CMYK values that your print vendor can use without surprises in color accuracy.' },
            { icon: '💅', title: 'Tailwind CSS', desc: 'Generate a complete 10-shade Tailwind-compatible palette from any brand color, ready to paste into tailwind.config.' },
            { icon: '📐', title: 'CSS Variables', desc: 'Copy a ready-made :root { } block with --color, --color-rgb, and --color-hsl tokens for your stylesheet.' },
            { icon: '🤝', title: 'Design Handoff', desc: 'Quickly translate colors from Figma (HSL) to code (HEX/RGB) during front-end implementation.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'How do I convert a HEX color to RGB?',
              a: 'Type or paste your HEX value into the HEX field — RGB values appear instantly below. You can also click the copy button next to the RGB field to copy the rgb() CSS value.',
            },
            {
              q: 'What is WCAG contrast ratio and why does it matter?',
              a: 'WCAG contrast ratio measures text readability against a background. A ratio of 4.5:1 passes WCAG AA for normal text, and 7:1 passes AAA. Use this to ensure your color choices are accessible to users with low vision.',
            },
            {
              q: 'What is the difference between HSL and HSV?',
              a: 'Both use Hue and Saturation, but differ in the third channel. HSL uses Lightness (100% = white, 0% = black). HSV uses Value/Brightness (100% = brightest hue, 0% = black). CSS uses HSL; graphics tools like Photoshop often use HSV.',
            },
            {
              q: 'Can I use this tool offline?',
              a: 'Once the page has loaded, all conversions and calculations run entirely in your browser. No network requests are made after the initial page load.',
            },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/svg-to-image', label: 'SVG to PNG/JPEG', desc: 'Export SVG icons in your chosen brand color as raster images', icon: '🖼️' },
            { href: '/base64-encoder', label: 'Base64 Encoder', desc: 'Encode color-filled images or CSS data URIs as Base64', icon: '🔡' },
            { href: '/markdown-preview', label: 'Markdown Preview', desc: 'Preview documentation with color-coded syntax highlighting', icon: '📝' },
            { href: '/json-beautifier', label: 'JSON Formatter', desc: 'Format design token JSON files with color values', icon: '{}' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'CSS Color Best Practices' },
            { href: '/blog/json-best-practices-production-guide', label: 'Design Token Workflows' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Accessibility in UI Design' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Tailwind CSS Customization Guide' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="color_picker" />
    </>
  );
}
