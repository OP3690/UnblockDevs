'use client';

import Link from 'next/link';
import { ArrowLeft, Mail, Shield, Lock, AlertCircle, CheckCircle, Key, Clock, HelpCircle } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function InstagramPasswordResetClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Instagram Password Reset Email: Complete Guide</h1>
              <p className="text-sm text-gray-500 mt-1">What, When, How & Why - Everything You Need to Know</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Instagram Password Reset Email: Complete Guide"
        description="What, When, How & Why - Everything You Need to Know"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is an Instagram password reset email?',
              answer: 'An Instagram password reset email is a security email sent by Instagram to your registered email address when you request to reset your password. It contains a secure link that allows you to create a new password for your Instagram account.',
            },
            {
              question: 'When should I use Instagram password reset?',
              answer: 'You should use Instagram password reset when: you\'ve forgotten your password, you suspect your account has been compromised, you want to change your password for security reasons, or Instagram has locked your account due to suspicious activity.',
            },
            {
              question: 'How do I reset my Instagram password via email?',
              answer: 'Go to Instagram login page, click "Forgot password?", enter your username or email, check your email inbox for the reset link, click the link in the email, and create a new strong password. The link typically expires within 24 hours.',
            },
            {
              question: 'Why didn\'t I receive the Instagram password reset email?',
              answer: 'Common reasons include: email in spam/junk folder, incorrect email address, email delivery delays (wait 5-10 minutes), email account issues, or Instagram account not found. Check spam folder first, then verify your email address is correct.',
            },
            {
              question: 'Is the Instagram password reset email safe?',
              answer: 'Yes, legitimate Instagram password reset emails are safe. However, be cautious of phishing emails. Always verify the sender is from @instagram.com or @mail.instagram.com, check the email address carefully, and never enter your password in response to an email.',
            },
          ]}
        />

        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          {/* Definition Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HelpCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is an Instagram Password Reset Email?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              An <strong>Instagram password reset email</strong> is an automated security notification sent by Instagram to your registered email address when you initiate a password reset request. This email contains a secure, time-limited link that allows you to create a new password for your Instagram account without needing to know your current password.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The password reset email is part of Instagram's account recovery system, designed to help users regain access to their accounts when they've forgotten their password or suspect unauthorized access. The email typically comes from <code className="bg-gray-100 px-2 py-1 rounded text-sm">noreply@mail.instagram.com</code> or similar Instagram email addresses.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> Instagram password reset emails are legitimate security tools, but you should always verify the sender's email address to avoid phishing scams.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Instagram Password Reset Emails</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Instagram password reset emails contain several important components:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Key className="w-5 h-5 text-blue-600" />
                  Secure Reset Link
                </h3>
                <p className="text-gray-700 text-sm">A unique, time-limited URL that allows you to access the password reset page. This link typically expires within 24 hours for security reasons.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Expiration Time
                </h3>
                <p className="text-gray-700 text-sm">The reset link has a limited validity period (usually 24 hours) to prevent unauthorized access if someone else gains access to your email.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Security Information
                </h3>
                <p className="text-gray-700 text-sm">The email includes information about when and from where the reset request was made, helping you identify if it was legitimate or suspicious.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  Safety Warnings
                </h3>
                <p className="text-gray-700 text-sm">Legitimate Instagram emails include warnings about not sharing the link and what to do if you didn't request the reset.</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              The email is designed to be user-friendly while maintaining security. It clearly states that if you didn't request the password reset, you should ignore the email and your password will remain unchanged.
            </p>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Use Instagram Password Reset</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              You should request an Instagram password reset email in the following situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Forgotten Password</h3>
                  <p className="text-gray-700 text-sm">When you can't remember your Instagram password and need to regain access to your account.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                <CheckCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Suspected Account Compromise</h3>
                  <p className="text-gray-700 text-sm">If you notice suspicious activity, unauthorized posts, or changes you didn't make, immediately reset your password.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Regular Security Maintenance</h3>
                  <p className="text-gray-700 text-sm">Security experts recommend changing passwords periodically (every 3-6 months) as a preventive security measure.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Account Locked by Instagram</h3>
                  <p className="text-gray-700 text-sm">If Instagram has temporarily locked your account due to suspicious activity, you'll need to reset your password to regain access.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">After Security Breach</h3>
                  <p className="text-gray-700 text-sm">If you've been notified of a data breach or security incident that may have exposed your password, reset it immediately.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Important:</strong> If you receive a password reset email that you didn't request, don't click the link. Instead, check your account security settings and consider changing your password through the app if you suspect unauthorized access attempts.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Step-by-Step Password Reset Guide</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these steps to reset your Instagram password using the email method:
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Go to Instagram Login Page</h3>
                  <p className="text-gray-700 text-sm mb-2">Open the Instagram app or visit instagram.com and navigate to the login page.</p>
                  <p className="text-gray-600 text-xs">You can access this from any device - mobile app, web browser, or desktop.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Click "Forgot Password?"</h3>
                  <p className="text-gray-700 text-sm mb-2">Below the login fields, you'll see a "Forgot password?" or "Get help signing in" link. Click it.</p>
                  <p className="text-gray-600 text-xs">This option is available on both the mobile app and web version.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Enter Your Username or Email</h3>
                  <p className="text-gray-700 text-sm mb-2">Enter your Instagram username, email address, or phone number associated with your account.</p>
                  <p className="text-gray-600 text-xs">You can use any of these identifiers - Instagram will find your account.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Select "Send Login Link" or "Reset Password"</h3>
                  <p className="text-gray-700 text-sm mb-2">Choose the email option to receive a password reset link in your email inbox.</p>
                  <p className="text-gray-600 text-xs">Instagram may offer multiple recovery options - choose email if that's your preferred method.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    5
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Check Your Email Inbox</h3>
                  <p className="text-gray-700 text-sm mb-2">Open your email inbox (and spam/junk folder) and look for an email from Instagram.</p>
                  <p className="text-gray-600 text-xs">The email usually arrives within 1-5 minutes. If you don't see it, check your spam folder.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    6
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Click the Reset Link</h3>
                  <p className="text-gray-700 text-sm mb-2">Open the email and click the "Reset Password" or "Change Password" button/link.</p>
                  <p className="text-gray-600 text-xs">The link will redirect you to Instagram's password reset page.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    7
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Create a New Strong Password</h3>
                  <p className="text-gray-700 text-sm mb-2">Enter your new password twice to confirm. Make sure it's strong (at least 8 characters, mix of letters, numbers, and symbols).</p>
                  <p className="text-gray-600 text-xs">Instagram will show password strength indicators - aim for "Strong" or "Very Strong".</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                    8
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Save and Log In</h3>
                  <p className="text-gray-700 text-sm mb-2">Click "Reset Password" or "Save" to complete the process. You can now log in with your new password.</p>
                  <p className="text-gray-600 text-xs">After resetting, Instagram may log you out of other devices for security.</p>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Pro Tip:</strong> After resetting your password, enable two-factor authentication (2FA) in Instagram settings for additional security. This adds an extra layer of protection to your account.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Instagram Password Reset Emails Matter</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Instagram password reset emails serve several critical security and user experience purposes:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Account Security
                </h3>
                <p className="text-gray-700 text-sm">Password reset emails help protect your account from unauthorized access. If someone tries to access your account, you'll be notified via email, allowing you to take immediate action.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  Account Recovery
                </h3>
                <p className="text-gray-700 text-sm">When you forget your password, the email reset method provides a secure way to regain access without needing to contact support or answer security questions.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                  Suspicious Activity Detection
                </h3>
                <p className="text-gray-700 text-sm">If you receive a reset email you didn't request, it's a warning sign that someone may be trying to access your account. This early warning system helps you protect your account proactively.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  User Convenience
                </h3>
                <p className="text-gray-700 text-sm">The email-based reset process is quick and convenient. You can reset your password from any device with internet access, without needing to remember security questions or contact support.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Security Best Practice:</strong> Always use strong, unique passwords for your Instagram account. Consider using a password manager to generate and store secure passwords. Never reuse passwords across multiple accounts.
              </p>
            </div>
          </section>

          {/* Troubleshooting Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting: Common Issues and Solutions</h2>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Email Not Received</h3>
                <p className="text-gray-700 text-sm mb-2">If you don't receive the password reset email:</p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Check your spam/junk folder - emails sometimes get filtered</li>
                  <li>Wait 5-10 minutes - email delivery can be delayed</li>
                  <li>Verify the email address is correct and matches your Instagram account</li>
                  <li>Try requesting the reset again - sometimes the first attempt fails</li>
                  <li>Check if your email account has storage issues or filters blocking Instagram emails</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Reset Link Expired</h3>
                <p className="text-gray-700 text-sm mb-2">If the reset link has expired:</p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Request a new password reset email - links typically expire after 24 hours</li>
                  <li>Use the link immediately after receiving it to avoid expiration</li>
                  <li>Check the email timestamp to see when it was sent</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Suspicious Reset Email</h3>
                <p className="text-gray-700 text-sm mb-2">If you receive a reset email you didn't request:</p>
                <ul className="list-disc list-inside text-gray-700 text-sm space-y-1 ml-4">
                  <li>Don't click the link - it could be a phishing attempt</li>
                  <li>Verify the sender email address is from @instagram.com or @mail.instagram.com</li>
                  <li>Check your account for suspicious activity</li>
                  <li>Change your password through the Instagram app directly if concerned</li>
                  <li>Enable two-factor authentication for additional security</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does the password reset link last?</h3>
                <p className="text-gray-700 leading-relaxed">Instagram password reset links typically expire after 24 hours for security reasons. If your link has expired, simply request a new password reset email.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I reset my password without email?</h3>
                <p className="text-gray-700 leading-relaxed">Yes, Instagram offers alternative recovery methods including phone number verification and security questions (if you've set them up). However, email is the most common and convenient method.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What if I don't have access to my email anymore?</h3>
                <p className="text-gray-700 leading-relaxed">If you no longer have access to the email associated with your Instagram account, you'll need to use alternative recovery methods like phone number verification or contact Instagram support for account recovery assistance.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is it safe to click the reset link in the email?</h3>
                <p className="text-gray-700 leading-relaxed">Yes, if the email is from a legitimate Instagram address (@instagram.com or @mail.instagram.com). Always verify the sender before clicking any links. If you're unsure, go directly to instagram.com and request a reset from there.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Will resetting my password log me out of other devices?</h3>
                <p className="text-gray-700 leading-relaxed">Yes, for security reasons, Instagram will log you out of all devices when you reset your password. You'll need to log in again with your new password on each device.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="Instagram Password Reset Email: Complete Guide"
            description="What, When, How & Why - Everything You Need to Know"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="Instagram Password Reset Email Guide" />
        </section>
      </main>
    </div>
  );
}
