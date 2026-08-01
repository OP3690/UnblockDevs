import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

// ssr: false prevents pdfjs-dist (ESM-only) from being processed server-side,
// which avoids webpack HMR module factory errors in dev and canvas issues in SSR.
const PdfConverterClient = dynamic(() => import('./client'), { ssr: false });

const canonicalUrl = 'https://unblockdevs.com/pdf-to-excel-word';

export const metadata: Metadata = {
  title: 'Free PDF to Excel & Word — Smart Table Detection | UnblockDevs',
  description:
    'Convert any PDF to Excel (.xlsx) or Word (.docx) online. Smart table detection, heading recognition, multi-page support. 100% in-browser — no upload, no server.',
  keywords: [
    'pdf to excel',
    'pdf to word',
    'convert pdf to excel online',
    'pdf table extractor',
    'pdf to xlsx',
    'pdf to docx',
    'extract tables from pdf',
    'pdf to spreadsheet',
    'pdf converter online free',
    'pdf to excel no upload',
    'pdf to word no upload',
    'pdf parser online',
  ],
  alternates: { canonical: canonicalUrl },
  openGraph: {
    title: 'Free PDF to Excel & Word Converter — Smart Table Detection, No Upload | UnblockDevs',
    description: 'Convert any PDF to Excel (.xlsx) or Word (.docx) entirely in your browser. Smart table detection, heading recognition, multi-page support. No upload, no server, no signup. Free.',
    url: canonicalUrl,
    type: 'website',
    images: [{ url: 'https://unblockdevs.com/api/og?title=PDF%20to%20Excel%20%26%20Word%20Converter&emoji=%F0%9F%93%9D&desc=Convert%20any%20PDF%20to%20Excel%20or%20Word', width: 1200, height: 630, alt: 'PDF to Excel & Word Converter — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF to Excel & Word — Smart Table Detection',
    description: 'Convert any PDF to Excel (.xlsx) or Word (.docx). Smart table detection, heading recognition, multi-page support. No upload, 100% in-browser.',
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
  dateModified: '2026-05-27',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  featureList: [
    'Convert PDF to Excel (.xlsx) with smart table detection',
    'Convert PDF to Word (.docx) with heading recognition',
    'Multi-page PDF support',
    '100% client-side — no upload, no server',
    'Instant conversion in your browser',
  ],};

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
    {
      '@type': 'Question',
      name: 'How do I convert a PDF table to Excel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Upload your PDF using the tool at unblockdevs.com/pdf-to-excel-word, select Excel (.xlsx) as the output format, and click Convert. The tool uses smart table detection to identify tabular data in the PDF and map it to rows and columns in the Excel file — no manual copy-pasting required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does OCR work on scanned PDFs?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The tool works best with text-based PDFs (PDFs with selectable text). Scanned PDFs are image-based and require optical character recognition (OCR) to extract text. For scanned PDFs, tools like Adobe Acrobat, Google Drive (open PDF → Google Docs), or Python libraries such as pytesseract provide OCR-powered conversion.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate is PDF to Excel conversion?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Accuracy depends on how the PDF was created. Text-based PDFs with clear tabular structure convert with very high accuracy — rows, columns, and cell values are detected reliably. Complex layouts with merged cells, rotated text, or multi-column designs may require manual clean-up after conversion.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert a PDF to Word while keeping formatting?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Select Word (.docx) as the output format in the converter. The tool recognizes heading levels, paragraph breaks, and text hierarchy from the PDF and maps them to corresponding Word styles (Heading 1, Heading 2, Normal). Bold and italic formatting from the original PDF is also preserved where detected.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is my PDF data kept private?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All conversion happens entirely in your browser using JavaScript — your PDF is never uploaded to any server and nothing leaves your device. This makes it safe to convert confidential PDFs such as financial statements, contracts, or internal reports.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I convert PDF to Excel in Python?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the camelot-py or pdfplumber library. With camelot: `import camelot; tables = camelot.read_pdf("file.pdf"); tables[0].df.to_excel("output.xlsx")`. With pdfplumber: open the PDF, call `page.extract_table()` on each page, then write to Excel using pandas and openpyxl. These libraries work best on text-based PDFs.',
      },
    },
    {
      '@type': 'Question',
      name: 'What PDF types work best with this converter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Text-based PDFs — those generated from Word, Excel, InDesign, or web browsers — work best because their text is selectable and their structure is machine-readable. PDFs from invoices, reports, data exports, and bank statements typically convert with high accuracy. Image-only scanned PDFs require OCR and will not extract correctly with this tool.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I convert a PDF bank statement to Excel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, if the bank statement is a text-based PDF (generated digitally, not scanned). The tool detects the transaction table automatically and maps dates, descriptions, and amounts to Excel columns. After conversion, you may need to clean up number formatting (e.g., removing currency symbols) for Excel formulas to work correctly.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the converter work without uploading files to a server?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. All PDF parsing and conversion runs entirely in your browser using JavaScript. Your files are never sent to any server — everything happens locally on your device. This makes the converter safe for confidential PDFs including financial reports, legal documents, and medical records.',
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
