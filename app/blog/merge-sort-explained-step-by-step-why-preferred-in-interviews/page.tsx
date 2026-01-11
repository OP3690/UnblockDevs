import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merge Sort Explained Step-by-Step (Why It\'s Preferred in Interviews) | Complete Guide 2026',
  description: 'Learn merge sort algorithm step-by-step with visual examples. Complete beginner-friendly guide to merge sort, divide and conquer, time complexity O(n log n), and why it\'s preferred in coding interviews. Perfect for coding interviews.',
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
    title: 'Merge Sort Explained Step-by-Step (Why It\'s Preferred in Interviews) | Complete Guide 2026',
    description: 'Learn merge sort algorithm step-by-step with visual examples. Complete beginner-friendly guide with visual diagrams and code examples.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Merge Sort Explained Step-by-Step (Why It\'s Preferred in Interviews) | Complete Guide 2026',
    description: 'Learn merge sort algorithm step-by-step with visual examples. Complete beginner-friendly guide with visual diagrams and code examples.',
  },
};

import MergeSortExplainedStepByStepWhyPreferredInInterviewsClient from './client';

export default function MergeSortExplainedStepByStepWhyPreferredInInterviewsPage() {
  return <MergeSortExplainedStepByStepWhyPreferredInInterviewsClient />;
}
