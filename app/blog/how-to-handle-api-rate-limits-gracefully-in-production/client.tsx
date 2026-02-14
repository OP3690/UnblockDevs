'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, Zap, Clock, AlertTriangle, CheckCircle, BookOpen, TrendingUp, RefreshCw, BarChart3 } from 'lucide-react';
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
          <h1 className="text-3xl font-bold text-gray-900">How to Handle API Rate Limits Gracefully in Production</h1>
          <p className="text-sm text-gray-500 mt-1">Complete guide to handling rate limits with exponential backoff, retry strategies, and best practices</p>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare
        title="How to Handle API Rate Limits Gracefully in Production"
        description="Learn how to handle API rate limits with exponential backoff, retry strategies, and best practices."
        variant="floating"
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-20 md:pt-24">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              API rate limits are restrictions that APIs impose on the number of requests a client can make within a specific time period. 
              Hitting these limits can break your application, but with proper handling, you can gracefully manage rate limits and maintain 
              a smooth user experience.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              In this comprehensive guide, you'll learn how to handle API rate limits in production applications using exponential backoff, 
              retry strategies, rate limit headers, circuit breakers, and other best practices. We'll cover everything from detecting rate 
              limits to implementing robust retry mechanisms.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg mt-6">
              <p className="font-semibold text-blue-900 mb-2">💡 Quick Tip</p>
              <p className="text-blue-800">
                Use our free <Link href="/json-validator" className="font-semibold underline">JSON Validator</Link> to validate API responses 
                and our <Link href="/har-to-curl" className="font-semibold underline">HAR to cURL Converter</Link> to test API rate limits.
              </p>
            </div>
          </section>

          {/* Definition */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-600" />
              Definition: What Are API Rate Limits?
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>API Rate Limits</strong> are restrictions that API providers enforce to control the number of requests a client can make 
              within a specific time window. They prevent abuse, ensure fair usage, and protect server resources from being overwhelmed.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Common rate limit types include:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Clock className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Requests per Second</h3>
                <p className="text-sm text-gray-700">e.g., 10 requests/second</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <BarChart3 className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Requests per Minute</h3>
                <p className="text-sm text-gray-700">e.g., 100 requests/minute</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Requests per Hour/Day</h3>
                <p className="text-sm text-gray-700">e.g., 10,000 requests/day</p>
              </div>
            </div>
          </section>

          {/* What */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Happens When You Hit Rate Limits?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you exceed rate limits, APIs typically return a <strong>429 Too Many Requests</strong> status code. Here's what you need to know:
            </p>
            <div className="space-y-4">
              <div className="p-5 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-center gap-3 mb-2">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">429 Status Code</h3>
                </div>
                <p className="text-gray-700 mb-2">The API returns HTTP 429 with rate limit information in headers</p>
                <div className="bg-gray-900 text-red-400 p-3 rounded font-mono text-sm">
                  <div>HTTP/1.1 429 Too Many Requests</div>
                  <div>X-RateLimit-Limit: 100</div>
                  <div>X-RateLimit-Remaining: 0</div>
                  <div>X-RateLimit-Reset: 1640995200</div>
                  <div>Retry-After: 60</div>
                </div>
              </div>
              <div className="p-5 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Request Blocking</h3>
                </div>
                <p className="text-gray-700">Subsequent requests are rejected until the rate limit window resets</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="w-6 h-6 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Potential Account Suspension</h3>
                </div>
                <p className="text-gray-700">Repeated violations may result in temporary or permanent API access suspension</p>
              </div>
            </div>
          </section>

          {/* When */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When Do You Need Rate Limit Handling?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Implement rate limit handling in these scenarios:
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>High-volume API calls</strong> - When your app makes many requests in short periods</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Third-party API integration</strong> - When using external APIs with strict limits</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Production applications</strong> - When reliability and user experience are critical</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Background jobs</strong> - When processing large batches of API requests</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-gray-700"><strong>Real-time features</strong> - When users trigger frequent API calls</p>
                </div>
              </div>
            </div>
          </section>

          {/* How - Step by Step */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Handle Rate Limits: Step-by-Step Guide</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 1: Detect Rate Limit Responses</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                First, detect when you've hit a rate limit by checking the HTTP status code:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-gray-400">// JavaScript/TypeScript example</div>
                <div className="text-blue-400">async function</div> <div className="text-yellow-400">makeRequest</div><div className="text-white">() {'{'}</div>
                <div className="text-white ml-4">const response = await fetch('https://api.example.com/data');</div>
                <div className="text-white ml-4"></div>
                <div className="text-blue-400 ml-4">if</div> <div className="text-white">(response.status === </div><div className="text-yellow-400">429</div><div className="text-white">) {'{'}</div>
                <div className="text-white ml-8">console.log('Rate limit exceeded!');</div>
                <div className="text-white ml-8">// Handle rate limit...</div>
                <div className="text-white ml-4">{'}'}</div>
                <div className="text-white">{'}'}</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 2: Read Rate Limit Headers</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Extract rate limit information from response headers:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-gray-400">// Common rate limit headers</div>
                <div className="text-white">const limit = response.headers.get('X-RateLimit-Limit');</div>
                <div className="text-white">const remaining = response.headers.get('X-RateLimit-Remaining');</div>
                <div className="text-white">const resetTime = response.headers.get('X-RateLimit-Reset');</div>
                <div className="text-white">const retryAfter = response.headers.get('Retry-After');</div>
                <div className="text-white"></div>
                <div className="text-gray-400">// Retry-After is in seconds</div>
                <div className="text-blue-400">const</div> <div className="text-white">waitTime = parseInt(retryAfter) * </div><div className="text-yellow-400">1000</div><div className="text-white">; // Convert to milliseconds</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 3: Implement Exponential Backoff</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Exponential backoff gradually increases wait time between retries:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-blue-400">async function</div> <div className="text-yellow-400">retryWithBackoff</div><div className="text-white">(</div>
                <div className="text-white ml-4">requestFn,</div>
                <div className="text-white ml-4">maxRetries = </div><div className="text-yellow-400">3</div><div className="text-white">,</div>
                <div className="text-white ml-4">baseDelay = </div><div className="text-yellow-400">1000</div> <div className="text-white">// 1 second</div>
                <div className="text-white">) {'{'}</div>
                <div className="text-blue-400 ml-4">for</div> <div className="text-white">(let attempt = </div><div className="text-yellow-400">0</div><div className="text-white">; attempt {'<'} maxRetries; attempt++) {'{'}</div>
                <div className="text-blue-400 ml-8">try</div> <div className="text-white">{' {'}</div>
                <div className="text-white ml-12">return await requestFn();</div>
                <div className="text-blue-400 ml-8">{'}'} catch</div> <div className="text-white">(error) {'{'}</div>
                <div className="text-white ml-12">if (error.status !== </div><div className="text-yellow-400">429</div><div className="text-white"> || attempt === maxRetries - </div><div className="text-yellow-400">1</div><div className="text-white">) {'{'}</div>
                <div className="text-white ml-16">throw error;</div>
                <div className="text-white ml-12">{'}'}</div>
                <div className="text-white ml-12">const delay = baseDelay * Math.pow(</div><div className="text-yellow-400">2</div><div className="text-white">, attempt);</div>
                <div className="text-white ml-12">await </div><div className="text-yellow-400">sleep</div><div className="text-white">(delay);</div>
                <div className="text-white ml-8">{'}'}</div>
                <div className="text-white ml-4">{'}'}</div>
                <div className="text-white">{'}'}</div>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Backoff Pattern:</strong> Wait 1s, then 2s, then 4s, then 8s... This prevents overwhelming the API server.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 4: Use Retry-After Header</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When available, use the Retry-After header for precise wait times:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-blue-400">if</div> <div className="text-white">(response.status === </div><div className="text-yellow-400">429</div><div className="text-white">) {'{'}</div>
                <div className="text-blue-400 ml-4">const</div> <div className="text-white">retryAfter = response.headers.get('Retry-After');</div>
                <div className="text-blue-400 ml-4">if</div> <div className="text-white">(retryAfter) {'{'}</div>
                <div className="text-white ml-8">const waitTime = parseInt(retryAfter) * </div><div className="text-yellow-400">1000</div><div className="text-white">;</div>
                <div className="text-white ml-8">await </div><div className="text-yellow-400">sleep</div><div className="text-white">(waitTime);</div>
                <div className="text-white ml-8">return await makeRequest(); // Retry</div>
                <div className="text-white ml-4">{'}'}</div>
                <div className="text-white">{'}'}</div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Step 5: Implement Request Queuing</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Queue requests to prevent hitting rate limits:
              </p>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm mb-4">
                <div className="text-gray-400">// Simple request queue with rate limiting</div>
                <div className="text-blue-400">class</div> <div className="text-yellow-400">RateLimitedQueue</div> <div className="text-white">{' {'}</div>
                <div className="text-white ml-4">constructor(maxRequests = </div><div className="text-yellow-400">10</div><div className="text-white">, windowMs = </div><div className="text-yellow-400">1000</div><div className="text-white">) {'{'}</div>
                <div className="text-white ml-8">this.maxRequests = maxRequests;</div>
                <div className="text-white ml-8">this.windowMs = windowMs;</div>
                <div className="text-white ml-8">this.requests = [];</div>
                <div className="text-white ml-4">{'}'}</div>
                <div className="text-white ml-4"></div>
                <div className="text-blue-400 ml-4">async</div> <div className="text-yellow-400">add</div><div className="text-white">(requestFn) {'{'}</div>
                <div className="text-white ml-8">// Wait if at limit</div>
                <div className="text-white ml-8">while (this.requests.length {'>='} this.maxRequests) {'{'}</div>
                <div className="text-white ml-12">await </div><div className="text-yellow-400">sleep</div><div className="text-white">(this.windowMs);</div>
                <div className="text-white ml-12">this.cleanOldRequests();</div>
                <div className="text-white ml-8">{'}'}</div>
                <div className="text-white ml-8">this.requests.push(Date.now());</div>
                <div className="text-white ml-8">return await requestFn();</div>
                <div className="text-white ml-4">{'}'}</div>
                <div className="text-white">{'}'}</div>
              </div>
            </div>
          </section>

          {/* Rate Limit Handling Flow */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Rate Limit Handling Flow</h2>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">1</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Make API Request</h4>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">2</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Check Response Status</h4>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">✓</div>
                    <div className="flex-1 bg-white p-4 rounded-lg shadow">
                      <h4 className="font-semibold text-gray-900">200 OK</h4>
                      <p className="text-sm text-gray-600">Return result</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">429</div>
                    <div className="flex-1 bg-white p-4 rounded-lg shadow">
                      <h4 className="font-semibold text-gray-900">Rate Limited</h4>
                      <p className="text-sm text-gray-600">Read headers</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">3</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Wait (Exponential Backoff)</h4>
                    <p className="text-sm text-gray-600">Use Retry-After or calculated delay</p>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-0.5 h-8 bg-blue-300"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold flex-shrink-0">4</div>
                  <div className="flex-1 bg-white p-4 rounded-lg shadow">
                    <h4 className="font-semibold text-gray-900">Retry Request</h4>
                    <p className="text-sm text-gray-600">Repeat until success or max retries</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Exponential Backoff Chart */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exponential Backoff Timing</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Retry Attempt</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Wait Time (seconds)</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Formula</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border-b">Total Elapsed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">1</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">1 × 2⁰</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1s</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">2</td>
                    <td className="px-4 py-3 text-sm text-gray-700">2</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">1 × 2¹</td>
                    <td className="px-4 py-3 text-sm text-gray-700">3s</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">3</td>
                    <td className="px-4 py-3 text-sm text-gray-700">4</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">1 × 2²</td>
                    <td className="px-4 py-3 text-sm text-gray-700">7s</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">4</td>
                    <td className="px-4 py-3 text-sm text-gray-700">8</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">1 × 2³</td>
                    <td className="px-4 py-3 text-sm text-gray-700">15s</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900 font-medium">5</td>
                    <td className="px-4 py-3 text-sm text-gray-700">16</td>
                    <td className="px-4 py-3 text-sm text-gray-700 font-mono">1 × 2⁴</td>
                    <td className="px-4 py-3 text-sm text-gray-700">31s</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Why */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Handle Rate Limits Gracefully?</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <Shield className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Prevent Application Crashes</h3>
                <p className="text-gray-700 text-sm">Graceful handling prevents unhandled errors that break your app</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <Zap className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Better User Experience</h3>
                <p className="text-gray-700 text-sm">Users see retries instead of immediate failures</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Maximize API Usage</h3>
                <p className="text-gray-700 text-sm">Retry mechanisms ensure you use your full rate limit quota</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <Clock className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Avoid Account Suspension</h3>
                <p className="text-gray-700 text-sm">Proper handling prevents repeated violations that could suspend access</p>
              </div>
            </div>
          </section>

          {/* Best Practices */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices for Rate Limit Handling</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Always Use Exponential Backoff</h3>
                  <p className="text-gray-700 text-sm">Gradually increase wait times to avoid overwhelming the API server</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Respect Retry-After Headers</h3>
                  <p className="text-gray-700 text-sm">Use the exact wait time provided by the API when available</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <CheckCircle className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Set Maximum Retry Limits</h3>
                  <p className="text-gray-700 text-sm">Prevent infinite retry loops by setting a maximum number of attempts</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <CheckCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Monitor Rate Limit Headers</h3>
                  <p className="text-gray-700 text-sm">Track X-RateLimit-Remaining to proactively slow down requests</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Implement Circuit Breakers</h3>
                  <p className="text-gray-700 text-sm">Stop making requests temporarily if rate limits are consistently hit</p>
                </div>
              </div>
            </div>
          </section>

          <FAQSchema
            faqs={[
              {
                question: 'What is exponential backoff?',
                answer: 'Exponential backoff is a retry strategy where wait times double after each failed attempt (1s, 2s, 4s, 8s...). This prevents overwhelming the API server and gives it time to recover.',
              },
              {
                question: 'How do I know when a rate limit resets?',
                answer: 'Check the X-RateLimit-Reset header (Unix timestamp) or Retry-After header (seconds). Use these values to calculate when you can retry the request.',
              },
              {
                question: 'Should I retry all 429 errors?',
                answer: 'Yes, but with limits. Use exponential backoff and set a maximum retry count (typically 3-5 attempts). Some 429 errors may persist if you\'re truly over the limit.',
              },
              {
                question: 'What is the difference between rate limiting and throttling?',
                answer: 'Rate limiting rejects requests when limits are exceeded (429 status). Throttling slows down requests but still processes them. Both protect API resources.',
              },
              {
                question: 'How can I prevent hitting rate limits?',
                answer: 'Monitor X-RateLimit-Remaining headers, implement request queuing, cache responses when possible, and use webhooks instead of polling when available.',
              },
            ]}
          />
        </article>

        {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare
            title="How to Handle API Rate Limits Gracefully in Production"
            description="Learn how to handle API rate limits with exponential backoff, retry strategies, and best practices."
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
