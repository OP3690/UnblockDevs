'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
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
        { value: '__consumer_offsets', label: 'internal topic that tracks consumption progress', color: 'purple' },
        { value: 'KafkaAdmin', label: 'programmatic administration Java API', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="Core Kafka Concepts" />
      <CompareTable
        leftLabel="Concept"
        rightLabel="Description"
        rows={[
          { label: 'Topic', left: 'Named stream of events', right: 'Like a database table — events are organized by topic name' },
          { label: 'Partition', left: 'Ordered sequence within a topic', right: 'Enables parallelism — each consumer in a group processes one partition at a time' },
          { label: 'Offset', left: 'Position of a message in a partition', right: 'Monotonically increasing integer — consumers track their own position per partition' },
          { label: 'Producer', left: 'Writes events to topics', right: 'Can specify partition key for ordering guarantees within a partition' },
          { label: 'Consumer', left: 'Reads events from topics', right: 'Commits offsets to Kafka to track progress and enable resume after restart' },
          { label: 'Consumer Group', left: 'Set of consumers sharing the work', right: 'Each partition assigned to exactly one consumer in the group — enables parallel processing' },
          { label: 'Broker', left: 'Kafka server node', right: 'Stores and serves partitions — a cluster has multiple brokers for fault tolerance' },
          { label: 'ZooKeeper/KRaft', left: 'Cluster coordination', right: 'ZooKeeper (legacy mode), KRaft (Kafka 2.8+ built-in coordinator — no ZooKeeper needed)' },
          { label: 'Replication Factor', left: 'Number of copies per partition', right: 'Factor of 3 means partition exists on 3 brokers — survives 2 broker failures' },
        ]}
      />

      <SectionHeader number={2} title="Topic Management CLI" />
      <CodeBlock language="bash" filename="kafka-topics.sh — Topic Commands">
{`# Create a topic
kafka-topics.sh --bootstrap-server localhost:9092 \\
  --create --topic my-topic \\
  --partitions 6 \\
  --replication-factor 3

# List all topics
kafka-topics.sh --bootstrap-server localhost:9092 --list

# Describe a topic (shows partitions, leaders, replicas, ISR)
kafka-topics.sh --bootstrap-server localhost:9092 \\
  --describe --topic my-topic

# Delete a topic
kafka-topics.sh --bootstrap-server localhost:9092 \\
  --delete --topic my-topic

# Increase partition count (can only increase, never decrease!)
kafka-topics.sh --bootstrap-server localhost:9092 \\
  --alter --topic my-topic --partitions 12

# Change retention to 24 hours (86400000 ms)
kafka-configs.sh --bootstrap-server localhost:9092 \\
  --alter --entity-type topics --entity-name my-topic \\
  --add-config retention.ms=86400000

# Change max message size
kafka-configs.sh --bootstrap-server localhost:9092 \\
  --alter --entity-type topics --entity-name my-topic \\
  --add-config max.message.bytes=5242880  # 5MB`}
      </CodeBlock>

      <SectionHeader number={3} title="Produce and Consume from CLI" />
      <CodeBlock language="bash" filename="Producer and Consumer CLI">
{`# Produce messages (type messages, press Enter after each, Ctrl+C to stop)
kafka-console-producer.sh --bootstrap-server localhost:9092 \\
  --topic my-topic

# Produce with keys (format: key:value)
kafka-console-producer.sh --bootstrap-server localhost:9092 \\
  --topic my-topic \\
  --property "key.separator=:" \\
  --property "parse.key=true"

# Produce JSON messages from a file
cat messages.json | kafka-console-producer.sh \\
  --bootstrap-server localhost:9092 --topic my-topic

# Consume from beginning (replay all messages)
kafka-console-consumer.sh --bootstrap-server localhost:9092 \\
  --topic my-topic --from-beginning

# Consume with a consumer group (commits offsets — resumes on restart)
kafka-console-consumer.sh --bootstrap-server localhost:9092 \\
  --topic my-topic --group my-consumer-group

# Consume and show keys, timestamps, partitions
kafka-console-consumer.sh --bootstrap-server localhost:9092 \\
  --topic my-topic --from-beginning \\
  --property print.key=true \\
  --property print.timestamp=true \\
  --property print.partition=true`}
      </CodeBlock>

      <SectionHeader number={4} title="Java Producer and Consumer Code" />
      <CodeBlock language="java" filename="Kafka Producer — Java">
{`Properties props = new Properties();
props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
props.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG,   StringSerializer.class);
props.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
// Idempotent producer — exactly-once delivery within a session
props.put(ProducerConfig.ENABLE_IDEMPOTENCE_CONFIG, true);
props.put(ProducerConfig.ACKS_CONFIG, "all");        // Wait for all in-sync replicas
props.put(ProducerConfig.RETRIES_CONFIG, 3);
props.put(ProducerConfig.LINGER_MS_CONFIG, 5);       // Wait 5ms to batch messages
props.put(ProducerConfig.BATCH_SIZE_CONFIG, 16384);  // 16KB batch size

try (KafkaProducer<String, String> producer = new KafkaProducer<>(props)) {
  ProducerRecord<String, String> record =
    new ProducerRecord<>("my-topic", "user-123", "{\"event\":\"login\"}");

  // Async send with callback
  producer.send(record, (metadata, exception) -> {
    if (exception != null) {
      log.error("Send failed", exception);
    } else {
      log.info("Sent to partition={} offset={}", metadata.partition(), metadata.offset());
    }
  });

  producer.flush(); // Ensure all buffered records are sent before close
}`}
      </CodeBlock>

      <CodeBlock language="java" filename="Kafka Consumer — Java">
{`Properties props = new Properties();
props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, "localhost:9092");
props.put(ConsumerConfig.GROUP_ID_CONFIG, "my-consumer-group");
props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,   StringDeserializer.class);
props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG, StringDeserializer.class);
props.put(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest");  // Start from beginning for new groups
props.put(ConsumerConfig.ENABLE_AUTO_COMMIT_CONFIG, false);       // Manual commit for reliability
props.put(ConsumerConfig.MAX_POLL_RECORDS_CONFIG, 500);           // Process 500 records per poll

try (KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props)) {
  consumer.subscribe(List.of("my-topic"));

  while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));

    for (ConsumerRecord<String, String> record : records) {
      System.out.printf("partition=%d offset=%d key=%s value=%s%n",
        record.partition(), record.offset(), record.key(), record.value());
      // Process record here
    }

    if (!records.isEmpty()) {
      consumer.commitSync(); // Commit after successfully processing the batch
    }
  }
}`}
      </CodeBlock>

      <SectionHeader number={5} title="Consumer Group Management" />
      <CodeBlock language="bash" filename="Consumer Group CLI">
{`# List all consumer groups
kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list

# Describe group — shows lag per partition (KEY command for monitoring)
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
  --describe --group my-consumer-group
# Output: TOPIC | PARTITION | CURRENT-OFFSET | LOG-END-OFFSET | LAG

# Reset offsets to beginning (replay all messages — requires group to be stopped)
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
  --group my-consumer-group --topic my-topic \\
  --reset-offsets --to-earliest --execute

# Reset to specific offset
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
  --group my-consumer-group --topic my-topic:0 \\
  --reset-offsets --to-offset 1000 --execute

# Reset to a specific timestamp (replay last hour)
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
  --group my-consumer-group --topic my-topic \\
  --reset-offsets --to-datetime 2026-03-25T10:00:00.000 --execute

# Delete a consumer group (must be inactive)
kafka-consumer-groups.sh --bootstrap-server localhost:9092 \\
  --delete --group my-consumer-group`}
      </CodeBlock>

      <SectionHeader number={6} title="Key Configuration Reference" />
      <QuickFact color="blue" label="Production config essentials">
        Kafka has hundreds of configuration properties. These are the ones that matter most
        for production reliability and performance. Wrong defaults are the #1 cause of data loss
        and throughput problems in production Kafka deployments.
      </QuickFact>

      <KeyPointsGrid columns={2} items={[
        { title: 'acks=all (Producer)', description: 'Producer waits for all in-sync replicas to acknowledge the write. Maximum durability guarantee. Use for critical data where loss is unacceptable. Slight latency cost.' },
        { title: 'min.insync.replicas=2 (Broker)', description: 'Require at least 2 replicas to be in-sync before acknowledging. Combined with acks=all, prevents data loss when one broker fails. Standard for production.' },
        { title: 'retention.ms=604800000 (Topic)', description: 'Keep messages for 7 days (default). Set higher for audit logs and event replay. Set lower (hours) for high-volume transient data to control disk usage.' },
        { title: 'auto.offset.reset=earliest (Consumer)', description: 'New consumer groups start from the beginning of the topic. Use "latest" to only read new messages that arrive after the consumer starts.' },
        { title: 'max.poll.interval.ms=300000 (Consumer)', description: 'Max time between poll() calls before the consumer is considered dead and its partitions reassigned. Increase for slow processing jobs (ETL, batch operations).' },
        { title: 'compression.type=snappy (Producer)', description: 'Compress message batches before sending. Snappy is fast with good compression ratio. Use lz4 for maximum throughput. Use gzip for maximum compression.' },
      ]} />

      <SectionHeader number={7} title="Kafka Monitoring — Key Metrics" />
      <CompareTable
        leftLabel="Metric"
        rightLabel="What It Tells You + Alert Threshold"
        rows={[
          { label: 'Consumer Lag', left: 'Messages in partition not yet consumed', right: 'Alert if growing consistently — consumer is falling behind producers' },
          { label: 'Under-Replicated Partitions', left: 'Partitions not fully replicated', right: 'Alert if > 0 — a broker is down or struggling' },
          { label: 'Active Controller Count', left: 'Should always be 1', right: 'Alert if ≠ 1 — controller election problem' },
          { label: 'Produce Request Rate', left: 'Messages written per second', right: 'Capacity planning — approaching broker limits' },
          { label: 'Fetch Request Latency', left: 'Time for consumers to fetch batches', right: 'Alert if > 1s — broker overload or network issue' },
          { label: 'Log Flush Rate', left: 'Disk flush frequency', right: 'High rate indicates disk I/O bottleneck on brokers' },
        ]}
      />

      <SectionHeader number={8} title="Common Kafka Patterns" />
      <VerticalSteps steps={[
        { title: 'Event Sourcing — store all state changes as events', desc: 'Every state change (order placed, payment received, item shipped) is written as an immutable event to Kafka. The current state of any entity is the sum of all its events. Kafka\'s retention and replay make this natural — consumers can rebuild state from the beginning.' },
        { title: 'CQRS with Kafka Streams', desc: 'Separate write model (events to Kafka) from read model (Kafka Streams aggregations into a state store or read database). The read model is a projection of the event stream, rebuilt by replaying events. Multiple read models can consume the same event stream independently.' },
        { title: 'Saga Pattern for Distributed Transactions', desc: 'Coordinate multi-service transactions using Kafka as the event bus. Each service listens for commands, executes locally, and publishes a success or failure event. A saga orchestrator or choreography pattern coordinates the sequence and handles compensating actions on failure.' },
        { title: 'Dead Letter Queue (DLQ) for Failed Messages', desc: 'When a consumer fails to process a message after N retries, publish it to a separate dead-letter topic. A separate consumer processes DLQ messages with alerting and manual intervention. Prevents one bad message from blocking the entire consumer group.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'What is consumer lag and how do I reduce it?',
          answer: 'Consumer lag = number of messages in a partition the consumer has not yet processed. It means the consumer is slower than the producer. Reduce it by: adding more consumers to the group (up to partition count — extra consumers sit idle), increasing batch.size and max.poll.records to process more per cycle, processing messages asynchronously in thread pools, or adding more partitions to the topic (requires consumer restart for reassignment).',
        },
        {
          question: 'How do I choose the number of partitions?',
          answer: 'Rule of thumb: target throughput / throughput per partition. A single partition handles ~100MB/s write or ~100K messages/second on modern hardware. For consumer groups: partitions = max consumers that can process in parallel (adding consumers beyond partition count gives no benefit). Start with 6-12 partitions for medium workloads. You can always increase partitions later but can never decrease them.',
        },
        {
          question: 'What is the difference between at-least-once and exactly-once?',
          answer: 'At-least-once (default): a consumer may process a message multiple times if it crashes after processing but before committing the offset. Make your consumer idempotent to handle duplicates. Exactly-once: use Kafka transactions (enable.idempotence=true + transactional.id on producer, isolation.level=read_committed on consumer) to guarantee each message is processed exactly once. Higher latency and complexity — use only when duplicate processing causes real problems (financial transactions, inventory deduction).',
        },
        {
          question: 'When should I use Kafka vs a message queue like RabbitMQ?',
          answer: 'Use Kafka when: you need to replay messages (audit trail, event sourcing, re-processing), multiple independent consumer groups need the same events, you need high throughput (millions of messages/second), or you want long retention (days to years). Use RabbitMQ when: you need complex routing (topic exchanges, fanout, direct), messages should be deleted once consumed, lower throughput is acceptable, or you need built-in dead-letter handling and priority queues.',
        },
        {
          question: 'What is KRaft mode and should I use it?',
          answer: 'KRaft (Kafka Raft) is Kafka\'s built-in metadata management, replacing the ZooKeeper dependency. Available since Kafka 2.8 (preview) and production-ready in Kafka 3.3+. Benefits: simpler operations (no ZooKeeper cluster to manage), faster controller failover (milliseconds vs seconds), supports larger clusters (millions of partitions). For new deployments in 2026: use KRaft. ZooKeeper mode is deprecated and will be removed in a future Kafka version.',
        },
        {
          question: 'How do I handle schema evolution in Kafka messages?',
          answer: 'Use a schema registry (Confluent Schema Registry is standard) with Avro, Protobuf, or JSON Schema serialization. The registry enforces schema compatibility rules (backward, forward, full) when producers try to evolve schemas. This prevents breaking consumers when message schemas change. Without schema registry, breaking changes require coordinated deployments of all producers and consumers simultaneously.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
