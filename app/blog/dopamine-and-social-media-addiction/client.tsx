'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FAQAccordion, CompareTable,
  StatGrid, SectionHeader, QuickFact, VerticalSteps, FlowDiagram,
  ToolCTA,
} from '@/components/blog/BlogVisuals';

export default function DopamineSocialMediaClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Dopamine and Social Media: How Your Brain Gets Hooked on Every Scroll</h1>
      <p className="lead">
        The average person checks their phone 150 times a day. Most of those checks are not responding
        to anything — they are compulsive. Understanding why requires understanding dopamine, variable
        reward schedules, and the fact that social media platforms were deliberately designed to exploit both.
      </p>

      <StatGrid stats={[
        { value: '150x', label: 'average phone checks per day', color: 'blue' },
        { value: '67%', label: 'of people feel anxious without checking social media', color: 'red' },
        { value: '8 sec', label: 'average human attention span today (down from 12 seconds)', color: 'amber' },
        { value: '#1', label: 'variable reward — the most addictive psychological pattern known', color: 'purple' },
      ]} />

      <SectionHeader number={1} title="What Dopamine Actually Is" />
      <p>
        Dopamine is a neurotransmitter — a chemical messenger — produced primarily in the substantia nigra
        and ventral tegmental area of the brain. It gets incorrectly described as the "pleasure chemical,"
        but the science is more precise and more interesting than that.
      </p>
      <p>
        Dopamine is primarily the <strong>anticipation and motivation chemical</strong>. It spikes not
        when you receive a reward, but when you anticipate or pursue one. This is what drives motivated
        behavior — the dopamine hit is the engine that makes you keep moving toward goals. When dopamine
        fires, the brain encodes that: "the behavior I just did is worth repeating."
      </p>
      <p>
        This mechanism evolved to help us pursue food, mates, and safety. The problem is that the same
        circuitry responds to any stimulus the brain categorizes as potentially rewarding — including
        the little red notification badge on your phone.
      </p>
      <p>
        <strong>Why it matters for behavior:</strong> once dopamine circuitry is trained to anticipate
        a reward from a particular action, it becomes very difficult to suppress. The cue alone — seeing
        your phone, hearing a notification sound, experiencing a moment of boredom — triggers dopamine
        release and the accompanying urge to act. This is the neurological foundation of habit and,
        at the extreme, addiction.
      </p>

      <SectionHeader number={2} title="The Variable Reward Schedule — Why Unpredictability Is More Addictive" />
      <p>
        In the 1950s, behavioral psychologist B.F. Skinner ran a series of experiments with pigeons.
        He placed them in boxes with a lever. In one condition, pressing the lever always dispensed food.
        In another, the lever dispensed food on a random, unpredictable schedule — sometimes after one press,
        sometimes after ten, sometimes not for a long time.
      </p>
      <p>
        The result was striking: the pigeons with the unpredictable schedule pressed the lever compulsively —
        far more than the pigeons who received a guaranteed reward. When the reward was removed entirely,
        the random-schedule pigeons took much longer to stop pressing than the predictable-schedule ones.
        They kept trying even when nothing was coming.
      </p>
      <p>
        This is the <strong>variable ratio reinforcement schedule</strong>, and it is the most powerful
        pattern for producing compulsive behavior ever identified in behavioral science. It is also
        exactly how slot machines work — and exactly how your social media feed works.
      </p>
      <p>
        When you pull down to refresh your Instagram feed, sometimes there are new posts from people
        you love. Sometimes there is nothing new. Sometimes there is a video that makes you laugh out
        loud. The unpredictability is not a bug — it is the mechanism. Your brain cannot predict whether
        the next check will be rewarding, so it keeps checking to find out.
      </p>

      <SectionHeader number={3} title="How Platforms Deliberately Engineer the Dopamine Hit" />
      <p>
        This is not speculation or conspiracy thinking. The design decisions that make social media
        neurologically compelling are documented, intentional, and have been admitted by the people who built them.
      </p>
      <p>
        Sean Parker, one of Facebook's founding presidents, said in a 2017 interview: "We exploit a
        vulnerability in human psychology." He described how the platform was deliberately built to
        consume as much of your time and conscious attention as possible — and that the architects
        knew exactly what they were doing.
      </p>
      <p>
        The specific mechanisms platforms use:
      </p>
      <p>
        <strong>Notifications</strong> are engineered interrupts. The red badge, the sound, the vibration —
        each is a conditioned cue that triggers dopamine anticipation before you even open the app.
        Platforms deliberately delay notifications in some cases to batch them, creating a larger spike
        when they do arrive.
      </p>
      <p>
        <strong>Likes and comments</strong> are the variable reward itself. You post something and then
        wait — sometimes getting enthusiastic response, sometimes silence. The uncertainty between posting
        and receiving feedback is a deliberate dopamine trigger.
      </p>
      <p>
        <strong>Infinite scroll</strong> removes the natural stopping cue that pagination provides.
        A physical magazine has a last page. A bottomless feed has no equivalent signal to stop —
        it was designed that way. The end of the content is always just one more scroll away.
      </p>
      <p>
        <strong>Autoplay</strong> on video platforms eliminates the active decision to continue.
        Instead of choosing to watch another video, you have to actively choose to stop — a much harder
        cognitive task that most people lose, most of the time.
      </p>

      <QuickFact color="purple" label="From Instagram's own co-founder">
        Instagram's co-founder Kevin Systrom admitted the Like button was designed to create emotional
        investment — not connection. The metric itself became the product, training users to optimize
        their behavior for approval signals.
      </QuickFact>

      <FlowDiagram
        title="The social media dopamine loop"
        steps={[
          { label: 'Trigger', desc: 'Notification arrives, boredom hits, or phone is simply nearby', color: 'amber' },
          { label: 'Action', desc: 'Open the app and begin scrolling or checking', color: 'blue' },
          { label: 'Variable Reward', desc: 'Sometimes great content or social validation — sometimes nothing. The unpredictability is the mechanism.', color: 'purple' },
          { label: 'Craving', desc: 'The dopamine spike from anticipation creates a desire to check again soon', color: 'red' },
          { label: 'Back to Trigger', desc: 'The next moment of boredom, transition, or notification restarts the loop', color: 'amber' },
        ]}
      />

      <SectionHeader number={4} title="Signs Your Dopamine System Is Disrupted" />
      <p>
        The dopamine system is adaptive — it recalibrates based on the stimulation it receives.
        When a person chronically floods their dopamine circuitry with high-frequency micro-rewards
        from social media, the system compensates by becoming less sensitive to ordinary rewards.
        This is called <strong>dopamine tolerance</strong>, and its signs are recognizable:
      </p>
      <p>
        <strong>Checking your phone first thing in the morning</strong> before getting out of bed is
        one of the clearest behavioral markers. The dopamine system has been conditioned overnight
        (through sleep) and immediately drives toward its highest-frequency reward source upon waking.
      </p>
      <p>
        <strong>Inability to enjoy offline activities</strong> without distraction — reading feels slow,
        conversations feel flat, meals feel incomplete without the phone present. This is dopamine
        tolerance: the baseline stimulation of real life no longer feels sufficient because it has been
        calibrated against the constant micro-stimulation of digital feeds.
      </p>
      <p>
        <strong>Constant restlessness during any idle moment</strong> — waiting for coffee, standing in
        a queue, pausing between tasks — immediately triggers the reach for the phone. The dopamine
        system has been trained to treat any unoccupied moment as an opportunity for reward-seeking.
      </p>
      <p>
        <strong>Reduced enjoyment of previously enjoyed activities</strong> — hobbies, sports, socializing —
        can be a sign of dopamine system downregulation. When the baseline is social media's reward rate,
        slower-burning real-world pleasures lose their pull.
      </p>

      <AlertBox type="warning" title="Dopamine depletion doesn't just affect you online">
        Dopamine depletion doesn't just make you feel bad online — it makes real-world activities feel
        boring by comparison. The more you train your brain on the rapid micro-rewards of social media,
        the more the ordinary richness of offline life feels insufficient. This is not a character flaw —
        it is a predictable neurological outcome of the reward schedule you have been exposed to.
      </AlertBox>

      <ToolCTA
        href="/social-media-time-analyzer"
        title="The first step is knowing how deep in you are"
        desc="Before you can break the cycle, you need accurate data. Upload your Instagram or TikTok data export to see your actual daily and weekly usage patterns — processed entirely in your browser, nothing uploaded to any server."
        buttonText="See my actual usage data →"
        color="blue"
      />

      <SectionHeader number={5} title="The Slot Machine in Your Pocket" />
      <p>
        The comparison to gambling is not rhetorical — it is structural. The same design principles
        that make slot machines the most profitable form of gambling map directly onto social media mechanics.
        Regulators treat slot machines as a public health concern. Social media uses the same mechanisms
        and reaches billions of people.
      </p>
      <CompareTable
        leftLabel="Slot Machine Mechanic"
        rightLabel="Social Media Equivalent"
        rows={[
          { label: 'Variable reward', left: 'Unpredictable payout — sometimes win, usually nothing', right: 'Unpredictable feed — sometimes great content, usually mundane' },
          { label: 'Near-miss effect', left: 'Two matching symbols creates the feeling of almost winning', right: 'Notification dot or "X people liked your post" creates anticipation of more' },
          { label: 'No natural stopping cue', left: 'No clock visible in casinos, no natural end to play', right: 'Infinite scroll, autoplay — no last page, no end signal' },
          { label: 'Social proof', left: 'Other players visibly winning creates the illusion of common success', right: 'Others\' success posts create illusion that everyone is winning at life' },
          { label: 'Sunk cost trap', left: 'Already spent money makes it harder to walk away', right: 'Already invested time/identity makes deleting the account feel like loss' },
          { label: 'Designed environment', left: 'Casino layout engineered by behavioral scientists', right: 'UX designed by teams whose sole metric is time-on-app' },
        ]}
      />

      <SectionHeader number={6} title="How to Reset Your Dopamine System" />
      <p>
        The dopamine system is plastic — it responds to changed inputs. The same adaptability that
        allowed social media to recalibrate your reward sensitivity can work in reverse. The catch
        is that recalibration takes time and involves a temporary period of discomfort as the system
        adjusts to lower stimulation levels. Here is a practical sequence:
      </p>
      <VerticalSteps steps={[
        {
          title: 'Dopamine fast — start with 24–72 hours',
          desc: 'Remove social media apps from your phone (not delete — just remove from the home screen or use Screen Time/Digital Wellbeing to block them) for 24–72 hours. The first hours feel restless and uncomfortable — this is the dopamine system recalibrating. By hour 24, most people report a notable reduction in the urge to check. This is your baseline resetting.',
        },
        {
          title: 'Notification audit — turn off everything non-essential',
          desc: 'Go into every social media app\'s notification settings and disable all non-essential notifications. Keep only direct messages from real people if you need them. Remove badges (the red number on app icons) entirely — badge visibility is a persistent trigger even when you are not intending to check. Each notification you remove eliminates one conditioned trigger.',
        },
        {
          title: 'App timers — use the platform\'s own tools against it',
          desc: 'Set daily limits (Instagram\'s built-in "Daily Limit," iOS Screen Time, Android Digital Wellbeing) at a level slightly challenging but achievable — not zero, but half your current usage. The goal is intentional use within a deliberate boundary. Each time you hit the limit, you are required to make a conscious choice to extend — which breaks the automatic nature of the behavior.',
        },
        {
          title: 'Replace with high-value, slow-reward activities',
          desc: 'The dopamine system needs to be retrained toward slower, deeper rewards — not deprived entirely. Physical exercise produces dopamine through effort and completion. Reading long-form content builds attention span. In-person social connection produces oxytocin. Creative work produces satisfaction through mastery. Pick one activity and invest in it consistently for two weeks. The key is repetition — the brain needs to learn that these activities reliably deliver value.',
        },
      ]} />

      <FAQAccordion items={[
        {
          question: 'Is social media addiction a real clinical diagnosis?',
          answer: 'Not yet in DSM-5 or ICD-11, but "problematic social media use" is actively studied and meets most criteria for behavioral addiction — including tolerance (needing more to get the same effect), withdrawal symptoms (anxiety when unable to use), continued use despite negative consequences, and failed attempts to cut back. The WHO classifies gaming disorder; the same framework is being applied to social media. Many clinicians treat it as a behavioral addiction even without a formal diagnostic code.',
        },
        {
          question: 'Why does checking feel so urgent even when I know nothing important happened?',
          answer: 'Because the urge is driven by dopamine anticipation, not by rational assessment of likelihood. Your brain\'s dopamine system does not evaluate "will there be something important?" — it responds to the conditioned cue (phone nearby, moment of idleness, notification sound) with a spike of anticipation that creates a felt urgency. The urgency is a chemical signal, not a logical conclusion. This is why willpower alone is insufficient — you are fighting a neurological reflex, not just a preference.',
        },
        {
          question: 'How long does a dopamine reset take?',
          answer: 'Most people notice meaningful change within 3–7 days of significantly reduced use — reduced restlessness, improved ability to sit with quiet, better sleep. A more complete recalibration, where offline activities feel fully satisfying again, typically takes 3–6 weeks of deliberate lower-stimulation behavior. This is consistent with what research shows about dopamine receptor upregulation timelines in other behavioral changes.',
        },
        {
          question: 'Is deleting apps permanently necessary?',
          answer: 'No — and for most people it is not sustainable. Research on digital minimalism suggests that deliberate, time-bounded use with notification removal produces similar outcomes to deletion, with better long-term adherence. Total deletion works well short-term but often leads to all-or-nothing cycling. The goal is a new relationship with the tool, not complete avoidance — unless your honest assessment is that you cannot moderate your use, in which case deletion is the right call.',
        },
        {
          question: 'Do some people not get hooked? Are some people just more resistant?',
          answer: 'Yes — there is meaningful individual variation. People with higher baseline dopamine tone, lower novelty-seeking tendencies, and more established offline reward sources show less susceptibility to addictive social media patterns. Age at first exposure also matters significantly: people who began heavy use as adults have more developed prefrontal cortex regulation than those who began as teens. But even resistant individuals show some degree of conditioned checking behavior after sustained exposure — the variable reward mechanism is powerful enough to affect most people.',
        },
        {
          question: 'Does watching TikTok for "educational content" count as problematic use?',
          answer: 'The content\'s educational value does not change the neurological mechanism. If you are consuming it via infinite scroll, algorithm-curated unpredictable delivery, and losing track of time, the dopamine loop is operating regardless of whether individual videos are informative. The test is not "is this content useful?" but "am I using this intentionally within set limits, or is the platform directing my attention?" Educational content can absolutely be consumed compulsively — the two are not mutually exclusive.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
