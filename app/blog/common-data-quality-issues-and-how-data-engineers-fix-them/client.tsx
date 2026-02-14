'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Zap, CheckCircle, AlertCircle, Target, TrendingUp, BarChart3, Shield, AlertTriangle, Search, Settings } from 'lucide-react';
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
            Back to Developer's Study Materials
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Common Data Quality Issues and How Data Engineers Fix Them</h1>
          <p className="text-sm text-gray-500 mt-1">Learn data quality problems, detection methods, and solutions with examples</p>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare
        title="Common Data Quality Issues and How Data Engineers Fix Them"
        description="Learn common data quality issues and how data engineers identify, fix, and prevent data quality problems."
        variant="floating"
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 md:pt-24">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Data quality issues are one of the biggest challenges in data engineering. Poor quality data leads to incorrect insights, 
              bad business decisions, and wasted resources. Understanding common data quality problems and how to fix them is essential 
              for building reliable data systems.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this comprehensive guide, you'll learn the most common data quality issues, how data engineers detect them, 
              proven solutions, and best practices for maintaining data quality. We'll use real-world examples and practical solutions 
              to make everything actionable.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Quick Tip</p>
              <p className="text-blue-800">
                Use our free <Link href="/json-validator" className="font-semibold underline">JSON Validator</Link> to check data quality 
                and our <Link href="/json-formatter" className="font-semibold underline">JSON Formatter</Link> to identify formatting issues.
              </p>
            </div>
          </section>

          {/* Definition */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Definition: What Is Data Quality?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Data Quality</strong> refers to the accuracy, completeness, consistency, validity, and timeliness of data. 
              High-quality data is reliable, accurate, and fit for its intended use. Poor data quality leads to incorrect analysis 
              and bad decisions.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Dimensions of data quality:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Accuracy</h3>
                <p className="text-xs text-gray-700">Data is correct and reflects reality</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <Target className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Completeness</h3>
                <p className="text-xs text-gray-700">All required data is present</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <Shield className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Consistency</h3>
                <p className="text-xs text-gray-700">Data is uniform across systems</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <AlertCircle className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Validity</h3>
                <p className="text-xs text-gray-700">Data follows defined rules and formats</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <Zap className="w-6 h-6 text-red-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Timeliness</h3>
                <p className="text-xs text-gray-700">Data is up-to-date and available when needed</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <BarChart3 className="w-6 h-6 text-indigo-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Uniqueness</h3>
                <p className="text-xs text-gray-700">No duplicate records</p>
              </div>
            </div>
          </section>

          {/* What */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Common Data Quality Issues?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Here are the most common data quality problems data engineers encounter:
            </p>
            
            <div className="space-y-6">
              <div className="p-6 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900">1. Missing Values (Nulls)</h3>
                </div>
                <p className="text-gray-700 mb-3"><strong>Problem:</strong> Required fields are empty or null</p>
                <p className="text-gray-700 mb-3"><strong>Example:</strong> Customer records with missing email addresses</p>
                <div className="bg-white p-4 rounded border border-red-200 mb-3">
                  <p className="text-sm text-gray-700 mb-2"><strong>Before:</strong></p>
                  <div className="text-xs text-gray-600 font-mono">
                    <div>ID | Name | Email</div>
                    <div>1  | John | john@ex.com</div>
                    <div>2  | Jane | null</div>
                    <div>3  | Bob  | null</div>
                  </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-sm text-green-800"><strong>Impact:</strong> Can't send emails, incomplete analysis, broken business processes</p>
                </div>
              </div>

              <div className="p-6 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-semibold text-gray-900">2. Duplicate Records</h3>
                </div>
                <p className="text-gray-700 mb-3"><strong>Problem:</strong> Same record appears multiple times</p>
                <p className="text-gray-700 mb-3"><strong>Example:</strong> Customer "John Doe" entered twice with different IDs</p>
                <div className="bg-white p-4 rounded border border-orange-200 mb-3">
                  <p className="text-sm text-gray-700 mb-2"><strong>Before:</strong></p>
                  <div className="text-xs text-gray-600 font-mono">
                    <div>ID | Name      | Email</div>
                    <div>1  | John Doe  | john@ex.com</div>
                    <div>5  | John Doe  | john@ex.com</div>
                    <div>8  | John Doe  | john.doe@ex.com</div>
                  </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-sm text-green-800"><strong>Impact:</strong> Inflated counts, incorrect aggregations, wasted storage</p>
                </div>
              </div>

              <div className="p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-xl font-semibold text-gray-900">3. Inconsistent Formats</h3>
                </div>
                <p className="text-gray-700 mb-3"><strong>Problem:</strong> Same data in different formats</p>
                <p className="text-gray-700 mb-3"><strong>Example:</strong> Dates in multiple formats, phone numbers with/without dashes</p>
                <div className="bg-white p-4 rounded border border-yellow-200 mb-3">
                  <p className="text-sm text-gray-700 mb-2"><strong>Before:</strong></p>
                  <div className="text-xs text-gray-600 font-mono">
                    <div>Date formats: "2024-01-15", "01/15/2024", "Jan 15, 2024"</div>
                    <div>Phone: "123-456-7890", "(123) 456-7890", "1234567890"</div>
                  </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-sm text-green-800"><strong>Impact:</strong> Can't sort/filter properly, parsing errors, user confusion</p>
                </div>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-semibold text-gray-900">4. Invalid Data</h3>
                </div>
                <p className="text-gray-700 mb-3"><strong>Problem:</strong> Data doesn't meet validation rules</p>
                <p className="text-gray-700 mb-3"><strong>Example:</strong> Email without @, age = 250, negative prices</p>
                <div className="bg-white p-4 rounded border border-purple-200 mb-3">
                  <p className="text-sm text-gray-700 mb-2"><strong>Before:</strong></p>
                  <div className="text-xs text-gray-600 font-mono">
                    <div>Email: "notanemail", "john@", "@domain.com"</div>
                    <div>Age: 250, -5, "thirty"</div>
                    <div>Price: -10.50, "free", null</div>
                  </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-sm text-green-800"><strong>Impact:</strong> Application errors, failed validations, incorrect calculations</p>
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">5. Data Inconsistency</h3>
                </div>
                <p className="text-gray-700 mb-3"><strong>Problem:</strong> Same entity has different values across systems</p>
                <p className="text-gray-700 mb-3"><strong>Example:</strong> Customer name is "John" in CRM but "Johnny" in orders system</p>
                <div className="bg-white p-4 rounded border border-blue-200 mb-3">
                  <p className="text-sm text-gray-700 mb-2"><strong>Before:</strong></p>
                  <div className="text-xs text-gray-600 font-mono">
                    <div>CRM: customer_id=1, name="John Smith"</div>
                    <div>Orders: customer_id=1, name="Johnny Smith"</div>
                  </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <p className="text-sm text-green-800"><strong>Impact:</strong> Can't join data correctly, reporting errors, user confusion</p>
                </div>
              </div>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When Do Data Quality Issues Occur?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Data quality issues can happen at various stages:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Data entry</strong> - Human errors when entering data manually</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>System integration</strong> - When combining data from multiple sources</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Data migration</strong> - When moving data between systems</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>API integrations</strong> - When external APIs return inconsistent data</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Time decay</strong> - When data becomes outdated over time</p>
                </div>
              </div>
            </div>
          </section>

          {/* How - Solutions */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Data Engineers Fix Data Quality Issues</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Missing Values - Solutions</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Imputation (Fill Missing Values)</h4>
                  <p className="text-sm text-gray-700 mb-2">Fill missing values with statistical measures or predictions</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-2">
                    <div className="text-gray-400">// Mean imputation for numeric</div>
                    <div className="text-white">missing_age = mean(ages)  // Fill with average</div>
                    <div className="text-gray-400 mt-2">// Mode imputation for categorical</div>
                    <div className="text-white">missing_category = mode(categories)  // Fill with most common</div>
                  </div>
                  <p className="text-xs text-gray-600"><strong>When to use:</strong> When missing data is random and you need complete dataset</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Deletion</h4>
                  <p className="text-sm text-gray-700 mb-2">Remove records with missing critical values</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-2">
                    <div className="text-white">data = data.dropna(subset=['email'])  // Remove rows without email</div>
                  </div>
                  <p className="text-xs text-gray-600"><strong>When to use:</strong> When missing data is small percentage and not critical</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Flag Missing Values</h4>
                  <p className="text-sm text-gray-700 mb-2">Create indicator column for missing values</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-2">
                    <div className="text-white">data['email_missing'] = data['email'].isna()  // True if missing</div>
                  </div>
                  <p className="text-xs text-gray-600"><strong>When to use:</strong> When missingness itself is informative</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Duplicate Records - Solutions</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Deduplication</h4>
                  <p className="text-sm text-gray-700 mb-2">Identify and remove duplicate records</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-2">
                    <div className="text-gray-400">// Remove exact duplicates</div>
                    <div className="text-white">data = data.drop_duplicates()</div>
                    <div className="text-gray-400 mt-2">// Remove based on key fields</div>
                    <div className="text-white">data = data.drop_duplicates(subset=['email'])</div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Fuzzy Matching</h4>
                  <p className="text-sm text-gray-700 mb-2">Find near-duplicates using similarity algorithms</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-2">
                    <div className="text-gray-400">// Find similar names (Levenshtein distance)</div>
                    <div className="text-white">"John Doe" vs "Jon Doe"  // Similarity: 0.9</div>
                    <div className="text-white">// Merge if similarity {'>'} threshold</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Format Inconsistencies - Solutions</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Standardization</h4>
                  <p className="text-sm text-gray-700 mb-2">Convert all values to standard format</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-2">
                    <div className="text-gray-400">// Standardize dates</div>
                    <div className="text-white">date = parse_date(date_string)  // "2024-01-15"</div>
                    <div className="text-gray-400 mt-2">// Standardize phone numbers</div>
                    <div className="text-white">phone = re.sub(r{'[^0-9]'}, '', phone)  // "1234567890"</div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Normalization</h4>
                  <p className="text-sm text-gray-700 mb-2">Convert to canonical form (lowercase, trim whitespace)</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-2">
                    <div className="text-white">name = name.lower().strip()  // "John Doe" → "john doe"</div>
                    <div className="text-white">email = email.lower().strip()  // Remove spaces</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4. Invalid Data - Solutions</h3>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Validation Rules</h4>
                  <p className="text-sm text-gray-700 mb-2">Define and enforce validation rules</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-2">
                    <div className="text-gray-400">// Email validation</div>
                    <div className="text-white">if not re.match(r{'^[\\w\\.-]+@[\\w\\.-]+\\.[a-z]{2,}$'}, email):</div>
                    <div className="text-white ml-4">flag_as_invalid(email)</div>
                    <div className="text-gray-400 mt-2">// Range validation</div>
                    <div className="text-white">if age {'<'} 0 or age {'>'} 120:</div>
                    <div className="text-white ml-4">flag_as_invalid(age)</div>
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Data Type Conversion</h4>
                  <p className="text-sm text-gray-700 mb-2">Convert to correct data types with error handling</p>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs mb-2">
                    <div className="text-white">try:</div>
                    <div className="text-white ml-4">price = float(price_string)</div>
                    <div className="text-blue-400">except</div> <div className="text-white">ValueError:</div>
                    <div className="text-white ml-4">price = None  // Mark as invalid</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Quality Process Flow */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Quality Improvement Process</h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Profile Data</h4>
                    <p className="text-sm text-gray-600">Analyze data to identify quality issues</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Define Rules</h4>
                    <p className="text-sm text-gray-600">Establish data quality rules and standards</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Clean Data</h4>
                    <p className="text-sm text-gray-600">Apply fixes: impute, deduplicate, standardize</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Validate</h4>
                    <p className="text-sm text-gray-600">Verify data meets quality standards</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">5</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Monitor</h4>
                    <p className="text-sm text-gray-600">Continuously monitor data quality metrics</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">6</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Prevent</h4>
                    <p className="text-sm text-gray-600">Implement validation at data entry points</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Data Quality Metrics */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Quality Metrics</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Metric</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Formula</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Target</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Example</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Completeness</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">(Non-null records / Total records) × 100</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{'>'} 95%</td>
                    <td className="px-4 py-3 text-sm text-gray-700">950/1000 = 95%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Accuracy</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">(Correct records / Total records) × 100</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{'>'} 98%</td>
                    <td className="px-4 py-3 text-sm text-gray-700">980/1000 = 98%</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Uniqueness</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">(Unique records / Total records) × 100</td>
                    <td className="px-4 py-3 text-sm text-gray-700">100%</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1000/1000 = 100%</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">Validity</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">(Valid records / Total records) × 100</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{'>'} 95%</td>
                    <td className="px-4 py-3 text-sm text-gray-700">970/1000 = 97%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Data Quality Matters</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <Target className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Better Decisions</h3>
                <p className="text-gray-700 text-sm">High-quality data leads to accurate insights and better business decisions</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <Zap className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Cost Savings</h3>
                <p className="text-gray-700 text-sm">Prevents costly mistakes, reduces rework, saves time</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <Shield className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Trust & Compliance</h3>
                <p className="text-gray-700 text-sm">Builds trust in data, ensures regulatory compliance</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <TrendingUp className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Efficiency</h3>
                <p className="text-gray-700 text-sm">Reduces errors, automates processes, improves productivity</p>
              </div>
            </div>
            <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Cost of Poor Data Quality:</strong> According to studies, poor data quality costs organizations an average of 
                $15 million per year in wasted time, incorrect decisions, and lost opportunities.
              </p>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Quality Best Practices</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Validate at Source</h3>
                  <p className="text-gray-700 text-sm">Catch issues early by validating data when it enters the system</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Automate Data Quality Checks</h3>
                  <p className="text-gray-700 text-sm">Use automated pipelines to continuously monitor and fix data quality</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Document Data Quality Rules</h3>
                  <p className="text-gray-700 text-sm">Maintain clear documentation of what constitutes good data quality</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Create Data Quality Dashboards</h3>
                  <p className="text-gray-700 text-sm">Monitor data quality metrics in real-time with dashboards</p>
                </div>
              </div>
            </div>
          </section>

          <FAQSchema
            faqs={[
              {
                question: 'What is the difference between data cleaning and data quality?',
                answer: 'Data cleaning is the process of fixing specific issues (removing duplicates, filling missing values). Data quality is the broader concept of ensuring data meets standards for accuracy, completeness, consistency, and validity.',
              },
              {
                question: 'How do you measure data quality?',
                answer: 'Data quality is measured using metrics like: completeness (percentage of non-null values), accuracy (percentage of correct values), uniqueness (no duplicates), validity (meets rules), consistency (uniform across systems), and timeliness (up-to-date).',
              },
              {
                question: 'Should I fix data quality issues manually or automatically?',
                answer: 'Automate as much as possible. Manual fixes don\'t scale and are error-prone. Use automated data quality pipelines that validate, clean, and monitor data continuously. Reserve manual fixes for complex edge cases.',
              },
              {
                question: 'What is data profiling?',
                answer: 'Data profiling is analyzing data to understand its structure, content, quality, and relationships. It helps identify issues like missing values, outliers, data types, value distributions, and patterns before fixing them.',
              },
              {
                question: 'How often should I check data quality?',
                answer: 'Data quality should be checked continuously in production systems. Set up automated monitoring that runs daily or in real-time. For batch processes, check quality after each ETL run. For streaming, monitor continuously.',
              },
            ]}
          />
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="Common Data Quality Issues and How Data Engineers Fix Them"
            description="Learn common data quality issues and how data engineers identify, fix, and prevent data quality problems."
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
