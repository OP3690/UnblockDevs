'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox,
  ErrorFix,
  CodeBlock,
  FAQAccordion,
  KeyPointsGrid,
  StatGrid,
  SectionHeader,
  QuickFact,
  VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToRemoveExtraSpacesFromStringClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Remove Extra Spaces, Trim &amp; Clean String Formatting Issues Online</h1>
      <p className="lead">
        String formatting bugs waste enormous amounts of developer time. Extra whitespace breaks
        JSON parsing. Wrong case causes API key mismatches. Special characters corrupt SQL queries.
        Trailing newlines break hash comparisons. These bugs are invisible until runtime and hard
        to spot in code reviews. Here is how to find and fix all of them fast — with real code
        examples and a free online tool.
      </p>

      <AlertBox type="error" title="Common string formatting bug">
        SyntaxError: Unexpected token — trailing whitespace in JSON key, or a 401 error because{' '}
        <code>&quot;Bearer mytoken \n&quot;</code> was sent instead of{' '}
        <code>&quot;Bearer mytoken&quot;</code>
      </AlertBox>

      <SectionHeader number={1} title="How to Remove Extra Spaces from a String" />
      <p>
        Extra spaces in strings come from user input fields, copy-pasted data, CSV exports, and
        log parsing. They are invisible in most text editors but cause real failures — a JSON key
        with a trailing space is a different key, an API token with a leading space returns 401,
        and a SQL value with extra spaces breaks exact-match queries.
      </p>

      <ErrorFix
        title="String with extra spaces vs cleaned output"
        bad={`"  hello   world  "
// Leading space + collapsed spaces + trailing space
// JSON.parse will succeed but the key/value will have the spaces
// indexOf("hello world") returns -1`}
        good={`"hello world"
// No leading/trailing spaces
// Internal spaces collapsed to single spaces
// Exact matches work correctly`}
        badLabel="Raw input with spaces"
        goodLabel="Trimmed and collapsed"
      />

      <CodeBlock lang="javascript" title="Remove extra spaces in JavaScript">
{`// Remove leading and trailing whitespace only
const cleaned = str.trim();
// "  hello world  " → "hello world"

// Also collapse multiple internal spaces to one
const cleaned = str.trim().replace(/\s+/g, ' ');
// "  hello   world  " → "hello world"

// Remove ALL spaces (not recommended — loses word boundaries)
const noSpaces = str.replace(/\s/g, '');
// "hello world" → "helloworld"

// Trim each line in a multiline string
const cleanedLines = str
  .split('\n')
  .map(line => line.trim())
  .join('\n');

// Remove blank lines too
const noBlankLines = str
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0)
  .join('\n');`}
      </CodeBlock>

      <CodeBlock lang="python" title="Remove extra spaces in Python">
{`# Remove leading/trailing whitespace
cleaned = s.strip()
# "  hello   world  " → "hello   world"

# Trim and collapse internal spaces
import re
cleaned = re.sub(r'\s+', ' ', s).strip()
# "  hello   world  " → "hello world"

# Strip each line in a multiline string
lines = [line.strip() for line in s.splitlines()]
cleaned = '\n'.join(line for line in lines if line)`}
      </CodeBlock>

      <AlertBox type="tip" title="Fix spaces with one click">
        Go to{' '}
        <a href="https://unblockdevs.com/string-utilities" target="_blank" rel="noopener noreferrer">
          UnblockDevs String Utilities
        </a>{' '}
        → Transform tab → check &quot;Trim whitespace&quot; + &quot;Collapse spaces&quot;. Paste
        your text and the cleaned version is ready to copy in one click.
      </AlertBox>

      <SectionHeader number={2} title="How to Convert String to Lowercase or Uppercase" />
      <p>
        Case mismatch is a common source of bugs — comparing user-entered email addresses without
        normalizing case, matching API keys that are case-sensitive, or generating CSS class names
        with inconsistent capitalization.
      </p>

      <CodeBlock lang="javascript" title="Case conversion in JavaScript and Python">
{`// JavaScript
const lower = str.toLowerCase();     // "Hello World" → "hello world"
const upper = str.toUpperCase();     // "Hello World" → "HELLO WORLD"
const title = str.replace(/\b\w/g, c => c.toUpperCase()); // Title Case

// Python
lower = s.lower()      # "Hello World" → "hello world"
upper = s.upper()      # "Hello World" → "HELLO WORLD"
title = s.title()      # "hello world" → "Hello World"
sentence = s.capitalize() # "hello world" → "Hello world"

// JavaScript — safe email comparison
const emailsMatch = userInput.toLowerCase() === storedEmail.toLowerCase();

// Python — safe string key lookup
if user_input.lower() == stored_value.lower():
    pass`}
      </CodeBlock>

      <ErrorFix
        title="API key comparison failing due to case"
        bad={`// User types "MYAPIKEY123" but comparison expects "myapikey123"
if (userInput === storedKey) {
  // Will fail — case sensitive comparison
}`}
        good={`// Always normalize case before comparison
if (userInput.toLowerCase() === storedKey.toLowerCase()) {
  // Works regardless of capitalization
}

// Better: normalize at input time (on the way in)
const normalizedKey = userInput.trim().toLowerCase();`}
        badLabel="Case-sensitive comparison"
        goodLabel="Normalized comparison"
      />

      <QuickFact color="green" label="String Utilities">
        The String Utilities tool converts the entire text to UPPERCASE, lowercase, Title Case, or
        Sentence case in one click — no code needed. It also handles camelCase, PascalCase, and
        snake_case conversion simultaneously.
      </QuickFact>

      <SectionHeader number={3} title="How to Replace Text in a String Online" />
      <p>
        Find-and-replace with regex is one of the most useful string operations for developers —
        cleaning up log output, reformatting data, sanitizing user input, or bulk-renaming patterns
        across a text block.
      </p>

      <VerticalSteps
        steps={[
          {
            title: 'Paste your text into String Utilities',
            desc: 'Go to unblockdevs.com/string-utilities and paste the text you want to modify into the input box.',
          },
          {
            title: 'Go to the Transform tab',
            desc: 'Click "Transform" in the tab bar. Scroll to the Find & Replace section.',
          },
          {
            title: 'Enter your find and replace values',
            desc: 'Type the text (or regex pattern) you want to find in the "Find" field and the replacement in the "Replace" field.',
          },
          {
            title: 'Enable regex mode if needed',
            desc: 'Toggle "Use Regex" for pattern-based replacements. Supports standard JavaScript regex syntax including lookaheads and capture groups.',
          },
          {
            title: 'Copy the result',
            desc: 'The preview updates in real time. Click the copy button to copy the cleaned text.',
          },
        ]}
      />

      <CodeBlock lang="javascript" title="Common regex find-and-replace patterns">
{`// Replace all occurrences (use replaceAll or /g flag)
const result = str.replace(/old/g, 'new');        // All occurrences
const result = str.replaceAll('old', 'new');      // ES2021+

// Remove all digits
const noDigits = str.replace(/\d/g, '');

// Remove all special characters (keep letters, numbers, spaces)
const clean = str.replace(/[^a-zA-Z0-9\s]/g, '');

// Replace multiple spaces with single space
const collapsed = str.replace(/\s+/g, ' ');

// Remove HTML tags
const noHtml = str.replace(/<[^>]*>/g, '');

// Replace line endings (normalize CRLF to LF)
const normalized = str.replace(/\r\n/g, '\n');

// Extract only the numbers from a string
const numbers = str.replace(/[^\d.,-]/g, '');`}
      </CodeBlock>

      <ErrorFix
        title="str.replace() only replaces the first match"
        bad={`// replace() without /g flag only replaces the FIRST match
const result = "aaa".replace("a", "b");
// → "baa"  (only first 'a' replaced)`}
        good={`// Use replaceAll() or /g regex flag for all matches
const result = "aaa".replaceAll("a", "b");
// → "bbb"

// Or regex with global flag:
const result = "aaa".replace(/a/g, "b");
// → "bbb"`}
        badLabel="Only replaces first match"
        goodLabel="Replaces all matches"
      />

      <SectionHeader number={4} title="How to Split a String into Parts Online" />
      <p>
        Splitting strings is fundamental — breaking a CSV row into values, splitting a path into
        segments, parsing a comma-separated list of IDs, or splitting a JWT token at the dots. The
        String Utilities Bulk Mode uses the same separator concept for processing lists.
      </p>

      <CodeBlock lang="javascript" title="String split in JavaScript and Python">
{`// JavaScript split()
"a,b,c".split(",")           // → ["a", "b", "c"]
"hello world".split(" ")     // → ["hello", "world"]
"a  b  c".split(/\s+/)       // → ["a", "b", "c"] (handles multiple spaces)
"abc".split("")              // → ["a", "b", "c"] (split into chars)

// Limit number of splits
"a,b,c,d".split(",", 2)      // → ["a", "b"] (first 2 only)

// Python split()
"a,b,c".split(",")           # → ["a", "b", "c"]
"a  b  c".split()            # → ["a", "b", "c"] (splits on any whitespace)
"a,b,c,d".split(",", 2)      # → ["a", "b", "c,d"] (max 2 splits)

// Split a JWT token
const [header, payload, signature] = jwtToken.split(".");
const decoded = JSON.parse(atob(payload));`}
      </CodeBlock>

      <VerticalSteps
        steps={[
          {
            title: 'Paste your list into String Utilities',
            desc: 'The tool accepts newline-separated, comma-separated, or pipe-separated lists for bulk conversion.',
          },
          {
            title: 'Select the separator from the dropdown',
            desc: 'Choose newline (default), comma, pipe, tab, or enter a custom delimiter.',
          },
          {
            title: 'See each item individually',
            desc: 'The tool splits the input and shows each item separately in the output table for individual operations.',
          },
          {
            title: 'Apply operations to all items',
            desc: 'Any transform (trim, case convert, encode) is applied to every item in the list simultaneously.',
          },
        ]}
      />

      <SectionHeader number={5} title="How to Clean a String Before Sending to an API" />
      <p>
        User input must be cleaned before it reaches an API or database. Raw strings from form
        fields, clipboard paste, or file uploads often contain invisible characters, encoding
        issues, and formatting quirks that cause failures downstream.
      </p>

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'Trim whitespace',
            description: 'Remove leading/trailing spaces. A token with a trailing newline will return 401 — the most common invisible bug.',
          },
          {
            title: 'Remove special characters',
            description: 'Strip characters not valid in your data format. Use allow-list regex: /[^a-zA-Z0-9_-]/g for slugs.',
          },
          {
            title: 'URL encode',
            description: 'Encode query parameter values before appending to URLs. Use encodeURIComponent() — not encodeURI().',
          },
          {
            title: 'Escape HTML entities',
            description: 'Convert &, <, >, ", \' to their HTML entity equivalents before rendering user content in HTML.',
          },
          {
            title: 'Collapse multiple spaces',
            description: 'Replace consecutive whitespace with a single space — prevents injection of visual formatting tricks.',
          },
          {
            title: 'Case normalize',
            description: 'Lowercase emails and usernames before storing or comparing — prevents duplicate accounts and comparison bugs.',
          },
          {
            title: 'Remove empty lines',
            description: 'Strip blank lines from multiline inputs before JSON serialization or database storage.',
          },
          {
            title: 'Deduplicate lines',
            description: 'Remove duplicate values from lists — prevents sending duplicate IDs to APIs or inserting duplicate rows.',
          },
        ]}
      />

      <ErrorFix
        title="Raw user input in API call vs properly cleaned input"
        bad={`// Sending raw user input directly — spaces, encoding issues, injection risk
const response = await fetch(\`/api/search?q=\${userInput}\`);
// If userInput = "hello world & <script>" → URL and injection problems`}
        good={`// Clean and encode before sending
const cleaned = userInput.trim().toLowerCase();
const encoded = encodeURIComponent(cleaned);
const response = await fetch(\`/api/search?q=\${encoded}\`);
// "hello world & <script>" → "hello%20world%20%26%20%3Cscript%3E"
// Safe: spaces encoded, special chars encoded, leading/trailing spaces removed`}
        badLabel="Raw user input — dangerous"
        goodLabel="Cleaned and encoded — safe"
      />

      <SectionHeader number={6} title="How to Remove Special Characters from a String" />
      <p>
        Special characters cause failures in SQL queries, regex patterns, JSON strings, and HTML
        content. The right approach depends on whether you want to remove them, escape them, or
        encode them — each has a different use case.
      </p>

      <CodeBlock lang="javascript" title="Remove or escape special characters">
{`// Remove all special chars — keep only letters, numbers, spaces
const clean = str.replace(/[^a-zA-Z0-9\s]/g, '');

// Remove special chars — keep hyphens and underscores (for slugs/IDs)
const slug = str.replace(/[^a-zA-Z0-9\-_]/g, '');

// Escape for use in a regex pattern (when user input becomes a regex)
const escaped = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Escape HTML entities (prevent XSS)
const escapeHtml = (s) => s
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

// Python — remove non-ASCII chars
import re
clean = re.sub(r'[^\x00-\x7F]+', '', s)  # Remove non-ASCII

# Python — keep only alphanumeric
clean = re.sub(r'[^a-zA-Z0-9]', '', s)`}
      </CodeBlock>

      <p>
        In the String Utilities tool, the Transform tab provides dedicated buttons for escaping
        HTML entities, escaping for regex, URL-encoding, and removing non-ASCII characters — no
        regex knowledge required.
      </p>

      <FAQAccordion
        items={[
          {
            question: 'How do I remove extra spaces from a string online without writing code?',
            answer:
              'Go to unblockdevs.com/string-utilities, paste your text, go to the Transform tab, and check "Trim whitespace" and "Collapse spaces". The cleaned text appears instantly. Click the copy button to copy the result. This handles leading spaces, trailing spaces, and multiple consecutive spaces in one operation.',
          },
          {
            question: 'How do I convert a string to lowercase or uppercase online?',
            answer:
              'In the String Utilities tool, the Case Conversion tab converts text to UPPERCASE, lowercase, Title Case, and Sentence case with one click. For variable naming formats like camelCase, PascalCase, snake_case, and kebab-case, use the Convert tab — paste any string and get all 12 formats instantly.',
          },
          {
            question: 'How do I replace text in a string online with regex?',
            answer:
              'In the String Utilities Transform tab, use the Find & Replace section. Enter your search text (or regex pattern) in the Find field and the replacement in the Replace field. Toggle "Use Regex" to enable JavaScript regex syntax. The preview updates in real time as you type. For replacing all occurrences in code, use str.replaceAll() in JavaScript or str.replace(/pattern/g, replacement) with the global flag.',
          },
          {
            question: 'How do I split a string into parts online?',
            answer:
              'In String Utilities Bulk Mode, paste a comma, pipe, or newline-separated list and select the separator from the dropdown. The tool splits the input and shows each segment individually. For splitting in code: JavaScript uses str.split(delimiter), Python uses str.split(delimiter). Use split(/\\s+/) in JavaScript or str.split() in Python to split on any whitespace including multiple spaces.',
          },
          {
            question: 'How do I trim whitespace from a string and why does it matter for APIs?',
            answer:
              'Trailing whitespace in API tokens, JSON keys, and database values causes silent bugs. A Bearer token with a trailing newline returns 401. A JSON key with a trailing space is a different key from the same key without. Use str.trim() in JavaScript or str.strip() in Python to remove leading and trailing whitespace before any comparison, storage, or API call. In String Utilities, the "Trim whitespace" button applies this to every line at once.',
          },
          {
            question: 'How do I remove special characters from a string for safe use in SQL or HTML?',
            answer:
              'The approach depends on the target: for HTML, escape special chars — convert & to &amp;, < to &lt; — using a library like DOMPurify (browser) or html.escape() (Python). Never remove HTML chars — escape them. For SQL, use parameterized queries instead of string concatenation — this prevents SQL injection without needing to clean the string. For slugs and identifiers, use a regex allow-list: str.replace(/[^a-zA-Z0-9\\-_]/g, "") to keep only safe chars.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
