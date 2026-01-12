'use client';

import Link from 'next/link';
import { ArrowLeft, AlertTriangle, Info, Shield, FileText } from 'lucide-react';

export default function DisclaimerClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Disclaimer</h1>
          <p className="text-sm text-gray-500 mt-1">Important information about our tools and services</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-5 rounded-r-lg mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-900 mb-1">Important Notice</p>
                  <p className="text-yellow-800 text-sm">
                    Please read this disclaimer carefully before using UnblockDevs tools and services. 
                    By using our Service, you acknowledge that you have read, understood, and agree to this disclaimer.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              This disclaimer governs your use of <strong>UnblockDevs</strong> and all tools, content, and services provided on this website. 
              By accessing or using our Service, you accept and agree to be bound by the terms of this disclaimer.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              1. No Warranty or Guarantee
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>ALL TOOLS AND SERVICES ON UNBLOCKDEVS ARE PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED.</strong> 
              We make no representations or warranties regarding:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>The accuracy, completeness, or reliability of any tool output</li>
              <li>The suitability of tools for your specific use case or requirements</li>
              <li>The uninterrupted or error-free operation of our Service</li>
              <li>The security of data processed through our tools</li>
              <li>The compatibility of tool output with your systems or applications</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              While we strive to provide accurate and reliable tools, you should always verify the output of our tools, especially 
              when using them in production environments or with sensitive data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-600" />
              2. Tool Accuracy and Limitations
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our tools are designed to assist developers, but they may not be suitable for all scenarios. Important limitations include:
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">JSON Tools</h3>
                <p className="text-sm text-gray-700">
                  JSON formatters, validators, and converters follow standard JSON specifications, but may not handle all edge cases 
                  or non-standard JSON variations. Always validate critical JSON in your development environment.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">Code Conversion Tools</h3>
                <p className="text-sm text-gray-700">
                  cURL to code converters and similar tools generate code based on standard patterns. Generated code may require 
                  manual adjustments for authentication, headers, or specific API requirements.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">Schema Generation</h3>
                <p className="text-sm text-gray-700">
                  Schema generators create schemas based on sample data. These schemas should be reviewed and refined to match 
                  your exact requirements and validation rules.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-green-600" />
              3. Data Privacy and Security
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              While we process all data locally in your browser and do not transmit your data to our servers, you acknowledge that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>You are responsible for the security of your own device and browser</li>
              <li>We cannot guarantee protection against browser vulnerabilities or malware</li>
              <li>You should not use our tools with highly sensitive or confidential data without proper security measures</li>
              <li>We are not responsible for any data loss or security breaches on your end</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              For more information about how we handle data, please review our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-purple-600" />
              4. Third-Party Content and Links
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website may contain links to third-party websites, services, or content. We disclaim all responsibility for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>The accuracy, completeness, or reliability of third-party content</li>
              <li>The privacy practices or policies of third-party websites</li>
              <li>Any damages or losses resulting from your use of third-party services</li>
              <li>The availability or functionality of linked websites</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Links to third-party sites are provided for convenience only and do not constitute endorsement of those sites or their content.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Educational Content Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our blog posts, tutorials, and educational content are provided for informational purposes only. We make no representations that:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>The information is complete, accurate, or up-to-date</li>
              <li>The methods or solutions will work for your specific situation</li>
              <li>The content constitutes professional advice or recommendations</li>
              <li>Following our guides will guarantee specific results</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Always verify information and test solutions in your own development environment before implementing them in production.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To the fullest extent permitted by law, UnblockDevs, its operators, and contributors shall not be liable for any direct, 
              indirect, incidental, special, consequential, or punitive damages arising from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>Your use or inability to use our tools or Service</li>
              <li>Errors, omissions, or inaccuracies in tool output or content</li>
              <li>Loss of data, profits, or business opportunities</li>
              <li>Any damages resulting from reliance on our tools or content</li>
              <li>Technical failures, interruptions, or service unavailability</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Our total liability for any claims related to the Service shall not exceed zero dollars ($0.00), as our Service is provided free of charge.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Professional Advice</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Our tools and content do not constitute professional, legal, financial, or technical advice.</strong> While we provide 
              developer tools and educational content, you should:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>Consult with qualified professionals for critical decisions</li>
              <li>Verify all tool output and recommendations independently</li>
              <li>Test solutions thoroughly in your own environment</li>
              <li>Not rely solely on our tools for production-critical tasks without proper validation</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Service Availability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We strive to maintain high availability of our Service, but we do not guarantee:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>Uninterrupted or error-free access to our tools</li>
              <li>Continuous availability of all features</li>
              <li>Compatibility with all browsers or devices</li>
              <li>Support for all data formats or edge cases</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any part of the Service at any time without prior notice.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. User Responsibility</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You are solely responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 mb-4">
              <li>Verifying the accuracy and suitability of tool output for your needs</li>
              <li>Ensuring compliance with applicable laws and regulations</li>
              <li>Protecting your data and maintaining security on your end</li>
              <li>Backing up important data before using our tools</li>
              <li>Testing and validating all outputs in your development environment</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We reserve the right to modify this disclaimer at any time. Changes will be effective immediately upon posting on this page. 
              Your continued use of the Service after changes constitutes acceptance of the updated disclaimer.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We encourage you to review this disclaimer periodically to stay informed about how we operate and what limitations apply.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about this disclaimer, please contact us through our <Link href="/contact" className="text-blue-600 hover:underline">Contact page</Link> 
              or use the feedback form available on our blog posts and tool pages.
            </p>
          </section>

          <section>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Related Pages</h3>
              <div className="flex flex-wrap gap-3">
                <Link href="/terms" className="text-blue-600 hover:underline text-sm">Terms & Conditions</Link>
                <span className="text-gray-300">•</span>
                <Link href="/privacy-policy" className="text-blue-600 hover:underline text-sm">Privacy Policy</Link>
                <span className="text-gray-300">•</span>
                <Link href="/contact" className="text-blue-600 hover:underline text-sm">Contact Us</Link>
                <span className="text-gray-300">•</span>
                <Link href="/about" className="text-blue-600 hover:underline text-sm">About Us</Link>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
