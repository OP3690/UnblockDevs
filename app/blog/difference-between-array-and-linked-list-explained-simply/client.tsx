'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function BlogPostClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Array vs Linked List — Differences Explained Simply With Examples</h1>
      <p className="lead">
        Arrays and linked lists are the two most fundamental data structures. Arrays give you instant
        index access but slow insertions. Linked lists give you fast insertions but no random access.
        Knowing when to use each is a core developer skill.
      </p>

      <StatGrid stats={[
        { value: 'O(1)', label: 'array index access', color: 'green' },
        { value: 'O(n)', label: 'array insert/delete middle', right: true, color: 'amber' },
        { value: 'O(1)', label: 'linked list insert/delete with node', color: 'green' },
        { value: 'O(n)', label: 'linked list search', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Memory Layout — The Fundamental Difference" />
      <QuickFact>
        An array is a contiguous block of memory — elements are stored side by side.
        A linked list scatters nodes anywhere in memory, connected by pointers.
        This single difference explains all the trade-offs.
      </QuickFact>

      <SectionHeader number={2} title="Full Comparison" />
      <CompareTable
        leftLabel="Array"
        rightLabel="Linked List"
        rows={[
          { label: 'Memory', left: 'Contiguous — one block', right: 'Scattered — each node anywhere' },
          { label: 'Access by index', left: 'O(1) — direct: arr[5]', right: 'O(n) — traverse from head' },
          { label: 'Search by value', left: 'O(n) — unsorted; O(log n) — sorted', right: 'O(n) — always' },
          { label: 'Insert at front', left: 'O(n) — shift all elements right', right: 'O(1) — update head pointer' },
          { label: 'Insert at end', left: 'O(1) amortized (dynamic array)', right: 'O(n) singly; O(1) with tail pointer' },
          { label: 'Insert at middle', left: 'O(n) — shift elements', right: 'O(1) if node known; O(n) to find it' },
          { label: 'Delete', left: 'O(n) — shift elements', right: 'O(1) if node known (doubly); O(n) singly' },
          { label: 'Memory overhead', left: 'Just the data', right: 'Data + 1–2 pointers per node' },
          { label: 'Cache performance', left: 'Excellent — spatial locality', right: 'Poor — random memory access' },
          { label: 'Size change', left: 'Expensive realloc if fixed-size', right: 'Free — just add/remove nodes' },
        ]}
      />

      <SectionHeader number={3} title="When to Use Each" />
      <KeyPointsGrid columns={2} items={[
        {
          title: '✅ Use Array When',
          description: 'You access elements by index. You iterate elements sequentially. You need CPU cache performance. Elements are fixed-size and you know the count.',
        },
        {
          title: '✅ Use Linked List When',
          description: 'You insert/delete frequently at the beginning or middle. You don\'t need random access. Implementing stacks, queues, or deques. Building an LRU cache (linked list + hash map).',
        },
        {
          title: '⚠️ Dynamic Arrays (JavaScript Array, Python list)',
          description: 'Modern language arrays (ArrayList, Vec) are backed by resizable arrays. They give O(1) amortized append with O(n) insert/delete in middle. Use these by default — reach for a linked list only when you have a specific need.',
        },
        {
          title: '⚠️ Linked List in Practice',
          description: 'Rarely used directly in application code — usually via higher-level abstractions (Deque, LRU cache). The concepts matter for system design and interviews more than day-to-day coding.',
        },
      ]} />

      <SectionHeader number={4} title="Code Comparison" />
      <CodeBlock language="javascript" filename="Array Operations">
{`const arr = [10, 20, 30, 40, 50];

// O(1) — random access
console.log(arr[2]); // → 30

// O(n) — insert at front (shift all right)
arr.unshift(5); // [5, 10, 20, 30, 40, 50]

// O(n) — insert at middle (shift right portion)
arr.splice(2, 0, 15); // [5, 10, 15, 20, 30, 40, 50]

// O(1) amortized — append at end
arr.push(60);`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Linked List Operations">
{`class Node { constructor(val) { this.val = val; this.next = null; } }

class LinkedList {
  constructor() { this.head = null; }

  // O(1) — insert at head
  prepend(val) {
    const node = new Node(val);
    node.next = this.head;
    this.head = node;
  }

  // O(1) if you have the node — no shifting
  insertAfter(node, val) {
    const newNode = new Node(val);
    newNode.next = node.next;
    node.next = newNode;
  }

  // O(n) — no index access, must traverse
  get(index) {
    let curr = this.head;
    for (let i = 0; i < index; i++) curr = curr.next;
    return curr?.val;
  }
}`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'Is JavaScript\'s Array actually an array?',
          answer: 'Modern JavaScript engines (V8) optimize dense numeric arrays into actual contiguous memory (like C arrays). Sparse arrays or arrays with mixed types fall back to hash-map-based storage. For performance-critical code, keep arrays dense and typed.',
        },
        {
          question: 'Why are linked lists said to have "poor cache performance"?',
          answer: 'CPUs load memory in cache lines (~64 bytes). Adjacent array elements are in the same cache line — accessing arr[1] after arr[0] is basically free. Linked list nodes are scattered, so each pointer follow likely causes a cache miss (~100× slower than a cache hit).',
        },
        {
          question: 'When would a linked list beat an array in real production code?',
          answer: 'LRU caches — doubly linked list + hash map for O(1) get and O(1) eviction. The hash map gives O(1) node lookup; the linked list gives O(1) move-to-front and remove-from-back. Difficult to achieve with a pure array.',
        },
        {
          question: 'What data structure should I use for a stack or queue?',
          answer: 'In practice: JavaScript array (push/pop for stack, push/shift for queue — though shift is O(n)). For a high-performance queue, use a deque (double-ended queue) which gives O(1) operations on both ends. In Python: collections.deque.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
