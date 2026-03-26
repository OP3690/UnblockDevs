'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToHideOnlineStatusOnWhatsappClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Hide Your Online Status on WhatsApp — Complete Guide</h1>
      <p className="lead">
        WhatsApp shows when you're online and when you last used the app. Here's exactly how
        to hide both your "Last Seen" and your "Online" status — and what trade-offs to expect.
      </p>

      <StatGrid stats={[
        { value: 'Last Seen', label: 'hide when you last opened WhatsApp', color: 'blue' },
        { value: 'Online', label: 'hide when you\'re currently active', color: 'green' },
        { value: 'Trade-off', label: 'hiding yours means you can\'t see others\'', color: 'amber' },
        { value: 'Read Receipts', label: 'also disable blue ticks for full privacy', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Hide Last Seen" />
      <VerticalSteps steps={[
        { title: 'Open WhatsApp → Settings', description: 'Tap Settings (bottom right on iOS, three dots on Android) → Account.' },
        { title: 'Tap "Privacy"', description: 'Under the Account section.' },
        { title: 'Tap "Last Seen & Online"', description: 'This controls both settings.' },
        { title: 'Under "Who can see my last seen"', description: 'Select "Nobody". Options: Everyone, My Contacts, My Contacts Except, Nobody.' },
        { title: 'Under "Who can see when I\'m online"', description: 'Select "Same as Last Seen" or "Nobody". Note: this requires Last Seen also set to Nobody or My Contacts.' },
      ]} />

      <SectionHeader number={2} title="Understanding the Privacy Options" />
      <KeyPointsGrid columns={2} items={[
        { title: '"Nobody"', description: 'No one can see your Last Seen or Online status. You also cannot see others\' Last Seen if you choose Nobody. This is the maximum privacy option.' },
        { title: '"My Contacts"', description: 'Only people in your phonebook can see your Last Seen. Strangers and unregistered numbers cannot see it. Balanced option.' },
        { title: '"My Contacts Except"', description: 'All contacts except specific people you choose. Good for hiding from individual contacts without affecting everyone.' },
        { title: 'Online status limitation', description: 'You can set Online status to "Nobody" only if Last Seen is also restricted. You cannot hide Online while showing Last Seen to everyone.' },
      ]} />

      <SectionHeader number={3} title="Disable Read Receipts (Blue Ticks)" />
      <VerticalSteps steps={[
        { title: 'Go to Settings → Privacy', description: 'Scroll down to find "Read Receipts".' },
        { title: 'Toggle off "Read Receipts"', description: 'When disabled: your blue ticks won\'t show to senders. You also can\'t see when others have read YOUR messages (mutual restriction).' },
        { title: 'Note for groups', description: 'Read receipts in group chats cannot be disabled — they always show individual read status for group messages regardless of this setting.' },
      ]} />

      <AlertBox type="tip" title="Complete privacy combination">
        For maximum privacy: Set Last Seen to Nobody, Online to Nobody, disable Read Receipts,
        and set Profile Photo to My Contacts. This makes your WhatsApp activity completely
        invisible to anyone not explicitly allowed.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Can someone tell if I\'m online even with these settings enabled?',
          answer: 'With Last Seen set to Nobody and Online to Nobody, your online status is hidden. However, if you are in the middle of typing a reply, the typing indicator ("Alice is typing...") will still show. There is no way to disable the typing indicator — it\'s a core WhatsApp feature.',
        },
        {
          question: 'Will hiding my last seen affect my ability to see others\'?',
          answer: 'Yes — this is WhatsApp\'s reciprocal policy. If you set Last Seen to Nobody, you cannot see anyone else\'s Last Seen either. If you set it to My Contacts, you can only see Last Seen of people who have also shared theirs with you.',
        },
        {
          question: 'Is there a way to read messages without blue ticks appearing?',
          answer: 'Yes — with Read Receipts disabled, you can read messages without showing blue ticks. Additionally: enabling Airplane Mode before opening a message prevents the tick from updating (works for some messages). Or use notification preview to read without opening the chat.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
