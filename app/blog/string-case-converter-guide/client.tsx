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

export default function StringCaseConverterGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>String Case Converter Guide — camelCase, snake_case, PascalCase, kebab-case &amp; More</h1>
      <p className="lead">
        Which case format should you use for a variable name, a function, a CSS class, a database
        column, or an environment variable? Each language and framework has conventions — and
        violating them leads to style violations, linting errors, and code that looks wrong to
        every reviewer. This guide covers every case format, when to use each, and how to convert
        between them without doing it by hand.
      </p>

      <SectionHeader number={1} title="All String Case Formats Explained" />
      <p>
        There are more naming conventions than most developers realize. Here is a complete reference
        covering all 10 major formats, what they look like, when to use them, and which languages
        and frameworks expect them.
      </p>

      <div className="overflow-x-auto my-6">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">Format</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">Example</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">When to use</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left font-semibold">Languages / Frameworks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">camelCase</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">getUserProfile</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Variables, functions, JSON keys</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">JavaScript, TypeScript, Java, Swift</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">PascalCase</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">GetUserProfile</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Classes, React components, interfaces</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">C#, TypeScript, React, .NET</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">snake_case</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">get_user_profile</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Functions, vars, DB columns</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Python, Ruby, PostgreSQL, Go</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">kebab-case</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">get-user-profile</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">CSS classes, URLs, HTML attributes</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">CSS, HTML, URL slugs, CLI flags</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">SCREAMING_SNAKE</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">GET_USER_PROFILE</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Constants, environment variables</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">All languages, .env files, shell</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">dot.case</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">get.user.profile</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Config keys, package names</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Java packages, Spring config, .properties</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">path/case</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">get/user/profile</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">File paths, URL routes</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">REST API paths, file systems</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">COBOL-CASE</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">GET-USER-PROFILE</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">COBOL identifiers, legacy HTTP headers</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">COBOL, legacy enterprise systems</td>
            </tr>
            <tr>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">flatcase</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">getuserprofile</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Database IDs, legacy systems</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Legacy databases, some URL patterns</td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-900">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">Sentence case</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono text-xs">Get user profile</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Error messages, UI labels</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">UI text, documentation, error strings</td>
            </tr>
          </tbody>
        </table>
      </div>

      <AlertBox type="tip" title="Convert any string to all 10 formats instantly">
        Paste any string — camelCase, snake_case, or plain English — into the{' '}
        <a href="https://unblockdevs.com/string-utilities" target="_blank" rel="noopener noreferrer">
          UnblockDevs String Utilities
        </a>{' '}
        tool and get all 10 case formats at once. Click the copy icon next to any format to copy
        it directly.
      </AlertBox>

      <SectionHeader number={2} title="camelCase vs snake_case — When to Use Which" />
      <p>
        The most common confusion is between camelCase and snake_case. Both are used for variable
        and function names — but in different languages and contexts. Mixing them in the same
        codebase causes linting errors and violates community conventions.
      </p>

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'JavaScript & TypeScript → camelCase',
            description:
              'getUserProfile, fetchOrderById, updatePaymentMethod. Variables, functions, and JSON keys all use camelCase in JS/TS. Class names use PascalCase.',
          },
          {
            title: 'Python & Ruby → snake_case',
            description:
              'get_user_profile, fetch_order_by_id, update_payment_method. PEP 8 mandates snake_case for all functions and variables in Python. Class names use PascalCase.',
          },
          {
            title: 'CSS & HTML → kebab-case',
            description:
              'user-profile-card, primary-button, nav-link. CSS properties and custom class names all use kebab-case. HTML data attributes use data-user-id format.',
          },
          {
            title: 'Constants & Env Vars → SCREAMING_SNAKE',
            description:
              'MAX_RETRY_COUNT, DATABASE_URL, API_KEY. Constants in all languages and environment variables in .env files universally use SCREAMING_SNAKE_CASE.',
          },
        ]}
      />

      <ErrorFix
        title="Python function named in camelCase vs correct snake_case"
        bad={`# Wrong: camelCase in Python violates PEP 8
def getUserProfile(userId):
    return db.query(userId)

class userProfileManager:  # Also wrong — should be PascalCase
    def getUserById(self, id):
        pass`}
        good={`# Correct: snake_case for functions, PascalCase for classes
def get_user_profile(user_id):
    return db.query(user_id)

class UserProfileManager:  # PascalCase for class name
    def get_user_by_id(self, user_id):
        pass`}
        badLabel="PEP 8 violation"
        goodLabel="Correct Python convention"
      />

      <SectionHeader number={3} title="How to Convert camelCase to snake_case (Online & In Code)" />
      <p>
        camelCase to snake_case is the most common case conversion — needed when moving data
        between a JavaScript frontend and a Python backend, when renaming database columns to match
        Python conventions, or when generating SQL from ORM models.
      </p>

      <CodeBlock lang="javascript" title="Convert camelCase to snake_case in JavaScript">
{`// Simple regex: insert underscore before each uppercase letter, then lowercase all
function camelToSnake(str) {
  return str
    .replace(/([A-Z])/g, '_$1')
    .toLowerCase();
}

camelToSnake('getUserProfile');     // → 'get_user_profile'
camelToSnake('updatePaymentMethod'); // → 'update_payment_method'
camelToSnake('parseHTTPSResponse'); // → 'parse_h_t_t_p_s_response'
// ↑ Acronyms need special handling — use a library for production code

// Better: handle consecutive capitals (acronyms)
function camelToSnakeAdvanced(str) {
  return str
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
    .replace(/([a-z\d])([A-Z])/g, '$1_$2')
    .toLowerCase();
}

camelToSnakeAdvanced('parseHTTPSResponse'); // → 'parse_https_response'`}
      </CodeBlock>

      <CodeBlock lang="python" title="Convert camelCase to snake_case in Python">
{`import re

def camel_to_snake(name):
    # Handle consecutive capitals (acronyms like HTTPS)
    s1 = re.sub(r'([A-Z]+)([A-Z][a-z])', r'\1_\2', name)
    return re.sub(r'([a-z\d])([A-Z])', r'\1_\2', s1).lower()

camel_to_snake('getUserProfile')       # → 'get_user_profile'
camel_to_snake('parseHTTPSResponse')   # → 'parse_https_response'
camel_to_snake('updatePaymentMethod')  # → 'update_payment_method'

# Simpler version (no acronym handling):
simple = re.sub(r'([A-Z])', r'_\1', 'getUserProfile').lstrip('_').lower()
# → 'get_user_profile'`}
      </CodeBlock>

      <AlertBox type="tip" title="Convert all 12 formats at once">
        Or paste any string into{' '}
        <a href="https://unblockdevs.com/string-utilities" target="_blank" rel="noopener noreferrer">
          unblockdevs.com/string-utilities
        </a>{' '}
        — it handles acronyms correctly and converts to snake_case, camelCase, PascalCase,
        kebab-case, and 8 more formats simultaneously in one click.
      </AlertBox>

      <SectionHeader number={4} title="How to Convert snake_case to camelCase" />
      <p>
        snake_case to camelCase is needed when consuming a Python or database API response in
        JavaScript — JSON keys come in snake_case but your frontend code expects camelCase.
      </p>

      <CodeBlock lang="javascript" title="Convert snake_case to camelCase in JavaScript">
{`// Convert snake_case to camelCase
function snakeToCamel(str) {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

snakeToCamel('get_user_profile');     // → 'getUserProfile'
snakeToCamel('update_payment_method'); // → 'updatePaymentMethod'

// Convert all keys in a JSON object from snake_case to camelCase (deep)
function keysToCamel(obj) {
  if (Array.isArray(obj)) return obj.map(keysToCamel);
  if (obj !== null && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [snakeToCamel(k), keysToCamel(v)])
    );
  }
  return obj;
}

// Usage: convert entire API response
const camelResponse = keysToCamel(apiResponse);`}
      </CodeBlock>

      <CodeBlock lang="python" title="Convert snake_case to camelCase in Python">
{`import re

def snake_to_camel(name):
    components = name.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])

snake_to_camel('get_user_profile')      # → 'getUserProfile'
snake_to_camel('update_payment_method') # → 'updatePaymentMethod'

# Using regex
def snake_to_camel_re(name):
    return re.sub(r'_([a-z])', lambda m: m.group(1).upper(), name)

snake_to_camel_re('get_user_profile')   # → 'getUserProfile'`}
      </CodeBlock>

      <QuickFact color="violet" label="Library recommendation">
        For production JavaScript code, use the <code>camelcase-keys</code> npm package to convert
        all keys in an API response object from snake_case to camelCase recursively:{' '}
        <code>import camelcaseKeys from &apos;camelcase-keys&apos;; const data = camelcaseKeys(apiResponse, {'{'} deep: true {'}'});</code>
      </QuickFact>

      <SectionHeader number={5} title="Bulk Case Conversion — Convert Many Variable Names at Once" />
      <p>
        When migrating a codebase, renaming database columns, or generating config from a
        spreadsheet, you need to convert dozens or hundreds of names at once. The String Utilities
        Bulk Mode handles this in one operation with CSV export.
      </p>

      <VerticalSteps
        steps={[
          {
            title: 'Copy a column from your spreadsheet',
            desc: 'Select a column of variable names, column names, or identifiers in Excel or Google Sheets and copy it. The values will be newline-separated.',
          },
          {
            title: 'Paste into String Utilities Bulk Mode',
            desc: 'Go to unblockdevs.com/string-utilities and paste your list. The tool auto-detects newline separators.',
          },
          {
            title: 'Review the conversion table',
            desc: 'The table shows every name converted to all 12 case formats simultaneously — camelCase, snake_case, PascalCase, kebab-case, SCREAMING_SNAKE, and more.',
          },
          {
            title: 'Download as CSV',
            desc: 'Click "Download CSV" to export the full table. Import it back into your spreadsheet as a reference sheet for the migration.',
          },
        ]}
      />

      <CodeBlock lang="javascript" title="Bulk conversion — input and output format">
{`// Input (paste as newline-separated list):
getUserProfile
getOrderHistory
updatePaymentMethod
deleteUserAccount
sendEmailNotification

// CSV output from String Utilities:
// original           | camelCase            | snake_case             | PascalCase          | kebab-case
// getUserProfile     | getUserProfile       | get_user_profile       | GetUserProfile      | get-user-profile
// getOrderHistory    | getOrderHistory      | get_order_history      | GetOrderHistory     | get-order-history
// updatePaymentMethod| updatePaymentMethod  | update_payment_method  | UpdatePaymentMethod | update-payment-method
// deleteUserAccount  | deleteUserAccount    | delete_user_account    | DeleteUserAccount   | delete-user-account
// sendEmailNotification| sendEmailNotification | send_email_notification | SendEmailNotification | send-email-notification`}
      </CodeBlock>

      <SectionHeader number={6} title="Real-World Examples: When Case Matters" />
      <p>
        Case format is not just a style preference — using the wrong format in the wrong context
        causes real bugs. Here are three real-world scenarios where case conversion is required.
      </p>

      <p><strong>Scenario 1: Migrating DB columns to Python ORM</strong></p>
      <p>
        Your existing MySQL database has columns named <code>userId</code>, <code>createdAt</code>,{' '}
        <code>paymentMethodId</code> — camelCase from a legacy JS ORM. You are migrating to
        SQLAlchemy (Python), which expects snake_case column names: <code>user_id</code>,{' '}
        <code>created_at</code>, <code>payment_method_id</code>. Export the column list, bulk
        convert to snake_case in String Utilities, download CSV, and use it to write the migration
        script.
      </p>

      <p><strong>Scenario 2: Converting JSON API keys for JavaScript frontend</strong></p>
      <p>
        Your Python FastAPI backend returns JSON with snake_case keys: <code>user_id</code>,{' '}
        <code>first_name</code>, <code>created_at</code>. Your React frontend expects camelCase:{' '}
        <code>userId</code>, <code>firstName</code>, <code>createdAt</code>. Use the{' '}
        <code>camelcase-keys</code> library in your API client layer to convert all keys
        automatically on fetch.
      </p>

      <p><strong>Scenario 3: Generating CSS class names from component names</strong></p>
      <p>
        Your React component names are in PascalCase: <code>UserProfileCard</code>,{' '}
        <code>PrimaryButton</code>, <code>NavMenuItem</code>. CSS class names for BEM or Tailwind
        utilities should be kebab-case: <code>user-profile-card</code>,{' '}
        <code>primary-button</code>, <code>nav-menu-item</code>. Convert component names to
        kebab-case using String Utilities bulk mode to generate the class name reference.
      </p>

      <FAQAccordion
        items={[
          {
            question: 'How do I convert camelCase to snake_case online for free?',
            answer:
              'Go to unblockdevs.com/string-utilities and paste your camelCase string. The tool instantly shows the snake_case version (and all 11 other formats) in the output panel. Click the copy icon next to "snake_case" to copy it. For bulk conversion of many strings, use Bulk Mode — paste a newline-separated list and download a CSV with all formats.',
          },
          {
            question: 'When should I use camelCase vs snake_case?',
            answer:
              'Use camelCase in JavaScript, TypeScript, Java, Swift, and for JSON API keys. Use snake_case in Python, Ruby, PostgreSQL column names, and Go. Use PascalCase for class names and React components in any language. Use SCREAMING_SNAKE for constants and environment variables. Use kebab-case for CSS class names, HTML data attributes, URL slugs, and CLI flags.',
          },
          {
            question: 'How do I convert snake_case to camelCase in JavaScript?',
            answer:
              'Use: str.replace(/_([a-z])/g, (_, c) => c.toUpperCase()). This replaces each underscore followed by a lowercase letter with the uppercase version of that letter. For converting all keys in an object recursively, use the camelcase-keys npm package. For a one-off conversion without code, paste the string into unblockdevs.com/string-utilities.',
          },
          {
            question: 'How do I convert many variable names to snake_case at once?',
            answer:
              'Use String Utilities Bulk Mode at unblockdevs.com/string-utilities. Paste a newline-separated list of variable names (copy a column from a spreadsheet), and the tool converts all of them to every case format simultaneously. Download the result as a CSV for use in migration scripts or refactoring documentation.',
          },
          {
            question: 'What is the difference between PascalCase and camelCase?',
            answer:
              'Both join words without separators and capitalize each word — but camelCase keeps the first word lowercase (getUserProfile) while PascalCase capitalizes the first word too (GetUserProfile). Use camelCase for variables and functions in JavaScript/TypeScript. Use PascalCase for class names, React component names, TypeScript interfaces and type aliases, and C# identifiers.',
          },
          {
            question: 'How do I rename variables to a different case format online?',
            answer:
              'Paste the variable name into unblockdevs.com/string-utilities. The tool automatically detects word boundaries (even from camelCase, PascalCase, snake_case, or space-separated input) and converts to all 12 formats at once. It handles acronyms correctly — "parseHTTPSResponse" splits into "parse", "HTTPS", "Response" for accurate conversion to snake_case as "parse_https_response".',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
