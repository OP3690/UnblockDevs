'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
} from '@/components/blog/BlogVisuals';

export default function WhatIsHashmapHashtableExplainedSimplyWithExamplesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>HashMap / HashTable Explained Simply — With Code Examples in JavaScript, Python & Java</h1>
      <p className="lead">
        A HashMap is one of the most important data structures in programming — it gives you O(1) average
        lookup, insert, and delete. Understanding how hash maps work makes you dramatically better at
        writing efficient code and solving algorithm problems.
      </p>

      <StatGrid stats={[
        { value: 'O(1)', label: 'average get/set/delete', color: 'green' },
        { value: 'O(n)', label: 'worst case (hash collisions)', color: 'amber' },
        { value: 'Key→Value', label: 'maps any key to any value', color: 'blue' },
        { value: '~75%', label: 'of LeetCode problems easier with a map', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="The Core Idea" />
      <p>
        A HashMap stores key-value pairs and uses a <strong>hash function</strong> to convert each key
        into an array index. Instead of searching through all elements, you compute the index directly —
        making lookup O(1) regardless of how many items are stored.
      </p>

      <QuickFact>
        Think of a HashMap like a physical storage locker. The "hash function" is the label on your locker.
        Instead of checking every locker, you go directly to yours. That's O(1) access.
      </QuickFact>

      <CodeBlock language="javascript" filename="How Hashing Works (Simplified)">
{`// Simplified hash function concept
function hash(key, tableSize) {
  let h = 0;
  for (const char of key) {
    h = (h + char.charCodeAt(0)) % tableSize;
  }
  return h; // this is the array index
}

hash("name", 100)   // → 42 (example)
hash("email", 100)  // → 73 (example)

// The HashMap stores:
// array[42] = { key: "name", value: "Alice" }
// array[73] = { key: "email", value: "alice@example.com" }

// Lookup: get("name") → hash("name") = 42 → array[42].value = "Alice"`}
      </CodeBlock>

      <SectionHeader number={2} title="Using Hash Maps in JavaScript, Python, Java" />

      <CodeBlock language="javascript" filename="JavaScript — Map (modern) and Object">
{`// Modern Map: any key type, preserves insertion order
const map = new Map();
map.set('name', 'Alice');
map.set('age', 30);
map.set(42, 'the answer'); // non-string key!

map.get('name');        // → 'Alice'
map.has('age');         // → true
map.delete('age');
map.size;               // → 2

// Iterate:
for (const [key, value] of map) {
  console.log(key, value);
}

// Object (plain, keys are strings only):
const obj = { name: 'Alice', age: 30 };
obj['name'];             // → 'Alice'
Object.keys(obj);        // → ['name', 'age']`}
      </CodeBlock>

      <CodeBlock language="python" filename="Python — dict">
{`# Python dict is a hash map
user = {'name': 'Alice', 'age': 30}

# CRUD operations
user['email'] = 'alice@example.com'  # set
user['name']                          # → 'Alice'
'age' in user                         # → True
del user['age']

# Safe get with default
user.get('phone', 'N/A')  # → 'N/A' (no KeyError)

# Iterate
for key, value in user.items():
    print(f"{key}: {value}")

# Counter (frequency map) — very common pattern
from collections import Counter
words = ['apple', 'banana', 'apple', 'cherry']
freq = Counter(words)  # {'apple': 2, 'banana': 1, 'cherry': 1}`}
      </CodeBlock>

      <CodeBlock language="java" filename="Java — HashMap">
{`import java.util.HashMap;
import java.util.Map;

Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);

scores.get("Alice");              // → 95
scores.containsKey("Bob");        // → true
scores.getOrDefault("Carol", 0);  // → 0 (safe default)
scores.remove("Bob");

// Iterate
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}`}
      </CodeBlock>

      <SectionHeader number={3} title="The Frequency Counter Pattern (Most Important)" />
      <p>
        Using a HashMap as a frequency counter transforms O(n²) problems into O(n). This pattern
        appears in ~40% of array/string algorithm problems.
      </p>

      <ErrorFix
        bad={`// O(n²) — nested loop to find duplicates
function hasDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}`}
        good={`// O(n) — hash set for O(1) lookup
function hasDuplicate(arr) {
  const seen = new Set();
  for (const n of arr) {
    if (seen.has(n)) return true;
    seen.add(n);
  }
  return false;
}`}
        badLabel="O(n²) nested loop"
        goodLabel="O(n) with Set/Map"
      />

      <CodeBlock language="javascript" filename="Frequency Counter — Common Patterns">
{`// Count character frequency
function charFrequency(str) {
  const freq = {};
  for (const c of str) {
    freq[c] = (freq[c] || 0) + 1;
  }
  return freq;
}
charFrequency("aabbc") // { a:2, b:2, c:1 }

// Two Sum — classic interview problem
function twoSum(nums, target) {
  const seen = new Map(); // value → index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
  return [];
}
twoSum([2,7,11,15], 9) // → [0, 1]`}
      </CodeBlock>

      <SectionHeader number={4} title="Hash Collisions" />
      <p>
        Two different keys can hash to the same index — this is a collision. Good hash maps handle it
        via chaining (each slot holds a linked list) or open addressing (probe for the next open slot).
      </p>

      <AlertBox type="info" title="Why HashMap is O(1) average but O(n) worst case">
        In the worst case, all keys hash to the same index — every lookup scans the entire collision chain.
        Good hash functions and a proper load factor (resize when ~75% full) keep collisions rare and
        maintain O(1) average performance.
      </AlertBox>

      <SectionHeader number={5} title="HashMap vs Array vs Set" />
      <CompareTable
        leftLabel="Data Structure"
        rightLabel="Best For"
        rows={[
          { label: 'Array / List', left: 'O(1) indexed access, O(n) search', right: 'Ordered data, index-based access, iteration' },
          { label: 'HashMap / Map', left: 'O(1) key lookup, O(n) full scan', right: 'Key-value pairs, frequency counting, caching' },
          { label: 'Set', left: 'O(1) membership test, O(1) insert', right: 'Unique values, deduplication, fast contains check' },
          { label: 'Sorted Array', left: 'O(log n) binary search', right: 'Range queries, sorted output required' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'What is the difference between HashMap and Hashtable in Java?',
          answer: 'Hashtable is legacy (Java 1.0) and synchronized (thread-safe but slow). HashMap is modern (Java 1.2), not synchronized, allows one null key. For thread-safe use, prefer ConcurrentHashMap over Hashtable.',
        },
        {
          question: 'What is the difference between Map and Object in JavaScript?',
          answer: 'Object: keys must be strings or symbols, prototype chain pollution risk, no guaranteed insertion order in old engines. Map: keys can be any type (including objects), no prototype issues, guaranteed insertion order, has .size property. Use Map when keys aren\'t strings, or when you need guaranteed order/size.',
        },
        {
          question: 'Why is HashMap lookup O(1) and not O(log n)?',
          answer: 'A tree-based map (like Java\'s TreeMap) uses a balanced BST and achieves O(log n). A HashMap uses a hash function to jump directly to the bucket — no comparison tree needed. This is why HashMap is O(1) average but doesn\'t support ordered operations (range queries, min/max).',
        },
        {
          question: 'When should I use a HashMap vs a database index?',
          answer: 'HashMap: in-memory, application-level lookups within the same process. Database index: persisted, disk-based, shared across processes. For in-process caching and algorithm problems — HashMap. For persistent data and cross-request lookups — database index.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
