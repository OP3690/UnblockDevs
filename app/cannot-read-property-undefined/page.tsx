import type { Metadata } from 'next';
import CannotReadPropertyUndefinedClient from './client';

export const metadata: Metadata = {
  title: 'Cannot Read Property of Undefined — JS Fix | UnblockDevs',
  description:
    'Fix "Cannot read properties of undefined (reading \'X\')" and "Cannot read property \'X\' of null" errors in JavaScript and React. Complete guide with optional chaining.',
  keywords: [
    'cannot read properties of undefined',
    'cannot read property of undefined javascript',
    'cannot read property of null',
    'undefined is not an object',
    'fix cannot read property',
    'react cannot read property',
    'optional chaining fix',
    'api response undefined',
    'reading length of undefined',
    'map of undefined',
    'nullish coalescing javascript',
    'safe property access javascript',
  ],
  openGraph: {
    title: 'Fix "Cannot Read Properties of Undefined" in JavaScript | UnblockDevs',
    description:
      'Fix "Cannot read properties of undefined (reading \'X\')" errors in JavaScript and React. Complete guide with optional chaining and nullish coalescing.',
    type: 'website',
    url: 'https://unblockdevs.com/cannot-read-property-undefined',
    siteName: 'UnblockDevs',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Cannot%20Read%20Property%20of%20Undefined%20%E2%80%94%20JS%20Fix&emoji=%F0%9F%94%A7&desc=Fix%20undefined%20property%20errors%20in%20JavaScript%20and%20React%20with%20optional%20chaining', width: 1200, height: 630, alt: 'Cannot Read Property of Undefined — JS Fix — UnblockDevs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fix "Cannot Read Properties of Undefined" | UnblockDevs',
    description: 'Fix "Cannot read properties of undefined" in JavaScript and React. Use optional chaining, nullish coalescing, and defensive checks for API responses.',
  },
  alternates: { canonical: 'https://unblockdevs.com/cannot-read-property-undefined' },
};

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Fix Cannot Read Properties of Undefined — Guide',
  url: 'https://unblockdevs.com/cannot-read-property-undefined',
  description:
    'Complete guide to fixing "Cannot read properties of undefined" errors in JavaScript and React using optional chaining, nullish coalescing, and defensive programming.',
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
      name: "Why do I get 'Cannot read properties of undefined' when calling .map() in React?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "This happens when you call .map() on a value that is undefined instead of an array. In React, async data hasn't loaded on the first render, so state variables hold their initial value. Initialize your state as an empty array: const [items, setItems] = useState([]) and your .map() call will work safely from the start.",
      },
    },
    {
      '@type': 'Question',
      name: 'How does optional chaining fix this?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Optional chaining (?.) short-circuits the expression and returns undefined instead of throwing an error when the left side is null or undefined. Example: user?.profile?.name returns undefined safely instead of crashing if user or profile is undefined.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I safely access deeply nested object properties?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use optional chaining: const city = user?.address?.city ?? "Unknown". This returns "Unknown" if any part of the chain is undefined. For very deep paths, consider lodash _.get(obj, "a.b.c.d", defaultValue) which never throws.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does my API response show undefined in React?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'On the first render, async data has not loaded yet so state variables hold their initial value (often undefined or null). Guard your render with a loading check: if (loading) return <Spinner />. Then render only when data is present.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I fix "Cannot read property of null" when accessing nested object data from an API?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use optional chaining combined with a nullish coalescing default: const name = response?.user?.profile?.name ?? "Unknown". This short-circuits the entire chain safely when any level is null or undefined, so you never get a crash even when the API returns incomplete data.',
      },
    },
  ],
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to Fix Cannot Read Properties of Undefined in JavaScript',
  description: 'Step-by-step guide to fixing undefined property access errors.',
  totalTime: 'PT3M',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Read the full error message',
      text: "The error tells you which property it was trying to read. Example: \"Cannot read properties of undefined (reading 'map')\" means you called .map() on something that is undefined — check where that variable comes from.",
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Add optional chaining',
      text: 'Replace user.profile.name with user?.profile?.name. This returns undefined safely instead of throwing. Combine with ?? for a default: user?.profile?.name ?? "Anonymous".',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Guard async data in React',
      text: 'Before rendering data from an API call, check that it exists. Use a loading state and conditional rendering: if (!data) return <LoadingSpinner />.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Validate API response shape',
      text: 'Use the JSON Validator to verify your API response structure. Confirm the property path you are accessing matches the actual response shape.',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://unblockdevs.com' },
    { '@type': 'ListItem', position: 2, name: 'JavaScript Guides', item: 'https://unblockdevs.com' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Cannot Read Properties of Undefined',
      item: 'https://unblockdevs.com/cannot-read-property-undefined',
    },
  ],
};

export default function CannotReadPropertyUndefinedPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CannotReadPropertyUndefinedClient />
    </>
  );
}
