import type { Metadata } from 'next';
import InstagramAnalyzerClient from './client';

export const metadata: Metadata = {
  title: 'Instagram Reels Analyzer — Days Wasted Calculator',
  description:
    'Upload your Instagram data export to see exactly how many hours and days you spent watching Reels. Full analytics with monthly trends, peak days, and what you could have done instead.',
  alternates: { canonical: 'https://unblockdevs.com/instagram-reels-analyzer' },
  openGraph: {
    title: 'Instagram Reels Analyzer — Days Wasted Calculator',
    description:
      'Find out how many days you wasted on Instagram Reels. Upload your data export for a full breakdown — completely private, processed in your browser.',
    url: 'https://unblockdevs.com/instagram-reels-analyzer',
    siteName: 'UnblockDevs',
    type: 'website',
  },
};

export default function InstagramReelsAnalyzerPage() {
  return <InstagramAnalyzerClient />;
}
