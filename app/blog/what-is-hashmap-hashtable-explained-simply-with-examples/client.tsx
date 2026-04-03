'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, ErrorFix,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function WhatIsHashmapHashtableExplainedSimplyWithExamplesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>HashMap / HashTable Explained Simply — With Code Examples in JavaScript, Python & Java</h1>
      <p className="lead">
        A HashMap is one of the most important data structures in programming — it gives you O(1) average
        lookup, insert, and delete. Understanding how hash maps work makes you dramatically better at
        writing efficient code and solving algorithm problems. This guide covers the internals, all three
        major language implementations, and the essential interview patterns.
      </p>

      <StatGrid stats={[
        { value: 'O(1)', label: 'average get/set/delete', color: 'green' },
        { value: 'O(n)', label: 'worst case (hash collisions)', color: 'amber' },
        { value: 'Key→Value', label: 'maps any key to any value', color: 'blue' },
        { value: '~75%', label: 'of LeetCode problems easier with a map', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="The Core Idea" />
      <QuickFact color="blue" label="The storage locker analogy">
        Think of a HashMap like a storage locker facility. The "hash function" converts your key (like a name)
        into a locker number. Instead of checking every locker to find yours, you go directly to locker 42.
        That's O(1) access. The hash function computes the location from the key in constant time.
      </QuickFact>

      <CodeBlock language="javascript" filename="How Hashing Works (Simplified)">
{`// Simplified hash function concept
function hash(key, tableSize) {
  let h = 0;
  for (const char of key) {
    h = (h * 31 + char.charCodeAt(0)) % tableSize;
  }
  return h; // this is the array index
}

hash("name", 100)   // → 57 (example)
hash("email", 100)  // → 82 (example)

// The HashMap stores entries at computed indices:
// array[57] = { key: "name", value: "Alice" }
// array[82] = { key: "email", value: "alice@example.com" }

// Lookup: get("name") → hash("name") = 57 → array[57].value = "Alice"
// No searching — direct jump to the right slot in O(1)

// Collision: if hash("age") also returns 57, we have a COLLISION
// Resolved by chaining: array[57] = linked list of all entries that hash to 57`}
      </CodeBlock>

      <SectionHeader number={2} title="Using Hash Maps in JavaScript, Python, Java" />

      <CodeBlock language="javascript" filename="JavaScript — Map (modern) and Object">
{`// Modern Map: any key type, preserves insertion order, has .size
const map = new Map();
map.set('name', 'Alice');
map.set('age', 30);
map.set(42, 'the answer');  // non-string key!
map.set({ id: 1 }, 'obj'); // object as key!

map.get('name');             // → 'Alice'
map.has('age');              // → true
map.delete('age');
map.size;                    // → 3

// Iterate in insertion order:
for (const [key, value] of map) {
  console.log(key, value);
}

// Convert to array:
[...map.keys()];    // ['name', 42, {id:1}]
[...map.values()];  // ['Alice', 'the answer', 'obj']
[...map.entries()]; // [['name','Alice'], ...]

// Plain Object (legacy style — keys are strings/symbols only):
const obj = { name: 'Alice', age: 30 };
obj['name'];              // → 'Alice'
obj.name;                 // → 'Alice' (dot notation)
Object.keys(obj);         // → ['name', 'age']
Object.entries(obj);      // → [['name','Alice'], ['age',30]]`}
      </CodeBlock>

      <CodeBlock language="python" filename="Python — dict and Counter">
{`# Python dict is a hash map — first-class citizen
user = {'name': 'Alice', 'age': 30}

# CRUD operations
user['email'] = 'alice@example.com'  # insert/update
user['name']                          # → 'Alice'
'age' in user                         # → True (O(1) check)
del user['age']                       # delete

# Safe get with default — avoids KeyError
user.get('phone', 'N/A')  # → 'N/A' (key not found)
user.get('name', 'Unknown')  # → 'Alice'

# setdefault — initialize if missing
user.setdefault('scores', []).append(95)  # {'scores': [95]}

# Iterate
for key, value in user.items():
    print(f"{key}: {value}")

# Counter — frequency map (extremely useful)
from collections import Counter
words = ['apple', 'banana', 'apple', 'cherry', 'apple']
freq = Counter(words)  # Counter({'apple': 3, 'banana': 1, 'cherry': 1})
freq.most_common(2)   # [('apple', 3), ('banana', 1)]

# defaultdict — auto-initializes missing keys
from collections import defaultdict
groups = defaultdict(list)
for name, dept in [('Alice','Eng'), ('Bob','Eng'), ('Carol','Sales')]:
    groups[dept].append(name)
# {'Eng': ['Alice','Bob'], 'Sales': ['Carol']}`}
      </CodeBlock>

      <CodeBlock language="java" filename="Java — HashMap and related classes">
{`import java.util.*;

Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);

scores.get("Alice");                    // → 95
scores.getOrDefault("Carol", 0);       // → 0 (safe default, no NPE)
scores.containsKey("Bob");             // → true
scores.putIfAbsent("Dave", 100);       // only adds if key absent
scores.computeIfAbsent("Eve", k -> k.length()); // compute value if absent
scores.remove("Bob");

// Iterate
for (Map.Entry<String, Integer> entry : scores.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// Java 8+ forEach:
scores.forEach((key, val) -> System.out.println(key + "=" + val));

// LinkedHashMap: preserves insertion order (HashMap doesn't guarantee order)
Map<String, Integer> ordered = new LinkedHashMap<>();

// TreeMap: sorted by key (O(log n) operations)
Map<String, Integer> sorted = new TreeMap<>();

// ConcurrentHashMap: thread-safe (prefer over Hashtable)
Map<String, Integer> concurrent = new ConcurrentHashMap<>();`}
      </CodeBlock>

      <SectionHeader number={3} title="The Frequency Counter Pattern (Most Important)" />
      <p>
        Using a HashMap as a frequency counter transforms O(n²) problems into O(n). This pattern
        appears in roughly 40% of array/string algorithm interview problems.
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
}
// 1000 elements → up to 500,000 comparisons`}
        good={`// O(n) — hash set for O(1) lookup
function hasDuplicate(arr) {
  const seen = new Set();
  for (const n of arr) {
    if (seen.has(n)) return true; // duplicate found
    seen.add(n);
  }
  return false;
}
// 1000 elements → exactly 1000 operations`}
        badLabel="O(n²) nested loop"
        goodLabel="O(n) with Set/Map"
      />

      <CodeBlock language="javascript" filename="Essential HashMap Patterns for Interviews">
{`// Pattern 1: Character frequency (anagram check)
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const freq = {};
  for (const c of s) freq[c] = (freq[c] || 0) + 1;
  for (const c of t) {
    if (!freq[c]) return false;
    freq[c]--;
  }
  return true;
}

// Pattern 2: Two Sum (classic)
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
twoSum([2,7,11,15], 9); // → [0, 1]

// Pattern 3: Group by property
function groupAnagrams(words) {
  const groups = new Map();
  for (const word of words) {
    const key = [...word].sort().join(''); // sorted chars = anagram signature
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(word);
  }
  return [...groups.values()];
}
groupAnagrams(['eat','tea','tan','ate','nat','bat']);
// → [['eat','tea','ate'],['tan','nat'],['bat']]

// Pattern 4: Sliding window with frequency map
function lengthOfLongestSubstringKDistinct(s, k) {
  const freq = new Map();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    freq.set(s[right], (freq.get(s[right]) || 0) + 1);
    while (freq.size > k) {
      const c = s[left++];
      freq.set(c, freq.get(c) - 1);
      if (freq.get(c) === 0) freq.delete(c);
    }
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`}
      </CodeBlock>

      <SectionHeader number={4} title="Hash Collisions — How They're Handled" />
      <AlertBox type="info" title="Why HashMap is O(1) average but O(n) worst case">
        In the worst case, all keys hash to the same index — every lookup scans the entire collision chain.
        Good hash functions and a proper load factor (resize when ~75% full) keep collisions rare.
        Java's HashMap resizes by doubling when load factor exceeds 0.75. Python's dict uses ~66% load factor.
        Real performance: typically 1-2 comparisons per lookup even under moderate load.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'Separate Chaining', description: 'Each bucket holds a linked list (or in Java 8+, a balanced tree when the chain grows beyond 8). Collision just adds to the chain. Simple, handles high load well. Used by Java HashMap, Python dict.' },
        { title: 'Open Addressing (Probing)', description: 'On collision, probe for the next open slot (linear, quadratic, or double hashing). Better cache performance (data stays in the array). Used by Python\'s older dict, C++\'s unordered_map.' },
        { title: 'Load Factor and Resizing', description: 'When the hash map is too full (high load factor), collisions increase. Solution: resize — allocate a larger array and rehash all entries. Java defaults to 0.75 load factor before resizing.' },
        { title: 'Hash Function Quality', description: 'A bad hash function that maps many keys to the same bucket degrades performance to O(n). Good hash functions distribute keys uniformly. Java String.hashCode() uses polynomial rolling hash with prime base 31.' },
      ]} />

      <SectionHeader number={5} title="HashMap vs Array vs Set vs TreeMap" />
      <CompareTable
        leftLabel="Data Structure"
        rightLabel="Best For"
        rows={[
          { label: 'Array / List', left: 'O(1) indexed access, O(n) search', right: 'Ordered data, index-based access, iteration' },
          { label: 'HashMap / Map', left: 'O(1) key lookup, insert, delete', right: 'Key-value pairs, frequency counting, memoization' },
          { label: 'Set (HashSet)', left: 'O(1) membership test, O(1) insert', right: 'Unique values, deduplication, fast contains check' },
          { label: 'TreeMap / SortedDict', left: 'O(log n) all operations', right: 'Range queries, ordered keys, min/max needed' },
          { label: 'LinkedHashMap', left: 'O(1) operations + insertion order', right: 'LRU cache, ordered iteration by insertion time' },
        ]}
      />

      <VerticalSteps steps={[
        { title: 'Choose HashMap when you need O(1) lookup by key', desc: 'Any time you need to check "have I seen this before?" or "what is the value for this key?", reach for a HashMap/dict. It\'s the right tool for ~40% of algorithm problems.' },
        { title: 'Use the frequency counter pattern', desc: 'Count occurrences: freq[x] = (freq[x] || 0) + 1. This pattern converts dozens of O(n²) problems into O(n). Anagram check, two sum, group anagrams, sliding window all use it.' },
        { title: 'Understand the key requirements', desc: 'HashMap keys must be hashable (immutable in Python: strings, numbers, tuples — not lists). In JavaScript\'s Map, any value is a valid key. In Java, objects must implement hashCode() and equals().' },
        { title: 'Watch for integer overflow in hash functions', desc: 'In Java, Integer.MAX_VALUE + 1 overflows to negative. Use Long or use Math.abs(). In JavaScript, all numbers are floats — use BigInt for very large keys. In Python, integers are arbitrary precision.' },
        { title: 'Know the ordered alternatives', desc: 'TreeMap/SortedDict when you need range queries or min/max. LinkedHashMap when insertion order matters. Python\'s dict (3.7+) preserves insertion order by default.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is the difference between HashMap and Hashtable in Java?',
          answer: 'Hashtable is the legacy (Java 1.0) synchronized version — thread-safe but slow because every operation acquires a lock. HashMap is modern (Java 1.2), not synchronized, allows one null key and null values, and is significantly faster in single-threaded code. For thread-safe use, prefer ConcurrentHashMap (fine-grained locking) over Hashtable. For ordered maps, use LinkedHashMap (insertion order) or TreeMap (sorted order).',
        },
        {
          question: 'What is the difference between Map and Object in JavaScript?',
          answer: 'Object: keys must be strings or Symbols, has prototype chain which can cause key conflicts (__proto__, constructor, toString), no guaranteed insertion order in very old engines. Map: keys can be any type including objects and functions, no prototype pollution, guaranteed insertion order, has .size property, performs better for frequent additions/deletions. Use Map when keys aren\'t strings, need ordered iteration, or need non-string keys. Use Object for simple configuration or when interfacing with JSON.',
        },
        {
          question: 'Why is HashMap lookup O(1) and not O(log n)?',
          answer: 'A tree-based map (Java\'s TreeMap, Python\'s sortedcontainers.SortedDict) uses a balanced BST and needs O(log n) comparisons. A HashMap uses a hash function to jump directly to the right bucket in the array — no comparisons along a tree path, just compute index and jump. This is why HashMap is O(1) average. The trade-off: HashMap doesn\'t support ordered operations (range queries, successor/predecessor, min/max).',
        },
        {
          question: 'When should I use a HashMap vs a database index?',
          answer: 'HashMap: in-memory, application-level lookups within the same process. Data is lost when process restarts. Ideal for caching, deduplication within a request, frequency counting during algorithm execution. Database index: persisted, disk-based, shared across processes and requests. Survives restarts, handles millions of records, supports complex queries. Use HashMap for ephemeral in-process operations, database index for permanent data storage and cross-request queries.',
        },
        {
          question: 'How do I handle mutable keys in a HashMap?',
          answer: 'Mutable keys are dangerous — if you modify a key after insertion, the hash changes and the entry becomes unreachable (permanently lost in the map). Always use immutable keys: strings, numbers, frozen objects. In Python, use tuples not lists as keys. In JavaScript\'s Map, avoid using mutable objects as keys if you intend to modify them. In Java, String and numeric wrappers are immutable and safe. If you must use mutable objects as keys, override hashCode() based on immutable fields only.',
        },
        {
          question: 'What is memoization and how does HashMap enable it?',
          answer: 'Memoization caches the result of expensive function calls using the input as a key. The HashMap stores computed results so the function is called at most once per unique input. Example: fibonacci with memoization runs in O(n) instead of O(2^n). const memo = new Map(); if (memo.has(n)) return memo.get(n); const result = fib(n-1) + fib(n-2); memo.set(n, result); return result; Python\'s @functools.lru_cache decorator does this automatically with a HashMap-based LRU cache.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
