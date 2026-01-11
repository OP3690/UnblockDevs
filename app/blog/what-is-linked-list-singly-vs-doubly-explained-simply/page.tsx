import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'What Is Linked List? Singly vs Doubly Explained Simply | Complete Guide 2026',
  description: 'Learn what linked list is with simple examples. Complete beginner-friendly guide to singly linked list vs doubly linked list, differences, advantages, and when to use each. Perfect for coding interviews.',
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
    title: 'What Is Linked List? Singly vs Doubly Explained Simply | Complete Guide 2026',
    description: 'Learn what linked list is with simple examples. Complete beginner-friendly guide with visual diagrams and code examples.',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'What Is Linked List? Singly vs Doubly Explained Simply | Complete Guide 2026',
    description: 'Learn what linked list is with simple examples. Complete beginner-friendly guide with visual diagrams and code examples.',
  },
};

import WhatIsLinkedListSinglyVsDoublyExplainedSimplyClient from './client';

export default function WhatIsLinkedListSinglyVsDoublyExplainedSimplyPage() {
  return <WhatIsLinkedListSinglyVsDoublyExplainedSimplyClient />;
}
