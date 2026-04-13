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

export default function JsonTreeViewExplorerClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>JSON Tree View, JSONPath, JSON to TypeScript &amp; SQL — Advanced JSON Exploration</h1>
      <p className="lead">
        Formatting JSON is just the start. Complex API responses with deep nesting, large
        arrays, and mixed types need more than indentation — you need a tree view to navigate
        the structure, JSONPath to query specific values, TypeScript interface generation to
        use the data safely in code, and SQL generation when you need to store it in a
        relational database. This guide covers all four advanced workflows with the JSON
        workbench.
      </p>

      <StatGrid stats={[
        { value: 'Tree view', label: 'Expand/collapse any node — navigate deep nesting without scrolling', color: 'blue' },
        { value: 'JSONPath', label: 'Query specific values from large responses — like XPath for JSON', color: 'green' },
        { value: 'TypeScript', label: 'Generate interfaces from JSON — skip writing types by hand', color: 'violet' },
      ]} />

      <SectionHeader number={1} title="JSON Tree View — Navigate Deep Nesting Without Getting Lost" />
      <p>
        A tree view renders JSON as a collapsible hierarchy. Each object is a node you can
        expand or collapse independently. This is critical for large API responses with 5+
        levels of nesting — scrolling through formatted text is far slower than navigating
        a tree.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Expand/collapse individual nodes',
          description:
            'Click any object or array to collapse it to a single line, hiding its children. Focus on the top-level structure first, then drill into specific sections.',
        },
        {
          title: 'See value types at a glance',
          description:
            'Tree views color-code values by type: strings (green), numbers (blue), booleans (orange), null (gray). No need to guess types from raw text in a deeply nested structure.',
        },
        {
          title: 'Count array elements instantly',
          description:
            'Arrays show their element count when collapsed: [12 items]. No need to scroll the entire array or write code to check length during debugging.',
        },
        {
          title: 'Copy paths for code use',
          description:
            'Hover any tree node to copy its full path (e.g., response.data.users[0].address.city). Use the path directly in code or as a JSONPath expression.',
        },
      ]} />

      <CodeBlock lang="json" title="Complex API response — hard to read as text, easy in tree view">
{`{
  "status": "success",
  "data": {
    "pagination": { "page": 1, "perPage": 25, "total": 847, "pages": 34 },
    "users": [
      {
        "id": "usr_01HX",
        "name": "Alice Smith",
        "email": "alice@example.com",
        "profile": {
          "avatar": "https://cdn.example.com/avatars/01HX.jpg",
          "bio": "Senior Developer",
          "location": { "city": "London", "country": "UK", "timezone": "Europe/London" }
        },
        "permissions": { "read": true, "write": true, "admin": false, "billing": false },
        "createdAt": "2023-03-15T09:00:00Z"
      }
    ]
  },
  "meta": { "requestId": "req_abc123", "duration": 143, "version": "v2.1" }
}`}
      </CodeBlock>

      <AlertBox type="tip" title="Navigate this response in seconds with tree view">
        In the{' '}
        <a href="https://unblockdevs.com/json-beautifier" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-medium">
          JSON workbench tree view
        </a>
        , collapse <code>data.users[0].profile</code> to focus on permissions, or collapse
        the entire <code>data.users</code> array to check pagination and meta. Much faster
        than scrolling 50+ lines of formatted text.
      </AlertBox>

      <SectionHeader number={2} title="JSONPath — Query JSON Like a Database" />
      <p>
        JSONPath is a query language for JSON — like XPath for XML or CSS selectors for HTML.
        It extracts specific values from any JSON structure without writing JavaScript.
      </p>

      <CodeBlock lang="text" title="JSONPath syntax — essential operators">
{`$                  — root of the document
.key               — child property named 'key'
['key']            — same as .key (use for keys with special characters or spaces)
[0]                — array element at index 0
[*]                — all array elements (wildcard)
..key              — recursive descent — find 'key' at any depth in the tree
[0,2,4]            — multiple specific indices
[1:5]              — array slice — elements at index 1, 2, 3, 4
[?(@.price > 50)]  — filter — array elements where price > 50
@                  — current element (used inside filter expressions)`}
      </CodeBlock>

      <CodeBlock lang="text" title="JSONPath queries on the user API response above">
{`// Get all user names from the array
$.data.users[*].name
→ ["Alice Smith"]

// Get the first user's city
$.data.users[0].profile.location.city
→ "London"

// Get users with admin permissions
$.data.users[?(@.permissions.admin == true)]
→ []  (none in this example — Alice has admin: false)

// Get total user count from pagination
$.data.pagination.total
→ 847

// Recursive search for all email fields at any depth
$..email
→ ["alice@example.com"]

// Get the API request duration
$.meta.duration
→ 143`}
      </CodeBlock>

      <QuickFact color="green" label="Use JSONPath in production code — not just in tools">
        Libraries like <code>jsonpath-plus</code> (npm), <code>jmespath</code> (AWS SDK),
        and <code>jsonpath-ng</code> (Python) let you use JSONPath expressions in application
        code to extract values from API responses — without manually traversing nested
        properties with <code>response?.data?.users?.[0]?.profile</code>.
      </QuickFact>

      <SectionHeader number={3} title="JSON to TypeScript — Generate Interfaces Automatically" />
      <p>
        Writing TypeScript interfaces for API responses by hand is tedious and error-prone.
        The JSON-to-TypeScript generator reads the JSON structure and produces accurate
        interface definitions — handling nested objects, arrays, and primitive types.
      </p>

      <CodeBlock lang="json" title="Input: user API response">
{`{
  "id": 42,
  "name": "Alice Smith",
  "email": "alice@example.com",
  "role": "admin",
  "permissions": ["read", "write", "delete"],
  "profile": {
    "avatar": "https://cdn.example.com/avatars/42.jpg",
    "bio": "Senior Developer",
    "timezone": "Europe/London"
  },
  "settings": {
    "theme": "dark",
    "notifications": true,
    "language": "en"
  },
  "lastLogin": "2024-11-15T10:30:00Z",
  "createdAt": "2023-03-15T09:00:00Z"
}`}
      </CodeBlock>

      <CodeBlock lang="typescript" title="Generated TypeScript interfaces">
{`export interface Profile {
  avatar: string;
  bio: string;
  timezone: string;
}

export interface Settings {
  theme: string;
  notifications: boolean;
  language: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  profile: Profile;
  settings: Settings;
  lastLogin: string;
  createdAt: string;
}

// Ready to use in your API client
const fetchUser = async (id: number): Promise<User> => {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json() as Promise<User>;
};`}
      </CodeBlock>

      <AlertBox type="info" title="Generated interfaces are a starting point — review before using">
        The generator infers types from the sample data. If a field can be <code>null</code>{' '}
        in some responses but not in the sample, the interface won't reflect that. Review
        generated interfaces and mark fields as optional (<code>field?: Type</code>) or
        nullable (<code>field: Type | null</code>) based on your actual API contract.
      </AlertBox>

      <SectionHeader number={4} title="JSON to SQL — Generate INSERT Statements from JSON Arrays" />
      <p>
        When you have a JSON array of records to import into a relational database, the
        JSON-to-SQL generator saves hours of manual work. It infers column types and produces
        ready-to-run CREATE TABLE and INSERT statements.
      </p>

      <CodeBlock lang="json" title="Input: JSON array of product records">
{`[
  { "id": 1, "name": "Wireless Mouse", "price": 29.99, "category": "electronics", "inStock": true },
  { "id": 2, "name": "Mechanical Keyboard", "price": 89.99, "category": "electronics", "inStock": true },
  { "id": 3, "name": "USB-C Hub", "price": 49.99, "category": "accessories", "inStock": false },
  { "id": 4, "name": "Monitor Stand", "price": 35.00, "category": "accessories", "inStock": true }
]`}
      </CodeBlock>

      <CodeBlock lang="sql" title="Generated SQL">
{`CREATE TABLE products (
  id INTEGER,
  name TEXT,
  price NUMERIC,
  category TEXT,
  inStock BOOLEAN
);

INSERT INTO products (id, name, price, category, inStock) VALUES
  (1, 'Wireless Mouse', 29.99, 'electronics', TRUE),
  (2, 'Mechanical Keyboard', 89.99, 'electronics', TRUE),
  (3, 'USB-C Hub', 49.99, 'accessories', FALSE),
  (4, 'Monitor Stand', 35.00, 'accessories', TRUE);`}
      </CodeBlock>

      <SectionHeader number={5} title="Full Workflow — API Response to TypeScript + Database" />

      <VerticalSteps steps={[
        {
          title: 'Paste your API response JSON',
          desc: 'Go to unblockdevs.com/json-beautifier. Paste the raw API response — the tool formats it, validates it, and shows the tree view immediately.',
        },
        {
          title: 'Explore the structure in Tree View',
          desc: 'Click the Tree tab. Expand and collapse nodes to understand the response shape. Note arrays, nested objects, and nullable fields before writing any code.',
        },
        {
          title: 'Query specific values with JSONPath',
          desc: 'Use the JSONPath panel to test extraction queries. Find exact paths to the values your code needs and copy them for use in your data access layer.',
        },
        {
          title: 'Generate TypeScript interfaces',
          desc: 'Switch to the TypeScript tab. Copy the generated interfaces into your project. Adjust optional and nullable fields based on your API documentation.',
        },
        {
          title: 'Generate SQL for database import',
          desc: 'For JSON arrays to store in a database, use the SQL tab to get CREATE TABLE and INSERT statements. Run in your database client to import the data.',
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is a JSON tree view and why is it useful?',
          answer: 'A JSON tree view renders JSON as a collapsible hierarchy — like a file explorer for data. Each object and array is a node you can expand or collapse independently. For large API responses with deep nesting, a tree view is far faster to navigate than scrolling formatted text. You can collapse sections you have already reviewed and focus on the specific parts you need to debug.',
        },
        {
          question: 'What is JSONPath and how do I use it?',
          answer: 'JSONPath is a query language for JSON, similar to XPath for XML. The root is $. Use dot notation for properties: $.data.users. Use [0] for array index, [*] for all elements, and [?(@.field == value)] for filter expressions. Test JSONPath queries interactively in the JSON workbench at unblockdevs.com/json-beautifier — paste your JSON, write a query, and see the extracted values instantly.',
        },
        {
          question: 'How do I generate TypeScript interfaces from a JSON response?',
          answer: 'Paste your JSON into the JSON workbench at unblockdevs.com/json-beautifier and switch to the TypeScript tab. The tool generates interface definitions for all nested objects and arrays automatically. Copy into your project and review: mark nullable fields as Type | null, optional fields with ?, and rename generated interface names to match your domain model.',
        },
        {
          question: 'How do I convert a JSON array to SQL INSERT statements?',
          answer: 'Paste your JSON array into the JSON workbench and switch to the SQL tab. The tool infers column types (INTEGER, TEXT, NUMERIC, BOOLEAN) from the data, generates a CREATE TABLE statement, and produces INSERT statements for all records. Works with PostgreSQL, MySQL, and SQLite syntax. Copy and run in your database client.',
        },
        {
          question: 'What JSONPath libraries can I use in JavaScript code?',
          answer: 'For Node.js: jsonpath-plus (npm install jsonpath-plus) supports all JSONPath operators including filters. jsonpath (npm) is simpler. For AWS SDK: jmespath is built-in. For Python: jsonpath-ng or jmespath. All accept the same JSONPath syntax you test in the JSON workbench tool.',
        },
        {
          question: 'Where can I explore JSON with a tree view online for free?',
          answer: 'The JSON workbench at unblockdevs.com/json-beautifier includes a full interactive tree view with expand/collapse, type-colored values, and array counts. It also includes JSONPath querying, TypeScript interface generation, and SQL generation — all free, all in-browser, and no account required.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
