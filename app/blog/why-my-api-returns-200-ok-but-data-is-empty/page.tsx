import type { Metadata } from 'next';
import WhyMyApiReturns200OkButDataIsEmptyClient from './client';

export const metadata: Metadata = {
  title: 'Why My API Returns 200 OK but Data Is Empty | Complete Guide 2026',
  description: 'API returns 200 OK but empty data? Troubleshoot empty responses, null data, empty arrays. Solutions and tips.',
  keywords: [
    'api returns 200 but empty data',
    'api returns 200 ok but no data',
    'api response empty',
    'api returns empty array',
    'api 200 ok but null',
    'api response empty body',
    'api returns 200 but data is null',
    'empty api response',
    'api returns success but no data',
    'api response empty object',
    'api 200 empty response',
    'api returns empty json',
    'api response body empty',
    'api returns 200 but empty',
    'debug empty api response'
  ],
  openGraph: {
    title: 'Why My API Returns 200 OK but Data Is Empty | Complete Guide 2026',
    description: 'API returns 200 OK but empty data? Troubleshoot empty responses, null data. Solutions and tips.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/why-my-api-returns-200-ok-but-data-is-empty',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why My API Returns 200 OK but Data Is Empty | Complete Guide 2026',
    description: 'API returns 200 OK but empty data? Troubleshoot empty responses, null data. Solutions and tips.',
  },  alternates: { canonical: 'https://unblockdevs.com/blog/why-my-api-returns-200-ok-but-data-is-empty' },

};

export default function WhyMyApiReturns200OkButDataIsEmptyPage() {
  return <WhyMyApiReturns200OkButDataIsEmptyClient />;
}
