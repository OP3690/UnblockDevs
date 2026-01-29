'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Zap, CheckCircle, AlertCircle, Target, TrendingUp, BarChart3, Database, ChevronRight, Settings } from 'lucide-react';
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
            Back to Blog
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">What Is a Data Pipeline? Explained for Beginners</h1>
          <p className="text-sm text-gray-500 mt-1">Learn data pipelines with simple examples, visualizations, and real-world use cases</p>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare
        title="What Is a Data Pipeline? Explained for Beginners"
        description="Learn what a data pipeline is with simple examples. Understand ETL, data processing, and how data pipelines work."
        variant="floating"
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 md:pt-24">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <p className="text-xs text-gray-500 italic mb-8 pb-6 border-b border-gray-200">
            We earn commissions when you shop through the links below.
          </p>
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Data pipelines are the backbone of modern data-driven applications. They automate the process of moving, transforming, 
              and processing data from various sources to destinations where it can be analyzed, stored, or used. Understanding data 
              pipelines is essential for anyone working with data, from analysts to engineers.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this comprehensive guide, you'll learn what data pipelines are, how they work, the different types, and real-world 
              examples. We'll use simple analogies and visualizations to make everything easy to understand, even if you're new to 
              data engineering.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Quick Tip</p>
              <p className="text-blue-800">
                Use our free <Link href="/json-validator" className="font-semibold underline">JSON Validator</Link> to validate pipeline data 
                and our <Link href="/json-formatter" className="font-semibold underline">JSON Formatter</Link> to format data structures.
              </p>
            </div>
          </section>

          {/* Definition */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Definition: What Is a Data Pipeline?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A <strong>data pipeline</strong> is a series of automated processes that extract data from various sources, transform it 
              into a usable format, and load it into a destination system. Think of it as an assembly line for data—raw data goes in 
              one end, and processed, useful data comes out the other.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Key components of a data pipeline:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Database className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Source</h3>
                <p className="text-xs text-gray-700">Where data originates (databases, APIs, files)</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <Settings className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Processing</h3>
                <p className="text-xs text-gray-700">Transformation, validation, cleaning</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Target className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Destination</h3>
                <p className="text-xs text-gray-700">Where processed data goes (data warehouse, dashboard)</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-green-50 p-5 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Real-World Analogy</h3>
              <p className="text-gray-700 text-sm">
                Imagine a water treatment plant: Raw water (source) flows through filters and treatment processes (transformation), 
                and clean water (destination) comes out. A data pipeline works the same way—raw data flows through processing steps 
                to become clean, usable data.
              </p>
            </div>
          </section>

          {/* What */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Does a Data Pipeline Do?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A data pipeline performs several key functions:
            </p>
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-3">
                  <Database className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">1. Extract Data</h3>
                    <p className="text-gray-700 text-sm mb-2">Gathers data from multiple sources (databases, APIs, files, streams)</p>
                    <p className="text-xs text-gray-600">Example: Extracting user data from a CRM system, sales data from e-commerce platform</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <Settings className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">2. Transform Data</h3>
                    <p className="text-gray-700 text-sm mb-2">Cleans, validates, enriches, and reformats data for analysis</p>
                    <p className="text-xs text-gray-600">Example: Converting dates to standard format, removing duplicates, calculating metrics</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-start gap-3">
                  <Target className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">3. Load Data</h3>
                    <p className="text-gray-700 text-sm mb-2">Stores processed data in destination systems (data warehouses, databases, dashboards)</p>
                    <p className="text-xs text-gray-600">Example: Loading cleaned data into a data warehouse for business intelligence</p>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">4. Automate & Monitor</h3>
                    <p className="text-gray-700 text-sm mb-2">Runs automatically on schedule and monitors for errors or failures</p>
                    <p className="text-xs text-gray-600">Example: Daily pipeline that runs at midnight, sends alerts if data quality issues detected</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When Do You Need a Data Pipeline?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You need a data pipeline when:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Multiple data sources</strong> - When data comes from different systems that need to be combined</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Regular data updates</strong> - When you need fresh data on a schedule (daily, hourly, real-time)</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Data transformation needed</strong> - When raw data needs cleaning, validation, or reformatting</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Analytics and reporting</strong> - When you need to prepare data for business intelligence or dashboards</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Data quality assurance</strong> - When you need to ensure data accuracy and consistency</p>
                </div>
              </div>
            </div>
          </section>

          {/* How - ETL Pipeline Flow */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Data Pipelines Work: ETL Process</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The most common type of data pipeline is ETL (Extract, Transform, Load). Here's how it works:
            </p>
            
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200 mb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">E</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Extract</h4>
                    <p className="text-sm text-gray-600">Pull data from sources (databases, APIs, files)</p>
                    <p className="text-xs text-gray-500 mt-1">Example: Extract sales data from e-commerce database</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ChevronRight className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">T</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Transform</h4>
                    <p className="text-sm text-gray-600">Clean, validate, enrich, and reformat data</p>
                    <p className="text-xs text-gray-500 mt-1">Example: Remove duplicates, calculate totals, format dates</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <ChevronRight className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">L</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Load</h4>
                    <p className="text-sm text-gray-600">Store processed data in destination</p>
                    <p className="text-xs text-gray-500 mt-1">Example: Load into data warehouse for analytics</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Example: E-commerce Sales Pipeline</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Extract Phase</h4>
                  <p className="text-sm text-gray-700 mb-2">Pull data from multiple sources:</p>
                  <ul className="text-xs text-gray-600 ml-4 space-y-1">
                    <li>• Sales transactions from e-commerce database</li>
                    <li>• Customer data from CRM system</li>
                    <li>• Product information from inventory system</li>
                  </ul>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Transform Phase</h4>
                  <p className="text-sm text-gray-700 mb-2">Process and clean data:</p>
                  <ul className="text-xs text-gray-600 ml-4 space-y-1">
                    <li>• Remove duplicate transactions</li>
                    <li>• Calculate total sales per product</li>
                    <li>• Join customer data with sales data</li>
                    <li>• Format dates to standard format</li>
                    <li>• Validate data quality (check for nulls, invalid values)</li>
                  </ul>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Load Phase</h4>
                  <p className="text-sm text-gray-700 mb-2">Store in destination:</p>
                  <ul className="text-xs text-gray-600 ml-4 space-y-1">
                    <li>• Load into data warehouse</li>
                    <li>• Update business intelligence dashboards</li>
                    <li>• Make data available for reporting</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Pipeline Types */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Data Pipelines</h2>
            <div className="space-y-6">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Batch Pipeline</h3>
                <p className="text-gray-700 mb-3"><strong>How it works:</strong> Processes data in batches at scheduled intervals (daily, hourly)</p>
                <p className="text-gray-700 mb-3"><strong>Use case:</strong> Daily reports, historical data analysis, large volume processing</p>
                <div className="bg-white p-3 rounded border border-blue-200">
                  <p className="text-xs text-gray-600"><strong>Example:</strong> Nightly pipeline that processes all sales transactions from the day</p>
                </div>
              </div>

              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Real-Time Pipeline (Streaming)</h3>
                <p className="text-gray-700 mb-3"><strong>How it works:</strong> Processes data as it arrives, continuously</p>
                <p className="text-gray-700 mb-3"><strong>Use case:</strong> Live dashboards, fraud detection, real-time recommendations</p>
                <div className="bg-white p-3 rounded border border-green-200">
                  <p className="text-xs text-gray-600"><strong>Example:</strong> Processing user clicks in real-time to update live analytics dashboard</p>
                </div>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. ELT Pipeline</h3>
                <p className="text-gray-700 mb-3"><strong>How it works:</strong> Extract, Load, then Transform (loads raw data first, transforms later)</p>
                <p className="text-gray-700 mb-3"><strong>Use case:</strong> Modern data warehouses, when transformation logic may change</p>
                <div className="bg-white p-3 rounded border border-purple-200">
                  <p className="text-xs text-gray-600"><strong>Example:</strong> Loading raw JSON data into data warehouse, then transforming with SQL</p>
                </div>
              </div>
            </div>
          </section>

          {/* Pipeline Architecture Diagram */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Pipeline Architecture</h2>
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow text-center">
                    <Database className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Data Sources</h4>
                    <p className="text-xs text-gray-600">APIs, Databases, Files, Streams</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow text-center">
                    <Settings className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Processing Layer</h4>
                    <p className="text-xs text-gray-600">ETL Tools, Transformations, Validation</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow text-center">
                    <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 text-sm mb-1">Destinations</h4>
                    <p className="text-xs text-gray-600">Data Warehouse, Databases, Dashboards</p>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
                  <ChevronRight className="w-4 h-4" />
                  <span>Data Flow</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
                <div className="bg-white p-4 rounded-lg shadow text-center">
                  <Zap className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Orchestration & Monitoring</h4>
                  <p className="text-xs text-gray-600">Scheduling, Error Handling, Alerts, Logging</p>
                </div>
              </div>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Are Data Pipelines Important?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <Zap className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Automation</h3>
                <p className="text-gray-700 text-sm">Eliminates manual data processing, saves time and reduces errors</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <BarChart3 className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Data Quality</h3>
                <p className="text-gray-700 text-sm">Ensures consistent, clean, and validated data for analysis</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Scalability</h3>
                <p className="text-gray-700 text-sm">Handles growing data volumes without manual intervention</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <Target className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Business Intelligence</h3>
                <p className="text-gray-700 text-sm">Enables data-driven decision making with timely, accurate data</p>
              </div>
            </div>
          </section>

          {/* Real-World Examples */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Data Pipeline Examples</h2>
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">1. E-commerce Analytics Pipeline</h3>
                <p className="text-gray-700 text-sm mb-2">Extracts sales data from multiple stores, calculates metrics, loads into analytics platform</p>
                <p className="text-xs text-gray-600">Source: Multiple e-commerce databases → Transform: Calculate revenue, customer metrics → Destination: Business intelligence dashboard</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">2. Social Media Monitoring Pipeline</h3>
                <p className="text-gray-700 text-sm mb-2">Collects social media posts, analyzes sentiment, stores for reporting</p>
                <p className="text-xs text-gray-600">Source: Twitter/Instagram APIs → Transform: Sentiment analysis, keyword extraction → Destination: Brand monitoring dashboard</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">3. IoT Sensor Data Pipeline</h3>
                <p className="text-gray-700 text-sm mb-2">Collects sensor readings, aggregates data, triggers alerts for anomalies</p>
                <p className="text-xs text-gray-600">Source: IoT sensors → Transform: Aggregate, detect anomalies → Destination: Monitoring system, alert system</p>
              </div>
            </div>
          </section>

          <FAQSchema
            faqs={[
              {
                question: 'What is the difference between ETL and ELT?',
                answer: 'ETL (Extract, Transform, Load) transforms data before loading into destination. ELT (Extract, Load, Transform) loads raw data first, then transforms it in the destination. ELT is more flexible and common in modern data warehouses.',
              },
              {
                question: 'What is the difference between batch and real-time pipelines?',
                answer: 'Batch pipelines process data in scheduled intervals (daily, hourly) and are good for large volumes. Real-time (streaming) pipelines process data as it arrives continuously and are good for live dashboards and immediate insights.',
              },
              {
                question: 'What tools are used for data pipelines?',
                answer: 'Common tools include Apache Airflow (orchestration), Apache Spark (processing), Talend, Informatica, AWS Glue, Google Dataflow, and Azure Data Factory. Many organizations also build custom pipelines using Python, SQL, or specialized frameworks.',
              },
              {
                question: 'How do you handle errors in data pipelines?',
                answer: 'Error handling includes: validation checks, retry mechanisms for transient failures, dead letter queues for failed records, comprehensive logging, alerting systems, and data quality monitoring to catch issues early.',
              },
              {
                question: 'What is data pipeline orchestration?',
                answer: 'Orchestration is the coordination and scheduling of pipeline tasks. It manages dependencies between tasks, schedules runs, handles retries, monitors execution, and ensures pipelines run in the correct order. Tools like Apache Airflow are used for orchestration.',
              },
            ]}
          />
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="What Is a Data Pipeline? Explained for Beginners"
            description="Learn what a data pipeline is with simple examples. Understand ETL, data processing, and how data pipelines work."
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
