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

export default function HowToManipulateStringsOnlineClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Manipulate &amp; Format Strings Online — Developer String Utilities</h1>
      <p className="lead">
        Every developer has wasted time manually reformatting variable names, converting between
        camelCase and snake_case, cleaning whitespace out of pasted data, or encoding strings for
        API calls. These are mechanical tasks — the kind where you spend ten minutes doing something
        a tool could do in one second. Here is a free online string utilities tool that handles all
        of it, including bulk mode and CSV export.
      </p>

      <StatGrid
        stats={[
          { value: '12 formats', label: 'Case conversion formats', color: 'blue' },
          { value: 'Bulk mode', label: 'Convert many strings at once', color: 'green' },
          { value: '8 encodings', label: 'Base64, URL, HTML, and more', color: 'violet' },
        ]}
      />

      <SectionHeader number={1} title="How to Convert String Format Online (All 12 Cases)" />
      <p>
        Different programming languages and frameworks have strong conventions about naming format.
        JavaScript uses camelCase for variables, Python prefers snake_case, CSS uses kebab-case,
        and constants everywhere use SCREAMING_SNAKE_CASE. The String Utilities tool converts any
        string to all 12 formats at once — paste once, copy whichever you need.
      </p>

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'camelCase → JavaScript / TypeScript',
            description: 'getUserProfile — variables, functions, JSON keys. The default in JS/TS codebases.',
          },
          {
            title: 'snake_case → Python / Database',
            description: 'get_user_profile — Python functions, Ruby methods, SQL column names.',
          },
          {
            title: 'PascalCase → Classes / React',
            description: 'GetUserProfile — class names, React components, TypeScript interfaces, C# types.',
          },
          {
            title: 'kebab-case → CSS / URLs',
            description: 'get-user-profile — CSS class names, HTML data attributes, URL slugs, CLI flags.',
          },
          {
            title: 'SCREAMING_SNAKE → Constants',
            description: 'GET_USER_PROFILE — environment variables, constants in any language.',
          },
          {
            title: 'COBOL-CASE → HTTP / Legacy',
            description: 'GET-USER-PROFILE — legacy HTTP header names, COBOL identifiers.',
          },
        ]}
      />

      <CodeBlock lang="javascript" title="One input string → all 12 output formats">
{`// Input: getUserProfileData

// Output:
camelCase:         getUserProfileData
PascalCase:        GetUserProfileData
snake_case:        get_user_profile_data
kebab-case:        get-user-profile-data
SCREAMING_SNAKE:   GET_USER_PROFILE_DATA
COBOL-CASE:        GET-USER-PROFILE-DATA
dot.case:          get.user.profile.data
path/case:         get/user/profile/data
flatcase:          getuserprofiledata
Title Case:        Get User Profile Data
Sentence case:     Get user profile data
Train-Case:        Get-User-Profile-Data`}
      </CodeBlock>

      <AlertBox type="tip" title="Free String Utilities tool">
        Paste any string into the{' '}
        <a href="https://unblockdevs.com/string-utilities" target="_blank" rel="noopener noreferrer">
          UnblockDevs String Utilities
        </a>{' '}
        tool and get all 12 case formats instantly. Supports camelCase, PascalCase, snake_case,
        kebab-case, SCREAMING_SNAKE, and more — with one-click copy for each format.
      </AlertBox>

      <QuickFact color="blue" label="Pro tip">
        Paste any string — camelCase, snake_case, mixed with spaces — and the tool auto-detects
        the word boundaries. It handles acronyms correctly too: &quot;parseHTTPSRequest&quot;
        splits into &quot;parse&quot;, &quot;HTTPS&quot;, &quot;Request&quot; instead of splitting
        at every capital letter.
      </QuickFact>

      <SectionHeader number={2} title="How to Convert Multiple Strings at Once (Bulk Mode)" />
      <p>
        When you are renaming database columns, refactoring a large codebase, or generating
        configuration keys from a spreadsheet column, converting one string at a time is too slow.
        Bulk mode lets you paste a list and convert all strings simultaneously, then download the
        results as a CSV.
      </p>

      <CodeBlock lang="javascript" title="Bulk mode input formats">
{`// Newline-separated (default — paste a column from a spreadsheet)
getUserProfile
getOrderHistory
updatePaymentMethod
deleteUserAccount

// Comma-separated
getUserProfile, getOrderHistory, updatePaymentMethod, deleteUserAccount

// Pipe-separated
getUserProfile|getOrderHistory|updatePaymentMethod|deleteUserAccount

// Each string is converted to all 12 formats
// Download CSV → columns: original, camelCase, PascalCase, snake_case, kebab-case, ...`}
      </CodeBlock>

      <VerticalSteps
        steps={[
          {
            title: 'Paste your list into the input box',
            desc: 'Go to unblockdevs.com/string-utilities and paste your list. Accepts newline, comma, or pipe-separated values.',
          },
          {
            title: 'Pick the separator',
            desc: 'Select the separator type from the dropdown — the tool auto-detects newlines by default.',
          },
          {
            title: 'View the conversion table',
            desc: 'The results table shows every string converted to all 12 case formats in one view — scroll right to see all columns.',
          },
          {
            title: 'Download as CSV',
            desc: 'Click "Download CSV" to export the full conversion table. Paste it into a spreadsheet to use as a reference during refactoring.',
          },
        ]}
      />

      <SectionHeader number={3} title="How to Clean Up String Data" />
      <p>
        Raw data from APIs, spreadsheets, user input, and log files is almost never clean. It comes
        with extra spaces, blank lines, duplicate values, inconsistent capitalization, and trailing
        characters that break downstream processing. The Transform tab handles all of these in one
        click.
      </p>

      <ErrorFix
        title="Messy string data vs cleaned output"
        bad={`"  hello   world  "
"  Hello World  "
"  hello   world  "
""
"HELLO WORLD"`}
        good={`"hello world"
"hello world"
(duplicates removed)
(blank lines removed)
"hello world"`}
        badLabel="Raw input — spaces, dupes, inconsistent case"
        goodLabel="Cleaned output — trimmed, deduplicated, normalized"
      />

      <p>Available transform operations in the String Utilities tool:</p>
      <ul className="space-y-1 my-4">
        <li><strong>Trim whitespace</strong> — removes leading and trailing spaces from each line</li>
        <li><strong>Collapse spaces</strong> — replaces multiple consecutive spaces with a single space</li>
        <li><strong>Remove empty lines</strong> — deletes completely blank lines</li>
        <li><strong>Remove duplicates</strong> — keeps only the first occurrence of each unique line</li>
        <li><strong>Sort lines</strong> — alphabetically sorts all lines (ascending or descending)</li>
        <li><strong>Reverse lines</strong> — reverses the order of lines in the text</li>
        <li><strong>Add prefix / suffix</strong> — prepends or appends a string to every line</li>
        <li><strong>Wrap in quotes</strong> — adds single or double quotes around each line</li>
      </ul>

      <SectionHeader number={4} title="How to Encode and Decode Strings" />
      <p>
        String encoding is required constantly in web development — Base64 for auth tokens and
        binary data, URL encoding for query parameters, HTML entity encoding to prevent XSS, JSON
        escaping for embedded strings. The Encode/Decode tab handles all formats in one place.
      </p>

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'Base64',
            description: 'Encode binary data or credentials for HTTP headers. Decode JWT headers and payloads, API credentials, and binary file content.',
          },
          {
            title: 'URL Encoding',
            description: 'Encode strings for URL query parameters (%20 for space, %2F for slash). Essential for building URLs with user-provided data.',
          },
          {
            title: 'HTML Entities',
            description: 'Convert & to &amp;, < to &lt;, > to &gt; and more — prevents XSS when inserting user input into HTML.',
          },
          {
            title: 'JSON Escape',
            description: 'Escape strings for embedding in JSON values — handles backslashes, quotes, newlines, and control characters.',
          },
          {
            title: 'Hex Encoding',
            description: 'Convert text to hexadecimal representation. Used in cryptography, color codes, binary debugging, and protocol analysis.',
          },
          {
            title: 'ROT13',
            description: 'Simple Caesar cipher substitution. Used for light obfuscation of spoilers, answers, and email addresses in plain text.',
          },
        ]}
      />

      <CodeBlock lang="javascript" title="Base64 encoding and decoding examples">
{`// Base64 encode — browser native (for ASCII strings)
const encoded = btoa('Hello, World!');
// → 'SGVsbG8sIFdvcmxkIQ=='

// Base64 decode
const decoded = atob('SGVsbG8sIFdvcmxkIQ==');
// → 'Hello, World!'

// Base64 encode — Node.js (handles Unicode)
const encoded = Buffer.from('Hello, World!').toString('base64');
// → 'SGVsbG8sIFdvcmxkIQ=='

// Decode JWT payload (header.payload.signature)
const jwtPayload = 'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIn0';
const decoded = JSON.parse(atob(jwtPayload));
// → { sub: '1234567890', name: 'John Doe' }

// URL encoding
const query = encodeURIComponent('search query with spaces & symbols');
// → 'search%20query%20with%20spaces%20%26%20symbols'`}
      </CodeBlock>

      <SectionHeader number={5} title="How to Extract Patterns from Text" />
      <p>
        The Extract tab finds all occurrences of common data patterns in a block of text — useful
        for parsing log files, scraping structured data from unstructured output, or validating
        that a text block contains the expected data types.
      </p>

      <CodeBlock lang="javascript" title="Extract mode — one input, multiple pattern extractions">
{`// Input text (log output, email body, API response, etc.)
const text = \`
  User alice@example.com logged in from 192.168.1.42
  Redirected to https://app.example.com/dashboard
  Session expires 2026-04-13, color code #FF5733
  Contact: +1 (555) 867-5309 or admin@example.com
\`;

// Extracted by String Utilities:
Emails:     ['alice@example.com', 'admin@example.com']
URLs:       ['https://app.example.com/dashboard']
IPs:        ['192.168.1.42']
Phones:     ['+1 (555) 867-5309']
Hex colors: ['#FF5733']
Dates:      ['2026-04-13']`}
      </CodeBlock>

      <p>
        Supported extraction patterns: email addresses, URLs, IP addresses (IPv4 and IPv6), phone
        numbers, hashtags, hex color codes, dates (ISO 8601, US, UK formats), credit card patterns
        (for validation only — not stored), and custom regex patterns you define yourself.
      </p>

      <FAQAccordion
        items={[
          {
            question: 'How do I convert a string format online for free?',
            answer:
              'Go to unblockdevs.com/string-utilities, paste your string into the input box, and instantly see it converted to all 12 case formats: camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE, COBOL-CASE, dot.case, path/case, flatcase, Title Case, Sentence case, and Train-Case. Click the copy icon next to any format to copy it.',
          },
          {
            question: 'How do I manipulate multiple strings at once online?',
            answer:
              'Use Bulk mode in the String Utilities tool. Paste a newline-separated, comma-separated, or pipe-separated list of strings. The tool converts all of them to every case format simultaneously and shows the results in a table. You can download the full table as a CSV to use in a spreadsheet during refactoring or database migrations.',
          },
          {
            question: 'What string operations are available in the String Utilities tool?',
            answer:
              'The tool covers: (1) Case conversion — 12 formats including camelCase, snake_case, PascalCase, kebab-case. (2) Transform operations — trim, collapse spaces, remove empty lines, deduplicate, sort, reverse, add prefix/suffix. (3) Encode/decode — Base64, URL encoding, HTML entities, JSON escape, Hex, ROT13, Morse code. (4) Extract — emails, URLs, IPs, phone numbers, hex colors, dates from unstructured text.',
          },
          {
            question: 'How do I clean up string data before processing it?',
            answer:
              'In the String Utilities Transform tab: use "Trim whitespace" to remove leading/trailing spaces, "Collapse spaces" to fix multiple spaces, "Remove empty lines" to clean blank lines, and "Remove duplicates" to deduplicate. For encoding issues, use the Encode tab to URL-encode or HTML-escape the cleaned string before sending it to an API.',
          },
          {
            question: 'How do I convert a string to a different case format in code?',
            answer:
              'For camelCase to snake_case in JavaScript: str.replace(/([A-Z])/g, "_$1").toLowerCase(). For snake_case to camelCase: str.replace(/_([a-z])/g, (_, c) => c.toUpperCase()). In Python: use the inflection library or re.sub(r"([A-Z])", r"_\\1", s).lower() for camel to snake. For bulk conversion of many strings at once, use the String Utilities bulk mode instead of writing conversion code.',
          },
          {
            question: 'Is the String Utilities tool free and does it store my data?',
            answer:
              'Yes, the UnblockDevs String Utilities tool at unblockdevs.com/string-utilities is completely free with no registration required. All processing happens in your browser — your strings are never sent to a server. This makes it safe to use with internal variable names, database schemas, and sensitive field names.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
