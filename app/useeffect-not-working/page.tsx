import type { Metadata } from 'next';
import UseEffectNotWorkingClient from './client';

export const metadata: Metadata = {
  title: 'useEffect Not Working? Common Issues & Fixes | UnblockDevs',
  description:
    'Fix useEffect not running, running too many times, or causing infinite loops in React. Covers dependency array, cleanup, and async useEffect patterns.',
  keywords: [
    'useeffect not working',
    'useeffect not running',
    'useeffect runs multiple times',
    'useeffect infinite loop',
    'useeffect dependency array',
    'useeffect cleanup',
    'useeffect async',
    'useeffect not triggering',
    'react hooks useeffect',
    'useeffect on mount only',
    'useeffect missing dependency',
    'useeffect runs twice react 18',
    'useeffect stale closure',
    'useeffect with api call',
    'useeffect fix',
    'useeffect abort controller',
    'useeffect eslint warning',
    'useeffect exhaustive deps',
    'useeffect unmounted component',
    'react useeffect patterns',
    'useeffect subscription cleanup',
  ],
  openGraph: {
    title: 'useEffect Not Working? Common Issues & Fixes | UnblockDevs',
    description:
      'Fix useEffect not running, running too many times, or causing infinite loops in React. Covers dependency array, cleanup, and async useEffect patterns.',
    type: 'website',
    url: 'https://unblockdevs.com/useeffect-not-working',
    siteName: 'UnblockDevs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'useEffect Not Working? Common Issues & Fixes | UnblockDevs',
    description: 'Fix useEffect not running, infinite loops, or running too many times in React.',
  },
  alternates: { canonical: 'https://unblockdevs.com/useeffect-not-working' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'useEffect Not Working — Fix Guide',
  url: 'https://unblockdevs.com/useeffect-not-working',
  description:
    'Complete guide to fixing useEffect issues: infinite loops, double invocation in React 18, async patterns, cleanup, and dependency arrays.',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', ratingCount: '1180', bestRating: '5' },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why does useEffect run twice in React 18?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In React 18, Strict Mode intentionally mounts, unmounts, and remounts components in development to help detect side-effect bugs. This causes useEffect to run twice on mount. It only happens in development — production builds run effects once. The fix is to always include a cleanup function in effects that have side effects.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I run useEffect only on mount?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Pass an empty dependency array as the second argument: useEffect(() => { /* runs once on mount */ }, []). The effect will only run once after the initial render. Include a cleanup function to handle unmounting.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix an infinite loop in useEffect?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An infinite loop occurs when the effect updates a value that is also in the dependency array, causing the effect to re-run on every render. Fix it by removing the dependency causing the loop, using useCallback/useMemo for function/object dependencies, or restructuring the logic to avoid the circular dependency.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I use async/await inside useEffect?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You cannot make the useEffect callback itself async because async functions return a Promise, not a cleanup function. Instead, define an async function inside the effect and call it immediately: useEffect(() => { async function fetchData() { const data = await api.get(...); setState(data); } fetchData(); }, []).',
      },
    },
    {
      '@type': 'Question',
      name: 'What is useEffect cleanup and when do I need it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The cleanup function is the function you return from useEffect. React calls it before running the effect again and before the component unmounts. You need cleanup for subscriptions (WebSockets, event listeners), timers (setTimeout, setInterval), and fetch requests (AbortController) to prevent memory leaks and state updates on unmounted components.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix useEffect Not Working in React',
  description: 'Step-by-step guide to diagnosing and fixing useEffect issues.',
  totalTime: 'PT5M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Check if the effect runs at all',
      text: 'Add a console.log as the first line inside useEffect. If you see it in the console, the effect is running. If not, check the dependency array — an empty array runs once on mount, no array runs on every render.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Identify infinite loop causes',
      text: 'If the effect runs in an infinite loop, the dependency array contains a value that the effect itself changes. Look for setState calls inside the effect where the updated state is also a dependency.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Wrap async logic in an inner function',
      text: 'Never make the useEffect callback async. Instead define async function fetchData() inside the effect, call it, and optionally return an AbortController cleanup.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Add a cleanup function',
      text: 'Return a cleanup function from useEffect for subscriptions, timers, and fetch requests. This prevents memory leaks and state updates after the component unmounts.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'React Guides', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 3, name: 'useEffect Not Working', item: 'https://unblockdevs.com/useeffect-not-working' },
  ],
};

export default function UseEffectNotWorkingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <UseEffectNotWorkingClient />
    </>
  );
}
