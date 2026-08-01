import type { Metadata } from 'next';
import ReactStateNotUpdatingClient from './client';

export const metadata: Metadata = {
  title: 'React State Not Updating? 7 Causes & Fixes | UnblockDevs',
  description:
    'Fix React state not re-rendering, useState not updating, and setState async issues. Complete guide with hooks examples, batching, and stale closure fixes.',
  keywords: [
    'react state not updating',
    'usestate not working',
    'react setstate not updating',
    'react state not re-rendering',
    'react hooks not updating',
    'react state async',
    'stale closure react',
    'react state not changing',
    'useState not triggering re-render',
    'react state mutation bug',
    'react 18 automatic batching',
    'react state debugging',
  ],
  openGraph: {
    title: 'React State Not Updating? 7 Causes & Fixes | UnblockDevs',
    description:
      'Fix React state not re-rendering, useState not updating, and setState async issues. Complete guide with hooks examples, batching, and stale closure fixes.',
    type: 'website',
    url: 'https://unblockdevs.com/react-state-not-updating',
    siteName: 'UnblockDevs',
    images: [{ url: 'https://unblockdevs.com/api/og?title=React%20State%20Not%20Updating%3F%207%20Causes%20%26%20Fixes&emoji=%F0%9F%90%9B&desc=Fix%20React%20state%20not%20re-rendering%2C%20useState%20not%20updating%2C%20and%20setState%20async', width: 1200, height: 630, alt: 'React State Not Updating? 7 Causes & Fixes — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'React State Not Updating? 7 Causes & Fixes | UnblockDevs',
    description: 'Fix React state not re-rendering, useState not updating, and setState async issues. Covers stale closures, batching, and direct mutation bugs.',
  },
  alternates: { canonical: 'https://unblockdevs.com/react-state-not-updating' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'React State Not Updating — Fix Guide',
  url: 'https://unblockdevs.com/react-state-not-updating',
  description:
    'Complete guide to fixing React state not updating. Covers mutation bugs, async setState, stale closures, batching, and more.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  dateModified: '2026-05-27',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why does console.log show old state after setState?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'setState in React is asynchronous. When you call setState and immediately console.log the variable, the closure still holds the old value. The component will re-render with the new value, but the current synchronous execution sees the old one. Use a useEffect with the state variable as a dependency to observe the updated value.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does React batch state updates?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. In React 18, all state updates are automatically batched, even inside setTimeout, Promises, and native event handlers. This means multiple setState calls in the same function result in a single re-render. In React 17 and earlier, batching only happened inside React event handlers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix stale closure in useEffect?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A stale closure happens when a useEffect callback captures an old value of a state variable. Fix it by either adding the variable to the dependency array, or using the functional updater form: setState(prev => prev + 1). The functional updater always receives the latest state value.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why is my array state not updating?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If you mutate an array directly (e.g., array.push(item)) and then call setState with the same array reference, React sees the same reference and skips re-rendering. Always create a new array: setItems(prev => [...prev, newItem]) or setItems([...items, newItem]).',
      },
    },
    {
      '@type': 'Question',
      name: 'When should I use functional updater form?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use the functional updater form setCount(prev => prev + 1) whenever the new state depends on the previous state, especially inside event handlers called multiple times in the same render cycle, or inside useEffect, setTimeout, or async functions where the value may be stale.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix React State Not Updating',
  description: 'Step-by-step guide to diagnosing and fixing React state update issues.',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Check for direct state mutation',
      text: 'Verify you are not mutating state directly. Never push to arrays or assign object properties directly. Always return a new reference using spread syntax or array methods.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Use functional updater for dependent updates',
      text: 'Replace setState(count + 1) with setState(prev => prev + 1) whenever the new value depends on the current value. This eliminates stale closure bugs.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Add state to useEffect dependency array',
      text: 'If your useEffect reads a state variable, include it in the dependency array so the effect re-runs with the latest value.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Use React DevTools to inspect state',
      text: 'Open React DevTools in your browser, select the component, and watch the state panel update in real time after user interactions.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'React Guides', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 3, name: 'React State Not Updating', item: 'https://unblockdevs.com/react-state-not-updating' },
  ],
};

export default function ReactStateNotUpdatingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ReactStateNotUpdatingClient />
    </>
  );
}
