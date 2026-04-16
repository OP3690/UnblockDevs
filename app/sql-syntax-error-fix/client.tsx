'use client';

import Link from 'next/link';
import { ArrowLeft, Database, ExternalLink } from 'lucide-react';

function SqlBlock({ children }: { children: string }) {
  return (
    <pre className="bg-gray-900 text-yellow-300 p-4 rounded-lg text-sm overflow-x-auto font-mono mt-2">{children}</pre>
  );
}

export default function SqlSyntaxErrorFixClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Database className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">SQL Syntax Error — 10 Most Common Mistakes and Fixes</h1>
              <p className="text-sm text-gray-500 mt-1">MySQL, PostgreSQL, and SQLite syntax errors explained and fixed</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-12">

          {/* Intro */}
          <section>
            <p className="text-lg text-gray-700 leading-relaxed">
              SQL syntax errors stop your query before it runs. The database engine tells you <em>near what</em> the error occurred,
              but figuring out <em>why</em> can be tricky. This guide covers the 10 most common SQL syntax mistakes with a broken
              example and a working fix for each.
            </p>
          </section>

          {/* Error 1 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error 1: Missing Single Quotes Around Strings</h2>
            <p className="text-gray-700 mb-4">
              String values in SQL must be wrapped in single quotes. Without them, the parser treats the value as a column or
              table name and raises a syntax error.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
              <p className="text-sm font-semibold text-red-800 mb-1">Broken:</p>
              <SqlBlock>{`SELECT * FROM users WHERE name = John;
-- ERROR: column "john" does not exist`}</SqlBlock>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-1">Fixed:</p>
              <SqlBlock>{`SELECT * FROM users WHERE name = 'John';`}</SqlBlock>
            </div>
          </section>

          {/* Error 2 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error 2: Using Reserved Words as Column/Table Names</h2>
            <p className="text-gray-700 mb-4">
              Words like <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">order</code>,
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">group</code>,
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">select</code>,
              and <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">desc</code> are
              SQL keywords. Using them as column names causes syntax errors.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
              <p className="text-sm font-semibold text-red-800 mb-1">Broken:</p>
              <SqlBlock>{`SELECT id, order, status FROM shipments;
-- ERROR: syntax error near 'order'`}</SqlBlock>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-1">Fixed — MySQL (backticks), PostgreSQL/SQLite (double quotes):</p>
              <SqlBlock>{`-- MySQL
SELECT id, \`order\`, status FROM shipments;

-- PostgreSQL / SQLite
SELECT id, "order", status FROM shipments;`}</SqlBlock>
            </div>
          </section>

          {/* Error 3 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error 3: Trailing Comma in SELECT</h2>
            <p className="text-gray-700 mb-4">
              An extra comma before <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">FROM</code> is
              one of the most common typos. The parser sees a comma and expects another column name, but finds a keyword instead.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
              <p className="text-sm font-semibold text-red-800 mb-1">Broken:</p>
              <SqlBlock>{`SELECT id, name, email, FROM users;
-- ERROR: syntax error near 'FROM'`}</SqlBlock>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-1">Fixed:</p>
              <SqlBlock>{`SELECT id, name, email FROM users;`}</SqlBlock>
            </div>
          </section>

          {/* Error 4 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error 4: Missing Comma Between Columns</h2>
            <p className="text-gray-700 mb-4">
              Forgetting a comma between column names in SELECT is often misread as an alias assignment, leading to confusing errors.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
              <p className="text-sm font-semibold text-red-800 mb-1">Broken:</p>
              <SqlBlock>{`SELECT id name email FROM users;
-- MySQL: treats 'name' as alias for id, then fails on 'email'`}</SqlBlock>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-1">Fixed:</p>
              <SqlBlock>{`SELECT id, name, email FROM users;`}</SqlBlock>
            </div>
          </section>

          {/* Error 5 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error 5: WHERE vs HAVING Confusion</h2>
            <p className="text-gray-700 mb-4">
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">WHERE</code> filters rows before grouping.
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">HAVING</code> filters groups after
              aggregation. Aggregate functions like <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">COUNT()</code>,
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">SUM()</code> must use HAVING.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
              <p className="text-sm font-semibold text-red-800 mb-1">Broken:</p>
              <SqlBlock>{`SELECT department, COUNT(*) as total
FROM employees
GROUP BY department
WHERE COUNT(*) > 5;
-- ERROR: Invalid use of group function`}</SqlBlock>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-1">Fixed:</p>
              <SqlBlock>{`SELECT department, COUNT(*) AS total
FROM employees
GROUP BY department
HAVING COUNT(*) > 5;`}</SqlBlock>
            </div>
          </section>

          {/* Error 6 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error 6: JOIN ON Clause Issues</h2>
            <p className="text-gray-700 mb-4">
              A JOIN missing its ON condition, using the wrong alias, or referencing a non-existent column will fail with a
              syntax or reference error.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
              <p className="text-sm font-semibold text-red-800 mb-1">Broken:</p>
              <SqlBlock>{`SELECT u.name, o.total
FROM users u
JOIN orders o ON users.id = o.user_id;
-- ERROR: unknown table 'users' in ON clause (alias 'u' not used)`}</SqlBlock>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-1">Fixed — use the alias consistently:</p>
              <SqlBlock>{`SELECT u.name, o.total
FROM users u
JOIN orders o ON u.id = o.user_id;`}</SqlBlock>
            </div>
          </section>

          {/* Error 7 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error 7: Subquery Not Aliased</h2>
            <p className="text-gray-700 mb-4">
              Most SQL databases require every derived table (subquery in FROM) to have an alias. Omitting it causes a syntax error.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
              <p className="text-sm font-semibold text-red-800 mb-1">Broken:</p>
              <SqlBlock>{`SELECT * FROM (
  SELECT id, name FROM users WHERE active = 1
);
-- ERROR: Every derived table must have its own alias`}</SqlBlock>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-1">Fixed:</p>
              <SqlBlock>{`SELECT * FROM (
  SELECT id, name FROM users WHERE active = 1
) AS active_users;`}</SqlBlock>
            </div>
          </section>

          {/* Error 8 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error 8: Wrong ORDER BY with GROUP BY</h2>
            <p className="text-gray-700 mb-4">
              In strict SQL mode, you can only ORDER BY columns that are in GROUP BY or are aggregate functions. Non-aggregated
              columns cause an error.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
              <p className="text-sm font-semibold text-red-800 mb-1">Broken (PostgreSQL / strict MySQL):</p>
              <SqlBlock>{`SELECT department, COUNT(*) AS total
FROM employees
GROUP BY department
ORDER BY name;  -- 'name' is not in GROUP BY or aggregate
-- ERROR: column "name" must appear in GROUP BY or be used in aggregate`}</SqlBlock>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-1">Fixed:</p>
              <SqlBlock>{`SELECT department, COUNT(*) AS total
FROM employees
GROUP BY department
ORDER BY total DESC;  -- aggregate function: OK
-- or
ORDER BY department;  -- in GROUP BY: OK`}</SqlBlock>
            </div>
          </section>

          {/* Error 9 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error 9: NULL Comparison — = NULL vs IS NULL</h2>
            <p className="text-gray-700 mb-4">
              NULL is not equal to anything — not even itself. <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">= NULL</code> always
              returns unknown (no rows matched), not a syntax error, but logically wrong. Use
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">IS NULL</code> or
              <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">IS NOT NULL</code>.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
              <p className="text-sm font-semibold text-red-800 mb-1">Broken — returns 0 rows, silently wrong:</p>
              <SqlBlock>{`SELECT * FROM users WHERE deleted_at = NULL;
-- Returns 0 rows — = NULL is always UNKNOWN`}</SqlBlock>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-1">Fixed:</p>
              <SqlBlock>{`SELECT * FROM users WHERE deleted_at IS NULL;
SELECT * FROM users WHERE deleted_at IS NOT NULL;`}</SqlBlock>
            </div>
          </section>

          {/* Error 10 */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error 10: Single Quote Inside String — Not Escaped</h2>
            <p className="text-gray-700 mb-4">
              An apostrophe inside a string value ends the string early, causing a syntax error. Escape it by doubling the
              single quote or use a parameterized query.
            </p>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-3">
              <p className="text-sm font-semibold text-red-800 mb-1">Broken:</p>
              <SqlBlock>{`SELECT * FROM users WHERE name = 'O'Brien';
-- ERROR: syntax error near 'Brien'`}</SqlBlock>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-sm font-semibold text-green-800 mb-1">Fixed — escape with double single-quote or use parameters:</p>
              <SqlBlock>{`-- Escape the apostrophe
SELECT * FROM users WHERE name = 'O''Brien';

-- Best practice: use parameterized queries (Python example)
cursor.execute("SELECT * FROM users WHERE name = %s", ("O'Brien",))`}</SqlBlock>
            </div>
          </section>

          {/* Checklist */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">SQL Syntax Checklist</h2>
            <ul className="space-y-3">
              {[
                'All string values are wrapped in single quotes',
                'No trailing comma before FROM, WHERE, or other keywords',
                'All columns in SELECT are separated by commas',
                'Reserved words used as identifiers are escaped (backticks or double quotes)',
                'Aggregate functions (COUNT, SUM) are in HAVING, not WHERE',
                'Every JOIN has an ON clause using the correct alias',
                'Every subquery in FROM has an alias (AS sub_name)',
                'NULL checks use IS NULL / IS NOT NULL, not = NULL',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0">{i + 1}</span>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <section>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white flex items-center gap-4">
              <ExternalLink className="w-8 h-8 shrink-0" />
              <div>
                <p className="text-lg font-bold mb-1">Format your SQL query for readability</p>
                <p className="text-blue-100 text-sm mb-3">A properly formatted query makes syntax errors immediately visible.</p>
                <Link
                  href="/sql-formatter"
                  className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                >
                  Format your SQL query for readability →
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">What does &apos;syntax error near&apos; mean in SQL?</h3>
                <p className="text-gray-700">
                  It means the parser encountered an unexpected token at that position. The error shows what was found, not
                  necessarily what is wrong — look at what comes immediately before it for the actual mistake (missing comma,
                  missing quote, reserved word).
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I fix a reserved word conflict in SQL?</h3>
                <p className="text-gray-700">
                  Wrap the reserved word in backticks for MySQL
                  (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">`order`</code>) or
                  double quotes for PostgreSQL/SQLite
                  (<code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">&quot;order&quot;</code>).
                  Renaming the column to avoid the conflict is the best long-term solution.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Why does my SQL string comparison fail?</h3>
                <p className="text-gray-700">
                  String values must use single quotes: <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800">WHERE name = &apos;Alice&apos;</code>.
                  Double quotes are for identifiers (column/table names) in most SQL dialects.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">How do I debug a SQL syntax error?</h3>
                <p className="text-gray-700">
                  Format the query, read the error token, then work backward. Reduce the query to its simplest form and add
                  clauses back one at a time until the error reappears — that clause contains the problem.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">What&apos;s the difference between WHERE and HAVING?</h3>
                <p className="text-gray-700">
                  WHERE filters individual rows before grouping and cannot reference aggregate functions.
                  HAVING filters groups after GROUP BY and can use aggregates. If you see
                  <code className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono text-gray-800 mx-1">COUNT(*) &gt; 5</code> in
                  your filter, it belongs in HAVING.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Developer Tools</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { href: '/sql-formatter', label: 'SQL Formatter', desc: 'Format SQL queries for easier reading and debugging' },
                { href: '/sql-in-clause-generator', label: 'SQL IN Clause Generator', desc: 'Generate SQL IN clauses from lists instantly' },
                { href: '/json-formatter', label: 'JSON Formatter', desc: 'Format and validate JSON API payloads' },
                { href: '/json-validator', label: 'JSON Validator', desc: 'Validate JSON structure before use' },
              ].map(({ href, label, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-start gap-3 p-4 rounded-lg border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors group"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-500 mt-1 shrink-0 group-hover:text-emerald-600" />
                  <div>
                    <p className="font-semibold text-gray-800 group-hover:text-emerald-700">{label}</p>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
