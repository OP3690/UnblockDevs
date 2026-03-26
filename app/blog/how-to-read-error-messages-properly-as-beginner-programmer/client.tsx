'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToReadErrorMessagesProperlyAsBeginnerProgrammerClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Read Error Messages Properly as a Beginner Programmer</h1>
      <p className="lead">
        Error messages are not obstacles — they're instructions. Every error message tells you
        exactly what went wrong, where, and often how to fix it. Learning to read them properly
        is one of the highest-leverage skills a developer can have.
      </p>

      <StatGrid stats={[
        { value: 'Error type', label: 'tells you the category of problem', color: 'red' },
        { value: 'File:line', label: 'exactly where the error occurred', color: 'blue' },
        { value: 'Stack trace', label: 'the chain of calls that led to the error', color: 'purple' },
        { value: 'Message', label: 'human-readable description of what went wrong', color: 'green' },
      ]} />

      <SectionHeader number={1} title="Anatomy of an Error Message" />
      <QuickFact>
        Every error message has the same structure: (1) Error type/name — what kind of error,
        (2) Error message — what specifically happened, (3) Stack trace — where in the code.
        Reading all three in order gives you everything you need to fix the bug.
      </QuickFact>

      <CodeBlock language="text" filename="How to read a JavaScript error">
{`TypeError: Cannot read properties of undefined (reading 'map')
│          │                                           └─ What you tried to do
│          └─ What went wrong (the variable was undefined)
└─ Type of error (TypeError = wrong type)

    at ProductList (src/components/ProductList.jsx:42:20)
    │              │                               │  └─ Column number
    │              │                               └─ Line number ← GO HERE FIRST
    │              └─ File path
    └─ Function name

    at App (src/App.jsx:15:5)  ← Called from here
    at renderWithHooks (react-dom.js:14985:18)  ← React internals (ignore)

Reading order:
1. Error type: TypeError
2. Message: undefined.map — something is undefined
3. Location: ProductList.jsx line 42 ← open this file, go to line 42`}
      </CodeBlock>

      <SectionHeader number={2} title="Common Error Types Decoded" />
      <KeyPointsGrid columns={2} items={[
        { title: 'TypeError', description: 'You used a value of the wrong type. "Cannot read property X of undefined/null" — you tried to access a property on something that doesn\'t exist yet. Fix: check if the value exists before using it.' },
        { title: 'ReferenceError', description: '"X is not defined" — you used a variable before declaring it, or misspelled a variable name. Fix: declare the variable first, check spelling matches exactly (case-sensitive).' },
        { title: 'SyntaxError', description: 'Your code has invalid syntax — missing bracket, quote, or semicolon. Fix: look at the line before the error (syntax errors often blame the next line).' },
        { title: 'RangeError', description: '"Maximum call stack size exceeded" — infinite recursion. "Invalid array length" — you created an array with a negative size. Fix: add a base case to recursive functions.' },
      ]} />

      <SectionHeader number={3} title="Python Error Anatomy" />
      <CodeBlock language="python" filename="Reading a Python traceback">
{`Traceback (most recent call last):
  File "app.py", line 25, in process_users    ← Called from here
    result = process_single(user)
  File "app.py", line 12, in process_single   ← Then here
    return user['name'].upper()
KeyError: 'name'                               ← Error type: 'name' key missing
│
└─ The last line is what failed — read bottom-up!

Reading Python tracebacks:
1. Start from the BOTTOM (last line) — that's the actual error
2. The last frame above it shows the exact line that failed
3. Read UP the call stack to understand how you got there

Fix: user.get('name', '').upper()  or check 'name' in user first`}
      </CodeBlock>

      <SectionHeader number={4} title="What to Do With an Error" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Read before Googling', description: 'Read the full message first. Often it tells you exactly what\'s wrong: "Cannot find module \'./utils\'" means the file path is wrong. 60% of errors don\'t need Google.' },
        { title: 'Go to the line number', description: 'The file:line in the stack trace is where to look. Open that file, go to that line. The bug is almost always there or in the lines immediately above.' },
        { title: 'Inspect the variables', description: 'Add console.log(typeof variable, variable) or print(type(variable), variable) right before the crash line. The actual value is usually not what you expected.' },
        { title: 'Google the error type + message', description: 'If you need to Google: search "[error type] [key words from message]". E.g., "Python KeyError dictionary". Include the language name for better results.' },
      ]} />

      <AlertBox type="tip" title="Copy the exact error, not a summary">
        When asking for help (StackOverflow, AI, colleagues), always paste the complete error
        message and stack trace — not a summary. "I'm getting an error when I run it" gives
        almost no information. The exact error text allows precise diagnosis.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Why does the error point to a different line than where the bug actually is?',
          answer: 'The error fires where the runtime detects something wrong — not always where you made the mistake. For undefined variable errors, the mistake is often where you forgot to assign the variable (earlier), not where you tried to use it. Read up the stack trace to find the root cause.',
        },
        {
          question: 'What does "at anonymous" mean in a JavaScript stack trace?',
          answer: '"at anonymous" means the function has no name — it\'s an inline arrow function or function expression. To get better stack traces, name your functions: const handleClick = function handleClick() {} instead of const handleClick = () => {}.',
        },
        {
          question: 'Why are library errors shown in the stack trace?',
          answer: 'Libraries appear because they called your code (React calling your component) or your code is deep in a library when it fails. Ignore library/framework frames and focus on YOUR code in the trace — look for files in your src/ directory.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
