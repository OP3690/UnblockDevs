'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, ErrorFix, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact, TimelineViz, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function HowAIWorksClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>How AI Works: A Simple Explanation for Beginners (2026)</h1>
      <p className="lead">
        AI is on your phone, in your search engine, in your car, and in your doctor's office — but
        most explanations of how it works are either too technical or too vague. This guide explains
        artificial intelligence in plain English, from the very basics up to neural networks and
        large language models, with real examples you encounter every day.
      </p>

      <StatGrid stats={[
        { value: '1956', label: 'Year AI was formally named as a field', color: 'blue' },
        { value: '175B', label: 'Parameters in GPT-3 (2020)', color: 'purple' },
        { value: '3 types', label: 'Main categories of AI explained here', color: 'green' },
        { value: 'Patterns', label: 'The core of what AI learns', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Is Artificial Intelligence?" />

      <p>
        <strong>Artificial Intelligence (AI)</strong> is software that can perform tasks that normally
        require human intelligence — understanding language, recognising images, making decisions, and
        generating text or art.
      </p>

      <QuickFact>AI is not a single technology. It's a broad family of techniques that all share one goal: making computers learn from data rather than following hand-written rules.</QuickFact>

      <KeyPointsGrid columns={3} items={[
        {
          title: 'Traditional programming',
          description: 'Human writes rules: IF temperature > 30 THEN output "hot". Works well when rules are clear and don\'t change.',
        },
        {
          title: 'Machine learning',
          description: 'Computer finds the rules itself by studying examples. Show it thousands of photos labelled "cat" or "dog" — it learns to tell them apart.',
        },
        {
          title: 'Deep learning',
          description: 'A type of machine learning using multi-layer neural networks. Powers image recognition, speech recognition, and modern language models.',
        },
      ]} />

      <SectionHeader number={2} title="Machine Learning vs Deep Learning vs AI" />

      <ArchDiagram
        boxes={[
          { label: 'Artificial Intelligence (broadest)', color: 'blue' },
          { label: 'Machine Learning (AI that learns from data)', color: 'purple' },
          { label: 'Deep Learning (ML with neural networks)', color: 'green' },
          { label: 'LLMs like ChatGPT (deep learning on text)', color: 'amber' },
        ]}
        arrows={['⊃', '⊃', '⊃']}
      />

      <CompareTable
        leftLabel="Machine Learning"
        rightLabel="Deep Learning"
        rows={[
          { label: 'Data needed', left: 'Hundreds to thousands of examples', right: 'Millions to billions of examples' },
          { label: 'Feature engineering', left: 'Human selects relevant features', right: 'Network learns features automatically' },
          { label: 'Interpretability', left: 'More interpretable (decision trees, regressions)', right: 'Less interpretable ("black box")' },
          { label: 'Hardware', left: 'CPU is usually sufficient', right: 'Requires GPUs or TPUs' },
          { label: 'Examples', left: 'Spam filters, credit scoring, recommendation systems', right: 'Image recognition, ChatGPT, voice assistants' },
        ]}
      />

      <SectionHeader number={3} title="How AI Models Are Trained" />

      <VerticalSteps steps={[
        {
          title: 'Collect training data',
          description: 'Thousands or billions of examples. For image recognition: labelled photos. For ChatGPT: most of the public internet plus books.',
        },
        {
          title: 'Choose a model architecture',
          description: 'A neural network is a mathematical structure inspired by the brain — layers of interconnected nodes (neurons) with adjustable weights.',
        },
        {
          title: 'Make predictions and measure error',
          description: 'The model makes a prediction. A "loss function" measures how wrong it was (e.g., it said "cat" but the answer was "dog").',
        },
        {
          title: 'Backpropagation — adjust the weights',
          description: 'Using calculus (gradient descent), the error is propagated backwards through the network and each weight is nudged to reduce the error.',
        },
        {
          title: 'Repeat billions of times',
          description: 'This cycle repeats over all training examples, often for days or weeks on thousands of GPUs, until predictions are accurate.',
        },
        {
          title: 'Fine-tune and align',
          description: 'For user-facing AI, human feedback is used to further tune the model to be helpful, harmless, and honest (RLHF).',
        },
      ]} />

      <SectionHeader number={4} title="Real-World AI You Use Every Day" />

      <KeyPointsGrid columns={2} items={[
        {
          title: 'Spam filter (email)',
          description: 'A trained classifier reads every email and predicts: spam or not spam? Learns from millions of labelled examples and your personal feedback.',
        },
        {
          title: 'Recommendation engines',
          description: 'Netflix, Spotify, TikTok. Collaborative filtering + deep learning models predict what you\'ll like based on your history and similar users.',
        },
        {
          title: 'Voice assistants (Siri, Alexa)',
          description: 'Speech-to-text converts audio to words (deep learning). NLP understands intent. Response generation picks an action.',
        },
        {
          title: 'Image recognition',
          description: 'Convolutional Neural Networks (CNNs) detect features in images — edges, shapes, textures — building up to recognise objects, faces, diseases.',
        },
        {
          title: 'Large Language Models (ChatGPT)',
          description: 'Transformer neural networks trained on enormous text datasets. Predict the most likely next token to generate coherent, helpful text.',
        },
        {
          title: 'Navigation (Google Maps)',
          description: 'Reinforcement learning and traffic prediction models learn optimal routes from millions of past journeys and real-time traffic data.',
        },
      ]} />

      <SectionHeader number={5} title="What Is a Neural Network?" />

      <p>
        A neural network is a mathematical system made of layers of interconnected numbers (weights).
        Each weight represents how strongly one node influences the next.
        Training adjusts these weights until the network predicts correctly.
      </p>

      <CodeBlock language="python" filename="simple-neural-network-concept.py">
{`# Conceptual illustration (not production code)
# A tiny neural network that learns: is this number > 5?

import random

def sigmoid(x):
    return 1 / (1 + 2.71828 ** -x)

# Single neuron with one weight and one bias
weight = random.random()
bias = random.random()

def predict(x):
    return sigmoid(weight * x + bias)

# Training loop (simplified gradient descent)
learning_rate = 0.1
for epoch in range(1000):
    for x, label in [(1, 0), (3, 0), (6, 1), (8, 1), (10, 1)]:
        prediction = predict(x)
        error = prediction - label
        # Update weight and bias to reduce error
        weight -= learning_rate * error * x
        bias -= learning_rate * error

print(f"Prediction for 7: {predict(7):.2f}")  # Should be close to 1.0
print(f"Prediction for 2: {predict(2):.2f}")  # Should be close to 0.0`}
      </CodeBlock>

      <SectionHeader number={6} title="AI Limitations — What AI Cannot Do" />

      <AlertBox type="warning" title="AI is not magic">
        AI systems can fail in ways humans never would. Understanding limitations is as important as
        understanding capabilities.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        {
          title: 'AI cannot truly "understand"',
          description: 'AI finds statistical patterns. It doesn\'t understand meaning the way humans do. ChatGPT generates plausible text — it doesn\'t "know" if it\'s true.',
        },
        {
          title: 'AI can hallucinate',
          description: 'Language models confidently generate plausible-sounding but false information. Always verify AI-generated facts from authoritative sources.',
        },
        {
          title: 'AI reflects training data bias',
          description: 'If training data contains biased human decisions (racist hiring, unequal lending), the model will reproduce those biases.',
        },
        {
          title: 'AI lacks common sense',
          description: 'AI can fail at simple physical reasoning or unusual situations outside its training distribution. A self-driving car can be confused by a shopping cart in the road.',
        },
      ]} />

      <SectionHeader number={7} title="AI Timeline: From Rules to Neural Networks" />

      <TimelineViz events={[
        { year: '1956', title: 'AI coined at Dartmouth', description: 'John McCarthy organises the first AI conference. Rule-based "expert systems" dominate the next decades.', color: 'blue' },
        { year: '1989', title: 'Backpropagation popularised', description: 'LeCun demonstrates neural networks learning to read handwritten digits using backpropagation.', color: 'green' },
        { year: '2012', title: 'Deep learning revolution', description: 'AlexNet wins ImageNet by a huge margin using a deep CNN on GPUs. The modern AI era begins.', color: 'purple' },
        { year: '2017', title: 'Transformers introduced', description: '"Attention Is All You Need" paper introduces the transformer architecture that powers all modern LLMs.', color: 'blue' },
        { year: '2020', title: 'GPT-3 shocks the world', description: '175B parameter language model demonstrates emergent capabilities — writing, coding, reasoning — from scale alone.', color: 'green' },
        { year: '2022', title: 'ChatGPT goes mainstream', description: '1 million users in 5 days. AI becomes a household conversation. Generative AI enters every industry.', color: 'amber' },
      ]} />

      <SectionHeader number={8} title="Frequently Asked Questions" />

      <FAQAccordion items={[
        {
          question: 'What is the simplest definition of AI?',
          answer: 'AI is software that learns from examples rather than following hand-written rules. Instead of a programmer writing "IF cat THEN output cat", a machine learning model looks at millions of cat photos and figures out the patterns itself. The result is a system that can recognise cats it has never seen before.',
        },
        {
          question: 'What is the difference between AI and machine learning?',
          answer: 'AI is the broad field of making computers perform human-like tasks. Machine learning is one approach within AI where computers learn from data. Deep learning is a subset of machine learning using multi-layer neural networks. So: all deep learning is machine learning; all machine learning is AI; but not all AI uses machine learning (some AI uses explicit rules).',
        },
        {
          question: 'How does a neural network learn?',
          answer: 'A neural network starts with random weights (numbers). It makes a prediction, measures how wrong it was (loss), then adjusts each weight slightly to reduce the error — this is called gradient descent. After repeating this process millions or billions of times across all training examples, the weights converge to values that produce accurate predictions on new data.',
        },
        {
          question: 'Can AI think for itself?',
          answer: 'No. AI systems find statistical patterns in training data and generalise those patterns to new inputs. They do not have consciousness, goals, or self-awareness. When a language model produces a long, thoughtful essay, it is generating statistically likely continuations of text — not reasoning in the way humans do. This distinction matters for understanding both AI capabilities and its failures.',
        },
        {
          question: 'Why does AI sometimes give wrong answers?',
          answer: 'AI makes mistakes because: (1) training data contained errors or biases; (2) the question involves knowledge from after the training data cutoff; (3) the model encounters a situation outside its training distribution; (4) language models generate "plausible-sounding" text rather than verified facts — they can hallucinate confidently. Always verify important AI-generated information.',
        },
        {
          question: 'Do I need to learn coding to use AI?',
          answer: 'No. Consumer AI tools (ChatGPT, Midjourney, GitHub Copilot) require no coding. However, learning basic Python opens up much more powerful applications: running open-source models locally, fine-tuning models on your own data, building AI-powered applications, and using AI APIs. Resources like fast.ai and deeplearning.ai offer beginner-friendly courses.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
