import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools, RelatedBlogPosts,
} from '@/components/tools/ToolSEOContent';
import SvgToImageClient from './client';

const canonicalUrl = 'https://unblockdevs.com/svg-to-image';

export const metadata: Metadata = {
  title: 'SVG to PNG/JPEG Converter — Convert SVG to Image Online Free | UnblockDevs',
  description:
    'Convert SVG code or files to PNG or JPEG instantly. Set custom size and scale, preview before export. 100% browser-based — your SVG never leaves your device.',
  keywords: [
    'svg to jpeg',
    'svg to png',
    'convert svg to image',
    'svg export',
    'svg converter',
    'svg to jpg',
    'svg to png online',
    'svg to jpeg converter',
    'svg to image online',
    'convert svg to png free',
    'svg png export',
  ],
  openGraph: {
    title: 'SVG to PNG/JPEG Converter — Convert SVG to Image Online Free | UnblockDevs',
    description: 'Convert SVG to PNG or JPEG in your browser. Set custom size and scale, preview before export. No uploads, no signup.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs SVG to PNG/JPEG Converter' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SVG to PNG/JPEG Converter — Convert SVG to Image | UnblockDevs',
    description: 'Convert SVG to PNG or JPEG instantly. Custom size, live preview. 100% browser-based.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'SVG to PNG/JPEG Converter',
  url: canonicalUrl,
  description: 'Convert SVG code or files to PNG or JPEG instantly. Set custom size and scale, preview before export. 100% browser-based.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Convert SVG to PNG or JPEG',
    'Custom width, height, and scale',
    'Live preview',
    'Paste SVG code or upload file',
    '100% client-side — no server upload',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '830',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why would I convert an SVG to PNG or JPEG?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SVG is a vector format that scales perfectly at any size, but many platforms — Twitter, Slack, email clients, PDF renderers, and older CMS systems — do not support SVG. Converting to PNG or JPEG produces a raster image that works everywhere.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between PNG and JPEG output?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PNG is lossless and supports transparency, making it ideal for logos, icons, and graphics with sharp edges. JPEG uses lossy compression to produce smaller file sizes, which works better for photographs and illustrations where slight quality loss is acceptable.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to convert SVG files in this tool?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The conversion runs entirely in your browser using the Canvas API. Your SVG code is never uploaded to any server, so proprietary icons, diagrams, and design assets stay private on your device.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert SVG to PNG or JPEG Online',
  description: 'Step-by-step guide to converting SVG markup to a raster image file in your browser.',
  totalTime: 'PT1M',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Paste SVG code', text: 'Paste your SVG markup directly or upload an .svg file from your device.' },
    { '@type': 'HowToStep', position: 2, name: 'Set size and scale', text: 'Enter a custom width and height in pixels, and choose a scale multiplier for high-DPI output.' },
    { '@type': 'HowToStep', position: 3, name: 'Preview the result', text: 'See a live preview of the raster output before exporting so you can fine-tune dimensions.' },
    { '@type': 'HowToStep', position: 4, name: 'Download PNG or JPEG', text: 'Choose your output format and download the converted image file to your device.' },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'SVG to PNG/JPEG Converter', item: canonicalUrl },
  ],
};

