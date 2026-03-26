'use client';

import Link from 'next/link';
import { Database, Server, Zap, Network, ArrowRight, Shield, Clock } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';
import NewsletterSignup from '@/components/NewsletterSignup';
import FeedbackForm from '@/components/FeedbackForm';
import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, VerticalSteps, CompareTable, ArchDiagram,
  StatGrid, KeyPointsGrid, CodeBlock, TimelineViz, QuickFact,
  SectionHeader, FAQAccordion,
} from '@/components/blog/BlogVisuals';

export default function ApacheKafkaCompleteGuideClient() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
          <Link href="/blog" className="mb-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-zinc-400 transition-colors hover:text-zinc-900">
            ← Blog
          </Link>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-600 text-white">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-snug text-zinc-900 sm:text-3xl">Apache Kafka: Complete Guide</h1>
              <p className="mt-1.5 text-[14px] text-zinc-500">Architecture, core concepts, real-world use cases & code examples · 14 min read</p>
            </div>
          </div>
        </div>
      </header>

      <BlogSocialShare title="Apache Kafka: Complete Guide" description="Architecture, core concepts, real-world use cases & code examples" variant="floating" />

      <BlogLayoutWithSidebarAds>
        <FAQSchema faqs={[
          { question: 'What is Apache Kafka?', answer: 'Apache Kafka is an open-source distributed event streaming platform designed to handle high-throughput, fault-tolerant, real-time data feeds. Originally built at LinkedIn, it acts as a distributed commit log that can process millions of messages per second, making it the de facto standard for event-driven architectures and real-time data pipelines.' },
          { question: 'How does Apache Kafka work?', answer: 'Kafka works by organizing messages into topics. Topics are divided into partitions for parallelism and scalability. Producers write messages to topics; consumers read from them. Kafka brokers store messages on disk with configurable retention. Messages within a partition are ordered and assigned offsets. Consumer groups allow horizontal scaling of consumption.' },
          { question: 'What is the difference between Kafka topics and partitions?', answer: 'A topic is a named category for messages (like a database table). A partition is a physical subdivision of a topic — each partition is an ordered, immutable log stored on disk. Partitions enable parallelism: multiple consumers can read from different partitions simultaneously. The number of partitions controls the maximum parallelism of your consumers.' },
          { question: 'When should I use Kafka instead of RabbitMQ?', answer: 'Use Kafka when you need: message replay/retention (consumers can re-read past messages), very high throughput (1M+ msg/sec), event sourcing, multiple independent consumer groups, or stream processing. Use RabbitMQ when you need: complex routing logic, per-message acknowledgment, lower latency for small-scale messaging, or traditional task queues.' },
          { question: 'What is a Kafka consumer group?', answer: 'A consumer group is a set of consumers that jointly consume a topic. Each partition is assigned to exactly one consumer in the group, enabling parallel processing. If you have 6 partitions and 3 consumers in a group, each consumer handles 2 partitions. Multiple independent consumer groups can each consume the entire topic at their own pace.' },
          { question: 'Is Kafka a message queue or a pub/sub system?', answer: 'Kafka is both — it supports pub/sub via consumer groups (multiple groups each get all messages) and queue semantics (within a consumer group, each message goes to one consumer). This hybrid model, combined with message retention and replay, makes Kafka more versatile than traditional message queues like RabbitMQ or SQS.' },
          { question: 'How does Kafka guarantee message ordering?', answer: 'Kafka guarantees ordering within a partition. Messages with the same key are always routed to the same partition (via consistent hashing), so per-key ordering is guaranteed. Across partitions, ordering is not guaranteed. For global ordering, use a single partition — but this limits throughput to a single consumer.' },
        ]} />

        <article>
          <SectionHeader title="What Is Apache Kafka?" icon={<Database className="h-5 w-5" />} color="red" subtitle="The distributed event streaming platform behind the world's most data-intensive systems" />

          <p className="text-[15px] leading-relaxed text-zinc-700">
            Apache Kafka is a <strong>distributed event streaming platform</strong> — think of it as an ultra-fast, fault-tolerant, infinitely scalable message bus that sits at the centre of your data infrastructure. Originally built by engineers at LinkedIn to handle their activity feeds and operational metrics, Kafka was open-sourced in 2011 and donated to the Apache Software Foundation in 2012.
          </p>
          <p className="mt-3 text-[15px] leading-relaxed text-zinc-700">
            At its simplest: <strong>producers</strong> write events to Kafka, <strong>consumers</strong> read those events. But unlike a traditional database or message queue, Kafka stores every event durably on disk for a configurable retention period — so any consumer can replay history, and new consumers can start from the beginning.
          </p>

          <StatGrid title="Kafka by the numbers" stats={[
            { value: '1M+', label: 'msg/sec per broker', color: 'red' },
            { value: '80%', label: 'of Fortune 500', desc: 'use Kafka in production', color: 'blue' },
            { value: '7T', label: 'msg/day at LinkedIn', color: 'emerald' },
            { value: '<10ms', label: 'end-to-end latency', color: 'violet' },
          ]} />

          <QuickFact color="rose">
            Kafka can retain messages for days, weeks, or forever. This single feature separates it from every traditional message queue — your analytics team can replay last month's events any time.
          </QuickFact>

          <SectionHeader n={1} title="The Problem Kafka Solves" color="amber" subtitle="Why existing systems weren't enough" />

          <p className="text-[15px] leading-relaxed text-zinc-700">
            Before Kafka, companies like LinkedIn were drowning in data pipeline complexity. Imagine you have 10 source systems (web servers, mobile apps, databases) and 10 destination systems (Hadoop, search, recommendations, analytics). That's potentially 100 point-to-point connections to build and maintain.
          </p>

          <CompareTable
            title="Before Kafka vs After Kafka"
            left={{ title: '❌ Before Kafka', color: 'rose', items: ['100 point-to-point connections', 'Each team owns their own pipeline', 'No replay if consumer goes down', 'Tight coupling between systems', 'Data duplicated everywhere', 'No standard for data flow'] }}
            right={{ title: '✅ With Kafka', color: 'emerald', items: ['One central event bus', 'Producers/consumers are decoupled', 'Replay from any point in time', 'Loose coupling — add consumers freely', 'Single source of truth', 'Standard streaming API'] }}
          />

          <SectionHeader n={2} title="Core Concepts" color="blue" subtitle="Topics, partitions, brokers, producers, consumers — explained clearly" />

          <KeyPointsGrid title="The 6 core Kafka concepts" cols={3} points={[
            { title: 'Broker', desc: 'A Kafka server. Stores partitions, handles reads/writes. A cluster typically has 3–12 brokers for redundancy.', color: 'blue', icon: <Server className="h-4 w-4" /> },
            { title: 'Topic', desc: 'A named stream of records — like a database table. Producers write to topics, consumers read from them.', color: 'emerald', icon: <Database className="h-4 w-4" /> },
            { title: 'Partition', desc: 'Physical subdivision of a topic. Each partition is an ordered, append-only log. More partitions = more parallelism.', color: 'violet', icon: <Network className="h-4 w-4" /> },
            { title: 'Producer', desc: 'An application that publishes (writes) messages to one or more topics. Controls which partition via keys.', color: 'amber', icon: <ArrowRight className="h-4 w-4" /> },
            { title: 'Consumer Group', desc: 'A set of consumers jointly consuming a topic. Each partition goes to exactly one consumer in the group.', color: 'sky', icon: <Zap className="h-4 w-4" /> },
            { title: 'Offset', desc: 'A unique sequential ID for each message within a partition. Consumers track their position via offsets.', color: 'orange', icon: <Clock className="h-4 w-4" /> },
          ]} />

          <SectionHeader n={3} title="How Messages Flow Through Kafka" color="violet" subtitle="From producer to consumer, step by step" />

          <FlowDiagram title="Kafka message lifecycle" steps={[
            { label: 'Producer', desc: 'Writes event', color: 'blue' },
            { label: 'Partition', desc: 'Assigned by key hash', color: 'violet' },
            { label: 'Broker', desc: 'Persists to disk', color: 'emerald' },
            { label: 'Replication', desc: 'Copies to replicas', color: 'amber' },
            { label: 'Consumer', desc: 'Reads at own pace', color: 'sky' },
            { label: 'Offset commit', desc: 'Tracks position', color: 'zinc' },
          ]} />

          <p className="text-[15px] leading-relaxed text-zinc-700">
            When a producer sends a message, Kafka determines which partition to write to. If a <strong>key</strong> is specified, all messages with the same key go to the same partition (enabling per-key ordering). The broker appends the message to the partition's log file and replicates it to follower brokers. Consumers poll for new messages and commit their offsets to track progress.
          </p>

          <ArchDiagram
            title="Kafka cluster architecture"
            subtitle="3 brokers, 2 topics, 2 consumer groups"
            nodes={[
              { id: 'p1', label: 'Producer App', sublabel: 'user-events', color: 'blue' },
              { id: 'p2', label: 'Producer App', sublabel: 'payments', color: 'blue' },
              { id: 'kafka', label: 'Kafka Cluster', sublabel: '3 brokers', color: 'rose' },
              { id: 'cg1', label: 'Analytics CG', sublabel: 'reads all events', color: 'emerald' },
              { id: 'cg2', label: 'Search CG', sublabel: 'reads all events', color: 'violet' },
            ]}
          />

          <SectionHeader n={4} title="Kafka vs Alternatives" color="sky" subtitle="When to use Kafka, RabbitMQ, or Redis Pub/Sub" />

          <CompareTable
            title="Kafka vs RabbitMQ vs Redis Pub/Sub"
            left={{ title: 'Apache Kafka', color: 'rose', items: ['Persistent storage (days/weeks)', '1M+ msg/sec throughput', 'Message replay support', 'Consumer groups', 'Best for event streaming', 'Complex setup, high ops cost'] }}
            right={{ title: 'RabbitMQ', color: 'blue', items: ['In-memory (optional disk)', '~50K–100K msg/sec', 'No replay (deleted after ACK)', 'Competing consumers', 'Best for task queues', 'Simple to set up and operate'] }}
          />

          <AlertBox type="tip" title="Rule of thumb">
            Use Kafka when you need <strong>retention, replay, or multiple independent consumers</strong> reading the same stream. Use RabbitMQ or SQS for simpler task queue patterns where messages are consumed once and discarded.
          </AlertBox>

          <SectionHeader n={5} title="Kafka History & Timeline" color="amber" />

          <TimelineViz items={[
            { year: '2011', title: 'LinkedIn open-sources Kafka', desc: 'Built by Jay Kreps, Neha Narkhede, and Jun Rao to handle LinkedIn\'s activity feed and metrics pipeline.', color: 'blue' },
            { year: '2012', title: 'Apache incubation', desc: 'Kafka becomes a top-level Apache project, accelerating community adoption.', color: 'emerald' },
            { year: '2014', title: 'Confluent founded', desc: 'Original Kafka creators leave LinkedIn to build the commercial Kafka ecosystem (Schema Registry, Kafka Connect, KSQL).', color: 'violet' },
            { year: '2017', title: 'Kafka Streams & Connect mature', desc: 'Stream processing and connector ecosystem explode. Kafka becomes the backbone of real-time data architectures.', color: 'amber' },
            { year: '2019', title: 'KRaft mode development begins', desc: 'Effort to remove ZooKeeper dependency — making Kafka simpler to operate.', color: 'rose' },
            { year: '2022+', title: 'Cloud-native Kafka dominates', desc: 'Confluent Cloud, AWS MSK, Azure Event Hubs (Kafka API) make managed Kafka mainstream.', color: 'sky' },
          ]} />

          <SectionHeader n={6} title="Getting Started: Producer & Consumer Code" color="emerald" />

          <p className="text-[15px] leading-relaxed text-zinc-700 mb-4">
            Using the <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[13px] font-mono">kafkajs</code> library for Node.js:
          </p>

          <CodeBlock lang="javascript" title="Producer — publish events to a topic">
{`const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

async function publishEvent(userId, action) {
  await producer.connect();

  await producer.send({
    topic: 'user-events',
    messages: [
      {
        key: String(userId),       // ensures same-user events go to same partition
        value: JSON.stringify({
          userId,
          action,
          timestamp: Date.now(),
        }),
      },
    ],
  });

  console.log('Event published');
  await producer.disconnect();
}

publishEvent(42, 'page_view');`}
          </CodeBlock>

          <CodeBlock lang="javascript" title="Consumer — read events from a topic">
{`const { Kafka } = require('kafkajs');

const kafka = new Kafka({ clientId: 'my-app', brokers: ['localhost:9092'] });
const consumer = kafka.consumer({ groupId: 'analytics-group' });

async function startConsuming() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'user-events', fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const event = JSON.parse(message.value.toString());
      console.log({
        partition,
        offset: message.offset,
        event,
      });
      // Process event: update analytics, trigger notifications, etc.
    },
  });
}

startConsuming().catch(console.error);`}
          </CodeBlock>

          <AlertBox type="info" title="Run Kafka locally with Docker">
            {`docker run -d --name kafka -p 9092:9092 apache/kafka:latest`}
            {` — spins up a single-broker Kafka in seconds for local development.`}
          </AlertBox>

          <SectionHeader n={7} title="Real-World Use Cases" color="violet" />

          <KeyPointsGrid cols={2} points={[
            { title: 'Real-time analytics', desc: 'Stream user clickstream data into analytics pipelines. Netflix uses Kafka to process 500B+ events/day for their recommendation engine.', color: 'violet' },
            { title: 'Event sourcing', desc: 'Store every state change as an immutable event. Rebuild any system state by replaying the event log. Used in banking and fintech.', color: 'blue' },
            { title: 'Microservice communication', desc: 'Decouple services via async events instead of synchronous REST calls. Services publish events; others react. No direct dependencies.', color: 'emerald' },
            { title: 'Log aggregation', desc: 'Centralise logs from hundreds of services into Kafka, then ship to Elasticsearch, S3, or Splunk. Uber aggregates logs from 4,000+ microservices.', color: 'amber' },
            { title: 'CDC (Change Data Capture)', desc: 'Capture every database row change using Kafka Connect + Debezium. Sync databases, build read models, invalidate caches in real time.', color: 'rose' },
            { title: 'IoT data ingestion', desc: 'Handle millions of sensor readings per second. Kafka\'s partitioning allows horizontal scaling to match device count growth.', color: 'sky' },
          ]} />

          <SectionHeader n={8} title="Key Kafka Metrics to Monitor" color="rose" />

          <VerticalSteps title="Production Kafka — what to watch" steps={[
            { title: 'Consumer lag', desc: 'The number of messages a consumer is behind the latest offset. High lag = consumers can\'t keep up with producers. Target: < 1000 messages.', badge: 'Critical' },
            { title: 'Under-replicated partitions', desc: 'Partitions where not all replicas are in sync. Should always be 0 in a healthy cluster. Non-zero means a broker is falling behind.', badge: 'Critical' },
            { title: 'Request rate & throughput', desc: 'Messages/sec and bytes/sec per broker. Use this to plan capacity and detect traffic spikes before they cause problems.', badge: 'Important' },
            { title: 'Disk usage per broker', desc: 'Kafka writes to disk continuously. Monitor per-broker disk utilisation and set retention policies (time or size based) to prevent full disks.', badge: 'Important' },
            { title: 'Producer send latency', desc: 'P99 latency for producer sends. Spikes indicate broker pressure or network issues. Configure acks=all for durability vs acks=1 for speed.', badge: 'Monitor' },
          ]} />

          <SectionHeader n={9} title="Common Kafka Mistakes" color="amber" />

          <AlertBox type="warning" title="Too few partitions">
            Setting too few partitions at topic creation limits your max consumer parallelism. <strong>You can increase partitions but not decrease them.</strong> Plan for 2–4x your current consumer count.
          </AlertBox>

          <AlertBox type="warning" title="Not setting retention policies">
            Default retention is 7 days. For high-volume topics, this can fill disks quickly. Set <code>retention.ms</code> and <code>retention.bytes</code> per topic based on actual storage budgets.
          </AlertBox>

          <AlertBox type="error" title="Using Kafka as a database">
            Kafka is not designed for random reads by key. If you need to look up a specific record, use a proper database. Kafka is optimised for sequential append and sequential read — that's where its performance comes from.
          </AlertBox>

          <AlertBox type="success" title="Best practice: use keys for ordering">
            Always set a message key for entities that need per-entity ordering (e.g., <code>userId</code>, <code>orderId</code>). This guarantees all events for the same entity land on the same partition and are processed in order.
          </AlertBox>

          <FAQAccordion items={[
            { q: 'What is Apache Kafka used for?', a: 'Kafka is used for real-time event streaming, log aggregation, change data capture (CDC), microservice communication, stream processing, IoT data ingestion, and event sourcing. It\'s the backbone of real-time data infrastructure at companies like LinkedIn, Netflix, Uber, and Airbnb.' },
            { q: 'How many partitions should I use?', a: 'A common rule of thumb: target 1 partition per 10 MB/s of throughput needed. Also consider consumer parallelism — you can\'t have more active consumers than partitions. For most use cases, start with 6–12 partitions per topic and scale up as needed.' },
            { q: 'Does Kafka guarantee exactly-once delivery?', a: 'Yes, with idempotent producers (enable.idempotence=true) and transactional APIs, Kafka supports exactly-once semantics (EOS). For most use cases, at-least-once delivery with idempotent consumers is simpler and sufficient.' },
            { q: 'What is Kafka Connect?', a: 'Kafka Connect is a framework for connecting Kafka to external systems (databases, S3, Elasticsearch, etc.) without writing custom code. Pre-built connectors exist for hundreds of systems. Source connectors pull data into Kafka; sink connectors push data out.' },
            { q: 'What replaced ZooKeeper in Kafka?', a: 'KRaft (Kafka Raft Metadata mode) replaces ZooKeeper starting in Kafka 2.8 (preview) and is the default in Kafka 3.x+. KRaft stores cluster metadata in a Kafka topic itself, removing the ZooKeeper dependency and simplifying operations significantly.' },
            { q: 'How much does Kafka cost to run?', a: 'Self-managed Kafka is free (Apache license) but requires significant operational expertise. A typical 3-broker production cluster on AWS costs $300–1,500/month in EC2 costs. Managed options like Confluent Cloud or AWS MSK run $0.10–$0.25 per GB ingested, eliminating operational overhead.' },
            { q: 'Can Kafka handle millions of messages per second?', a: 'Yes. A single Kafka broker can handle 1M+ messages/second. LinkedIn\'s Kafka cluster processes 7 trillion messages per day. Horizontal scaling (adding brokers and partitions) lets Kafka grow with your throughput requirements.' },
          ]} />
        </article>

        <section className="mt-10"><BlogSocialShare title="Apache Kafka: Complete Guide" description="Architecture, core concepts, real-world use cases & code examples" variant="full" /></section>
        <section className="mt-8"><NewsletterSignup /></section>
        <section className="mt-8"><FeedbackForm toolName="Apache Kafka Complete Guide" /></section>
      </BlogLayoutWithSidebarAds>
    </div>
  );
}
