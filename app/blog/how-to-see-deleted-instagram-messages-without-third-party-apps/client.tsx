'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToSeeDeletedInstagramMessagesWithoutThirdPartyAppsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to See Deleted Instagram Messages Without Third-Party Apps</h1>
      <p className="lead">
        Instagram lets you request a copy of all your data — including messages that have
        been "unsent" or deleted. This guide explains the official data download method
        and what you can realistically recover without unsafe third-party apps.
      </p>

      <StatGrid stats={[
        { value: 'Data download', label: 'official Instagram feature to get all your data', color: 'green' },
        { value: 'Unsent messages', label: 'may appear in your data export as deleted entries', color: 'blue' },
        { value: 'No third-party', label: 'no sketchy apps required — use official tools only', color: 'purple' },
        { value: '24-48 hours', label: 'time for Instagram to prepare your data file', color: 'amber' },
      ]} />

      <AlertBox type="warning" title="Avoid third-party apps claiming to recover messages">
        Apps claiming to show "deleted Instagram messages" are almost always scams, spyware,
        or credential harvesters. Never enter your Instagram login in a third-party app.
        Use only Instagram's official Data Download feature.
      </AlertBox>

      <SectionHeader number={1} title="Method: Instagram Official Data Download" />
      <VerticalSteps steps={[
        { title: 'Open Instagram app', description: 'Go to your profile → tap the hamburger menu (☰) → Settings and privacy.' },
        { title: 'Tap "Account Center"', description: 'Then "Your information and permissions".' },
        { title: 'Tap "Download your information"', description: 'Select "Download or transfer information".' },
        { title: 'Select account', description: 'Choose your Instagram account.' },
        { title: 'Choose "Some of your information"', description: 'Select "Messages" from the list of data categories.' },
        { title: 'Select format and date range', description: 'Choose HTML (readable in browser) or JSON (machine-readable). Set date range. Tap "Create files".' },
        { title: 'Wait for notification', description: 'Instagram prepares the file (typically 24-48 hours). You\'ll receive an email and in-app notification when ready.' },
        { title: 'Download and view', description: 'Return to Download Your Information → tap your request → Download. Open the HTML files in a browser to read messages.' },
      ]} />

      <SectionHeader number={2} title="What the Data Download Contains" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Messages you sent', description: 'All messages you sent in direct conversations, including unsent ("deleted") messages that were in the sent state when the archive was created.' },
        { title: 'Limitations', description: 'If someone else deleted their messages (unsent from their side), those may not appear in YOUR data. The archive captures YOUR account\'s data, not others\'.' },
        { title: 'Media included', description: 'Photos and videos sent in DMs are included. Voice messages are included as audio files. Reactions and emojis are included.' },
        { title: 'Archive date range', description: 'You can set a specific date range. For recovering old messages, set a wide range going back years.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Can I see messages the other person deleted (unsent)?',
          answer: 'If they unsent a message before you read it, it may not appear in your data download. If you received and read it before they deleted it, it may still be in your archive. Instagram\'s data export reflects your account\'s copy of the conversation at different points in time.',
        },
        {
          question: 'What is the difference between "unsend" and "delete" on Instagram?',
          answer: '"Unsend" removes a message you sent from both sides of the conversation — neither party can see it after unsending (unless they screenshot it first). "Delete" in Instagram usually refers to deleting your copy of a conversation — the other person still has theirs.',
        },
        {
          question: 'Are third-party Instagram message recovery apps safe?',
          answer: 'No — they are universally unsafe. These apps typically: request your Instagram login credentials (which they steal), install malware, or simply show you fake "recovered" messages. Instagram\'s official data download is the only legitimate way to access your message history.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
