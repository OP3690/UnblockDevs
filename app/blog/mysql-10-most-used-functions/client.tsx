'use client';

import Link from 'next/link';
import { ArrowLeft, Database, ExternalLink, Code, CheckCircle, Copy } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function Mysql10MostUsedFunctionsClient() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast.success('Code copied!');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const functions = [
    {
      id: 'count',
      name: 'COUNT()',
      category: 'Aggregate',
      description: 'Counts the number of rows in a result set or non-NULL values in a column',
      syntax: 'COUNT(expression)',
      examples: [
        {
          title: 'Count all rows',
          code: 'SELECT COUNT(*) FROM users;',
          explanation: 'Returns total number of rows in users table'
        },
        {
          title: 'Count non-NULL values',
          code: 'SELECT COUNT(email) FROM users;',
          explanation: 'Counts only rows where email is not NULL'
        },
        {
          title: 'Count with condition',
          code: 'SELECT COUNT(*) FROM orders WHERE status = \'completed\';',
          explanation: 'Counts orders with completed status'
        },
        {
          title: 'Count distinct values',
          code: 'SELECT COUNT(DISTINCT user_id) FROM orders;',
          explanation: 'Counts unique user IDs in orders table'
        }
      ],
      useCases: ['Counting records', 'Data validation', 'Statistics', 'Reporting'],
      tips: 'Use COUNT(*) for total rows, COUNT(column) for non-NULL values, COUNT(DISTINCT column) for unique values'
    },
    {
      id: 'sum',
      name: 'SUM()',
      category: 'Aggregate',
      description: 'Calculates the sum of numeric values in a column',
      syntax: 'SUM(column)',
      examples: [
        {
          title: 'Sum all values',
          code: 'SELECT SUM(amount) FROM transactions;',
          explanation: 'Returns total sum of all transaction amounts'
        },
        {
          title: 'Sum with condition',
          code: 'SELECT SUM(price * quantity) AS total FROM order_items WHERE order_id = 123;',
          explanation: 'Calculates total value for specific order'
        },
        {
          title: 'Sum with GROUP BY',
          code: 'SELECT user_id, SUM(amount) AS total_spent FROM orders GROUP BY user_id;',
          explanation: 'Calculates total spent per user'
        }
      ],
      useCases: ['Financial calculations', 'Revenue totals', 'Inventory sums', 'Performance metrics'],
      tips: 'SUM() ignores NULL values. Use COALESCE() if you want to treat NULL as 0'
    },
    {
      id: 'avg',
      name: 'AVG()',
      category: 'Aggregate',
      description: 'Calculates the average (mean) of numeric values in a column',
      syntax: 'AVG(column)',
      examples: [
        {
          title: 'Average value',
          code: 'SELECT AVG(price) FROM products;',
          explanation: 'Returns average price of all products'
        },
        {
          title: 'Average with condition',
          code: 'SELECT AVG(rating) FROM reviews WHERE product_id = 456;',
          explanation: 'Calculates average rating for specific product'
        },
        {
          title: 'Average per group',
          code: 'SELECT category, AVG(price) AS avg_price FROM products GROUP BY category;',
          explanation: 'Shows average price per product category'
        }
      ],
      useCases: ['Performance metrics', 'Ratings and reviews', 'Statistical analysis', 'Quality metrics'],
      tips: 'AVG() ignores NULL values. For weighted averages, use SUM() / COUNT()'
    },
    {
      id: 'max',
      name: 'MAX()',
      category: 'Aggregate',
      description: 'Returns the maximum value from a column',
      syntax: 'MAX(column)',
      examples: [
        {
          title: 'Maximum value',
          code: 'SELECT MAX(price) FROM products;',
          explanation: 'Finds the highest price in products table'
        },
        {
          title: 'Maximum date',
          code: 'SELECT MAX(created_at) FROM orders;',
          explanation: 'Finds the most recent order date'
        },
        {
          title: 'Maximum per group',
          code: 'SELECT category, MAX(price) FROM products GROUP BY category;',
          explanation: 'Shows maximum price for each category'
        }
      ],
      useCases: ['Finding highest values', 'Latest dates', 'Peak performance', 'Top records'],
      tips: 'Works with numbers, dates, and strings. For dates, returns most recent date'
    },
    {
      id: 'min',
      name: 'MIN()',
      category: 'Aggregate',
      description: 'Returns the minimum value from a column',
      syntax: 'MIN(column)',
      examples: [
        {
          title: 'Minimum value',
          code: 'SELECT MIN(price) FROM products;',
          explanation: 'Finds the lowest price in products table'
        },
        {
          title: 'Minimum date',
          code: 'SELECT MIN(created_at) FROM users;',
          explanation: 'Finds the oldest user registration date'
        },
        {
          title: 'Minimum per group',
          code: 'SELECT department, MIN(salary) FROM employees GROUP BY department;',
          explanation: 'Shows minimum salary for each department'
        }
      ],
      useCases: ['Finding lowest values', 'Oldest dates', 'Baseline metrics', 'Minimum requirements'],
      tips: 'Works with numbers, dates, and strings. For dates, returns earliest date'
    },
    {
      id: 'concat',
      name: 'CONCAT()',
      category: 'String',
      description: 'Concatenates two or more strings together',
      syntax: 'CONCAT(str1, str2, ...)',
      examples: [
        {
          title: 'Basic concatenation',
          code: 'SELECT CONCAT(first_name, \' \', last_name) AS full_name FROM users;',
          explanation: 'Combines first and last name with space'
        },
        {
          title: 'With separator',
          code: 'SELECT CONCAT_WS(\' - \', city, state, country) AS location FROM addresses;',
          explanation: 'Uses CONCAT_WS for separator between values'
        },
        {
          title: 'With numbers',
          code: 'SELECT CONCAT(\'Order #\', order_id, \' - $\', total) AS order_info FROM orders;',
          explanation: 'Combines strings and numbers (auto-converted)'
        }
      ],
      useCases: ['Full names', 'Addresses', 'Display formatting', 'Dynamic strings'],
      tips: 'Use CONCAT_WS() when you need a separator. CONCAT() returns NULL if any argument is NULL'
    },
    {
      id: 'substring',
      name: 'SUBSTRING()',
      category: 'String',
      description: 'Extracts a substring from a string',
      syntax: 'SUBSTRING(str, pos, len) or SUBSTRING(str FROM pos FOR len)',
      examples: [
        {
          title: 'Extract substring',
          code: 'SELECT SUBSTRING(email, 1, 5) AS prefix FROM users;',
          explanation: 'Extracts first 5 characters from email'
        },
        {
          title: 'Extract domain',
          code: 'SELECT SUBSTRING(email, POSITION(\'@\' IN email) + 1) AS domain FROM users;',
          explanation: 'Extracts domain part from email address'
        },
        {
          title: 'Extract year from date string',
          code: 'SELECT SUBSTRING(\'2024-01-15\', 1, 4) AS year;',
          explanation: 'Extracts year from date string'
        }
      ],
      useCases: ['Text extraction', 'Data parsing', 'String manipulation', 'Formatting'],
      tips: 'Position starts at 1. Use SUBSTRING_INDEX() for delimiter-based extraction'
    },
    {
      id: 'date_format',
      name: 'DATE_FORMAT()',
      category: 'Date/Time',
      description: 'Formats a date value according to a specified format',
      syntax: 'DATE_FORMAT(date, format)',
      examples: [
        {
          title: 'Format date',
          code: 'SELECT DATE_FORMAT(created_at, \'%Y-%m-%d\') AS date FROM orders;',
          explanation: 'Formats date as YYYY-MM-DD'
        },
        {
          title: 'Readable format',
          code: 'SELECT DATE_FORMAT(created_at, \'%M %d, %Y\') AS formatted_date FROM orders;',
          explanation: 'Formats as "January 15, 2024"'
        },
        {
          title: 'With time',
          code: 'SELECT DATE_FORMAT(created_at, \'%Y-%m-%d %H:%i:%s\') AS datetime FROM orders;',
          explanation: 'Formats date and time together'
        }
      ],
      useCases: ['Report formatting', 'Display dates', 'Date parsing', 'Localization'],
      tips: 'Common format codes: %Y (year), %m (month), %d (day), %H (hour), %i (minute), %s (second)'
    },
    {
      id: 'if',
      name: 'IF()',
      category: 'Conditional',
      description: 'Returns one value if condition is true, another if false',
      syntax: 'IF(condition, value_if_true, value_if_false)',
      examples: [
        {
          title: 'Simple condition',
          code: 'SELECT IF(price > 100, \'Expensive\', \'Affordable\') AS price_category FROM products;',
          explanation: 'Categorizes products based on price'
        },
        {
          title: 'Null handling',
          code: 'SELECT IF(email IS NULL, \'No email\', email) AS user_email FROM users;',
          explanation: 'Replaces NULL email with default text'
        },
        {
          title: 'Nested IF',
          code: 'SELECT IF(score >= 90, \'A\', IF(score >= 80, \'B\', \'C\')) AS grade FROM scores;',
          explanation: 'Nested IF for multiple conditions'
        }
      ],
      useCases: ['Conditional logic', 'Default values', 'Categorization', 'Data transformation'],
      tips: 'For multiple conditions, use CASE WHEN instead of nested IF() for better readability'
    },
    {
      id: 'case',
      name: 'CASE',
      category: 'Conditional',
      description: 'Performs conditional logic with multiple conditions',
      syntax: 'CASE WHEN condition1 THEN result1 WHEN condition2 THEN result2 ELSE default END',
      examples: [
        {
          title: 'Simple CASE',
          code: 'SELECT CASE status WHEN \'active\' THEN 1 WHEN \'inactive\' THEN 0 ELSE -1 END AS status_code FROM users;',
          explanation: 'Maps status values to codes'
        },
        {
          title: 'Searched CASE',
          code: `SELECT CASE 
  WHEN age < 18 THEN 'Minor'
  WHEN age < 65 THEN 'Adult'
  ELSE 'Senior'
END AS age_group FROM users;`,
          explanation: 'Categorizes users by age groups'
        },
        {
          title: 'CASE in calculations',
          code: `SELECT 
  price * CASE 
    WHEN quantity > 10 THEN 0.9
    WHEN quantity > 5 THEN 0.95
    ELSE 1
  END AS discounted_price 
FROM order_items;`,
          explanation: 'Applies discount based on quantity'
        }
      ],
      useCases: ['Complex conditions', 'Data categorization', 'Conditional calculations', 'Business logic'],
      tips: 'CASE is more readable than nested IF(). Always include ELSE clause for safety'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Database className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">MySQL 10 Most Used Functions</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide with Examples & Best Practices</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="MySQL 10 Most Used Functions"
        description="Complete Guide with Examples & Best Practices"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What are the most used MySQL functions?',
              answer: 'The 10 most used MySQL functions are: COUNT() for counting rows, SUM() for summing values, AVG() for averages, MAX() and MIN() for finding extremes, CONCAT() for string concatenation, SUBSTRING() for text extraction, DATE_FORMAT() for date formatting, IF() for simple conditionals, and CASE for complex conditionals. These functions cover most common database operations.',
            },
            {
              question: 'How do I use COUNT() function in MySQL?',
              answer: 'Use COUNT(*) to count all rows, COUNT(column) to count non-NULL values, or COUNT(DISTINCT column) to count unique values. Example: SELECT COUNT(*) FROM users; counts all users, SELECT COUNT(DISTINCT user_id) FROM orders; counts unique users who made orders.',
            },
            {
              question: 'What is the difference between IF() and CASE in MySQL?',
              answer: 'IF() is for simple true/false conditions: IF(condition, value_if_true, value_if_false). CASE is for multiple conditions: CASE WHEN condition1 THEN result1 WHEN condition2 THEN result2 ELSE default END. Use IF() for simple conditions, CASE for complex multi-condition logic.',
            },
            {
              question: 'How do I format dates in MySQL?',
              answer: 'Use DATE_FORMAT(date, format) function. Common formats: \'%Y-%m-%d\' for YYYY-MM-DD, \'%M %d, %Y\' for "January 15, 2024", \'%H:%i:%s\' for time. Example: SELECT DATE_FORMAT(created_at, \'%Y-%m-%d\') FROM orders;',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>MySQL functions</strong> are essential building blocks for database queries. Understanding the 
              <strong> most used functions</strong> and how to apply them effectively can dramatically improve your 
              database operations. This guide covers the <strong>10 most used MySQL functions</strong> with detailed 
              explanations, real-world examples, and best practices.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're calculating aggregates, manipulating strings, formatting dates, or implementing conditional 
              logic, these functions will handle most of your MySQL query needs.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10 Most Used MySQL Functions</h2>
            <div className="space-y-8">
              {functions.map((func) => (
                <div key={func.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{func.name}</h3>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                          {func.category}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{func.description}</p>
                      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded-r-lg mb-3">
                        <p className="text-sm text-gray-700">
                          <strong>Syntax:</strong> <code className="bg-white px-2 py-1 rounded">{func.syntax}</code>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Examples:</h4>
                    <div className="space-y-3">
                      {func.examples.map((example, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-start justify-between mb-2">
                            <h5 className="font-semibold text-gray-800 text-sm">{example.title}</h5>
                            <button
                              onClick={() => copyToClipboard(example.code, `${func.id}-${idx}`)}
                              className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Copy code"
                            >
                              {copiedCode === `${func.id}-${idx}` ? (
                                <CheckCircle className="w-4 h-4 text-blue-600" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                          <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto mb-2">
                            <code>{example.code}</code>
                          </pre>
                          <p className="text-sm text-gray-600">{example.explanation}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">Use Cases:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {func.useCases.map((useCase, idx) => (
                          <li key={idx}>{useCase}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-green-50 p-3 rounded border border-green-200">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm">💡 Pro Tip:</h4>
                      <p className="text-sm text-gray-700">{func.tips}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Function Categories</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Aggregate Functions</h3>
                <p className="text-sm text-gray-700 mb-2">Operate on multiple rows and return a single value:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>COUNT() - Count rows or values</li>
                  <li>SUM() - Sum numeric values</li>
                  <li>AVG() - Calculate average</li>
                  <li>MAX() - Find maximum value</li>
                  <li>MIN() - Find minimum value</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">String Functions</h3>
                <p className="text-sm text-gray-700 mb-2">Manipulate and format text data:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>CONCAT() - Join strings together</li>
                  <li>SUBSTRING() - Extract parts of strings</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">Date/Time Functions</h3>
                <p className="text-sm text-gray-700 mb-2">Format and manipulate dates:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>DATE_FORMAT() - Format dates as strings</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2">Conditional Functions</h3>
                <p className="text-sm text-gray-700 mb-2">Implement conditional logic:</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>IF() - Simple true/false conditions</li>
                  <li>CASE - Complex multi-condition logic</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">1. Use Appropriate Aggregate Functions</h3>
                <p className="text-sm text-gray-700">
                  Choose the right aggregate function for your use case. COUNT(*) for row counts, SUM() for totals, 
                  AVG() for averages. Always consider NULL values in your calculations.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">2. Handle NULL Values Properly</h3>
                <p className="text-sm text-gray-700">
                  Most aggregate functions ignore NULL values, but string functions may return NULL if any argument 
                  is NULL. Use COALESCE() or IFNULL() to handle NULLs explicitly.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">3. Use CASE for Complex Logic</h3>
                <p className="text-sm text-gray-700">
                  For multiple conditions, prefer CASE over nested IF() statements. CASE is more readable and maintainable 
                  for complex conditional logic.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">4. Optimize String Operations</h3>
                <p className="text-sm text-gray-700">
                  String functions like CONCAT() and SUBSTRING() can be expensive on large datasets. Consider indexing 
                  computed columns or using application-level string manipulation when possible.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Database className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Format Your MySQL Queries</h2>
                <p className="text-blue-100">
                  Use our SQL Formatter tool to format, validate, and beautify your MySQL queries for better readability 
                  and debugging.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=sql"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
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

