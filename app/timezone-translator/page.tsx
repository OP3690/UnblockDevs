import type { Metadata } from 'next';
import TimezoneTranslatorClient from './client';

export const metadata: Metadata = {
  title: 'Free Timezone Translator Online - Convert Times Across Timezones | UnblockDevs',
  description: 'Convert times across timezones instantly. Free online timezone translator tool to translate times between different timezones, calculate time differences, and handle daylight saving time. No signup required.',
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
    title: 'Free Timezone Translator Online - Convert Times Across Timezones',
    description: 'Convert times across timezones instantly. Free online timezone translator tool.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/timezone-translator',
  },
};

export default function TimezoneTranslatorPage() {
  return <TimezoneTranslatorClient />;
}
