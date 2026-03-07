import type { Metadata } from 'next';
import BadgesClient from './client';

export const metadata: Metadata = {
  title: 'Developer Tool Badges – Embed "Powered by UnblockDevs" | UnblockDevs',
  description: 'Add a "Powered by UnblockDevs" badge to your site. Copy embed code for HTML or Markdown. Free developer tool badges.',
  keywords: ['developer tool badges', 'powered by unblockdevs', 'embed badge', 'developer badge'],
  openGraph: {
    title: 'Developer Tool Badges – Powered by UnblockDevs',
    description: 'Embed a Powered by UnblockDevs badge on your site. Copy HTML or Markdown.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/badges',
  },
};

export default function BadgesPage() {
  return <BadgesClient />;
}
