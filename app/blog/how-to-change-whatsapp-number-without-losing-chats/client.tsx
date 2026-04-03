'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, VerticalSteps, QuickFact, ErrorFix,
} from '@/components/blog/BlogVisuals';

export default function HowToChangeWhatsappNumberWithoutLosingChatsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Change Your WhatsApp Number Without Losing Chats</h1>
      <p className="lead">
        WhatsApp has a built-in "Change Number" feature that migrates your account — including
        all chats, groups, and settings — to a new phone number. Your contacts can be notified
        automatically. This guide walks through every step, including what transfers, what
        doesn't, and what to do if you've already lost access to your old number.
      </p>

      <StatGrid stats={[
        { value: 'Chats migrate', label: 'all messages and media transfer to new number', color: 'green' },
        { value: 'Groups stay', label: 'you remain in all groups automatically', color: 'blue' },
        { value: 'Auto-notify', label: 'option to notify all contacts of number change', color: 'purple' },
        { value: 'Both SIMs', label: 'standard method needs old AND new number active', color: 'amber' },
      ]} />

      <AlertBox type="warning" title="You need both numbers active for the standard method">
        The WhatsApp "Change Number" feature requires you to verify BOTH your old and new phone
        numbers during the process. Have both SIM cards available and able to receive SMS or calls.
        If you no longer have access to the old number, see the alternative backup-restore method below.
      </AlertBox>

      <SectionHeader number={1} title="Before You Start: Back Up Your Chats" />
      <QuickFact color="green" label="Always back up first">
        Even though the Change Number feature migrates your chats automatically, always create a fresh
        backup first. This protects you if anything goes wrong mid-process — the backup is your safety net.
        A backup takes only a few minutes and can save hours of lost conversation history.
      </QuickFact>

      <VerticalSteps steps={[
        { title: 'Open WhatsApp → Settings → Chats', desc: 'Tap the three dots (Android) or Settings icon (iOS). Then tap "Chats" from the settings menu.' },
        { title: 'Tap "Back Up Now"', desc: 'This creates a local backup plus uploads to Google Drive (Android) or iCloud (iPhone). Wait for it to complete — do not close the app during backup.' },
        { title: 'Verify the backup completed', desc: 'The backup screen shows the date and time of last backup. Confirm it says "just now" before proceeding with the number change.' },
        { title: 'Check your cloud storage has enough space', desc: 'WhatsApp backups can be several GB for accounts with lots of media. Ensure Google Drive or iCloud has sufficient free space. You can exclude media from the backup to reduce size if needed.' },
      ]} />

      <SectionHeader number={2} title="Step-by-Step: Change Number via WhatsApp Built-in Feature" />
      <p>
        The built-in Change Number feature is the official, recommended method and produces the cleanest
        migration. All your chats, media, groups, and settings move to the new number seamlessly. The old
        number's WhatsApp account is deactivated immediately upon completion.
      </p>
      <VerticalSteps steps={[
        { title: 'Open WhatsApp Settings', desc: 'Tap Settings (bottom right on iOS, three dots menu on Android) from the main chat screen.' },
        { title: 'Go to Account → Change Number', desc: 'Tap "Account" → then "Change Number" from the account settings menu.' },
        { title: 'Read the information screen and tap "Next"', desc: 'WhatsApp explains what will happen during the process. Read through it, then tap Next to continue.' },
        { title: 'Enter your old number', desc: 'Enter your current (old) phone number with the full country code (e.g., +1 for US, +44 for UK, +91 for India). Tap Next.' },
        { title: 'Enter your new number', desc: 'Enter the new phone number with full country code. Double-check it — this is where your account will move. Tap Done.' },
        { title: 'Verify the new number', desc: 'WhatsApp sends a 6-digit verification code via SMS to the new number. Enter the code to verify ownership of the new number. If SMS does not arrive within 60 seconds, request a voice call instead.' },
        { title: 'Choose who to notify', desc: 'Select: "All contacts" (everyone in your contacts), "Contacts in common" (mutual contacts only), or no notification. WhatsApp sends a message from your old number informing them of the change.' },
        { title: 'Confirm and complete', desc: 'Confirm the migration. Your account, all chats, group memberships, and settings move to the new number immediately. The old number\'s WhatsApp account is deactivated.' },
      ]} />

      <AlertBox type="info" title="You don't need to reinstall WhatsApp">
        The Change Number process runs entirely within your existing WhatsApp installation. You do not
        need to uninstall, reinstall, or switch to a different device. The app migrates the account on
        your current phone — you only need the new SIM card accessible (in a second phone or dual-SIM
        slot) to receive the verification SMS.
      </AlertBox>

      <SectionHeader number={3} title="What Transfers vs What Doesn't" />
      <CompareTable
        leftLabel="Transfers Automatically"
        rightLabel="Does NOT Transfer"
        rows={[
          { label: 'Chat history', left: 'All individual and group chat messages', right: 'Disappearing messages (deleted by design)' },
          { label: 'Media', left: 'Photos, videos, documents, voice messages', right: 'Status update history' },
          { label: 'Groups', left: 'Remain in all groups with new number', right: 'Need re-adding if using backup-restore method' },
          { label: 'Profile', left: 'Name, photo, About text, privacy settings', right: 'WhatsApp Pay (must re-register payment method)' },
          { label: 'Settings', left: 'All app settings and preferences', right: 'Linked WhatsApp Web sessions (log in again)' },
          { label: 'Business features', left: 'Catalog, quick replies, labels (WhatsApp Business)', right: 'WhatsApp Pay requires re-registration' },
          { label: 'Starred messages', left: 'Preserved across the migration', right: 'N/A — fully supported' },
          { label: 'Blocked contacts', left: 'Transferred to new number account', right: 'N/A — fully supported' },
        ]}
      />

      <SectionHeader number={4} title="Alternative Method: If You Don't Have the Old SIM" />
      <AlertBox type="info" title="Key difference: you'll lose group memberships">
        If you no longer have access to the old number, the built-in Change Number feature will not work.
        Use the restore-from-backup approach. You will keep chat history but won't automatically stay in
        groups — group admins must re-add you manually.
      </AlertBox>

      <VerticalSteps steps={[
        { title: 'Ensure you have a recent cloud backup', desc: 'Check Google Drive (Android) or iCloud (iPhone) for your most recent WhatsApp backup. If the backup is old, you will lose messages since the last backup date. The backup details page shows when it was created.' },
        { title: 'Install WhatsApp and register with new number', desc: 'Install WhatsApp on a device that has the new SIM. Open it and register using the new phone number. Complete the SMS verification — WhatsApp will send a code to the new number.' },
        { title: 'Restore from backup during setup', desc: 'WhatsApp automatically detects the backup in your cloud storage and prompts you to restore. Tap "Restore" and wait for it to complete — this may take several minutes for large backups with lots of media.' },
        { title: 'Chats restore, but groups require re-joining', desc: 'All chat history restores from backup. However, you will NOT automatically re-join group chats — group admins must invite you back using your new number. Make a list of important groups to request re-invites.' },
        { title: 'Notify contacts manually', desc: 'Since the automatic notification from the old number will not fire, create a broadcast message or send a message to key contacts letting them know your new number.' },
        { title: 'Request re-adds to important groups', desc: 'Contact the admins of important WhatsApp groups and ask them to re-add your new number. Provide your new number in the format they need (+country code). They can add you back directly through the group members list.' },
      ]} />

      <SectionHeader number={5} title="Comparing the Two Methods" />
      <CompareTable
        leftLabel="Built-in Change Number"
        rightLabel="Restore from Backup"
        rows={[
          { label: 'Old SIM needed', left: 'Yes — must verify old number', right: 'No — old SIM not required' },
          { label: 'Chat history', left: 'Transfers completely (live sync)', right: 'Restores from last backup (may be days old)' },
          { label: 'Group membership', left: 'Automatic — stay in all groups', right: 'Lost — must be re-added by admins' },
          { label: 'Contact notification', left: 'Automatic via WhatsApp', right: 'Manual — you must notify contacts yourself' },
          { label: 'Linked devices (Web)', left: 'Must re-link after migration', right: 'Must re-link after setup' },
          { label: 'Recommended when', left: 'Both numbers are accessible', right: 'Old SIM is lost or deactivated' },
          { label: 'Risk level', left: 'Low — official WhatsApp feature', right: 'Medium — depends on backup recency' },
        ]}
      />

      <SectionHeader number={6} title="Troubleshooting Common Issues" />
      <ErrorFix
        bad="Verification code not received on new number"
        good="Wait at least 5 minutes before requesting again — there's a rate limit. Confirm you entered the correct country code. Check that the new SIM can receive international SMS (some prepaid SIMs block short-code SMS). Try requesting a voice call verification instead of SMS."
      />
      <ErrorFix
        bad="'Change Number' option is greyed out or missing"
        good="This happens when your account has a cooldown from a recent number change (typically several weeks), or if your account has temporary restrictions. If neither applies, update WhatsApp to the latest version. Contact WhatsApp Support if the option remains unavailable."
      />
      <ErrorFix
        bad="Chats are missing after the migration completes"
        good="The process may have used an older local backup rather than your cloud backup. Go to Settings → Chats → Chat Backup and compare the backup date to when you last had the messages. If your chat history backup is recent but chats are missing, try uninstalling and reinstalling WhatsApp, then restore from the cloud backup."
      />
      <ErrorFix
        bad="New number already has an active WhatsApp account"
        good="WhatsApp warns you and asks if you want to replace the existing account on the new number. Back up the existing account associated with the new number FIRST, then proceed. The migration will deactivate the old account on that number and replace it with your migrated account."
      />
      <ErrorFix
        bad="Groups show old number temporarily after migration"
        good="This is normal. Group participant lists update asynchronously across WhatsApp's servers. Allow a few hours for all group members to see your updated number. No action is needed — it resolves automatically."
      />

      <KeyPointsGrid items={[
        { title: 'Old number messaging stops', description: 'After the migration, anyone who messages your old number gets a delivery failure — that WhatsApp account is deactivated. This is expected behavior, not an error. Make sure all important contacts have been updated to your new number.' },
        { title: 'WhatsApp Web needs re-linking', description: 'After changing your number, all WhatsApp Web and Desktop sessions are disconnected. Re-link your devices by going to Settings → Linked Devices → Link a Device and scanning the QR code from each device.' },
        { title: 'WhatsApp Pay requires re-registration', description: 'If you used WhatsApp Pay, you must re-register your payment method on the new number. Payment history does not transfer — only the payment functionality needs to be set up again.' },
        { title: 'International number changes are supported', description: 'WhatsApp supports changing to a number in a different country. Include the full international code (+44, +91, etc.) when entering both numbers. The verification SMS goes to whichever country the new number belongs to.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What happens to my old WhatsApp number after I change it?',
          answer: 'The old WhatsApp account is deactivated from the old number immediately after the change completes. Anyone messaging the old number will get a delivery failure — that number no longer has an active WhatsApp account. The new number takes over your entire account identity including all chats and group memberships.',
        },
        {
          question: 'Can I change WhatsApp number without the old SIM?',
          answer: 'The built-in Change Number feature requires verification of both numbers via SMS. Without the old SIM, you must use the restore-from-backup method: register fresh on the new number during setup and restore from your most recent cloud backup. You\'ll keep chat history but lose automatic group memberships — group admins must re-add you with the new number.',
        },
        {
          question: 'Do I need WhatsApp installed on the new number\'s device first?',
          answer: 'No — the Change Number feature works entirely on your current device with your current SIM. You just need the new number\'s SIM in a second phone (or dual-SIM slot) to receive the 6-digit verification SMS. The app stays on your current device throughout the process.',
        },
        {
          question: 'Will my groups be notified about the number change?',
          answer: 'Not automatically. WhatsApp gives you a choice during the process: notify "All contacts," "Contacts in common" (mutual contacts), or nobody. Group members see the change in the group participant list when your number updates, but there\'s no separate group announcement unless you choose to send one.',
        },
        {
          question: 'How long do I need to keep my old number active?',
          answer: 'Just long enough to complete the Change Number process — typically a few minutes. Once you\'ve verified both numbers and completed the migration, the old SIM can be deactivated. The new number is fully in control of the account. You don\'t need to keep the old SIM active after the process completes.',
        },
        {
          question: 'Can I change to a number from a different country?',
          answer: 'Yes — WhatsApp supports changing to an international number. Make sure to include the full international country code when entering the new number (e.g., +44 for UK, +91 for India). The verification SMS will be sent to whichever country the new number belongs to.',
        },
        {
          question: 'What about WhatsApp Business — does Change Number work the same way?',
          answer: 'Yes, WhatsApp Business has the same Change Number feature under Account settings and follows the identical process. Your business catalog, quick replies, labels, greeting messages, away messages, and chat history all transfer to the new number automatically using the same migration flow.',
        },
        {
          question: 'How often can I change my WhatsApp number?',
          answer: 'WhatsApp imposes a cooldown period after a number change before you can change again. The exact duration is not publicly documented but is typically several weeks. If you need to change numbers frequently, you may hit this cooldown. Contact WhatsApp Support if you have a legitimate urgent need to change within the cooldown window.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
