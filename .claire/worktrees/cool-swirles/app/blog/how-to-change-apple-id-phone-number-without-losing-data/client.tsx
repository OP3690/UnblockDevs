'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowToChangeAppleIdPhoneNumberClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Change Apple ID Phone Number Without Losing Data (2026)</h1>
      <p className="lead">
        Changing the phone number on your Apple ID is critical when you get a new number — otherwise
        you lose iMessage, FaceTime, and two-factor authentication on the old number. This guide shows
        you exactly how to update it safely on iPhone, iPad, and Mac, with no data loss.
      </p>

      <StatGrid stats={[
        { value: 'No data loss', label: 'iCloud data unaffected by phone number change', color: 'green' },
        { value: '2FA', label: 'Phone number is your 2FA backup — update it!', color: 'red' },
        { value: '3 methods', label: 'iPhone, Mac, and web covered', color: 'blue' },
        { value: 'Instant', label: 'Change takes effect immediately', color: 'amber' },
      ]} />

      <AlertBox type="error" title="Update your phone number BEFORE you lose the old one">
        If you lose access to the old number before updating your Apple ID, two-factor authentication
        codes will go to a number you can't receive. This can lock you out of your Apple ID.
        Update while you still have both numbers.
      </AlertBox>

      <SectionHeader number={1} title="What 'Phone Number' Means on Apple ID" />

      <p>
        Your Apple ID phone number is used for two things:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Two-Factor Authentication (2FA)',
          description: 'Apple sends 6-digit verification codes to trusted phone numbers when you sign in on a new device or make account changes.',
        },
        {
          title: 'iMessage and FaceTime caller ID',
          description: 'Your phone number is registered for iMessage and FaceTime so others can reach you at your number.',
        },
      ]} />

      <SectionHeader number={2} title="Method 1 — Change Phone Number on iPhone" />

      <VerticalSteps steps={[
        {
          title: 'Open Settings',
          description: 'Open the Settings app on your iPhone.',
        },
        {
          title: 'Tap your name at the top (Apple ID)',
          description: 'Tap your name/profile picture at the very top of Settings.',
        },
        {
          title: 'Tap "Sign-In & Security"',
          description: 'In the Apple ID menu, tap "Sign-In & Security".',
        },
        {
          title: 'Tap "Two-Factor Authentication"',
          description: 'Under Sign-In & Security, tap "Two-Factor Authentication".',
        },
        {
          title: 'Tap "Edit" next to Trusted Phone Numbers',
          description: 'You will see your current trusted phone numbers. Tap "Edit".',
        },
        {
          title: 'Add new number, then remove old number',
          description: 'Tap the + icon to add your new phone number. Verify it with the code Apple sends. Then tap the red minus icon to remove the old number.',
        },
      ]} />

      <SectionHeader number={3} title="Method 2 — Change Phone Number on Mac" />

      <VerticalSteps steps={[
        {
          title: 'Open System Settings',
          description: 'Click the Apple menu → System Settings (macOS Ventura or later).',
        },
        {
          title: 'Click your Apple ID name at the top left',
          description: 'Click on your name/profile.',
        },
        {
          title: 'Click "Sign-In & Security"',
          description: 'Then click "Two-Factor Authentication".',
        },
        {
          title: 'Edit Trusted Phone Numbers',
          description: 'Add your new number, verify it, then remove the old one.',
        },
      ]} />

      <SectionHeader number={4} title="Method 3 — Change on the Apple ID Website" />

      <VerticalSteps steps={[
        {
          title: 'Go to appleid.apple.com',
          description: 'Open appleid.apple.com in any browser on any device.',
        },
        {
          title: 'Sign in with your Apple ID',
          description: 'Enter your email and password, then enter the 2FA code sent to your current trusted number.',
        },
        {
          title: 'Click "Sign-In and Security"',
          description: 'Navigate to the Sign-In and Security section.',
        },
        {
          title: 'Edit Trusted Phone Numbers',
          description: 'Click "Edit" next to Trusted Phone Numbers. Add new, verify, remove old.',
        },
      ]} />

      <SectionHeader number={5} title="Update iMessage and FaceTime After Changing Number" />

      <VerticalSteps steps={[
        {
          title: 'Open Settings → Messages',
          description: 'Go to Settings → Messages → Send & Receive.',
        },
        {
          title: 'Verify your new number appears',
          description: 'Check that your new phone number is listed and checked under "You Can Be Reached By iMessage At".',
        },
        {
          title: 'Set new number as start from',
          description: 'Under "Start New Conversations From", select your new phone number.',
        },
        {
          title: 'Repeat for FaceTime',
          description: 'Settings → FaceTime → make sure your new number is checked.',
        },
      ]} />

      <SectionHeader number={6} title="What Data Is NOT Affected?" />

      <AlertBox type="success" title="Your iCloud data is completely safe">
        Changing the phone number on your Apple ID does not affect any of your iCloud data —
        photos, contacts, notes, files, App Store purchases, or iCloud Keychain passwords.
        Your Apple ID email address (which is your actual account identifier) does not change.
      </AlertBox>

      <SectionHeader number={7} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'Will I lose my iCloud data if I change my Apple ID phone number?',
          answer: 'No. Your iCloud data (photos, documents, contacts, notes, purchases) is tied to your Apple ID email address, not your phone number. Changing the trusted phone number has no effect on your data.',
        },
        {
          question: 'What happens if I lose access to my old number before updating?',
          answer: 'This is a serious situation. Without a trusted phone number or trusted device, you cannot receive 2FA codes. Apple has an Account Recovery process for this: go to iforgot.apple.com and request account recovery. This can take several days. If you have a recovery key or trusted device (like a Mac or iPad), use those to authenticate instead.',
        },
        {
          question: 'Can I have multiple trusted phone numbers on my Apple ID?',
          answer: 'Yes. Apple allows you to add multiple trusted phone numbers. Add your new number, verify it, and keep the old one until you are ready to remove it. This avoids any interruption to 2FA during the transition.',
        },
        {
          question: 'Does changing my Apple ID phone number affect my iPhone\'s phone number?',
          answer: 'No. Your iPhone\'s cellular phone number is controlled by your carrier and SIM card — it is separate from your Apple ID. Your Apple ID trusted phone number is used for security verification only. When you get a new phone number (new SIM), you update the Apple ID trusted number to match.',
        },
        {
          question: 'How long does it take for the new phone number to be active on Apple ID?',
          answer: 'The change is immediate. Once you verify the new phone number with the code Apple sends and save the change, the new number is active as a trusted number for 2FA right away. iMessage and FaceTime registration may take a few minutes to propagate.',
        },
        {
          question: 'What if I don\'t receive the verification code on my new number?',
          answer: 'If the code does not arrive: (1) Check that you entered the full number including country code correctly. (2) Check if your phone has signal and can receive SMS. (3) Try requesting the code again — there is usually a "Resend code" option. (4) Check if your carrier is blocking short-code SMS. If you still cannot receive it, use a trusted Apple device to authenticate instead.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
