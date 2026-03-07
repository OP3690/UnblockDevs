import type { Metadata } from 'next';
import JsonToExcelClient from './client';

export const metadata: Metadata = {
  title: 'Convert JSON to Excel – Paste, Export to XLSX/CSV Instantly | UnblockDevs',
  description: 'Convert JSON to Excel in one click. Paste, upload, or fetch from API → export to Excel (XLSX), CSV, or TSV. Multi-sheet, schema detection, filters. 100% client-side.',
  keywords: [
    'convert json to excel',
    'json to excel',
    'json to csv',
    'advanced json to excel',
    'convert api response to excel',
    'json to spreadsheet',
    'json to xlsx',
    'json to table',
    'clean api response',
  ],
  openGraph: {
    title: 'Convert JSON to Excel – Multi-Sheet, Filters, Schema | UnblockDevs',
    description: 'Convert JSON to Excel with schema detection, filters, multi-sheet export. Paste, upload, or fetch from URL. Client-side only.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/json-to-excel',
  },
};

export default function JsonToExcelPage() {
  return <JsonToExcelClient />;
}
