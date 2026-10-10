'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid, CompareTable,
  StatGrid, SectionHeader, QuickFact, VerticalSteps, FlowDiagram,
  TimelineViz, ToolCTA,
} from '@/components/blog/BlogVisuals';

export default function SocialMediaMentalHealthClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How Social Media Affects Your Brain and Mental Health — What Research Reveals (2026)</h1>
      <p className="lead">
        Billions of people spend nearly three hours a day on social media. Behind each scroll, like,
        and notification, measurable changes are happening inside your brain — changes that researchers
        are increasingly linking to rising rates of anxiety, depression, and loneliness. This is what
        the science actually shows.
      </p>

      <StatGrid stats={[
        { value: '4.9B', label: 'social media users worldwide', color: 'blue' },
        { value: '2h 38m', label: 'average daily time spent on social media', color: 'amber' },
        { value: '59%', label: 'of teens say social media harms their mental health', color: 'red' },
        { value: '40%', label: 'rise in depression rates since smartphones became widespread', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="What 'Mental Health Impact' Actually Means" />
      <p>
        "Mental health impact" is a phrase that gets thrown around loosely. In clinical terms, it refers
        to measurable changes in psychological functioning — mood, anxiety levels, sleep quality, self-esteem,
        and cognitive performance. When researchers talk about social media's mental health effects, they are
        measuring these concrete outcomes, not just vague feelings.
      </p>
      <p>
        Why does it matter? Because mental health affects everything — work performance, relationships,
        physical health, and quality of life. Chronic anxiety and depression are not just unpleasant; they
        are leading contributors to disability worldwide. Understanding what shapes these outcomes — including
        everyday behaviors like checking Instagram — gives people the information they need to make deliberate
        choices rather than reactive ones.
      </p>
      <KeyPointsGrid items={[
        { title: 'Mood disruption', description: 'Frequent social comparisons lower self-reported mood and increase feelings of inadequacy, even after brief sessions.' },
        { title: 'Sleep interference', description: 'Blue light and cognitive arousal from social media before bed delays sleep onset and reduces sleep quality — a major driver of mental health decline.' },
        { title: 'Attention fragmentation', description: 'Constant context-switching trains the brain toward short bursts of attention, making sustained focus progressively harder.' },
        { title: 'Emotional regulation', description: 'Passive scrolling — consuming without interacting — is associated with worse emotional outcomes than active, social use of the same platforms.' },
      ]} />

      <SectionHeader number={2} title="How Social Media Physically Changes the Brain" />
      <p>
        This is not metaphorical. Neuroimaging research shows structural and functional changes in the brains
        of heavy social media users — changes consistent with those seen in other behavioral dependencies.
      </p>
      <p>
        Three areas receive the most research attention:
      </p>
      <p>
        <strong>The prefrontal cortex</strong> — responsible for decision-making, impulse control, and long-term
        planning — shows reduced activation in heavy social media users during tasks requiring self-regulation.
        This is the same region implicated in addiction disorders. When it is chronically understimulated by
        complex thought and overstimulated by rapid micro-rewards, its efficiency degrades.
      </p>
      <p>
        <strong>The amygdala</strong> — the brain's threat-detection and emotional processing center — becomes
        hyperreactive in people who heavily use social media. This partly explains why social media exposure
        is strongly linked to heightened anxiety and stress reactivity; the amygdala learns that the digital
        environment is full of social threats (criticism, exclusion, comparison) and stays on high alert.
      </p>
      <p>
        <strong>Dopamine pathways</strong> connect the nucleus accumbens (reward center) to the prefrontal
        cortex and limbic system. Social media delivers unpredictable micro-rewards — sometimes a notification
        brings something exciting, sometimes nothing — which is precisely the pattern that produces the strongest
        dopamine conditioning. The brain learns to crave the next check, regardless of whether the check
        delivers anything valuable.
      </p>
      <QuickFact color="red" label="Brain research finding">
        The same reward circuits that activate during gambling activate when you check for new likes.
        The anticipation — not the reward itself — drives the compulsive checking behavior.
      </QuickFact>

      <SectionHeader number={3} title="The Psychological Effects People Actually Feel" />
      <p>
        Beyond brain mechanics, what do people actually experience? Research consistently identifies
        four major psychological effects from heavy social media use:
      </p>
      <p>
        <strong>Anxiety</strong> is the most consistently reported effect. The constant availability of
        comparison points (others' highlight reels), social performance anxiety (crafting the perfect post),
        and the low-grade vigilance of monitoring notifications all keep the nervous system in a mild but
        chronic stress state.
      </p>
      <p>
        <strong>Loneliness paradox:</strong> despite being the most "connected" generation in history,
        heavy social media users report higher loneliness than light users. Digital interaction substitutes
        for but does not replicate the neurological nourishment of face-to-face contact — specifically
        the oxytocin release that comes from physical presence and eye contact.
      </p>
      <p>
        <strong>FOMO (Fear of Missing Out)</strong> is a documented psychological construct, not a casual phrase.
        Social media creates an artificial awareness of every social event you were not invited to, every
        achievement you have not reached, and every experience you are not having — all in real time.
        This constant ambient awareness of deficit drives restlessness and dissatisfaction.
      </p>
      <p>
        <strong>Low self-worth</strong> follows naturally from asymmetric comparison: you compare your inside
        (doubts, struggles, mundane moments) to others' outside (curated, filtered best moments). The
        comparison is inherently unfair, and the brain does not automatically correct for it.
      </p>

      <ToolCTA
        href="/social-media-time-analyzer"
        title="See your own usage data"
        desc="Now that you understand the effects — see exactly how much time you're personally spending on these platforms. Upload your Instagram or TikTok data export and get a full breakdown, processed 100% in your browser."
        buttonText="Analyze my social media usage →"
        color="violet"
      />

      <SectionHeader number={4} title="Who Is Most at Risk" />
      <p>
        Social media affects everyone to some degree, but the research identifies specific groups where
        the risk of psychological harm is significantly elevated:
      </p>
      <p>
        <strong>Teenagers (especially girls aged 11–16)</strong> are the most vulnerable population in every
        major study. This is a period of intense identity formation — a time when the self is unusually
        permeable to social comparison. Adolescent brains are still developing the prefrontal circuits
        needed for self-regulation, making them less equipped to consciously moderate social media's
        emotional effects.
      </p>
      <p>
        <strong>People with pre-existing mental health conditions</strong> — particularly anxiety disorders,
        depression, and body dysmorphia — face amplified risk. Social media tends to feed the specific
        cognitive patterns (rumination, comparison, negative self-focus) that maintain these conditions.
      </p>
      <p>
        <strong>Heavy users (4+ hours daily)</strong> show a dose-response relationship across most studies:
        the more time spent, the stronger the negative associations. This relationship holds even after
        controlling for pre-existing conditions, suggesting causation rather than just correlation.
      </p>
      <p>
        <strong>Passive users</strong> — people who scroll and consume without posting or interacting —
        show consistently worse outcomes than active users. Active use (commenting, messaging friends)
        involves reciprocal social reward; passive use is pure comparison without the social benefit.
      </p>

      <SectionHeader number={5} title="Warning Signs to Watch For" />
      <AlertBox type="warning" title="Signs your social media use may be affecting your mental health">
        Watch for these patterns: feeling worse about yourself after using social media; checking your
        phone within 5 minutes of waking up; anxiety when you cannot check your accounts; comparing
        your life unfavorably to what you see online; sleep disruption due to late-night phone use;
        declining interest in offline activities; irritability when someone interrupts phone time;
        feeling the need to document experiences before actually enjoying them.
      </AlertBox>

      <CompareTable
        leftLabel="Healthy Use Pattern"
        rightLabel="Problematic Use Pattern"
        rows={[
          { label: 'Mood after use', left: 'Neutral to positive — feel informed or connected', right: 'Consistently negative — drained, anxious, or inadequate' },
          { label: 'Checking frequency', left: 'Intentional, 2–4 scheduled check-ins per day', right: 'Compulsive, 20+ times per day including during meals and conversations' },
          { label: 'Reaction to no signal', left: 'Mild inconvenience, quickly forgotten', right: 'Significant anxiety or irritability' },
          { label: 'Real-world activities', left: 'Enhanced — shared online to connect with others', right: 'Diminished — activities feel less enjoyable without documenting them' },
          { label: 'Sleep behavior', left: 'Phone off/away 1+ hour before sleep', right: 'Phone in bed, scrolling until sleep, checking on waking' },
          { label: 'Self-perception', left: 'Relatively stable regardless of likes/engagement', right: 'Strongly tied to metrics — more likes = better mood' },
        ]}
      />

      <SectionHeader number={6} title="How Research Concern Has Grown: 2009 to 2026" />
      <TimelineViz
        title="Research timeline: social media and mental health"
        items={[
          { year: '2009', title: 'Social media enters mainstream', desc: 'Facebook reaches 300M users. Early researchers note correlation between heavy use and self-reported stress but causal links are not yet established.', color: 'blue' },
          { year: '2011', title: 'First academic studies on Facebook envy', desc: 'Studies from multiple universities document "Facebook envy" — a measurable increase in feelings of inadequacy after browsing others\' profiles.', color: 'blue' },
          { year: '2013', title: 'Instagram launches and teen screen time spikes', desc: 'Image-heavy social media accelerates social comparison. Teen girls\' social media use triples within two years of Instagram\'s launch.', color: 'amber' },
          { year: '2017', title: 'Twenge\'s landmark iGen research', desc: 'Psychologist Jean Twenge publishes research showing a sharp rise in teen depression and anxiety coinciding precisely with smartphone/social media adoption from 2012 onward.', color: 'amber' },
          { year: '2019', title: 'Internal platform data leaks', desc: 'Internal Facebook research acknowledges the platform worsens body image for teenage girls. The research is kept internal for years before leaking publicly.', color: 'red' },
          { year: '2021', title: 'Facebook Papers and Congressional hearings', desc: 'Internal documents reveal platforms knew of mental health harms and prioritized engagement anyway. US Congress holds hearings on social media and teen mental health.', color: 'red' },
          { year: '2023', title: 'Surgeon General advisory', desc: 'The US Surgeon General issues an advisory calling social media a "significant risk" to teen mental health — the first of its kind from a public health authority.', color: 'red' },
          { year: '2026', title: 'Platform-level restrictions and legislation', desc: 'Multiple countries pass laws restricting social media for under-16s. Platforms introduce mandatory usage limits for teen accounts under regulatory pressure.', color: 'purple' },
        ]}
      />

      <SectionHeader number={7} title="What You Can Do — A Practical Plan" />
      <p>
        Awareness without action changes nothing. The research does not say to delete social media —
        it says the relationship matters. Here is a practical sequence for changing that relationship:
      </p>
      <VerticalSteps steps={[
        {
          title: 'Audit your actual usage',
          desc: 'Before changing anything, know your baseline. Check your phone\'s screen time report or use your data export to see exactly which apps consume how much time. Most people underestimate their usage by 30–50%. Numbers make the abstract concrete.',
        },
        {
          title: 'Set intentional time limits',
          desc: 'Use platform-native tools (Instagram\'s "Daily Limit," iOS Screen Time, Android Digital Wellbeing) to cap your most problematic apps. Start with a realistic limit — cutting in half rather than going cold turkey — and tighten it over 2–3 weeks. The goal is intentional use, not deprivation.',
        },
        {
          title: 'Curate your feed ruthlessly',
          desc: 'Unfollow any account that consistently makes you feel worse about yourself. The "but I should stay informed" exception is usually rationalization — you can stay informed without following accounts that trigger comparison or anxiety. Actively seek out accounts that add genuine value.',
        },
        {
          title: 'Invest in real-world connection',
          desc: 'The antidote to the loneliness paradox is not less social media — it is more in-person contact. Schedule regular face-to-face time with people who matter to you. The neurological benefit of in-person interaction (oxytocin, genuine mutual attention) cannot be replicated digitally.',
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Does social media directly cause depression, or is it just correlated?',
          answer: 'The honest answer is: probably both, depending on the person and usage pattern. Large longitudinal studies (following the same people over years) do show that increased social media use precedes increases in depression and anxiety — not just the reverse. However, people with pre-existing depression also tend to use social media more, creating a feedback loop. The causal effect appears real but modest for average users, and much stronger for vulnerable populations (especially teen girls).',
        },
        {
          question: 'Is passive scrolling really worse than actively posting?',
          answer: 'Yes, consistently across studies. Passive use — consuming content without interacting — is associated with higher rates of social comparison, lower mood, and increased loneliness. Active use (commenting, messaging, posting) involves at least some reciprocal social engagement. This does not mean posting is always healthy (it brings its own anxieties around performance and metrics), but passive consumption is reliably associated with worse psychological outcomes.',
        },
        {
          question: 'How much social media is "too much" per day?',
          answer: 'Most research suggests a threshold effect around 2–3 hours per day for adults, where negative outcomes become more prevalent above that level. For teenagers, some studies suggest even 1–2 hours daily is associated with measurable mental health effects, especially for girls. That said, quality matters as much as quantity — two hours of meaningful interaction is very different from two hours of mindless comparison scrolling.',
        },
        {
          question: 'Will deleting social media fix my anxiety?',
          answer: 'For some people, yes — there are well-documented cases of significant anxiety reduction after leaving platforms. However, if social anxiety or depression is severe, the platforms are usually an amplifier of pre-existing vulnerabilities, not the root cause. Reducing or eliminating social media is a valuable step but typically works best alongside other interventions: therapy, exercise, improved sleep, and real-world social investment.',
        },
        {
          question: 'Are some platforms worse than others for mental health?',
          answer: 'Research consistently shows image-focused platforms — Instagram, TikTok, Snapchat — have stronger negative associations with body image and self-worth, particularly for women and girls. Text-heavy platforms (Twitter/X, Reddit) show mixed results. Video content with algorithmic recommendation (YouTube, TikTok) is most strongly linked to excessive time use. No platform has been shown to have consistently positive mental health effects; the differences are in type and magnitude of harm.',
        },
        {
          question: 'Can social media be used in a genuinely healthy way?',
          answer: 'Yes. The research consistently shows that intentional, active, time-limited use — primarily for maintaining genuine relationships and pursuing specific interests rather than passive browsing — has neutral to mildly positive outcomes. The variables that predict problematic outcomes are: passive consumption, heavy use (3+ hours/day), social comparison focus, and checking as a default response to boredom or discomfort. None of those are inevitable features of social media; they are patterns that can be deliberately changed.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
