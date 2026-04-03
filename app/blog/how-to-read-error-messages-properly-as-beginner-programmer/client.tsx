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
        Error messages are not obstacles — they are instructions. Every error message tells you
        exactly what went wrong, where it happened, and often points directly at the fix.
        Learning to read them properly is one of the highest-leverage debugging skills a developer
        can have. This guide covers the anatomy of error messages in JavaScript, Python, and common
        web frameworks, how to decode stack traces, and what to do when error messages seem cryptic.
      </p>

      <StatGrid stats={[
        { value: 'Error type', label: 'tells you the category of problem — TypeError, ReferenceError, etc.', color: 'red' },
        { value: 'File:line', label: 'exactly where the error occurred — go here first', color: 'blue' },
        { value: 'Stack trace', label: 'the chain of function calls that led to the error', color: 'purple' },
        { value: 'Message', label: 'human-readable description of what specifically went wrong', color: 'green' },
      ]} />

      <SectionHeader number={1} title="Anatomy of an Error Message" />
      <p>
        Most error messages follow the same structure regardless of language or framework.
        Once you understand the structure, you can extract the information you need in seconds
        instead of feeling overwhelmed by a wall of red text.
      </p>
      <QuickFact color="blue" label="The three parts of every error">
        Every error message has the same structure: (1) Error type/name — the category of error,
        (2) Error message — what specifically happened, (3) Stack trace — where in the code.
        Reading all three in order gives you everything you need to find and fix the bug.
        Always read the error before Googling — often it tells you exactly what to do.
      </QuickFact>
      <CodeBlock lang="text" title="How to read a JavaScript error">
{`TypeError: Cannot read properties of undefined (reading 'map')
│          │                                           └─ What you tried to do (call .map())
│          └─ What went wrong (the variable was undefined, not an array)
└─ Type of error (TypeError = you used the wrong type)

    at ProductList (src/components/ProductList.jsx:42:20)
    │              │                               │  └─ Column number (less important)
    │              │                               └─ Line number ← GO HERE FIRST
    │              └─ File path (relative to project root)
    └─ Function name where the error occurred

    at App (src/App.jsx:15:5)         ← ProductList was called from here
    at renderWithHooks (react-dom.js:14985:18)  ← React internal (ignore these)
    at mountIndeterminateComponent   ← React internal (ignore these)

Reading order:
1. Error type: TypeError (wrong type used)
2. Message: reading 'map' on undefined → something is undefined, not an array
3. Location: ProductList.jsx line 42 ← open this file, go to line 42
4. Ignore React/framework internals — focus on YOUR files

Fix approach: at line 42, check what variable you're calling .map() on.
Log it: console.log(typeof products, products) → likely undefined or null
Add a guard: if (!products) return <Loading />;`}
      </CodeBlock>

      <SectionHeader number={2} title="Common JavaScript Error Types Decoded" />
      <KeyPointsGrid columns={2} items={[
        { title: 'TypeError', description: '"Cannot read property X of undefined/null" — you tried to access a property on something that doesn\'t exist yet (null, undefined). Fix: add a guard check before using the value, or ensure the data is loaded before rendering the component that uses it.' },
        { title: 'ReferenceError', description: '"X is not defined" — you used a variable before declaring it, or misspelled a variable name. Fix: declare the variable first with const/let/var. Check spelling (JavaScript is case-sensitive: myVariable ≠ myvariable).' },
        { title: 'SyntaxError', description: 'Your code has invalid syntax — missing closing bracket, unclosed string quote, or wrong punctuation. Fix: look at the line before the error (syntax errors often blame the next line). A linter like ESLint catches these before runtime.' },
        { title: 'RangeError', description: '"Maximum call stack size exceeded" = infinite recursion — a function calls itself endlessly without a base case. "Invalid array length" = you tried to create an array with a negative size. Fix: add a base case to recursive functions.' },
      ]} />

      <SectionHeader number={3} title="Python Error Anatomy — Read Bottom-Up" />
      <p>
        Python tracebacks are read differently from JavaScript stack traces. Python shows the
        most recent call at the bottom — which means you should start reading from the bottom
        and work upward. This trips up many beginners who start at the top.
      </p>
      <CodeBlock lang="text" title="Reading a Python traceback">
{`Traceback (most recent call last):            ← Always shown, ignore this line
  File "app.py", line 25, in process_users    ← 3. This function called the one below
    result = process_single(user)             ← 3. at this line
  File "app.py", line 12, in process_single  ← 2. This function failed
    return user['name'].upper()              ← 2. This is the exact line that failed
KeyError: 'name'                              ← 1. START HERE — this is the actual error
│
└─ The LAST line is always the error — read BOTTOM-UP!

Reading Python tracebacks:
1. Start from the BOTTOM (last line) — that's the actual error and type
2. The frame immediately above shows the exact file:line that failed
3. Read UP the call stack to understand how you got to the failing code

Fix for KeyError: 'name':
user.get('name', '').upper()       # safe access with default
OR
if 'name' in user: user['name'].upper()  # check before access`}
      </CodeBlock>

      <SectionHeader number={4} title="Web Framework Error Messages" />
      <CodeBlock lang="text" title="Reading HTTP errors in API development">
{`HTTP 404 Not Found
→ The URL path doesn't match any route. Check:
  - Is the URL spelled correctly?
  - Is the server running?
  - Is the route defined? (Check routes.js / urls.py)

HTTP 401 Unauthorized
→ No authentication provided. Check:
  - Are you including the Authorization header?
  - Is the token expired?
  - curl -H "Authorization: Bearer YOUR_TOKEN" ...

HTTP 403 Forbidden
→ Authenticated but no permission. Check:
  - Does this user have the required role/scope?
  - Is the API key scoped for this operation?

HTTP 422 Unprocessable Entity
→ Request format was valid JSON but failed validation. Check:
  - Are all required fields present?
  - Are field types correct? (sending "30" instead of 30 for an integer)
  - Check the response body — it usually tells you which fields failed:
    {"detail": [{"loc": ["body", "age"], "msg": "value is not a valid integer"}]}

HTTP 500 Internal Server Error
→ The server crashed while handling your request. Check:
  - Server logs (the real error is there, not in the HTTP response)
  - Did a database query fail? Did code throw an unhandled exception?

CORS Error in browser console
"Access to fetch blocked by CORS policy"
→ The server is not returning the required CORS headers for browser requests.
   This is ALWAYS a server-side fix — add the CORS headers to your server.`}
      </CodeBlock>

      <SectionHeader number={5} title="What to Do With an Error" />
      <KeyPointsGrid columns={2} items={[
        { title: '1. Read the full message before Googling', description: 'Read the full message first. Often it tells you exactly what\'s wrong: "Cannot find module \'./utils\'" means the file path is wrong or the file doesn\'t exist. "SyntaxError: Unexpected token \'}\'" means a missing opening brace somewhere before. 60%+ of errors don\'t need Google.' },
        { title: '2. Go to the exact file and line number', description: 'The file:line in the stack trace is where to look. Open that file, go to that line. The bug is almost always on that line or in the few lines immediately above it — particularly the last assignment to any variable used on the failing line.' },
        { title: '3. Inspect the actual variable values', description: 'Add console.log(typeof variable, variable) or print(type(variable), variable) right before the crashing line. The actual value is almost never what you expected — maybe it\'s null when you expected an array, or a string when you expected a number.' },
        { title: '4. Google with the right terms', description: 'If you need to search: use "[error type] [key phrase from message] [language/framework]". Example: "TypeError Cannot read property map of undefined React". Include the error type and the key phrase. The language helps filter results.' },
      ]} />

      <SectionHeader number={6} title="Cryptic Errors — When to Expand Your Search" />
      <CodeBlock lang="text" title="Decoding cryptic error messages">
{`❌ "Segmentation fault (core dumped)"
→ C/C++/Rust: accessing memory you don't own (null pointer, out-of-bounds array)
→ Look at the last memory access before the crash

❌ "EADDRINUSE: address already in use :::3000"
→ Port 3000 is already occupied by another process
→ Fix: lsof -i :3000 → kill the PID → re-run your server
→ Or change your port: PORT=3001 npm start

❌ "ENOENT: no such file or directory, open 'config.json'"
→ The file doesn't exist at that path, OR the current working directory is wrong
→ Fix: check if the file exists: ls config.json
→ Check where Node is running from: console.log(process.cwd())

❌ "Error: listen ECONNREFUSED 127.0.0.1:5432"
→ Nothing is listening on PostgreSQL's default port — database isn't running
→ Fix: start your database service: pg_ctl start / docker compose up db

❌ "Cannot use import statement in a module" (Node.js)
→ You're using ES module syntax (import/export) but package.json doesn't have "type":"module"
→ Fix: add "type": "module" to package.json, or rename file to .mjs, or use require()

❌ "Warning: Each child in a list should have a unique 'key' prop" (React)
→ Your .map() is missing key={item.id} on each rendered element
→ Fix: <li key={item.id}>{item.name}</li> — key must be unique and stable`}
      </CodeBlock>

      <AlertBox type="tip" title="Copy the exact error, not a summary">
        When asking for help (StackOverflow, AI, colleagues), always paste the complete error
        message and full stack trace — never a summary or paraphrase. "I'm getting an error when
        I run it" gives almost no information. The exact error text, stack trace, and the code
        at the failing line allows precise diagnosis without back-and-forth clarification.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Why does the error point to a different line than where my bug actually is?',
          answer: 'The error fires where the runtime detects the problem — not always where you made the mistake. For "undefined" errors, the mistake is often where you forgot to assign the variable (earlier in the code), not where you tried to use it. For syntax errors, the parser reports the first line where it can no longer make sense of the code, which is often after the actual missing bracket or quote. Read up the stack trace to find the root cause, and look at the lines immediately before the reported line.',
        },
        {
          question: 'What does "at anonymous" or "<anonymous>" mean in a stack trace?',
          answer: '"at anonymous" means the function has no name — it\'s an inline arrow function, callback, or function expression. To get better stack traces that are easier to debug, give your functions names: const handleClick = function handleClick() {} instead of const handleClick = () => {}. In modern JavaScript, async functions with names also show better in async stack traces.',
        },
        {
          question: 'Why are React/library/framework lines shown in the stack trace?',
          answer: 'Libraries appear in the stack trace because they are calling your code (React calling your component\'s render function) or your code is deep inside a library call chain when it fails. Ignore library and framework frames (react-dom.js, next/dist, express/lib) and focus on YOUR code in the trace — look specifically for files in your src/ or app/ directory. Your files are the ones you can fix.',
        },
        {
          question: 'How do I find the error when there is no error message?',
          answer: 'Silent failures are the hardest bugs. Add console.log statements to trace execution: "reached this line" at key points to find where execution stops unexpectedly. For network requests, open the browser DevTools Network tab and look for failed requests (red). For async code, check for unhandled Promise rejections — add .catch() to all Promise chains. Add window.onerror = (e) => console.error(e) as a global handler to catch errors that aren\'t propagating to your catch blocks.',
        },
        {
          question: 'What is a stack overflow error and how do I fix it?',
          answer: '"Maximum call stack size exceeded" (JavaScript) or "RecursionError: maximum recursion depth exceeded" (Python) means a function is calling itself infinitely without stopping. Find the recursive function and check its base case: the condition that stops recursion. Common causes: missing base case, base case condition that\'s never met, or two functions calling each other (mutual recursion). Add console.log("recursion depth") to count how deep you go before the error.',
        },
        {
          question: 'Should I always trust the line number in an error message?',
          answer: 'Usually yes, but not always. When you use source maps (TypeScript, bundled JavaScript), the reported line may be in the compiled file while you\'re editing the source. Configure your build tools to generate source maps and your browser/IDE to use them. Also, transpilers and bundlers can shift line numbers. If the error line doesn\'t make sense, look at surrounding lines and trace up the call stack. For minified production code, always set up source maps.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
