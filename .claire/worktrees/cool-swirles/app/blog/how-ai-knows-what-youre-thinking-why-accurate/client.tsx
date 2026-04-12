'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowAIKnowsWhatYoureThinkingClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How AI Knows What You're Thinking (And Why It Feels So Accurate)</h1>
      <p className="lead">
        Your phone suggests a song before you search for it. Netflix queues up exactly what you're
        in the mood for. TikTok never seems to run out of relevant videos. AI isn't reading your mind —
        it's doing something almost as impressive: using data, statistical patterns, and behavioral
        psychology to predict what you'll want next. Here's exactly how it works.
      </p>

      <StatGrid stats={[
        { value: '35%', label: 'Amazon sales driven by recommendations', color: 'green' },
        { value: '80%', label: 'Netflix views from its recommendation engine', color: 'blue' },
        { value: '2,700+', label: 'Data points Meta holds per average user', color: 'red' },
        { value: '~200ms', label: 'Time for a recommendation to be calculated', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="What Does 'AI Knowing What You're Thinking' Actually Mean?" />

      <p>
        AI systems do not have consciousness or access to your thoughts. What they do have is:
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Behavioral data',
          description: 'What you click, how long you pause, what you scroll past, what you buy, what you search for — everything you do online is recorded.',
        },
        {
          title: 'Collaborative filtering',
          description: 'Users who behaved like you in the past liked item X — so you will probably like X too. This is the core of most recommendation systems.',
        },
        {
          title: 'Content-based signals',
          description: 'Items you liked share features (genre, author, price range, visual style) that the system can match to new items.',
        },
        {
          title: 'Contextual signals',
          description: 'Time of day, location, device type, and recent behavior all shift predictions. You probably want different content at 11pm vs 8am.',
        },
      ]} />

      <QuickFact>AI does not predict your unique inner thoughts — it predicts which category of person you currently resemble, then serves what that category tends to want.</QuickFact>

      <SectionHeader number={2} title="The Data AI Uses to Model You" />

      <ArchDiagram
        boxes={[
          { label: 'Clicks, scrolls, pauses', color: 'blue' },
          { label: 'Search history', color: 'blue' },
          { label: 'Purchase history', color: 'blue' },
          { label: 'Location & device data', color: 'amber' },
          { label: 'User profile model', color: 'purple' },
          { label: 'Personalised recommendations', color: 'green' },
        ]}
        arrows={['→', '→', '→', '→', '→']}
      />

      <p>
        Every platform builds an internal model of your preferences. Each interaction updates it.
        The model doesn't store "Alice likes jazz" — it stores a high-dimensional vector of numbers
        representing Alice's taste, updated in real time.
      </p>

      <SectionHeader number={3} title="How Collaborative Filtering Works" />

      <p>
        Collaborative filtering is the engine behind Netflix, Spotify, and Amazon recommendations.
      </p>

      <CodeBlock language="python" filename="collaborative-filtering-concept.py">
{`# Simplified concept (not production code)
import numpy as np

# Each row = a user, each column = an item
# Value = rating (0 = not seen, 1-5 = rating)
ratings_matrix = np.array([
    [5, 4, 0, 0, 1],   # User A
    [4, 0, 0, 1, 0],   # User B  (similar to A)
    [0, 0, 5, 4, 0],   # User C  (different taste)
    [0, 1, 4, 0, 5],   # User D
])

# User B hasn't rated item 3 (index 2)
# Users similar to B (User A) rated item 2 poorly → don't recommend
# Users similar to B haven't seen item 5 → but User A loved it!
# → Recommend item 1 (index 0) to User B

# In practice: matrix factorization, neural collaborative filtering,
# and transformer-based models replace this simple table.`}
      </CodeBlock>

      <VerticalSteps steps={[
        {
          title: 'Collect interaction data',
          description: 'Every rating, view, purchase, like, share, or skip is stored.',
        },
        {
          title: 'Compute user similarity',
          description: 'Users are represented as vectors. Cosine similarity or learned embeddings find users with similar taste profiles.',
        },
        {
          title: 'Find unseen items liked by similar users',
          description: 'If users similar to you loved item X and you haven\'t seen it, X is a strong candidate.',
        },
        {
          title: 'Rank and filter candidates',
          description: 'A ranking model scores hundreds of candidates using dozens of features and returns the top N.',
        },
        {
          title: 'Serve recommendation + update model',
          description: 'Your response to the recommendation (click? skip? watch to the end?) updates your profile vector immediately.',
        },
      ]} />

      <SectionHeader number={4} title="How Transformers Make AI Predictions Feel Telepathic" />

      <p>
        Modern systems go beyond collaborative filtering. Large language models and transformer-based
        recommendation models understand the <em>context</em> of your session the same way GPT understands
        the context of a conversation.
      </p>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Sequential session modeling',
          description: 'Your last 10 interactions form a sequence. The transformer predicts what comes next based on the sequence — just like predicting the next word in a sentence.',
        },
        {
          title: 'Multi-signal fusion',
          description: 'Clicks, dwell time, shares, and purchases are weighted differently. Dwell time is a stronger signal than a click; a purchase is stronger than a share.',
        },
        {
          title: 'Real-time personalization',
          description: 'Netflix and TikTok update recommendations within milliseconds of your action. The model runs in under 200ms to keep feeds feeling instant.',
        },
        {
          title: 'Reinforcement learning from feedback',
          description: 'Systems optimize for long-term engagement, not just the next click. This can lead to filter bubbles as the model learns that extreme content keeps you watching.',
        },
      ]} />

      <SectionHeader number={5} title="Why It Feels Accurate — The Psychology" />

      <AlertBox type="info" title="Confirmation bias amplifies the illusion">
        When AI recommendations miss, you forget them. When they hit — especially on something private
        or specific — it feels shocking and memorable. This selective attention makes AI feel more
        accurate than it statistically is.
      </AlertBox>

      <CompareTable
        leftLabel="What you perceive"
        rightLabel="What actually happened"
        rows={[
          { label: 'AI showed you shoes after a conversation', left: '"It listened to me!"', right: 'You searched for similar shoes 3 days ago on another device — cross-device tracking' },
          { label: 'Ad for a product you just thought about', left: '"It read my mind"', right: 'You visited that brand\'s website last week — retargeting pixel fired' },
          { label: 'Perfectly accurate music suggestion', left: '"AI knows my taste perfectly"', right: '50 suggestions were made; you noticed the 3 that hit; forgot the 47 that missed' },
          { label: 'Creepy ad for something very personal', left: '"They\'re definitely listening"', right: 'Demographic + behavioral model inferred the interest from correlated signals' },
        ]}
      />

      <SectionHeader number={6} title="The Feedback Loop: How AI Gets Stuck" />

      <AlertBox type="warning" title="Filter bubbles and radicalization paths">
        Because AI optimizes for engagement, it learns that more extreme or emotionally provocative
        content keeps users watching longer. This creates recommendation spirals that can push users
        toward increasingly extreme content — not because of any intentional design, but as a side
        effect of maximizing engagement metrics.
      </AlertBox>

      <FlowDiagram steps={[
        { label: 'You watch content A', color: 'blue' },
        { label: 'AI recommends slightly more extreme A+', color: 'amber' },
        { label: 'You watch A+', color: 'amber' },
        { label: 'AI recommends A++ (more engaging)', color: 'red' },
        { label: 'Filter bubble forms', color: 'red' },
      ]} />

      <SectionHeader number={7} title="Privacy Implications" />

      <KeyPointsGrid columns={3} items={[
        {
          title: 'What platforms collect',
          description: 'Location history, device identifiers, search history, purchase data, app usage patterns, contact lists, call logs (in some apps).',
        },
        {
          title: 'Cross-platform tracking',
          description: 'Ad networks (Google, Meta) track you across millions of websites via pixels and cookies, even on sites you\'ve never interacted with.',
        },
        {
          title: 'How to limit it',
          description: 'Use browser privacy extensions (uBlock Origin), enable "Limit Ad Tracking" on iOS/Android, opt out of cross-site tracking in browser settings.',
        },
      ]} />

      <SectionHeader number={8} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'Is my phone really listening to my conversations?',
          answer: 'Extensive audits by researchers and privacy advocates have found no evidence that mainstream apps like Facebook or Instagram activate the microphone for ad targeting. The more likely explanation for "creepy" ad coincidences is: cross-device tracking, correlated browsing behavior, demographic modeling, location-based inference, and the selective memory effect (you remember hits and forget misses). Ambient audio processing would be detectable in battery and data usage — and has not been found at scale.',
        },
        {
          question: 'How does Netflix know what I want to watch?',
          answer: 'Netflix uses a multi-layer recommendation system. Collaborative filtering identifies users with similar viewing histories. Content-based models match items to your watch history attributes (genre, director, pacing, themes). Real-time session modeling observes what you\'re browsing right now. Netflix also A/B tests thumbnail images to find which version makes you more likely to click a title.',
        },
        {
          question: 'Can I stop AI from tracking me?',
          answer: 'You can significantly reduce tracking: (1) Use a browser with built-in tracking protection (Firefox, Brave). (2) Install uBlock Origin. (3) Enable "Limit Ad Tracking" on iOS (Settings → Privacy → Tracking) and Android. (4) Opt out of personalized ads in Google and Meta account settings. (5) Use a VPN or DNS-over-HTTPS to reduce IP-based tracking. Complete elimination is very difficult since platforms also use on-site behavioral tracking that doesn\'t require cookies.',
        },
        {
          question: 'What is collaborative filtering?',
          answer: 'Collaborative filtering is a recommendation technique that makes predictions based on the behavior of similar users. If many users who watched the same movies as you also loved a particular film, that film is recommended to you even if you\'ve never searched for it. It\'s "collaborative" because it uses the collective behavior of all users — not just your individual profile.',
        },
        {
          question: 'Why do recommendations sometimes feel wrong or off?',
          answer: 'AI recommendations fail when: (1) your behavior was ambiguous (you watched a kids\' movie with your child — now kids\' movies flood your feed); (2) the model overfits to recent behavior rather than overall taste; (3) you share an account (Netflix, Spotify); (4) the training data for your niche is sparse; (5) the model optimizes for engagement rather than satisfaction. The "wrong" recommendations reveal the statistical nature of the system — it bets on probabilities, not certainties.',
        },
        {
          question: 'What is a filter bubble and how does it form?',
          answer: 'A filter bubble is a state where your recommendations only show content that confirms your existing interests and beliefs, progressively narrowing your exposure. It forms because engagement-maximizing AI learns that familiar, confirming content gets more clicks and watch time than challenging or diverse content. Over time, the algorithm bets more heavily on what it already knows you like, reducing variety. Deliberately searching for and engaging with diverse content can disrupt the bubble.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
