import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// ssr: false prevents pdfjs-dist (ESM-only) from being processed server-side,
// which avoids webpack HMR module factory errors in dev and canvas issues in SSR.
const PdfConverterClient = dynamic(() => import('./client'), { ssr: false });

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
  alternates: { canonical: 'https://unblockdevs.com/pdf-to-excel-word' },
  openGraph: {
    title: 'PDF to Excel & Word Converter | UnblockDevs',
    description: 'Convert any PDF to Excel or Word. Smart table detection. 100% in-browser.',
    url: 'https://unblockdevs.com/pdf-to-excel-word',
    type: 'website',
  },
};

const canonicalUrl = 'https://unblockdevs.com/pdf-to-excel-word';

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PdfConverterClient />
    </>
  );
}

