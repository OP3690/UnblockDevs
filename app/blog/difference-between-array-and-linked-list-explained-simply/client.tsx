'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function DifferenceBetweenArrayAndLinkedListExplainedSimplyClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Array vs Linked List — Differences Explained Simply With Examples</h1>
      <p className="lead">
        Arrays and linked lists are the two most fundamental data structures. Arrays give you instant
        index access but slow insertions at the middle. Linked lists give you fast insertions but no
        random access. Knowing when to use each is a core developer skill — and the source of many
        interview questions. This guide explains the memory model, full operation complexity comparison,
        real code examples in JavaScript, and practical rules for when to choose each structure.
      </p>

      <StatGrid stats={[
        { value: 'O(1)', label: 'array index access — directly computed from memory address', color: 'green' },
        { value: 'O(n)', label: 'array insert/delete at middle — must shift all elements', color: 'amber' },
        { value: 'O(1)', label: 'linked list insert/delete with known node reference', color: 'green' },
        { value: 'O(n)', label: 'linked list search — must traverse from head', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Memory Layout — The Fundamental Difference" />
      <p>
        The performance characteristics of arrays and linked lists all flow from one fundamental
        difference: how they store data in memory. An array allocates a single contiguous block
        of memory. A linked list allocates individual nodes anywhere in memory and connects
        them with pointers.
      </p>
      <QuickFact color="blue" label="Why contiguous memory matters">
        An array is a contiguous block of memory — elements are stored side by side.
        arr[5] = memory_start + (5 × element_size) — computed in one instruction.
        A linked list scatters nodes anywhere in memory, connected by pointers.
        This single difference explains every performance trade-off between the two structures.
        Contiguous = fast index access + great cache performance. Scattered = flexible size + fast insertion.
      </QuickFact>

      <SectionHeader number={2} title="Full Operation Complexity Comparison" />
      <CompareTable
        leftLabel="Array"
        rightLabel="Linked List"
        rows={[
          { label: 'Memory layout', left: 'Contiguous — one block', right: 'Scattered — each node anywhere in memory' },
          { label: 'Access by index', left: 'O(1) — direct: arr[5] = one computation', right: 'O(n) — traverse from head to position n' },
          { label: 'Search by value', left: 'O(n) unsorted; O(log n) sorted (binary search)', right: 'O(n) always — must traverse sequentially' },
          { label: 'Insert at front', left: 'O(n) — shift all elements one position right', right: 'O(1) — create node, update head pointer' },
          { label: 'Insert at end', left: 'O(1) amortized — dynamic arrays resize when needed', right: 'O(1) with tail pointer; O(n) singly without it' },
          { label: 'Insert at middle', left: 'O(n) — must shift all elements after insertion point', right: 'O(1) if you have the node reference; O(n) to find it' },
          { label: 'Delete at front', left: 'O(n) — shift all elements left', right: 'O(1) — update head pointer to head.next' },
          { label: 'Delete at middle', left: 'O(n) — must shift elements after deletion', right: 'O(1) doubly-linked if you have node; O(n) to find' },
          { label: 'Memory per element', left: 'Just the data (e.g., 4 bytes for int)', right: 'Data + 1 pointer (singly) or 2 pointers (doubly)' },
          { label: 'CPU cache performance', left: 'Excellent — spatial locality means cache hits', right: 'Poor — random memory access causes cache misses' },
          { label: 'Size flexibility', left: 'Expensive realloc for fixed arrays; O(1) amortized for dynamic', right: 'Free — just add or remove nodes, no reallocation' },
        ]}
      />

      <SectionHeader number={3} title="When to Use Each Structure" />
      <KeyPointsGrid columns={2} items={[
        {
          title: 'Use Array When...',
          description: 'You access elements by index frequently. You iterate through elements sequentially (cache friendly). You need CPU cache performance for compute-heavy operations. Elements are fixed-size and count is known or bounded. You use binary search on sorted data.',
        },
        {
          title: 'Use Linked List When...',
          description: 'You insert or delete frequently at the beginning or middle. You don\'t need random access — only sequential traversal. Implementing stacks, queues, or deques at a lower level. Building LRU caches (doubly linked list + hash map combo). The size changes dramatically and unpredictably.',
        },
        {
          title: 'Dynamic Arrays in Practice',
          description: 'Modern "arrays" in languages are dynamic arrays: JavaScript Array, Python list, Java ArrayList, C++ vector. They\'re backed by resizable contiguous memory. O(1) amortized append (doubles capacity when full). O(n) insert/delete in middle. Use these as your default — reach for linked lists only when you have a specific need.',
        },
        {
          title: 'Linked List in Practice',
          description: 'Rarely used directly in application code. Usually used via higher-level abstractions: Java LinkedList, Python deque (doubly-linked). The LRU cache (doubly linked list + HashMap) is the most common real-world use. The concepts matter for system design interviews and understanding how deques work internally.',
        },
      ]} />

      <SectionHeader number={4} title="Code Implementation Comparison" />
      <CodeBlock lang="javascript" title="Array operations with complexity">
{`const arr = [10, 20, 30, 40, 50];

// O(1) — random access (computed directly from memory address)
console.log(arr[2]); // → 30

// O(1) amortized — append at end (dynamic resize when capacity reached)
arr.push(60); // [10, 20, 30, 40, 50, 60]

// O(n) — insert at front (must shift all 5 elements right)
arr.unshift(5); // [5, 10, 20, 30, 40, 50, 60]

// O(n) — insert at middle (must shift elements after position 2)
arr.splice(2, 0, 15); // [5, 10, 15, 20, 30, 40, 50, 60]

// O(log n) — binary search on sorted array (use array's sorted property!)
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = (left + right) >>> 1; // unsigned right shift = fast floor division
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

// O(n) — linear search (unsorted array, no choice)
const idx = arr.indexOf(30); // → 4 (must check each element)`}
      </CodeBlock>

      <CodeBlock lang="javascript" title="Linked list implementation with O(1) insertions">
{`class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null; // for doubly-linked list
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // O(1) — insert at head (no shifting!)
  prepend(val) {
    const node = new Node(val);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
    this.size++;
  }

  // O(1) — insert at tail (with tail pointer)
  append(val) {
    const node = new Node(val);
    if (!this.tail) {
      this.head = this.tail = node;
    } else {
      node.prev = this.tail;
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }

  // O(1) — remove a specific node (given the node reference)
  removeNode(node) {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next; // removing head
    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev; // removing tail
    this.size--;
  }

  // O(n) — access by index (no direct computation possible)
  get(index) {
    let curr = this.head;
    for (let i = 0; i < index; i++) {
      curr = curr?.next;
    }
    return curr?.val; // undefined if index out of bounds
  }
}

// Real use case: LRU Cache using DoublyLinkedList + HashMap
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();           // HashMap: key → node reference (O(1) access)
    this.list = new DoublyLinkedList(); // Most recent at head, LRU at tail
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this.list.removeNode(node);   // O(1) — we have node reference
    this.list.prepend(node.val);  // move to front (most recently used)
    this.map.set(key, this.list.head);
    return node.val;
  }
}`}
      </CodeBlock>

      <SectionHeader number={5} title="Cache Performance — Why Arrays Win in Practice" />
      <p>
        In real-world benchmarks, arrays often outperform linked lists even for operations
        where they have the same Big-O complexity. The reason is CPU cache behavior.
        Modern CPUs fetch memory in 64-byte cache lines. When you access arr[0], the CPU
        also loads arr[1] through arr[15] (for 4-byte ints) into the cache. Accessing
        arr[1] next is essentially free. For linked lists, each node is at a random
        memory address — every pointer follow likely causes a cache miss, which is
        100–300× slower than a cache hit.
      </p>
      <AlertBox type="tip" title="Choose array for iteration-heavy workloads">
        Even when a linked list would give better Big-O for certain operations, arrays often
        win in practice for iteration-heavy workloads because of CPU cache efficiency.
        Benchmark both if performance is critical. For small collections (under 1000 elements),
        always profile before optimizing — the simpler structure is usually fast enough.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Is JavaScript\'s Array actually a contiguous memory array?',
          answer: 'Modern JavaScript engines (V8, SpiderMonkey) optimize dense numeric arrays into actual contiguous memory — essentially C-style arrays under the hood. This gives true O(1) index access with great cache performance. However, sparse arrays (arr[100] = value with nothing at 0–99) or arrays with mixed types fall back to hash-map-based storage that\'s slower. For performance-critical code, keep JavaScript arrays dense (no gaps) and avoid mixing types (numbers with strings/objects).',
        },
        {
          question: 'Why are linked lists said to have "poor cache performance"?',
          answer: 'CPUs load memory in cache lines (~64 bytes). Array elements are adjacent in memory — accessing arr[1] after arr[0] is a cache hit (already loaded). Linked list nodes are scattered in memory — each pointer follow (node = node.next) requires loading a new, likely uncached memory location, causing a cache miss. A cache miss costs ~100 CPU cycles vs ~4 for a cache hit. For an array of 1000 elements, iteration is ~25× faster than a linked list in practice, despite both being O(n).',
        },
        {
          question: 'When would a linked list beat an array in real production code?',
          answer: 'The primary real-world case: LRU caches use a doubly linked list + hash map for O(1) get, O(1) put, and O(1) eviction. The hash map gives O(1) node lookup; the linked list gives O(1) move-to-front and remove-from-tail. An array-based LRU would require O(n) shifting for each operation. Other cases: deques (double-ended queues) with frequent insertions at both ends, and certain graph adjacency list representations.',
        },
        {
          question: 'What data structure should I use for a stack or queue?',
          answer: 'For a stack: JavaScript array (push/pop both O(1)) is perfect. Python list (append/pop). For a queue: avoid JavaScript array.shift() — it\'s O(n) because it shifts all elements. Instead, maintain a head index and treat the array as circular, or use a proper deque. Python: use collections.deque (O(1) on both ends). Java: use ArrayDeque. In interviews, declare a standard queue class to avoid implementation details.',
        },
        {
          question: 'What is a doubly linked list and when do you need it over a singly linked list?',
          answer: 'A doubly linked list has both next and prev pointers on each node. This allows O(1) deletion of any node (when you have the reference), and O(1) traversal in both directions. Singly linked lists only have next pointers — deleting a node requires knowing its predecessor (O(n) traversal). Use doubly linked lists when: you need to delete nodes by reference without traversal (LRU cache), you need to traverse both forward and backward, or you\'re implementing a deque with O(1) operations at both ends.',
        },
        {
          question: 'Can I sort a linked list? How does it compare to sorting an array?',
          answer: 'Yes — merge sort works efficiently on linked lists because merging two linked lists is O(n) without extra space (just pointer manipulation). Merge sort on a linked list is O(n log n) time, O(log n) space (recursion stack). Quicksort is impractical on linked lists because random access for pivot selection is O(n). Arrays support quicksort efficiently (O(n log n) with O(log n) space) and also benefit from cache efficiency during partition. In practice, sort an array and rebuild a linked list if needed, rather than sorting the linked list directly.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
