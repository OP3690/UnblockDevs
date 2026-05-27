import type { Metadata } from 'next';
import ImageToTextClient from './client';

const canonicalUrl = 'https://unblockdevs.com/image-to-text';

export const metadata: Metadata = {
  title: 'Image to Text — OCR Online: Extract Text from Photos & Scans | UnblockDevs',
  description:
    'Extract text from any image online with advanced OCR. Supports JPEG, PNG, WebP, BMP, TIFF and scanned documents. Multi-language, confidence scoring, table detection — 100% browser-based, no upload.',
  keywords: [
    'image to text',
    'OCR online',
    'image text extractor',
    'extract text from image',
    'photo to text',
    'scanned document OCR',
    'picture to text',
    'free OCR online',
    'image OCR',
    'PNG to text',
    'JPG to text',
    'JPEG to text',
    'WebP to text',
    'TIFF to text',
    'handwriting OCR',
    'scanned PDF text extraction',
    'Tesseract OCR online',
    'multilingual OCR',
    'extract text from photo',
    'image text recognition',
    'online text recognition',
    'convert image to text free',
  ],
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    title: 'Image to Text — Advanced OCR Online | UnblockDevs',
    description:
      'Extract text from images and scanned photos with advanced OCR. Supports 12+ languages, batch processing, confidence scoring, and table detection. Free, in-browser.',
    url: canonicalUrl,
    type: 'website',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Image%20to%20Text%20%E2%80%94%20OCR%20Online&emoji=%F0%9F%96%BC%EF%B8%8F&desc=Extract%20text%20from%20images%20with%20advanced%20OCR', width: 1200, height: 630, alt: 'Image to Text — OCR Online — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image to Text — Advanced OCR | UnblockDevs',
    description:
      'Free OCR tool to extract text from images, photos, and scanned documents. 12+ languages, table detection, confidence coloring.',
    images: ['https://unblockdevs.com/api/og?title=Image%20to%20Text%20%E2%80%94%20OCR%20Online&emoji=%F0%9F%96%BC%EF%B8%8F&desc=Extract%20text%20from%20images%20with%20advanced%20OCR'],
  },
};

export default function ImageToTextPage() {
  return <ImageToTextClient />;
}
