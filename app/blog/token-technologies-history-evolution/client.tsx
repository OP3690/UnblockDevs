'use client';

import Link from 'next/link';
import { ArrowLeft, Key, Clock, TrendingUp, ExternalLink, Code, Shield } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function TokenTechnologiesHistoryEvolutionClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Token Technologies: History & Evolution</h1>
              <p className="text-sm text-gray-500 mt-1">From Session Cookies to Modern JWT & OAuth Tokens</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Token Technologies: History & Evolution"
        description="From Session Cookies to Modern JWT & OAuth Tokens"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is the history of authentication tokens?',
              answer: 'Authentication tokens evolved from session cookies (1990s) to API keys (2000s), OAuth tokens (2007), and JWT tokens (2010). Each generation addressed limitations: statelessness, scalability, cross-domain support, and self-contained validation.',
            },
            {
              question: 'When was JWT (JSON Web Token) invented?',
              answer: 'JWT was first proposed in 2010 by Michael B. Jones, John Bradley, and Nat Sakimura. It became an IETF standard (RFC 7519) in 2015. JWT solved the need for stateless, self-contained tokens that could be validated without database lookups.',
            },
            {
              question: 'What is the difference between OAuth 1.0 and OAuth 2.0 tokens?',
              answer: 'OAuth 1.0 (2007) used complex signatures and required cryptographic libraries. OAuth 2.0 (2012) simplified to bearer tokens, access tokens, and refresh tokens. OAuth 2.0 is more widely adopted due to its simplicity and better mobile/SPA support.',
            },
            {
              question: 'How have API keys evolved over time?',
              answer: 'API keys started as simple strings (2000s), evolved to include scopes and permissions (2010s), and now support key rotation, rate limiting, and analytics (2020s). Modern API keys often use prefixes (sk_live_, pk_test_) for organization.',
            },
            {
              question: 'What are modern token standards?',
              answer: 'Modern standards include JWT (RFC 7519), OAuth 2.0 (RFC 6749), OpenID Connect (OIDC), PASETO (Platform-Agnostic Security Tokens), and WebAuthn/FIDO2 tokens. Each serves different use cases from stateless auth to passwordless authentication.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              The <strong>evolution of token technologies</strong> has shaped modern authentication and authorization. 
              From simple session cookies to sophisticated JWT tokens, understanding the <strong>history and evolution</strong> 
              of tokens helps us appreciate current technologies and anticipate future developments.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This comprehensive guide traces the development of token technologies from the early days of web authentication 
              to modern standards like JWT, OAuth 2.0, and beyond.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Timeline of Token Evolution</h2>
            
            <div className="space-y-6">
              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <div className="flex items-start gap-4">
                  <div className="text-center">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">1990s</div>
                    <div className="text-xs text-gray-600 mt-1">Early Web</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Session Cookies Era</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      HTTP cookies were introduced in 1994 by Netscape. Session-based authentication became standard, 
                      with server-side session storage and cookie-based identification.
                    </p>
                    <div className="bg-white p-3 rounded border border-blue-200">
                      <p className="text-xs text-gray-600 font-mono">Set-Cookie: sessionid=abc123; HttpOnly</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      <strong>Limitations:</strong> Server-side storage required, not suitable for APIs, scaling challenges
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start gap-4">
                  <div className="text-center">
                    <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold">2000s</div>
                    <div className="text-xs text-gray-600 mt-1">API Era</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">API Keys & Basic Auth</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Simple API keys emerged for service-to-service authentication. Basic Authentication (HTTP Basic Auth) 
                      was standardized in RFC 2617 (1999).
                    </p>
                    <div className="bg-white p-3 rounded border border-green-200">
                      <p className="text-xs text-gray-600 font-mono">Authorization: Basic base64(username:password)</p>
                      <p className="text-xs text-gray-600 font-mono mt-2">X-API-Key: sk_live_abc123def456</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      <strong>Limitations:</strong> Keys stored in database, no expiration, difficult to revoke
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <div className="flex items-start gap-4">
                  <div className="text-center">
                    <div className="bg-purple-600 text-white px-4 py-2 rounded-lg font-bold">2007</div>
                    <div className="text-xs text-gray-600 mt-1">OAuth 1.0</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">OAuth 1.0 - Third-Party Auth</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      OAuth 1.0 introduced secure third-party authentication without sharing passwords. Used complex 
                      cryptographic signatures (HMAC-SHA1).
                    </p>
                    <div className="bg-white p-3 rounded border border-purple-200">
                      <p className="text-xs text-gray-600 font-mono">oauth_signature_method="HMAC-SHA1"</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      <strong>Limitations:</strong> Complex implementation, not mobile-friendly, required crypto libraries
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <div className="flex items-start gap-4">
                  <div className="text-center">
                    <div className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold">2010</div>
                    <div className="text-xs text-gray-600 mt-1">JWT Proposed</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">JWT (JSON Web Token) - Self-Contained Tokens</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      JWT was proposed by Michael B. Jones, John Bradley, and Nat Sakimura. Self-contained tokens with 
                      header, payload, and signature. Became RFC 7519 in 2015.
                    </p>
                    <div className="bg-white p-3 rounded border border-orange-200">
                      <p className="text-xs text-gray-600 font-mono">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      <strong>Advantages:</strong> Stateless, self-contained, no database lookup, scalable
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start gap-4">
                  <div className="text-center">
                    <div className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">2012</div>
                    <div className="text-xs text-gray-600 mt-1">OAuth 2.0</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">OAuth 2.0 - Simplified & Bearer Tokens</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      OAuth 2.0 (RFC 6749) simplified authentication with bearer tokens, access tokens, and refresh tokens. 
                      Better suited for mobile and SPA applications.
                    </p>
                    <div className="bg-white p-3 rounded border border-red-200">
                      <p className="text-xs text-gray-600 font-mono">Authorization: Bearer ya29.a0AfH6SMC...</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      <strong>Advantages:</strong> Simpler than OAuth 1.0, mobile-friendly, refresh token support
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                <div className="flex items-start gap-4">
                  <div className="text-center">
                    <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold">2014</div>
                    <div className="text-xs text-gray-600 mt-1">OpenID Connect</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">OpenID Connect (OIDC) - Identity Layer</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      OIDC added identity layer on top of OAuth 2.0. Provides ID tokens (JWT) with user identity 
                      information and standardizes authentication flows.
                    </p>
                    <div className="bg-white p-3 rounded border border-indigo-200">
                      <p className="text-xs text-gray-600 font-mono">ID Token: JWT with user claims</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      <strong>Advantages:</strong> Standardized identity, user info endpoints, better UX
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-teal-50 rounded-lg border-l-4 border-teal-500">
                <div className="flex items-start gap-4">
                  <div className="text-center">
                    <div className="bg-teal-600 text-white px-4 py-2 rounded-lg font-bold">2018</div>
                    <div className="text-xs text-gray-600 mt-1">PASETO</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">PASETO - Platform-Agnostic Security Tokens</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      PASETO addressed JWT security concerns by eliminating algorithm confusion attacks. Simpler, more 
                      secure alternative to JWT with fewer implementation choices.
                    </p>
                    <div className="bg-white p-3 rounded border border-teal-200">
                      <p className="text-xs text-gray-600 font-mono">v2.public.eyJkYXRhIjoidGVzdCJ9...</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      <strong>Advantages:</strong> More secure defaults, no algorithm confusion, simpler spec
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-pink-50 rounded-lg border-l-4 border-pink-500">
                <div className="flex items-start gap-4">
                  <div className="text-center">
                    <div className="bg-pink-600 text-white px-4 py-2 rounded-lg font-bold">2020s</div>
                    <div className="text-xs text-gray-600 mt-1">Modern Era</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-2">Modern Token Standards</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      WebAuthn/FIDO2 for passwordless authentication, improved JWT security practices, token rotation, 
                      and zero-trust architectures.
                    </p>
                    <div className="bg-white p-3 rounded border border-pink-200">
                      <p className="text-xs text-gray-600 font-mono">WebAuthn: Public key cryptography</p>
                      <p className="text-xs text-gray-600 font-mono mt-2">JWT with short expiration + refresh tokens</p>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      <strong>Trends:</strong> Passwordless auth, zero-trust, short-lived tokens, key rotation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technology Comparison</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">Technology</th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">Year</th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">Stateless</th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-900">Use Case</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Session Cookies</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">1994</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Stateful</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">❌ No</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Traditional web apps</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">API Keys</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">2000s</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Stateful</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">❌ No</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Service-to-service</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">OAuth 1.0</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">2007</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Stateless</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">✅ Yes</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Third-party auth</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">JWT</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">2010/2015</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Stateless</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">✅ Yes</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">APIs, SPAs, Mobile</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">OAuth 2.0</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">2012</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Hybrid</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">⚠️ Partial</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Third-party, Mobile</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">OpenID Connect</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">2014</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Stateless</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">✅ Yes</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Identity, SSO</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">PASETO</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">2018</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Stateless</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">✅ Yes</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">Secure alternative to JWT</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Evolution Drivers</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Scalability Needs</h3>
                <p className="text-sm text-gray-700">
                  Shift from stateful (session storage) to stateless (JWT) tokens enabled horizontal scaling and 
                  microservices architecture.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">Mobile & SPA Growth</h3>
                <p className="text-sm text-gray-700">
                  Rise of mobile apps and single-page applications required tokens that work across domains without 
                  cookie limitations.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">Security Improvements</h3>
                <p className="text-sm text-gray-700">
                  Evolution from simple strings to cryptographically signed tokens (JWT, PASETO) with expiration 
                  and revocation capabilities.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2">Standardization</h3>
                <p className="text-sm text-gray-700">
                  IETF standards (RFC 7519 for JWT, RFC 6749 for OAuth 2.0) enabled interoperability and widespread 
                  adoption.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Key className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Compare Your Tokens</h2>
                <p className="text-purple-100">
                  Use our free Token Comparator tool to compare tokens from different sources. Perfect for verifying 
                  tokens across different technologies and formats.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=tokencompare"
              className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
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

