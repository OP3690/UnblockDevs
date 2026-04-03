'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps, CodeBlock,
} from '@/components/blog/BlogVisuals';

export default function HowAIKnowsWhatYoureThinkingClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How AI Knows What You're Thinking (And Why It Feels So Accurate)</h1>
      <p className="lead">
        Ever feel like your phone or your feed "knows" what you want before you say it? AI doesn't
        read your mind — it uses data, patterns, and psychology to predict what you're likely to do
        or like. This guide explains how: recommendation systems, data tracking, predictive models,
        collaborative filtering, and why it feels so accurate (and when it isn't).
      </p>

      <StatGrid stats={[
        { value: '300M+', label: 'data points collected per user per day by major platforms', color: 'blue' },
        { value: '80%', label: 'of Netflix viewing driven by algorithmic recommendations', color: 'purple' },
        { value: 'Collaborative', label: 'filtering — "users like you also liked" — most common approach', color: 'green' },
        { value: 'Cold start', label: 'problem when AI has no data about a new user', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Do We Mean by 'AI Knowing What You're Thinking'?" />
      <QuickFact color="blue" label="Core definition">
        When we say AI "knows what you're thinking," we don't mean it reads your mind. We mean it predicts your behavior or preferences using past data (what you clicked, watched, bought, searched) and patterns from millions of other users. The result feels personal — sometimes eerily so — because the model is tuned to show you what you're likely to engage with.
      </QuickFact>
      <p>
        What it is: Prediction based on data and algorithms, not mind-reading. When it happens:
        Whenever you use apps that personalize (streaming, social, shopping, search). Why it feels
        accurate: The system surfaces options that match your past behavior and similar users'
        behavior — so hits feel "right," while misses are easy to forget.
      </p>
      <p>
        This is fundamentally a statistical process. The AI has no model of your mental states,
        emotions, or desires. It has a model of your past observable behavior and the behavior of
        people whose history resembles yours. That model happens to be surprisingly predictive
        because human behavior is more consistent than we think.
      </p>

      <SectionHeader number={2} title="What Data AI Actually Uses to 'Know' You" />
      <p>
        AI "knows" you only through data. The more data, the better the predictions. The breadth
        and depth of data collection would surprise most users. Here is what is typically collected
        and how it's used:
      </p>
      <KeyPointsGrid items={[
        { title: 'Explicit signals', description: 'Ratings, likes, purchases, wishlists, follows, shares, search queries — things you clearly choose to express. These are the clearest signals but represent only a small fraction of the behavioral data collected. Explicit signals are valuable but sparse.' },
        { title: 'Implicit engagement signals', description: 'Clicks, watch time, scroll depth, pause points, hover duration, time of day, rewind frequency, replays, skips — signals of interest without you explicitly saying "I like this." These are far more numerous and often more predictive than explicit signals. Watching 95% of a video says more than clicking a like button.' },
        { title: 'Context and session signals', description: 'Device type, browser, location (coarse or precise depending on permissions), language, previous searches in the same session, time since last visit, sequence of pages viewed. Context dramatically changes predictions — what you want at 7am differs from 11pm, weekday differs from weekend.' },
        { title: 'Social graph data', description: 'Who you follow, who follows you, who you interact with, shared content with mutual friends. Social connections are strong predictors — people tend to share tastes with their social network. This is why platforms push "your friend liked this."' },
        { title: 'Cross-platform tracking', description: 'Advertising networks (Google, Meta) track your behavior across millions of websites via cookies, pixels, and fingerprinting. What you search on Google, read on news sites, and browse on shopping sites all feed into unified advertising profiles even when you\'re not on those platforms.' },
        { title: 'Inferred attributes', description: 'From behavioral data, algorithms infer demographics, income ranges, political leanings, health concerns, relationship status, and life events — even when you never disclose these. Inference accuracy is imperfect but surprisingly good for macro categories used in ad targeting.' },
      ]} />

      <AlertBox type="info" title="The data collection iceberg">
        What you consciously do on a platform — like, comment, share — is the visible tip. The majority of signals feeding recommendation AI are invisible: how long your cursor hovered, whether you scrolled past something quickly, what time you opened the app, how long you stayed. This implicit data is often more predictive than your explicit choices because it's harder to game.
      </AlertBox>

      <SectionHeader number={3} title="How Recommendation Systems Work" />
      <p>
        Recommendation systems are the specific type of AI system responsible for the "this is just
        for you" feeling. Understanding how they work removes the mystique.
      </p>
      <CompareTable
        leftLabel="Approach"
        rightLabel="How It Works and Where It's Used"
        rows={[
          { label: 'Collaborative Filtering', left: '"Users like you also liked this." Finds users with similar history and recommends what they liked.', right: 'Netflix, Spotify, Amazon — the most widely used approach for mature platforms with lots of user data' },
          { label: 'Content-Based Filtering', left: '"You liked A; here\'s B because it shares these attributes." Recommends items similar to ones you engaged with.', right: 'Music apps (match tempo, genre, key), news apps (match topic, writing style), early-stage platforms without much user data' },
          { label: 'Hybrid Systems', left: 'Combines collaborative and content-based signals with contextual and real-time signals.', right: 'Modern production systems at scale — virtually every major platform uses some form of hybrid recommendation' },
          { label: 'Matrix Factorization', left: 'Decomposes user-item interaction matrix into latent factors representing hidden preferences.', right: 'Classic Netflix Prize approach — still used in many systems as a component of larger hybrid pipelines' },
          { label: 'Deep Learning Models', left: 'Neural networks learn complex non-linear patterns from massive interaction datasets.', right: 'YouTube, TikTok, Instagram Reels — sequential recommendation models that predict "next video" with high accuracy' },
          { label: 'Reinforcement Learning', left: 'Treats recommendation as a sequential decision problem — optimizes long-term engagement, not just next click.', right: 'Advanced systems trying to avoid filter bubbles while maintaining engagement; research-stage at most companies' },
        ]}
      />

      <SectionHeader number={4} title="Inside a Recommendation Engine — Simplified Code View" />
      <CodeBlock language="python" filename="collaborative_filtering.py">
{`import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Simplified collaborative filtering example
# Real systems use embeddings trained on billions of interactions

# User-item interaction matrix
# Rows = users, Columns = items (movies, songs, products)
# Values = implicit score (watch time, clicks, purchases)
user_item_matrix = np.array([
    [5, 3, 0, 1, 0],   # User A: liked action movies
    [4, 0, 4, 1, 2],   # User B: liked action + comedy
    [1, 1, 0, 5, 4],   # User C: liked romance movies
    [0, 0, 5, 4, 5],   # User D: liked comedy + romance
])

def find_similar_users(user_id: int, matrix: np.ndarray, top_n: int = 2):
    """Find users most similar to target user using cosine similarity."""
    similarities = cosine_similarity(matrix)
    user_similarities = similarities[user_id]
    user_similarities[user_id] = -1  # exclude self
    similar_users = np.argsort(user_similarities)[::-1][:top_n]
    return similar_users, user_similarities[similar_users]

def recommend_items(user_id: int, matrix: np.ndarray, top_n: int = 3):
    """
    Recommend items user hasn't seen based on similar users' behavior.
    This is the core of collaborative filtering.
    """
    similar_users, similarity_scores = find_similar_users(user_id, matrix)
    unseen_items = np.where(matrix[user_id] == 0)[0]

    item_scores = {}
    for item_id in unseen_items:
        score = sum(
            similarity * matrix[sim_user, item_id]
            for sim_user, similarity in zip(similar_users, similarity_scores)
        )
        if score > 0:
            item_scores[item_id] = score

    ranked = sorted(item_scores.items(), key=lambda x: x[1], reverse=True)
    return [item_id for item_id, _ in ranked[:top_n]]

recommendations = recommend_items(user_id=0, matrix=user_item_matrix)
print(f"Recommended items for User A: {recommendations}")
# Output: items that User B (similar taste) liked but User A hasn't seen`}
      </CodeBlock>

      <SectionHeader number={5} title="The Psychology of Why It Feels So Accurate" />
      <p>
        Even when the system is wrong a significant portion of the time, it feels accurate.
        This is a predictable result of how human memory and perception work — not a sign that
        the algorithm is as clever as it appears.
      </p>
      <KeyPointsGrid items={[
        { title: 'Availability heuristic and recency bias', description: 'When a suggestion is right, it stands out vividly in memory. When it\'s wrong, you scroll past and it fades. You remember the hits more than the misses — not because there are more hits, but because hits are more memorable. A recommendation that nails your taste feels like a meaningful event; a bad one feels like noise.' },
        { title: 'Confirmation bias', description: 'We notice things that match our beliefs or preferences. So we notice when the feed "gets us" and downplay when it doesn\'t. We\'re primed to see patterns of accuracy and to rationalize misses as outliers. The system benefits from our desire to feel understood.' },
        { title: 'Barnum effect (Forer effect)', description: 'Vague or broad suggestions feel personal. "You might like something popular in your genre" could describe millions of people, but it feels tailored. We fill in the details ourselves and think the system knows us specifically, when in fact it made a broadly-applicable prediction.' },
        { title: 'Engagement optimization creates compelling content', description: 'Platforms optimize for engagement, not accuracy of knowing you. Content surfaces first because it\'s designed to be compelling (high production value, provocative, emotional) — which feels "right" because it\'s engaging, not because the system deeply understands your taste.' },
        { title: 'Habituation and filter bubbles', description: 'Over time, recommendations narrow around your established tastes because the system reinforces what you engage with. Every recommendation feels spot-on — but you\'re seeing an increasingly limited slice of available content. Accuracy feels high because the pool has been constrained to your known preferences.' },
        { title: 'Post-hoc rationalization', description: 'When you discover a recommended song or movie you love, you construct a narrative about why it\'s perfect for you. The algorithm doesn\'t know why — it pattern-matched behavioral signals. But human minds create causal stories for coincidences, making the algorithm seem more insightful than it is.' },
      ]} />

      <QuickFact color="amber" label="The miss rate is higher than you think">
        Netflix reports that ~80% of viewing comes from recommendations. But users typically scroll through many recommendations before selecting one. The "recommendation" that gets credit is the one you clicked — the 20-50 you scrolled past are invisible misses. If the system showed you 30 options and you picked one, that's a 97% miss rate that feels like a 100% hit rate because you only notice what you chose.
      </QuickFact>

      <SectionHeader number={6} title="How Platforms Collect and Use Your Data in Real Time" />
      <VerticalSteps steps={[
        { title: 'Session initialization', desc: 'When you open an app, the platform immediately loads your profile: viewing history, last session behavior, demographic inferences, device type, time of day. This is used to select the initial content display before you interact at all. The first screen you see is already personalized based on everything collected before this session.' },
        { title: 'Real-time signal capture', desc: 'Every interaction generates signals: how long you paused on each item before scrolling, what you tapped and then backed out of, how fast you scrolled (slow scroll = interest, fast scroll = disinterest). These signals feed into real-time models that update recommendations within the same session without waiting for batch processing.' },
        { title: 'Model inference at scale', desc: 'For platforms with millions of concurrent users, running deep learning inference for every recommendation request requires massive infrastructure. Techniques like approximate nearest neighbor search (for collaborative filtering) and cached embeddings allow platforms to serve personalized recommendations in under 100ms even at billions-of-users scale.' },
        { title: 'A/B testing and continuous improvement', desc: 'Platforms constantly run A/B tests: different recommendation algorithms, different UI positions for recommendations, different content mixes. Users are unknowing participants in thousands of concurrent experiments. Winning variants get deployed widely, losing variants are discarded. This is why recommendation quality steadily improves over years of platform use.' },
        { title: 'Cross-session learning and profile updates', desc: 'Your engagement data from each session is processed (often in batch overnight, sometimes near-real-time) and used to update your user embedding — the numerical representation of your tastes. Long-term taste evolution is tracked: your music tastes from 5 years ago are down-weighted relative to recent listening behavior.' },
      ]} />

      <SectionHeader number={7} title="Recommendation AI Across Major Platforms" />
      <CompareTable
        leftLabel="Platform"
        rightLabel="Recommendation Approach and Key Signals"
        rows={[
          { label: 'Netflix', left: 'Hybrid: collaborative filtering + content features + viewing time signals. Heavy weight on watch completion rate.', right: 'Primarily engagement-based — maximizes hours watched, not satisfaction. Even show artwork is A/B tested per user segment.' },
          { label: 'TikTok', left: 'Content-first: starts with content attributes (audio, visual, caption), quickly shifts to engagement signals as they accumulate.', right: 'Extremely fast cold-start — new users get good recommendations within 5-10 interactions. Most engagement-optimized algorithm publicly known.' },
          { label: 'Spotify', left: 'Deep collaborative filtering + audio feature analysis (tempo, key, mood). Discover Weekly uses matrix factorization on playlist co-occurrence data.', right: 'Taste profile built from 30+ audio features per track. Playlist-based collaborative filtering is uniquely effective for music discovery.' },
          { label: 'Amazon', left: 'Item-to-item collaborative filtering ("customers who bought X also bought Y"). Purchase history weighted heavily over browse history.', right: 'Purchase signals much stronger than browse signals. Converts browsing to buying using social proof (star ratings, review count as trust signals).' },
          { label: 'YouTube', left: 'Two-stage: candidate generation (what\'s broadly relevant) → ranking (what\'s most likely to be watched). Deep neural network trained on watch time.', right: 'Optimizes watch time heavily, which has driven concerns about engagement with extreme content that holds attention longer than moderate content.' },
          { label: 'Instagram', left: 'Graph-based: who you interact with + content engagement signals. Reels uses separate ranking algorithm from Feed and Explore.', right: 'Social proximity signals (friends of friends, comments) combined with content engagement. Separate algorithms for Reels vs Feed vs Explore tabs.' },
        ]}
      />

      <SectionHeader number={8} title="When AI Predictions Work — and When They Fail" />
      <CompareTable
        leftLabel="When AI Predictions Work Well"
        rightLabel="When AI Predictions Fail"
        rows={[
          { label: 'Data volume', left: 'You have consistent, extensive behavioral history with the platform', right: 'New user (cold start problem) — no history to learn from, must rely on demographics or popular content' },
          { label: 'Taste consistency', left: 'Your preferences are stable over time and across contexts', right: 'Changing tastes — algorithm lags behind your evolving interests because historical data dominates' },
          { label: 'Similarity to others', left: 'Your tastes align with many other users (collaborative filtering works)', right: 'Niche, unusual, or unique tastes — fewer similar users to learn from, less accurate collaborative signals' },
          { label: 'Optimization target match', left: 'You want what the system is optimizing for (typically engagement)', right: 'You want something different from engagement: discovery, learning, balance, or content outside your bubble' },
          { label: 'Contextual consistency', left: 'Your context is stable (always browse in the evening, alone)', right: 'Shared device, life transitions (new city, new job, new relationship, new interests)' },
        ]}
      />

      <AlertBox type="warning" title="The engagement optimization trap">
        Most recommendation systems optimize for engagement — clicks, watch time, session duration. This is measurable and optimizable. But engagement doesn't equal satisfaction, well-being, or what you actually wanted. Research shows that recommendation systems can push users toward more extreme content, create filter bubbles, and optimize for the behavioral signal (clicking) even when the actual experience wasn't positive. Understanding this distinction helps you take deliberate control of your algorithmic environment.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Does AI actually listen through my microphone to predict what I want?',
          answer: 'No credible evidence supports the microphone listening theory. The behavioral data collected is extensive enough that AI can make uncannily accurate predictions without audio surveillance. When you see an ad for something you recently discussed, the more likely explanation is: you searched for related terms, visited related websites, your purchasing patterns align with people who buy that product, or shared location data with someone who bought it. The data already collected makes microphone listening unnecessary and more legally risky than the marginal signal it would provide.',
        },
        {
          question: 'How does AI handle "cold start" — new users with no data?',
          answer: 'Cold start is a genuine problem. Platforms handle it through: onboarding questions (explicit preference elicitation — "pick artists you like"), demographic inference from device, location, and sign-up time, defaulting to popular content that many users like, and rapidly updating from the first few interactions. TikTok is notable for solving cold start particularly fast — within 5-10 video interactions, its recommendations feel surprisingly personal because it weights recent engagement very heavily.',
        },
        {
          question: 'Why does an algorithm recommend things I just talked about without searching?',
          answer: 'This feels like mic surveillance but usually has mundane explanations: someone else searched for it near you (location-based ad signals), you visited related websites (cross-site tracking), a purchase or search earlier in your history triggered the timing, or it\'s a popular item whose appearance feels significant because you noticed it. Confirmation bias makes us notice these coincidences more than the thousands of recommendations that miss what we were thinking about.',
        },
        {
          question: 'What is a "filter bubble" and how does recommendation AI create it?',
          answer: 'A filter bubble is when recommendation systems show you content that reinforces your existing preferences and worldview, gradually narrowing the diversity of content you encounter. It occurs because systems optimize for engagement — and familiar, preference-aligned content generates more engagement than challenging or diverse content. Over time, your recommendation pool shrinks around your established tastes. Filter bubbles are documented in political news recommendations and contribute to polarization by exposing people exclusively to views they already hold.',
        },
        {
          question: 'How do platforms infer sensitive attributes like political views or health concerns?',
          answer: 'Inferred attributes emerge from correlations in large behavioral datasets. Platforms learn that users who engage with certain content combinations tend to belong to certain demographic or psychographic groups. They don\'t need you to declare your political affiliation — engagement patterns with specific media outlets, topics, and even entertainment preferences are strongly correlated with political leanings in training data. Health concerns are inferred from search patterns, supplement purchases, and health content engagement.',
        },
        {
          question: 'Can I opt out of algorithmic recommendations entirely?',
          answer: 'Most platforms offer partial controls: turning off watch history, using incognito mode, opting out of cross-site ad tracking (via browser settings or platform privacy settings), and using "not interested" labels aggressively. Completely opting out while still using the platform is difficult — even with history cleared, your current session behavior immediately starts building a new profile. The most complete opt-out is using platforms that don\'t track: DuckDuckGo for search, RSS readers for news without algorithmic curation.',
        },
        {
          question: 'Why does the algorithm recommend something I just bought?',
          answer: 'This is a known failure mode called "post-purchase recommendations." Purchase signals are strong positive signals in the training data, so the algorithm recommends similar items — not realizing you already have what you need. More sophisticated systems account for purchase intent (browsing signals) differently from satisfaction (post-purchase behavior), but many don\'t distinguish between them well. The practical fix: mark purchased items as owned on platforms that support it, or use "not interested" after purchasing to suppress similar recommendations.',
        },
        {
          question: 'How accurate are recommendation systems really?',
          answer: 'It depends heavily on how you measure accuracy and the platform. Netflix\'s recommendation click-through rate is estimated at 60-80% for the top row of personalized content. Spotify\'s Discover Weekly has extremely high user satisfaction (typically 70-80% of users listen to most of the playlist). However, "accurate" in the sense of showing something you click doesn\'t mean accurate in the deeper sense of showing what would genuinely benefit you. Systems are very good at predicting clicks; less good at predicting satisfaction.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
