'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, FileText } from 'lucide-react';

export default function PrivacyPolicyClient() {
  useEffect(() => {
    // Load Ezoic privacy policy content dynamically
    if (typeof window !== 'undefined') {
      const loadEzoicPrivacy = async () => {
        try {
          const response = await fetch('http://g.ezoic.net/privacy/unblockdevs.com');
          if (response.ok) {
            const html = await response.text();
            const embedElement = document.getElementById('ezoic-privacy-policy-embed');
            if (embedElement) {
              embedElement.innerHTML = html;
            }
          }
        } catch (error) {
          console.debug('Could not load Ezoic privacy policy:', error);
          // Fallback content is already in the HTML
        }
      };
      
      loadEzoicPrivacy();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
              <p className="text-sm text-gray-500 mt-1">Last updated: January 30, 2025</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                At UnblockDevs ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>unblockdevs.com</strong> (the "Service").
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-blue-600" />
                1. Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">1.1 Information You Provide</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We collect information that you voluntarily provide when using our Service, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>JSON data that you input into our developer tools</li>
                <li>Any data you paste or upload to our tools</li>
                <li>Feedback or communications you send to us</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">1.2 Automatically Collected Information</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                When you visit our Service, we automatically collect certain information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, and navigation patterns</li>
                <li><strong>Device Information:</strong> Browser type, device type, operating system, and screen resolution</li>
                <li><strong>IP Address:</strong> Your Internet Protocol address for analytics and security purposes</li>
                <li><strong>Cookies and Tracking Technologies:</strong> As described in our Cookie Policy below</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We use the collected information for various purposes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>To provide, maintain, and improve our Service</li>
                <li>To process your requests and provide developer tools functionality</li>
                <li>To analyze usage patterns and optimize user experience</li>
                <li>To detect, prevent, and address technical issues</li>
                <li>To comply with legal obligations</li>
                <li>To personalize your experience on our Service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Processing and Storage</h2>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg my-4">
                <p className="text-gray-700 font-semibold mb-2">🔒 Important: Client-Side Processing</p>
                <p className="text-gray-700 text-sm">
                  Most of our developer tools process data entirely in your browser. Your JSON data, files, and inputs are processed locally on your device and are <strong>never sent to our servers</strong>. This ensures maximum privacy and security for your data.
                </p>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We store minimal data on our servers:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Analytics data (anonymized and aggregated)</li>
                <li>Session information for website functionality</li>
                <li>Error logs (without personal information)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Services and Advertising</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.1 Ezoic Advertising</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our website uses Ezoic to provide advertising services. Ezoic may collect and use information about your visits to this and other websites to provide relevant advertisements. For more information about Ezoic's data practices, please visit: <a href="https://www.ezoic.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ezoic Privacy Policy</a>
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Ezoic uses cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li>Deliver personalized advertisements</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Optimize ad placement and performance</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.2 Google Analytics</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We use Google Analytics to understand how visitors interact with our website. Google Analytics uses cookies to collect information such as how often users visit our site, what pages they visit, and what other sites they used prior to coming to our site. For more information, please visit: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Privacy Policy</a>
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">4.3 Google AdSense</h3>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We use Google AdSense to display advertisements. Google AdSense uses cookies and web beacons to serve ads based on your prior visits to our website and other websites. You can opt out of personalized advertising by visiting: <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Ad Settings</a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
              </p>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Types of cookies we use:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our website</li>
                <li><strong>Advertising Cookies:</strong> Used to deliver relevant advertisements</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
              </ul>
              <p className="text-gray-700 mb-4 leading-relaxed">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Privacy Rights</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                <li><strong>Right to Access:</strong> Request a copy of the personal information we hold about you</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete information</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your personal information</li>
                <li><strong>Right to Restrict Processing:</strong> Request limitation of how we process your information</li>
                <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service</li>
                <li><strong>Right to Object:</strong> Object to processing of your personal information</li>
                <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for data processing at any time</li>
              </ul>
              <p className="text-gray-700 mb-4 leading-relaxed">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Security</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our Service, you consent to the transfer of your information to our facilities and those third parties with whom we share it as described in this Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <p className="text-gray-700 mb-2">
                  <strong>Website:</strong> <a href="https://unblockdevs.com" className="text-blue-600 hover:underline">unblockdevs.com</a>
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> <a href="mailto:privacy@unblockdevs.com" className="text-blue-600 hover:underline">privacy@unblockdevs.com</a>
                </p>
              </div>
            </section>

            <section className="mb-8 bg-blue-50 border-l-4 border-blue-500 p-5 rounded-r-lg">
              <h2 className="text-xl font-bold text-gray-900 mb-3">Ezoic Privacy Disclosures</h2>
              <p className="text-gray-700 mb-4 leading-relaxed text-sm">
                This website uses Ezoic to provide advertising services. The following disclosures are required by Ezoic and detail how Ezoic and its partners use information, including a list of known cookies used on this site.
              </p>
              
              {/* Ezoic Privacy Policy Embed - This will be populated by Ezoic's privacy policy content */}
              <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
                <div 
                  id="ezoic-privacy-policy-embed"
                  className="prose prose-sm max-w-none text-gray-700"
                >
                  <p className="text-gray-700 mb-3">
                    <strong>Ezoic Privacy Policy Disclosures</strong>
                  </p>
                  <p className="text-gray-700 mb-3 text-sm">
                    This website uses Ezoic to provide advertising services. Ezoic and its partners may use cookies, web beacons, and similar technologies to collect information about your visits to this and other websites to provide personalized advertisements and improve user experience.
                  </p>
                  <p className="text-gray-700 mb-3 text-sm">
                    For detailed information about Ezoic's privacy practices, data collection, cookie usage, and a complete list of partners and cookies, please visit:
                  </p>
                  <p className="text-gray-700 mb-4">
                    <a 
                      href="http://g.ezoic.net/privacy/unblockdevs.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Ezoic Privacy Policy for unblockdevs.com →
                    </a>
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-gray-700 mb-2 text-sm font-semibold">Additional Ezoic Resources:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                      <li><a href="https://www.ezoic.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ezoic Privacy Policy</a></li>
                      <li><a href="https://www.ezoic.com/terms-of-service/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Ezoic Terms of Service</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-8 flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}

