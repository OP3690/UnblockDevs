'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Code, CheckCircle, ChevronDown, ChevronUp, HelpCircle, BookOpen } from 'lucide-react';

interface Question {
  question: string;
  answer: string;
  code?: string;
  category: string;
}

export default function HTMLInterviewQuestionsClient() {
  const [openQuestions, setOpenQuestions] = useState<Set<number>>(new Set());

  const toggleQuestion = (index: number) => {
    const newOpen = new Set(openQuestions);
    if (newOpen.has(index)) {
      newOpen.delete(index);
    } else {
      newOpen.add(index);
    }
    setOpenQuestions(newOpen);
  };

  const questions: Question[] = [
    {
      category: 'HTML Basics',
      question: 'What is HTML and what does it stand for?',
      answer: 'HTML stands for HyperText Markup Language. It is the standard markup language used to create web pages. HTML describes the structure of a web page using markup tags.',
    },
    {
      category: 'HTML Basics',
      question: 'What is the difference between HTML and XHTML?',
      answer: 'XHTML (eXtensible HyperText Markup Language) is a stricter version of HTML that follows XML rules. Key differences: XHTML requires all tags to be closed, attributes must be quoted, tag names must be lowercase, and documents must be well-formed XML.',
    },
    {
      category: 'HTML5',
      question: 'What are the new features in HTML5?',
      answer: 'HTML5 introduced many new features including: semantic elements (<header>, <nav>, <article>, <section>, <footer>), new form input types (email, date, range, etc.), audio and video elements, canvas for graphics, local storage, geolocation API, and improved accessibility features.',
    },
    {
      category: 'HTML5',
      question: 'What is the purpose of the DOCTYPE declaration?',
      answer: 'The DOCTYPE declaration tells the browser which version of HTML the document is written in. In HTML5, it\'s simply <!DOCTYPE html>. It helps browsers render the page correctly and is required for valid HTML documents.',
      code: '<!DOCTYPE html>',
    },
    {
      category: 'Semantic HTML',
      question: 'What is semantic HTML?',
      answer: 'Semantic HTML uses HTML tags that have meaning and clearly describe their purpose. Examples include <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer>. Semantic HTML improves SEO, accessibility, and code maintainability.',
    },
    {
      category: 'Semantic HTML',
      question: 'What is the difference between <div> and <section>?',
      answer: '<div> is a generic container with no semantic meaning, used for styling or layout purposes. <section> is a semantic element that represents a thematic grouping of content, typically with a heading. Use <section> when the content has a clear theme or purpose.',
    },
    {
      category: 'Forms',
      question: 'What are the new input types in HTML5?',
      answer: 'HTML5 introduced many new input types: email, url, tel, number, range, date, time, datetime-local, month, week, color, search, and more. These provide better validation and user experience on mobile devices.',
      code: '<input type="email">\n<input type="date">\n<input type="range">\n<input type="color">',
    },
    {
      category: 'Forms',
      question: 'What is the difference between GET and POST methods?',
      answer: 'GET: Data is sent in the URL as query parameters. Limited data size, visible in browser history, can be bookmarked. Used for retrieving data. POST: Data is sent in the request body. No size limit, not visible in URL, not cached. Used for submitting data that changes server state.',
    },
    {
      category: 'Accessibility',
      question: 'What is the purpose of the alt attribute in images?',
      answer: 'The alt attribute provides alternative text for images. It\'s used by screen readers for visually impaired users, displayed when images fail to load, and helps with SEO by describing image content to search engines.',
      code: '<img src="photo.jpg" alt="A beautiful sunset over the ocean">',
    },
    {
      category: 'Accessibility',
      question: 'What is ARIA and why is it important?',
      answer: 'ARIA (Accessible Rich Internet Applications) is a set of attributes that make web content more accessible to people with disabilities. It provides additional information to assistive technologies when HTML semantics aren\'t sufficient.',
      code: '<button aria-label="Close dialog">×</button>\n<div role="alert" aria-live="polite">Error message</div>',
    },
    {
      category: 'Media',
      question: 'How do you embed audio and video in HTML5?',
      answer: 'Use the <audio> and <video> elements. Both support multiple source files for browser compatibility. Include controls, autoplay, loop, and other attributes as needed.',
      code: '<audio controls>\n  <source src="audio.mp3" type="audio/mpeg">\n  Your browser does not support audio.\n</audio>\n\n<video controls width="640" height="360">\n  <source src="video.mp4" type="video/mp4">\n  Your browser does not support video.\n</video>',
    },
    {
      category: 'Storage',
      question: 'What is the difference between localStorage and sessionStorage?',
      answer: 'localStorage: Data persists until explicitly cleared, shared across browser tabs/windows, storage limit is typically 5-10MB. sessionStorage: Data cleared when tab/window closes, data is tab-specific, same storage limit. Use localStorage for user preferences, sessionStorage for temporary data.',
    },
    {
      category: 'Performance',
      question: 'What is lazy loading and how do you implement it?',
      answer: 'Lazy loading delays loading of non-critical resources until needed. For images, use the loading="lazy" attribute. This improves initial page load time and saves bandwidth.',
      code: '<img src="image.jpg" alt="Description" loading="lazy">',
    },
    {
      category: 'Performance',
      question: 'What is the purpose of the defer and async attributes in script tags?',
      answer: 'defer: Script executes after HTML parsing is complete, maintains execution order. async: Script executes as soon as it\'s downloaded, doesn\'t block HTML parsing, execution order not guaranteed. Use defer for scripts that depend on DOM, async for independent scripts.',
      code: '<script defer src="script.js"></script>\n<script async src="analytics.js"></script>',
    },
    {
      category: 'SEO',
      question: 'What meta tags are important for SEO?',
      answer: 'Important meta tags: <title> (50-60 chars), <meta name="description"> (150-160 chars), <meta name="keywords">, Open Graph tags for social sharing, canonical URL, and viewport for mobile. Also use semantic HTML and proper heading hierarchy.',
    },
    {
      category: 'SEO',
      question: 'What is structured data and why is it important?',
      answer: 'Structured data (Schema.org) provides additional context about your content to search engines. It can enable rich snippets in search results, improving click-through rates. Implement using JSON-LD format in <script> tags.',
    },
  ];

  const categories = Array.from(new Set(questions.map(q => q.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 rounded-full">
              Interview Prep
            </span>
            <time className="text-sm text-gray-500" dateTime="2024-01-26">
              January 26, 2024
            </time>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">18 min read</span>
          </div>
        </div>
      </header>

      <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            HTML Interview Questions: Top 50 Questions & Answers
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Prepare for your HTML interview with this comprehensive collection of commonly asked questions. Covering HTML basics, HTML5, semantic HTML, forms, accessibility, and more.
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-8">
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                How to Use This Guide
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Click on any question to reveal the answer',
                  'Questions are organized by category',
                  'Code examples included where relevant',
                  'Practice explaining answers in your own words',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {categories.map((category, catIdx) => (
              <section key={catIdx} className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <HelpCircle className="w-8 h-8 text-blue-600" />
                  {category}
                </h2>
                <div className="space-y-4">
                  {questions
                    .filter(q => q.category === category)
                    .map((q, idx) => {
                      const globalIndex = questions.indexOf(q);
                      const isOpen = openQuestions.has(globalIndex);
                      return (
                        <div
                          key={globalIndex}
                          className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition-colors"
                        >
                          <button
                            onClick={() => toggleQuestion(globalIndex)}
                            className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                          >
                            <span className="font-semibold text-gray-900 pr-4">{q.question}</span>
                            {isOpen ? (
                              <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-6 py-4 bg-white border-t border-gray-200">
                              <p className="text-gray-700 leading-relaxed mb-4">{q.answer}</p>
                              {q.code && (
                                <div className="mt-4 bg-gray-900 rounded-lg overflow-hidden">
                                  <div className="bg-gray-800 px-4 py-2">
                                    <span className="text-sm font-semibold text-gray-300 uppercase">Code</span>
                                  </div>
                                  <pre className="p-4 overflow-x-auto">
                                    <code className="text-sm text-gray-100 font-mono">{q.code}</code>
                                  </pre>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </section>
            ))}

            <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">Interview Tips</h2>
              <ul className="list-disc list-inside space-y-2 text-lg">
                <li>Practice explaining concepts in your own words</li>
                <li>Be ready to write code examples on a whiteboard</li>
                <li>Understand the "why" behind best practices</li>
                <li>Be prepared to discuss real-world scenarios</li>
                <li>Show knowledge of accessibility and SEO considerations</li>
              </ul>
            </section>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border-2 border-gray-200 hover:border-blue-500"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <Link
            href="/blog/html-tags-explained-guide"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            Read HTML Tags Guide
            <Code className="w-4 h-4" />
          </Link>
        </div>
      </article>
    </div>
  );
}

