'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Zap, CheckCircle, AlertCircle, Target, TrendingUp, BarChart3, Database, Layers, Network } from 'lucide-react';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FAQSchema from '@/components/FAQSchema';

export default function BlogPostClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">What Is Data Modeling? Explained Simply with Examples</h1>
          <p className="text-sm text-gray-500 mt-1">Learn data modeling with simple examples, visual diagrams, and real-world use cases</p>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare
        title="What Is Data Modeling? Explained Simply with Examples"
        description="Learn what data modeling is with simple examples. Understand conceptual, logical, and physical data models."
        variant="floating"
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 md:pt-24">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Data modeling is the process of creating a visual representation of data structures, relationships, and rules. It's like 
              creating a blueprint for a building—before you build a database, you need a plan that shows how data will be organized, 
              connected, and stored.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this comprehensive guide, you'll learn what data modeling is, the different types of data models, how to create them, 
              and why they're essential for building effective databases and data systems. We'll use simple examples and visual diagrams 
              to make everything easy to understand.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Quick Tip</p>
              <p className="text-blue-800">
                Use our free <Link href="/json-validator" className="font-semibold underline">JSON Validator</Link> to validate data models 
                and our <Link href="/json-formatter" className="font-semibold underline">JSON Formatter</Link> to visualize data structures.
              </p>
            </div>
          </section>

          {/* Definition */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Definition: What Is Data Modeling?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Data Modeling</strong> is the process of designing and documenting data structures, relationships, and constraints 
              for a database or information system. It creates a blueprint that shows how data is organized, how different pieces of data 
              relate to each other, and what rules govern the data.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Key components of data modeling:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Database className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Entities</h3>
                <p className="text-xs text-gray-700">Things you want to store data about (users, products, orders)</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <Network className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Relationships</h3>
                <p className="text-xs text-gray-700">How entities connect (one-to-many, many-to-many)</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Layers className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Attributes</h3>
                <p className="text-xs text-gray-700">Properties of entities (name, age, price)</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-5 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Real-World Analogy</h3>
              <p className="text-gray-700 text-sm">
                Think of data modeling like designing a library system. You need to decide: What types of books (entities)? How are they 
                organized (relationships)? What information do you track (attributes)? The data model is the blueprint before you build 
                the actual library (database).
              </p>
            </div>
          </section>

          {/* What */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are the Types of Data Models?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Data modeling happens at three levels, from high-level concepts to database implementation:
            </p>
            
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Layers className="w-6 h-6 text-blue-600" />
                  1. Conceptual Data Model
                </h3>
                <p className="text-gray-700 mb-3"><strong>Purpose:</strong> High-level view of business concepts and relationships</p>
                <p className="text-gray-700 mb-3"><strong>Audience:</strong> Business stakeholders, non-technical users</p>
                <p className="text-gray-700 mb-3"><strong>Focus:</strong> What data is needed, not how it's stored</p>
                <div className="bg-white p-4 rounded border border-blue-200">
                  <p className="text-sm text-gray-700 mb-2"><strong>Example:</strong></p>
                  <div className="text-xs text-gray-600 font-mono">
                    <div>Customer -- places -- Order</div>
                    <div>Order -- contains -- Product</div>
                    <div>Product -- belongs to -- Category</div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Network className="w-6 h-6 text-green-600" />
                  2. Logical Data Model
                </h3>
                <p className="text-gray-700 mb-3"><strong>Purpose:</strong> Detailed structure with attributes, data types, relationships</p>
                <p className="text-gray-700 mb-3"><strong>Audience:</strong> Data architects, developers</p>
                <p className="text-gray-700 mb-3"><strong>Focus:</strong> How data is structured, independent of database technology</p>
                <div className="bg-white p-4 rounded border border-green-200">
                  <p className="text-sm text-gray-700 mb-2"><strong>Example:</strong></p>
                  <div className="text-xs text-gray-600 font-mono">
                    <div>Customer {'{'}</div>
                    <div className="ml-4">customer_id: integer (PK)</div>
                    <div className="ml-4">name: string(100)</div>
                    <div className="ml-4">email: string(255)</div>
                    <div>{'}'}</div>
                    <div>Order {'{'}</div>
                    <div className="ml-4">order_id: integer (PK)</div>
                    <div className="ml-4">customer_id: integer (FK)</div>
                    <div className="ml-4">order_date: date</div>
                    <div>{'}'}</div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Database className="w-6 h-6 text-purple-600" />
                  3. Physical Data Model
                </h3>
                <p className="text-gray-700 mb-3"><strong>Purpose:</strong> Database-specific implementation with indexes, constraints</p>
                <p className="text-gray-700 mb-3"><strong>Audience:</strong> Database administrators, developers</p>
                <p className="text-gray-700 mb-3"><strong>Focus:</strong> How data is stored in specific database system</p>
                <div className="bg-white p-4 rounded border border-purple-200">
                  <p className="text-sm text-gray-700 mb-2"><strong>Example:</strong></p>
                  <div className="text-xs text-gray-600 font-mono">
                    <div>CREATE TABLE customers {'('}</div>
                    <div className="ml-4">customer_id INT PRIMARY KEY AUTO_INCREMENT,</div>
                    <div className="ml-4">name VARCHAR(100) NOT NULL,</div>
                    <div className="ml-4">email VARCHAR(255) UNIQUE,</div>
                    <div className="ml-4">INDEX idx_email (email)</div>
                    <div>{')'};</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When Do You Need Data Modeling?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Data modeling is needed in these scenarios:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Building a new database</strong> - Before creating tables, you need a plan</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Integrating systems</strong> - When connecting different databases or applications</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Data warehouse design</strong> - When building analytics and reporting systems</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Documenting existing systems</strong> - Understanding current data structures</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Requirements gathering</strong> - Understanding business needs before development</p>
                </div>
              </div>
            </div>
          </section>

          {/* How - Entity Relationship Example */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Create a Data Model: Example</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">E-commerce Data Model Example</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Let's model a simple e-commerce system:
              </p>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Entities and Relationships:</h4>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <Database className="w-5 h-5 text-blue-600" />
                      <h5 className="font-semibold text-gray-900">Customer</h5>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Attributes: customer_id, name, email, phone</p>
                    <p className="text-xs text-gray-600">Relationships: Places orders (one-to-many)</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-gray-400">↓ (places)</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <Database className="w-5 h-5 text-green-600" />
                      <h5 className="font-semibold text-gray-900">Order</h5>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Attributes: order_id, customer_id, order_date, total</p>
                    <p className="text-xs text-gray-600">Relationships: Contains products (many-to-many via OrderItem)</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-gray-400">↓ (contains)</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <Database className="w-5 h-5 text-purple-600" />
                      <h5 className="font-semibold text-gray-900">Product</h5>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">Attributes: product_id, name, price, category_id</p>
                    <p className="text-xs text-gray-600">Relationships: Belongs to category (many-to-one)</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-gray-400">// Logical Data Model (Simplified)</div>
                <div className="text-white"></div>
                <div className="text-blue-400">Entity:</div> <div className="text-yellow-400">Customer</div>
                <div className="text-white ml-4">- customer_id: integer (Primary Key)</div>
                <div className="text-white ml-4">- name: string</div>
                <div className="text-white ml-4">- email: string (unique)</div>
                <div className="text-white ml-4">- phone: string</div>
                <div className="text-white"></div>
                <div className="text-blue-400">Entity:</div> <div className="text-yellow-400">Order</div>
                <div className="text-white ml-4">- order_id: integer (Primary Key)</div>
                <div className="text-white ml-4">- customer_id: integer (Foreign Key → Customer)</div>
                <div className="text-white ml-4">- order_date: date</div>
                <div className="text-white ml-4">- total: decimal</div>
                <div className="text-white"></div>
                <div className="text-blue-400">Entity:</div> <div className="text-yellow-400">Product</div>
                <div className="text-white ml-4">- product_id: integer (Primary Key)</div>
                <div className="text-white ml-4">- name: string</div>
                <div className="text-white ml-4">- price: decimal</div>
                <div className="text-white ml-4">- category_id: integer (Foreign Key → Category)</div>
                <div className="text-white"></div>
                <div className="text-blue-400">Relationship:</div> <div className="text-white">Customer 1:N Order</div>
                <div className="text-blue-400">Relationship:</div> <div className="text-white">Order M:N Product (via OrderItem)</div>
              </div>
            </div>
          </section>

          {/* Relationship Types Diagram */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Relationships in Data Modeling</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Relationship Type</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Example</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Notation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">One-to-One (1:1)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">One entity relates to exactly one other entity</td>
                    <td className="px-4 py-3 text-sm text-gray-700">User → Profile (each user has one profile)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">1:1</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">One-to-Many (1:N)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">One entity relates to many others</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Customer → Orders (one customer has many orders)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">1:N</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Many-to-Many (M:N)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Many entities relate to many others</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Student → Course (students take many courses, courses have many students)</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">M:N</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> Many-to-many relationships typically require a junction/join table (e.g., OrderItem table for Order-Product relationship).
              </p>
            </div>
          </section>

          {/* Data Modeling Process Flow */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Modeling Process Flow</h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Gather Requirements</h4>
                    <p className="text-sm text-gray-600">Understand business needs, data requirements</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Create Conceptual Model</h4>
                    <p className="text-sm text-gray-600">High-level entities and relationships</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Develop Logical Model</h4>
                    <p className="text-sm text-gray-600">Add attributes, data types, detailed relationships</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Create Physical Model</h4>
                    <p className="text-sm text-gray-600">Database-specific implementation with indexes, constraints</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Implement Database</h4>
                    <p className="text-sm text-gray-600">Create tables, indexes, constraints based on model</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Is Data Modeling Important?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <Target className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Clear Communication</h3>
                <p className="text-gray-700 text-sm">Visual models help stakeholders understand data structure</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <Zap className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Prevents Errors</h3>
                <p className="text-gray-700 text-sm">Catching design issues early saves time and money</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <Database className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Better Performance</h3>
                <p className="text-gray-700 text-sm">Well-designed models lead to efficient database structures</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <BarChart3 className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
                <p className="text-gray-700 text-sm">Models serve as living documentation of data structure</p>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Modeling Best Practices</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Start with Business Requirements</h3>
                  <p className="text-gray-700 text-sm">Understand what the business needs before designing technical solutions</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Normalize Appropriately</h3>
                  <p className="text-gray-700 text-sm">Balance normalization (reduce redundancy) with performance needs</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Use Naming Conventions</h3>
                  <p className="text-gray-700 text-sm">Consistent naming makes models easier to understand and maintain</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Document Everything</h3>
                  <p className="text-gray-700 text-sm">Add comments, descriptions, and notes to explain design decisions</p>
                </div>
              </div>
            </div>
          </section>

          <FAQSchema
            faqs={[
              {
                question: 'What is the difference between conceptual, logical, and physical data models?',
                answer: 'Conceptual model is high-level business view (what data). Logical model adds details like attributes and data types (how data is structured). Physical model is database-specific implementation (how data is stored).',
              },
              {
                question: 'What is an Entity-Relationship Diagram (ERD)?',
                answer: 'An ERD is a visual representation of a data model showing entities (rectangles), attributes (ovals), and relationships (lines). It\'s the most common way to visualize data models.',
              },
              {
                question: 'What is data normalization?',
                answer: 'Normalization is organizing data to reduce redundancy and improve data integrity. It involves splitting data into related tables and eliminating duplicate information. Common levels are 1NF, 2NF, 3NF.',
              },
              {
                question: 'When should I denormalize a data model?',
                answer: 'Denormalize when you need better read performance (data warehouses, reporting). Trade-off: faster reads but more storage and potential data inconsistency. Use for analytics, not transactional systems.',
              },
              {
                question: 'What tools are used for data modeling?',
                answer: 'Common tools include: ER/Studio, ERwin, MySQL Workbench, dbdiagram.io, Lucidchart, Draw.io, and database-specific tools. Many data engineers also use SQL DDL scripts to define models.',
              },
            ]}
          />
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="What Is Data Modeling? Explained Simply with Examples"
            description="Learn what data modeling is with simple examples. Understand conceptual, logical, and physical data models."
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
