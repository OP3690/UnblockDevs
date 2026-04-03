'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function WhatIsStackVsQueueExplainedWithRealLifeExamplesClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Stack vs Queue Explained With Real-Life Examples + Code</h1>
      <p className="lead">
        Stack and Queue are two of the most fundamental data structures — and understanding the difference
        (LIFO vs FIFO) unlocks dozens of algorithms. This guide explains both with real-world analogies,
        implementations in multiple languages, interview problems, and the advanced monotonic stack pattern.
      </p>

      <StatGrid stats={[
        { value: 'LIFO', label: 'Stack — Last In, First Out', color: 'blue' },
        { value: 'FIFO', label: 'Queue — First In, First Out', color: 'green' },
        { value: 'O(1)', label: 'push/pop/enqueue/dequeue for both', color: 'purple' },
        { value: 'DFS/BFS', label: 'Stack enables DFS, Queue enables BFS', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Stack — Last In, First Out (LIFO)" />
      <QuickFact color="blue" label="The stack of plates analogy">
        A stack is like a stack of plates. You add to the top (push), and you take from the top (pop).
        The last plate you put on is the first one you take off — LIFO. The plate at the bottom was the
        first added but is the last removed.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'Undo/Redo (Text Editor)', description: 'Every edit pushed to the undo stack. Ctrl+Z pops the last edit. Ctrl+Y pops from the redo stack. This is a direct stack application — the most recent action undone first.' },
        { title: 'Browser Back Button', description: 'Visiting pages pushes to history stack. Back button pops. The most recently visited page is returned to first. This is LIFO in everyday use.' },
        { title: 'Function Call Stack', description: 'Every function call pushes a frame. Return pops it. "Maximum call stack size exceeded" is literally a stack overflow — the stack ran out of memory from deep recursion.' },
        { title: 'Parentheses Matching', description: 'Opening brackets pushed, closing brackets trigger a pop and match check. If the popped bracket matches, continue. If not, or stack is empty, invalid expression.' },
      ]} />

      <CodeBlock language="javascript" filename="Stack Implementation — JavaScript">
{`// In JavaScript, use an array as a stack
const stack = [];

stack.push(1);   // [1]
stack.push(2);   // [1, 2]
stack.push(3);   // [1, 2, 3]

stack.pop();                      // → 3, stack: [1, 2]
stack[stack.length - 1];          // peek at top: 2 (no removal)
stack.length;                     // 2

// Custom Stack class with explicit interface
class Stack {
  #items = [];

  push(item)   { this.#items.push(item); }
  pop()        { return this.#items.pop(); }
  peek()       { return this.#items[this.#items.length - 1]; }
  isEmpty()    { return this.#items.length === 0; }
  get size()   { return this.#items.length; }
  toArray()    { return [...this.#items]; }
}

const s = new Stack();
s.push('a'); s.push('b'); s.push('c');
s.pop();   // → 'c'
s.peek();  // → 'b' (still in stack)
s.size;    // 2`}
      </CodeBlock>

      <CodeBlock language="python" filename="Stack in Python">
{`# Python list as stack — simple and idiomatic
stack = []
stack.append(1)   # push
stack.append(2)
stack.append(3)
stack.pop()       # → 3 (LIFO) — O(1)
stack[-1]         # peek: 2 — no removal

# collections.deque — more efficient for large stacks (deque vs list)
from collections import deque
stack = deque()
stack.append(1)
stack.append(2)
stack.pop()  # → 2 — O(1) guaranteed (list.pop() is also O(1) but deque is cleaner)

# Python's call stack is accessible:
import traceback
traceback.print_stack()  # prints the current call stack (top = current frame)`}
      </CodeBlock>

      <SectionHeader number={2} title="Queue — First In, First Out (FIFO)" />
      <QuickFact color="green" label="The coffee shop line analogy">
        A queue is like a line at a coffee shop. The first person to arrive is the first to be served.
        You add to the back (enqueue) and remove from the front (dequeue) — FIFO. Fair ordering,
        unlike a stack which always favors the latest addition.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'Print Queue', description: 'Documents added to back, printed from front. First document submitted is first printed. Multiple users share one printer through FIFO ordering.' },
        { title: 'BFS Tree/Graph Traversal', description: 'Queue processes nodes level by level. Enqueue children as you process each node. Dequeue from front to always process the shallowest node first.' },
        { title: 'Message Queues (Kafka, RabbitMQ)', description: 'Messages published to back of queue, consumed from front. FIFO guarantees messages processed in order within a partition/queue.' },
        { title: 'Task Schedulers', description: 'OS process scheduler uses priority queues (variation of FIFO). Web server request queues process connections in order of arrival.' },
      ]} />

      <CodeBlock language="javascript" filename="Queue Implementation — JavaScript">
{`// ⚠️ Array.shift() is O(n) — avoid for large queues (shifts all elements)
const queue = [];
queue.push(1);      // enqueue: [1]
queue.push(2);      // [1, 2]
queue.push(3);      // [1, 2, 3]
queue.shift();      // dequeue: → 1, queue: [2, 3]  ← O(n)!

// ✅ O(1) Queue using two stacks (amortized O(1) dequeue)
class Queue {
  #inbox  = [];  // enqueue here
  #outbox = [];  // dequeue here

  enqueue(item) {
    this.#inbox.push(item);    // O(1)
  }

  dequeue() {
    if (this.#outbox.length === 0) {
      // Transfer all — amortized O(1) per operation
      while (this.#inbox.length) {
        this.#outbox.push(this.#inbox.pop());
      }
    }
    return this.#outbox.pop(); // O(1)
  }

  peek() {
    return this.#outbox.length > 0
      ? this.#outbox[this.#outbox.length - 1]
      : this.#inbox[0];
  }

  isEmpty() {
    return this.#inbox.length === 0 && this.#outbox.length === 0;
  }
}`}
      </CodeBlock>

      <CodeBlock language="python" filename="Queue in Python">
{`from collections import deque

# deque is the right choice — O(1) both ends (list.pop(0) is O(n))
q = deque()
q.append(1)       # enqueue to right  O(1)
q.append(2)
q.append(3)
q.popleft()       # dequeue from left → 1 (FIFO)  O(1)
q[0]              # peek front: 2

# For thread-safe queues (producer/consumer pattern):
import queue
q = queue.Queue(maxsize=100)
q.put(item)       # enqueue (blocks if full)
q.get()           # dequeue (blocks if empty)
q.put_nowait(item)  # raises queue.Full if full`}
      </CodeBlock>

      <SectionHeader number={3} title="Stack vs Queue Comparison" />
      <CompareTable
        leftLabel="Stack (LIFO)"
        rightLabel="Queue (FIFO)"
        rows={[
          { label: 'Order', left: 'Last in, first out', right: 'First in, first out' },
          { label: 'Add operation', left: 'push (to top)', right: 'enqueue (to back)' },
          { label: 'Remove operation', left: 'pop (from top)', right: 'dequeue (from front)' },
          { label: 'Traversal algorithm', left: 'DFS (Depth-First Search)', right: 'BFS (Breadth-First Search)' },
          { label: 'Real-world use', left: 'Undo, call stack, backtracking, expression parsing', right: 'Task queue, print queue, BFS, message passing' },
          { label: 'Interview frequency', left: 'Very high — parentheses, calculator, DFS', right: 'Very high — BFS, level-order tree, sliding window' },
        ]}
      />

      <SectionHeader number={4} title="Classic Interview: Valid Parentheses (Stack)" />
      <CodeBlock language="javascript" filename="Valid Parentheses — LeetCode 20">
{`function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if ('([{'.includes(char)) {
      stack.push(char);  // push opening bracket
    } else {
      // Closing bracket: check if top of stack matches
      if (stack.pop() !== pairs[char]) return false;
    }
  }

  return stack.length === 0; // unmatched opening brackets remain
}

isValid("()[]{}");    // → true
isValid("([)]");      // → false (mismatched)
isValid("{[]}");      // → true

// Variation: Minimum Add to Make Parentheses Valid
function minAddToMakeValid(s) {
  let open = 0;   // unmatched '('
  let close = 0;  // unmatched ')'
  for (const c of s) {
    if (c === '(') open++;
    else if (open > 0) open--;  // match with existing open
    else close++;               // unmatched close
  }
  return open + close;
}`}
      </CodeBlock>

      <SectionHeader number={5} title="BFS with a Queue" />
      <CodeBlock language="javascript" filename="BFS — Level-order Tree Traversal — LeetCode 102">
{`function bfsLevelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root]; // Start with root

  while (queue.length > 0) {
    const levelSize = queue.length; // snapshot — ALL nodes at current level
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();      // dequeue from front (FIFO)
      level.push(node.val);
      if (node.left)  queue.push(node.left);   // enqueue children
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}

// Tree: [3,9,20,null,null,15,7]
// Result: [[3],[9,20],[15,7]]

// Variation: Level Order Zigzag (LeetCode 103)
// Same but alternate left-to-right and right-to-left using a flag
function zigzagLevelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];
  let leftToRight = true;

  while (queue.length) {
    const size = queue.length;
    const level = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      leftToRight ? level.push(node.val) : level.unshift(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
    leftToRight = !leftToRight;
  }
  return result;
}`}
      </CodeBlock>

      <SectionHeader number={6} title="Monotonic Stack — Advanced Pattern" />
      <AlertBox type="tip" title="Monotonic Stack — used in many hard problems">
        A monotonic stack maintains elements in strictly increasing or decreasing order. Used for:
        next greater element, daily temperatures, largest rectangle in histogram, trapping rain water.
        The pattern: pop elements that violate the monotonic property when a new element arrives.
      </AlertBox>

      <CodeBlock language="javascript" filename="Next Greater Element + Daily Temperatures">
{`// Next Greater Element — LeetCode 496
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // stores indices (monotonically decreasing values)

  for (let i = 0; i < nums.length; i++) {
    // Pop elements that nums[i] is greater than
    while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
      result[stack.pop()] = nums[i]; // found their next greater element
    }
    stack.push(i);
  }

  return result;
}

nextGreaterElement([4,1,2,3]); // → [-1,2,3,-1]
// 4: no greater → -1
// 1: 2 is next greater → 2
// 2: 3 is next greater → 3
// 3: no greater → -1

// Daily Temperatures — LeetCode 739 (same pattern, track days)
function dailyTemperatures(temps) {
  const result = new Array(temps.length).fill(0);
  const stack = []; // indices of days waiting for warmer temperature

  for (let i = 0; i < temps.length; i++) {
    while (stack.length && temps[stack[stack.length - 1]] < temps[i]) {
      const prevDay = stack.pop();
      result[prevDay] = i - prevDay; // days until warmer
    }
    stack.push(i);
  }
  return result;
}

dailyTemperatures([73,74,75,71,69,72,76,73]);
// → [1,1,4,2,1,1,0,0]`}
      </CodeBlock>

      <VerticalSteps steps={[
        { title: 'Choose Stack for LIFO problems', desc: 'Undo/redo operations, parsing nested structures (brackets, HTML tags), DFS traversal, evaluating expressions, and problems where the most recent element is most relevant.' },
        { title: 'Choose Queue for FIFO problems', desc: 'BFS traversal, level-by-level processing, task scheduling where order matters, and any problem where fairness (first-come-first-served) is required.' },
        { title: 'Use deque for both ends', desc: 'Python collections.deque and JavaScript implementations that support O(1) push/pop from both ends. Use for sliding window maximum, palindrome check, and any problem mixing stack and queue behavior.' },
        { title: 'Monotonic stack for next greater/smaller', desc: 'When the problem asks "for each element, find the next element greater/smaller than it" — that\'s a monotonic stack. Template: iterate, pop elements that violate monotonic property, record answers for popped elements.' },
        { title: 'Priority queue for by-value ordering', desc: 'When you need FIFO but by priority (not insertion order) — use a heap-based priority queue. Python: heapq module. Used in Dijkstra, A*, k-way merge, and task scheduling.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is a Deque (double-ended queue)?',
          answer: 'A deque (double-ended queue, pronounced "deck") supports O(1) push and pop from BOTH the front and back. Python\'s collections.deque is a deque. It can function as both a stack (append/pop from one end) and a queue (append to back, popleft from front). Use cases: sliding window maximum (LeetCode 239), palindrome check, BFS with priority (0-1 BFS). JavaScript\'s Array methods include push/pop (back) and unshift/shift (front) but shift/unshift are O(n) — use a proper deque library for performance.',
        },
        {
          question: 'Is the JavaScript call stack a real stack data structure?',
          answer: 'Yes! The JavaScript engine (V8, SpiderMonkey) maintains a call stack that is literally a stack data structure. When you call a function, an execution context (frame) is pushed onto the stack containing local variables, the return address, and function parameters. When the function returns, the frame is popped. "Maximum call stack size exceeded" (stack overflow) happens when recursion is too deep and the stack runs out of allocated memory — typically around 10,000-15,000 frames in V8.',
        },
        {
          question: 'What is a priority queue?',
          answer: 'A priority queue is a queue where elements are dequeued by priority (not arrival order). Typically implemented with a min-heap or max-heap. The highest/lowest priority element always comes out first, not the oldest element. Python: heapq module (min-heap by default). Java: PriorityQueue class. Use cases: Dijkstra\'s shortest path algorithm, A* pathfinding, Huffman encoding, k-closest points to origin, and any task scheduling problem where priority matters more than insertion order.',
        },
        {
          question: 'When should I use an explicit stack vs recursion?',
          answer: 'Both implement DFS traversal. Recursion uses the call stack implicitly — simpler code. An explicit stack is necessary when: (1) Recursion depth exceeds ~10,000 frames (stack overflow risk). (2) You need to pause/resume traversal, inspect the stack, or implement backtracking explicitly. (3) The language has limited stack size (some languages, environments). For most interview problems, recursion is simpler to write and reason about. Use explicit stack for production code on very deep trees or graphs.',
        },
        {
          question: 'How does a monotonic stack work?',
          answer: 'A monotonic stack maintains elements in either increasing or decreasing order. When a new element arrives: pop all elements from the stack that violate the monotonic property (e.g., pop elements smaller than the new element for a decreasing stack). For each popped element, record that the current element is its "next greater element." Push the new element. Result: each element is pushed and popped at most once → O(n) total. Problems: Next Greater Element, Daily Temperatures, Largest Rectangle in Histogram, Trapping Rain Water.',
        },
        {
          question: 'Can you implement a queue using two stacks?',
          answer: 'Yes — this is a classic interview question (LeetCode 232). Use two stacks: inbox for enqueue, outbox for dequeue. Enqueue: push to inbox O(1). Dequeue: if outbox is empty, pop all from inbox and push to outbox (reverses the order), then pop from outbox. Amortized O(1) per operation — each element is transferred at most once. This is the same as Python\'s deque implementation under the hood for certain operations.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
