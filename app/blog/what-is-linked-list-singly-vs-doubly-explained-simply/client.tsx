'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function WhatIsLinkedListSinglyVsDoublyExplainedSimplyClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Linked Lists Explained — Singly vs Doubly With Code Examples</h1>
      <p className="lead">
        A linked list is a chain of nodes where each node contains data and a pointer to the next node.
        Unlike arrays, elements aren't stored contiguously in memory — insertion and deletion are O(1)
        at any position if you have the node reference. This guide covers both singly and doubly linked
        lists with full implementations.
      </p>

      <StatGrid stats={[
        { value: 'O(1)', label: 'insert/delete with node reference', color: 'green' },
        { value: 'O(n)', label: 'search — no random access', color: 'amber' },
        { value: '2 types', label: 'singly and doubly linked', color: 'blue' },
        { value: 'No resize', label: 'grows dynamically', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="The Core Concept" />
      <QuickFact>
        Think of a linked list like a treasure hunt — each clue (node) tells you where to find the next one.
        To find clue #5, you must follow clues #1 → #2 → #3 → #4 → #5. No random access.
      </QuickFact>

      <CompareTable
        leftLabel="Array"
        rightLabel="Linked List"
        rows={[
          { label: 'Memory', left: 'Contiguous block', right: 'Scattered nodes with pointers' },
          { label: 'Access by index', left: 'O(1) — direct', right: 'O(n) — must traverse' },
          { label: 'Insert at head', left: 'O(n) — shift all elements', right: 'O(1) — update head pointer' },
          { label: 'Insert at middle', left: 'O(n) — shift elements', right: 'O(1) if node known, O(n) to find it' },
          { label: 'Delete from middle', left: 'O(n) — shift elements', right: 'O(1) if node known' },
          { label: 'Memory overhead', left: 'Just the data', right: 'Data + pointer(s) per node' },
          { label: 'Cache performance', left: 'Good (spatial locality)', right: 'Poor (nodes scattered in memory)' },
        ]}
      />

      <SectionHeader number={2} title="Singly Linked List Implementation" />

      <CodeBlock language="javascript" filename="Singly Linked List — JavaScript">
{`class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // O(1) — insert at head
  prepend(data) {
    const node = new Node(data);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  // O(n) — insert at tail
  append(data) {
    const node = new Node(data);
    if (!this.head) { this.head = node; this.size++; return; }
    let curr = this.head;
    while (curr.next) curr = curr.next;
    curr.next = node;
    this.size++;
  }

  // O(n) — find and delete
  delete(data) {
    if (!this.head) return;
    if (this.head.data === data) { this.head = this.head.next; this.size--; return; }
    let curr = this.head;
    while (curr.next && curr.next.data !== data) curr = curr.next;
    if (curr.next) { curr.next = curr.next.next; this.size--; }
  }

  // O(n) — search
  find(data) {
    let curr = this.head;
    while (curr) {
      if (curr.data === data) return curr;
      curr = curr.next;
    }
    return null;
  }

  // Convert to array for display
  toArray() {
    const arr = [];
    let curr = this.head;
    while (curr) { arr.push(curr.data); curr = curr.next; }
    return arr;
  }
}

const list = new SinglyLinkedList();
list.append(1); list.append(2); list.append(3);
list.prepend(0);
console.log(list.toArray()); // [0, 1, 2, 3]
list.delete(2);
console.log(list.toArray()); // [0, 1, 3]`}
      </CodeBlock>

      <SectionHeader number={3} title="Doubly Linked List" />
      <p>
        Each node has both a <code>next</code> and <code>prev</code> pointer. This allows traversal in
        both directions and O(1) deletion when you have a node reference (no need to find the previous node).
      </p>

      <CodeBlock language="javascript" filename="Doubly Linked List — JavaScript">
{`class DNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // O(1) — add to end
  append(data) {
    const node = new DNode(data);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  // O(1) — delete any node directly (given the node)
  deleteNode(node) {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next; // was head

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev; // was tail

    this.size--;
  }
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Classic Interview Problems" />

      <CodeBlock language="javascript" filename="Reverse a Linked List (Most Common Interview Q)">
{`function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next; // save next
    curr.next = prev;       // reverse pointer
    prev = curr;            // move prev forward
    curr = next;            // move curr forward
  }

  return prev; // new head
}

// Example: 1→2→3→4→5 becomes 5→4→3→2→1`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Detect Cycle (Floyd's Tortoise and Hare)">
{`function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;          // moves 1 step
    fast = fast.next.next;     // moves 2 steps

    if (slow === fast) return true; // cycle detected
  }

  return false;
}

// If there's a cycle, fast eventually laps slow and they meet`}
      </CodeBlock>

      <SectionHeader number={5} title="When to Use a Linked List" />
      <KeyPointsGrid columns={2} items={[
        { title: '✅ Use Linked List', description: 'Frequent insertions/deletions at the beginning or middle. Implementing stacks, queues, or deques. When you don\'t need random access by index.' },
        { title: '❌ Avoid Linked List', description: 'Frequent index-based access (use array). Cache-sensitive performance requirements (array has better spatial locality). When memory overhead of pointers is a concern.' },
        { title: 'Real Use: LRU Cache', description: 'Doubly linked list + HashMap = O(1) LRU cache. The list maintains access order; map provides O(1) node lookup for deletion.' },
        { title: 'Real Use: Browser History', description: 'Back/forward navigation is a doubly linked list — move forward (next), move backward (prev), truncate future when navigating to new page.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Why is linked list insert O(1) but you said search is O(n)?',
          answer: 'Insert is O(1) IF you already have a reference to the node you want to insert after. Finding that node in the first place is O(n). In practice, if you have the node (e.g., in an LRU cache where the map gives you the node directly), insertion/deletion is O(1).',
        },
        {
          question: 'Are linked lists used in real production code?',
          answer: 'Yes, but usually through higher-level abstractions. Java\'s LinkedList and ArrayDeque, Python\'s deque (collections.deque), LRU caches (Python\'s functools.lru_cache uses a doubly linked list internally), and many OS/kernel data structures use linked lists.',
        },
        {
          question: 'What is the difference between a linked list and an array in terms of memory?',
          answer: 'Arrays store elements contiguously — great for CPU cache performance (accessing adjacent elements is fast). Linked list nodes can be anywhere in memory — each pointer dereference may cause a cache miss. For large datasets with frequent iteration, arrays are typically faster despite O(n) insertion.',
        },
        {
          question: 'What is a sentinel node?',
          answer: 'A "dummy" head or tail node that simplifies edge cases. Instead of special-casing empty list or operations on the head/tail, you always have valid prev/next pointers. Many linked list implementations use sentinel nodes to simplify code.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
