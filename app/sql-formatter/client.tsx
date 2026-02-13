'use client';

import Link from 'next/link';
import { ArrowLeft, Database, ExternalLink } from 'lucide-react';
import dynamic from 'next/dynamic';

const SqlFormatter = dynamic(() => import('@/components/tools/SqlFormatter'), {
  loading: () => <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>,
});

export default function SqlFormatterClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">SQL Formatter</h1>
          <p className="text-sm text-gray-500 mt-0.5">Format SQL IN clause lists — MySQL, PostgreSQL, Oracle, Trino & more</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Tool Component */}
        <div className="mb-8">
          <SqlFormatter />
        </div>

        {/* SEO Content Section - 1000-1200 words */}
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">What Problem Does SQL Formatter Solve?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              SQL queries are often written quickly or copied from various sources, resulting in poorly formatted, unreadable code. 
              Unformatted SQL is difficult to read, debug, review, and maintain. Complex queries with multiple joins, subqueries, 
              and nested conditions become nearly impossible to understand without proper formatting.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>The core problem:</strong> Without a SQL formatter, developers and database professionals struggle with:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6 ml-4">
              <li>Reading and understanding unformatted SQL queries</li>
              <li>Debugging complex queries with poor indentation</li>
              <li>Reviewing SQL code in pull requests and code reviews</li>
              <li>Maintaining and modifying existing SQL queries</li>
              <li>Sharing SQL queries with team members</li>
              <li>Documenting and explaining SQL logic</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our SQL Formatter solves all these problems by automatically formatting SQL queries with proper indentation, 
              line breaks, and structure. It transforms unreadable SQL into beautifully formatted, human-readable code that's 
              easy to understand, debug, and maintain. This improves code quality, readability, and team collaboration.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Real-World Example</p>
              <p className="text-blue-800 text-sm mb-2">
                <strong>Before:</strong> <code className="bg-white px-2 py-1 rounded">SELECT u.id,u.name,u.email,o.total FROM users u JOIN orders o ON u.id=o.user_id WHERE u.status='active' AND o.created_at&gt;'2024-01-01' ORDER BY o.total DESC</code>
              </p>
              <p className="text-blue-800 text-sm">
                <strong>After:</strong> The same query becomes readable with proper indentation, making it easy to see the SELECT 
                fields, JOIN conditions, WHERE clauses, and ORDER BY.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Is SQL Formatter For?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              SQL Formatter is essential for anyone who works with SQL queries, whether writing, reviewing, or maintaining them:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Database Developers</h3>
                <p className="text-gray-700 mb-3">
                  Database developers write complex SQL queries daily. A SQL formatter helps them write readable, maintainable 
                  queries and improves code quality and team collaboration.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> Query development, stored procedures, database functions, query optimization
                </p>
              </div>

              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Backend Developers</h3>
                <p className="text-gray-700 mb-3">
                  Backend developers write SQL queries for ORMs, raw queries, and database operations. A SQL formatter helps 
                  them format queries for readability, debugging, and code reviews.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> ORM queries, raw SQL, database operations, API development
                </p>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Data Analysts</h3>
                <p className="text-gray-700 mb-3">
                  Data analysts write SQL queries for reporting, analysis, and data extraction. A SQL formatter helps them 
                  create readable queries that are easy to understand and share with stakeholders.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> Data analysis, reporting queries, data extraction, BI queries
                </p>
              </div>

              <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Database Administrators (DBAs)</h3>
                <p className="text-gray-700 mb-3">
                  DBAs review, optimize, and maintain SQL queries. A SQL formatter helps them quickly understand query structure, 
                  identify optimization opportunities, and document database operations.
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Use cases:</strong> Query review, performance optimization, database maintenance, query documentation
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Key Features of Our SQL Formatter</h2>
            <div className="space-y-4">
              <div className="p-5 bg-white border-l-4 border-blue-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Intelligent Formatting</h3>
                <p className="text-gray-700 text-sm">
                  Automatically formats SQL with proper indentation, line breaks, and keyword capitalization. Handles complex 
                  queries with multiple joins, subqueries, and nested conditions.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-green-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Syntax Highlighting</h3>
                <p className="text-gray-700 text-sm">
                  Color-coded SQL makes it easy to distinguish between keywords, identifiers, strings, and operators. Improves 
                  readability and reduces errors.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-purple-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Multiple SQL Dialects</h3>
                <p className="text-gray-700 text-sm">
                  Support for MySQL, PostgreSQL, SQL Server, Oracle, and other SQL dialects. Formats queries according to 
                  dialect-specific syntax and conventions.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-orange-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Customizable Formatting</h3>
                <p className="text-gray-700 text-sm">
                  Customize indentation size, keyword case, and formatting style. Format SQL according to your team's coding 
                  standards and preferences.
                </p>
              </div>
              <div className="p-5 bg-white border-l-4 border-red-500 rounded-r-lg shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Privacy-First</h3>
                <p className="text-gray-700 text-sm">
                  All formatting happens in your browser. No data is sent to servers. Your SQL queries stay private and secure. 
                  Perfect for sensitive database queries or production SQL.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Best Guides and Resources</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Learn more about SQL, database queries, and best practices with these comprehensive guides:
            </p>
            
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  <Link href="/blog/how-to-read-json-file-python-3-ways" className="text-blue-600 hover:text-blue-700 underline">
                    How to Read JSON File in Python (3 Ways)
                  </Link>
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Learn how to work with JSON data in Python, which is often used alongside SQL for data processing and analysis.
                </p>
                <p className="text-xs text-gray-600">Covers: JSON processing, Python, data handling</p>
              </div>

              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  <Link href="/blog/how-to-convert-json-to-csv-python" className="text-green-600 hover:text-green-700 underline">
                    How to Convert JSON to CSV in Python
                  </Link>
                </h3>
                <p className="text-sm text-gray-700 mb-2">
                  Learn how to convert data formats, which is often needed when working with SQL query results and data exports.
                </p>
                <p className="text-xs text-gray-600">Covers: Data conversion, CSV export, data processing</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Tools</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Enhance your database and development workflow with these complementary tools:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link href="/json-beautifier" className="p-4 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">JSON Beautifier</h3>
                <p className="text-sm text-gray-700">Format JSON query results</p>
              </Link>
              <Link href="/json-validator" className="p-4 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">JSON Validator</h3>
                <p className="text-sm text-gray-700">Validate JSON data structures</p>
              </Link>
              <Link href="/data-insights" className="p-4 bg-purple-50 rounded-lg border border-purple-200 hover:bg-purple-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Data Insights</h3>
                <p className="text-sm text-gray-700">Analyze query results and data</p>
              </Link>
              <Link href="/test-data-generator" className="p-4 bg-orange-50 rounded-lg border border-orange-200 hover:bg-orange-100 transition-colors">
                <h3 className="font-semibold text-gray-900 mb-1">Test Data Generator</h3>
                <p className="text-sm text-gray-700">Generate test data for databases</p>
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