export default function SvgToImagePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SvgToImageClient />

      <ToolSEOContent>
        {/* What */}
        <SEOSection id="what" heading="Why Convert SVG to PNG or JPEG?">
          <SEOProse>
            SVG (Scalable Vector Graphics) is the best format for logos, icons, and diagrams. It is infinitely
            scalable, resolution-independent, and typically produces tiny file sizes. But the web platform does
            not always support it — Twitter strips SVG uploads, Slack cannot display inline SVG, most email
            clients ignore it, and embedding SVG in a PDF is unreliable without conversion.
          </SEOProse>
          <SEOProse>
            Converting to <strong>PNG</strong> gives you a lossless raster image with full transparency support —
            perfect for logos and icons that need sharp edges at a fixed size. Converting to <strong>JPEG</strong>{' '}
            produces a smaller file with lossy compression, better suited for photographs or illustrations where
            a slight reduction in quality is acceptable. This tool lets you choose output format, set exact pixel
            dimensions and a scale multiplier, preview the result, and download in one click — entirely in your
            browser.
          </SEOProse>
        </SEOSection>

        {/* How it works */}
        <SEOSection id="how" eyebrow="How it works" heading="Convert SVG to Image in Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Paste SVG code', desc: 'Paste your SVG markup directly or upload an .svg file from your device.' },
            { n: '02', title: 'Set size and scale', desc: 'Enter a custom width and height in pixels, and choose a scale multiplier for high-DPI output.' },
            { n: '03', title: 'Preview the result', desc: 'See a live preview of the raster output before exporting so you can fine-tune dimensions.' },
            { n: '04', title: 'Download PNG or JPEG', desc: 'Choose your output format and download the converted image file to your device.' },
          ]} />
        </SEOSection>

        {/* Use cases */}
        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Convert SVG to Image">
          <UseCases cases={[
            { icon: '📱', title: 'Social Media Posts', desc: 'Twitter, LinkedIn, and Instagram require raster images. Export your SVG logo or banner as PNG for social sharing.' },
            { icon: '✉️', title: 'Email Signatures', desc: 'Most email clients block SVG for security reasons. Convert your logo to PNG for a universally supported email signature.' },
            { icon: '🌐', title: 'Favicon Export', desc: 'Generate a high-resolution PNG from your SVG favicon for use in web app manifests and PWA icon sets.' },
            { icon: '📲', title: 'App Icons', desc: 'Export your SVG icon at multiple resolutions (1x, 2x, 3x) for iOS and Android by adjusting the scale multiplier.' },
            { icon: '📄', title: 'PDF Embedding', desc: 'PDFs created outside the browser often cannot render SVG. Convert to PNG first for reliable embedding in reports and presentations.' },
            { icon: '💬', title: 'Slack / Teams Sharing', desc: 'Chat platforms render PNG and JPEG inline in messages. Export your SVG diagrams so teammates see the image without downloading a file.' },
          ]} />
        </SEOSection>

        {/* FAQ */}
        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            {
              q: 'Why would I convert an SVG to PNG or JPEG?',
              a: 'SVG is vector-based and scales perfectly, but many platforms — Twitter, Slack, email clients, and PDF renderers — do not support SVG. Converting to PNG or JPEG produces a raster image that works universally.',
            },
            {
              q: 'What is the difference between PNG and JPEG output?',
              a: 'PNG is lossless and supports transparency — ideal for logos and icons with sharp edges. JPEG uses lossy compression for smaller file sizes, better suited for photographs and illustrations where slight quality reduction is acceptable.',
            },
            {
              q: 'Is it safe to convert my SVG files here?',
              a: 'Yes. Conversion runs entirely in your browser using the Canvas API. Your SVG is never uploaded to any server, so proprietary icons, diagrams, and design assets stay private on your device.',
            },
            {
              q: 'How do I export a high-resolution PNG from my SVG?',
              a: 'Set the width and height to your target display size, then increase the scale multiplier — for example, set scale to 2 for a @2x Retina image or 3 for a @3x image. The output pixel dimensions will be width × scale by height × scale.',
            },
          ]} />
        </SEOSection>

        {/* Related tools */}
        <SEOSection id="related" eyebrow="Related tools" heading="Tools You Might Also Need">
          <RelatedTools tools={[
            { href: '/json-beautifier', label: 'JSON Beautifier', desc: 'Format JSON and XML — SVG is valid XML under the hood', icon: '{}' },
            { href: '/base64-encoder', label: 'Base64 Encoder', desc: 'Encode your converted image as Base64 for embedding in CSS or HTML', icon: '🔡' },
            { href: '/uuid-generator', label: 'UUID Generator', desc: 'Generate unique IDs for image asset filenames and manifests', icon: '🔑' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'Compute checksums of your exported image files for integrity checks', icon: '#️⃣' },
          ]} />
        </SEOSection>

        <SEOSection id="guides" eyebrow="Learn more" heading="Developer Guides">
          <RelatedBlogPosts posts={[
            { href: '/blog/top-10-json-errors-waste-developer-time', label: 'SVG in Web APIs Guide' },
            { href: '/blog/json-best-practices-production-guide', label: 'Image Optimization Tips' },
            { href: '/blog/why-json-breaks-in-real-world-apis', label: 'Base64 Images in APIs' },
            { href: '/blog/fix-json-errors-complete-guide', label: 'Frontend Asset Best Practices' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="svg_to_image" />
    </>
  );
}
