import type { Metadata } from 'next';
import UIComponentsClient from '../ui-components/client';

const canonicalUrl = 'https://unblockdevs.com/css-ui-components';

export const metadata: Metadata = {
  title: 'CSS UI Components Library — 116 Ready-to-Use Components | UnblockDevs',
  description:
    'Browse 116 production-ready CSS UI components with live previews. Instantly copy Tailwind or plain CSS for buttons, cards, modals, forms, tables, alerts, badges, charts & more. No signup needed.',
  keywords: [
    'css ui components', 'tailwind ui components', 'css components library',
    'free css components', 'tailwind components free', 'html css components',
    'ui components code', 'copy paste css components', 'css button styles',
    'css card component', 'css modal', 'css form components',
    'css alert component', 'css badge component', 'css table styles',
    'tailwind css examples', 'css ui kit', 'frontend components free',
  ],
  openGraph: {
    title: 'CSS UI Components — 116 Copy-Paste Components | UnblockDevs',
    description: 'Live preview + instant code copy for 116 UI components. Buttons, cards, modals, forms, tables, alerts & more — CSS & Tailwind.',
    type: 'website',
    url: canonicalUrl,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs CSS UI Components' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSS UI Components — 116 Components | UnblockDevs',
    description: 'Live preview + instant code copy for 116 UI components. CSS & Tailwind. No signup.',
  },
  alternates: { canonical: canonicalUrl },
};

export default function Page() {
  return <UIComponentsClient />;
}
