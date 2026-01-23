'use client';

import Link from 'next/link';
import { Shield, Zap, CheckCircle, Code, Heart, Mail, Users, Target, Globe, Lock, Rocket, Award, TrendingUp, BookOpen, Lightbulb } from 'lucide-react';

export default function AboutClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">About UnblockDevs</h1>
          <p className="text-sm text-gray-500 mt-1">Free Developer Tools - Privacy-Focused & No Signup Required</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>UnblockDevs</strong> is a comprehensive collection of free, privacy-focused developer tools designed to help developers 
              work more efficiently without compromising their privacy or requiring signups. Founded with the vision of making professional-grade 
              development tools accessible to everyone, we've built a platform that processes all data locally in your browser, ensuring your code, 
              JSON, API responses, and sensitive information never leave your device.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our mission is to democratize access to high-quality developer tools while maintaining the highest standards of privacy and security. 
              We believe that developers shouldn't have to choose between powerful tools and privacy, and that essential utilities shouldn't require 
              account creation, credit cards, or data sharing.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Since our launch, UnblockDevs has served millions of developers worldwide, processing billions of operations entirely in users' browsers. 
              We've grown from a simple JSON formatter to a comprehensive suite of 19+ professional tools covering JSON processing, API testing, 
              code conversion, data analysis, and more.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission & Vision</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  Our Mission
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  To provide free, privacy-first developer tools that empower developers to work efficiently without compromising their data security 
                  or requiring unnecessary account creation. We aim to eliminate barriers to productivity while maintaining the highest standards of 
                  privacy and user experience.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We believe that essential developer tools should be accessible to everyone, regardless of budget, location, or organizational affiliation. 
                  Our mission is to level the playing field by providing professional-grade tools that work entirely in the browser, ensuring complete 
                  privacy and zero data transmission.
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  Our Vision
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  To become the most trusted and comprehensive platform for privacy-focused developer tools, serving millions of developers worldwide 
                  with reliable, fast, and secure utilities that enhance productivity without compromising privacy.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We envision a future where developers can access all the tools they need without worrying about data privacy, account management, 
                  or subscription fees. Our vision extends beyond tools to include comprehensive educational content, best practices, and a thriving 
                  developer community.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Principles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <Shield className="w-6 h-6 text-blue-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Privacy First</h3>
                <p className="text-gray-700 text-sm">
                  All processing happens in your browser. Your data never leaves your device, ensuring maximum privacy and security.
                </p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <Zap className="w-6 h-6 text-green-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">No Signup Required</h3>
                <p className="text-gray-700 text-sm">
                  Start using tools immediately without creating accounts, providing emails, or dealing with password management.
                </p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <CheckCircle className="w-6 h-6 text-purple-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">100% Free Forever</h3>
                <p className="text-gray-700 text-sm">
                  No freemium models, no usage limits, no credit card required. These tools are free to use without restrictions.
                </p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <Code className="w-6 h-6 text-orange-600 mb-2" />
                <h3 className="font-semibold text-gray-900 mb-2">Open & Transparent</h3>
                <p className="text-gray-700 text-sm">
                  We believe in transparency. All our tools are open about how they work and process your data.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Rocket className="w-8 h-8 text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              UnblockDevs was born from a simple frustration: the lack of privacy-focused, free developer tools that don't require account creation 
              or compromise user data. As developers ourselves, we experienced the pain of having to choose between powerful tools and privacy, or 
              between free tools with limitations and expensive subscriptions.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We started with a simple JSON formatter in 2024, built entirely in the browser to ensure complete privacy. The positive response from 
              the developer community encouraged us to expand, and we've since grown into a comprehensive platform with 19+ professional tools serving 
              millions of developers worldwide.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our journey has been guided by one core principle: developers deserve better. Better privacy, better tools, better experience—all without 
              the barriers of signups, subscriptions, or data sharing. Every tool we build, every feature we add, and every improvement we make is 
              driven by this principle.
            </p>
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border-2 border-purple-200 mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Key Milestones</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">19+</div>
                  <div className="text-sm text-gray-700">Professional Tools</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">Millions</div>
                  <div className="text-sm text-gray-700">Developers Served</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">Billions</div>
                  <div className="text-sm text-gray-700">Operations Processed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600 mb-1">100%</div>
                  <div className="text-sm text-gray-700">Browser-Based Processing</div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Core Values</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-center gap-3 mb-3">
                  <Lock className="w-6 h-6 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">Privacy First</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Privacy isn't optional—it's fundamental. All our tools process data entirely in your browser using client-side JavaScript. 
                  Your code, JSON, API responses, and sensitive information never leave your device. We don't track, store, or transmit your data.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  This commitment extends beyond our tools to our entire platform. We use privacy-respecting analytics, don't require account creation, 
                  and are transparent about any data we do collect (which is minimal and anonymized).
                </p>
              </div>
              <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-6 h-6 text-green-600" />
                  <h3 className="font-semibold text-gray-900">No Barriers</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  We believe essential developer tools should be accessible to everyone. No signups, no credit cards, no usage limits, no freemium 
                  models. Our tools are free forever, with all features available to all users from day one.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  This philosophy extends to our educational content, blog posts, and resources. Everything we create is freely available, designed to 
                  help developers learn, grow, and be more productive without financial barriers.
                </p>
              </div>
              <div className="p-6 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="w-6 h-6 text-purple-600" />
                  <h3 className="font-semibold text-gray-900">Quality & Reliability</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Free doesn't mean low quality. We maintain professional-grade standards for all our tools, ensuring accuracy, performance, and 
                  reliability. Our tools are built using modern web technologies, follow industry best practices, and are continuously improved.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We test our tools extensively, fix bugs promptly, and listen to user feedback to ensure our tools meet the needs of professional 
                  developers working in production environments.
                </p>
              </div>
              <div className="p-6 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-6 h-6 text-orange-600" />
                  <h3 className="font-semibold text-gray-900">Community-Driven</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  Our tools are built for the developer community, and we actively listen to feedback, feature requests, and suggestions. Many of our 
                  tools and features were inspired by user requests and community needs.
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We're committed to building tools that solve real problems for real developers. Your feedback shapes our roadmap, and we're always 
                  looking for ways to better serve the developer community.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Code className="w-8 h-8 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">Technology & Architecture</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              UnblockDevs is built using modern web technologies to ensure fast, reliable, and secure performance:
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="p-5 bg-indigo-50 rounded-lg border border-indigo-200">
                <h3 className="font-semibold text-gray-900 mb-3">Frontend Technology</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Next.js 14+</strong> - React framework for optimal performance and SEO</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span><strong>TypeScript</strong> - Type-safe development for reliability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Tailwind CSS</strong> - Modern, responsive design system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Client-Side Processing</strong> - All tools run in the browser</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-3">Privacy & Security</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Zero Data Transmission</strong> - No server-side processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>HTTPS Only</strong> - Encrypted connections for all traffic</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>No Cookies</strong> - No tracking or user identification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Open Source Libraries</strong> - Transparent, auditable code</span>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our architecture ensures that all data processing happens client-side, providing maximum privacy and security while maintaining 
              fast performance. We use modern web standards and best practices to ensure compatibility, accessibility, and optimal user experience.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-8 h-8 text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Our Comprehensive Tool Suite</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              UnblockDevs provides a comprehensive suite of 19+ free developer tools covering various aspects of development:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">JSON Tools</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><Link href="/json-beautifier" className="text-blue-600 hover:underline">JSON Beautifier</Link> - Format and prettify JSON</li>
                  <li><Link href="/json-fixer-online" className="text-blue-600 hover:underline">JSON Fixer</Link> - Fix broken JSON automatically</li>
                  <li><Link href="/json-validator" className="text-blue-600 hover:underline">JSON Validator</Link> - Validate JSON syntax</li>
                  <li><Link href="/json-comparator" className="text-blue-600 hover:underline">JSON Comparator</Link> - Compare two JSON objects</li>
                  <li><Link href="/json-schema-generation" className="text-blue-600 hover:underline">JSON Schema Generator</Link> - Generate schemas from JSON</li>
                  <li><Link href="/" className="text-blue-600 hover:underline">JSON to Excel</Link> - Convert JSON to spreadsheets</li>
                </ul>
              </div>
              <div className="p-5 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">API & Network Tools</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><Link href="/api-comparator" className="text-blue-600 hover:underline">API Comparator</Link> - Compare API responses</li>
                  <li><Link href="/har-to-curl" className="text-blue-600 hover:underline">HAR to cURL</Link> - Convert HAR files to cURL</li>
                  <li><Link href="/curl-converter" className="text-blue-600 hover:underline">cURL Converter</Link> - Convert cURL to code</li>
                  <li><Link href="/mock-api-generator" className="text-blue-600 hover:underline">Mock API Generator</Link> - Generate mock endpoints</li>
                  <li><Link href="/payload-analyzer" className="text-blue-600 hover:underline">Payload Analyzer</Link> - Analyze API payloads</li>
                </ul>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Code & Data Tools</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><Link href="/log-explorer" className="text-blue-600 hover:underline">Log Explorer</Link> - Explore and analyze logs</li>
                  <li><Link href="/sql-formatter" className="text-blue-600 hover:underline">SQL Formatter</Link> - Format SQL queries</li>
                  <li><Link href="/json-builder" className="text-blue-600 hover:underline">JSON Builder</Link> - Build JSON interactively</li>
                  <li><Link href="/test-data-generator" className="text-blue-600 hover:underline">Test Data Generator</Link> - Generate test data</li>
                  <li><Link href="/config-comparator" className="text-blue-600 hover:underline">Config Comparator</Link> - Compare configurations</li>
                </ul>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">AI & Specialized Tools</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><Link href="/prompt-chunker" className="text-blue-600 hover:underline">Prompt Chunker</Link> - Split AI prompts</li>
                  <li><Link href="/token-comparator" className="text-blue-600 hover:underline">Token Comparator</Link> - Compare tokens</li>
                  <li><Link href="/timezone-translator" className="text-blue-600 hover:underline">Timezone Translator</Link> - Convert timezones</li>
                  <li><Link href="/data-insights" className="text-blue-600 hover:underline">Data Insights</Link> - Analyze data patterns</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              All our tools work entirely in your browser, ensuring complete privacy and security. No data is sent to our servers, no tracking occurs, 
              and all processing happens locally on your device. This means you can use our tools with sensitive data, proprietary code, and confidential 
              information without any privacy concerns.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Impact & Community</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Since our launch, UnblockDevs has made a significant impact on the developer community:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-5 bg-emerald-50 rounded-lg text-center border border-emerald-200">
                <div className="text-3xl font-bold text-emerald-600 mb-2">Millions</div>
                <div className="text-sm text-gray-700">Developers Served</div>
              </div>
              <div className="p-5 bg-blue-50 rounded-lg text-center border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">Billions</div>
                <div className="text-sm text-gray-700">Operations Processed</div>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg text-center border border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">19+</div>
                <div className="text-sm text-gray-700">Professional Tools</div>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our tools are used by developers at startups, Fortune 500 companies, educational institutions, and individual developers worldwide. 
              We've received positive feedback from developers who appreciate our privacy-first approach, comprehensive toolset, and commitment to 
              providing free, high-quality utilities.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Beyond our tools, we've created an extensive library of educational content, including 100+ blog posts covering topics from JSON 
              processing and API testing to advanced algorithms, data engineering, and AI development. Our blog serves as a comprehensive resource 
              for developers looking to learn, solve problems, and improve their skills.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-8 h-8 text-yellow-600" />
              <h2 className="text-2xl font-bold text-gray-900">Future Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              We're constantly working to improve and expand UnblockDevs. Our future plans include:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-5 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-semibold text-gray-900 mb-2">Expanding Tool Suite</h3>
                <p className="text-sm text-gray-700">
                  We're continuously adding new tools based on community feedback and developer needs. Our roadmap includes additional JSON tools, 
                  API testing utilities, code conversion tools, and specialized developer utilities.
                </p>
              </div>
              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">Enhanced Educational Content</h3>
                <p className="text-sm text-gray-700">
                  We're expanding our blog with more comprehensive guides, tutorials, and educational content covering a wide range of development 
                  topics, best practices, and industry trends.
                </p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">Performance Improvements</h3>
                <p className="text-sm text-gray-700">
                  We're continuously optimizing our tools for better performance, faster processing, and improved user experience. This includes 
                  better error handling, enhanced UI/UX, and support for larger datasets.
                </p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">Community Features</h3>
                <p className="text-sm text-gray-700">
                  We're exploring ways to better serve the developer community, including improved feedback mechanisms, community-driven feature 
                  development, and enhanced support resources.
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Our commitment remains unchanged: providing free, privacy-focused, high-quality developer tools that empower developers worldwide. 
              We're here for the long term, continuously improving and expanding to meet the evolving needs of the developer community.
            </p>
          </section>

          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-indigo-600" />
              <h2 className="text-2xl font-bold text-gray-900">How Our Tools Work</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              All UnblockDevs tools are designed with privacy and performance in mind. Here's how they work:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-5 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <h3 className="font-semibold text-gray-900 mb-2">Client-Side Processing</h3>
                <p className="text-sm text-gray-700 mb-2">
                  All data processing happens entirely in your browser using JavaScript. When you paste JSON, upload a file, or enter data, 
                  it's processed locally on your device using client-side code. No data is sent to our servers, ensuring complete privacy.
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Benefit:</strong> Your sensitive data, proprietary code, and confidential information never leave your device.
                </p>
              </div>
              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">No Tracking or Analytics</h3>
                <p className="text-sm text-gray-700 mb-2">
                  We don't track your usage, analyze your data, or collect information about what you're processing. Our tools work anonymously, 
                  respecting your privacy at every step.
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Benefit:</strong> Complete anonymity and privacy while using our tools.
                </p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">Offline Capability</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Once the page loads, our tools work offline. You can use them without an internet connection, making them perfect for 
                  development environments with restricted network access.
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Benefit:</strong> Work anywhere, even without internet connectivity.
                </p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">Fast Performance</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Since processing happens locally, there's no network latency. Our tools process data instantly, providing fast, responsive 
                  experiences even with large datasets.
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Benefit:</strong> Instant results without waiting for server responses.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Heart className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Built for Developers, by Developers</h2>
                <p className="text-blue-100 mb-4">
                  UnblockDevs is built with the developer community in mind. We understand the need for fast, reliable, and privacy-focused 
                  tools that just work. Every tool we create, every feature we add, and every improvement we make is driven by real developer 
                  needs and feedback.
                </p>
                <p className="text-blue-100">
                  We're not just building tools—we're building a platform that empowers developers to work more efficiently, learn continuously, 
                  and solve problems faster. Join millions of developers who trust UnblockDevs for their daily development needs.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Explore All Tools
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Read Our Blog
              </Link>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 border border-green-200">
            <div className="flex items-center gap-4 mb-4">
              <Mail className="w-10 h-10 text-green-600" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We'd love to hear from you! Whether you have a feature request, found a bug, have a question, or just want to share your 
                  appreciation, we're here to help. Your feedback helps us improve and build better tools for the developer community.
                </p>
                <div className="bg-white p-4 rounded-lg border border-green-200 inline-block">
                  <p className="text-gray-700">
                    <strong>Email:</strong>{' '}
                    <a 
                      href="mailto:support@unblockdevs.com" 
                      className="text-green-600 hover:text-green-700 hover:underline font-semibold"
                    >
                      support@unblockdevs.com
                    </a>
                  </p>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  You can also use the feedback form available on any tool page or blog post. We typically respond within 2-3 business days.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Related Pages</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="text-blue-600 hover:underline text-sm">Contact Us</Link>
                <span className="text-gray-300">•</span>
                <Link href="/blog" className="text-blue-600 hover:underline text-sm">Developer Blog</Link>
                <span className="text-gray-300">•</span>
                <Link href="/privacy-policy" className="text-blue-600 hover:underline text-sm">Privacy Policy</Link>
                <span className="text-gray-300">•</span>
                <Link href="/terms" className="text-blue-600 hover:underline text-sm">Terms & Conditions</Link>
                <span className="text-gray-300">•</span>
                <Link href="/disclaimer" className="text-blue-600 hover:underline text-sm">Disclaimer</Link>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
