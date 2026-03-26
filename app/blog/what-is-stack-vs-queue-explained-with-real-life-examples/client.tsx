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
        implementations in multiple languages, and interview problems.
      </p>

      <StatGrid stats={[
        { value: 'LIFO', label: 'Stack — Last In, First Out', color: 'blue' },
        { value: 'FIFO', label: 'Queue — First In, First Out', color: 'green' },
        { value: 'O(1)', label: 'push/pop for both', color: 'purple' },
        { value: 'DFS/BFS', label: 'Stack = DFS, Queue = BFS', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Stack — Last In, First Out (LIFO)" />
      <QuickFact>
        A stack is like a stack of plates. You add to the top (push), and you take from the top (pop).
        The last plate you put on is the first one you take off — LIFO.
      </QuickFact>

      <p>Real-world analogies: undo/redo in a text editor, browser back button, function call stack, parentheses matching.</p>

      <CodeBlock language="javascript" filename="Stack Implementation — JavaScript">
{`// In JavaScript, use an array as a stack
const stack = [];

stack.push(1);   // [1]
stack.push(2);   // [1, 2]
stack.push(3);   // [1, 2, 3]

stack.pop();     // → 3, stack: [1, 2]
stack[stack.length - 1]; // peek at top: 2
stack.length;    // 2

// Custom Stack class for clarity
class Stack {
  #items = [];

  push(item) { this.#items.push(item); }
  pop()      { return this.#items.pop(); }
  peek()     { return this.#items[this.#items.length - 1]; }
  isEmpty()  { return this.#items.length === 0; }
  get size() { return this.#items.length; }
}

const s = new Stack();
s.push('a'); s.push('b'); s.push('c');
s.pop();  // → 'c'
s.peek(); // → 'b'`}
      </CodeBlock>

      <CodeBlock language="python" filename="Stack in Python">
{`# Python list as stack
stack = []
stack.append(1)   # push
stack.append(2)
stack.append(3)
stack.pop()       # → 3 (LIFO)
stack[-1]         # peek: 2

# collections.deque is more efficient for large stacks
from collections import deque
stack = deque()
stack.append(1)
stack.append(2)
stack.pop()  # → 2`}
      </CodeBlock>

      <SectionHeader number={2} title="Queue — First In, First Out (FIFO)" />
      <QuickFact>
        A queue is like a line at a coffee shop. First person to arrive is first to be served.
        You add to the back (enqueue) and remove from the front (dequeue) — FIFO.
      </QuickFact>

      <p>Real-world analogies: print queue, task scheduler, BFS traversal, message queues (Kafka, RabbitMQ), customer service lines.</p>

      <CodeBlock language="javascript" filename="Queue Implementation — JavaScript">
{`// ⚠️ Array shift() is O(n) — use deque for large queues
const queue = [];
queue.push(1);      // enqueue: [1]
queue.push(2);      // [1, 2]
queue.push(3);      // [1, 2, 3]
queue.shift();      // dequeue: → 1, queue: [2, 3]

// Efficient Queue using two stacks or a linked list
class Queue {
  #in = [];   // enqueue here
  #out = [];  // dequeue here

  enqueue(item) { this.#in.push(item); }

  dequeue() {
    if (this.#out.length === 0) {
      while (this.#in.length) this.#out.push(this.#in.pop());
    }
    return this.#out.pop();
  }

  peek()    { return this.#out[this.#out.length - 1] ?? this.#in[0]; }
  isEmpty() { return this.#in.length === 0 && this.#out.length === 0; }
}`}
      </CodeBlock>

      <CodeBlock language="python" filename="Queue in Python">
{`from collections import deque

q = deque()
q.append(1)       # enqueue to right
q.append(2)
q.append(3)
q.popleft()       # dequeue from left → 1 (FIFO)
q[0]              # peek front: 2`}
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
          { label: 'Real-world use', left: 'Undo, call stack, backtracking', right: 'Task queue, print queue, BFS' },
          { label: 'Interview frequency', left: 'Very high — parentheses, DFS', right: 'Very high — BFS, level-order tree' },
        ]}
      />

      <SectionHeader number={4} title="Classic Interview: Valid Parentheses (Stack)" />
      <CodeBlock language="javascript" filename="Valid Parentheses — Classic Stack Problem">
{`function isValid(s) {
  const stack = [];
  const pairs = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if ('([{'.includes(char)) {
      stack.push(char);  // push opening bracket
    } else {
      if (stack.pop() !== pairs[char]) return false; // mismatch
    }
  }

  return stack.length === 0; // stack must be empty at end
}

isValid("()[]{}");    // → true
isValid("([)]");      // → false
isValid("{[]}");      // → true`}
      </CodeBlock>

      <SectionHeader number={5} title="BFS with a Queue" />
      <CodeBlock language="javascript" filename="BFS — Level-order Tree Traversal">
{`function bfsLevelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root]; // FIFO — Queue

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();     // dequeue
      level.push(node.val);
      if (node.left)  queue.push(node.left);  // enqueue
      if (node.right) queue.push(node.right);
    }

    result.push(level);
  }

  return result;
}
// Tree: [3,9,20,null,null,15,7]
// Result: [[3],[9,20],[15,7]]`}
      </CodeBlock>

      <SectionHeader number={6} title="Monotonic Stack — Advanced Pattern" />
      <AlertBox type="info" title="Monotonic Stack — used in many hard problems">
        A monotonic stack maintains elements in increasing (or decreasing) order. Used for: next greater element,
        daily temperatures, largest rectangle in histogram, trapping rain water.
      </AlertBox>

      <CodeBlock language="javascript" filename="Next Greater Element — Monotonic Stack">
{`function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // stores indices

  for (let i = 0; i < nums.length; i++) {
    // Pop elements smaller than current (found their answer)
    while (stack.length && nums[stack[stack.length-1]] < nums[i]) {
      result[stack.pop()] = nums[i];
    }
    stack.push(i);
  }

  return result;
}

nextGreaterElement([4,1,2,3]) // → [-1,2,3,-1]`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'What is a Deque (double-ended queue)?',
          answer: 'A deque (double-ended queue) supports O(1) push/pop from BOTH ends. Python\'s collections.deque is a deque. It can function as both a stack and a queue. Useful for sliding window maximum problems.',
        },
        {
          question: 'Is the JavaScript call stack a real stack?',
          answer: 'Yes! The call stack in JavaScript (and all languages) is literally a stack data structure. When you call a function, a frame is pushed. When it returns, the frame is popped. Maximum call stack size exceeded = stack overflow from too much recursion.',
        },
        {
          question: 'What is a priority queue?',
          answer: 'A priority queue is a queue where elements are dequeued by priority (not arrival order). Implemented with a heap. The highest (or lowest) priority element comes out first. Used in Dijkstra\'s algorithm, A*, and task schedulers.',
        },
        {
          question: 'When should I use a stack vs recursion?',
          answer: 'Both implement DFS. Recursion uses the call stack implicitly. An explicit stack avoids call stack overflow for deep trees (depth > ~10,000). For most problems, recursion is simpler to write; explicit stack is needed for very deep graphs.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
