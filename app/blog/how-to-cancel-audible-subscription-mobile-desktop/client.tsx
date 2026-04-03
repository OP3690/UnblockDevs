'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps, QuickFact, ErrorFix,
} from '@/components/blog/BlogVisuals';

export default function HowToCancelAudibleSubscriptionMobileDesktopClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Cancel Audible Subscription — Desktop and Mobile (Step-by-Step)</h1>
      <p className="lead">
        Canceling Audible takes just a few minutes. Your purchased audiobooks stay in your library
        forever — canceling only stops future charges and monthly credit accrual. This guide covers
        every cancellation method across desktop, iOS, and Android, explains what happens to your
        books and credits, and shows you how to request a refund if you were charged unexpectedly.
      </p>

      <StatGrid stats={[
        { value: 'Books stay', label: 'purchased audiobooks remain in your library forever', color: 'green' },
        { value: 'Credits lost', label: 'unused credits are forfeited on cancellation — use them first!', color: 'amber' },
        { value: '3 methods', label: 'website, iOS Settings, Android Play Store', color: 'blue' },
        { value: 'Pause option', label: '1–3 month pause available as alternative to cancellation', color: 'purple' },
      ]} />

      <AlertBox type="warning" title="Use your credits before canceling">
        Unused Audible credits are forfeited immediately when you cancel — they have no cash value
        and cannot be refunded. Go to audible.com, browse the store, and redeem every remaining credit
        for audiobooks before you begin the cancellation process. Each credit can be exchanged for any
        audiobook regardless of price.
      </AlertBox>

      <SectionHeader number={1} title="Cancel on Desktop (audible.com)" />
      <p>
        The website method works from any computer or mobile browser and is the most reliable cancellation
        path for accounts subscribed directly through Audible or Amazon. If you subscribed through the
        Audible website, Amazon Prime, or an Amazon-billed promotion, this is the method to use. The
        desktop website gives you the most control, shows all retention offers clearly, and confirms
        cancellation with an email receipt.
      </p>
      <VerticalSteps steps={[
        { title: 'Go to audible.com and sign in', desc: 'Use the same Amazon account credentials linked to your Audible subscription. If you\'re not sure which Amazon account is linked, try the email associated with your Audible welcome or billing emails.' },
        { title: 'Click your name or account icon', desc: 'In the top right corner of audible.com, click your name or the account icon to open the dropdown menu. Select "Account Details" or "Hi, [Your Name]" → "Account Details."' },
        { title: 'Find the Membership Details section', desc: 'On the Account Details page, scroll down to find the "Membership Details" or "Your Membership" section showing your current plan and billing date.' },
        { title: 'Click "Cancel Membership"', desc: 'This is typically a small text link rather than a prominent button — Audible deliberately makes it less visible. If you don\'t see it, look for "Manage Membership" which leads to the same cancellation options.' },
        { title: 'Navigate through the retention flow', desc: 'Audible shows a series of retention offers before confirming cancellation: discounted months, plan downgrades, or the option to pause. Review these and click through to decline all offers if you want to fully cancel.' },
        { title: 'Confirm cancellation', desc: 'Click "Cancel Membership" on the final confirmation page. You\'ll see a confirmation message and receive a cancellation confirmation email with your final access date.' },
      ]} />

      <QuickFact color="blue" label="Where to find the cancel link">
        On some browsers Audible shows the cancel option at audible.com/account/membership — navigate
        there directly if you can't find it through Account Details. Sign in first, then go to that URL.
      </QuickFact>

      <SectionHeader number={2} title="Cancel on iPhone and iPad" />
      <p>
        The Audible iOS app does not include a cancellation option — Apple's App Store policies
        require subscriptions started on the App Store to be canceled through iOS Settings,
        and direct Audible subscriptions must be canceled through the website. Before you cancel,
        determine which billing method you used when you first signed up. Your credit card statement
        is the most reliable indicator.
      </p>
      <VerticalSteps steps={[
        { title: 'Determine where you subscribed', desc: 'Check whether you\'re being billed by Audible/Amazon or by Apple. Look at your credit card statements — charges from "Amazon" or "Audible" indicate a direct subscription; charges from "Apple" indicate an App Store subscription.' },
        { title: 'For direct Audible subscriptions', desc: 'Open Safari or Chrome on your iPhone → go to audible.com → sign in → Account Details → Cancel Membership. Use the desktop method through your mobile browser.' },
        { title: 'For Apple App Store subscriptions', desc: 'Open Settings → tap your name at the top → Subscriptions → find Audible in the list → tap it → tap "Cancel Subscription" → confirm. This is the only way to cancel App Store-billed Audible subscriptions.' },
        { title: 'Confirm via email', desc: 'After canceling either way, check your email for a cancellation confirmation. If no email arrives within 15 minutes, the cancellation may not have completed — repeat the steps or contact customer service.' },
      ]} />

      <AlertBox type="info" title="How to tell if Audible billed Apple or Amazon">
        On iPhone, open Settings → your name → Subscriptions. If Audible appears here, Apple is billing
        you and you cancel through iOS Settings. If Audible does not appear in this list, you have a
        direct Audible or Amazon subscription — cancel through audible.com instead.
      </AlertBox>

      <SectionHeader number={3} title="Cancel on Android" />
      <p>
        Android users have two possible billing sources: Audible directly (billed through Amazon) or
        Google Play. The Audible Android app may show a cancellation link for direct subscribers,
        and the Google Play Store handles cancellation for Play-billed accounts. Check which payment
        source appears on your bank statement before starting.
      </p>
      <VerticalSteps steps={[
        { title: 'Check where you subscribed', desc: 'Open the Audible app → tap the profile icon (bottom right or menu) → My Account → Membership. This shows whether you\'re billed by Audible directly or by Google Play.' },
        { title: 'Cancel through Audible app (if billed by Audible)', desc: 'In the Audible app: tap the menu → My Account → scroll to find "Cancel Membership." Alternatively, open Chrome → audible.com → Account Details → Cancel Membership.' },
        { title: 'Cancel through Google Play (if billed by Google)', desc: 'Open the Google Play Store → tap your profile icon → Payments & subscriptions → Subscriptions → find Audible → tap Cancel subscription → follow the prompts to confirm.' },
        { title: 'Verify the cancellation status', desc: 'Return to the Audible app → My Account → Membership. It should now show your membership end date rather than a renewal date. If it still shows a future renewal date, the cancellation did not complete.' },
      ]} />

      <SectionHeader number={4} title="Cancel via Customer Service (Fastest Method)" />
      <p>
        Audible's website cancellation flow is intentionally designed with multiple steps and retention
        offers. Many users find that contacting customer service directly is the fastest and easiest
        cancellation path. Customer service representatives can cancel immediately in a single
        conversation and can also review refund eligibility at the same time.
      </p>
      <VerticalSteps steps={[
        { title: 'Go to audible.com/ep/cs', desc: 'Navigate to Audible\'s customer service page. Sign in to your Audible account first so the representative can immediately access your account details.' },
        { title: 'Start a live chat', desc: 'Select the live chat option — this is typically faster than phone. Tell the agent: "I would like to cancel my Audible membership." They can process this in under 2 minutes.' },
        { title: 'Phone option available in the US', desc: 'Call 1-888-283-5051 in the United States. Available Monday–Friday 9am–5pm ET. Have your Amazon account email address ready to verify your identity.' },
        { title: 'Ask about refunds in the same call', desc: 'If you were recently charged and haven\'t used your credit yet, ask the representative about a refund during the same interaction. First-time refund requests are frequently approved.' },
      ]} />

      <SectionHeader number={5} title="What Happens After Cancellation" />
      <KeyPointsGrid items={[
        { title: 'Audiobooks stay forever', description: 'All books you purchased with Audible credits or bought outright remain in your library permanently and can be downloaded and listened to without an active subscription. The Audible app remains free to use for your owned library after cancellation.' },
        { title: 'Unused credits are lost immediately', description: 'Any remaining monthly credits are forfeited when you cancel. This is the most important thing to do before canceling — redeem every credit. There are no exceptions or ways to recover forfeited credits.' },
        { title: 'Premium pricing ends', description: 'Audible member pricing (typically 30% off audiobook purchases) ends when your membership expires. You can still buy audiobooks as a non-member at full price.' },
        { title: 'Access continues until billing period end', description: 'Your membership remains active and you keep member pricing until the end of your current billing cycle. You are not cut off immediately after canceling.' },
        { title: 'Amazon Household sharing affected', description: 'If you shared your Audible membership through Amazon Household, the other household member also loses access to the membership benefits when you cancel.' },
        { title: 'Whispersync stays active', description: 'Whispersync for Voice (the feature that syncs your reading position between Kindle ebook and Audible audiobook) remains functional for books you own on both platforms, even after cancellation.' },
      ]} />

      <CompareTable
        leftLabel="Active Membership"
        rightLabel="After Cancellation"
        rows={[
          { label: 'Monthly credits', left: '1 credit per month (or more on premium plans)', right: 'No new credits — existing credits are forfeited' },
          { label: 'Purchased audiobooks', left: 'Fully accessible', right: 'Fully accessible — permanently yours' },
          { label: 'Member discount', left: '30% off store purchases', right: 'No discount — full list price' },
          { label: 'Monthly charge', left: 'Billed on renewal date', right: 'No further charges' },
          { label: 'Whispersync', left: 'Active', right: 'Active for owned books' },
          { label: 'Amazon Household', left: 'Shared with household member', right: 'Household member loses access' },
          { label: 'Audible app', left: 'Full member access', right: 'Free tier — library access only' },
        ]}
      />

      <QuickFact color="green" label="Pause instead of cancel">
        If you're taking a temporary break, consider pausing your membership for 1, 2, or 3 months instead
        of canceling. During a pause: billing stops, you keep your unused credits (they don't accrue more
        but existing credits are preserved), and your library remains intact. You can resume anytime.
        Access Account Details → Pause Membership to find this option.
      </QuickFact>

      <SectionHeader number={6} title="Requesting a Refund from Audible" />
      <p>
        Audible has several refund policies depending on whether you're requesting a subscription refund
        or an audiobook refund. The policies are relatively generous compared to other streaming services,
        but they have specific eligibility windows and conditions.
      </p>
      <KeyPointsGrid items={[
        { title: '30-day subscription refund window', description: 'Audible offers refunds on subscription fees within 30 days of renewal if you haven\'t used your credit for that month. Contact Audible Customer Service through chat or phone. First-time requests are generally approved. Provide the charge date and explain it was unexpected.' },
        { title: 'Great Listen Guarantee for books', description: 'Audible\'s "Great Listen Guarantee" allows you to return audiobooks you\'re not satisfied with within 365 days. You get your credit back, and the book is removed from your library. This applies to credit purchases and outright purchases.' },
        { title: 'App Store refunds (Apple billing)', description: 'If charged by Apple: request refunds at reportaproblem.apple.com. Select the Audible charge and choose the appropriate reason. Apple processes these refunds independently of Audible — Audible cannot refund App Store charges.' },
        { title: 'Google Play refunds', description: 'For Google Play-billed charges: contact Google Play support through support.google.com/googleplay. Google has a 48-hour refund window for subscriptions from the moment of charge.' },
        { title: 'Refund limit for audiobooks', description: 'While Audible is generally accommodating, returning audiobooks too frequently may trigger a review of your account. Audible has been known to restrict the Great Listen Guarantee for accounts that return a very high proportion of their purchases.' },
        { title: 'Chargeback as a last resort', description: 'If Audible denies a refund you believe is legitimate, you can dispute the charge with your credit card issuer. Note that a chargeback typically results in immediate account termination — use this only if other options are exhausted.' },
      ]} />

      <SectionHeader number={7} title="Common Cancellation Problems and Fixes" />
      <ErrorFix
        error="The Cancel Membership button is not visible on the Account Details page"
        fix="Try accessing audible.com/account/membership directly while signed in. If still missing, use the customer service chat — they can cancel without you navigating the website. Some browsers also hide the link due to ad blockers interfering with Audible's page scripts; try disabling extensions."
      />
      <ErrorFix
        error="Cancellation went through but I was still charged the following month"
        fix="This usually means the cancellation didn't complete before the billing date. Check your email for a cancellation confirmation — no email means it didn't go through. Contact Audible customer service with your account email and the charge date. They can verify the cancellation date and issue a refund if the system error was on their side."
      />
      <ErrorFix
        error="I cancelled but the app still shows 'Member' status"
        fix="App badges update slowly. Check Account Details on audible.com — it should show your membership end date rather than a renewal date. If the website confirms cancellation, the app will update within 24 hours. If the website still shows active, the cancellation didn't complete."
      />
      <ErrorFix
        error="The iOS Subscriptions page doesn't show Audible"
        fix="Audible is not billed through Apple for your account. You have a direct Amazon subscription. Cancel at audible.com → Account Details → Cancel Membership, or contact Audible customer service by chat."
      />

      <AlertBox type="tip" title="Customer service is the fastest cancellation path">
        Audible's website cancellation flow is designed to require several clicks through retention offers.
        Contacting Audible Customer Service by chat at audible.com/ep/cs or by phone (1-888-283-5051 in the US)
        often gets you canceled in under 2 minutes with a single request. They can also honor refund requests
        in the same interaction.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Will I lose my audiobooks if I cancel Audible?',
          answer: 'No. All audiobooks you purchased with credits or bought directly remain permanently in your Audible library. You can download and listen to them anytime using the free Audible app, even without an active subscription. The only things you lose are: the ability to earn new credits, member pricing discounts, and any unused credits you didn\'t redeem before canceling.',
        },
        {
          question: 'Can I get a refund from Audible?',
          answer: 'Audible offers a 30-day refund policy on subscription fees if you haven\'t used your credit for that billing cycle. Contact Customer Service directly — they are generally accommodating with first-time refund requests. For audiobooks themselves, the Great Listen Guarantee allows returns within 365 days if you\'re not satisfied — you get your credit back and the book is removed from your library.',
        },
        {
          question: 'How do I cancel Audible if I can\'t find the cancel button?',
          answer: 'The cancel button is deliberately difficult to find on Audible\'s website. If you can\'t locate it: (1) Try audible.com/account in a browser while signed in. (2) Contact Audible Customer Service by chat at audible.com/ep/cs — they can cancel immediately. (3) Call 1-888-283-5051 in the US. Customer service cancellation is often faster than navigating the website flow.',
        },
        {
          question: 'What happens to my Audible credits if I cancel?',
          answer: 'Unused credits are forfeited immediately upon cancellation with no refund or cash value. This is the most consequential part of canceling — always redeem all credits before canceling. Each credit can be exchanged for any audiobook in the Audible catalog regardless of price, including $30–$40 long audiobooks. Use credits for the highest-priced titles to maximize their value.',
        },
        {
          question: 'Can I rejoin Audible after canceling?',
          answer: 'Yes — you can resubscribe at any time. When you resubscribe, your previous library of purchased audiobooks is fully restored and accessible. You typically can\'t reclaim the credits you forfeited, but Audible frequently offers win-back promotions (3 months for 99 cents per month) to returning members. If you\'re considering canceling due to price, waiting for a win-back offer may save money.',
        },
        {
          question: 'Does Audible have a free tier after canceling?',
          answer: 'No — Audible doesn\'t offer a free subscription tier. After canceling, you\'re no longer a member and won\'t receive monthly credits or member pricing. However, you keep full access to all previously purchased audiobooks through the free Audible app. You can also buy audiobooks as a non-member at full price, or purchase Audible Original titles that are sometimes available for free.',
        },
        {
          question: 'How do I pause my Audible membership instead of canceling?',
          answer: 'Go to audible.com → sign in → Account Details → Membership Details → look for "Pause Membership." You can pause for 1, 2, or 3 months. During a pause, billing stops and you retain any unused credits — they don\'t accrue new credits but existing ones are preserved. You can resume at any time before the pause period ends. Pausing is the best option if you\'re going through a reading slump or a tight financial period temporarily.',
        },
        {
          question: 'Will canceling Audible affect my Amazon Prime membership?',
          answer: 'No — Audible and Amazon Prime are separate subscriptions billed independently. Canceling Audible has no effect on your Amazon Prime status, Prime Video access, or any other Amazon services. They share your Amazon account for login but operate completely separately for billing and benefits.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
