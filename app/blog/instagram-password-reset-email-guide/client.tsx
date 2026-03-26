'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function InstagramPasswordResetEmailGuideClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Instagram Password Reset Email — Full Guide to Recovering Your Account</h1>
      <p className="lead">
        Whether you forgot your password or never received the reset email, this guide walks
        through every Instagram account recovery method — including when the reset email
        doesn't arrive and alternative recovery options.
      </p>

      <StatGrid stats={[
        { value: '5 minutes', label: 'standard password reset via email', color: 'green' },
        { value: 'SMS backup', label: 'use phone number if email doesn\'t work', color: 'blue' },
        { value: 'Identity verify', label: 'selfie verification for account recovery without email/phone', color: 'purple' },
        { value: '24-48 hrs', label: 'account recovery via support takes longer', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Standard Password Reset via Email" />
      <VerticalSteps steps={[
        { title: 'Open Instagram login screen', description: 'Tap "Forgot password?" below the login fields.' },
        { title: 'Enter email, phone, or username', description: 'Instagram will send a reset link to your email or SMS code to your phone.' },
        { title: 'Select "Send an email"', description: 'If you have multiple options, choose email.' },
        { title: 'Check your email', description: 'Look for an email from Instagram (no-reply@mail.instagram.com). Check spam/junk if not in inbox.' },
        { title: 'Click the reset link', description: 'The link expires in a few hours. Click and set a new password.' },
        { title: 'Log in with new password', description: 'Use your new password to access your account.' },
      ]} />

      <SectionHeader number={2} title="Reset Email Not Arriving — Troubleshooting" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Check spam/junk folder', description: 'Instagram emails sometimes end up in spam. Check all folders including Promotions tab in Gmail.' },
        { title: 'Verify the email address', description: 'Make sure you\'re checking the correct email account linked to Instagram. Try with username or phone number instead.' },
        { title: 'Wait a few minutes', description: 'Email delivery can be delayed 5-10 minutes. Request only once — multiple requests can cause delays.' },
        { title: 'Try SMS instead', description: 'Go back to "Forgot password?" and choose to receive an SMS code instead of email. This often works faster.' },
      ]} />

      <SectionHeader number={3} title="No Access to Email or Phone — Identity Verification" />
      <VerticalSteps steps={[
        { title: 'Tap "Get more help" on the login page', description: 'Below the "Forgot password?" option.' },
        { title: 'Select "I can\'t access this email or phone number"', description: 'Instagram will offer additional recovery options.' },
        { title: 'Request a login link to a new email', description: 'Enter a new email address you have access to.' },
        { title: 'Verify your identity', description: 'Instagram may ask you to take a selfie video. This is compared against profile photos to confirm identity.' },
        { title: 'Wait for review', description: 'Identity verification can take 24-48 hours. Instagram sends the result to the new email address.' },
      ]} />

      <AlertBox type="warning" title="Beware of Instagram impersonation scams">
        Instagram will NEVER ask for your password in an email. If you receive an email asking
        for your current password or to "verify" by entering credentials on an external site —
        it's phishing. Official Instagram emails come from @mail.instagram.com or @instagram.com only.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'What if my Instagram account was hacked and email was changed?',
          answer: 'Check your original email for an Instagram security alert email — it contains a "Revert this change" link valid for a few hours. If you missed that window: use the "Get more help" flow and identity verification. Report the hack at help.instagram.com. Act fast — hackers often change connected phone/email within minutes.',
        },
        {
          question: 'Can I reset my Instagram password without email or phone?',
          answer: 'Yes — through identity verification (selfie video). Instagram compares your video selfie against your profile photos. This works best if your account has many photos of your face. If your account has no photos or uses a non-person photo, identity verification is harder and may fail.',
        },
        {
          question: 'How do I contact Instagram support directly for account recovery?',
          answer: 'Instagram support is only available through the app and help center — there is no phone number or email for direct support. Use: Help → Report a Problem → Something isn\'t working → Account access. Or visit help.instagram.com → Login and password → I can\'t access my account.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
