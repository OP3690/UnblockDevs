'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, CodeBlock, FAQAccordion, KeyPointsGrid,
  StatGrid, SectionHeader, QuickFact, FlowDiagram, ArchDiagram,
} from '@/components/blog/BlogVisuals';

export default function ApacheKafkaApplicationsClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Apache Kafka Applications — Real-World Use Cases and Patterns</h1>
      <p className="lead">
        Apache Kafka powers the real-time data backbone of companies like LinkedIn, Netflix, Uber, and Airbnb.
        This guide covers Kafka's most important real-world applications — event streaming, microservices
        communication, real-time analytics, and more — with architecture patterns and code examples.
      </p>

      <StatGrid stats={[
        { value: '1M+', label: 'messages per second per broker', color: 'blue' },
        { value: '80%', label: 'of Fortune 100 companies use Kafka', color: 'green' },
        { value: 'Sub-10ms', label: 'end-to-end latency achievable', color: 'purple' },
        { value: 'Petabytes', label: 'of data stored in Kafka at LinkedIn daily', color: 'amber' },
      ]} />

      <SectionHeader number={1} title="What Kafka Is Best At" />
      <QuickFact>
        Kafka is a distributed log, not a message queue. Messages are stored durably and can be replayed.
        Multiple consumers can read the same data independently. This makes Kafka ideal for event sourcing,
        audit logs, real-time analytics, and decoupled microservices.
      </QuickFact>

      <SectionHeader number={2} title="Application 1: Real-Time Event Streaming" />
      <FlowDiagram
        title="E-Commerce Event Stream"
        steps={[
          { label: 'User Action', description: 'Click, purchase, search, cart add' },
          { label: 'Event Published', description: 'Microservice publishes to Kafka topic' },
          { label: 'Multi-Consumer', description: 'Analytics, ML, Recommendations read independently' },
          { label: 'Real-Time Processing', description: 'Kafka Streams transforms and aggregates' },
          { label: 'Output', description: 'Dashboard, recommendations, fraud alerts' },
        ]}
      />

      <CodeBlock language="java" filename="Publishing Events to Kafka">
{`// Producer — publish user purchase event
Properties props = new Properties();
props.put("bootstrap.servers", "kafka:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

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

// userId as key ensures all events for a user go to the same partition
producer.send(new ProducerRecord<>("purchases", "user-123", event));`}
      </CodeBlock>

      <SectionHeader number={3} title="Application 2: Microservices Decoupling" />
      <AlertBox type="tip" title="Kafka as an event bus between microservices">
        Instead of microservices calling each other directly (tight coupling), they publish events
        to Kafka topics. Other services subscribe and react. This enables independent deployment,
        scaling, and failure isolation.
      </AlertBox>

      <ArchDiagram
        title="Microservices via Kafka"
        layers={[
          { name: 'Service Layer', components: ['Order Service', 'Payment Service', 'Inventory Service', 'Notification Service'] },
          { name: 'Kafka Topics', components: ['orders', 'payments', 'inventory-updates', 'notifications'] },
          { name: 'Consumers', components: ['Analytics Consumer', 'Fraud Detection', 'Fulfillment Consumer', 'Email/SMS Consumer'] },
        ]}
      />

      <SectionHeader number={4} title="Application 3: Real-Time Analytics Pipeline" />
      <CodeBlock language="java" filename="Kafka Streams — Real-Time Sales Aggregation">
{`StreamsBuilder builder = new StreamsBuilder();

KStream<String, Purchase> purchases = builder.stream("purchases");

// Count purchases per product in 5-minute windows
KTable<Windowed<String>, Long> productCounts = purchases
    .groupBy((key, value) -> value.getProductId())
    .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(5)))
    .count();

// Filter high-selling products and alert
productCounts
    .filter((windowedKey, count) -> count > 100)
    .toStream()
    .to("hot-products-alerts");

// This runs as a streaming computation — zero batch jobs needed`}
      </CodeBlock>

      <SectionHeader number={5} title="Application 4: Database Change Data Capture (CDC)" />
      <CompareTable
        leftLabel="Traditional ETL"
        rightLabel="Kafka CDC (Debezium)"
        rows={[
          { label: 'Frequency', left: 'Batch every hour/night', right: 'Real-time, every row change' },
          { label: 'Latency', left: 'Minutes to hours', right: 'Sub-second' },
          { label: 'Database load', left: 'High — bulk reads during ETL window', right: 'Low — tails transaction log' },
          { label: 'Completeness', left: 'Misses rapid changes between runs', right: 'Every INSERT/UPDATE/DELETE captured' },
          { label: 'Complexity', left: 'Requires timestamp columns, soft deletes', right: 'Works with existing schema' },
        ]}
      />

      <CodeBlock language="json" filename="Debezium CDC Event — Database Row Change">
{`// Kafka message from Debezium when a row changes in PostgreSQL
{
  "op": "u",  // u=update, c=create, d=delete
  "source": {
    "table": "orders",
    "db": "ecommerce",
    "ts_ms": 1710500000000
  },
  "before": {
    "id": 1001,
    "status": "pending",
    "amount": 49.99
  },
  "after": {
    "id": 1001,
    "status": "shipped",   // ← status changed
    "amount": 49.99
  }
}`}
      </CodeBlock>

      <SectionHeader number={6} title="Application 5: Log Aggregation" />
      <KeyPointsGrid columns={2} items={[
        { title: 'Centralized Logging', description: 'All application logs from hundreds of microservices flow into Kafka. Elasticsearch, Splunk, or S3 consume from Kafka. No direct coupling between apps and log storage.' },
        { title: 'Audit Trail', description: 'Kafka\'s immutable log is perfect for audit trails. Every user action, data change, or security event is written once and retained for compliance.' },
        { title: 'Metrics Pipeline', description: 'Application metrics (latency, error rates, throughput) published to Kafka. Prometheus or InfluxDB consumers build dashboards. Alerting consumers trigger PagerDuty.' },
        { title: 'Distributed Tracing', description: 'Distributed trace spans published to Kafka, consumed by Jaeger/Zipkin. Correlate requests across 50 microservices with a single trace ID.' },
      ]} />

      <FAQAccordion items={[
        {
          question: 'When should I use Kafka vs a simple message queue like RabbitMQ?',
          answer: 'Use Kafka when: you need message replay/reprocessing, multiple independent consumers reading the same data, very high throughput (100K+ msg/sec), or long-term event storage. Use RabbitMQ when: you need complex routing logic, task queues where each message is processed once, or simpler operational overhead.',
        },
        {
          question: 'How does Kafka guarantee message delivery?',
          answer: 'Kafka offers three semantics: at-most-once (possible loss, no duplicates), at-least-once (no loss, possible duplicates), and exactly-once (requires transactions, Kafka 0.11+). For most applications, at-least-once with idempotent consumers is the right trade-off.',
        },
        {
          question: 'What is a Kafka partition and why does it matter?',
          answer: 'Partitions are how Kafka achieves parallelism. A topic is split into N partitions, each on a different broker. Consumer group members process different partitions in parallel. More partitions = more parallelism = higher throughput. The trade-off: more partitions = more broker resources and longer leader election on failure.',
        },
        {
          question: 'What is the difference between Kafka and Kafka Streams?',
          answer: 'Kafka is the messaging platform — store and forward events. Kafka Streams is a Java library for building stream processing applications on top of Kafka — filtering, joining, aggregating, windowing events in real-time. Alternatives to Kafka Streams: Apache Flink, Spark Streaming, and the managed Confluent ksqlDB.',
        },
      ]} />
    </BlogLayoutWithSidebarAds>
  );
}
