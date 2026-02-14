'use client';

import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, XCircle, ExternalLink, Lock, Eye } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function TokenSecurityPrivacyBestPracticesClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer's Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Token Security & Privacy: Best Practices</h1>
              <p className="text-sm text-gray-500 mt-1">Dos, Don'ts, Vulnerabilities & Privacy Considerations</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Token Security & Privacy: Best Practices"
        description="Dos, Don'ts, Vulnerabilities & Privacy Considerations"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'How should I store authentication tokens securely?',
              answer: 'Store tokens in httpOnly cookies (web), secure storage (iOS Keychain, Android Keystore), or memory (SPAs). Never store in localStorage, sessionStorage, or plain text files. Use environment variables for API keys on servers.',
            },
            {
              question: 'What are common token security vulnerabilities?',
              answer: 'Common vulnerabilities include: storing tokens in localStorage (XSS attacks), weak token expiration, no token rotation, exposing tokens in URLs/logs, using weak signing algorithms, and not validating token signatures properly.',
            },
            {
              question: 'How often should I rotate tokens?',
              answer: 'Rotate access tokens frequently (15 minutes to 1 hour). Refresh tokens should be rotated less frequently (7-30 days) but immediately if compromised. API keys should be rotated every 90 days or when compromised.',
            },
            {
              question: 'What is token privacy and why does it matter?',
              answer: 'Token privacy means protecting user data in tokens, not logging tokens, and ensuring tokens aren\'t exposed. Privacy matters because tokens can contain sensitive user information (email, ID, permissions) that must be protected under GDPR, CCPA, and other regulations.',
            },
            {
              question: 'Should I log tokens for debugging?',
              answer: 'Never log full tokens. If needed for debugging, log only token metadata (user ID, expiration, token type) or use token hashes. Full tokens in logs are a major security risk and privacy violation.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Token security and privacy</strong> are critical for protecting user data and preventing 
              unauthorized access. This comprehensive guide covers <strong>best practices</strong>, 
              <strong> common vulnerabilities</strong>, <strong>dos and don'ts</strong>, and 
              <strong> privacy considerations</strong> for working with authentication tokens.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're working with JWT tokens, API keys, or OAuth tokens, following security best practices 
              is essential for building trustworthy applications.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Security Best Practices</h2>
            
            <div className="space-y-4">
              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Use Strong Signing Algorithms</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Always use strong cryptographic algorithms for token signing. For JWT, prefer RS256 (RSA) or 
                      ES256 (ECDSA) over HS256 (HMAC) when possible.
                    </p>
                    <div className="bg-white p-3 rounded border border-green-200 mt-2">
                      <p className="text-xs text-gray-600 font-mono">✅ RS256: Asymmetric, more secure</p>
                      <p className="text-xs text-gray-600 font-mono">✅ ES256: ECDSA, good for mobile</p>
                      <p className="text-xs text-red-600 font-mono">❌ HS256: Symmetric, requires secret sharing</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Set Appropriate Expiration Times</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Use short-lived access tokens (15 minutes to 1 hour) and longer-lived refresh tokens (7-30 days). 
                      Balance security with user experience.
                    </p>
                    <div className="bg-white p-3 rounded border border-green-200 mt-2">
                      <p className="text-xs text-gray-600 font-mono">Access Token: 15-60 minutes</p>
                      <p className="text-xs text-gray-600 font-mono">Refresh Token: 7-30 days</p>
                      <p className="text-xs text-gray-600 font-mono">API Keys: Rotate every 90 days</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Store Tokens Securely</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Use secure storage mechanisms appropriate for your platform. Never store tokens in insecure locations.
                    </p>
                    <div className="bg-white p-3 rounded border border-green-200 mt-2">
                      <p className="text-xs text-green-600 font-mono">✅ Web: httpOnly cookies</p>
                      <p className="text-xs text-green-600 font-mono">✅ iOS: Keychain</p>
                      <p className="text-xs text-green-600 font-mono">✅ Android: Keystore</p>
                      <p className="text-xs text-green-600 font-mono">✅ Server: Environment variables</p>
                      <p className="text-xs text-red-600 font-mono">❌ localStorage, sessionStorage</p>
                      <p className="text-xs text-red-600 font-mono">❌ Plain text files</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Implement Token Rotation</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Regularly rotate tokens to limit exposure window. Rotate refresh tokens on use, and implement 
                      automatic rotation for long-lived tokens.
                    </p>
                    <div className="bg-white p-3 rounded border border-green-200 mt-2">
                      <p className="text-xs text-gray-600 font-mono">• Rotate refresh tokens on each use</p>
                      <p className="text-xs text-gray-600 font-mono">• Rotate API keys every 90 days</p>
                      <p className="text-xs text-gray-600 font-mono">• Immediate rotation on compromise</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Validate Token Signatures</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Always validate token signatures before trusting token content. Never skip signature validation, 
                      even in development.
                    </p>
                    <div className="bg-white p-3 rounded border border-green-200 mt-2">
                      <p className="text-xs text-gray-600 font-mono">✅ Verify signature algorithm</p>
                      <p className="text-xs text-gray-600 font-mono">✅ Check expiration (exp claim)</p>
                      <p className="text-xs text-gray-600 font-mono">✅ Validate issuer (iss claim)</p>
                      <p className="text-xs text-gray-600 font-mono">✅ Check audience (aud claim)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-green-50 rounded-lg border-l-4 border-green-500">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Use HTTPS Always</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Always transmit tokens over HTTPS/TLS. Never send tokens over unencrypted HTTP connections. 
                      Use HSTS headers to enforce HTTPS.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">❌ Common Security Mistakes (Don'ts)</h2>
            
            <div className="space-y-4">
              <div className="p-5 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Don't Store Tokens in localStorage</h3>
                    <p className="text-sm text-gray-700">
                      localStorage is vulnerable to XSS attacks. Any JavaScript running on your domain can access 
                      localStorage, making tokens easily stealable.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Don't Put Tokens in URLs</h3>
                    <p className="text-sm text-gray-700">
                      Tokens in URLs can be logged in server logs, browser history, and referrer headers. Use 
                      Authorization header instead.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Don't Log Full Tokens</h3>
                    <p className="text-sm text-gray-700">
                      Logging full tokens exposes them in log files, monitoring systems, and error tracking tools. 
                      Log only metadata or token hashes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Don't Use Weak Algorithms</h3>
                    <p className="text-sm text-gray-700">
                      Avoid 'none' algorithm, weak HMAC keys, or deprecated algorithms. Always use strong, 
                      industry-standard cryptographic algorithms.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Don't Skip Expiration Checks</h3>
                    <p className="text-sm text-gray-700">
                      Always validate token expiration. Expired tokens should be rejected immediately. Implement 
                      clock skew tolerance (5 minutes) for distributed systems.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-red-50 rounded-lg border-l-4 border-red-500">
                <div className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Don't Store Secrets in Code</h3>
                    <p className="text-sm text-gray-700">
                      Never hardcode tokens, API keys, or signing secrets in source code. Use environment variables, 
                      secret management systems, or secure vaults.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">🔒 Privacy Best Practices</h2>
            
            <div className="space-y-4">
              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">Minimize Data in Tokens</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Only include necessary information in tokens. Avoid storing sensitive data like passwords, credit 
                  card numbers, or full user profiles.
                </p>
                <div className="bg-white p-3 rounded border border-blue-200 mt-2">
                  <p className="text-xs text-green-600 font-mono">✅ Include: user_id, email, permissions</p>
                  <p className="text-xs text-red-600 font-mono">❌ Exclude: passwords, SSN, credit cards</p>
                </div>
              </div>

              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">Don't Log Token Content</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Never log full tokens or token payloads. If debugging is needed, log only token metadata (user ID, 
                  expiration) or use token hashes.
                </p>
              </div>

              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">Implement Token Revocation</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Provide mechanisms to revoke tokens when users log out, change passwords, or report security 
                  incidents. Maintain revocation lists for stateless tokens.
                </p>
              </div>

              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">Comply with Privacy Regulations</h3>
                <p className="text-sm text-gray-700 mb-2">
                  Ensure token handling complies with GDPR, CCPA, and other privacy regulations. Allow users to 
                  revoke tokens and delete their data.
                </p>
              </div>

              <div className="p-5 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">Use Token Encryption for Sensitive Data</h3>
                <p className="text-sm text-gray-700 mb-2">
                  If tokens must contain sensitive information, encrypt the payload. JWE (JSON Web Encryption) provides 
                  encryption for JWT tokens.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Vulnerabilities</h2>
            
            <div className="space-y-4">
              <div className="p-5 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Algorithm Confusion Attacks</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Attackers can change JWT algorithm from RS256 to HS256 and use public key as HMAC secret. 
                      Always validate algorithm matches expected value.
                    </p>
                    <div className="bg-white p-3 rounded border border-yellow-200 mt-2">
                      <p className="text-xs text-gray-600 font-mono">✅ Always verify algorithm matches expected</p>
                      <p className="text-xs text-gray-600 font-mono">✅ Use algorithm whitelist</p>
                      <p className="text-xs text-gray-600 font-mono">✅ Consider PASETO (no algorithm confusion)</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">XSS Attacks on Token Storage</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Storing tokens in localStorage makes them vulnerable to XSS attacks. Malicious scripts can 
                      steal tokens from localStorage.
                    </p>
                    <div className="bg-white p-3 rounded border border-yellow-200 mt-2">
                      <p className="text-xs text-gray-600 font-mono">✅ Use httpOnly cookies</p>
                      <p className="text-xs text-gray-600 font-mono">✅ Implement Content Security Policy (CSP)</p>
                      <p className="text-xs text-gray-600 font-mono">✅ Sanitize user input</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Token Replay Attacks</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Stolen tokens can be reused until expiration. Implement token rotation, short expiration times, 
                      and token binding (IP, device fingerprint).
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Weak Secret Keys</h3>
                    <p className="text-sm text-gray-700 mb-2">
                      Weak HMAC secrets or RSA keys can be brute-forced. Use strong, randomly generated secrets with 
                      sufficient entropy (256 bits for HMAC).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Reference: Dos & Don'ts</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-green-50 rounded-lg border-2 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Dos
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Use strong signing algorithms (RS256, ES256)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Set short expiration times (15-60 min)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Store tokens in secure storage (httpOnly cookies, Keychain)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Validate token signatures always</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Use HTTPS for all token transmission</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Implement token rotation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Minimize data in tokens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>Use environment variables for secrets</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 bg-red-50 rounded-lg border-2 border-red-500">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  Don'ts
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Store tokens in localStorage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Put tokens in URLs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Log full tokens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Use weak algorithms or 'none'</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Skip expiration validation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Hardcode secrets in code</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Store sensitive data in tokens</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>Use long-lived tokens without rotation</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Shield className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Compare Tokens Securely</h2>
                <p className="text-red-100">
                  Use our free Token Comparator tool to compare tokens. All comparison happens in your browser - 
                  your tokens never leave your device.
                </p>
              </div>
            </div>
            <Link
              href="/?tab=tokencompare"
              className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
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

