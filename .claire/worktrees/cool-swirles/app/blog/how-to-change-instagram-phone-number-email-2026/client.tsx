'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowToChangeInstagramPhoneEmailClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Change Instagram Phone Number &amp; Email Address (2026)</h1>
      <p className="lead">
        Whether you changed phone carriers, created a new email address, or simply want to update
        your Instagram contact info, this guide shows you exactly how to change your phone number
        and email on Instagram without losing your account or followers.
      </p>

      <StatGrid stats={[
        { value: '2 min', label: 'Time to update contact info', color: 'green' },
        { value: 'Both methods', label: 'App and browser covered', color: 'blue' },
        { value: 'Keep', label: 'Followers and posts unaffected', color: 'purple' },
        { value: 'Verified', label: 'New contact info must be verified', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Change Instagram Phone Number (Mobile App)" />

      <VerticalSteps steps={[
        {
          title: 'Open Instagram and go to your profile',
          description: 'Open the Instagram app and tap your profile icon in the bottom right.',
        },
        {
          title: 'Tap "Edit profile"',
          description: 'Tap the "Edit profile" button below your bio.',
        },
        {
          title: 'Tap "Personal information settings"',
          description: 'This takes you to the contact information section.',
        },
        {
          title: 'Tap "Phone number"',
          description: 'Tap the phone number field to edit it.',
        },
        {
          title: 'Enter your new phone number and verify',
          description: 'Enter the new number including country code. Instagram sends an SMS verification code — enter it to confirm.',
        },
      ]} />

      <SectionHeader number={2} title="Change Instagram Email Address (Mobile App)" />

      <VerticalSteps steps={[
        {
          title: 'Open Instagram → Profile → Edit profile',
          description: 'Navigate to your profile and tap "Edit profile".',
        },
        {
          title: 'Tap "Personal information settings"',
          description: 'Access your contact information settings.',
        },
        {
          title: 'Tap "Email address"',
          description: 'Tap the email field to edit.',
        },
        {
          title: 'Enter your new email address',
          description: 'Type your new email address.',
        },
        {
          title: 'Verify via the link sent to new email',
          description: 'Instagram sends a verification email. Click the link in that email to confirm the change.',
        },
      ]} />

      <SectionHeader number={3} title="Change Instagram Contact Info on Desktop (Browser)" />

      <VerticalSteps steps={[
        {
          title: 'Go to instagram.com and sign in',
          description: 'Open instagram.com in your browser.',
        },
        {
          title: 'Click your profile icon → Settings',
          description: 'Click the profile icon in the top right, then "Settings".',
        },
        {
          title: 'Click "Edit profile"',
          description: 'Click "Edit profile" in the left panel.',
        },
        {
          title: 'Update phone or email under "Personal Information"',
          description: 'Click the phone or email field, update the value, and save.',
        },
      ]} />

      <SectionHeader number={4} title="Important: Contact Info vs Login Info" />

      <CompareTable
        leftLabel="Contact info (profile)"
        rightLabel="Login email/phone"
        rows={[
          { label: 'Where to change', left: 'Edit Profile → Personal Information', right: 'Settings → Account → Personal Information → Change password/email' },
          { label: 'Purpose', left: 'How Instagram contacts you, account recovery', right: 'Used to sign in to Instagram' },
          { label: 'Affects login?', left: 'No — contact info only', right: 'Yes — changes how you log in' },
          { label: 'Verification required?', left: 'Yes — SMS code or email link', right: 'Yes — verify both old and new' },
        ]}
      />

      <AlertBox type="warning" title="Keep at least one verified contact method">
        If you remove a phone number or email without adding a new one, you may lose the ability
        to recover your account if you forget your password. Always add and verify the new
        contact info before removing the old one.
      </AlertBox>

      <SectionHeader number={5} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'Will changing my Instagram phone number affect my followers or posts?',
          answer: 'No. Your followers, posts, stories, messages, and username are completely unaffected by changing your phone number or email. These are contact/security details used for verification and account recovery only.',
        },
        {
          question: 'What if I cannot receive the SMS verification code?',
          answer: 'If you cannot receive the SMS: (1) check that you entered the correct country code; (2) check if your carrier blocks short-code SMS; (3) try using a different verification method (email instead of phone); (4) wait a few minutes and request the code again. If you no longer have access to the old phone number and need to recover your account, use Instagram\'s "Get more help" → "I can\'t access this email or phone number" recovery flow.',
        },
        {
          question: 'Can I have two phone numbers on one Instagram account?',
          answer: 'Instagram allows one phone number and one email address per account. You cannot add multiple phone numbers. If you want to switch to a new number, add the new one (which replaces the old one) and verify it.',
        },
        {
          question: 'What if my Instagram email is from a service I no longer use?',
          answer: 'If you still have access to that email (can log in and receive messages), update your Instagram email to a current address via the steps above. If you have lost access to the email entirely, use your phone number to log in, then change the email from within the account.',
        },
        {
          question: 'Does Instagram notify my followers when I change my phone number?',
          answer: 'No. Instagram does not send any notification to your followers or contacts when you update your phone number or email. The change is private and only affects your account security settings.',
        },
        {
          question: 'Can I use the same phone number or email on multiple Instagram accounts?',
          answer: 'Instagram does not allow the same phone number on more than one Instagram account. The same email address has the same restriction for login purposes. However, Instagram does allow managing multiple accounts from one device using the "Switch accounts" feature — each account needs its own unique email and/or phone number.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
