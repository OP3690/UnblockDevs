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
        lists with full implementations, classic interview problems, and real-world use cases.
      </p>

      <StatGrid stats={[
        { value: 'O(1)', label: 'insert/delete with node reference', color: 'green' },
        { value: 'O(n)', label: 'search — no random access by index', color: 'amber' },
        { value: '2 types', label: 'singly and doubly linked', color: 'blue' },
        { value: 'No resize', label: 'grows dynamically unlike arrays', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="The Core Concept" />
      <QuickFact color="blue" label="The treasure hunt analogy">
        Think of a linked list like a treasure hunt — each clue (node) tells you where to find the next one.
        To find clue #5, you must follow clues #1 → #2 → #3 → #4 → #5. No jumping directly to #5.
        This is why search is O(n) but insertion (given a node) is O(1) — you just update pointers.
      </QuickFact>

      <CompareTable
        leftLabel="Array"
        rightLabel="Linked List"
        rows={[
          { label: 'Memory layout', left: 'Contiguous block — all elements adjacent', right: 'Scattered nodes connected by pointers' },
          { label: 'Access by index', left: 'O(1) — direct address calculation', right: 'O(n) — must traverse from head' },
          { label: 'Insert at head', left: 'O(n) — must shift all elements right', right: 'O(1) — just update head pointer' },
          { label: 'Insert at middle', left: 'O(n) — shift elements after insertion point', right: 'O(1) if node known, O(n) to find it' },
          { label: 'Delete from middle', left: 'O(n) — shift elements after deletion', right: 'O(1) if node known (doubly linked)' },
          { label: 'Memory overhead', left: 'Just the data — no pointer overhead', right: 'Data + 1-2 pointers (8-16 bytes) per node' },
          { label: 'Cache performance', left: 'Excellent — spatial locality, CPU prefetch', right: 'Poor — pointer chasing causes cache misses' },
        ]}
      />

      <SectionHeader number={2} title="Singly Linked List Implementation" />

      <CodeBlock language="javascript" filename="Singly Linked List — Full JavaScript Implementation">
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

  // O(1) — insert at head (most common operation)
  prepend(data) {
    const node = new Node(data);
    node.next = this.head;
    this.head = node;
    this.size++;
  }

  // O(n) — insert at tail (requires traversal)
  append(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
      this.size++;
      return;
    }
    let curr = this.head;
    while (curr.next) curr = curr.next; // traverse to end
    curr.next = node;
    this.size++;
  }

  // O(n) — insert after a specific value
  insertAfter(target, data) {
    let curr = this.head;
    while (curr && curr.data !== target) curr = curr.next;
    if (!curr) return; // target not found
    const node = new Node(data);
    node.next = curr.next;
    curr.next = node;
    this.size++;
  }

  // O(n) — find and delete by value
  delete(data) {
    if (!this.head) return;
    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      return;
    }
    let curr = this.head;
    while (curr.next && curr.next.data !== data) curr = curr.next;
    if (curr.next) {
      curr.next = curr.next.next; // skip over the deleted node
      this.size--;
    }
  }

  // O(n) — search by value
  find(data) {
    let curr = this.head;
    while (curr) {
      if (curr.data === data) return curr;
      curr = curr.next;
    }
    return null; // not found
  }

  // Convert to array for display/debugging
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
        Each node has both a <code>next</code> and a <code>prev</code> pointer. This enables O(1) deletion
        when you have a node reference (no need to find the previous node) and bidirectional traversal.
        The cost is one extra pointer per node (8 bytes on 64-bit systems).
      </p>

      <CodeBlock language="javascript" filename="Doubly Linked List — JavaScript">
{`class DNode {
  constructor(data) {
    this.data = data;
    this.next = null;
    this.prev = null;   // ← the key difference from singly linked
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;  // tail pointer enables O(1) append
    this.size = 0;
  }

  // O(1) — add to end (tail pointer makes this O(1) vs O(n) for singly)
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

  // O(1) — prepend to front
  prepend(data) {
    const node = new DNode(data);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size++;
  }

  // O(1) — delete any node given a direct reference to it
  // (Singly linked list requires O(n) to find the previous node)
  deleteNode(node) {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;   // deleting head

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;   // deleting tail

    this.size--;
  }

  // O(1) — remove from front
  removeFirst() {
    if (!this.head) return null;
    const data = this.head.data;
    this.deleteNode(this.head);
    return data;
  }

  // O(1) — remove from back
  removeLast() {
    if (!this.tail) return null;
    const data = this.tail.data;
    this.deleteNode(this.tail);
    return data;
  }
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Classic Interview Problems" />

      <CodeBlock language="javascript" filename="Reverse a Linked List (Most Common Interview Question)">
{`// Iterative — O(n) time, O(1) space
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr) {
    const next = curr.next; // save next before overwriting
    curr.next = prev;        // reverse the pointer
    prev = curr;             // advance prev
    curr = next;             // advance curr
  }

  return prev; // prev is the new head when curr reaches null
}

// Trace: 1→2→3→4→5
// After: 5→4→3→2→1
// prev is 5 at the end

// Recursive approach — O(n) time, O(n) space (call stack)
function reverseListRecursive(head) {
  if (!head || !head.next) return head; // base case
  const newHead = reverseListRecursive(head.next); // reverse rest
  head.next.next = head;  // point next node back to current
  head.next = null;        // disconnect current from next
  return newHead;
}

