import type { Metadata } from 'next';
import SocialMediaTimeAnalyzerClient from './client';

const BASE_URL = 'https://unblockdevs.com';
const PAGE_PATH = '/social-media-time-analyzer';

const defaultMetadata: Metadata = {
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
    'instagram time analyzer',
    'tiktok time analyzer',
    'social media screen time',
    'analyze social media data export',
    'instagram data export analyzer',
    'tiktok data export viewer',
    'social media addiction checker',
    'digital wellbeing tool',
    'screen time analyzer',
    'social media usage statistics',
    'how many hours on instagram',
    'social media data privacy tool',
    'analyze instagram activity',
    'time spent on tiktok calculator',
    'social media data insights',
    'private social media analyzer',
    'browser-only social media tool',
    'no upload social media analysis',
    'gdpr social media data',
    'check social media addiction',
    'scroll time calculator',
    'social media detox tool',
    'instagram screen time checker',
    'youtube time wasted',
    'social media usage report',
    'tiktok addiction check',
    'twitter time spent',
    'facebook screen time tracker',
    'social media data download',
    'instagram activity log',
    'reddit time spent',
    'social media health check',
    'how long on social media',
  ],
  alternates: { canonical: `${BASE_URL}${PAGE_PATH}` },
  openGraph: {
    title: 'Social Media Time Analyzer — Track Time on Instagram, YouTube, TikTok & More',
    description:
      'Upload your Instagram, YouTube, Facebook, TikTok or Twitter data export to see exactly how many days of your life you spent scrolling. 100% private — processed entirely in your browser.',
    url: `${BASE_URL}${PAGE_PATH}`,
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

type Props = { searchParams: Promise<{ [key: string]: string | undefined }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const name = params.n;
  const days = params.d;

  // No share params → default metadata
  if (!name || !days) return defaultMetadata;

  const reels = params.r ?? '0';
  const ads = params.ag ?? '0';
  const ogImageUrl = `${BASE_URL}/api/og-share?n=${encodeURIComponent(name)}&d=${days}&r=${reels}&ag=${ads}`;
  const title = `${name}'s Instagram screen time — ${days} days spent scrolling`;
  const description = `${name} spent ${days} days on Instagram: ${Number(reels).toLocaleString()} reels watched, ${Number(ads).toLocaleString()} advertisers targeting them. Find out your own number — free, 100% private.`;

  return {
    ...defaultMetadata,
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${PAGE_PATH}`,
      siteName: 'UnblockDevs',
      type: 'website',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function SocialMediaTimeAnalyzerPage() {
  return <SocialMediaTimeAnalyzerClient />;
}
