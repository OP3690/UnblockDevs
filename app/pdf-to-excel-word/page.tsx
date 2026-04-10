import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// ssr: false prevents pdfjs-dist (ESM-only) from being processed server-side,
// which avoids webpack HMR module factory errors in dev and canvas issues in SSR.
const PdfConverterClient = dynamic(() => import('./client'), { ssr: false });

const canonicalUrl = 'https://unblockdevs.com/pdf-to-excel-word';

export const metadata: Metadata = {
  title: 'PDF to Excel & Word Converter — Advanced PDF Parser | UnblockDevs',
  description:
    'Convert any PDF to Excel (.xlsx) or Word (.docx) online. Smart table detection, heading recognition, multi-page support. 100% in-browser — no upload, no server.',
  keywords: [
    'pdf to excel', 'pdf to xlsx', 'pdf to word', 'pdf to docx',
    'convert pdf to excel online', 'convert pdf to word online',
    'pdf table extractor', 'pdf parser online', 'pdf to spreadsheet',
    'extract tables from pdf', 'pdf to excel free', 'pdf to word free',
  ],
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: 'PDF to Excel & Word Converter | UnblockDevs',
    description: 'Convert any PDF to Excel or Word. Smart table detection. 100% in-browser.',
    url: canonicalUrl,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs PDF to Excel & Word Converter' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PDF to Excel & Word Converter | UnblockDevs',
    description: 'Convert PDF to Excel or Word. Smart table detection. 100% in-browser.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'PDF to Excel & Word Converter',
  url: canonicalUrl,
  description: 'Convert any PDF to Excel (.xlsx) or Word (.docx) online. Smart table detection, heading recognition, multi-page support. 100% in-browser.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Convert PDF to Excel (.xlsx) with smart table detection',
    'Convert PDF to Word (.docx) with heading recognition',
    'Multi-page PDF support',
    '100% client-side — no upload, no server',
    'Instant conversion in your browser',
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '890',
    bestRating: '5',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is it safe to upload my PDF here?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All PDF processing happens entirely in your browser using JavaScript. Your files are never uploaded to any server — nothing leaves your device.',
      },
    },
    {
      '@type': 'Question',
      name: 'What types of PDFs work best?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'PDFs with selectable text (not scanned images) work best. The tool detects tables automatically and preserves heading structure when converting to Word.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert multi-page PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The converter processes all pages and combines the output into a single Excel or Word file.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'Tools', item: 'https://unblockdevs.com/tools/json' },
    { '@type': 'ListItem', position: 3, name: 'PDF to Excel & Word Converter', item: canonicalUrl },
  ],
};

export default function PdfConverterPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PdfConverterClient />
    </>
  );
}
