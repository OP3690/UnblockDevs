'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, VerticalSteps,
} from '@/components/blog/BlogVisuals';

export default function ApacheKafkaApplicationsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Apache Kafka Applications — Real-World Use Cases and Patterns</h1>
      <p className="lead">
        Apache Kafka powers the real-time data backbone of companies like LinkedIn, Netflix, Uber, and Airbnb.
        This guide covers Kafka's most important real-world applications — event streaming, microservices
        communication, real-time analytics, CDC, and log aggregation — with architecture patterns and code examples.
      </p>

      <StatGrid stats={[
        { value: '1M+', label: 'messages per second per broker', color: 'blue' },
        { value: '80%', label: 'of Fortune 100 companies use Kafka', color: 'green' },
        { value: 'Sub-10ms', label: 'end-to-end latency achievable', color: 'purple' },
        { value: 'Petabytes', label: 'of data stored in Kafka at LinkedIn daily', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Kafka Is Best At" />
      <QuickFact color="blue" label="Kafka is a distributed log, not a queue">
        Kafka is a distributed log, not a message queue. Messages are stored durably on disk and can be
        replayed at any time. Multiple independent consumers read the same data without affecting each other.
        This makes Kafka ideal for event sourcing, audit logs, real-time analytics, and decoupled microservices.
      </QuickFact>

      <CompareTable
        leftLabel="Kafka"
        rightLabel="Traditional Message Queue (RabbitMQ)"
        rows={[
          { label: 'Message retention', left: 'Configurable (days, weeks, forever)', right: 'Deleted after consumed' },
          { label: 'Multiple consumers', left: 'All consumers read same data independently', right: 'Each message consumed by one consumer' },
          { label: 'Message replay', left: 'Consumers can reset offset and replay', right: 'Not possible — message is gone' },
          { label: 'Throughput', left: 'Millions of messages/second per broker', right: 'Tens of thousands per second' },
          { label: 'Ordering guarantee', left: 'Per partition (use same key for ordering)', right: 'Per queue' },
          { label: 'Best for', left: 'Event streaming, analytics, audit logs, CDC', right: 'Task queues, complex routing, RPC patterns' },
        ]}
      />

      <SectionHeader number={2} title="Application 1: Real-Time Event Streaming" />
      <VerticalSteps steps={[
        { title: 'User Action Published', desc: 'User clicks, purchases, searches, or adds to cart. The microservice handling the action publishes a structured event to the relevant Kafka topic. Events are small JSON payloads with a user ID as key.' },
        { title: 'Multi-Consumer Fan-Out', desc: 'Analytics, ML recommendations, personalization, and fraud detection each subscribe independently to the purchases topic. Each consumer group gets every message — no coordination needed.' },
        { title: 'Real-Time Processing', desc: 'Kafka Streams or Apache Flink processes events in real-time: aggregating sales per product, detecting anomalies, building recommendation signals. Zero batch jobs needed.' },
        { title: 'Output to Multiple Systems', desc: 'Processed results flow to: dashboards (via Elasticsearch), recommendation APIs (via Redis), fraud alerts (via PagerDuty), and data warehouse (via S3).' },
      ]} />

      <CodeBlock language="java" filename="Publishing Events to Kafka — Java Producer">
{`// Producer — publish user purchase event to Kafka
Properties props = new Properties();
props.put("bootstrap.servers", "kafka:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

// Enable idempotence — exactly-once delivery guarantee
props.put("enable.idempotence", "true");
props.put("acks", "all");  // wait for all replicas to confirm

KafkaProducer<String, String> producer = new KafkaProducer<>(props);

String event = """
  {
    "event": "purchase",
    "userId": "user-123",
    "productId": "prod-456",
    "amount": 49.99,
    "timestamp": "2026-03-15T10:30:00Z"
  }
""";

// userId as partition key — all events for same user go to same partition
// This guarantees ordering of events per user
producer.send(
    new ProducerRecord<>("purchases", "user-123", event),
    (metadata, exception) -> {
        if (exception != null) log.error("Failed to send event", exception);
        else log.info("Sent to partition {} offset {}", metadata.partition(), metadata.offset());
    }
);`}
      </CodeBlock>

      <SectionHeader number={3} title="Application 2: Microservices Decoupling" />
      <AlertBox type="tip" title="Kafka as the event bus between microservices">
        Instead of microservices calling each other directly (tight coupling, cascading failures),
        they publish events to Kafka topics and subscribe to topics they care about. Each service
        can be deployed, scaled, and upgraded independently. When Order Service is down, other
        services keep running — they process missed events when it recovers.
      </AlertBox>

      <KeyPointsGrid columns={2} items={[
        { title: 'Order Service', description: 'Publishes "order.created" events to Kafka when orders are placed. Does not know which services consume it — pure publish/subscribe decoupling.' },
        { title: 'Payment Service', description: 'Subscribes to "order.created". Processes payment and publishes "payment.completed" or "payment.failed" events back to Kafka.' },
        { title: 'Inventory Service', description: 'Subscribes to "payment.completed". Decrements inventory and publishes "inventory.updated" events. Triggers reorder if stock falls below threshold.' },
        { title: 'Notification Service', description: 'Subscribes to "order.created", "payment.completed", "order.shipped". Sends emails/SMS at each step. Completely decoupled from other services.' },
        { title: 'Analytics Consumer', description: 'Subscribes to all topics. Builds real-time dashboards, funnel analysis, and business intelligence. Adding analytics never impacts service performance.' },
        { title: 'Fraud Detection', description: 'Subscribes to "purchase" events. Analyzes patterns in real-time. Can publish "fraud.alert" events to pause suspicious accounts — other services react accordingly.' },
      ]} />

      <SectionHeader number={4} title="Application 3: Real-Time Analytics Pipeline" />
      <CodeBlock language="java" filename="Kafka Streams — Real-Time Sales Aggregation">
{`StreamsBuilder builder = new StreamsBuilder();

KStream<String, Purchase> purchases = builder.stream("purchases");

// Count purchases per product in 5-minute tumbling windows
KTable<Windowed<String>, Long> productCounts = purchases
    .groupBy((key, value) -> value.getProductId())
    .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(5)))
    .count();

// Alert when a product receives 100+ purchases in 5 minutes (trending)
productCounts
    .filter((windowedKey, count) -> count > 100)
    .toStream()
    .mapValues((windowedKey, count) ->
        new TrendingAlert(windowedKey.key(), count, windowedKey.window().startTime()))
    .to("hot-products-alerts");

// Real-time revenue aggregation
KTable<String, Double> revenueByCategory = purchases
    .groupBy((key, value) -> value.getCategory())
    .aggregate(
        () -> 0.0,
        (category, purchase, total) -> total + purchase.getAmount(),
        Materialized.as("revenue-by-category-store")  // queryable state store
    );

// Query directly: stateStore.get("electronics") → $1,245,678.90
// This runs as a continuous streaming computation — zero batch jobs`}
      </CodeBlock>

      <SectionHeader number={5} title="Application 4: Database Change Data Capture (CDC)" />
      <CompareTable
        leftLabel="Traditional ETL"
        rightLabel="Kafka CDC (Debezium)"
        rows={[
          { label: 'Frequency', left: 'Batch every hour or overnight', right: 'Real-time, every row change in milliseconds' },
          { label: 'Latency', left: 'Minutes to hours of data lag', right: 'Sub-second end-to-end' },
          { label: 'Database load', left: 'Heavy — bulk reads during ETL window', right: 'Low — tails the database transaction log' },
          { label: 'Completeness', left: 'Misses rapid updates between runs', right: 'Every INSERT, UPDATE, DELETE captured' },
          { label: 'Complexity', left: 'Requires timestamp columns and soft deletes', right: 'Works with existing schema, no DB changes' },
          { label: 'Deletes', left: 'Cannot capture actual deletes', right: 'Captures tombstone event for every delete' },
        ]}
      />

      <CodeBlock language="json" filename="Debezium CDC Event — Database Row Change to Kafka">
{`// Kafka message from Debezium when a row is updated in PostgreSQL
// Each database change generates one Kafka message
{
  "op": "u",  // u=update, c=create (insert), d=delete, r=read (snapshot)
  "source": {
    "table": "orders",
    "db": "ecommerce",
    "ts_ms": 1710500000000,
    "lsn": 28690624  // PostgreSQL WAL (Write-Ahead Log) position
  },
  "before": {
    "id": 1001,
    "status": "pending",
    "amount": 49.99
  },
  "after": {
    "id": 1001,
    "status": "shipped",   // ← what changed
    "amount": 49.99
  }
}

// Consumers use this to:
// - Keep Elasticsearch in sync with PostgreSQL in real-time
// - Invalidate Redis cache when data changes
// - Notify downstream services of state changes
// - Build audit logs of every data change`}
      </CodeBlock>

      <SectionHeader number={6} title="Application 5: Log Aggregation and Observability" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Centralized Logging', description: 'All application logs from hundreds of microservices flow into a Kafka "logs" topic via Logstash or Filebeat. Elasticsearch, Splunk, or S3 consume from Kafka independently. Zero coupling between apps and log storage.' },
        { title: 'Audit Trail', description: 'Kafka\'s immutable append-only log is ideal for compliance audit trails. Every user action, data access, and configuration change is written once and retained for the required period (GDPR, SOX, HIPAA).' },
        { title: 'Metrics Pipeline', description: 'Application metrics (latency, error rates, throughput) published to Kafka. Prometheus pulls from a Kafka exporter. InfluxDB consumers build time-series dashboards. Alerting consumers trigger PagerDuty/OpsGenie.' },
        { title: 'Distributed Tracing', description: 'OpenTelemetry trace spans published to Kafka, consumed by Jaeger or Zipkin for visualization. Correlate a single user request across 20 microservices with a single trace ID. Zero impact on service performance.' },
      ]} />

      <SectionHeader number={7} title="Kafka Architecture Essentials" />
      <CodeBlock language="yaml" filename="Kafka deployment — key configuration decisions">
{`# Key Kafka configuration decisions for production:

# Topic configuration — example for a purchases topic
kafka-topics.sh --create \
  --topic purchases \
  --partitions 12 \           # 12 partitions = 12-way parallelism
  --replication-factor 3 \    # 3 replicas = survives 2 broker failures
  --config retention.ms=604800000 \  # 7 days retention
  --config cleanup.policy=delete

# Producer: ensure durability
acks=all                     # Wait for all replicas to confirm
enable.idempotence=true      # Exactly-once producer
max.in.flight.requests.per.connection=5

# Consumer: control offset commits
enable.auto.commit=false     # Commit manually after processing
auto.offset.reset=earliest   # Start from beginning for new consumer groups
max.poll.records=500         # Process in batches

# Monitoring: always track
# consumer_group_lag — messages behind = processing delay
# producer_record_error_total — failed publishes
# broker_under_replicated_partitions — replication health`}
      </CodeBlock>

      <FAQAccordion items={[
        {
          question: 'When should I use Kafka vs a simple message queue like RabbitMQ?',
          answer: 'Use Kafka when: you need message replay/reprocessing (consumers can reset to any offset), multiple independent consumers reading the same data (fan-out), very high throughput (100K+ msg/sec), long-term event storage for analytics or audit, or event sourcing where the log IS the truth. Use RabbitMQ when: you need complex routing logic (topic exchanges, header-based routing), classic task queues where each message is processed exactly once by one worker, or simpler operational overhead is more important than throughput.',
        },
        {
          question: 'How does Kafka guarantee message delivery?',
          answer: 'Kafka offers three delivery semantics: at-most-once (possible loss, no duplicates — acks=0), at-least-once (no loss, possible duplicates — acks=all with retries), and exactly-once (requires transactions + idempotent consumers — Kafka 0.11+). For most applications, at-least-once with idempotent consumer logic (check if already processed before acting) is the right trade-off. Exactly-once adds latency overhead and requires transactional producers.',
        },
        {
          question: 'What is a Kafka partition and why does it matter?',
          answer: 'Partitions are how Kafka achieves parallelism. A topic is split into N partitions, each stored on a broker. Consumer group members each process different partitions in parallel — 12 partitions = up to 12 consumers processing simultaneously. Messages with the same key always go to the same partition, preserving ordering per key. Trade-offs: more partitions = more parallelism and throughput, but also more memory per broker, slower leader election during failures, and more open file handles.',
        },
        {
          question: 'What is the difference between Kafka and Kafka Streams?',
          answer: 'Kafka is the messaging platform — durable, distributed log for storing and forwarding events. Kafka Streams is a Java client library for building stateful stream processing applications on top of Kafka — filtering, joining, aggregating, and windowing events in real-time without a separate cluster. Alternatives to Kafka Streams for more complex processing: Apache Flink (stateful, exactly-once, advanced windowing), Apache Spark Streaming (micro-batch, good for ML integration), and Confluent ksqlDB (SQL interface to Kafka Streams).',
        },
        {
          question: 'What is consumer group lag and why should I monitor it?',
          answer: 'Consumer group lag is the difference between the latest offset in a partition and the consumer\'s current offset — essentially "how many messages is this consumer behind?". Zero lag means real-time. Growing lag means the consumer can\'t keep up with the producer. Monitor with: kafka-consumer-groups.sh --describe, or the consumer_group_lag metric in Prometheus. Alert when lag exceeds a threshold (e.g., 10,000 messages or 30 seconds behind). Common causes: slow consumer processing, insufficient consumer instances, or a sudden traffic spike.',
        },
        {
          question: 'How do I handle schema evolution in Kafka messages?',
          answer: 'Three approaches: (1) Schema Registry (Confluent) — register Avro or Protobuf schemas, enforce compatibility rules (backward, forward, full). Producers and consumers negotiate schema versions automatically. Best for large teams. (2) JSON with versioning — include a "version" field and handle all versions in consumer code. Simple but requires careful coordination. (3) Protobuf — binary format with built-in backward compatibility. Fields can be added without breaking existing consumers. Choose Schema Registry + Avro for large production systems; JSON with version field for smaller teams.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
