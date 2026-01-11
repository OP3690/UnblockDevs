'use client';

import Link from 'next/link';
import { ArrowLeft, Instagram, AlertTriangle, Shield, CheckCircle, AlertCircle, HelpCircle, Clock, Search, UserX } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';

export default function HowToKnowIfSomeoneBlockedYouOnInstagramClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg">
              <Instagram className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">How to Know If Someone Blocked You on Instagram</h1>
              <p className="text-sm text-gray-500 mt-1">Complete Guide to Detecting Instagram Blocks (2026)</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FAQSchema
          faqs={[
            {
              question: 'How do I know if someone blocked me on Instagram?',
              answer: 'Signs you\'ve been blocked include: unable to find their profile when searching, their profile shows "User not found" or "No posts yet", you can\'t see their stories or posts, previous messages show "This message is unavailable", and you\'re removed from their followers/following lists. However, these signs can also indicate the account was deleted or made private.',
            },
            {
              question: 'What does a blocked Instagram profile look like?',
              answer: 'If you\'re blocked, searching for their username may show "User not found" or the profile may appear with "No posts yet" and no profile picture. You won\'t be able to see their posts, stories, or profile information. However, these signs aren\'t definitive proof of blocking, as they can also indicate account deletion or privacy settings.',
            },
            {
              question: 'Can I still see their profile if they blocked me?',
              answer: 'No, if someone blocks you on Instagram, you typically cannot see their profile, posts, stories, or any account information. Searching for their username may show "User not found" or a blank profile. However, if you had their profile link saved, you might see a limited view, but you won\'t be able to interact with it.',
            },
            {
              question: 'Will I know for sure if someone blocked me?',
              answer: 'Instagram doesn\'t notify you when someone blocks you, and there\'s no definitive way to know for certain. Signs like "User not found" or inability to see their profile can indicate blocking, but they can also mean the account was deleted, deactivated, or made private. The only way to know for sure is if the person tells you.',
            },
            {
              question: 'What happens to our messages if they block me?',
              answer: 'If someone blocks you, your previous direct messages will show "This message is unavailable" or similar error messages. You won\'t be able to send new messages to them, and any existing conversation may appear broken or inaccessible. The messages aren\'t deleted, but they become unavailable to view.',
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
              <h2 className="text-2xl font-bold text-gray-900">Definition: What is Instagram Blocking?</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Being blocked on Instagram</strong> means that someone has used Instagram's block feature to prevent you from seeing their profile, posts, stories, and from interacting with them. When someone blocks you, you lose access to their account content, and they won't see your content either. Instagram doesn't notify you when someone blocks you, making it difficult to know for certain.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Instagram's block feature is a privacy tool that allows users to prevent specific accounts from viewing their content and interacting with them. When you're blocked, you typically can't find their profile when searching, can't see their posts or stories, and previous messages may become unavailable. However, these signs can also indicate other scenarios like account deletion, deactivation, or privacy settings.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              It's important to note that there's no definitive way to know for certain if someone has blocked you, as the signs of blocking can also indicate other situations. Instagram doesn't provide official notifications or tools to check if you've been blocked.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-blue-800 text-sm">
                <strong>Key Point:</strong> Instagram doesn't notify you when someone blocks you, and there's no definitive way to know for certain. Signs like "User not found" can indicate blocking, but they can also mean the account was deleted, deactivated, or made private.
              </p>
            </div>
          </section>

          {/* What Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <Instagram className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">What: Understanding Instagram Blocking</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              When someone blocks you on Instagram, here's what happens:
            </p>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <UserX className="w-5 h-5 text-red-600" />
                  Profile Inaccessibility
                </h3>
                <p className="text-gray-700 text-sm mb-2">You typically cannot find their profile when searching for their username. If you try to access their profile directly (via saved link), you may see "User not found" or a blank profile with "No posts yet" and no profile picture.</p>
                <p className="text-gray-600 text-xs">Searching for their username may return no results.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Posts and Stories Hidden
                </h3>
                <p className="text-gray-700 text-sm mb-2">You cannot see their posts, stories, reels, or any content they share. If you previously followed them, their posts will disappear from your feed, and you'll be automatically unfollowed.</p>
                <p className="text-gray-600 text-xs">All their content becomes invisible to you.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  Messages Become Unavailable
                </h3>
                <p className="text-gray-700 text-sm mb-2">Previous direct messages may show "This message is unavailable" or similar error messages. You cannot send new messages to them, and any existing conversation may appear broken or inaccessible.</p>
                <p className="text-gray-600 text-xs">The messages aren't deleted but become unavailable.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  Automatic Unfollow
                </h3>
                <p className="text-gray-700 text-sm mb-2">If you were following them, you'll be automatically unfollowed when they block you. You'll also be removed from their followers list, and they'll be removed from your following list.</p>
                <p className="text-gray-600 text-xs">The follow relationship is severed in both directions.</p>
              </div>
            </div>
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <p className="text-green-800 text-sm">
                <strong>Important:</strong> These signs can also indicate other scenarios like account deletion, deactivation, or privacy settings. There's no definitive way to know for certain if you've been blocked without the person telling you.
              </p>
            </div>
          </section>

          {/* When Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">When: When to Check If You've Been Blocked</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              You might want to check if someone has blocked you in these situations:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Sudden Profile Disappearance</h3>
                  <p className="text-gray-700 text-sm">If someone's profile suddenly disappears from your following list or you can't find them when searching, they may have blocked you. This is especially suspicious if you were recently interacting with them.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Messages Become Unavailable</h3>
                  <p className="text-gray-700 text-sm">If previous direct messages suddenly show "This message is unavailable" or error messages, and you can't send new messages, they may have blocked you. This is a strong indicator of blocking.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Relationship Changes</h3>
                  <p className="text-gray-700 text-sm">If you've had a falling out, argument, or relationship change, and you notice you can't see their content anymore, they may have blocked you. This is common after conflicts or breakups.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <CheckCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Unable to Tag or Mention</h3>
                  <p className="text-gray-700 text-sm">If you can't tag them in posts, mention them in comments, or they don't appear in search when you try to mention them, they may have blocked you. This prevents all forms of interaction.</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <p className="text-orange-800 text-sm">
                <strong>Consideration:</strong> Before assuming you've been blocked, consider other possibilities like account deletion, deactivation, or privacy settings. The signs of blocking can also indicate other scenarios.
              </p>
            </div>
          </section>

          {/* How To Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Search className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">How To: Methods to Check If You've Been Blocked</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Important Note:</strong> There's no definitive way to know for certain if someone has blocked you. These methods can help identify potential blocking, but the signs can also indicate account deletion, deactivation, or privacy settings.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 1: Search for Their Profile</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Search for Their Username</h4>
                    <p className="text-gray-700 text-sm mb-2">Open Instagram and use the search function to look for their exact username. If you're blocked, the search may return no results, or you may see "User not found".</p>
                    <p className="text-gray-600 text-xs">Make sure you're searching for the exact username, including any underscores or numbers.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Check the Results</h4>
                    <p className="text-gray-700 text-sm mb-2">If their profile doesn't appear in search results, or if you see "User not found" when trying to access their profile, they may have blocked you. However, this can also mean the account was deleted or deactivated.</p>
                    <p className="text-gray-600 text-xs">This is not definitive proof of blocking.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 2: Check Direct Messages</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Open Your Messages</h4>
                    <p className="text-gray-700 text-sm mb-2">Go to your Instagram Direct Messages and look for your conversation with the person. If you were previously messaging them, check if the conversation is still accessible.</p>
                    <p className="text-gray-600 text-xs">Look for the conversation in your messages list.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Check for Error Messages</h4>
                    <p className="text-gray-700 text-sm mb-2">If previous messages show "This message is unavailable", "User not found", or similar error messages, they may have blocked you. Try sending a new message - if it fails or shows an error, this is a strong indicator of blocking.</p>
                    <p className="text-gray-600 text-xs">Error messages in conversations are a strong sign of blocking.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 3: Check Following/Followers Lists</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Check Your Following List</h4>
                    <p className="text-gray-700 text-sm mb-2">Go to your profile and check your "Following" list. If you were following them and they're no longer in your following list, they may have blocked you (Instagram automatically unfollows when you're blocked).</p>
                    <p className="text-gray-600 text-xs">Being removed from following is a sign of blocking.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Check Mutual Friends</h4>
                    <p className="text-gray-700 text-sm mb-2">If you have mutual friends, check if they can still see the person's profile. If mutual friends can see the profile but you can't, this is a strong indicator that you've been blocked (assuming the account wasn't deleted).</p>
                    <p className="text-gray-600 text-xs">Comparing with mutual friends can help confirm blocking.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Method 4: Try to Tag or Mention Them</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Try to Tag Them</h4>
                    <p className="text-gray-700 text-sm mb-2">Try to tag them in a post or story, or mention them in a comment. If they don't appear in the search results when you try to tag or mention them, they may have blocked you.</p>
                    <p className="text-gray-600 text-xs">Blocked users won't appear in tag or mention searches.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Check the Result</h4>
                    <p className="text-gray-700 text-sm mb-2">If their username doesn't appear when you try to tag or mention them, and you know the account still exists (mutual friends can see it), this is a strong indicator that you've been blocked.</p>
                    <p className="text-gray-600 text-xs">This method works best if you can verify the account still exists.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 bg-pink-50 border-l-4 border-pink-500 p-4 rounded-r-lg">
              <p className="text-pink-800 text-sm">
                <strong>Reality Check:</strong> There's no definitive way to know for certain if someone has blocked you. These methods can help identify potential blocking, but the signs can also indicate account deletion, deactivation, or privacy settings. The only way to know for sure is if the person tells you.
              </p>
            </div>
          </section>

          {/* Why Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Why: Why Know If You've Been Blocked</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Understanding if someone has blocked you is important for several reasons:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                  Relationship Clarity
                </h3>
                <p className="text-gray-700 text-sm">Knowing if you've been blocked provides clarity about the status of your relationship. It helps you understand where you stand and whether the person wants to maintain contact or has chosen to cut off communication.</p>
              </div>
              <div className="p-5 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Avoid Wasted Effort
                </h3>
                <p className="text-gray-700 text-sm">If you've been blocked, knowing this helps you avoid wasting effort trying to contact or interact with someone who has chosen to block you. It allows you to move on and focus your energy elsewhere.</p>
              </div>
              <div className="p-5 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-600" />
                  Understand Social Dynamics
                </h3>
                <p className="text-gray-700 text-sm">Understanding if you've been blocked helps you understand social dynamics and relationships. It can provide insight into conflicts, misunderstandings, or relationship changes that may have led to the blocking.</p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <UserX className="w-5 h-5 text-orange-600" />
                  Respect Boundaries
                </h3>
                <p className="text-gray-700 text-sm">If someone has blocked you, knowing this helps you respect their boundaries. It signals that they don't want contact, and respecting this is important for healthy social interactions.</p>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-red-800 text-sm">
                <strong>Important:</strong> If you discover you've been blocked, respect the person's decision. Don't try to circumvent the block or create new accounts to contact them. Respecting boundaries is important for healthy relationships and social interactions.
              </p>
            </div>
          </section>

          {/* Alternative Explanations Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Alternative Explanations for Blocking Signs</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The signs of blocking can also indicate other scenarios:
            </p>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Account Deletion</h3>
                <p className="text-gray-700 text-sm mb-2">If someone deletes their Instagram account, you'll see similar signs (profile not found, messages unavailable). This is different from blocking - the account simply no longer exists.</p>
                <p className="text-gray-600 text-xs">Account deletion is permanent and affects everyone, not just you.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Account Deactivation</h3>
                <p className="text-gray-700 text-sm mb-2">If someone temporarily deactivates their account, you'll see similar signs. The account is hidden but can be reactivated later. This is temporary, unlike blocking which is active until the person unblocks you.</p>
                <p className="text-gray-600 text-xs">Deactivation is temporary and affects everyone.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Username Change</h3>
                <p className="text-gray-700 text-sm mb-2">If someone changes their username, you may not be able to find them if you're searching for their old username. Try searching for their new username or check if mutual friends can still see them.</p>
                <p className="text-gray-600 text-xs">Username changes can make accounts temporarily hard to find.</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Privacy Settings</h3>
                <p className="text-gray-700 text-sm mb-2">If someone makes their account private and you're not following them, you may not be able to see their profile or content. This is different from blocking - you can still request to follow them.</p>
                <p className="text-gray-600 text-xs">Private accounts can still be found and followed (with approval).</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Will Instagram notify me if someone blocks me?</h3>
                <p className="text-gray-700 leading-relaxed">No, Instagram doesn't notify you when someone blocks you. There's no official notification or message indicating that you've been blocked. You'll need to look for signs like inability to find their profile, messages becoming unavailable, or being removed from their followers list.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I still see their profile if they blocked me?</h3>
                <p className="text-gray-700 leading-relaxed">No, if someone blocks you on Instagram, you typically cannot see their profile, posts, stories, or any account information. Searching for their username may show "User not found" or a blank profile. However, if you had their profile link saved, you might see a limited view, but you won't be able to interact with it.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What's the difference between being blocked and account deletion?</h3>
                <p className="text-gray-700 leading-relaxed">If someone blocks you, only you can't see their account - others can still see it. If someone deletes their account, no one can see it. To tell the difference, ask a mutual friend if they can still see the person's profile. If mutual friends can see it but you can't, you've likely been blocked.</p>
              </div>
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I unblock myself if someone blocks me?</h3>
                <p className="text-gray-700 leading-relaxed">No, you cannot unblock yourself. Only the person who blocked you can unblock you. If someone has blocked you, you'll need to wait for them to unblock you, or you can try contacting them through other means (though this may not be appropriate depending on the situation).</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What should I do if I discover I've been blocked?</h3>
                <p className="text-gray-700 leading-relaxed">If you discover you've been blocked, respect the person's decision and boundaries. Don't try to circumvent the block by creating new accounts or using other methods to contact them. Respecting boundaries is important for healthy relationships. Focus on moving forward and maintaining other relationships.</p>
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
          <FeedbackForm toolName="How to Know If Someone Blocked You on Instagram Guide" />
        </section>
      </main>
    </div>
  );
}
