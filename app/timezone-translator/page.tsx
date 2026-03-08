import type { Metadata } from 'next';
import TimezoneTranslatorClient from './client';

export const metadata: Metadata = {
  title: 'Timezone Translator – Convert Times | UnblockDevs',
  description: 'Convert times across timezones. Free timezone translator—time differences, daylight saving. No signup.',
  keywords: [
    'timezone translator',
    'timezone converter',
    'convert timezone',
    'timezone tool',
    'time converter',
    'timezone calculator',
    'time difference calculator',
    'world clock converter'
  ],
  openGraph: {
    title: 'Timezone Translator | UnblockDevs',
    description: 'Convert times across timezones instantly. Free online timezone translator tool.',
    type: 'website',
    url: 'https://unblockdevs.com/timezone-translator',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/timezone-translator',
  },
};

export default function TimezoneTranslatorPage() {
  return <TimezoneTranslatorClient />;
}