// Find middle of linked list (fast/slow pointers)
function findMiddle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow; // slow is at middle when fast reaches end
}`}
      </CodeBlock>

      <CodeBlock language="javascript" filename="Merge Two Sorted Lists — LeetCode 21">
{`function mergeTwoLists(l1, l2) {
  // Sentinel/dummy head simplifies edge cases
  const dummy = { next: null };
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }

  curr.next = l1 || l2; // attach remaining nodes
  return dummy.next;
}

// [1,2,4] + [1,3,4] → [1,1,2,3,4,4]`}
      </CodeBlock>

      <SectionHeader number={5} title="LRU Cache — Most Important Real-World Application" />
      <AlertBox type="tip" title="LRU Cache = Doubly Linked List + HashMap">
        The LRU (Least Recently Used) cache is the most important real-world application of doubly
        linked lists. The list maintains access order (most recent at head); the map provides O(1)
        node lookup for O(1) get and put operations. This is used in CPU caches, OS page replacement,
        and database buffer pools.
      </AlertBox>

      <CodeBlock language="javascript" filename="LRU Cache — Doubly Linked List + HashMap">
{`class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();         // key → node (O(1) lookup)
    this.head = { key: null, val: null }; // dummy head (most recent side)
    this.tail = { key: null, val: null }; // dummy tail (least recent side)
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._remove(node);    // remove from current position
    this._addToFront(node); // move to most recently used
    return node.val;
  }

  put(key, val) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.val = val;
      this._remove(node);
      this._addToFront(node);
    } else {
      if (this.map.size === this.capacity) {
        const lru = this.tail.prev; // remove least recently used
        this._remove(lru);
        this.map.delete(lru.key);
      }
      const node = { key, val };
      this.map.set(key, node);
      this._addToFront(node);
    }
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _addToFront(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }
}

const cache = new LRUCache(2);
cache.put(1, 1);
cache.put(2, 2);
cache.get(1);    // → 1, moves key 1 to front
cache.put(3, 3); // evicts key 2 (least recently used)
cache.get(2);    // → -1 (evicted)`}
      </CodeBlock>

      <SectionHeader number={6} title="When to Use a Linked List" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Use Linked List', description: 'Frequent insertions/deletions at the beginning or middle. Implementing stacks, queues, or deques. When size is highly variable and memory efficiency matters. LRU cache implementation.' },
        { title: 'Avoid Linked List', description: 'Frequent index-based access (use array). Cache-sensitive performance requirements (array has 10-50x better cache hit rate). When memory overhead of pointers matters (embedded systems).' },
        { title: 'Real Use: Browser History', description: 'Back/forward navigation is a doubly linked list. Move forward (next), move backward (prev), truncate future history when navigating to a new URL. Current page is the head node.' },
        { title: 'Real Use: OS Memory Management', description: 'Free memory blocks are managed as a linked list. The allocator traverses the list to find a block of sufficient size (first-fit, best-fit). Coalescing adjacent free blocks requires pointer manipulation.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Why is linked list insert O(1) but you said search is O(n)?',
          answer: 'Insert is O(1) only IF you already have a reference to the node you want to insert after. Finding that node by value in the first place is O(n) — you must traverse from head. In practice, the O(1) insert happens when another data structure (like a HashMap in an LRU cache) gives you direct node access. Combined lookup + insert is O(n) for singly linked lists.',
        },
        {
          question: 'Are linked lists used in real production code?',
          answer: 'Yes, but usually through higher-level abstractions. Java\'s LinkedList and ArrayDeque, Python\'s collections.deque (doubly linked list internally), LRU caches (Python\'s functools.lru_cache uses a doubly linked list), OS kernel task scheduling queues, and many database buffer manager implementations use linked lists. Direct linked list coding is most common in systems programming and implementing other data structures.',
        },
        {
          question: 'What is the difference between a linked list and an array in terms of memory and performance?',
          answer: 'Arrays store elements contiguously — adjacent in memory. When you access arr[i], the CPU prefetcher loads the next few elements into cache automatically (spatial locality). Linked list nodes can be anywhere in heap memory. Each pointer dereference may cause a cache miss (100-300 cycles vs 1-4 cycles for cache hits). For sequential iteration over large datasets, arrays are typically 5-50x faster than linked lists despite the same O(n) complexity — the constant factor matters enormously in practice.',
        },
        {
          question: 'What is a sentinel node and when should I use it?',
          answer: 'A sentinel (dummy) node is a placeholder head or tail node that simplifies edge cases. Without it, every operation must check "is this the head?" or "is the list empty?". With a sentinel head, head.next is always a valid pointer, even for empty lists. Most production linked list code uses sentinel nodes. The LRU cache above uses both head and tail sentinels to eliminate boundary checking in _remove and _addToFront.',
        },
        {
          question: 'How do I find the nth node from the end in O(n) with O(1) space?',
          answer: 'Two-pointer technique: advance the fast pointer n steps ahead. Then move both pointers at the same speed until fast reaches the last node. Slow is now at the (n+1)th node from the end — one node before the target. This works in a single traversal without knowing the list length. For n=1 (last node), fast advances to the last node and slow stops at the second-to-last.',
        },
        {
          question: 'What is the difference between shallow and deep copying a linked list?',
          answer: 'A shallow copy copies the node references — both the original and copy point to the same nodes. Modifying a node through one changes the other. A deep copy creates entirely new nodes with the same data — a completely independent list. For a singly linked list deep copy: iterate and create new nodes. For lists with random pointers (LeetCode 138 "Copy List with Random Pointer"): use a HashMap mapping original nodes to new nodes, then set next and random pointers in a second pass.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
