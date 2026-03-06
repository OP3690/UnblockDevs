import type { Metadata } from 'next';
import JsonToExcelClient from './client';

export const metadata: Metadata = {
  title: 'Advanced JSON to Excel Converter – Multi-Sheet, Schema, Filters | UnblockDevs',
  description: 'Convert complex JSON to Excel with schema detection, flattening, filters, and multi-sheet export. Paste, upload, or fetch from API. 100% client-side, no signup.',
  keywords: [
    'json to excel',
    'json to csv',
    'advanced json to excel',
    'convert json to excel',
    'convert api response to excel',
    'json to spreadsheet',
    'json to xlsx',
    'json to table',
  ],
  openGraph: {
    title: 'Advanced JSON to Excel Converter – Multi-Sheet, Filters, Schema',
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
