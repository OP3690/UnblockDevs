import type { Metadata } from 'next';
import { ToolPageFooterBand } from '@/components/tools/ToolPageShell';
import ToolSEOContent, {
  SEOSection, SEOProse, C, HowItWorks, UseCases, FAQ, RelatedTools,
} from '@/components/tools/ToolSEOContent';
import ImageToBase64Client from './client';

const canonicalUrl = 'https://unblockdevs.com/image-to-base64';

export const metadata: Metadata = {
  title: 'Image to Base64 Converter — Encode PNG, JPG, SVG Online | UnblockDevs',
  description:
    'Convert any image to Base64 instantly. Upload PNG, JPG, SVG, GIF, or WebP and get the Base64 string, data URI, CSS background, and HTML img tag. 100% browser-based.',
  keywords: [
    'image to base64',
    'image to base64 converter',
    'convert image to base64',
    'base64 encode image',
    'image base64 online',
    'PNG to base64',
    'JPG to base64',
    'SVG to base64',
    'base64 data URI',
    'base64 image CSS',
    'embed image CSS base64',
    'base64 img src',
    'base64 background image CSS',
    'online image encoder',
    'free base64 converter',
    'convert image to base64 online',
    'jpg to base64',
    'png to base64',
    'gif to base64',
    'webp to base64',
    'base64 image encoder',
    'base64 to image converter',
    'decode base64 image',
    'image data uri generator',
    'html image base64',
    'css base64 background',
    'base64 image react',
    'base64 image javascript',
    'img src base64',
    'base64 image viewer',
    'base64 png online',
    'convert base64 to image file',
    'image to data url',
    'data url generator',
    'base64 encode photo',
    'base64 image for email',
    'base64 image size',
    'base64 image too large',
    'base64 jpeg',
    'base64 ico',
    'image embed html',
    'inline image html',
    'embedding image css',
    'base64 image no upload',
    'image base64 python',
    'pillow base64 python',
    'canvas to base64 javascript',
    'fileReader.readAsDataURL',
    'blob to base64',
    'base64 image postman',
    'base64 image curl',
    'convert image for api payload',
    'base64 image private',
    'base64 image browser',
    'image to base64 no signup',
    'base64 bmp image',
    'image to base64 api free',
    'base64 tiff image',
    'base64 image size calculator',
    'base64 image decoder online',
    'image to base64 react',
    'image to base64 nodejs',
    'base64 string to image javascript',
    'image base64 data uri css',
    'base64 image without upload',
    'free image base64 encoder',
  ],
  openGraph: {
    title: 'Image to Base64 Converter — PNG, JPG, SVG | UnblockDevs',
    description: 'Convert images to Base64 data URIs. Get CSS background-image, HTML img src, and raw base64 string. Free, browser-only.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Image to Base64 Converter — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to Base64 Converter — Free Online Tool',
    description: 'Upload any image, get instant Base64 data URI, CSS background, and img src. 100% client-side. Free forever.',
  },
  alternates: { canonical: canonicalUrl },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Image to Base64 Converter',
  url: canonicalUrl,
  description: 'Free online tool to convert PNG, JPG, SVG, GIF, and WebP images to Base64 encoded data URIs. Supports drag-and-drop, outputs CSS background-image, HTML img src, and raw Base64 string.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: ['PNG, JPG, SVG, GIF, WebP support', 'Drag and drop upload', 'CSS data URI output', 'HTML img tag output', 'Raw Base64 output', '100% browser-based', 'No file size limit'],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '4210', bestRating: '5' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a Base64 image?', acceptedAnswer: { '@type': 'Answer', text: 'A Base64 image is a binary image file encoded as a text string using Base64 encoding. This allows images to be embedded directly in HTML, CSS, JavaScript, or JSON without referencing an external file. The format is: data:image/png;base64,iVBORw0KGgoAAAANS...' } },
    { '@type': 'Question', name: 'How do I use a Base64 image in CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Use the data URI as the value of background-image: .element { background-image: url("data:image/png;base64,iVBOR..."); }. This embeds the image directly in your CSS without an external HTTP request.' } },
    { '@type': 'Question', name: 'When should I use Base64 images?', acceptedAnswer: { '@type': 'Answer', text: 'Base64 is ideal for small images (icons, sprites, data URIs) that you want to inline in HTML/CSS to save HTTP requests. Avoid it for large images — Base64 encoding increases file size by ~33%, and large inline images block HTML parsing.' } },
    { '@type': 'Question', name: 'Is this tool safe for confidential images?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. This converter runs entirely in your browser using the FileReader API. No image is uploaded to any server. Your files never leave your device.' } },
    { '@type': 'Question', name: 'How do I convert an image to Base64?', acceptedAnswer: { '@type': 'Answer', text: 'Drag and drop your image file onto this tool or click to browse and select a file. The tool instantly encodes it to Base64 using the browser FileReader API and outputs the data URI, CSS background-image rule, HTML img tag, and the raw Base64 string — all ready to copy with one click.' } },
    { '@type': 'Question', name: 'How do I use a Base64 image in HTML?', acceptedAnswer: { '@type': 'Answer', text: 'Set the src attribute of an img element to the full data URI: <img src="data:image/png;base64,iVBORw0KGgo..." alt="description">. This embeds the image inline without any external file request, which is useful for email HTML and self-contained documents.' } },
    { '@type': 'Question', name: 'What is an image data URI?', acceptedAnswer: { '@type': 'Answer', text: 'A data URI is a URI scheme that encodes file contents directly into the URI string. For images, the format is: data:[mediatype];base64,[base64-encoded-data]. For example: data:image/png;base64,iVBORw0KGgo.... Browsers decode and display data URIs identically to external image URLs.' } },
    { '@type': 'Question', name: 'How do I convert a Base64 string back to an image file?', acceptedAnswer: { '@type': 'Answer', text: 'In JavaScript, decode the Base64 string with atob(), convert to a Uint8Array, create a Blob, then use URL.createObjectURL() or download via an anchor tag. In Python, use base64.b64decode(data) and write the bytes to a file. Most image tools and online converters also accept Base64 input and export a file.' } },
    { '@type': 'Question', name: 'Is there a file size limit for image to Base64 conversion?', acceptedAnswer: { '@type': 'Answer', text: 'This tool has no enforced file size limit — it is constrained only by your browser\'s available memory. However, Base64 encoding increases size by ~33%, so a 1 MB image becomes ~1.33 MB of text. Very large Base64 strings embedded in HTML or CSS can slow down page rendering, so images above 10–20 KB are generally better served as external files.' } },
    { '@type': 'Question', name: 'How do I convert an image to Base64 in JavaScript?', acceptedAnswer: { '@type': 'Answer', text: 'Use the FileReader API: const reader = new FileReader(); reader.onload = (e) => console.log(e.target.result); reader.readAsDataURL(file). The result is the full data URI including the media type prefix. To get only the raw Base64 string, split on the comma: e.target.result.split(",")[1].' } },
    { '@type': 'Question', name: 'How do I convert an image to Base64 in Python?', acceptedAnswer: { '@type': 'Answer', text: 'Use the base64 module: import base64; with open("image.png", "rb") as f: encoded = base64.b64encode(f.read()).decode("utf-8"). To create a full data URI: data_uri = f"data:image/png;base64,{encoded}". The Pillow library can also be used to convert image formats before encoding.' } },
    { '@type': 'Question', name: 'How large does a Base64 image get compared to the original?', acceptedAnswer: { '@type': 'Answer', text: 'Base64 encoding increases file size by approximately 33% because it encodes every 3 bytes of binary data as 4 ASCII characters. A 100 KB PNG becomes roughly 133 KB as a Base64 string. This overhead is a trade-off: you eliminate one HTTP request but transfer more bytes. For images larger than ~10 KB, serving as external files is usually more efficient.' } },
    { '@type': 'Question', name: 'Can I use Base64 images in emails?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, and this is one of the primary use cases. Many email clients block externally hosted images by default, but Base64-encoded images embedded directly in the HTML body are displayed automatically. Note that some email clients (notably Outlook) have limitations on data URI support, so testing across clients is recommended.' } },
    { '@type': 'Question', name: 'How do I convert an SVG to Base64?', acceptedAnswer: { '@type': 'Answer', text: 'SVG files can be Base64-encoded like any other image type. This tool encodes SVG files as data:image/svg+xml;base64,[encoded]. For CSS backgrounds, an alternative is URL-encoded SVG (data:image/svg+xml,[url-encoded-svg]) which produces smaller output since SVG is already text and does not benefit as much from Base64 encoding.' } },
    { '@type': 'Question', name: 'Is it safe to convert images to Base64 in the browser?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. This tool uses the browser\'s built-in FileReader API, which reads your file locally without uploading anything to a server. The conversion happens entirely in your browser\'s memory. Your image data never leaves your device, making this safe for confidential, proprietary, or sensitive images.' } },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Convert Image to Base64 Online',
  totalTime: 'PT30S',
  step: [
    { '@type': 'HowToStep', position: 1, name: 'Upload your image', text: 'Drag and drop an image onto the tool or click "Choose Image" to select a PNG, JPG, SVG, GIF, or WebP file.' },
    { '@type': 'HowToStep', position: 2, name: 'View the preview', text: 'See a live preview of your image alongside its file size, dimensions, and type.' },
    { '@type': 'HowToStep', position: 3, name: 'Copy the output', text: 'Choose from Data URI, CSS background-image, HTML img tag, or raw Base64 and copy with one click.' },
    { '@type': 'HowToStep', position: 4, name: 'Paste into your project', text: 'Paste the Base64 string into your CSS, HTML, JavaScript, or JSON.' },
  ],
};

