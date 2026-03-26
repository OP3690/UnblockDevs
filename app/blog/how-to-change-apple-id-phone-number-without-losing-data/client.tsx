'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToChangeAppleIdPhoneNumberWithoutLosingDataClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Change Apple ID Phone Number Without Losing Data</h1>
      <p className="lead">
        Changing the phone number on your Apple ID is straightforward but requires careful steps
        to avoid losing iCloud data or being locked out. Your Apple ID email, iCloud data,
        App Store purchases, and everything else stays intact — only the verification number changes.
      </p>

      <StatGrid stats={[
        { value: 'Data safe', label: 'iCloud data stays intact throughout the change', color: 'green' },
        { value: '5 minutes', label: 'to update your phone number', color: 'blue' },
        { value: '2FA', label: 'required — you need access to your old number first', color: 'amber' },
        { value: 'All devices', label: 'update is reflected across all your Apple devices', color: 'purple' },
      ]} />

      <AlertBox type="warning" title="Do this before losing access to old number">
        Change your Apple ID phone number BEFORE your old number becomes inactive.
        If you lose access to your old number with 2FA enabled, account recovery can take days.
      </AlertBox>

      <SectionHeader number={1} title="Change Phone Number on iPhone" />
      <VerticalSteps steps={[
        { title: 'Open Settings', description: 'Tap your name at the top of Settings to open your Apple ID page.' },
        { title: 'Tap "Sign-In & Security"', description: 'Then tap "Two-Factor Authentication".' },
        { title: 'Tap "Edit" next to Trusted Phone Numbers', description: 'This shows your current phone numbers used for 2FA.' },
        { title: 'Tap "Add a Trusted Phone Number"', description: 'Enter your new phone number and verify it with the code sent via SMS or call.' },
        { title: 'Remove the old number', description: 'After adding the new number, tap the red minus icon next to the old number to remove it.' },
      ]} />

      <SectionHeader number={2} title="Change Phone Number on Mac" />
      <VerticalSteps steps={[
        { title: 'Apple menu → System Settings', description: 'Click your Apple ID (top of sidebar).' },
        { title: 'Click "Sign-In & Security"', description: 'Then "Edit" next to Two-Factor Authentication.' },
        { title: 'Add new number and verify', description: 'Enter new number → verify via SMS → then remove old number.' },
      ]} />

      <SectionHeader number={3} title="Change via appleid.apple.com" />
      <VerticalSteps steps={[
        { title: 'Go to appleid.apple.com', description: 'Sign in with your Apple ID credentials.' },
        { title: 'Click "Sign-In and Security"', description: 'Then "Two-Factor Authentication" → "Edit" trusted phone numbers.' },
        { title: 'Add new, remove old', description: 'Add new phone number and verify with SMS code. Then remove old number.' },
      ]} />

      <SectionHeader number={4} title="What Changes and What Stays the Same" />
      <KeyPointsGrid columns={2} items={[
        { title: 'What stays the same', description: 'Apple ID email address, iCloud data (photos, documents, contacts), App Store purchases, iMessage history, Apple Pay cards, subscriptions.' },
        { title: 'What changes', description: 'The phone number used for 2FA verification codes. iMessage may need to be updated to recognize new number for SMS fallback.' },
        { title: 'Update iMessage', description: 'After changing: Settings → Messages → Send & Receive. Add your new phone number if it doesn\'t appear automatically.' },
        { title: 'Update FaceTime', description: 'Settings → FaceTime → verify your new number is listed and checked for calls.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Can I change my Apple ID phone number if I no longer have access to the old number?',
          answer: 'This is a difficult situation. Apple account recovery is required: go to iforgot.apple.com and start account recovery. Apple will verify your identity through other trusted devices or by sending verification to a recovery email. Recovery can take 24-72 hours. This is why changing BEFORE losing the old number is critical.',
        },
        {
          question: 'Does changing my Apple ID phone number sign me out of any apps?',
          answer: 'Changing the trusted phone number (2FA) does not sign you out of apps or services. Your Apple ID credentials (email and password) don\'t change. You remain signed in on all devices and services.',
        },
        {
          question: 'Will my iCloud data be deleted if I change my phone number?',
          answer: 'No — iCloud data is tied to your Apple ID email address, not your phone number. Changing the phone number has zero impact on iCloud storage, photos, documents, or any other data. Everything remains exactly as it was.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
