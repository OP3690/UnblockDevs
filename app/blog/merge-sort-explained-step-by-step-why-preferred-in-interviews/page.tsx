import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merge Sort Explained – Step-by-Step | UnblockDevs',
  description: 'Merge sort step-by-step: divide and conquer, O(n log n). Visual examples. Why preferred in interviews.',
  keywords: [
    'merge sort',
    'merge sort explained',
    'merge sort algorithm',
    'merge sort tutorial',
    'merge sort step by step',
    'merge sort interview',
    'divide and conquer',
    'merge sort python',
    'merge sort javascript',
    'merge sort java',
    'merge sort time complexity',
    'merge sort visualization',
    'merge sort example',
    'merge sort preferred interview',
    'merge sort stable'
  ],
  openGraph: {
    title: 'Merge Sort Explained – Step-by-Step | UnblockDevs',
    description: 'Merge sort step-by-step: diagrams, code. For interviews.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/merge-sort-explained-step-by-step-why-preferred-in-interviews',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Merge%20Sort%20Explained%20%E2%80%93%20Step-by-Step&emoji=%F0%9F%A4%96&desc=Merge%20sort%20step-by-step%3A%20diagrams%2C%20code', width: 1200, height: 630, alt: 'Merge Sort Explained – Step-by-Step — UnblockDevs Blog' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merge Sort Explained – Step-by-Step | UnblockDevs',
    description: 'Merge sort step-by-step: diagrams, code. For interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/merge-sort-explained-step-by-step-why-preferred-in-interviews',
  },
};

import MergeSortExplainedStepByStepWhyPreferredInInterviewsClient from './client';

export default function MergeSortExplainedStepByStepWhyPreferredInInterviewsPage() {
  return <MergeSortExplainedStepByStepWhyPreferredInInterviewsClient />;
}
