'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact,
} from '@/components/blog/BlogVisuals';

export default function ApacheKafkaCheatSheetClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Apache Kafka Cheat Sheet — Commands, Concepts, and Configuration Reference</h1>
      <p className="lead">
        A complete Apache Kafka cheat sheet covering CLI commands, producer/consumer code, topic management,
        consumer groups, offsets, and key configuration properties. Bookmark this for daily Kafka work.
      </p>

      <StatGrid stats={[
        { value: 'kafka-topics', label: 'topic management CLI tool', color: 'blue' },
        { value: 'kafka-console-*', label: 'producer/consumer CLI tools', color: 'green' },
        { value: '__consumer_offsets', label: 'internal topic tracking consumption', color: 'purple' },
        { value: 'KafkaAdmin', label: 'programmatic administration API', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Core Kafka Concepts" />
      <CompareTable
        leftLabel="Concept"
        rightLabel="Description"
        rows={[
          { label: 'Topic', left: 'Named stream of events', right: 'Like a database table — events are organized by topic' },
          { label: 'Partition', left: 'Ordered sequence within a topic', right: 'Enables parallelism — each consumer processes one partition' },
          { label: 'Offset', left: 'Position of message in partition', right: 'Monotonically increasing integer — consumers track their position' },
          { label: 'Producer', left: 'Writes events to topics', right: 'Can specify partition key for ordering guarantees' },
          { label: 'Consumer', left: 'Reads events from topics', right: 'Commits offsets to track progress' },
          { label: 'Consumer Group', left: 'Set of consumers sharing work', right: 'Each partition assigned to exactly one consumer in a group' },
          { label: 'Broker', left: 'Kafka server node', right: 'Stores and serves partitions — cluster has multiple brokers' },
          { label: 'ZooKeeper/KRaft', left: 'Cluster coordination', right: 'ZooKeeper (legacy), KRaft (Kafka 2.8+ built-in)' },
        ]}
      />

      <SectionHeader number={2} title="Topic Management CLI" />
      <CodeBlock language="bash" filename="kafka-topics.sh — Topic Commands">
{`# Create a topic
kafka-topics.sh --bootstrap-server localhost:9092 \
  --create --topic my-topic \
  --partitions 6 \
  --replication-factor 3

# List all topics
kafka-topics.sh --bootstrap-server localhost:9092 --list

# Describe a topic (partitions, replicas, ISR)
kafka-topics.sh --bootstrap-server localhost:9092 \
  --describe --topic my-topic

# Delete a topic
kafka-topics.sh --bootstrap-server localhost:9092 \
  --delete --topic my-topic

# Alter topic — increase partitions (can't decrease!)
kafka-topics.sh --bootstrap-server localhost:9092 \
  --alter --topic my-topic --partitions 12

# Change retention to 24 hours
kafka-configs.sh --bootstrap-server localhost:9092 \
  --alter --entity-type topics --entity-name my-topic \
  --add-config retention.ms=86400000`}
      </CodeBlock>

      <SectionHeader number={3} title="Produce and Consume from CLI" />
      <CodeBlock language="bash" filename="Producer and Consumer CLI">
{`# Produce messages (type messages, press Enter, Ctrl+C to stop)
kafka-console-producer.sh --bootstrap-server localhost:9092 \
  --topic my-topic

# Produce with keys (key:value format)
kafka-console-producer.sh --bootstrap-server localhost:9092 \
  --topic my-topic \
  --property "key.separator=:" \
  --property "parse.key=true"

# Consume from beginning
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic my-topic --from-beginning

# Consume with consumer group (for offset tracking)
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic my-topic --group my-consumer-group

# Consume and show keys + timestamps
kafka-console-consumer.sh --bootstrap-server localhost:9092 \
  --topic my-topic --from-beginning \
  --property print.key=true \
  --property print.timestamp=true`}
      </CodeBlock>

      <SectionHeader number={4} title="Java Producer and Consumer Code" />
      <CodeBlock language="java" filename="Kafka Producer — Java">
{`Properties props = new Properties();
props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,   StringSerializer.class);
props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
// Idempotent producer — exactly-once delivery within a session
props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
props.put(ProducerConfig.ACKS_CONFIG, "all");  // Wait for all replicas

try (KafkaProducer<String, String> producer = new KafkaProducer<>(props)) {
  ProducerRecord<String, String> record =
    new ProducerRecord<>("my-topic", "user-123", "{\"event\":\"login\"}");

  producer.send(record, (metadata, exception) -> {
    if (exception != null) {
      log.error("Send failed", exception);
    } else {
      log.info("Sent to partition {} offset {}", metadata.partition(), metadata.offset());
    }
  });
}`}
      </CodeBlock>

      <CodeBlock language="java" filename="Kafka Consumer — Java">
{`Properties props = new Properties();
props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
props.put(ConsumerConfig.GROUP_ID_CONFIG, "my-consumer-group");
props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,   StringDeserializer.class);
props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");
props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false); // Manual commit for reliability

try (KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props)) {
  consumer.subscribe(List.of("my-topic"));

  while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
      System.out.printf("offset=%d, key=%s, value=%s%n",
        record.offset(), record.key(), record.value());
    }
    consumer.commitSync(); // Commit after processing
  }
}`}
      </CodeBlock>

      <SectionHeader number={5} title="Consumer Group Management" />
      <CodeBlock language="bash" filename="Consumer Group CLI">
{`# List consumer groups
kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list

# Describe group — shows lag per partition
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --describe --group my-consumer-group

# Reset offsets to beginning (requires group to be stopped)
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --group my-consumer-group --topic my-topic \
  --reset-offsets --to-earliest --execute

# Reset to specific offset
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --group my-consumer-group --topic my-topic:0 \
  --reset-offsets --to-offset 1000 --execute

# Reset to specific time (replay last hour)
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \
  --group my-consumer-group --topic my-topic \
  --reset-offsets --to-datetime 2026-03-25T10:00:00.000 --execute`}
      </CodeBlock>

      <SectionHeader number={6} title="Key Configuration Reference" />
      <QuickFact>
        Kafka has hundreds of configuration properties. These are the ones that matter most
        for production reliability and performance.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'acks=all', description: 'Producer waits for all in-sync replicas to acknowledge. Maximum durability. Use for critical data.' },
        { title: 'min.insync.replicas=2', description: 'Require at least 2 replicas to be in-sync. Prevents data loss when combined with acks=all.' },
        { title: 'retention.ms=604800000', description: 'Keep messages for 7 days (default). Set higher for audit logs, lower for high-volume transient data.' },
        { title: 'auto.offset.reset=earliest', description: 'New consumer groups start from beginning of topic. Use "latest" to only read new messages.' },
        { title: 'max.poll.interval.ms=300000', description: 'Max time between poll() calls before consumer considered dead. Increase for slow processing.' },
        { title: 'compression.type=snappy', description: 'Compress batches before sending. Snappy is fast with good ratio. Use lz4 for max throughput.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is consumer lag and how do I reduce it?',
          answer: 'Consumer lag = number of messages in a partition the consumer has not yet processed. Reduce it by: adding more consumers (up to partition count), increasing batch.size and max.poll.records, processing messages asynchronously, or adding more partitions (requires consumer restart).',
        },
        {
          question: 'How do I choose the number of partitions?',
          answer: 'Rule of thumb: max throughput you need / throughput per partition. A single partition can handle ~100MB/s write or ~100K messages/second. For a consumer group, partitions = max consumers that can process in parallel. Start with 6-12 for medium workloads, scale up as needed.',
        },
        {
          question: 'What is the difference between at-least-once and exactly-once?',
          answer: 'At-least-once: consumer may process a message multiple times if it crashes after processing but before committing the offset. Exactly-once: Kafka transactions (enable.idempotence=true + transactional.id) guarantee each message is processed exactly once. Exactly-once has higher latency and complexity — use it only when duplicate processing causes real problems.',
        },
        {
          question: 'When should I use Kafka vs Kinesis?',
          answer: 'Kafka: self-managed (or Confluent Cloud), more flexible configuration, lower cost at scale, replay data from any offset, partition-level control. Kinesis: AWS-managed, simpler ops, automatic scaling, natively integrates with Lambda/S3/DynamoDB. Choose Kafka for multi-cloud or high-throughput; Kinesis for pure-AWS simplicity.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
