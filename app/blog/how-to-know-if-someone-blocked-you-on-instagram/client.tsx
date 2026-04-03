'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, CompareTable, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function HowToKnowIfSomeoneBlockedYouOnInstagramClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Know If Someone Blocked You on Instagram — 6 Signs to Check</h1>
      <p className="lead">
        Instagram doesn't notify you when someone blocks you. But there are clear signs to check.
        This guide explains every indicator of being blocked vs. an account being deactivated,
        deleted, or set to private — and the definitive way to confirm it without third-party apps.
      </p>

      <StatGrid stats={[
        { value: 'No notification', label: 'Instagram never tells you when you\'re blocked', color: 'amber' },
        { value: '6 signs', label: 'clear indicators that you\'ve been blocked', color: 'blue' },
        { value: 'Different account', label: 'the only reliable way to confirm a block', color: 'green' },
        { value: 'DMs preserved', label: 'old messages don\'t disappear when blocked', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="The 6 Signs You've Been Blocked" />
      <KeyPointsGrid items={[
        { title: '1. Can\'t find their profile in search', description: 'Search their exact username. If their account doesn\'t appear when it used to, that\'s a strong signal. However, this could also mean: account deleted, username changed, or temporarily deactivated. Check other signs to confirm.' },
        { title: '2. Profile shows "No posts yet" or is empty', description: 'If you navigate to their profile URL directly and it shows 0 posts, 0 followers, 0 following with "No posts yet" despite previously having content — you\'re blocked. The profile shell is visible but all content is hidden specifically from you.' },
        { title: '3. Follow button reverts immediately', description: 'Visit their profile. If the "Follow" button appears but clicking it does nothing, or instantly reverts back to "Follow" without sending a request — you\'re blocked (or they\'ve restricted you). A restricted account shows this same behavior.' },
        { title: '4. Old DMs show a blank profile picture', description: 'In your DMs, the conversation history remains. Their profile picture appears blank or as a gray circle, and their display name may show as "Instagram User." You can still read old messages from both sides but cannot send new ones.' },
        { title: '5. Tagged posts show broken links', description: 'Posts where they\'ve been tagged by mutual friends no longer link to their profile when you\'re blocked. The @username tag appears but clicking it shows a "Page not found" or simply doesn\'t navigate anywhere.' },
        { title: '6. Check from another account — the definitive test', description: 'Use a different Instagram account (or a trusted friend\'s) and search the person\'s username. If their full profile is visible from the other account but not from yours, with all their posts and followers showing normally — you\'re blocked.' },
      ]} />

      <SectionHeader number={2} title="Block vs. Deleted vs. Deactivated vs. Private" />
      <p>These four scenarios produce similar-looking results from your perspective. Here's how to tell them apart:</p>
      <CompareTable
        leftLabel="From your account"
        rightLabel="From another account"
        rows={[
          { label: 'Blocked', left: 'Profile empty or not found', right: 'Profile fully visible with all posts' },
          { label: 'Account deleted', left: 'Not found anywhere', right: 'Not found — account is gone for everyone' },
          { label: 'Temporarily deactivated', left: 'Not found', right: 'Not found — deactivation hides from everyone' },
          { label: 'Set to private', left: 'Profile visible, posts hidden', right: 'Profile visible, posts hidden (same for all non-followers)' },
          { label: 'Username changed', left: 'Old username not found', right: 'Old username not found — search their new name' },
        ]}
      />

      <QuickFact color="blue" label="The key difference">
        Blocking affects only YOU — the account is still fully visible to everyone else. Deletion and deactivation affect everyone equally. The "check from another account" method definitively separates blocks from deletions or deactivations.
      </QuickFact>

      <SectionHeader number={3} title="Step-by-Step: How to Confirm You're Blocked" />
      <VerticalSteps steps={[
        { title: 'Search their username directly', desc: 'Open Instagram and search the exact username you knew them by. If nothing appears, note it but don\'t conclude yet — they may have changed their username or deactivated temporarily.' },
        { title: 'Try to navigate to their profile URL', desc: 'In a browser, go to instagram.com/[username]. If you see an empty profile with no posts, followers, or following count despite knowing they had content — that\'s a strong sign you\'re blocked.' },
        { title: 'Check your DM conversation with them', desc: 'Open your direct message thread with them. If their profile picture is blank (gray circle) and their display name shows oddly, that confirms something has changed in your relationship with their account.' },
        { title: 'Look for their tags in mutual friends\' posts', desc: 'Find a mutual friend\'s post where you know the person was tagged. Click the tag. If it goes to an empty profile or nowhere for you, but works for others, that\'s consistent with a block.' },
        { title: 'Verify using a different account', desc: 'Log into a second Instagram account (your own backup, or ask a trusted friend). Search the person\'s username. If their full profile loads normally with all their posts and follower count — you\'re definitively blocked on your main account.' },
        { title: 'Consider alternative explanations first', desc: 'Before concluding you\'re blocked, consider: Did they change their username? Did they deactivate? Did they delete and recreate their account? A genuine deletion looks identical to a block when checking from your account alone — the second account test is the only way to know for certain.' },
      ]} />

      <SectionHeader number={4} title="What Happens to Your Content When Blocked" />
      <KeyPointsGrid items={[
        { title: 'Your likes are removed', description: 'All likes you previously left on their posts are removed instantly when they block you. Your name disappears from their like lists — retroactively.' },
        { title: 'Your comments are hidden', description: 'Comments you left on their posts are hidden from them and from anyone viewing their posts, but the comment data may still exist in Instagram\'s database.' },
        { title: 'Your follow is removed', description: 'If you were following them, the block automatically removes that follow relationship from both sides. You no longer follow them, and they no longer follow you.' },
        { title: 'Your tags become non-functional', description: 'If you\'ve tagged them in your posts, those tags become non-functional — they won\'t see the tag in their Tagged section, and the tag won\'t link to their profile from your posts.' },
        { title: 'Your mentions don\'t notify', description: 'If you mention their @username in a story or post after being blocked, no notification is sent to them. The mention appears in your content but is invisible to them.' },
      ]} />

      <SectionHeader number={5} title="What You Can Still Do When Blocked" />
      <KeyPointsGrid items={[
        { title: 'Read old DMs', description: 'Your existing conversation thread remains in your inbox. You can still read old messages from both sides. You just can\'t send new messages.' },
        { title: 'See mutual friends\' posts tagging them', description: 'You might still see their tagged photos in mutual friends\' posts — the photo is visible, but their tag link is broken.' },
        { title: 'See them in group DMs', description: 'If you\'re both in a group DM, you can still see their messages in that group. The block only applies to direct 1:1 interaction.' },
        { title: 'Report the account', description: 'You can report an account that blocked you using Instagram\'s support form, even though you can\'t interact directly.' },
      ]} />

      <SectionHeader number={6} title="Being Restricted vs. Being Blocked" />
      <CompareTable
        leftLabel="Restricted"
        rightLabel="Blocked"
        rows={[
          { label: 'Profile visibility', left: 'You can see their full profile normally', right: 'You see empty profile or nothing' },
          { label: 'Posting comments', left: 'Your comments only visible to you unless approved', right: 'Can\'t interact at all' },
          { label: 'DMs', left: 'Messages go to their Request folder silently', right: 'Can\'t send new messages' },
          { label: 'Stories', left: 'You can see their stories', right: 'Stories hidden from you' },
          { label: 'Can you tell?', left: 'Very hard — you appear normal to yourself', right: 'Obvious — profile appears empty/missing' },
        ]}
      />

      <SectionHeader number={7} title="Instagram Block vs. Other Platforms" />
      <CompareTable
        leftLabel="Instagram"
        rightLabel="Other Platforms"
        rows={[
          { label: 'Notification sent', left: 'No — completely silent', right: 'Twitter/X: no. Facebook: no. WhatsApp: no notification' },
          { label: 'Old messages', left: 'Remain visible in your inbox', right: 'WhatsApp: thread stays. Facebook: messages stay visible' },
          { label: 'Profile visibility', left: 'Empty shell visible at URL but no content', right: 'Twitter: "Account suspended" style page. Facebook: profile hidden entirely' },
          { label: 'Can blocker see you', left: 'No — mutual block effect', right: 'Generally mutual on all major platforms' },
          { label: 'Follow/friend status', left: 'Follow removed from both sides instantly', right: 'Facebook: friend removed. Twitter: follow removed' },
          { label: 'Search appearance', left: 'Hidden from your search results', right: 'Hidden on Twitter/X and Facebook too' },
        ]}
      />

      <AlertBox type="tip" title="Don't try to circumvent the block">
        Creating new accounts to view someone's profile or contact them after being blocked
        violates Instagram's Community Guidelines and Terms of Service. Repeated violations
        can result in your IP address being flagged and future accounts being preemptively blocked.
        Respect people's decisions about who they interact with.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Do Instagram messages get deleted when someone blocks you?',
          answer: 'No — your old direct message conversation remains in your inbox. Their messages are still visible to you in the thread. However, you cannot send new messages to someone who has blocked you — the send button may appear but messages won\'t deliver. Their profile picture in the conversation will show as blank.',
        },
        {
          question: 'Can you still see someone\'s tagged photos if they blocked you?',
          answer: 'You generally cannot see their profile posts or click their tag links. However, if a mutual friend\'s post tags them, you might still see the photo itself — just with a broken or blank tag for the blocked user. The tag won\'t navigate to their profile from your account.',
        },
        {
          question: 'What happens when someone unblocks you?',
          answer: 'If they unblock you, their profile becomes visible again and you can see their posts. However, you are not automatically re-following them — blocking removes the follow relationship from both sides permanently. You would need to follow them again manually. Your previous DM conversation reappears for both of you.',
        },
        {
          question: 'Can I block someone back if they blocked me?',
          answer: 'If someone blocked you, you cannot see their profile from your account to block them back. You would need to use a different account to find their profile URL, then open it on your main account. However, creating secondary accounts to circumvent blocks may violate Instagram\'s Terms of Service.',
        },
        {
          question: 'How long does a block last?',
          answer: 'Until the person who blocked you manually unblocks you. Instagram blocks are indefinite — there\'s no automatic expiration after 30 or 90 days. If you were blocked and later the profile becomes visible again from your account without any action on your part, the person unblocked you.',
        },
        {
          question: 'Can someone see my old likes on their posts after they block me?',
          answer: 'No — when you\'re blocked, all your previous likes on their posts are removed retroactively. Your name disappears from their like lists. This is one of the clearest indicators of a block, though you\'d need another account to verify it from their side since you can\'t see their posts from your blocked account.',
        },
        {
          question: 'Does a blocked account show up in mutual followers lists?',
          answer: 'If you are blocked by someone and view a mutual friend\'s follower or following list, you may still see the person who blocked you in that list — their account appears but clicking their profile shows the empty state or doesn\'t load correctly for you. Other users see their full profile normally in those same lists.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
