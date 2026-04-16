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
    'color picker online free',
    'hex color picker',
    'rgb color picker',
    'hsl color picker',
    'cmyk color converter online',
    'web color picker',
    'css color picker',
    'color picker no signup',
    'color picker developer tool',
    'color format converter',
    'hex to cmyk',
    'rgb to hsl',
    'rgb to cmyk',
    'hsl to rgb',
    'cmyk to rgb',
    'cmyk to hex',
    'color accessibility checker',
    'wcag aa contrast checker',
    'wcag aaa contrast checker',
    'contrast ratio calculator',
    'color contrast checker online',
    'tailwind css color generator',
    'tailwind palette generator',
    'color shade generator',
    'color tint generator',
    'color palette from hex',
    'design token color',
    'css custom property color',
    'css variable color generator',
    'color picker figma alternative',
    'color picker sketch alternative',
    'color picker adobe alternative',
    'color harmony generator',
    'complementary color calculator',
    'triadic color calculator',
    'analogous color calculator',
    'color wheel online',
    'hsv color picker',
    'html color picker',
    'color name from hex',
    'nearest color name',
    'pick color from screen',
    'color converter tool free',
    'hex color code picker',
    'rgb to hex converter online',
    'color picker no install',
    'css color picker online',
    'web design color tool',
    'ui color picker',
    'developer color tool',
    'eyedropper color picker online',
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
    {
      '@type': 'Question',
      name: 'How do I convert RGB to HEX?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Enter your R, G, B values (0–255 each) in the RGB fields and the HEX equivalent is calculated instantly. Mathematically, each channel is converted to its two-digit hexadecimal representation and concatenated: R=255, G=99, B=132 becomes #FF6384.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a color to CMYK?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your HEX or RGB color into the tool and the CMYK values are shown automatically. CMYK is calculated from RGB by first normalizing to 0–1 scale, then finding the Key (black) value as 1 minus the max channel, and deriving Cyan, Magenta, and Yellow from the remaining channels. CMYK is used in print design, while RGB and HEX are used in digital design.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I generate a Tailwind CSS color palette from a brand color?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paste your brand HEX color into the tool and the Tailwind shade palette tab generates shades from 50 (lightest) to 950 (darkest), similar to Tailwind\'s built-in color scales. Copy the shade values and paste them into your tailwind.config.js under theme.extend.colors to extend your palette.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is color harmony and how is it used in design?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Color harmony refers to color relationships on the color wheel that create visually pleasing combinations. Complementary colors are opposite on the wheel (high contrast). Analogous colors are adjacent (harmonious, calm). Triadic colors are evenly spaced 120° apart (vibrant balance). Split-complementary uses one base color plus two adjacent to its complement for high contrast with less tension.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I check color contrast for accessibility (WCAG)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Select your foreground color (text color) and background color, and the tool calculates the WCAG contrast ratio. A ratio of 4.5:1 or higher passes WCAG 2.1 Level AA for normal text. A ratio of 7:1 or higher passes Level AAA. Large text (18pt+ or 14pt bold) only requires 3:1 for AA. The tool shows pass/fail badges for both standards.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between RGB and CMYK color models?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'RGB (Red, Green, Blue) is an additive color model used in digital displays — colors are made by mixing light. CMYK (Cyan, Magenta, Yellow, Key/Black) is a subtractive model used in print — colors are made by absorbing light with ink on paper. A color that looks vibrant on screen in RGB may appear duller when printed in CMYK due to the smaller gamut of physical inks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I generate CSS variables for a color?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Select your color and click the CSS Variables tab. The tool generates a complete :root { } block with --color (HEX), --color-rgb (comma-separated RGB values for use with rgba()), and --color-hsl (HSL values) custom properties. Copy and paste the block into your global stylesheet.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I pick a color from my screen using a color picker?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Modern browsers support the EyeDropper API, which lets you sample any pixel on your screen directly from a web page. Click the eyedropper icon in the tool and then click any pixel on your screen to capture its color. This works on Chrome and Edge (desktop). On Safari or mobile, use the native OS color picker (available in design apps like Figma, Sketch, or the macOS Digital Color Meter utility) and paste the HEX value into this tool.',
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
            {
              q: 'How do I convert RGB to HEX?',
              a: <>Enter your R, G, B values (0–255) in the RGB fields and the HEX equivalent updates instantly. Each channel is converted to its two-digit hex: R=255, G=99, B=132 becomes <C>#FF6384</C>.</>,
            },
            {
              q: 'How do I convert a color to CMYK?',
              a: 'Paste your HEX or RGB color and CMYK values appear automatically. CMYK is derived by normalizing RGB to 0–1, finding the Key (black) as 1 minus the max channel, then calculating Cyan, Magenta, and Yellow from the remaining channels.',
            },
            {
              q: 'How do I generate a Tailwind CSS color palette from a brand color?',
              a: <>The Tailwind shade tab generates shades from 50 (lightest) to 950 (darkest) from your brand color. Copy the values and paste into <C>tailwind.config.js</C> under <C>theme.extend.colors</C> to extend your palette.</>,
            },
            {
              q: 'What is color harmony?',
              a: 'Color harmony refers to pleasing color relationships from the color wheel. Complementary (opposite, high contrast), analogous (adjacent, calm), and triadic (120° apart, vibrant) are the most common schemes used in UI and graphic design.',
            },
            {
              q: 'How do I check color contrast for WCAG accessibility?',
              a: 'Select your foreground and background colors — the tool calculates the WCAG contrast ratio instantly. 4.5:1 passes Level AA for normal text. 7:1 passes AAA. Large text (18pt+) only requires 3:1 for AA.',
            },
            {
              q: 'What is the difference between RGB and CMYK?',
              a: 'RGB is an additive model for digital displays (mixing light). CMYK is a subtractive model for print (absorbing light with ink). Colors vibrant on screen in RGB may look duller in CMYK print due to the smaller ink gamut.',
            },
            {
              q: 'How do I generate CSS variables for a color?',
              a: <>Click the CSS Variables tab to get a complete <C>:root { }</C> block with <C>--color</C> (HEX), <C>--color-rgb</C> (for <C>rgba()</C>), and <C>--color-hsl</C> custom properties — ready to paste into your stylesheet.</>,
            },
            {
              q: 'How do I pick a color from my screen using a color picker?',
              a: <>Chrome and Edge support the EyeDropper API — click the eyedropper icon to sample any pixel on your screen. On Safari or mobile, use a design app like Figma or the macOS Digital Color Meter, then paste the resulting HEX value into this tool.</>,
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
