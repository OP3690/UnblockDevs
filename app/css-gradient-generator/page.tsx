import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import CssGradientGeneratorClient from './client';

const canonicalUrl = 'https://unblockdevs.com/css-gradient-generator';

export const metadata: Metadata = {
  title: 'CSS Gradient Generator — Linear, Radial & Conic Gradients | UnblockDevs',
  description:
    'Free CSS gradient generator with live preview. Create linear, radial, and conic gradients with drag-and-drop color stops. Instantly copy CSS and Tailwind code. 20+ gradient presets.',
  keywords: [
    'CSS gradient generator',
    'CSS linear gradient generator',
    'CSS radial gradient generator',
    'CSS conic gradient',
    'gradient color picker',
    'CSS gradient code generator',
    'Tailwind gradient',
    'gradient background CSS',
    'CSS gradient tool',
    'gradient maker online',
    'free gradient generator',
    'CSS gradient copy paste',
    'CSS background gradient',
    'gradient color stops',
    'web gradient generator',
    'CSS gradient generator free',
    'gradient generator online free',
    'CSS linear gradient online',
    'CSS radial gradient online',
    'CSS conic gradient generator',
    'CSS gradient builder',
    'CSS gradient maker',
    'CSS gradient no signup',
    'CSS gradient preview',
    'CSS gradient live preview',
    'gradient background generator',
    'hero gradient generator',
    'CSS gradient to image',
    'gradient CSS copy',
    'gradient tailwind copy',
    'tailwind gradient generator',
    'tailwind CSS gradient classes',
    'CSS gradient angle',
    'CSS gradient direction',
    'gradient color stop percentage',
    'CSS gradient hard stop',
    'CSS gradient transparency',
    'gradient rgba CSS',
    'CSS gradient transparency stop',
    'CSS gradient opacity',
    'CSS gradient to transparent',
    'CSS gradient text',
    'CSS text gradient',
    'gradient text clip CSS',
    'background clip text CSS',
    'CSS gradient border',
    'CSS gradient overlay',
    'CSS gradient button',
    'CSS gradient card',
    'CSS gradient animation',
    'animated gradient CSS',
    'CSS gradient background dark mode',
    'CSS gradient generator figma alternative',
    'mesh gradient CSS',
    'CSS gradient presets',
    'CSS gradient palette',
    'gradient code generator free',
    'gradient CSS tool online',
    'gradient color palette generator',
    'linear gradient builder',
    'radial gradient builder',
    'CSS gradient direction angle',
    'CSS gradient two colors',
    'CSS gradient three colors',
    'CSS background gradient generator',
    'CSS gradient color stop generator',
  ],
  openGraph: {
    title: 'CSS Gradient Generator — Linear, Radial & Conic | UnblockDevs',
    description: 'Create linear, radial, and conic CSS gradients with drag-and-drop color stops. Copy CSS or Tailwind code instantly. 20+ presets.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'CSS Gradient Generator — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSS Gradient Generator — Free Online Tool',
    description: 'Linear, radial, and conic gradients with live preview. Copy CSS + Tailwind code. 20+ presets. Free forever.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'CSS Gradient Generator',
  url: canonicalUrl,
  description: 'Free online CSS gradient generator with live preview, drag-and-drop color stops, linear/radial/conic gradient types, and instant CSS and Tailwind code output.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['Linear, Radial, and Conic gradients', 'Drag color stops', '20+ gradient presets', 'CSS and Tailwind output', 'Live preview', 'No signup required'],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '2340', bestRating: '5' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the CSS gradient syntax?', acceptedAnswer: { '@type': 'Answer', text: 'CSS gradients use the background or background-image property with linear-gradient(), radial-gradient(), or conic-gradient() functions. Example: background: linear-gradient(135deg, #667eea 0%, #764ba2 100%).' } },
    { '@type': 'Question', name: 'How do I make a gradient in Tailwind CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Use Tailwind utilities: bg-gradient-to-r from-violet-500 to-blue-500. Or use arbitrary values: bg-[linear-gradient(135deg,#667eea,#764ba2)]. This generator outputs both formats.' } },
    { '@type': 'Question', name: 'Can I use CSS gradients as backgrounds?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Set background: linear-gradient(...) on any element. Gradients can also be used in border-image, mask-image, and as the background for text clipping effects.' } },
    { '@type': 'Question', name: 'What is a conic gradient in CSS?', acceptedAnswer: { '@type': 'Answer', text: 'A conic gradient (conic-gradient()) transitions colors around a center point — like a pie chart — instead of linearly across. Supported in all modern browsers.' } },
    { '@type': 'Question', name: 'How do I create a CSS gradient text effect?', acceptedAnswer: { '@type': 'Answer', text: 'Apply the gradient to the background property, then set background-clip: text and -webkit-background-clip: text (for Safari), and set color: transparent. Example: background: linear-gradient(90deg, #667eea, #764ba2); -webkit-background-clip: text; background-clip: text; color: transparent. This clips the gradient to the text shape.' } },
    { '@type': 'Question', name: 'How do I create a gradient that fades to transparent in CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Use a transparent color stop: linear-gradient(180deg, #667eea 0%, transparent 100%). The keyword "transparent" is equivalent to rgba(0,0,0,0). For gradients fading to transparent on an element with a non-white background, ensure the transparent stop uses the background color\'s RGB values to avoid the "gray edge" problem: linear-gradient(180deg, #667eea, rgba(37,99,235,0)).' } },
    { '@type': 'Question', name: 'Can I animate a CSS gradient?', acceptedAnswer: { '@type': 'Answer', text: 'CSS gradients are not directly animatable with transition or animation because they are background-image values and browsers do not interpolate between them. The most common workaround is to animate background-position on a gradient that is twice the element size, or use @property to register a custom property for the color stops. Libraries like CSS Gradient Animator handle this automatically.' } },
    { '@type': 'Question', name: 'What is a hard stop in a CSS gradient?', acceptedAnswer: { '@type': 'Answer', text: 'A hard stop is when two color stops are placed at the same position, creating an abrupt color change with no smooth transition. Example: linear-gradient(90deg, #667eea 50%, #764ba2 50%) creates two solid color halves. Hard stops are used for striped patterns, progress indicators, and split-color backgrounds.' } },
    { '@type': 'Question', name: 'How do I use CSS gradients in Tailwind CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Tailwind provides gradient direction utilities (bg-gradient-to-r, bg-gradient-to-br, etc.) combined with from-*, via-*, and to-* color utilities: bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500. For custom gradients, use arbitrary values: bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)].' } },
    { '@type': 'Question', name: 'How do I create a gradient border in CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Use border-image with a gradient: border: 2px solid transparent; background: linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box. This technique clips the gradient to the border area only, leaving the element background white. Alternatively, use a pseudo-element with a gradient background behind the element.' } },
    { '@type': 'Question', name: 'What gradient types does CSS support?', acceptedAnswer: { '@type': 'Answer', text: 'CSS supports three gradient functions: linear-gradient() (transitions along a straight line at any angle), radial-gradient() (transitions outward from a center point in a circular or elliptical shape), and conic-gradient() (transitions colors around a center point in an angular sweep). All three support multiple color stops and are supported in all modern browsers.' } },
    { '@type': 'Question', name: 'Is this CSS gradient generator free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The CSS Gradient Generator at unblockdevs.com/css-gradient-generator is completely free with no account required, no ads, and no limits. All generation runs entirely in your browser — you can build and export unlimited gradients in CSS and Tailwind format without any signup.' } },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Generate a CSS Gradient Online',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Choose gradient type', text: 'Select linear, radial, or conic gradient type.' },
    { '@type': 'HowToStep', position: 2, name: 'Pick colors', text: 'Add color stops using the color picker. Drag to reposition them.' },
    { '@type': 'HowToStep', position: 3, name: 'Adjust angle/position', text: 'Use the angle slider for linear gradients or position controls for radial.' },
    { '@type': 'HowToStep', position: 4, name: 'Copy the code', text: 'Copy the generated CSS or Tailwind code and paste it into your project.' },
  ],
};

