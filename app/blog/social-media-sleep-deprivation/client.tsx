'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, KeyPointsGrid, CompareTable,
  StatGrid, SectionHeader, QuickFact, VerticalSteps, FlowDiagram,
  TimelineViz, ToolCTA,
} from '@/components/blog/BlogVisuals';

export default function SocialMediaSleepDeprivationClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Doomscrolling Before Bed: How Social Media Is Destroying Your Sleep (And Your Health)</h1>
      <p className="lead">
        You climb into bed at 10:30 PM, intending to sleep by 11. You pick up your phone — just for a few minutes. The next time you check the clock it is 1:17 AM. You have not slept. You are wide awake, slightly anxious, and your feed is still refreshing. This is not a willpower problem. It is a neuroscience problem — and social media platforms have engineered it deliberately.
      </p>

      <StatGrid stats={[
        { value: '73%', label: 'of adults use their phone in bed before sleep', color: 'blue' },
        { value: '45 min', label: 'average extra time spent on phone before sleeping', color: 'amber' },
        { value: '26%', label: 'of teens say social media keeps them up past midnight', color: 'red' },
        { value: '1 in 3', label: 'adults gets less than the 7-hour recommended minimum', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="What Is Doomscrolling — and Why We Do It" />

      <p>
        The term "doomscrolling" entered mainstream vocabulary around 2020, coined to describe the compulsive behavior of endlessly consuming negative news and social media content, particularly at night, even when it makes you feel worse. But the behavior itself is far older than the word — it is a product of how variable-reward systems interact with a tired, low-resistance brain.
      </p>

      <p>
        Here is why it happens. Daytime life is structured: work, tasks, obligations. When those constraints disappear at night, your brain enters a state psychologists call "unscheduled time" — time with no agenda. In that state, the brain seeks stimulation. Your phone provides the most frictionless, high-stimulation option available. The infinite scroll format means there is never a natural stopping point, the way a chapter ending or a TV episode ending provides one.
      </p>

      <p>
        There is also a seeking paradox at play: the brain is most alert and curious in its first phase of relaxation. You are tired enough to want to wind down, but not yet tired enough to sleep — so you reach for your phone to fill that gap. The gap that should be filled by quiet transition becomes a scroll session, and the scroll session actively prevents the transition from happening.
      </p>

      <SectionHeader number={2} title="The Science: Three Mechanisms That Wreck Your Sleep" />

      <p>
        Social media does not just keep you busy at night — it chemically and neurologically hijacks the processes your body needs to fall asleep. There are three distinct mechanisms at work.
      </p>

      <KeyPointsGrid columns={1} items={[
        {
          title: 'Mechanism 1: Blue Light Suppresses Melatonin by Up to 50%',
          description: 'Your phone screen emits blue-wavelength light (400–490 nm), the same wavelength as daylight. Your brain\'s suprachiasmatic nucleus — the internal clock — reads this light as a signal that it is daytime. In response, it suppresses the production of melatonin, the hormone that signals your body to prepare for sleep. Studies from Harvard Medical School found that two hours of evening screen exposure can reduce melatonin levels by up to 50%, delaying your sleep onset by up to three hours. Night Shift and "blue light glasses" help at the margins but do not eliminate the effect — the brightness and proximity of the screen matters just as much as the color temperature.',
        },
        {
          title: 'Mechanism 2: Emotionally Stimulating Content Spikes Cortisol',
          description: 'Social media feeds are algorithmically optimized to surface content that triggers emotional responses — outrage, envy, anxiety, excitement, controversy. This is not accidental: emotionally charged content gets more engagement, which is the metric platforms are maximizing. But emotional stimulation triggers your sympathetic nervous system and raises cortisol, the stress and alertness hormone. Cortisol is biologically incompatible with sleep — its function is to make you alert and ready to respond to threats. Reading about a political disaster, watching a heated argument, or feeling the pang of comparison looking at someone\'s highlight reel all produce measurable cortisol responses. A cortisol spike at 11 PM can keep your brain in an alert state for 60–90 minutes, making it biologically impossible to fall asleep even if you put the phone down.',
        },
        {
          title: 'Mechanism 3: The Dopamine Loop Keeps the Brain in a Seeking State',
          description: 'Dopamine is often described as the "pleasure chemical" but that is a mischaracterization. Dopamine is the "anticipation and seeking" chemical — it is released when your brain expects a reward, not when it receives one. Social media feeds exploit this through variable reward schedules: sometimes the next post is interesting, sometimes it is not, sometimes there is a notification, sometimes there is not. The unpredictability is what sustains the dopamine loop — the same mechanism that makes slot machines addictive. When your brain is in a dopamine-driven seeking state, it cannot transition to the parasympathetic "rest and digest" state needed for sleep. Every scroll is keeping you chemically in pursuit mode.',
        },
      ]} />

      <FlowDiagram steps={[
        { label: 'Pick up phone in bed', desc: 'Just for a few minutes...', color: 'blue' },
        { label: 'Blue light starts blocking melatonin', desc: 'Sleep hormone production drops by up to 50%', color: 'amber' },
        { label: 'Scroll emotional / stimulating content', desc: 'Outrage, drama, comparison, envy', color: 'red' },
        { label: 'Cortisol spikes', desc: 'Stress hormone puts brain on alert', color: 'red' },
        { label: 'Brain stays alert', desc: 'Sympathetic nervous system activated', color: 'amber' },
        { label: 'Sleep takes 45+ extra minutes', desc: 'Even after you put the phone down', color: 'purple' },
        { label: 'Wake up exhausted', desc: 'Sleep debt accumulates night over night', color: 'red' },
        { label: 'Reach for phone for dopamine boost', desc: 'The cycle begins again', color: 'blue' },
      ]} />

      <ToolCTA
        href="/social-media-time-analyzer"
        title="Do you know how many hours you spend on Instagram that should be sleep time?"
        desc="See your usage data broken down by time of day — find out exactly how much of your late-night hours are going to social media."
        buttonText="Analyze My Screen Time"
        color="violet"
      />

      <SectionHeader number={3} title="The Physical Health Cascade: What Chronic Sleep Deprivation Does to Your Body" />

      <p>
        Missing one night of sleep is recoverable. Missing one hour per night, every night, is not. Chronic sleep deprivation — defined as consistently sleeping less than 7 hours — sets off a cascade of physical health consequences that research has linked directly to the rise of smartphone and social media use since 2010.
      </p>

      <p>
        <strong>Immune system degradation:</strong> Sleep is when your immune system produces and deploys cytokines — proteins that fight infection and inflammation. People sleeping under 6 hours are four times more likely to catch a cold when exposed to the virus than those sleeping 7 hours or more. Chronic sleep deprivation also reduces T-cell effectiveness, the primary cellular defense against viral infection and cancer.
      </p>

      <p>
        <strong>Weight gain and metabolic disruption:</strong> Sleep regulates ghrelin (hunger hormone) and leptin (satiety hormone). Short sleep raises ghrelin and lowers leptin, making you hungrier the next day and less able to feel full. Sleep-deprived people consume an average of 385 extra calories per day. Over a year, that is a meaningful contributor to weight gain. Social media compounds this by promoting aspirational body image content that creates psychological pressure while simultaneously disrupting the sleep that helps regulate the body.
      </p>

      <p>
        <strong>Cognitive function:</strong> The prefrontal cortex — responsible for decision-making, impulse control, and emotional regulation — is acutely sensitive to sleep loss. After 17–19 hours awake, your cognitive performance drops to the equivalent of a blood alcohol level of 0.05%. After 24 hours, it reaches 0.10%, which is legally drunk in most jurisdictions. Chronic mild sleep deprivation from phone use at night compounds this every single day.
      </p>

      <p>
        <strong>Cardiovascular risk:</strong> A large European study tracking over 3 million adults found that people sleeping under 6 hours per night had a 20% higher risk of heart attack, and a 15% higher risk of stroke. Sleep is when blood pressure drops and the cardiovascular system repairs itself. Cutting that window short with late-night scrolling adds cumulative wear to your heart and arteries.
      </p>

      <AlertBox type="warning" title="One hour of lost sleep has the same cognitive impact as a full night without sleep — accumulated over a week">
        Missing just 1 hour of sleep per night for a week has the same cognitive effect as missing an entire night of sleep. Your reaction times, decision-making quality, and emotional regulation all drop to the same degraded level — but you feel less impaired than you actually are, which makes it more dangerous.
      </AlertBox>

      <SectionHeader number={4} title="The Number That Should Stop You Scrolling Tonight" />

      <QuickFact>
        People who use their phones for more than 2 hours in bed take an average of 27 minutes longer to fall asleep than those who do not use phones in bed at all. Over a year, that is over 164 lost hours — equivalent to almost 7 full nights of sleep, gone to scrolling.
      </QuickFact>

      <SectionHeader number={5} title="The Data on Social Media and Sleep Quality" />

      <StatGrid stats={[
        { value: '50%', label: 'reduction in melatonin from just 2 hours of screen exposure before bed', color: 'red' },
        { value: '+27 min', label: 'extra time to fall asleep for heavy phone-in-bed users', color: 'amber' },
        { value: '58%', label: 'report worse sleep quality after starting heavy social media use', color: 'purple' },
        { value: '14%', label: 'increase in insomnia diagnosis rates since 2015', color: 'blue' },
      ]} />

      <SectionHeader number={6} title="The Types of Content That Hurt Your Sleep the Most" />

      <p>
        Not all social media content disrupts sleep equally. Some content types are significantly more disruptive because of the emotional arousal they produce. Understanding the difference helps you make intentional choices about what you consume and when.
      </p>

      <CompareTable
        leftLabel="High sleep disruption"
        rightLabel="Lower sleep disruption"
        rows={[
          { label: 'News and politics', left: 'Breaking news, political conflict, disaster coverage — maximum cortisol activation', right: 'Light entertainment, recipes, craft tutorials — low arousal' },
          { label: 'Social comparison content', left: 'Fitness transformations, luxury lifestyles, relationship milestones — triggers envy and inadequacy', right: 'Educational content, how-tos — neutral emotional tone' },
          { label: 'Conflict and drama', left: 'Twitter/X arguments, controversial comment threads, call-outs — strong stress response', right: 'Calm creator content, ASMR, ambient visuals — promotes relaxation' },
          { label: 'Outrage and moral content', left: 'Injustice clips, viral complaints, "can you believe this" posts — moral outrage is one of the most arousing emotions', right: 'Nature content, animals, slow travel — activates parasympathetic system' },
          { label: 'Notifications', left: 'Replies, likes, DMs while you scroll — each notification is a dopamine trigger interrupting any wind-down', right: 'No notifications — passive consumption without social pressure' },
        ]}
      />

      <SectionHeader number={7} title="How to Actually Fix It: 7 Steps That Work" />

      <p>
        Willpower alone is not a reliable fix. The phone is engineered to beat willpower. These steps work because they change the environment and remove the friction of the good choice — they do not rely on you being stronger than a billion-dollar attention machine at 11 PM.
      </p>

      <VerticalSteps steps={[
        {
          title: 'Move your phone charger outside the bedroom entirely',
          description: 'This is the single highest-impact change you can make. If your phone charges in another room, you cannot reach for it in bed. Buy a cheap alarm clock for $10 so you do not need the phone as an alarm. The physical barrier is more reliable than any app timer or self-imposed rule.',
        },
        {
          title: 'Create a non-screen wind-down habit for the last 30 minutes',
          description: 'Your brain needs a transition signal — something that tells it the day is ending. Options that work: reading a physical book (even 10 pages), writing in a journal, light stretching, a warm shower, or a brief meditation. The activity matters less than its consistency — your brain will start associating the habit with sleep onset over time.',
        },
        {
          title: 'Set hard app timers on your highest-use social apps',
          description: 'Use your phone\'s built-in Screen Time (iOS) or Digital Wellbeing (Android) to set daily limits on Instagram, TikTok, YouTube, and Twitter/X. Set them 2 hours before your target bedtime. The timer prompt creates friction and a reminder that interrupts the mindless scroll — even if you override it, you are now making a conscious choice rather than a passive one.',
        },
        {
          title: 'Enable grayscale mode at 9 PM',
          description: 'Color is part of what makes social media visually stimulating — the vibrant thumbnails, the red notification badge, the green "online" dots. Switching your phone to grayscale removes the visual reward signal and makes the screen dramatically less compelling. Both iOS and Android support scheduled grayscale. Most users report it halves their evening screen time within a week.',
        },
        {
          title: 'Use Night Shift or a blue light filter from sunset',
          description: 'Enable Night Shift (iOS) or Night Light (Android) to automatically shift your screen color toward warm amber tones after sunset. This does not eliminate the cognitive stimulation from content, but it reduces the melatonin-suppression effect of the screen itself. Combine it with the other steps — do not use it as a substitute.',
        },
        {
          title: 'Track your usage to understand your patterns',
          description: 'Most people significantly underestimate how much time they spend on their phones at night. Use your phone\'s built-in usage reports or a tool like the Social Media Time Analyzer to see exactly how much time you are spending, which apps are consuming it, and at what time of night. Awareness is the prerequisite for change — you cannot fix what you cannot see.',
        },
        {
          title: 'Set a consistent sleep and wake time — even on weekends',
          description: 'Your circadian rhythm is a biological clock that runs on consistency. Irregular sleep times (late on Friday, early on Monday) create "social jet lag" that compounds the sleep disruption from phone use. Pick a bedtime and wake time and protect them for at least two weeks — the consistency alone improves sleep quality even before you change your phone habits.',
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Does using Night Shift mode fix the sleep disruption from phone use?',
          answer: 'Night Shift (iOS) and Night Light (Android) shift screen color toward warmer tones, which reduces some of the melatonin-suppression effect from blue light. However, the cognitive stimulation from scrolling content — the cortisol spikes from emotional content and the dopamine loop from variable rewards — is not affected by screen color. Night Shift reduces one of the three sleep-disruption mechanisms; it does not solve the problem on its own. Think of it as harm reduction, not a cure.',
        },
        {
          question: 'How long does it take to see improved sleep after stopping phone use before bed?',
          answer: 'Most people notice a meaningful difference within 3–7 days of removing their phone from the bedroom. The biggest gains come from the first 2 weeks. Melatonin production recovers quickly once the blue light stimulus is removed. The psychological shift — no longer lying awake with racing thoughts from the evening\'s scroll — takes a bit longer, usually 1–2 weeks as the wind-down habit replaces the scroll habit.',
        },
        {
          question: 'Is watching TV before bed just as bad as scrolling social media?',
          answer: 'Television has some of the same blue light issues, but in general it is less disruptive than phone-based social media for two reasons: passive consumption (no variable reward loop) and physical distance (you sit further from the screen). The most disruptive elements of phone use are the proximity of the screen to your face, the interactive nature of scrolling, and the emotional stimulation from personalized algorithmic content. That said, watching disturbing news or high-tension content on TV before bed still raises cortisol and hurts sleep quality.',
        },
        {
          question: 'Why do I sleep badly even on nights when I don\'t use my phone before bed?',
          answer: 'Chronic sleep deprivation creates a "sleep debt" that does not disappear in a single good night. If you have been sleep-deprived for months, even removing the phone will not immediately produce deep, restorative sleep. Your sleep architecture — the cycling through REM and non-REM stages — needs time to recalibrate. You may also have developed anxiety about sleep itself (called "sleep effort" or "hyperarousal"), where the stress of trying to sleep keeps you awake. Give consistent good habits 2–4 weeks before evaluating their impact.',
        },
        {
          question: 'My phone is my alarm clock. Is there a way to keep it in the bedroom without scrolling?',
          answer: 'This is the most common rationalization for keeping a phone in the bedroom, and the easiest to solve. A basic alarm clock costs between $8 and $20 and is a one-time purchase. It makes no noise when you should be sleeping, emits no blue light, has no feed, and cannot notify you of anything. The "phone as alarm clock" justification is worth eliminating entirely because it is the single biggest enabler of in-bed phone use.',
        },
        {
          question: 'Does social media use during the day affect sleep, or only at night?',
          answer: 'Both, but for different reasons. Daytime social media use affects sleep through its cumulative impact on stress levels and cortisol baseline — a day spent reading stressful content raises your overall alertness level, making it harder to wind down at night even without evening phone use. Evening and night use adds the three direct mechanisms: blue light suppression, cortisol spikes, and the dopamine loop. Reducing daytime use improves sleep quality; eliminating evening use is more immediately effective.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
