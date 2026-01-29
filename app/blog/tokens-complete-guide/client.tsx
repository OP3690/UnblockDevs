'use client';

import Link from 'next/link';
import { ArrowLeft, Key, Shield, CheckCircle, ExternalLink, Lock, Clock, User } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function TokensCompleteGuideClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Key className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tokens Complete Guide: What, How, Why & When</h1>
              <p className="text-sm text-gray-500 mt-1">Understanding Authentication Tokens, JWT, API Keys & More</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Tokens Complete Guide: What, How, Why & When"
        description="Understanding Authentication Tokens, JWT, API Keys & More"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is a token in authentication?',
              answer: 'A token is a credential that represents a user\'s identity and permissions. Instead of sending username/password with every request, tokens allow stateless authentication. Common types include JWT tokens, API keys, OAuth tokens, and session tokens.',
            },
            {
              question: 'How do authentication tokens work?',
              answer: 'Tokens work by: 1) User authenticates with credentials, 2) Server validates and issues a token, 3) Client stores token, 4) Client sends token with each request, 5) Server validates token without checking database. This enables stateless, scalable authentication.',
            },
            {
              question: 'Why use tokens instead of passwords?',
              answer: 'Tokens provide better security (can be revoked, have expiration), enable stateless authentication (no server-side sessions), support microservices (can be validated independently), and improve scalability (no session storage needed).',
            },
            {
              question: 'When should you use tokens?',
              answer: 'Use tokens for: API authentication, mobile apps, single-page applications (SPAs), microservices architecture, third-party integrations, and when you need stateless authentication. Use sessions for traditional web apps with server-side rendering.',
            },
            {
              question: 'What is the difference between JWT and API keys?',
              answer: 'JWT tokens are self-contained (include user info, expiration, permissions) and can be validated without database lookup. API keys are simple strings that require database lookup to validate. JWTs are better for user authentication, API keys for service-to-service communication.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <p className="text-xs text-gray-500 italic mb-8 pb-6 border-b border-gray-200">
            We earn commissions when you shop through the links below.
          </p>
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Tokens</strong> are fundamental to modern authentication and authorization systems. Understanding 
              <strong> what tokens are</strong>, <strong>how they work</strong>, <strong>why they're used</strong>, and 
              <strong> when to use them</strong> is essential for building secure applications. This comprehensive guide 
              covers everything you need to know about tokens.
            </p>
            <p className="text-gray-700 leading-relaxed">
              From JWT tokens to API keys, from OAuth tokens to session tokens, we'll explore the different types of 
              tokens, their use cases, and best practices for implementation.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Tokens?</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Definition</h3>
              <p className="text-sm text-gray-700">
                A <strong>token</strong> is a credential that represents a user's identity, permissions, and session 
                information. Instead of sending username and password with every request, tokens provide a secure, 
                stateless way to authenticate and authorize users.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">Key Characteristics</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Stateless authentication</li>
                  <li>Can contain user information</li>
                  <li>Has expiration time</li>
                  <li>Can be revoked</li>
                  <li>Cryptographically signed</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">Common Types</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>JWT (JSON Web Tokens)</li>
                  <li>API Keys</li>
                  <li>OAuth Tokens</li>
                  <li>Session Tokens</li>
                  <li>Bearer Tokens</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How Do Tokens Work?</h2>
            
            <div className="space-y-6">
              <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <span className="text-blue-600 font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">User Authentication</h3>
                    <p className="text-sm text-gray-700">
                      User provides credentials (username/password) to the authentication server. Server validates 
                      credentials against database.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <span className="text-green-600 font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Token Generation</h3>
                    <p className="text-sm text-gray-700">
                      Server generates a token containing user information, permissions, and expiration time. Token is 
                      cryptographically signed to prevent tampering.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <span className="text-purple-600 font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Token Storage</h3>
                    <p className="text-sm text-gray-700">
                      Client receives token and stores it securely (localStorage, sessionStorage, httpOnly cookie, or 
                      memory). Token is sent with subsequent requests.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <span className="text-orange-600 font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Token Validation</h3>
                    <p className="text-sm text-gray-700">
                      Server validates token signature, checks expiration, and verifies permissions. No database lookup 
                      needed for stateless tokens like JWT.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <span className="text-red-600 font-bold text-lg">5</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Request Processing</h3>
                    <p className="text-sm text-gray-700">
                      If token is valid, server processes request and returns response. If invalid or expired, server 
                      returns 401 Unauthorized error.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Tokens?</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">🔒 Enhanced Security</h3>
                <p className="text-sm text-gray-700">
                  Tokens can be revoked, have expiration times, and don't expose passwords. They reduce risk of 
                  credential theft and enable fine-grained access control.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">⚡ Stateless Authentication</h3>
                <p className="text-sm text-gray-700">
                  No server-side session storage needed. Tokens are self-contained, enabling horizontal scaling and 
                  microservices architecture.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">🌐 Cross-Domain Support</h3>
                <p className="text-sm text-gray-700">
                  Tokens work across different domains and services. Perfect for single-page applications, mobile apps, 
                  and API integrations.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">📱 Mobile & SPA Friendly</h3>
                <p className="text-sm text-gray-700">
                  Tokens are ideal for mobile apps and single-page applications where traditional session cookies don't 
                  work well.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">When to Use Tokens</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">✅ Use Tokens For:</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  <li><strong>API Authentication:</strong> REST APIs, GraphQL APIs, microservices</li>
                  <li><strong>Mobile Applications:</strong> iOS, Android apps requiring authentication</li>
                  <li><strong>Single-Page Applications (SPAs):</strong> React, Vue, Angular apps</li>
                  <li><strong>Third-Party Integrations:</strong> OAuth, API integrations</li>
                  <li><strong>Microservices Architecture:</strong> Service-to-service authentication</li>
                  <li><strong>Stateless Systems:</strong> When you need horizontal scaling</li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-gray-900 mb-2">⚠️ Consider Sessions For:</h3>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                  <li><strong>Traditional Web Apps:</strong> Server-side rendered applications</li>
                  <li><strong>High Security Requirements:</strong> When you need immediate revocation</li>
                  <li><strong>Simple Applications:</strong> When statelessness isn't required</li>
                  <li><strong>Cookie-Based Auth:</strong> When httpOnly cookies are sufficient</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Tokens</h2>
            
            <div className="space-y-4">
              <div className="p-5 bg-white rounded-lg border-2 border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">JWT (JSON Web Tokens)</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Self-contained tokens with three parts: header, payload, and signature. Include user information and 
                  can be validated without database lookup.
                </p>
                <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
                  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
                </div>
              </div>

              <div className="p-5 bg-white rounded-lg border-2 border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">API Keys</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Simple string identifiers for service-to-service authentication. Stored in database and validated on 
                  each request.
                </p>
                <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
                  sk_live_51H3ll0W0rld_4bCd3fGh1JkL2mN3oP4qR5sT6uV7wX8yZ9
                </div>
              </div>

              <div className="p-5 bg-white rounded-lg border-2 border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">OAuth Tokens</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Access tokens and refresh tokens used in OAuth 2.0 flow. Enable third-party applications to access 
                  user resources.
                </p>
                <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
                  ya29.a0AfH6SMC... (OAuth 2.0 access token)
                </div>
              </div>

              <div className="p-5 bg-white rounded-lg border-2 border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2">Session Tokens</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Server-generated tokens stored in database or cache. Linked to server-side session data. Can be 
                  immediately revoked.
                </p>
                <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
                  sess_abc123def456ghi789jkl012mno345pqr678
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Key className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Compare Your Tokens</h2>
                <p className="text-blue-100">
                  Use our free Token Comparator tool to compare tokens character by character. Perfect for verifying 
                  JWT tokens, API keys, and authentication tokens.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=tokencompare"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Open Token Comparator
              <ExternalLink className="w-5 h-5" />
            </Link>
          </section>
        </article>
      </main>
    </div>
  );
}

