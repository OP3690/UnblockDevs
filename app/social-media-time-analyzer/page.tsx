import type { Metadata } from 'next';
import SocialMediaTimeAnalyzerClient from './client';

export const metadata: Metadata = {
  title: 'Social Media Time Analyzer — See How Much Time You Waste Online',
  description:
    'Find out exactly how many hours you spend on Instagram, YouTube, Facebook, TikTok & Twitter. Upload your data export for a 100% private, in-browser breakdown of your social media screen time.',
  keywords: [
    'social media time analyzer',
    'screen time tracker',
    'social media time wasted',
    'instagram time wasted',
    'youtube watch time analyzer',
    'tiktok screen time',
    'facebook time spent',
    'twitter time wasted',
    'social media usage tracker',
    'how much time on social media',
    'social media addiction calculator',
    'digital wellbeing tracker',
  ],
  alternates: { canonical: 'https://unblockdevs.com/social-media-time-analyzer' },
  openGraph: {
    title: 'Social Media Time Analyzer — Track Time on Instagram, YouTube, TikTok & More',
    description:
      'Upload your Instagram, YouTube, Facebook, TikTok or Twitter data export to see exactly how many days of your life you spent scrolling. 100% private — processed entirely in your browser.',
    url: 'https://unblockdevs.com/social-media-time-analyzer',
    siteName: 'UnblockDevs',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Media Time Analyzer — How Much Time Have You Wasted?',
    description:
      'Find your exact Instagram, YouTube, TikTok & Facebook screen time from your own data export. Private, instant, eye-opening.',
  },
};

export default function SocialMediaTimeAnalyzerPage() {
  return <SocialMediaTimeAnalyzerClient />;
}
