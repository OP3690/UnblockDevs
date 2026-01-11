'use client';

import Link from 'next/link';
import { ArrowLeft, MessageSquare, EyeOff, Smartphone, Shield, CheckCircle, AlertCircle, HelpCircle, Clock, Lock } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function HowToHideOnlineStatusOnWhatsappClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-emerald-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Hide Online Status on WhatsApp</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Appearing Offline & Privacy Settings (2026)</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'How do I hide my online status on WhatsApp?',
              answer: 'To hide your online status, go to WhatsApp Settings &gt; Privacy &gt; Last seen and online. Select "Nobody" to hide your online status and last seen from everyone. Note: If you hide your online status, you also won\'t be able to see others\' online status.',
            },
            {
              question: 'Can I hide online status but keep last seen visible?',
              answer: 'No, WhatsApp doesn\'t allow you to hide online status separately from last seen. The "Last seen and online" setting controls both features together. If you hide your online status, you also hide your last seen, and vice versa.',
            },
            {
              question: 'Will people know I\'m online if I hide my status?',
              answer: 'If you set "Last seen and online" to "Nobody", people won\'t see when you\'re online. However, they may still see "typing..." indicators if you\'re actively typing a message. Your online status will be hidden, but typing indicators may still appear.',
            },
            {
              question: 'Can I see others\' online status if I hide mine?',
              answer: 'No, if you hide your online status by setting it to "Nobody", you also won\'t be able to see others\' online status and last seen. This is a reciprocal privacy feature - if you hide yours, you can\'t see theirs either.',
            },
            {
              question: 'How do I hide online status on WhatsApp desktop?',
              answer: 'WhatsApp desktop uses the same privacy settings as your mobile app. Go to Settings &gt; Privacy &gt; Last seen and online on your phone, and the settings will sync to desktop. You can\'t change privacy settings from desktop - they must be changed on mobile.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is WhatsApp Online Status?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>WhatsApp online status</strong> is an indicator that shows when you're actively using WhatsApp. When you open WhatsApp and are connected to the internet, your contacts can see a green dot or "online" indicator next to your name, indicating that you're currently active on the app.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              WhatsApp's online status is separate from "last seen" (which shows when you were last active) but is controlled by the same privacy setting. The online status appears in real-time when you're actively using WhatsApp, while last seen shows the timestamp of your last activity. Both features help contacts know when you're available to chat.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can control who sees your online status and last seen through WhatsApp's privacy settings. However, WhatsApp links these two features together - you can't hide online status separately from last seen. If you hide one, you hide both, and you also won't be able to see others' online status and last seen.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> WhatsApp's online status and last seen are controlled by the same privacy setting. You can't hide online status separately from last seen. If you hide your online status, you also hide your last seen, and you won't be able to see others' status either.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <MessageSquare className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding WhatsApp Online Status</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              WhatsApp's online status system works as follows:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <EyeOff className="w-5 h-5 text-green-600" />
                  Online Indicator
                </h3>
                <p className="text-gray-700 text-sm mb-2">When you're actively using WhatsApp (app is open and you're connected to the internet), a green dot or "online" indicator appears next to your name in your contacts' chat lists, showing that you're currently active.</p>
                <p className="text-gray-600 text-xs">The online status appears in real-time when you're using WhatsApp.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  Last Seen Timestamp
                </h3>
                <p className="text-gray-700 text-sm mb-2">Last seen shows when you were last active on WhatsApp, even if you're not currently online. This is different from online status - last seen is a timestamp, while online status is a real-time indicator.</p>
                <p className="text-gray-600 text-xs">Last seen updates when you close WhatsApp or go offline.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-600" />
                  Linked Privacy Settings
                </h3>
                <p className="text-gray-700 text-sm mb-2">Online status and last seen are controlled by the same privacy setting called "Last seen and online". You can't hide one without hiding the other. If you hide your status, you also hide your last seen, and you won't see others' status either.</p>
                <p className="text-gray-600 text-xs">This is a reciprocal privacy feature.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Typing Indicators
                </h3>
                <p className="text-gray-700 text-sm mb-2">Even if you hide your online status, people may still see "typing..." indicators when you're actively typing a message in a chat. Typing indicators are separate from online status and can't be hidden independently.</p>
                <p className="text-gray-600 text-xs">Typing indicators may still appear even with hidden online status.</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> Hiding your online status also hides your last seen, and you won't be able to see others' online status and last seen either. This is WhatsApp's reciprocal privacy feature - if you hide yours, you can't see theirs.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Hide Online Status on WhatsApp</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              You should consider hiding your online status in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Privacy Concerns</h3>
                  <p className="text-gray-700 text-sm">If you want to use WhatsApp without others knowing when you're online, hiding your online status provides privacy. This is useful when you want to browse messages without appearing available for immediate responses.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Avoiding Unwanted Messages</h3>
                  <p className="text-gray-700 text-sm">Hiding your online status can help you avoid unwanted messages or pressure to respond immediately. People won't know when you're online, giving you more control over when you engage with messages.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Professional Boundaries</h3>
                  <p className="text-gray-700 text-sm">In professional contexts, hiding your online status helps maintain boundaries. Colleagues or clients won't know when you're available, allowing you to respond on your own schedule without appearing always available.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Personal Time Management</h3>
                  <p className="text-gray-700 text-sm">Hiding your online status gives you control over when you appear available. You can read messages, browse chats, and use WhatsApp without the pressure of appearing online and available for immediate responses.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Consideration:</strong> Remember that hiding your online status also means you won't be able to see others' online status and last seen. Consider whether this trade-off is worth it for your privacy needs.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Smartphone className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Step-by-Step Guide to Hide Online Status</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-6">
              Follow these steps to hide your online status on WhatsApp:
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Hide Online Status on Android/iPhone</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Open WhatsApp Settings</h4>
                    <p className="text-gray-700 text-sm mb-2">Open the WhatsApp app and tap the three-dot menu (☰) in the top right corner (Android) or Settings in the bottom right (iPhone). Then tap "Settings".</p>
                    <p className="text-gray-600 text-xs">Make sure you're using the latest version of WhatsApp.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Go to Privacy</h4>
                    <p className="text-gray-700 text-sm mb-2">In Settings, tap on "Privacy". This section contains all privacy-related settings including profile photo, about, status, and last seen/online settings.</p>
                    <p className="text-gray-600 text-xs">You'll see options for various privacy controls.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Select Last Seen and Online</h4>
                    <p className="text-gray-700 text-sm mb-2">Tap on "Last seen and online" in the Privacy section. This opens the settings for both your last seen timestamp and online status.</p>
                    <p className="text-gray-600 text-xs">These two features are controlled together.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Choose Privacy Level</h4>
                    <p className="text-gray-700 text-sm mb-2">You'll see three options: "Everyone" (all contacts can see), "My contacts" (only your contacts can see), or "Nobody" (no one can see). Select "Nobody" to hide your online status and last seen from everyone.</p>
                    <p className="text-gray-600 text-xs">Selecting "Nobody" also means you won't see others' status.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Confirm the Setting</h4>
                    <p className="text-gray-700 text-sm mb-2">After selecting "Nobody", your online status and last seen are now hidden from everyone. Note that you also won't be able to see others' online status and last seen.</p>
                    <p className="text-gray-600 text-xs">The setting takes effect immediately.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Alternative: Hide from Specific Contacts</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Use My Contacts Option</h4>
                    <p className="text-gray-700 text-sm mb-2">If you want to hide your online status from some people but not others, select "My contacts" in Last seen and online settings. Then, block specific contacts you want to hide your status from.</p>
                    <p className="text-gray-600 text-xs">Blocked contacts won't see your online status.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Block Specific Contacts</h4>
                    <p className="text-gray-700 text-sm mb-2">Go to Settings &gt; Privacy &gt; Blocked contacts and add contacts you want to hide your status from. Blocked contacts won't see your online status, last seen, profile photo, or about information.</p>
                    <p className="text-gray-600 text-xs">This is a more targeted approach than hiding from everyone.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Pro Tip:</strong> If you want to hide your online status from specific people without hiding it from everyone, use the "My contacts" option and block those specific contacts. This way, most people can still see your status, but blocked contacts cannot.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Hide Online Status on WhatsApp</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Hiding your online status on WhatsApp is important for several reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <EyeOff className="w-5 h-5 text-blue-600" />
                  Privacy Protection
                </h3>
                <p className="text-gray-700 text-sm">Hiding your online status protects your privacy and prevents others from knowing when you're actively using WhatsApp. This gives you control over when you appear available and when you want privacy.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Control Over Availability
                </h3>
                <p className="text-gray-700 text-sm">Hiding your online status gives you control over when you appear available for messages. You can read messages, browse chats, and use WhatsApp without the pressure of appearing online and available for immediate responses.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-600" />
                  Avoid Unwanted Pressure
                </h3>
                <p className="text-gray-700 text-sm">When your online status is visible, people may feel pressured to respond immediately or may expect immediate responses from you. Hiding your status removes this pressure and allows you to respond on your own schedule.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  Professional Boundaries
                </h3>
                <p className="text-gray-700 text-sm">In professional contexts, hiding your online status helps maintain boundaries. Colleagues or clients won't know when you're available, allowing you to respond on your own schedule without appearing always available.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Trade-off:</strong> Remember that hiding your online status also means you won't be able to see others' online status and last seen. Consider whether this trade-off is worth it for your privacy needs. You can always change the setting back if needed.
              </p>
            </div>
          </section>

          {/* Limitations Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations and Considerations</h2>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Reciprocal Privacy Feature</h3>
                <p className="text-gray-700 text-sm mb-2">If you hide your online status, you also won't be able to see others' online status and last seen. This is WhatsApp's reciprocal privacy feature - if you hide yours, you can't see theirs either.</p>
                <p className="text-gray-600 text-xs">You can't selectively hide your status while seeing others' status.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Typing Indicators Still Visible</h3>
                <p className="text-gray-700 text-sm mb-2">Even if you hide your online status, people may still see "typing..." indicators when you're actively typing a message in a chat. Typing indicators are separate from online status and can't be hidden independently.</p>
                <p className="text-gray-600 text-xs">Typing indicators may reveal your activity even with hidden online status.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Read Receipts Separate</h3>
                <p className="text-gray-700 text-sm mb-2">Online status is separate from read receipts (blue checkmarks). You can hide your online status while still showing read receipts, or hide read receipts separately. These are independent privacy settings.</p>
                <p className="text-gray-600 text-xs">Read receipts are controlled separately in Privacy settings.</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I hide online status but keep last seen visible?</h3>
                <p className="text-gray-700 leading-relaxed">No, WhatsApp doesn't allow you to hide online status separately from last seen. The "Last seen and online" setting controls both features together. If you hide your online status, you also hide your last seen, and vice versa. They're linked privacy settings.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Will people still see when I'm typing if I hide my online status?</h3>
                <p className="text-gray-700 leading-relaxed">Yes, people may still see "typing..." indicators when you're actively typing a message, even if you've hidden your online status. Typing indicators are separate from online status and can't be hidden independently. Your online status will be hidden, but typing indicators may still appear.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I see others' online status if I hide mine?</h3>
                <p className="text-gray-700 leading-relaxed">No, if you hide your online status by setting it to "Nobody", you also won't be able to see others' online status and last seen. This is WhatsApp's reciprocal privacy feature - if you hide yours, you can't see theirs either. This prevents one-sided privacy.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I hide online status on WhatsApp desktop?</h3>
                <p className="text-gray-700 leading-relaxed">WhatsApp desktop uses the same privacy settings as your mobile app. Go to Settings &gt; Privacy &gt; Last seen and online on your phone, and the settings will sync to desktop. You can't change privacy settings from desktop - they must be changed on mobile, and they apply to all devices.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I hide my online status from specific people only?</h3>
                <p className="text-gray-700 leading-relaxed">Yes, you can hide your online status from specific people by blocking them. Set "Last seen and online" to "My contacts", then block the specific contacts you want to hide your status from. Blocked contacts won't see your online status, last seen, profile photo, or about information.</p>
              </div>
            </div>
          </section>
        </article>

        {/* Newsletter Signup */}
        <section className="mt-12">
          <NewsletterSignup />
        </section>

        {/* Feedback Form */}
        <section className="mt-12">
          <FeedbackForm toolName="How to Hide Online Status on WhatsApp Guide" />
        </section>
      </main>
    </div>
  );
}