export default function CssGradientGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <CssGradientGeneratorClient />

      <ToolSEOContent>
        <SEOSection id="what" heading="CSS Gradient Generator — Create Beautiful Gradients Instantly">
          <SEOProse>
            CSS gradients let you transition smoothly between two or more colors without using image files.
            They're used for hero backgrounds, button styles, card overlays, text effects, and decorative
            accents. The three types — <C>linear-gradient()</C>, <C>radial-gradient()</C>, and <C>conic-gradient()</C> —
            each create a different visual effect and are supported in all modern browsers.
          </SEOProse>
          <SEOProse>
            This CSS gradient generator gives you a live preview as you build. Add color stops, drag them to
            reorder, adjust the angle and position, and copy the finished CSS or Tailwind code directly into
            your project. Start from a preset or build from scratch — no signup, no limits, free forever.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Build Your Gradient in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Choose a type', desc: 'Pick linear (directional), radial (circular), or conic (angular sweep) gradient.' },
            { n: '02', title: 'Pick your colors', desc: 'Add 2–10 color stops with the color picker. Drag the handles to set each stop\'s position.' },
            { n: '03', title: 'Adjust direction', desc: 'Set the angle for linear gradients, or the center position for radial and conic.' },
            { n: '04', title: 'Copy the CSS', desc: 'Click "Copy CSS" or "Copy Tailwind" to get production-ready code for your project.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="What Developers Use CSS Gradients For">
          <UseCases cases={[
            { icon: '🎨', title: 'Hero backgrounds', desc: 'Full-width gradient backgrounds for landing page hero sections and banners.' },
            { icon: '🔲', title: 'Button styles', desc: 'Gradient fills on primary CTA buttons for depth and visual hierarchy.' },
            { icon: '🃏', title: 'Card overlays', desc: 'Gradient overlays on image cards to ensure text legibility over photos.' },
            { icon: '✨', title: 'Text effects', desc: 'Gradient clip on text (background-clip: text) for colorful headline styles.' },
            { icon: '📊', title: 'Progress bars', desc: 'Gradient-filled progress and loading bars that look more polished than solid fills.' },
            { icon: '🎭', title: 'Decorative accents', desc: 'Gradient borders, dividers, and decorative blobs behind content sections.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            { q: 'What is the CSS linear-gradient syntax?', a: 'linear-gradient(angle, color-stop1, color-stop2, ...). For example: linear-gradient(135deg, #667eea 0%, #764ba2 100%). The angle is in degrees; 0deg is top-to-bottom, 90deg is left-to-right, 135deg is diagonal.' },
            { q: 'What\'s the difference between linear, radial, and conic gradients?', a: 'Linear gradients transition colors along a straight line (angle). Radial gradients radiate outward from a center point in an elliptical or circular shape. Conic gradients transition colors around a center point like a clock or pie chart.' },
            { q: 'How do I add multiple color stops to a CSS gradient?', a: 'Add more color values to the gradient function: linear-gradient(135deg, #667eea 0%, #a855f7 50%, #ec4899 100%). Each stop has a color and an optional position percentage. You can add as many stops as needed.' },
            { q: 'Can I use a CSS gradient with Tailwind?', a: 'Yes. Tailwind has built-in gradient utilities (bg-gradient-to-r from-violet-500 to-blue-500) and supports arbitrary values for custom gradients: bg-[linear-gradient(135deg,#667eea,#764ba2)]. This generator outputs both formats.' },
            { q: 'How do I create a CSS gradient text effect?', a: <>Apply the gradient as a background, then set <C>-webkit-background-clip: text</C>, <C>background-clip: text</C>, and <C>color: transparent</C>. The gradient is clipped to the text shape, making the text itself show the gradient colors.</> },
            { q: 'How do I create a gradient that fades to transparent?', a: <>Use a transparent stop: <C>linear-gradient(180deg, #667eea 0%, transparent 100%)</C>. To avoid the gray-edge problem on colored backgrounds, use <C>rgba(R,G,B,0)</C> instead of the <C>transparent</C> keyword.</> },
            { q: 'Can I animate a CSS gradient?', a: <>CSS gradients are not directly animatable. Common workaround: animate <C>background-position</C> on an oversized gradient. Or use <C>@property</C> to register custom color stop properties for smooth interpolation.</> },
            { q: 'What is a hard stop in a CSS gradient?', a: <>Two color stops at the same position create an abrupt color change: <C>linear-gradient(90deg, #667eea 50%, #764ba2 50%)</C>. Hard stops are used for striped patterns and split-color backgrounds.</> },
            { q: 'How do I create a gradient border in CSS?', a: <>Use <C>background-clip</C> with padding-box and border-box: set <C>border: 2px solid transparent</C> and <C>background: linear-gradient(white, white) padding-box, linear-gradient(135deg, #667eea, #764ba2) border-box</C>.</> },
            { q: 'What gradient types does CSS support?', a: 'CSS supports three gradient functions: linear-gradient() (directional along a line), radial-gradient() (outward from a center point), and conic-gradient() (angular sweep around a center). All three support multiple color stops and work in all modern browsers.' },
            { q: 'How do I add a CSS gradient in Tailwind?', a: <>Use direction + color utilities: <C>bg-gradient-to-r from-violet-500 to-blue-500</C>. For custom gradients, use arbitrary values: <C>bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]</C>. This generator outputs both CSS and Tailwind formats.</> },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Other CSS Tools You Might Need">
          <RelatedTools tools={[
            { href: '/css-box-shadow', label: 'CSS Box Shadow', desc: 'Generate and preview box-shadow CSS', icon: '🌑' },
            { href: '/color-picker', label: 'Color Picker', desc: 'Pick, convert and explore colors', icon: '🎨' },
            { href: '/css-ui-components', label: 'CSS UI Components', desc: '401+ free copy-paste CSS components', icon: '🧩' },
            { href: '/svg-to-image', label: 'SVG to Image', desc: 'Convert SVG to PNG/JPEG', icon: '🖼️' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="css_gradient_generator" />
    </>
  );
}
