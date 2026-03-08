import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Code Works Locally but Fails on Submission | UnblockDevs',
  description: 'Why code works locally but fails on submission. Environment, dependencies, paths, time zones. Beginner-friendly solutions.',
  keywords: [
    'code works locally but fails on submission',
    'code works locally but not on server',
    'why code fails on submission',
    'local vs production code issues',
    'code works locally fails deployment',
    'submission platform code errors',
    'environment differences code',
    'code works local not remote',
    'debugging submission failures',
    'code fails on submission platform',
    'local development vs production',
    'code submission errors',
    'why code works local but fails',
    'troubleshoot submission failures',
    'code environment differences'
  ],
  openGraph: {
    title: 'Code Works Locally but Fails on Submission | UnblockDevs',
    description: 'Learn why your code works locally but fails on submission. Complete troubleshooting guide for environment differences, dependencies, and submission platform issues.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/why-my-code-works-locally-but-fails-on-submission-common-reasons',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why My Code Works Locally but Fails on Submission (Common Reasons) | Complete Guide 2026',
    description: 'Learn why your code works locally but fails on submission. Complete troubleshooting guide for environment differences, dependencies, and submission platform issues.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/why-my-code-works-locally-but-fails-on-submission-common-reasons' },
};

import WhyMyCodeWorksLocallyButFailsOnSubmissionCommonReasonsClient from './client';

export default function WhyMyCodeWorksLocallyButFailsOnSubmissionCommonReasonsPage() {
  return <WhyMyCodeWorksLocallyButFailsOnSubmissionCommonReasonsClient />;
}
