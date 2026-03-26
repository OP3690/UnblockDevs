'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function HowToKnowIfSomeoneBlockedYouOnInstagramClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How to Know If Someone Blocked You on Instagram — 6 Signs to Check</h1>
      <p className="lead">
        Instagram doesn't notify you when someone blocks you. But there are clear signs to check.
        This guide explains every indicator of being blocked vs. an account being deactivated,
        deleted, or having a private profile.
      </p>

      <StatGrid stats={[
        { value: 'No notification', label: 'Instagram never tells you when you\'re blocked', color: 'amber' },
        { value: '6 signs', label: 'to check if you\'ve been blocked', color: 'blue' },
        { value: 'Different device', label: 'verify by checking from another account', color: 'green' },
        { value: 'DMs preserved', label: 'old messages don\'t disappear when blocked', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="Signs You've Been Blocked" />
      <KeyPointsGrid columns={2} items={[
        { title: '1. Can\'t find their profile', description: 'Search their username. If their account doesn\'t appear at all (when it used to), or if it shows "No results" — strong sign of a block. (Could also be: deleted account, username change)' },
        { title: '2. Profile shows "No posts yet"', description: 'If you can find their profile but it shows 0 posts, 0 followers, 0 following with "No posts yet" — you\'re blocked. The profile exists but you\'re blocked from seeing content.' },
        { title: '3. Can\'t follow them', description: 'Visit their profile. If the "Follow" button appears but clicking it does nothing, or it instantly reverts — you\'re likely blocked.' },
        { title: '4. Old DMs still there but grayed', description: 'In your DMs, their conversation history remains but their profile picture may be blank and their username may appear differently.' },
        { title: '5. Their tagged posts missing', description: 'Posts where they\'ve been tagged by others no longer show their face or tag link when you\'re blocked.' },
        { title: '6. Verify from another account', description: 'The definitive test: log into a different Instagram account (or a friend\'s) and search the person. If you can see their profile there but not from yours — you\'re blocked.' },
      ]} />

      <SectionHeader number={2} title="Block vs Deleted Account vs Private" />
      <QuickFact>
        The symptoms of being blocked are similar to a deleted or deactivated account. The key
        difference: a deleted/deactivated account is invisible to EVERYONE. A block is only for
        you — others can still see the profile. Always verify using another account to confirm.
      </QuickFact>

      <AlertBox type="tip" title="Don't obsessively check">
        If you suspect you're blocked, the most dignified approach is to accept it. Creating
        additional accounts to bypass a block violates Instagram's terms of service and could
        result in your account being reported or banned. Respect people's decisions.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Do Instagram messages get deleted when someone blocks you?',
          answer: 'No — your old direct message conversation remains in your inbox. Their messages are still visible to you. However, you cannot send new messages to someone who has blocked you. If you try to DM them, the message won\'t be delivered.',
        },
        {
          question: 'Can you still see someone\'s tagged photos if they blocked you?',
          answer: 'You generally cannot see their profile posts, and their tag links won\'t work for you. However, if a mutual friend\'s post tags them, you might still see the photo — just with a broken/blank tag for the blocked user.',
        },
        {
          question: 'What happens when someone unblocks you?',
          answer: 'If they unblock you, their profile becomes visible again. However, you are not automatically following them again — blocking removes the follow relationship. You would need to re-follow them. Your previous DM conversation also reappears for both of you.',
        },
        {
          question: 'Can I block someone back if they blocked me?',
          answer: 'If someone blocked you, you cannot see their profile or block them directly from Instagram. You would need to use a different account to find their profile and block them from there. However, this requires creating or using a second account.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
