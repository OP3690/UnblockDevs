import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Linked List: Singly vs Doubly Explained | UnblockDevs',
  description: 'Linked list: singly vs doubly, differences, when to use each. Simple examples. For coding interviews.',
  keywords: [
    'what is linked list',
    'linked list explained',
    'singly linked list',
    'doubly linked list',
    'linked list vs array',
    'linked list tutorial',
    'linked list examples',
    'singly vs doubly linked list',
    'linked list interview',
    'linked list python',
    'linked list javascript',
    'linked list java',
    'linked list data structure',
    'linked list operations',
    'linked list advantages'
  ],
  openGraph: {
    title: 'Linked List: Singly vs Doubly Explained | UnblockDevs',
    description: 'Linked list: singly vs doubly. Examples, diagrams, code. For interviews.',
    type: 'article',
    url: 'https://unblockdevs.com/blog/what-is-linked-list-singly-vs-doubly-explained-simply',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'UnblockDevs - Free Developer Tools Suite' }],

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Linked List: Singly vs Doubly Explained | UnblockDevs',
    description: 'Linked list: singly vs doubly. Examples, diagrams, code. For interviews.',
  },
  alternates: {
    canonical: 'https://unblockdevs.com/blog/what-is-linked-list-singly-vs-doubly-explained-simply',
  },
};

import WhatIsLinkedListSinglyVsDoublyExplainedSimplyClient from './client';

export default function WhatIsLinkedListSinglyVsDoublyExplainedSimplyPage() {
  return <WhatIsLinkedListSinglyVsDoublyExplainedSimplyClient />;
}
