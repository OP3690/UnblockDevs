'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export default function TermsClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Terms & Conditions</h1>
          <p className="text-sm text-gray-500 mt-1">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Welcome to <strong>UnblockDevs</strong>. These Terms and Conditions ("Terms") govern your access to and use of our website, 
              tools, and services (collectively, the "Service"). By accessing or using our Service, you agree to be bound by these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you do not agree to these Terms, please do not use our Service. We reserve the right to modify these Terms at any time, 
              and your continued use of the Service after such modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing or using UnblockDevs, you acknowledge that you have read, understood, and agree to be bound by these Terms 
              and our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>. If you are using 
              our Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-600" />
              2. Description of Service
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              UnblockDevs provides free, online developer tools and utilities, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>JSON formatting, validation, and conversion tools</li>
              <li>API testing and debugging utilities</li>
              <li>Code conversion tools (cURL to various formats)</li>
              <li>Schema generation and validation tools</li>
              <li>Educational blog content and tutorials</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              All tools process data locally in your browser. We do not store, transmit, or access your data on our servers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-600" />
              3. Use of Service
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Permitted Use</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  You may use our Service for lawful purposes only. You agree to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Use the tools for legitimate development and testing purposes</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not attempt to reverse engineer or compromise our Service</li>
                  <li>Not use automated systems to abuse or overload our Service</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Prohibited Use</h3>
                <p className="text-gray-700 leading-relaxed mb-2">
                  You agree NOT to:
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                  <li>Use the Service for any illegal or unauthorized purpose</li>
                  <li>Transmit viruses, malware, or harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Use the Service to violate any laws or regulations</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              4. Disclaimer of Warranties
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.</strong> 
              To the fullest extent permitted by law, UnblockDevs disclaims all warranties, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>Warranties of merchantability, fitness for a particular purpose, and non-infringement</li>
              <li>Warranties that the Service will be uninterrupted, secure, or error-free</li>
              <li>Warranties regarding the accuracy, reliability, or completeness of any information provided</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              You use the Service at your own risk. We do not guarantee that the tools will produce error-free results or meet your specific requirements.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the maximum extent permitted by law, UnblockDevs and its operators shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, including but not limited to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>Loss of profits, data, or business opportunities</li>
              <li>Damages resulting from use or inability to use the Service</li>
              <li>Errors or omissions in the Service or content</li>
              <li>Any damages exceeding the amount you paid to use the Service (which is $0 for our free tools)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Our total liability for any claims related to the Service shall not exceed zero dollars ($0.00).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              All content, tools, code, and materials on UnblockDevs, including but not limited to text, graphics, logos, icons, 
              and software, are the property of UnblockDevs or its content suppliers and are protected by copyright, trademark, 
              and other intellectual property laws.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You may not reproduce, distribute, modify, or create derivative works from any content on our Service without express 
              written permission. However, you are free to use the output generated by our tools for your own projects.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Privacy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Your privacy is important to us. Please review our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>, 
              which explains how we collect, use, and protect your information when you use our Service.
            </p>
            <p className="text-gray-700 leading-relaxed">
              All data processing for our tools happens locally in your browser. We do not store, transmit, or access your data on our servers.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our Service may contain links to third-party websites or services that are not owned or controlled by UnblockDevs. 
              We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You acknowledge and agree that UnblockDevs shall not be responsible or liable for any damage or loss caused by your use 
              of any third-party service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to terminate or suspend your access to the Service at any time, without prior notice, for any reason, 
              including but not limited to violation of these Terms.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Upon termination, your right to use the Service will immediately cease. All provisions of these Terms that by their nature 
              should survive termination shall survive, including ownership provisions, warranty disclaimers, and limitations of liability.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify or replace these Terms at any time. If we make material changes, we will update the 
              "Last updated" date at the top of this page.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Your continued use of the Service after any changes constitutes acceptance of the new Terms. If you do not agree to the 
              new Terms, please discontinue use of the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law provisions. 
              Any disputes arising from these Terms or your use of the Service shall be resolved through appropriate legal channels.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us through our <Link href="/contact" className="text-blue-600 hover:underline">Contact page</Link> 
              or use the feedback form available on our blog posts and tool pages.
            </p>
          </section>

          <section>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Related Pages</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/privacy-policy" className="text-blue-600 hover:underline text-sm">Privacy Policy</Link>
                <span className="text-gray-300">•</span>
                <Link href="/contact" className="text-blue-600 hover:underline text-sm">Contact Us</Link>
                <span className="text-gray-300">•</span>
                <Link href="/about" className="text-blue-600 hover:underline text-sm">About Us</Link>
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
