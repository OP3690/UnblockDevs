import type { Metadata } from 'next';
import ConfigComparatorClient from './client';

export const metadata: Metadata = {
  title: 'Free Config Comparator Online - Compare Configuration Files | UnblockDevs',
  description: 'Compare configuration files instantly. Free online config comparator tool to find differences between config files, environment variables, and settings. No signup required.',
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
    title: 'Free Config Comparator Online - Compare Configuration Files',
    description: 'Compare configuration files instantly. Free online config comparator tool.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/config-comparator',
  },
};

export default function ConfigComparatorPage() {
  return <ConfigComparatorClient />;
}
