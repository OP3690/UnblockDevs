'use client';

import Link from 'next/link';
import { ArrowLeft, Database, Code, CheckCircle, AlertTriangle, Zap, FileCode, ArrowRight } from 'lucide-react';

import BlogSocialShare from '@/components/BlogSocialShare';
export default function MysqlCommaSeparatedIdListGuideClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Developer's Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Create Comma Separated ID List for MySQL IN Clause</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide with Examples and Free SQL Formatter Tool</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="How to Create Comma Separated ID List for MySQL IN Clause"
        description="Complete Guide with Examples and Free SQL Formatter Tool"
        variant="floating"
      />


      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Working with MySQL queries often requires passing multiple IDs or values to an <code className="bg-gray-100 px-2 py-1 rounded">IN</code> clause. 
              Whether you're converting an array from your application code, processing user input, or generating dynamic queries, 
              creating a properly formatted comma-separated list is essential.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This comprehensive guide covers everything you need to know about creating comma-separated ID lists for MySQL IN clauses, 
              including best practices, common pitfalls, and how to use our free SQL Formatter tool to automate the process.
            </p>
          </section>

          {/* Section 1: Understanding MySQL IN Clause */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Database className="w-8 h-8 text-blue-600" />
              1. Understanding MySQL IN Clause
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">What is the IN Clause?</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The <code className="bg-gray-100 px-2 py-1 rounded">IN</code> clause in MySQL allows you to specify multiple values in a WHERE condition. 
                  It's equivalent to multiple OR conditions but more concise and efficient.
                </p>
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <p className="font-semibold text-blue-900 mb-2">Basic Syntax:</p>
                  <pre className="bg-white p-4 rounded border border-blue-200 text-sm overflow-x-auto">
{`SELECT * FROM users 
WHERE id IN (1, 2, 3, 4, 5);`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Why Use Comma Separated Lists?</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Efficiency:</strong> Single query instead of multiple queries or loops</li>
                  <li><strong>Performance:</strong> MySQL can optimize IN clause queries better than multiple OR conditions</li>
                  <li><strong>Simplicity:</strong> Cleaner, more readable SQL code</li>
                  <li><strong>Dynamic Queries:</strong> Easy to build programmatically from arrays or lists</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Creating Comma Separated ID Lists */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Code className="w-8 h-8 text-blue-600" />
              2. How to Create Comma Separated ID Lists
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Method 1: Manual Formatting</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For small lists, you can manually format IDs with commas:
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                  <pre className="bg-white p-4 rounded border border-green-200 text-sm overflow-x-auto">
{`-- Input: 1, 2, 3, 4, 5
-- Output for MySQL:
WHERE id IN (1, 2, 3, 4, 5)

-- For string IDs:
WHERE id IN ('ID-123', 'ID-456', 'ID-789')`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Method 2: Using SQL Formatter Tool</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our free SQL Formatter tool automatically converts your list of IDs into a properly formatted MySQL IN clause:
                </p>
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <p className="font-semibold text-blue-900 mb-2">Example Input:</p>
                  <pre className="bg-white p-4 rounded border border-blue-200 text-sm overflow-x-auto mb-4">
{`ID-123456
ID-11112223
ID-99988877`}
                  </pre>
                  <p className="font-semibold text-blue-900 mb-2">Output:</p>
                  <pre className="bg-white p-4 rounded border border-blue-200 text-sm overflow-x-auto">
{`"ID-123456","ID-11112223","ID-99988877"`}
                  </pre>
                  <p className="text-blue-800 text-sm mt-3">
                    This formatted output can be directly used in your MySQL IN clause.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Method 3: Programmatic Conversion</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Convert arrays or lists in your programming language:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="font-semibold text-gray-900 mb-2 text-sm">JavaScript:</p>
                    <pre className="bg-white p-3 rounded border border-gray-200 text-xs overflow-x-auto">
{`const ids = [1, 2, 3, 4, 5];
const sql = \`WHERE id IN (\${ids.join(', ')})\`;
// Result: WHERE id IN (1, 2, 3, 4, 5)`}
                    </pre>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="font-semibold text-gray-900 mb-2 text-sm">Python:</p>
                    <pre className="bg-white p-3 rounded border border-gray-200 text-xs overflow-x-auto">
{`ids = [1, 2, 3, 4, 5]
sql = f"WHERE id IN ({', '.join(map(str, ids))})"
# Result: WHERE id IN (1, 2, 3, 4, 5)`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Common Use Cases */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Zap className="w-8 h-8 text-blue-600" />
              3. Common Use Cases and Examples
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Use Case 1: Filtering by Multiple IDs</h3>
                <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                  <pre className="bg-white p-4 rounded border border-green-200 text-sm overflow-x-auto">
{`-- Get users with specific IDs
SELECT * FROM users 
WHERE id IN (1, 5, 10, 15, 20);`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Use Case 2: String IDs with Quotes</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  When working with string IDs, ensure proper quoting:
                </p>
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <pre className="bg-white p-4 rounded border border-blue-200 text-sm overflow-x-auto">
{`-- String IDs must be quoted
SELECT * FROM products 
WHERE product_code IN ('PROD-001', 'PROD-002', 'PROD-003');`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Use Case 3: Dynamic Query Building</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Build queries dynamically from user input or application data:
                </p>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`-- PHP Example
$ids = [1, 2, 3, 4, 5];
$placeholders = implode(',', array_fill(0, count($ids), '?'));
$sql = "SELECT * FROM users WHERE id IN ($placeholders)";
// Use prepared statement for security`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Use Case 4: Converting from GROUP_CONCAT</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Use GROUP_CONCAT to create comma-separated lists from table data:
                </p>
                <div className="bg-purple-50 rounded-lg p-5 border border-purple-200">
                  <pre className="bg-white p-4 rounded border border-purple-200 text-sm overflow-x-auto">
{`-- Get comma-separated list of IDs
SELECT GROUP_CONCAT(id) as id_list 
FROM users 
WHERE status = 'active';

-- Result: "1,2,3,4,5"
-- Can be used in subsequent queries`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Best Practices */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-blue-600" />
              4. Best Practices and Security
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">1. Use Prepared Statements</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Always use prepared statements to prevent SQL injection attacks:
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                  <p className="font-semibold text-green-900 mb-2">✅ Good (Prepared Statement):</p>
                  <pre className="bg-white p-4 rounded border border-green-200 text-sm overflow-x-auto">
{`-- PHP Example
$ids = [1, 2, 3];
$placeholders = implode(',', array_fill(0, count($ids), '?'));
$stmt = $pdo->prepare("SELECT * FROM users WHERE id IN ($placeholders)");
$stmt->execute($ids);`}
                  </pre>
                </div>
                <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mt-4">
                  <p className="font-semibold text-red-900 mb-2">❌ Bad (SQL Injection Risk):</p>
                  <pre className="bg-white p-4 rounded border border-red-200 text-sm overflow-x-auto">
{`-- NEVER do this!
$ids = $_GET['ids']; // User input
$sql = "SELECT * FROM users WHERE id IN ($ids)";`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">2. Handle Large Lists</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For very large lists (1000+ items), consider alternatives:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Use temporary tables</li>
                  <li>Split into multiple queries</li>
                  <li>Use JOINs instead of IN clause</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">3. Proper Data Type Handling</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ensure correct data types in your IN clause:
                </p>
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <pre className="bg-white p-4 rounded border border-blue-200 text-sm overflow-x-auto">
{`-- Numeric IDs (no quotes)
WHERE id IN (1, 2, 3)

-- String IDs (with quotes)
WHERE code IN ('A', 'B', 'C')

-- Mixed types (convert to string)
WHERE id IN ('1', '2', '3')`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">4. Validate Input</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Always validate and sanitize input before using in queries:
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg">
                  <ul className="list-disc list-inside space-y-1 text-yellow-800 text-sm">
                    <li>Check for empty arrays/lists</li>
                    <li>Validate data types</li>
                    <li>Remove duplicates</li>
                    <li>Limit maximum number of items</li>
                    <li>Escape special characters</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Common Pitfalls */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-blue-600" />
              5. Common Pitfalls to Avoid
            </h2>

            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                <h3 className="font-semibold text-red-900 mb-2">1. Missing Quotes for String Values</h3>
                <pre className="bg-white p-3 rounded border border-red-200 text-sm overflow-x-auto">
{`-- ❌ Wrong
WHERE id IN (ID-123, ID-456)

-- ✅ Correct
WHERE id IN ('ID-123', 'ID-456')`}
                </pre>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                <h3 className="font-semibold text-red-900 mb-2">2. Trailing Commas</h3>
                <pre className="bg-white p-3 rounded border border-red-200 text-sm overflow-x-auto">
{`-- ❌ Wrong
WHERE id IN (1, 2, 3,)

-- ✅ Correct
WHERE id IN (1, 2, 3)`}
                </pre>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                <h3 className="font-semibold text-red-900 mb-2">3. SQL Injection Vulnerabilities</h3>
                <p className="text-red-800 text-sm mb-2">Never concatenate user input directly into SQL queries.</p>
                <pre className="bg-white p-3 rounded border border-red-200 text-sm overflow-x-auto">
{`-- ❌ Dangerous
$sql = "SELECT * FROM users WHERE id IN ($userInput)";

-- ✅ Safe
$stmt = $pdo->prepare("SELECT * FROM users WHERE id IN (?, ?, ?)");
$stmt->execute($ids);`}
                </pre>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
                <h3 className="font-semibold text-red-900 mb-2">4. Empty Lists</h3>
                <pre className="bg-white p-3 rounded border border-red-200 text-sm overflow-x-auto">
{`-- ❌ Will cause error
WHERE id IN ()

-- ✅ Handle empty case
if (empty($ids)) {
    // Return empty result or handle differently
} else {
    $sql = "WHERE id IN (" . implode(',', $ids) . ")";
}`}
                </pre>
              </div>
            </div>
          </section>

          {/* Section 6: Using Our SQL Formatter Tool */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <FileCode className="w-8 h-8 text-blue-600" />
              6. Using Our Free SQL Formatter Tool
            </h2>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Quick and Easy Formatting</h3>
              <p className="text-blue-100 mb-6">
                Our SQL Formatter tool automatically converts your list of IDs into a properly formatted comma-separated 
                list ready for MySQL IN clauses. Simply paste your IDs (one per line or comma-separated), and get 
                instant formatted output.
              </p>
              <div className="bg-white/10 rounded-lg p-6 mb-6">
                <p className="font-semibold mb-3">Features:</p>
                <ul className="list-disc list-inside space-y-2 text-blue-100">
                  <li>Automatic comma separation</li>
                  <li>Proper quoting for string values</li>
                  <li>Handles multiple input formats</li>
                  <li>Copy to clipboard with one click</li>
                  <li>100% free, no sign-up required</li>
                </ul>
              </div>
              <Link
                href="/?tab=sql"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                <Zap className="w-5 h-5" />
                Try SQL Formatter Tool
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </section>

          {/* Section 7: Advanced Techniques */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Code className="w-8 h-8 text-blue-600" />
              7. Advanced Techniques
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Using FIND_IN_SET</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For comma-separated values stored in a single column:
                </p>
                <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                  <pre className="bg-white p-4 rounded border border-gray-200 text-sm overflow-x-auto">
{`-- Find records where column contains value
SELECT * FROM users 
WHERE FIND_IN_SET('5', user_ids) > 0;

-- Note: FIND_IN_SET is less efficient than IN clause`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Using Temporary Tables</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For very large lists, use temporary tables:
                </p>
                <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                  <pre className="bg-white p-4 rounded border border-blue-200 text-sm overflow-x-auto">
{`-- Create temporary table
CREATE TEMPORARY TABLE temp_ids (id INT);
INSERT INTO temp_ids VALUES (1), (2), (3), (4), (5);

-- Use in query
SELECT u.* FROM users u
INNER JOIN temp_ids t ON u.id = t.id;`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Converting JSON Arrays</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  MySQL 5.7+ supports JSON functions:
                </p>
                <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-r-lg">
                  <pre className="bg-white p-4 rounded border border-green-200 text-sm overflow-x-auto">
{`-- Extract values from JSON array
SELECT * FROM users 
WHERE id IN (
    SELECT JSON_UNQUOTE(JSON_EXTRACT(value, '$'))
    FROM JSON_TABLE('[1,2,3,4,5]', '$[*]' 
        COLUMNS (value VARCHAR(50) PATH '$')
    ) AS jt
);`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Q: How do I convert multiple IDs into a comma-separated list for MySQL?</h3>
                <p className="text-gray-700 text-sm">
                  A: Use our SQL Formatter tool or programmatically join your array/list with commas. For string IDs, ensure proper quoting.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Q: What's the maximum number of values in a MySQL IN clause?</h3>
                <p className="text-gray-700 text-sm">
                  A: MySQL doesn't have a hard limit, but performance degrades with very large lists (1000+). Consider using temporary tables or splitting queries.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Q: How do I prevent SQL injection when using IN clause?</h3>
                <p className="text-gray-700 text-sm">
                  A: Always use prepared statements with placeholders. Never concatenate user input directly into SQL queries.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Q: Can I use variables in MySQL IN clause?</h3>
                <p className="text-gray-700 text-sm">
                  A: Yes, but you need to use prepared statements or stored procedures. Direct variable substitution in IN clause requires special handling.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Format Your SQL?</h2>
            <p className="text-blue-100 mb-6">
              Use our free SQL Formatter tool to instantly convert your IDs into properly formatted MySQL IN clauses. 
              No sign-up required, works entirely in your browser.
            </p>
            <Link
              href="/?tab=sql"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              <Zap className="w-5 h-5" />
              Try SQL Formatter Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </main>

      {/* Footer Navigation */}
      <footer className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Developer's Study Materials
          </Link>
          <Link
            href="/?tab=sql"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Try SQL Formatter
            <Zap className="w-4 h-4" />
          </Link>
        </div>
      </footer>
    </div>
  );
}

