'use client';

import Link from 'next/link';
import { ArrowLeft, Database, ExternalLink, Code, CheckCircle, Copy, FileJson } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function MysqlJsonCompleteGuideClient() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast.success('Code copied!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const examples = [
    {
      id: 'extract-simple',
      title: 'Extract Simple Value from JSON',
      description: 'Extract a single value from a JSON column using JSON_EXTRACT or -> operator',
      query: `SELECT 
  id,
  JSON_EXTRACT(metadata, '$.name') AS name,
  metadata->'$.email' AS email
FROM users;`,
      explanation: 'Extracts name and email from metadata JSON column. JSON_EXTRACT() and -> operator are equivalent. The -> operator returns JSON type, while ->> returns text.',
      useCase: 'Basic JSON value extraction, simple data retrieval'
    },
    {
      id: 'extract-nested',
      title: 'Extract from Nested JSON',
      description: 'Extract values from nested JSON objects using dot notation',
      query: `SELECT 
  id,
  JSON_EXTRACT(profile, '$.address.city') AS city,
  JSON_EXTRACT(profile, '$.address.country') AS country,
  profile->>'$.contact.phone' AS phone
FROM users;`,
      explanation: 'Extracts nested values using dot notation. profile->>$.contact.phone uses ->> to return text directly without quotes.',
      useCase: 'Complex nested structures, hierarchical data extraction'
    },
    {
      id: 'extract-array',
      title: 'Extract from JSON Array',
      description: 'Extract elements from JSON arrays using array index',
      query: `SELECT 
  id,
  JSON_EXTRACT(tags, '$[0]') AS first_tag,
  JSON_EXTRACT(tags, '$[1]') AS second_tag,
  JSON_LENGTH(tags) AS tag_count
FROM products;`,
      explanation: 'Extracts first and second elements from tags array. $[0] is first element, $[1] is second. JSON_LENGTH() returns array length.',
      useCase: 'Array element access, list processing, tag extraction'
    },
    {
      id: 'extract-array-all',
      title: 'Extract All Array Elements',
      description: 'Extract all elements from a JSON array using JSON_TABLE',
      query: `SELECT 
  u.id,
  u.name,
  tag.value AS tag
FROM users u
CROSS JOIN JSON_TABLE(
  u.tags,
  '$[*]' COLUMNS (value VARCHAR(50) PATH '$')
) AS tag;`,
      explanation: 'JSON_TABLE() converts JSON array into rows. Each array element becomes a separate row, allowing you to work with array data as relational data.',
      useCase: 'Flattening arrays, array-to-rows conversion, tag processing'
    },
    {
      id: 'filter-json',
      title: 'Filter Rows Based on JSON Value',
      description: 'Use JSON values in WHERE clause to filter results',
      query: `SELECT * FROM products 
WHERE JSON_EXTRACT(metadata, '$.status') = 'active'
  AND JSON_EXTRACT(metadata, '$.price') > 100;`,
      explanation: 'Filters products where status is active and price is greater than 100. JSON values can be used in WHERE, ORDER BY, and other clauses.',
      useCase: 'Conditional filtering, JSON-based search, dynamic queries'
    },
    {
      id: 'update-json',
      title: 'Update JSON Field',
      description: 'Update specific fields within a JSON column',
      query: `UPDATE users 
SET metadata = JSON_SET(metadata, '$.last_login', NOW())
WHERE id = 123;`,
      explanation: 'JSON_SET() updates or adds a field in JSON. Other functions: JSON_REPLACE() (only updates existing), JSON_INSERT() (only adds new).',
      useCase: 'Updating JSON fields, adding metadata, tracking changes'
    },
    {
      id: 'merge-json',
      title: 'Merge JSON Objects',
      description: 'Combine multiple JSON objects into one',
      query: `SELECT 
  id,
  JSON_MERGE_PRESERVE(
    JSON_OBJECT('id', id, 'name', name),
    metadata
  ) AS combined_json
FROM users;`,
      explanation: 'JSON_MERGE_PRESERVE() merges JSON objects, keeping all keys. JSON_MERGE_PATCH() overwrites duplicate keys with later values.',
      useCase: 'Combining JSON data, merging configurations, data aggregation'
    },
    {
      id: 'search-json',
      title: 'Search Within JSON',
      description: 'Search for values or keys within JSON using JSON_SEARCH',
      query: `SELECT * FROM products 
WHERE JSON_SEARCH(metadata, 'one', 'electronics', NULL, '$**.category') IS NOT NULL;`,
      explanation: 'JSON_SEARCH() finds path to a value. \'one\' returns first match, \'all\' returns all. $**.category searches all category fields recursively.',
      useCase: 'Deep JSON search, finding values, recursive search'
    },
    {
      id: 'validate-json',
      title: 'Validate JSON Structure',
      description: 'Check if a string is valid JSON before processing',
      query: `SELECT 
  id,
  JSON_VALID(data) AS is_valid_json,
  CASE 
    WHEN JSON_VALID(data) THEN JSON_EXTRACT(data, '$.name')
    ELSE 'Invalid JSON'
  END AS name
FROM table_name;`,
      explanation: 'JSON_VALID() returns 1 if valid JSON, 0 otherwise. Always validate before extracting to avoid errors.',
      useCase: 'Data validation, error prevention, safe JSON processing'
    },
    {
      id: 'aggregate-json',
      title: 'Aggregate JSON Values',
      description: 'Calculate aggregates from JSON numeric values',
      query: `SELECT 
  category,
  COUNT(*) AS product_count,
  SUM(CAST(JSON_EXTRACT(metadata, '$.price') AS DECIMAL(10,2))) AS total_revenue,
  AVG(CAST(JSON_EXTRACT(metadata, '$.price') AS DECIMAL(10,2))) AS avg_price
FROM products
GROUP BY category;`,
      explanation: 'Extracts price from JSON, casts to DECIMAL for calculations. CAST() is essential for numeric operations on JSON values.',
      useCase: 'JSON-based calculations, financial aggregations, statistics'
    }
  ];

  const tips = [
    {
      title: 'Use ->> for Text Output',
      description: 'The ->> operator automatically unquotes JSON strings. Use it when you need text output instead of JSON type.',
      example: `-- Instead of:
SELECT JSON_UNQUOTE(JSON_EXTRACT(data, '$.name')) AS name;

-- Use:
SELECT data->>'$.name' AS name;`
    },
    {
      title: 'Index JSON Columns',
      description: 'Create generated columns and index them for better performance on JSON queries.',
      example: `ALTER TABLE products 
ADD COLUMN category_text VARCHAR(50) 
  GENERATED ALWAYS AS (metadata->>'$.category') STORED,
ADD INDEX idx_category (category_text);`
    },
    {
      title: 'Use JSON_TABLE for Complex Queries',
      description: 'JSON_TABLE() converts JSON arrays/objects into relational rows, enabling JOINs and complex queries.',
      example: `SELECT u.name, tag.value 
FROM users u
CROSS JOIN JSON_TABLE(
  u.tags, '$[*]' 
  COLUMNS (value VARCHAR(50) PATH '$')
) AS tag;`
    },
    {
      title: 'Validate Before Processing',
      description: 'Always use JSON_VALID() before extracting data to prevent errors from malformed JSON.',
      example: `SELECT * FROM table_name 
WHERE JSON_VALID(json_column) = 1
  AND JSON_EXTRACT(json_column, '$.field') IS NOT NULL;`
    },
    {
      title: 'Use JSON_SET for Updates',
      description: 'JSON_SET() adds or updates fields. JSON_REPLACE() only updates existing fields. JSON_INSERT() only adds new fields.',
      example: `-- Updates or adds field
UPDATE users 
SET metadata = JSON_SET(metadata, '$.last_login', NOW());

-- Only updates existing
UPDATE users 
SET metadata = JSON_REPLACE(metadata, '$.status', 'active');`
    },
    {
      title: 'Cast JSON Numbers for Calculations',
      description: 'JSON numbers are stored as strings. Always CAST to numeric types before calculations.',
      example: `SELECT 
  SUM(CAST(JSON_EXTRACT(data, '$.price') AS DECIMAL(10,2))) AS total
FROM products;`
    },
    {
      title: 'Use JSON_MERGE_PRESERVE for Combining',
      description: 'JSON_MERGE_PRESERVE() keeps all keys from both objects. JSON_MERGE_PATCH() overwrites duplicates.',
      example: `SELECT JSON_MERGE_PRESERVE(
  JSON_OBJECT('a', 1, 'b', 2),
  JSON_OBJECT('b', 3, 'c', 4)
) AS result;
-- Result: {"a": 1, "b": [2, 3], "c": 4}`
    },
    {
      title: 'Escape Special Characters in Paths',
      description: 'Use double backslashes to escape special characters in JSON paths.',
      example: `-- For key with special characters
SELECT JSON_EXTRACT(data, '$."user-name"') AS name;

-- For keys with dots
SELECT JSON_EXTRACT(data, '$."user.email"') AS email;`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <FileJson className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Working with JSON in MySQL</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Extract & Manipulate JSON Data</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Working with JSON in MySQL"
        description="Complete Guide to Extract & Manipulate JSON Data"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'How do I extract data from JSON in MySQL?',
              answer: 'Use JSON_EXTRACT() function or -> operator: SELECT JSON_EXTRACT(column, \'$.key\') FROM table; For text output, use ->> operator: SELECT column->>\'$.key\' FROM table; For nested JSON, use dot notation: JSON_EXTRACT(column, \'$.parent.child\').',
            },
            {
              question: 'How do I extract data from nested JSON in MySQL?',
              answer: 'Use dot notation in the JSON path: JSON_EXTRACT(column, \'$.parent.child\') or column->\'$.parent.child\'. For deeper nesting: JSON_EXTRACT(column, \'$.level1.level2.level3\'). The ->> operator returns text directly without quotes.',
            },
            {
              question: 'How do I update JSON fields in MySQL?',
              answer: 'Use JSON_SET() to add or update: UPDATE table SET json_column = JSON_SET(json_column, \'$.key\', \'value\'); Use JSON_REPLACE() to only update existing fields, or JSON_INSERT() to only add new fields.',
            },
            {
              question: 'How do I extract elements from JSON arrays in MySQL?',
              answer: 'Use array index notation: JSON_EXTRACT(column, \'$[0]\') for first element, \'$[1]\' for second. Use JSON_TABLE() to convert array to rows: CROSS JOIN JSON_TABLE(column, \'$[*]\' COLUMNS (value VARCHAR(50) PATH \'$\')) AS t.',
            },
            {
              question: 'What is the difference between -> and ->> operators in MySQL?',
              answer: 'The -> operator returns JSON type (quoted strings), while ->> returns text type (unquoted strings). Use -> when you need JSON type, ->> when you need text for comparisons or display. Example: column->\'$.name\' returns "John", column->>\'$.name\' returns John.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>JSON in MySQL</strong> provides powerful capabilities for storing and querying semi-structured data. 
              Since MySQL 5.7, you can store JSON documents in columns and use specialized functions to extract, 
              manipulate, and query JSON data efficiently. This guide covers everything you need to know about 
              <strong> working with JSON in MySQL</strong>, including structure, extraction methods, nested JSON handling, 
              and practical examples.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're storing configuration data, user preferences, or complex nested structures, understanding 
              MySQL's JSON functions will help you build efficient queries and maintain flexible data models.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding JSON in MySQL</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">JSON Data Type</h3>
              <p className="text-sm text-gray-700 mb-2">
                MySQL provides a native JSON data type that validates JSON documents and stores them efficiently. 
                JSON columns are stored as binary format (similar to BLOB) but with automatic validation.
              </p>
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
                <code>{`CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  metadata JSON
);`}</code>
              </pre>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">JSON Structure</h3>
              <p className="text-sm text-gray-700 mb-2">
                JSON in MySQL supports objects, arrays, strings, numbers, booleans, and NULL. You can nest objects 
                and arrays to any depth.
              </p>
              <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
                <code>{`{
  "name": "John Doe",
  "email": "john@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA"
  },
  "tags": ["developer", "mysql", "json"],
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}`}</code>
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">JSON Functions Overview</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Extraction Functions</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li><code className="bg-gray-200 px-1 rounded">JSON_EXTRACT()</code> - Extract value by path</li>
                  <li><code className="bg-gray-200 px-1 rounded">-&gt;</code> - Extract JSON (returns JSON type)</li>
                  <li><code className="bg-gray-200 px-1 rounded">-&gt;&gt;</code> - Extract text (returns text type)</li>
                  <li><code className="bg-gray-200 px-1 rounded">JSON_UNQUOTE()</code> - Remove quotes from JSON string</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Modification Functions</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li><code className="bg-gray-200 px-1 rounded">JSON_SET()</code> - Add or update field</li>
                  <li><code className="bg-gray-200 px-1 rounded">JSON_REPLACE()</code> - Update existing field</li>
                  <li><code className="bg-gray-200 px-1 rounded">JSON_INSERT()</code> - Add new field</li>
                  <li><code className="bg-gray-200 px-1 rounded">JSON_REMOVE()</code> - Remove field</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Utility Functions</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li><code className="bg-gray-200 px-1 rounded">JSON_VALID()</code> - Validate JSON</li>
                  <li><code className="bg-gray-200 px-1 rounded">JSON_LENGTH()</code> - Get array/object length</li>
                  <li><code className="bg-gray-200 px-1 rounded">JSON_SEARCH()</code> - Search for value</li>
                  <li><code className="bg-gray-200 px-1 rounded">JSON_TABLE()</code> - Convert JSON to rows</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Creation Functions</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li><code className="bg-gray-200 px-1 rounded">JSON_OBJECT()</code> - Create JSON object</li>
                  <li><code className="bg-gray-200 px-1 rounded">JSON_ARRAY()</code> - Create JSON array</li>
                  <li><code className="bg-gray-200 px-1 rounded">JSON_MERGE_PRESERVE()</code> - Merge JSON objects</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10 Practical Examples</h2>
            <div className="space-y-6">
              {examples.map((example) => (
                <div key={example.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{example.title}</h3>
                      <p className="text-gray-700 mb-3">{example.description}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200 mb-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 text-sm">Query:</h4>
                      <button
                        onClick={() => copyToClipboard(example.query, example.id)}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        title="Copy query"
                      >
                        {copiedCode === example.id ? (
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
                      <code>{example.query}</code>
                    </pre>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">Explanation:</h4>
                      <p className="text-sm text-gray-700">{example.explanation}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">Use Case:</h4>
                      <p className="text-sm text-gray-700">{example.useCase}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips & Tricks</h2>
            <div className="space-y-4">
              {tips.map((tip, idx) => (
                <div key={idx} className="bg-yellow-50 rounded-lg p-5 border-l-4 border-yellow-500">
                  <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-sm text-gray-700 mb-3">{tip.description}</p>
                  <div className="bg-white rounded p-3 border border-gray-200">
                    <pre className="text-sm overflow-x-auto">
                      <code className="text-gray-800">{tip.example}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Use Generated Columns for Indexing</h3>
                <p className="text-sm text-gray-700">
                  Create generated columns from frequently queried JSON fields and add indexes. This dramatically 
                  improves query performance on JSON columns.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Validate JSON Before Processing</h3>
                <p className="text-sm text-gray-700">
                  Always use JSON_VALID() before extracting data to prevent errors from malformed JSON. This is 
                  especially important when data comes from external sources.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Use -&gt;&gt; for Text Comparisons</h3>
                <p className="text-sm text-gray-700">
                  When comparing JSON values in WHERE clauses, use -&gt;&gt; operator to get text output. This avoids 
                  issues with JSON type comparisons and improves readability.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Cast JSON Numbers for Calculations</h3>
                <p className="text-sm text-gray-700">
                  JSON numbers are stored as strings. Always CAST to DECIMAL or numeric types before performing 
                  calculations or aggregations.
                </p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h3 className="font-semibold text-gray-900 mb-2">⚠️ Consider Schema Design</h3>
                <p className="text-sm text-gray-700">
                  While JSON provides flexibility, consider if your data should be in JSON or normalized tables. 
                  Use JSON for truly variable or semi-structured data, not as a replacement for proper schema design.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Database className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Format Your MySQL Queries</h2>
                <p className="text-purple-100">
                  Use our SQL Formatter tool to format, validate, and beautify your MySQL JSON queries for better 
                  readability and debugging.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=sql"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Open SQL Formatter
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}

