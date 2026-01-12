'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, HelpCircle, FileText, Heart } from 'lucide-react';

export default function ContactClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-sm text-gray-500 mt-1">We'd love to hear from you</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              At <strong>UnblockDevs</strong>, we're committed to providing the best free developer tools and resources. 
              Whether you have a question, suggestion, bug report, or just want to say hello, we're here to help.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your feedback helps us improve our tools and create better experiences for developers worldwide. 
              We read every message and appreciate your input.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ways to Reach Us</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                <Mail className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">General Inquiries</h3>
                <p className="text-sm text-gray-700 mb-3">
                  For general questions, partnerships, or business inquiries, please use the feedback form on any blog post or tool page.
                </p>
                <p className="text-xs text-gray-600">
                  We typically respond within 2-3 business days.
                </p>
              </div>

              <div className="p-6 bg-green-50 rounded-lg border border-green-200">
                <MessageSquare className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Feedback & Suggestions</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Found a bug? Have a feature request? Use the feedback widget on any page or submit feedback through our blog posts.
                </p>
                <p className="text-xs text-gray-600">
                  Your suggestions help us prioritize improvements.
                </p>
              </div>

              <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                <HelpCircle className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Technical Support</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Need help using our tools? Check our blog posts for tutorials, or use the feedback form to report issues.
                </p>
                <p className="text-xs text-gray-600">
                  Most questions are answered in our blog guides.
                </p>
              </div>

              <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
                <FileText className="w-8 h-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Content & Partnerships</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Interested in guest posts, collaborations, or content partnerships? We're open to working with the developer community.
                </p>
                <p className="text-xs text-gray-600">
                  Let's build something great together.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Submit Feedback</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Navigate to Any Tool or Blog Post</h3>
                  <p className="text-gray-700 text-sm">Visit any of our <Link href="/" className="text-blue-600 hover:underline">developer tools</Link> or <Link href="/blog" className="text-blue-600 hover:underline">blog posts</Link>.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Find the Feedback Section</h3>
                  <p className="text-gray-700 text-sm">Scroll to the bottom of the page to find the "Feedback" card with a chat bubble icon.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fill Out the Form</h3>
                  <p className="text-gray-700 text-sm">Select a category (General Feedback, Bug Report, Feature Request, etc.), add your message, and optionally include your name and email.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">4</div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Submit and Wait for Response</h3>
                  <p className="text-gray-700 text-sm">We review all feedback and respond to important inquiries within 2-3 business days.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Heart className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">We Value Your Input</h2>
                <p className="text-blue-100">
                  Every suggestion, bug report, and feature request helps us build better tools for developers worldwide. 
                  Thank you for being part of the UnblockDevs community!
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-1">How quickly will I receive a response?</h3>
                <p className="text-gray-700 text-sm">We aim to respond to all inquiries within 2-3 business days. For urgent technical issues, we prioritize bug reports.</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-1">Do you offer paid support or custom development?</h3>
                <p className="text-gray-700 text-sm">Currently, all our tools are free. For custom development or enterprise solutions, please reach out through the feedback form.</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-1">Can I contribute to UnblockDevs?</h3>
                <p className="text-gray-700 text-sm">We're always open to collaboration! Use the feedback form to propose contributions, guest posts, or partnerships.</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-gray-900 mb-1">Where can I report security issues?</h3>
                <p className="text-gray-700 text-sm">Security is important to us. Please use the feedback form and select "Bug Report" category, and we'll address it promptly.</p>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Related Pages</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/about" className="text-blue-600 hover:underline text-sm">About Us</Link>
                <span className="text-gray-300">•</span>
                <Link href="/privacy-policy" className="text-blue-600 hover:underline text-sm">Privacy Policy</Link>
                <span className="text-gray-300">•</span>
                <Link href="/terms" className="text-blue-600 hover:underline text-sm">Terms & Conditions</Link>
                <span className="text-gray-300">•</span>
                <Link href="/blog" className="text-blue-600 hover:underline text-sm">Blog</Link>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
