'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToHideOnlineStatusOnWhatsappClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Hide Your Online Status on WhatsApp — Complete Guide</h1>
      <p className="lead">
        WhatsApp shows when you're online and when you last used the app. Here's exactly how
        to hide both your "Last Seen" and your "Online" status — and what trade-offs to expect.
        We'll also cover read receipts, profile photo privacy, and WhatsApp Web settings.
      </p>

      <StatGrid stats={[
        { value: 'Last Seen', label: 'hide when you last opened WhatsApp', color: 'blue' },
        { value: 'Online', label: 'hide when you\'re currently active', color: 'green' },
        { value: 'Trade-off', label: 'hiding yours means you can\'t see others\'', color: 'amber' },
        { value: 'Read Receipts', label: 'also disable blue ticks for full privacy', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Hide Last Seen Status" />
      <QuickFact color="blue" label="Most requested setting">
        "Last Seen" is the timestamp showing when you last opened WhatsApp — e.g., "Last seen today at 10:45 AM."
        Hiding it is the most common privacy request. Note: hiding your Last Seen means you can no longer
        see anyone else's Last Seen either — WhatsApp enforces this as a reciprocal policy.
      </QuickFact>

      <VerticalSteps steps={[
        { title: 'Open WhatsApp → Settings', desc: 'Tap Settings (bottom right on iOS, three dots on Android) → Account.' },
        { title: 'Tap "Privacy"', desc: 'Under the Account section. This is where all visibility settings live.' },
        { title: 'Tap "Last Seen & Online"', desc: 'This single screen controls both Last Seen timestamp and live Online presence.' },
        { title: 'Under "Who can see my last seen" — select your option', desc: 'Choose from: Everyone (default), My Contacts, My Contacts Except (exclude specific people), or Nobody.' },
      ]} />

      <SectionHeader number={2} title="Hide Online Status" />
      <p>
        "Online" shows a green dot or the word "Online" when you're actively using WhatsApp right now.
        This is separate from Last Seen but controlled on the same settings screen:
      </p>
      <VerticalSteps steps={[
        { title: 'Go to Settings → Privacy → Last Seen & Online', desc: 'Same screen as Last Seen settings.' },
        { title: 'Under "Who can see when I\'m online" — select your option', desc: 'Choose "Same as Last Seen" (recommended) to match both settings, or set Online separately.' },
        { title: 'Understand the dependency', desc: 'You can ONLY hide Online status if your Last Seen is set to "My Contacts" or "Nobody." You cannot hide Online while showing Last Seen to Everyone — WhatsApp links these two settings.' },
      ]} />

      <AlertBox type="tip" title="Complete privacy combination">
        For maximum privacy: Set Last Seen to Nobody, Online to Nobody, disable Read Receipts,
        and set Profile Photo to My Contacts. This makes your WhatsApp activity completely
        invisible to people outside your contacts list.
      </AlertBox>

      <SectionHeader number={3} title="The Four Privacy Options Compared" />
      <CompareTable
        leftLabel="Privacy Option"
        rightLabel="Who Sees Your Status + Trade-off"
        rows={[
          { label: 'Everyone (default)', left: 'Any WhatsApp user can see Last Seen and Online', right: 'Maximum visibility — strangers who have your number can see your activity' },
          { label: 'My Contacts', left: 'Only people saved in your phonebook', right: 'Balanced — strangers can\'t see you, but all saved contacts can' },
          { label: 'My Contacts Except', left: 'All contacts except specific chosen people', right: 'Fine-grained — hide from specific contacts without affecting others' },
          { label: 'Nobody', left: 'No one can see Last Seen or Online', right: 'Maximum privacy — but you also can\'t see anyone else\'s Last Seen (reciprocal policy)' },
        ]}
      />

      <SectionHeader number={4} title="Disable Read Receipts (Blue Ticks)" />
      <p>
        Read receipts show double blue ticks when a recipient has read your message. Disabling them
        prevents others from knowing when you've read their messages:
      </p>
      <VerticalSteps steps={[
        { title: 'Go to Settings → Privacy', desc: 'Scroll down to find "Read Receipts" below the Last Seen settings.' },
        { title: 'Toggle off "Read Receipts"', desc: 'When disabled: your blue ticks won\'t show to senders — they only see grey double ticks (delivered). You also can\'t see when others have read YOUR messages — this is mutual.' },
        { title: 'Note the group chat exception', desc: 'Read receipts in group chats cannot be disabled. They always show which individual members have read the message, regardless of this setting.' },
      ]} />

      <AlertBox type="info" title="Reading without triggering blue ticks">
        Even with Read Receipts enabled, there are additional methods: enable Airplane Mode before
        opening a message (prevents the tick from syncing to servers), or use the notification
        preview to read the message content without opening the chat entirely.
      </AlertBox>

      <SectionHeader number={5} title="WhatsApp Web and Desktop Privacy" />
      <p>
        WhatsApp Web (web.whatsapp.com) and WhatsApp Desktop share your privacy settings from the mobile app.
        However, there's an important nuance: being active on WhatsApp Web makes you appear "Online" even when
        you're not on your phone.
      </p>
      <VerticalSteps steps={[
        { title: 'Check active linked device sessions', desc: 'In WhatsApp app → Settings → Linked Devices. You\'ll see all active web/desktop sessions with their last-active time.' },
        { title: 'Log out unused WhatsApp Web sessions', desc: 'If you leave WhatsApp Web open in a browser tab, you appear "Online" to others even when you\'re away from the computer. Tap any session → Log Out to close it.' },
        { title: 'Privacy settings apply across all devices', desc: 'If you\'ve set Last Seen to "Nobody," this applies whether someone checks via your phone or WhatsApp Web. Settings are account-level, not device-level.' },
      ]} />

      <SectionHeader number={6} title="Complete Privacy Settings Overview" />
      <KeyPointsGrid items={[
        { title: 'Profile Photo', description: 'Set to "My Contacts" or "Nobody" in Settings → Privacy → Profile Photo. Prevents strangers from seeing your photo. Critical for preventing unsolicited contact from people who found your number.' },
        { title: 'About (status bio)', description: 'Your "About" text is visible by default. Set it to "My Contacts" or "Nobody" via Settings → Privacy → About. Hides your status bio from non-contacts.' },
        { title: 'Status Updates (Stories)', description: 'WhatsApp Status (24-hour stories) visibility is separate. Go to Settings → Privacy → Status and choose who can see your status updates — Everyone, My Contacts, or My Contacts Except.' },
        { title: 'Groups', description: 'Control who can add you to groups: Settings → Privacy → Groups → My Contacts. Prevents strangers from adding you to spam groups — a very common tactic.' },
        { title: 'Calls', description: 'Silence unknown callers: Settings → Privacy → Calls → Silence Unknown Callers. Reduces WhatsApp spam calls from numbers not in your contacts.' },
        { title: 'Fingerprint / Face ID Lock', description: 'Add biometric app lock: Settings → Privacy → App Lock. Prevents anyone with physical access to your phone from opening WhatsApp and reading your chats.' },
      ]} />

      <SectionHeader number={7} title="The Typing Indicator — The One Status You Can't Hide" />
      <AlertBox type="warning" title="Typing indicator cannot be disabled">
        Even with all privacy settings maximized, there is one status that cannot be turned off:
        the "typing..." indicator. When you're composing a reply, the other person sees "Alice is typing…"
        in real time. This is a core WhatsApp feature with no off switch in any setting.
        Reading silently is possible — but typing always reveals your presence.
      </AlertBox>

      <CompareTable
        leftLabel="Status / Indicator"
        rightLabel="Can You Hide It?"
        rows={[
          { label: 'Last Seen timestamp', left: 'Yes — set to Nobody in Privacy settings', right: 'Trade-off: you can\'t see others\' Last Seen either' },
          { label: 'Online presence', left: 'Yes — set to Nobody (requires Last Seen = My Contacts or Nobody)', right: 'Linked to Last Seen setting — cannot hide Online while showing Last Seen to Everyone' },
          { label: 'Blue ticks (read receipts)', left: 'Yes — toggle off in Privacy → Read Receipts', right: 'You also lose ability to see when YOUR messages are read' },
          { label: 'Typing indicator', left: 'No — cannot be disabled', right: 'Always visible to the other person when you\'re composing' },
          { label: 'Voice message recording', left: 'No — "recording..." shows while you hold mic', right: 'The recipient sees this in real time' },
          { label: 'Delivery ticks (grey)', left: 'No — cannot be disabled', right: 'Single grey = sent, double grey = delivered — always visible' },
        ]}
      />

      <FAQAccordion items={[
        {
          question: 'Can someone tell if I\'m online even with these settings enabled?',
          answer: 'With Last Seen set to Nobody and Online to Nobody, your online status is hidden from all contacts. However, the typing indicator ("Alice is typing...") still appears when you\'re composing a message — and the voice recording indicator shows when you\'re recording a voice note. These two indicators have no off switch.',
        },
        {
          question: 'Will hiding my last seen affect my ability to see others\'?',
          answer: 'Yes — this is WhatsApp\'s reciprocal policy by design. If you set Last Seen to Nobody, you cannot see anyone else\'s Last Seen either. If you set it to My Contacts, you can only see Last Seen of people who have also shared theirs with you (not set to Nobody themselves).',
        },
        {
          question: 'Is there a way to read messages without blue ticks appearing?',
          answer: 'Yes, three methods: (1) Disable Read Receipts in Settings → Privacy — most reliable. (2) Enable Airplane Mode before opening the chat — prevents the read confirmation from syncing to servers. (3) Read from the notification preview/banner without tapping into the chat. Note: Airplane Mode method may not work in newer WhatsApp versions.',
        },
        {
          question: 'Can I hide my online status from specific people only?',
          answer: 'WhatsApp doesn\'t offer per-contact online status hiding for the live "Online" indicator. For Last Seen, you can use "My Contacts Except" to exclude specific people — this is the closest to per-contact control. Your options for Online are: Everyone, Same as Last Seen, or (if Last Seen is restricted) Nobody.',
        },
        {
          question: 'If I set Last Seen to "Nobody," can I still see when others are online?',
          answer: 'You cannot see others\' Last Seen timestamps (that\'s the reciprocal rule). However, you can still see the real-time "Online" presence indicator if the other person\'s Online setting allows it. The reciprocal restriction only applies to Last Seen timestamps, not to the live Online indicator (which depends on their own settings).',
        },
        {
          question: 'Does turning on Airplane Mode before opening WhatsApp hide my activity?',
          answer: 'Partially and unreliably. Enabling Airplane Mode before opening WhatsApp can prevent the Online status from syncing to servers and prevent blue ticks from sending during that session. However, when you reconnect to the internet, WhatsApp may retroactively sync some status information. The privacy settings approach (Last Seen → Nobody, disable Read Receipts) is far more reliable and permanent.',
        },
        {
          question: 'Will my boss / ex / parent know I\'m online if they have my number?',
          answer: 'Only if you have them saved as a contact AND your Last Seen/Online is set to "My Contacts" or "Everyone." Setting both Last Seen and Online to "Nobody" means absolutely no one — regardless of relationship — can see your online status or when you were last active.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
