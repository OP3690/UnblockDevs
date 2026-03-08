import type { Metadata } from 'next';
import ConfigComparatorClient from './client';

export const metadata: Metadata = {
  title: 'Config Comparator – Compare Config Files | UnblockDevs',
  description: 'Compare config files, environment variables, and settings. Free config comparator. No signup.',
  keywords: [
    'config comparator',
    'compare config files',
    'configuration comparator',
    'config diff tool',
    'compare environment variables',
    'config file comparison',
    'settings comparator',
    'config diff'
  ],
  openGraph: {
    title: 'Config Comparator | UnblockDevs',
    description: 'Compare configuration files instantly. Free online config comparator tool.',
    type: 'website',
    url: 'https://unblockdevs.com/config-comparator',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  alternates: {
    canonical: 'https://unblockdevs.com/config-comparator',
  },
};

export default function ConfigComparatorPage() {
  return <ConfigComparatorClient />;
}
