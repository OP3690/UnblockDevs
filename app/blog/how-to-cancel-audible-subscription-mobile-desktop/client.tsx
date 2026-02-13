'use client';

import Link from 'next/link';
import { ArrowLeft, Headphones, Smartphone, Monitor, Shield, CheckCircle, AlertCircle, HelpCircle, Clock, BookOpen } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function HowToCancelAudibleSubscriptionClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50 to-amber-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg">
              <Headphones className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Cancel Audible Subscription on Mobile & Desktop</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Step-by-Step Guide for Android, iPhone & Web (2026)</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="How to Cancel Audible Subscription on Mobile & Desktop"
        description="Complete Step-by-Step Guide for Android, iPhone & Web (2026)"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'How do I cancel my Audible subscription?',
              answer: 'To cancel Audible, go to your Account Details on the Audible website (audible.com) or mobile app. Navigate to Account Details &gt; Membership Details &gt; Cancel membership. Follow the prompts to confirm cancellation. You can cancel on both mobile and desktop.',
            },
            {
              question: 'Will I lose my audiobooks if I cancel Audible?',
              answer: 'No, you keep all audiobooks you\'ve purchased with credits or money, even after canceling your subscription. Your audiobook library remains accessible. However, you\'ll lose access to Audible Plus catalog (free streaming titles) and won\'t receive monthly credits.',
            },
            {
              question: 'What happens to my unused Audible credits when I cancel?',
              answer: 'If you cancel your Audible subscription, you\'ll lose any unused credits. It\'s recommended to use all your credits to purchase audiobooks before canceling. Purchased audiobooks remain yours permanently, even after cancellation.',
            },
            {
              question: 'Can I cancel Audible on my phone?',
              answer: 'Yes, you can cancel Audible on mobile devices. On Android/iOS: Open the Audible app, go to Profile &gt; Account Details &gt; Membership Details &gt; Cancel membership. However, some users find it easier to cancel via the Audible website.',
            },
            {
              question: 'Can I get a refund after canceling Audible?',
              answer: 'Audible typically doesn\'t offer refunds for subscription fees already paid. However, if you cancel within the first 30 days, you may be eligible for a refund. Contact Audible customer service for refund requests. Unused credits are forfeited upon cancellation.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is Audible Subscription Cancellation?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Canceling your Audible subscription</strong> is the process of ending your monthly or annual Audible membership, which stops automatic billing and credit accrual. When you cancel, you retain permanent access to all audiobooks you've purchased with credits or money, but you lose access to the Audible Plus catalog (free streaming titles) and won't receive future monthly credits.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Audible subscriptions provide monthly credits (typically 1 credit per month for the basic plan) that you can use to purchase audiobooks. When you cancel, your subscription ends at the end of your current billing period, and you can continue using the service until then. Any unused credits are forfeited upon cancellation, so it's important to use them before canceling.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can cancel your Audible subscription through the Audible website (audible.com) or the mobile app (Android/iOS). The cancellation process is straightforward, but understanding what you keep and lose is important for making an informed decision.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> Canceling your Audible subscription doesn't delete your account or remove purchased audiobooks. You keep your entire library of purchased titles permanently, but lose access to Audible Plus and future credits.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Headphones className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Audible Cancellation</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you cancel your Audible subscription, here's what happens:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-green-600" />
                  Keep Purchased Audiobooks
                </h3>
                <p className="text-gray-700 text-sm mb-2">All audiobooks you've purchased with credits or money remain in your library permanently. You can download, listen to, and access these titles even after canceling your subscription.</p>
                <p className="text-gray-600 text-xs">Your purchased audiobooks are yours to keep forever.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Lose Audible Plus Access
                </h3>
                <p className="text-gray-700 text-sm mb-2">You lose access to the Audible Plus catalog, which includes thousands of free streaming audiobooks, podcasts, and Audible Originals. These titles are only available with an active subscription.</p>
                <p className="text-gray-600 text-xs">Plus catalog titles are subscription-only benefits.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  Forfeit Unused Credits
                </h3>
                <p className="text-gray-700 text-sm mb-2">Any unused credits in your account are forfeited when you cancel. It's recommended to use all credits to purchase audiobooks before canceling to avoid losing them.</p>
                <p className="text-gray-600 text-xs">Credits don't carry over after cancellation.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Service Until Billing Period Ends
                </h3>
                <p className="text-gray-700 text-sm mb-2">Your subscription remains active until the end of your current billing period. You can continue using Audible Plus and receiving benefits until that date, even after initiating cancellation.</p>
                <p className="text-gray-600 text-xs">You get full value for the current billing period.</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Use all your credits before canceling! Any unused credits are lost when you cancel. Browse your wishlist and purchase audiobooks with your remaining credits to maximize value.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Cancel Your Audible Subscription</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              You should consider canceling your Audible subscription in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Not Using the Service</h3>
                  <p className="text-gray-700 text-sm">If you're not listening to audiobooks regularly or have accumulated unused credits, canceling can save money. You can always resubscribe later if needed.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Budget Constraints</h3>
                  <p className="text-gray-700 text-sm">If you need to reduce monthly expenses, canceling Audible can free up funds. Your purchased audiobooks remain accessible, so you can still enjoy your existing library.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Switching to Alternative Services</h3>
                  <p className="text-gray-700 text-sm">If you're switching to other audiobook services (like Libro.fm, Scribd, or library services), you may want to cancel Audible. Your purchased titles remain accessible.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Temporary Pause Needed</h3>
                  <p className="text-gray-700 text-sm">If you need a break from audiobooks but want to keep your account, canceling and resubscribing later is an option. Your library and account remain intact.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Best Practice:</strong> Before canceling, use all your credits to purchase audiobooks from your wishlist. This maximizes the value of your subscription and ensures you don't lose credits.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Step-by-Step Guide to Cancel Audible</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these steps to cancel your Audible subscription on mobile and desktop:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Cancel on Desktop (Recommended)</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Use All Your Credits First</h4>
                    <p className="text-gray-700 text-sm mb-2">Before canceling, browse your wishlist and use all remaining credits to purchase audiobooks. Go to audible.com, sign in, and purchase audiobooks with your credits.</p>
                    <p className="text-gray-600 text-xs">This ensures you don't lose any credits when you cancel.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Go to Audible Website</h4>
                    <p className="text-gray-700 text-sm mb-2">Visit audible.com in your web browser and sign in to your account. Make sure you're signed in to the correct Audible account.</p>
                    <p className="text-gray-600 text-xs">You can use any web browser (Chrome, Firefox, Safari, Edge).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Navigate to Account Details</h4>
                    <p className="text-gray-700 text-sm mb-2">Hover over or click on your name in the top right corner, then select "Account Details" from the dropdown menu. This opens your account settings page.</p>
                    <p className="text-gray-600 text-xs">You'll see options for membership, payment, and account settings.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Go to Membership Details</h4>
                    <p className="text-gray-700 text-sm mb-2">In Account Details, find and click on "Membership Details" or "View membership details". This section shows your current subscription plan and billing information.</p>
                    <p className="text-gray-600 text-xs">You'll see your plan type, next billing date, and credit balance.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Click Cancel Membership</h4>
                    <p className="text-gray-700 text-sm mb-2">Find the "Cancel membership" or "Cancel my membership" button/link and click it. Audible may show you retention offers or ask why you're canceling.</p>
                    <p className="text-gray-600 text-xs">You can skip retention offers if you're sure you want to cancel.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                      6
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Confirm Cancellation</h4>
                    <p className="text-gray-700 text-sm mb-2">Review the cancellation information, including when your subscription ends and what you'll keep. Click "Confirm cancellation" or "Yes, cancel membership" to finalize.</p>
                    <p className="text-gray-600 text-xs">Your subscription remains active until the end of the current billing period.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Cancel on Mobile (Android/iOS)</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Open Audible App</h4>
                    <p className="text-gray-700 text-sm mb-2">Open the Audible app on your Android or iPhone device. Make sure you're signed in to your account.</p>
                    <p className="text-gray-600 text-xs">The app interface may vary slightly between Android and iOS.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Go to Profile</h4>
                    <p className="text-gray-700 text-sm mb-2">Tap on the "Profile" or "Account" icon (usually in the bottom right or top right corner). This opens your account menu.</p>
                    <p className="text-gray-600 text-xs">Look for your profile picture or account icon.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Select Account Details</h4>
                    <p className="text-gray-700 text-sm mb-2">Tap on "Account Details" or "Settings" in the profile menu. This may redirect you to the Audible website in your mobile browser.</p>
                    <p className="text-gray-600 text-xs">Some mobile apps redirect to the website for account management.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Follow Desktop Steps</h4>
                    <p className="text-gray-700 text-sm mb-2">Once in Account Details, follow the same steps as desktop: Membership Details &gt; Cancel membership &gt; Confirm cancellation.</p>
                    <p className="text-gray-600 text-xs">The mobile website interface is similar to desktop.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Pro Tip:</strong> Canceling via the desktop website is often easier and more reliable than using the mobile app. If you have trouble canceling on mobile, use a computer or mobile browser to access audible.com directly.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Cancel Audible Properly</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Canceling your Audible subscription properly is important for several reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  Preserve Your Library
                </h3>
                <p className="text-gray-700 text-sm">Proper cancellation ensures you keep all purchased audiobooks. Your library remains accessible, and you can continue listening to titles you've bought even after canceling.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Maximize Credit Value
                </h3>
                <p className="text-gray-700 text-sm">Using all credits before canceling ensures you get full value from your subscription. Purchased audiobooks are permanent, while unused credits are lost.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Avoid Unwanted Charges
                </h3>
                <p className="text-gray-700 text-sm">Proper cancellation stops automatic billing. Your subscription ends at the current billing period, preventing future charges while allowing you to use the service until then.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Service Until Period Ends
                </h3>
                <p className="text-gray-700 text-sm">When you cancel properly, you retain access to Audible Plus and all benefits until your current billing period ends. You get full value for what you've already paid.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Warning:</strong> Simply deleting the app or ignoring billing doesn't cancel your subscription. You must actively cancel through Account Details to stop automatic billing. Unused credits are forfeited upon cancellation, so use them first!
              </p>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I pause my Audible subscription instead of canceling?</h3>
                <p className="text-gray-700 leading-relaxed">Audible doesn't offer a pause feature for subscriptions. You must cancel and resubscribe later if you want to take a break. However, you can cancel and resubscribe at any time, and your library and account remain intact.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How long do I have access after canceling?</h3>
                <p className="text-gray-700 leading-relaxed">You retain access to Audible Plus and all subscription benefits until the end of your current billing period. After that, you lose Plus catalog access but keep all purchased audiobooks permanently.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I reactivate my Audible subscription later?</h3>
                <p className="text-gray-700 leading-relaxed">Yes, you can resubscribe to Audible at any time. Simply go to audible.com, sign in, and choose a membership plan. Your account, library, and purchase history remain intact, and you'll regain access to Audible Plus.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What if I cancel through Apple or Google Play?</h3>
                <p className="text-gray-700 leading-relaxed">If you subscribed through Apple App Store or Google Play, you must cancel through those platforms (Settings &gt; Subscriptions). Canceling through Audible directly won't work for app store subscriptions. Check your subscription source first.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do I get a refund when I cancel Audible?</h3>
                <p className="text-gray-700 leading-relaxed">Audible typically doesn't offer refunds for subscription fees already paid. However, if you cancel within 30 days of subscribing, you may be eligible for a refund. Contact Audible customer service for refund requests. Unused credits are not refundable.</p>
              </div>
            </div>
          </section>
        </article>

                {/* Social Share Section */}
        <section className="mt-12">
          <BlogSocialShare 
            title="How to Cancel Audible Subscription on Mobile & Desktop"
            description="Complete Step-by-Step Guide for Android, iPhone & Web (2026)"
            variant="full"
          />
        </section>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="How to Cancel Audible Subscription Guide" />
        </section>
      </main>
    </div>
  );
}
