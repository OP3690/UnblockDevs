'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function InstagramPasswordResetEmailGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Instagram Password Reset Email — Full Guide to Recovering Your Account</h1>
      <p className="lead">
        Whether you forgot your password, never received the reset email, or lost access to the
        email account linked to Instagram, this guide covers every account recovery method available.
        We'll walk through the standard password reset flow, why reset emails sometimes fail to arrive,
        how to recover without email or phone access, and what to do if your account was hacked.
      </p>

      <StatGrid stats={[
        { value: '5 minutes', label: 'standard password reset via email', color: 'green' },
        { value: 'SMS backup', label: 'use phone number if email doesn\'t work', color: 'blue' },
        { value: 'Identity verify', label: 'selfie verification for accounts without email/phone access', color: 'purple' },
        { value: '24-48 hrs', label: 'account recovery via identity review takes longer', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Standard Password Reset via Email" />
      <p>
        If you still have access to the email address linked to your Instagram account, the standard
        reset flow takes about five minutes. Instagram sends reset links from <code>no-reply@mail.instagram.com</code> —
        make sure to check your spam folder if the email doesn't appear in your inbox within a few minutes.
      </p>
      <VerticalSteps steps={[
        { title: 'Open the Instagram app or website', desc: 'On mobile, open the app and tap "Forgot password?" below the login fields. On desktop, go to instagram.com and click "Forgot password?".' },
        { title: 'Enter your email, phone, or username', desc: 'Instagram accepts any of these to identify your account. Using your email or phone number is faster — it routes the reset directly to that contact method.' },
        { title: 'Select "Send an email"', desc: 'If you have multiple contact options on file (email and phone), choose email from the list.' },
        { title: 'Check your email inbox', desc: 'Look for an email from no-reply@mail.instagram.com. Check your Spam, Junk, and Promotions tabs if it isn\'t in the main inbox. The subject line will be "Password reset for Instagram."' },
        { title: 'Click the reset link', desc: 'The link in the email expires within a few hours. Click it to open a page where you can set a new password. Don\'t share this link with anyone.' },
        { title: 'Set a strong new password', desc: 'Use a combination of letters, numbers, and symbols. Avoid using the same password as your email account or other social media accounts.' },
        { title: 'Log in with your new password', desc: 'Return to the Instagram login screen and sign in with your updated credentials. Consider enabling two-factor authentication immediately after.' },
      ]} />

      <SectionHeader number={2} title="Reset Email Not Arriving — Troubleshooting" />
      <p>
        The Instagram reset email failing to arrive is one of the most common account recovery frustrations.
        There are several reasons this happens and specific steps to resolve each one.
      </p>
      <KeyPointsGrid items={[
        { title: 'Check spam, junk, and all folders', description: 'Instagram emails frequently land in spam. In Gmail, also check the Promotions and Updates tabs. In Outlook, check the Junk Email folder. Search for "Instagram" or "no-reply@mail.instagram.com" across all folders.' },
        { title: 'Verify the correct email address', description: 'Make sure you\'re checking the email account that was actually linked to your Instagram when you signed up. If you\'re unsure, try entering your username or phone number on the forgot password screen instead — this shows which contact methods are available.' },
        { title: 'Wait and request only once', description: 'Email delivery can take 5–15 minutes during high traffic periods. Clicking "Resend" multiple times can actually delay delivery further. Wait 15 minutes before requesting again.' },
        { title: 'Switch to SMS verification', description: 'On the forgot password screen, choose "Get help via text message (SMS)" instead of email. SMS codes typically arrive within seconds and bypass email delivery issues entirely.' },
        { title: 'Check your email provider settings', description: 'Some corporate email providers and email clients have aggressive spam filtering that blocks marketing and social media emails at the server level, before they reach your inbox. Try accessing your email through webmail rather than an email client app.' },
        { title: 'Try on a different device or browser', description: 'Sometimes browser cookies or cached session data interfere with the forgot password flow. Try in incognito mode or on a different device to ensure a clean request.' },
      ]} />

      <AlertBox type="warning" title="Beware of Instagram impersonation scams">
        Instagram will NEVER ask for your password in a password reset email. If you receive an email
        asking for your current password, directing you to enter credentials on an external website,
        or asking you to verify by clicking a suspicious link — it's a phishing attempt.
        Official Instagram reset emails come only from @mail.instagram.com or @instagram.com domains.
        Check the full sender address (not just the display name) before clicking any link.
      </AlertBox>

      <SectionHeader number={3} title="No Access to Email or Phone — Identity Verification" />
      <p>
        If you can't access the email or phone number linked to your account, Instagram offers an
        identity verification path. This process takes longer and involves submitting a video selfie
        that Instagram compares against the photos on your account.
      </p>
      <VerticalSteps steps={[
        { title: 'Tap "Get more help" on the login page', desc: 'This option appears below "Forgot password?" on the Instagram login screen.' },
        { title: 'Select "I can\'t access this email or phone number"', desc: 'Instagram presents additional recovery options when you indicate that standard contact methods aren\'t available.' },
        { title: 'Request a login link to a new email', desc: 'Enter a new email address you currently have access to. Instagram will send the recovery link there after verification.' },
        { title: 'Submit a video selfie', desc: 'Instagram asks you to record a short selfie video turning your head in different directions. This is compared algorithmically against the photos on your profile to confirm you are the account owner.' },
        { title: 'Wait for identity review', desc: 'Identity verification review typically takes 24–48 hours. Instagram will send the result to the new email address you provided. The review can be expedited if your profile has many recent photos of your face.' },
        { title: 'Set a new password', desc: 'If identity verification succeeds, Instagram sends a link to reset your password. Use this link immediately — it expires after a short window.' },
      ]} />

      <QuickFact color="amber" label="Identity verification tip">
        Identity verification works best when your Instagram profile has multiple recent photos of your
        face with clear lighting. If your account has no photos, uses a logo or avatar, or has very few
        posts, identity verification may fail or take longer because there's less visual data to compare
        against your selfie video.
      </QuickFact>

      <SectionHeader number={4} title="Account Hacked — What to Do Immediately" />
      <p>
        If your account was compromised and a hacker changed the email or phone number, you have a
        short window to act before the account is fully locked. Move quickly through these steps.
      </p>
      <KeyPointsGrid items={[
        { title: 'Check your original email for a security alert', description: 'When Instagram account information is changed, Instagram sends a security alert to the previous email address. This alert contains a "Revert this change" link. This link is only valid for a few hours — click it immediately to undo the email change and regain access.' },
        { title: 'Use the "Secure my account" option', description: 'On the Instagram login screen, tap "Forgot password?" → "Get more help" → "My account was hacked." This initiates Instagram\'s account compromise recovery flow, which is separate from the standard password reset.' },
        { title: 'Report through the Help Center', description: 'Go to help.instagram.com → "Privacy and Safety Center" → "Report Something" → "Hacked Accounts." Filing an official report adds documentation to your recovery case and can expedite manual review.' },
        { title: 'Contact Instagram via Facebook', description: 'If you have a linked Facebook account, you can sometimes recover Instagram access through Facebook\'s account recovery tools. Go to facebook.com and look for Instagram account recovery options in the Help Center.' },
        { title: 'Document everything', description: 'Screenshot any security notifications you receive, note the timestamps, and collect any communication from the hacker. This documentation helps Instagram\'s support team verify your case is legitimate.' },
      ]} />

      <SectionHeader number={5} title="Preventing Future Password and Account Issues" />
      <KeyPointsGrid items={[
        { title: 'Enable two-factor authentication', description: 'Settings → Security → Two-Factor Authentication → Enable with an authenticator app (not just SMS). Authenticator app 2FA is much harder for hackers to bypass than SMS, which can be SIM-swapped.' },
        { title: 'Keep recovery contact information updated', description: 'Whenever you change your phone number or email address in real life, update it in Instagram settings immediately. Outdated contact info is the single most common reason people can\'t recover accounts.' },
        { title: 'Use a unique password for Instagram', description: 'If you use the same password across multiple services, a data breach at any one of them exposes all your accounts. Use a password manager to generate and store unique passwords.' },
        { title: 'Check linked apps periodically', description: 'Settings → Security → Apps and Websites. Revoke access for any apps you no longer use. Third-party apps with account access can be entry points for compromise if those apps have security issues.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What if my Instagram account was hacked and the email was changed?',
          answer: 'Check your original email immediately for an Instagram security alert — it contains a "Revert this change" link that is valid for a few hours. If you missed that window, use the "Get more help" flow on the login screen and request identity verification. Report the hack at help.instagram.com. Time is critical — hackers typically change the connected phone and email within minutes of gaining access.',
        },
        {
          question: 'Can I reset my Instagram password without email or phone?',
          answer: 'Yes — through identity verification (video selfie). Instagram compares your selfie video against your profile photos. This works best if your account has many photos of your face with clear lighting. If your account has no personal photos or uses a non-person avatar, identity verification is harder and may not succeed. In that case, recovering through a linked Facebook account is the alternative.',
        },
        {
          question: 'How do I contact Instagram support directly for account recovery?',
          answer: 'Instagram does not have a phone number or public email for direct support. All support is through the app and Help Center. In the app: Settings → Help → Report a Problem → Something isn\'t working → Account access. Or visit help.instagram.com → Login and password → I can\'t access my account. Response times vary from hours to several days depending on request volume.',
        },
        {
          question: 'Why does Instagram say my account doesn\'t exist when I try to reset?',
          answer: 'This happens when: (1) you\'re searching by an email or username that isn\'t linked to any Instagram account, (2) the account was deactivated or permanently deleted, or (3) you\'re searching for an account that was disabled by Instagram for policy violations. Try searching with your username, email, and phone number separately. If none find the account, it may no longer exist.',
        },
        {
          question: 'How long does the Instagram reset link stay valid?',
          answer: 'Instagram password reset links expire within a few hours of being sent. If you request a reset email and don\'t use the link within that window, you\'ll need to request a new one. Do not click "Resend" multiple times in quick succession — wait at least 15 minutes between requests to allow delivery and avoid triggering rate limits.',
        },
        {
          question: 'Can I log into Instagram with Facebook to bypass the password reset?',
          answer: 'Yes — if your Instagram account is linked to a Facebook account and you can still access Facebook. On the Instagram login screen, tap "Continue with Facebook." This logs you in without needing your Instagram password. Once logged in, go to Settings → Security → Password to set a new Instagram-specific password.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