export default function ImageToBase64Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <ImageToBase64Client />

      <ToolSEOContent>
        <SEOSection id="what" heading="Image to Base64 — Embed Images Directly in HTML and CSS">
          <SEOProse>
            Base64 encoding converts a binary image file into a text string that can be embedded directly
            in HTML, CSS, JavaScript, or JSON — no external image file needed. The resulting{' '}
            <C>data URI</C> starts with <C>data:image/png;base64,</C> followed by the encoded string.
            Browsers decode and display it identically to a regular external image.
          </SEOProse>
          <SEOProse>
            This is useful for small icons, inline CSS backgrounds, email HTML (which blocks external images),
            and eliminating extra HTTP requests. Upload any PNG, JPG, SVG, GIF, or WebP image and instantly
            get the Base64 data URI, a ready-to-paste CSS <C>background-image</C> rule,
            an HTML <C>&lt;img&gt;</C> tag with the Base64 src, and the raw encoded string — all with
            one-click copy. Your image is never uploaded to a server.
          </SEOProse>
        </SEOSection>

        <SEOSection id="how" eyebrow="How it works" heading="Convert Image to Base64 in 30 Seconds">
          <HowItWorks steps={[
            { n: '01', title: 'Drop or select', desc: 'Drag and drop your image file onto the tool, or click to browse. PNG, JPG, SVG, GIF, WebP all supported.' },
            { n: '02', title: 'Instant preview', desc: 'See a live preview of your image with file name, type, dimensions, original size, and Base64 size.' },
            { n: '03', title: 'Choose format', desc: 'Pick from Data URI, CSS background-image, HTML img tag, or raw Base64 string.' },
            { n: '04', title: 'Copy and use', desc: 'One click copies the selected format to your clipboard. Paste directly into your CSS, HTML, or JS.' },
          ]} />
        </SEOSection>

        <SEOSection id="uses" eyebrow="Use cases" heading="When Developers Convert Images to Base64">
          <UseCases cases={[
            { icon: '📧', title: 'HTML email images', desc: 'Email clients often block external images. Inline Base64 images display reliably in all email clients.' },
            { icon: '🎨', title: 'CSS background icons', desc: 'Embed small icons, patterns, and textures directly in your CSS as data URIs — no HTTP request.' },
            { icon: '⚡', title: 'Eliminate HTTP requests', desc: 'Inline critical small images (logo, icons) to avoid extra round-trips on first load.' },
            { icon: '📦', title: 'Self-contained components', desc: 'Build React/Vue components that bundle their own images without depending on a public URL.' },
            { icon: '🤖', title: 'AI and API payloads', desc: 'Many vision AI APIs (OpenAI, Claude) accept images as Base64 strings in JSON request bodies.' },
            { icon: '🧪', title: 'Testing and mocking', desc: 'Use Base64 images as reliable test fixtures that never break due to missing files or URLs.' },
          ]} />
        </SEOSection>

        <SEOSection id="faq" eyebrow="FAQ" heading="Frequently Asked Questions">
          <FAQ items={[
            { q: 'Does Base64 make images larger?', a: 'Yes. Base64 encoding increases file size by approximately 33% compared to the binary original. This is a trade-off: you eliminate one HTTP request but pay with increased data transfer. For images smaller than ~5KB, the request overhead usually outweighs the size penalty. For large images, use regular external URLs.' },
            { q: 'How do I use a Base64 image in an <img> tag?', a: 'Set the src attribute to the full data URI: <img src="data:image/png;base64,iVBORw0KGgoAAAA..." alt="My image">. This generator produces the complete img tag ready to copy and paste.' },
            { q: 'Can I use a Base64 SVG in CSS?', a: 'Yes. SVG can be encoded as Base64 or as a URL-encoded SVG string (which is smaller). Example: background-image: url("data:image/svg+xml;base64,PHN2Zy4uLg=="). This tool outputs Base64 for all image types including SVG.' },
            { q: 'What image types are supported?', a: 'PNG, JPG/JPEG, GIF, WebP, SVG, BMP, ICO, TIFF, and any other image format your browser supports. The tool uses the browser\'s built-in FileReader API to read and encode the file.' },
            { q: 'How do I convert an image to Base64?', a: 'Drag and drop your image file onto this tool or click to browse and select a file. The tool instantly encodes it to Base64 using the browser FileReader API and outputs the data URI, CSS background-image rule, HTML img tag, and the raw Base64 string — all ready to copy with one click. Your image never leaves your device.' },
            { q: 'How do I use a Base64 image in HTML?', a: 'Set the src attribute of an img element to the full data URI: <img src="data:image/png;base64,iVBORw0KGgo..." alt="description">. This embeds the image inline without any external file request, which is useful for email HTML and self-contained documents.' },
            { q: 'How do I use a Base64 image in CSS?', a: 'Use the data URI as the value of background-image: .element { background-image: url("data:image/png;base64,iVBOR..."); }. This embeds the image directly in your CSS without an external HTTP request and is ideal for icons and small background textures.' },
            { q: 'What is an image data URI?', a: 'A data URI is a URI scheme that encodes file contents directly into the URI string. For images, the format is: data:[mediatype];base64,[base64-encoded-data]. For example: data:image/png;base64,iVBORw0KGgo.... Browsers decode and display data URIs identically to external image URLs.' },
            { q: 'How do I convert a Base64 string back to an image file?', a: 'In JavaScript, decode the Base64 string with atob(), convert to a Uint8Array, create a Blob, then download via an anchor tag. In Python, use base64.b64decode(data) and write the bytes to a file with the correct extension.' },
            { q: 'Is there a file size limit for image to Base64 conversion?', a: 'This tool has no enforced file size limit — it is constrained only by your browser\'s available memory. However, Base64 encoding increases size by ~33%, so a 1 MB image becomes ~1.33 MB of text. Very large Base64 strings embedded in HTML or CSS can slow down page rendering, so images above 10–20 KB are generally better served as external files.' },
            { q: 'How do I convert an image to Base64 in JavaScript?', a: 'Use the FileReader API: const reader = new FileReader(); reader.onload = (e) => console.log(e.target.result); reader.readAsDataURL(file). The result is the full data URI. To get only the raw Base64 string, split on the comma: e.target.result.split(",")[1].' },
            { q: 'How do I convert an image to Base64 in Python?', a: 'Use the base64 module: import base64; with open("image.png", "rb") as f: encoded = base64.b64encode(f.read()).decode("utf-8"). To create a full data URI: data_uri = f"data:image/png;base64,{encoded}". The Pillow library can also be used to convert image formats before encoding.' },
            { q: 'How large does a Base64 image get compared to the original?', a: 'Base64 encoding increases file size by approximately 33% because it encodes every 3 bytes of binary data as 4 ASCII characters. A 100 KB PNG becomes roughly 133 KB as a Base64 string. For images larger than ~10 KB, serving as external files is usually more efficient.' },
            { q: 'Can I use Base64 images in emails?', a: 'Yes, and this is one of the primary use cases. Many email clients block externally hosted images by default, but Base64-encoded images embedded directly in the HTML body are displayed automatically. Note that some email clients (notably Outlook) have limitations, so testing across clients is recommended.' },
            { q: 'Is it safe to convert images to Base64 in the browser?', a: 'Yes. This tool uses the browser\'s built-in FileReader API, which reads your file locally without uploading anything to a server. The conversion happens entirely in your browser\'s memory. Your image data never leaves your device, making this safe for confidential or sensitive images.' },
          ]} />
        </SEOSection>

        <SEOSection id="related" eyebrow="Related tools" heading="Other Encoding Tools">
          <RelatedTools tools={[
            { href: '/base64-encoder', label: 'Base64 Text Encoder', desc: 'Encode/decode text as Base64', icon: '🔡' },
            { href: '/svg-to-image', label: 'SVG to Image', desc: 'Export SVG as PNG or JPEG', icon: '🖼️' },
            { href: '/url-encoder', label: 'URL Encoder', desc: 'Encode/decode URL components', icon: '🔗' },
            { href: '/hash-generator', label: 'Hash Generator', desc: 'MD5, SHA-1, SHA-256 hashes', icon: '#' },
          ]} />
        </SEOSection>
      </ToolSEOContent>

      <ToolPageFooterBand toolName="image_to_base64" />
    </>
  );
}
