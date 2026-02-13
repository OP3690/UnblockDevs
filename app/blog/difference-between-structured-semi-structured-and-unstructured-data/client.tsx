'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Zap, CheckCircle, AlertCircle, Target, Database, FileText, Code, BarChart3 } from 'lucide-react';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FAQSchema from '@/components/FAQSchema';

export default function BlogPostClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Difference Between Structured, Semi-Structured, and Unstructured Data</h1>
          <p className="text-sm text-gray-500 mt-1">Learn the differences with examples, use cases, and when to use each type</p>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare
        title="Difference Between Structured, Semi-Structured, and Unstructured Data"
        description="Learn the difference between structured, semi-structured, and unstructured data with examples and comparisons."
        variant="floating"
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 md:pt-24">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Data comes in many forms, and understanding the different types is crucial for effective data management, storage, and analysis. 
              The three main categories—structured, semi-structured, and unstructured data—each have unique characteristics, use cases, and 
              processing requirements.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this comprehensive guide, you'll learn the key differences between these data types, see real-world examples, understand 
              when to use each, and discover how to process and store them effectively. We'll use simple explanations and visual comparisons 
              to make everything clear.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Quick Tip</p>
              <p className="text-blue-800">
                Use our free <Link href="/json-validator" className="font-semibold underline">JSON Validator</Link> to validate semi-structured data 
                and our <Link href="/json-formatter" className="font-semibold underline">JSON Formatter</Link> to format JSON structures.
              </p>
            </div>
          </section>

          {/* Definition */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Definition: What Are These Data Types?
            </h2>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <Database className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Structured Data</h3>
                <p className="text-sm text-gray-700 mb-2">Highly organized data with fixed schema and format</p>
                <p className="text-xs text-gray-600">Example: Relational database tables, spreadsheets</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <Code className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Semi-Structured Data</h3>
                <p className="text-sm text-gray-700 mb-2">Partially organized data with flexible schema</p>
                <p className="text-xs text-gray-600">Example: JSON, XML, CSV files</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <FileText className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Unstructured Data</h3>
                <p className="text-sm text-gray-700 mb-2">No predefined structure or format</p>
                <p className="text-xs text-gray-600">Example: Text documents, images, videos</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-5 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Real-World Analogy</h3>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Structured:</strong> Like a form with fixed fields (name, age, address) - everything has a specific place
              </p>
              <p className="text-gray-700 text-sm mb-2">
                <strong>Semi-Structured:</strong> Like a flexible form where some fields are optional or can vary (JSON with optional fields)
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Unstructured:</strong> Like free-form text or a photo - no fixed format, requires interpretation
              </p>
            </div>
          </section>

          {/* What */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are the Key Characteristics?</h2>
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Characteristic</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Structured</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Semi-Structured</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Unstructured</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Schema</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Fixed, predefined</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Flexible, self-describing</td>
                    <td className="px-4 py-3 text-sm text-gray-700">No schema</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Format</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Rows and columns</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Key-value pairs, tags</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Free-form</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Storage</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Relational databases</td>
                    <td className="px-4 py-3 text-sm text-gray-700">NoSQL, files (JSON/XML)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">File systems, object storage</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Querying</td>
                    <td className="px-4 py-3 text-sm text-gray-700">SQL (easy)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Query languages (moderate)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Complex (ML/AI needed)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Size</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Small to medium</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Medium</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Very large</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Examples</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Database tables, Excel</td>
                    <td className="px-4 py-3 text-sm text-gray-700">JSON, XML, CSV</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Text, images, videos</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use Each Data Type?</h2>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Database className="w-6 h-6 text-blue-600" />
                Structured Data
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>Transactional systems</strong> - When you need ACID properties and data integrity</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>Fixed schema requirements</strong> - When data structure is well-defined and stable</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>Complex queries</strong> - When you need SQL joins, aggregations, and complex reporting</p>
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mt-3">
                  <p className="text-sm text-gray-700"><strong>Example use cases:</strong> Customer databases, financial records, inventory management, ERP systems</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Code className="w-6 h-6 text-green-600" />
                Semi-Structured Data
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>Flexible schema</strong> - When data structure varies or evolves over time</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>API responses</strong> - When exchanging data between systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>Configuration files</strong> - When storing settings or metadata</p>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200 mt-3">
                  <p className="text-sm text-gray-700"><strong>Example use cases:</strong> Web APIs (JSON), configuration files, log files, sensor data</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-purple-600" />
                Unstructured Data
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>Rich content</strong> - When data is naturally unstructured (text, media)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>AI/ML applications</strong> - When using machine learning for analysis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700"><strong>Content management</strong> - When storing documents, images, videos</p>
                  </div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 mt-3">
                  <p className="text-sm text-gray-700"><strong>Example use cases:</strong> Email content, social media posts, images, videos, PDFs, audio files</p>
                </div>
              </div>
            </div>
          </section>

          {/* How - Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Each Data Type Looks: Examples</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Structured Data Example</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Structured data is organized in rows and columns with a fixed schema:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-gray-400">// Database Table: Users</div>
                <div className="text-white">┌─────┬──────────┬─────┬─────────────┐</div>
                <div className="text-white">│ ID  │ Name     │ Age │ Email       │</div>
                <div className="text-white">├─────┼──────────┼─────┼─────────────┤</div>
                <div className="text-white">│  1  │ John     │  25 │ john@ex.com │</div>
                <div className="text-white">│  2  │ Jane     │  30 │ jane@ex.com │</div>
                <div className="text-white">│  3  │ Bob      │  28 │ bob@ex.com  │</div>
                <div className="text-white">└─────┴──────────┴─────┴─────────────┘</div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Characteristics:</strong> Fixed columns (ID, Name, Age, Email), easy to query with SQL, stored in relational databases
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Semi-Structured Data Example</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Semi-structured data has some organization but flexible schema:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-gray-400">// JSON Example</div>
                <div className="text-white">{'{'}</div>
                <div className="text-white ml-4">"id": 1,</div>
                <div className="text-white ml-4">"name": "John",</div>
                <div className="text-white ml-4">"age": 25,</div>
                <div className="text-white ml-4">"email": "john@ex.com",</div>
                <div className="text-white ml-4">"address": {'{'}</div>
                <div className="text-white ml-8">"street": "123 Main St",</div>
                <div className="text-white ml-8">"city": "New York"</div>
                <div className="text-white ml-4">{'}'},</div>
                <div className="text-white ml-4">"tags": ["customer", "premium"]</div>
                <div className="text-white">{'}'}</div>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                <p className="text-green-800 text-sm">
                  <strong>Characteristics:</strong> Flexible structure (nested objects, arrays), self-describing, stored in NoSQL databases or files
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Unstructured Data Example</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Unstructured data has no predefined format:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-gray-400">// Text Document Example</div>
                <div className="text-white">"I had a great experience shopping at your store</div>
                <div className="text-white">yesterday. The staff was very helpful and the</div>
                <div className="text-white">products were exactly what I was looking for.</div>
                <div className="text-white">I will definitely shop here again!"</div>
                <div className="text-gray-400 mt-2">// Image: customer_photo.jpg</div>
                <div className="text-gray-400">// Video: product_demo.mp4</div>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                <p className="text-purple-800 text-sm">
                  <strong>Characteristics:</strong> No fixed format, requires NLP/image processing for analysis, stored in file systems or object storage
                </p>
              </div>
            </div>
          </section>

          {/* Comparison Chart */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Type Comparison Chart</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Feature</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Structured</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Semi-Structured</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Unstructured</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Storage</td>
                    <td className="px-4 py-3 text-sm text-gray-700">RDBMS (MySQL, PostgreSQL)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">NoSQL (MongoDB), Files</td>
                    <td className="px-4 py-3 text-sm text-gray-700">File systems, Object storage</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Query Language</td>
                    <td className="px-4 py-3 text-sm text-gray-700">SQL</td>
                    <td className="px-4 py-3 text-sm text-gray-700">JSON Query, XPath</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Full-text search, ML/AI</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Scalability</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Vertical (limited)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Horizontal (good)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Horizontal (excellent)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Processing</td>
                    <td className="px-4 py-3 text-sm text-gray-700">SQL queries</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Parsers, APIs</td>
                    <td className="px-4 py-3 text-sm text-gray-700">NLP, Computer Vision</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Volume</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Small to medium</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Medium to large</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Very large (80% of data)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Understanding Data Types Matters</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <Database className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Right Storage Choice</h3>
                <p className="text-gray-700 text-sm">Choosing the right storage system based on data type improves performance and cost</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <Zap className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Efficient Processing</h3>
                <p className="text-gray-700 text-sm">Understanding data type helps select appropriate processing tools and methods</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <BarChart3 className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Better Analysis</h3>
                <p className="text-gray-700 text-sm">Different data types require different analysis approaches and tools</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <Target className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Cost Optimization</h3>
                <p className="text-gray-700 text-sm">Right storage and processing choices reduce infrastructure costs</p>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Data Type Examples</h2>
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">Structured Data Examples</h3>
                <ul className="space-y-1 text-sm text-gray-700 ml-4">
                  <li>• Customer database tables (name, email, phone)</li>
                  <li>• Financial transaction records</li>
                  <li>• Inventory management systems</li>
                  <li>• Employee payroll data</li>
                </ul>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">Semi-Structured Data Examples</h3>
                <ul className="space-y-1 text-sm text-gray-700 ml-4">
                  <li>• API responses (JSON format)</li>
                  <li>• Configuration files (YAML, JSON)</li>
                  <li>• Log files with structured fields</li>
                  <li>• Email headers (structured metadata)</li>
                </ul>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">Unstructured Data Examples</h3>
                <ul className="space-y-1 text-sm text-gray-700 ml-4">
                  <li>• Social media posts and comments</li>
                  <li>• Images and videos</li>
                  <li>• PDF documents</li>
                  <li>• Audio recordings</li>
                  <li>• Email body content</li>
                </ul>
              </div>
            </div>
          </section>

          <FAQSchema
            faqs={[
              {
                question: 'What percentage of data is unstructured?',
                answer: 'Approximately 80-90% of all data is unstructured. This includes text documents, images, videos, social media content, and other media files. Structured data makes up only about 10-20% of total data.',
              },
              {
                question: 'Can unstructured data become structured?',
                answer: 'Yes, through a process called data extraction and structuring. Techniques include: parsing text to extract entities, using OCR for documents, applying NLP for text analysis, and using computer vision for images. However, this requires significant processing.',
              },
              {
                question: 'Is JSON structured or semi-structured?',
                answer: 'JSON is semi-structured data. It has some organization (key-value pairs, nested structures) but allows flexible schema - fields can be optional, nested, or vary between records. It\'s more organized than unstructured data but less rigid than structured data.',
              },
              {
                question: 'Which data type is best for analytics?',
                answer: 'Structured data is easiest for traditional analytics (SQL queries, reporting). Semi-structured data works well with modern analytics tools. Unstructured data requires specialized tools (NLP, ML) but can provide rich insights. Often, you need a combination.',
              },
              {
                question: 'How do you store unstructured data?',
                answer: 'Unstructured data is typically stored in: file systems, object storage (S3, Azure Blob), NoSQL databases (MongoDB GridFS), or specialized storage systems. Metadata is often extracted and stored separately for easier searching and indexing.',
              },
            ]}
          />
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="Difference Between Structured, Semi-Structured, and Unstructured Data"
            description="Learn the difference between structured, semi-structured, and unstructured data with examples and comparisons."
            variant="full"
          />
        </section>

        <section className="mt-12">
          <NewsletterSignup />
        </section>
      </main>
    </div>
  );
}
