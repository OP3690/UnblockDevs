'use client';

import Link from 'next/link';
import { ArrowLeft, Database, ExternalLink, Code, CheckCircle, Copy } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';

export default function Mysql25MostUsedQueriesClient() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast.success('Query copied!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const queries = [
    {
      id: 'select-all',
      title: 'SELECT All Records',
      category: 'SELECT',
      description: 'Retrieve all columns and rows from a table',
      query: 'SELECT * FROM users;',
      explanation: 'Returns all columns and rows from users table. Use specific columns instead of * for better performance.',
      useCase: 'Viewing all data, initial exploration'
    },
    {
      id: 'select-specific',
      title: 'SELECT Specific Columns',
      category: 'SELECT',
      description: 'Retrieve only specific columns',
      query: 'SELECT id, name, email FROM users;',
      explanation: 'Returns only id, name, and email columns. More efficient than SELECT *.',
      useCase: 'Reducing data transfer, improving performance'
    },
    {
      id: 'select-where',
      title: 'SELECT with WHERE Clause',
      category: 'SELECT',
      description: 'Filter rows based on conditions',
      query: 'SELECT * FROM users WHERE status = \'active\';',
      explanation: 'Returns only users with active status. WHERE clause filters rows before retrieval.',
      useCase: 'Filtering data, conditional retrieval'
    },
    {
      id: 'select-order',
      title: 'SELECT with ORDER BY',
      category: 'SELECT',
      description: 'Sort results in ascending or descending order',
      query: 'SELECT * FROM products ORDER BY price DESC;',
      explanation: 'Returns products sorted by price in descending order (highest first).',
      useCase: 'Sorting results, ranking data'
    },
    {
      id: 'select-limit',
      title: 'SELECT with LIMIT',
      category: 'SELECT',
      description: 'Limit the number of rows returned',
      query: 'SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;',
      explanation: 'Returns only the 10 most recent orders. Useful for pagination and top N queries.',
      useCase: 'Pagination, top N records, performance optimization'
    },
    {
      id: 'select-group',
      title: 'SELECT with GROUP BY',
      category: 'SELECT',
      description: 'Group rows by one or more columns',
      query: 'SELECT category, COUNT(*) AS count FROM products GROUP BY category;',
      explanation: 'Groups products by category and counts items in each group.',
      useCase: 'Aggregations, statistics, reporting'
    },
    {
      id: 'select-having',
      title: 'SELECT with HAVING',
      category: 'SELECT',
      description: 'Filter groups after GROUP BY',
      query: 'SELECT category, COUNT(*) AS count FROM products GROUP BY category HAVING count > 10;',
      explanation: 'Shows only categories with more than 10 products. HAVING filters groups, WHERE filters rows.',
      useCase: 'Filtering aggregated results, conditional grouping'
    },
    {
      id: 'select-distinct',
      title: 'SELECT DISTINCT',
      category: 'SELECT',
      description: 'Return unique values',
      query: 'SELECT DISTINCT country FROM users;',
      explanation: 'Returns unique country values, removing duplicates.',
      useCase: 'Finding unique values, data deduplication'
    },
    {
      id: 'inner-join',
      title: 'INNER JOIN',
      category: 'JOIN',
      description: 'Join tables returning only matching rows',
      query: 'SELECT u.name, o.total FROM users u INNER JOIN orders o ON u.id = o.user_id;',
      explanation: 'Returns users and their orders. Only shows users who have orders.',
      useCase: 'Relating data from multiple tables, combining datasets'
    },
    {
      id: 'left-join',
      title: 'LEFT JOIN',
      category: 'JOIN',
      description: 'Join tables returning all rows from left table',
      query: 'SELECT u.name, o.total FROM users u LEFT JOIN orders o ON u.id = o.user_id;',
      explanation: 'Returns all users, even if they have no orders. Orders will be NULL for users without orders.',
      useCase: 'Including all records from primary table, optional relationships'
    },
    {
      id: 'right-join',
      title: 'RIGHT JOIN',
      category: 'JOIN',
      description: 'Join tables returning all rows from right table',
      query: 'SELECT u.name, o.total FROM users u RIGHT JOIN orders o ON u.id = o.user_id;',
      explanation: 'Returns all orders, even if user doesn\'t exist. User will be NULL for orphaned orders.',
      useCase: 'Including all records from secondary table, finding orphaned records'
    },
    {
      id: 'insert-single',
      title: 'INSERT Single Row',
      category: 'INSERT',
      description: 'Insert one row into a table',
      query: 'INSERT INTO users (name, email, status) VALUES (\'John Doe\', \'john@example.com\', \'active\');',
      explanation: 'Inserts a new user with specified values. Returns the auto-increment ID if id is AUTO_INCREMENT.',
      useCase: 'Adding new records, user registration, data entry'
    },
    {
      id: 'insert-multiple',
      title: 'INSERT Multiple Rows',
      category: 'INSERT',
      description: 'Insert multiple rows in one statement',
      query: 'INSERT INTO products (name, price) VALUES (\'Product A\', 10.99), (\'Product B\', 20.99), (\'Product C\', 30.99);',
      explanation: 'Inserts three products in a single statement. More efficient than multiple INSERT statements.',
      useCase: 'Bulk inserts, data migration, batch operations'
    },
    {
      id: 'update-single',
      title: 'UPDATE Single Column',
      category: 'UPDATE',
      description: 'Update values in existing rows',
      query: 'UPDATE users SET status = \'inactive\' WHERE id = 123;',
      explanation: 'Updates status to inactive for user with id 123. Always use WHERE to avoid updating all rows.',
      useCase: 'Modifying records, status changes, data corrections'
    },
    {
      id: 'update-multiple',
      title: 'UPDATE Multiple Columns',
      category: 'UPDATE',
      description: 'Update multiple columns at once',
      query: 'UPDATE users SET name = \'Jane Doe\', email = \'jane@example.com\' WHERE id = 123;',
      explanation: 'Updates both name and email for the specified user.',
      useCase: 'Updating user profiles, bulk modifications'
    },
    {
      id: 'delete',
      title: 'DELETE',
      category: 'DELETE',
      description: 'Delete rows from a table',
      query: 'DELETE FROM users WHERE status = \'deleted\' AND deleted_at < DATE_SUB(NOW(), INTERVAL 30 DAY);',
      explanation: 'Deletes users marked as deleted more than 30 days ago. Always use WHERE clause!',
      useCase: 'Removing records, data cleanup, soft delete cleanup'
    },
    {
      id: 'count',
      title: 'COUNT Records',
      category: 'Aggregate',
      description: 'Count total number of rows',
      query: 'SELECT COUNT(*) AS total_users FROM users;',
      explanation: 'Returns total number of users. COUNT(*) counts all rows, including NULLs.',
      useCase: 'Statistics, reporting, data validation'
    },
    {
      id: 'sum',
      title: 'SUM Values',
      category: 'Aggregate',
      description: 'Calculate sum of numeric column',
      query: 'SELECT SUM(amount) AS total_revenue FROM orders WHERE status = \'completed\';',
      explanation: 'Calculates total revenue from completed orders. SUM() ignores NULL values.',
      useCase: 'Financial calculations, totals, aggregations'
    },
    {
      id: 'avg',
      title: 'AVG Values',
      category: 'Aggregate',
      description: 'Calculate average of numeric column',
      query: 'SELECT AVG(rating) AS avg_rating FROM reviews WHERE product_id = 456;',
      explanation: 'Calculates average rating for a specific product.',
      useCase: 'Performance metrics, ratings, statistical analysis'
    },
    {
      id: 'max-min',
      title: 'MAX and MIN',
      category: 'Aggregate',
      description: 'Find maximum and minimum values',
      query: 'SELECT MAX(price) AS max_price, MIN(price) AS min_price FROM products;',
      explanation: 'Finds highest and lowest prices in products table.',
      useCase: 'Finding extremes, range analysis, peak values'
    },
    {
      id: 'like',
      title: 'LIKE Pattern Matching',
      category: 'SELECT',
      description: 'Search for patterns in text',
      query: 'SELECT * FROM users WHERE email LIKE \'%@gmail.com\';',
      explanation: 'Finds all users with Gmail addresses. % matches any characters, _ matches single character.',
      useCase: 'Text search, pattern matching, filtering'
    },
    {
      id: 'in',
      title: 'IN Clause',
      category: 'SELECT',
      description: 'Match values in a list',
      query: 'SELECT * FROM products WHERE category IN (\'Electronics\', \'Books\', \'Clothing\');',
      explanation: 'Returns products in specified categories. More readable than multiple OR conditions.',
      useCase: 'Multiple value matching, filtering by list'
    },
    {
      id: 'between',
      title: 'BETWEEN Range',
      category: 'SELECT',
      description: 'Match values within a range',
      query: 'SELECT * FROM orders WHERE total BETWEEN 100 AND 500;',
      explanation: 'Returns orders with total between 100 and 500 (inclusive).',
      useCase: 'Range queries, date ranges, numeric ranges'
    },
    {
      id: 'subquery',
      title: 'Subquery',
      category: 'SELECT',
      description: 'Use query result in another query',
      query: 'SELECT * FROM products WHERE price > (SELECT AVG(price) FROM products);',
      explanation: 'Returns products with price above average. Subquery calculates average first.',
      useCase: 'Complex filtering, dynamic conditions, correlated queries'
    },
    {
      id: 'union',
      title: 'UNION',
      category: 'SELECT',
      description: 'Combine results from multiple queries',
      query: 'SELECT name FROM users UNION SELECT name FROM customers;',
      explanation: 'Combines names from users and customers tables, removing duplicates. Use UNION ALL to keep duplicates.',
      useCase: 'Combining datasets, merging results, data consolidation'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Database className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MySQL 25 Most Used Queries</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide with Examples & Best Practices</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'What are the most used MySQL queries?',
              answer: 'The 25 most used MySQL queries include: SELECT (with WHERE, ORDER BY, LIMIT, GROUP BY), JOIN (INNER, LEFT, RIGHT), INSERT (single and multiple rows), UPDATE, DELETE, aggregate functions (COUNT, SUM, AVG, MAX, MIN), pattern matching (LIKE), IN clause, BETWEEN, subqueries, and UNION. These cover 90% of common database operations.',
            },
            {
              question: 'How do I write a SELECT query in MySQL?',
              answer: 'Basic syntax: SELECT column1, column2 FROM table_name WHERE condition ORDER BY column LIMIT n; Example: SELECT name, email FROM users WHERE status = \'active\' ORDER BY created_at DESC LIMIT 10; Always specify columns instead of * for better performance.',
            },
            {
              question: 'What is the difference between WHERE and HAVING in MySQL?',
              answer: 'WHERE filters rows before grouping, HAVING filters groups after GROUP BY. Use WHERE for row-level conditions, HAVING for aggregate conditions. Example: WHERE price > 100 filters products, HAVING COUNT(*) > 10 filters groups with more than 10 items.',
            },
            {
              question: 'How do I join tables in MySQL?',
              answer: 'Use JOIN clauses: INNER JOIN returns matching rows, LEFT JOIN returns all left table rows, RIGHT JOIN returns all right table rows. Syntax: SELECT * FROM table1 JOIN table2 ON table1.id = table2.foreign_id; Always specify join conditions to avoid cartesian products.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>MySQL queries</strong> are the foundation of database operations. Mastering the 
              <strong> most used queries</strong> enables efficient data retrieval, manipulation, and analysis. 
              This comprehensive guide covers the <strong>25 most used MySQL queries</strong> with detailed 
              explanations, real-world examples, and best practices.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From basic SELECT statements to complex JOINs and subqueries, these queries will handle most of 
              your database needs.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">25 Most Used MySQL Queries</h2>
            <div className="space-y-6">
              {queries.map((query) => (
                <div key={query.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{query.title}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {query.category}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{query.description}</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-4 border border-gray-200 mb-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 text-sm">Query:</h4>
                      <button
                        onClick={() => copyToClipboard(query.query, query.id)}
                        className="p-1 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                        title="Copy query"
                      >
                        {copiedCode === query.id ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
                      <code>{query.query}</code>
                    </pre>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">Explanation:</h4>
                      <p className="text-sm text-gray-700">{query.explanation}</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">Use Case:</h4>
                      <p className="text-sm text-gray-700">{query.useCase}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Query Categories</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">SELECT Queries</h3>
                <p className="text-sm text-gray-700 mb-2">Retrieve data from tables:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>SELECT with WHERE, ORDER BY, LIMIT</li>
                  <li>GROUP BY and HAVING</li>
                  <li>DISTINCT, LIKE, IN, BETWEEN</li>
                  <li>Subqueries and UNION</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">JOIN Queries</h3>
                <p className="text-sm text-gray-700 mb-2">Combine data from multiple tables:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>INNER JOIN - matching rows</li>
                  <li>LEFT JOIN - all left table rows</li>
                  <li>RIGHT JOIN - all right table rows</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">Data Modification</h3>
                <p className="text-sm text-gray-700 mb-2">Insert, update, and delete data:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>INSERT - single and multiple rows</li>
                  <li>UPDATE - modify existing data</li>
                  <li>DELETE - remove records</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2">Aggregate Queries</h3>
                <p className="text-sm text-gray-700 mb-2">Calculate statistics:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>COUNT, SUM, AVG</li>
                  <li>MAX and MIN</li>
                  <li>Used with GROUP BY</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
            <div className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <h3 className="font-semibold text-gray-900 mb-2">⚠️ Always Use WHERE in UPDATE/DELETE</h3>
                <p className="text-sm text-gray-700">
                  Never run UPDATE or DELETE without WHERE clause. Always test with SELECT first: 
                  SELECT * FROM table WHERE condition; then UPDATE/DELETE with same condition.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Use Specific Columns</h3>
                <p className="text-sm text-gray-700">
                  Avoid SELECT * in production. Specify columns you need: SELECT id, name, email FROM users; 
                  This improves performance and reduces data transfer.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Index Frequently Queried Columns</h3>
                <p className="text-sm text-gray-700">
                  Add indexes on columns used in WHERE, JOIN, and ORDER BY clauses. This dramatically improves 
                  query performance on large tables.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Use LIMIT for Large Result Sets</h3>
                <p className="text-sm text-gray-700">
                  Always use LIMIT when retrieving large datasets. For pagination, use LIMIT offset, count 
                  or better yet, cursor-based pagination with WHERE id {'>'} last_id.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Database className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Format Your MySQL Queries</h2>
                <p className="text-green-100">
                  Use our SQL Formatter tool to format, validate, and beautify your MySQL queries for better 
                  readability and debugging.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=sql"
              className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
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

