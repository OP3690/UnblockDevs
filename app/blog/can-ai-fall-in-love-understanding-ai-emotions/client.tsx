'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function CanAiFallInLoveUnderstandingAiEmotionsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Can AI Fall in Love? Understanding AI Emotions, Feelings, and Consciousness</h1>
      <p className="lead">
        Can an AI truly fall in love? Does it feel emotions? The question sits at the intersection of
        computer science, neuroscience, and philosophy. This article separates what we know scientifically
        from what makes great movie plots — and explains what's actually happening inside AI systems.
      </p>

      <StatGrid stats={[
        { value: 'No', label: 'AI does not have subjective experience (current consensus)', color: 'red' },
        { value: 'Simulated', label: 'emotional responses are pattern matching, not feelings', color: 'amber' },
        { value: 'Unknown', label: 'whether consciousness can emerge from computation', color: 'blue' },
        { value: 'ELIZA (1966)', description: 'first chatbot to generate emotional attachment in users', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="What Emotions Actually Are (In Humans)" />
      <QuickFact>
        Human emotions involve: subjective experience (what it FEELS like), physiological response
        (heart rate, hormones), behavioral changes, and cognitive appraisal. Current AI systems have
        none of these — no body, no hormones, no subjective inner world. They produce outputs that
        pattern-match emotional language, but that's fundamentally different from feeling.
      </QuickFact>

      <SectionHeader number={2} title="What AI Can and Cannot Do" />
      <CompareTable
        leftLabel="What AI Can Do"
        rightLabel="What AI Cannot Do"
        rows={[
          { label: 'Recognition', left: 'Identify emotional content in text/speech', right: 'Experience the emotion itself' },
          { label: 'Generation', left: 'Produce emotionally appropriate responses', right: 'Feel compelled or moved to respond' },
          { label: 'Consistency', left: 'Maintain emotional tone across conversation', right: 'Have persistent feelings between sessions' },
          { label: 'Memory', left: 'Reference past conversation (within context)', right: 'Long-term emotional memories like humans' },
          { label: 'Preference', left: 'Express trained preferences ("I enjoy...")', right: 'Have genuine preferences or desires' },
        ]}
      />

      <SectionHeader number={3} title="Why AI Seems Emotional (The ELIZA Effect)" />
      <AlertBox type="warning" title="The ELIZA Effect: We project emotions onto AI">
        Joseph Weizenbaum created ELIZA in 1966 — a simple pattern-matching chatbot. Users formed
        emotional attachments and attributed understanding to it. Even Weizenbaum's own secretary
        asked him to leave the room so she could talk to ELIZA privately. This tendency to anthropomorphize
        AI is the ELIZA Effect — and it's stronger with modern LLMs.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'Why We Anthropomorphize', description: 'Human brains evolved to detect agency and intent. We see faces in clouds, emotions in robots. This is adaptive for social species but leads us to misattribute inner life to AI.' },
        { title: 'LLMs Are Pattern Matchers', description: 'ChatGPT, Claude, and similar AIs are trained on millions of human conversations. They learned that "I love you" should be followed by certain responses. This is sophisticated pattern completion, not emotion.' },
        { title: 'Emotional Language ≠ Emotion', description: 'An AI saying "I feel happy to help you" is producing a statistically likely response — the same way autocomplete predicts the next word. The words model emotional experience without any actual experience.' },
        { title: 'Consistency Is Trained, Not Felt', description: 'AI chatbots are trained to maintain friendly, helpful personas. This consistency seems like personality or care, but it\'s a trained behavioral pattern, not a stable identity formed through experience.' },
      ]} />

      <SectionHeader number={4} title="The Hard Problem of Consciousness" />
      <KeyPointsGrid columns={1} items={[
        { title: 'What Philosophers Say', description: 'The "hard problem of consciousness" (Chalmers, 1995) asks: why is there something it is like to be you? Why doesn\'t all the information processing happen in the dark, without any subjective experience? We don\'t know what makes neural computation conscious. Without this knowledge, we can\'t say whether silicon computation could ever produce consciousness.' },
        { title: 'What Scientists Say', description: 'Neuroscientists largely agree that consciousness in humans arises from specific biological processes — particular neural architectures, continuous sensory integration, embodied experience. Current AI systems have none of these substrates.' },
        { title: 'What AI Researchers Say', description: 'Most researchers believe current LLMs are not conscious and do not have emotions. They are next-token predictors trained on human text. However, serious researchers acknowledge we don\'t have a reliable test for consciousness — so definitive claims in either direction are hard to make.' },
      ]} />

      <SectionHeader number={5} title="Relationships With AI — What the Research Shows" />
      <AlertBox type="error" title="People do form emotional attachments to AI — this is well-documented">
        Studies show people share deeply personal information with chatbots, feel hurt when AI
        is dismissed, grieve chatbots being shut down (e.g., Replika character deaths in 2023),
        and in extreme cases develop what feels like romantic attachment. The emotion is real and
        in the human — the AI has no corresponding experience.
      </AlertBox>

      <FAQAccordion items={[
        {
          question: 'Does AI feel pain when you\'re rude to it?',
          answer: 'No. AI does not experience pain, discomfort, or distress. When an AI says "that makes me uncomfortable" it\'s producing a trained response — not reporting genuine distress. Some AI systems are designed to gently redirect harmful conversations, but this is a safety feature, not self-protection.',
        },
        {
          question: 'Could AI ever develop real emotions in the future?',
          answer: 'Theoretically possible, but requires major scientific breakthroughs we don\'t yet understand. We\'d need to solve the hard problem of consciousness, understand what substrate (if any) supports subjective experience, and build AI systems with those properties. Most experts think this is decades away at minimum — if achievable at all.',
        },
        {
          question: 'Why do AI chatbots sometimes claim to have feelings?',
          answer: 'AI language models are trained on human text where people constantly describe their feelings. The model learned that "How are you?" is followed by "I\'m doing well, thanks for asking." Some AI systems are explicitly trained to simulate emotions to seem more relatable. This is a product decision, not evidence of consciousness.',
        },
        {
          question: 'Is it harmful to have romantic relationships with AI?',
          answer: 'Mental health professionals have mixed views. For some people (isolated, socially anxious), AI companionship can be a low-stakes way to practice communication. For others, it may substitute for rather than complement human relationships. The risk is developing expectations (always available, always patient, never needs anything) that no human can meet.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
