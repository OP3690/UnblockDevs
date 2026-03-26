'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToDebugCodeStepByStepBeginnerFriendlyGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Debug Code Step by Step — Beginner-Friendly Guide</h1>
      <p className="lead">
        Debugging is a skill, not luck. Every experienced developer has a systematic approach
        to finding bugs. This guide teaches you the mental model and tools to debug any code —
        from simple print statement debugging to using breakpoints in a full IDE debugger.
      </p>

      <StatGrid stats={[
        { value: '90%', label: 'of bugs found by adding a single console.log in the right place', color: 'green' },
        { value: 'Bisect', label: 'divide and conquer — narrow down where bug lives', color: 'blue' },
        { value: 'Read errors', label: 'the error message tells you exactly what\'s wrong', color: 'purple' },
        { value: 'Rubber duck', label: 'explaining your code out loud finds most bugs', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="The Debugging Mindset" />
      <QuickFact>
        A bug is a gap between what you think the code does and what it actually does.
        Debugging is the process of finding where that gap is. The most important skill is
        not guessing — it's forming a hypothesis and testing it systematically.
      </QuickFact>

      <SectionHeader number={2} title="Step-by-Step Debugging Process" />
      <VerticalSteps steps={[
        { title: 'Read the error message carefully', description: 'Most beginners skip this. The error type, message, and line number tell you exactly where to look. "TypeError: Cannot read property x of undefined at line 42" → line 42, something is undefined.' },
        { title: 'Reproduce the bug reliably', description: 'Before fixing, make sure you can reproduce it. What exact inputs trigger it? If you can\'t reproduce it, you can\'t verify the fix.' },
        { title: 'Isolate where the bug occurs', description: 'Add console.log statements before the crash. Binary search through the code: does the bug happen before or after the midpoint? Narrow down until you find the exact line.' },
        { title: 'Inspect the actual values', description: 'console.log(typeof x, x) to see what x actually is (not what you think it is). The bug is almost always "this value is not what I expected."' },
        { title: 'Form a hypothesis and test it', description: 'Don\'t randomly change code. Form a theory: "I think x is undefined because Y isn\'t called yet." Test it: add a log, verify your theory, then fix.' },
        { title: 'Fix one thing at a time', description: 'Changing multiple things simultaneously makes it impossible to know what fixed the bug — or if you introduced a new one.' },
        { title: 'Verify the fix', description: 'Run the code again. Test edge cases. Make sure the original bug is gone AND you didn\'t break anything else.' },
      ]} />

      <SectionHeader number={3} title="Print Debugging — The Universal Tool" />
      <CodeBlock language="javascript" filename="Strategic console.log placement">
{`// Bad debugging — log too little context
function processUser(user) {
  console.log("here"); // ❌ tells you nothing
  return user.name.toUpperCase();
}

// Good debugging — log type and value
function processUser(user) {
  console.log("user:", typeof user, user);  // ✅ see the actual value
  console.log("user.name:", typeof user?.name, user?.name);
  return user.name.toUpperCase();
}

// Even better — JSON.stringify for objects
console.log("user:", JSON.stringify(user, null, 2));

// Trace function entry/exit
function processOrder(order) {
  console.log("[processOrder] IN:", order.id);
  const result = // ... logic
  console.log("[processOrder] OUT:", result);
  return result;
}

// Use console.table for arrays of objects
const users = [{id: 1, name: "Alice"}, {id: 2, name: "Bob"}];
console.table(users);  // ✅ renders as table in DevTools`}
      </CodeBlock>

      <SectionHeader number={4} title="Using Browser DevTools Debugger" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Breakpoints', description: 'Click line number in Sources tab → sets a breakpoint. Code pauses at that line. Inspect all variable values in the right panel. Step over/into/out to trace execution.' },
        { title: 'Conditional breakpoints', description: 'Right-click line number → "Add conditional breakpoint". Only pauses when condition is true (e.g., i === 50 in a loop). Invaluable for debugging specific cases in loops.' },
        { title: 'Watch expressions', description: 'In Sources panel → Watch → add expression. Shows the value of any expression in real-time as you step through code.' },
        { title: 'Call stack', description: 'Shows every function call that led to current line. Read from bottom (first call) to top (current location). Tells you HOW you got here.' },
      ]} />

      <AlertBox type="tip" title="The rubber duck technique">
        Explain your code line by line to an imaginary rubber duck (or a colleague, or yourself).
        The act of articulating what each line does forces your brain to notice where your mental
        model doesn't match the code. Studies show 60%+ of bugs are found before finishing the explanation.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What is the fastest way to find a bug?',
          answer: 'Binary search through the code. Add a log at the midpoint: if the bug happens before the midpoint, focus on the first half. If after, focus on the second half. Repeat. This finds any bug in O(log n) steps regardless of file size — much faster than reading every line.',
        },
        {
          question: 'How do I debug code that runs in production but not locally?',
          answer: 'Log more. Add verbose logging for inputs, outputs, and intermediate state. Compare prod vs local: different environment variables? Different Node/Python version? Different data? Use feature flags to enable extra logging in prod. Check if the issue is timing-related (race conditions that only appear under load).',
        },
        {
          question: 'When should I use a debugger vs console.log?',
          answer: 'console.log: fast, works everywhere, no setup, great for quick checks. Debugger: when you need to inspect complex object state, trace execution flow, or the issue is hard to reproduce with logs. For most bugs, console.log is faster. Use the debugger for complex async issues or when you need to inspect state that changes rapidly.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
