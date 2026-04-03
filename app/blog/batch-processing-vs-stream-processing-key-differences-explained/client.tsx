'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, CompareTable, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
} from '@/components/blog/BlogVisuals';

export default function BlogPostClient() {
  return (
    <BlogLayoutWithSidebarAds
      title="Batch Processing vs Stream Processing — Key Differences Explained"
      description="Should you process data in large batches every hour, or process each event the moment it arrives? This guide explains both approaches with real-world use cases, tools, code examples, and a decision framework."
    >
      <h1>Batch Processing vs Stream Processing — Key Differences Explained</h1>
      <p className="lead">
        Should you process data in large batches every hour, or process each event the moment it arrives?
        This architectural decision shapes your system's latency, complexity, and cost. This guide explains
        both approaches with real-world use cases, tools, and a decision framework so you can confidently
        choose the right architecture for your data pipeline.
      </p>

      <StatGrid
        stats={[
          { value: 'Hours', label: 'typical batch latency', color: 'amber' },
          { value: 'Milliseconds', label: 'typical stream latency', color: 'green' },
          { value: 'Lambda', label: 'architecture combining both', color: 'blue' },
          { value: '3 tools', label: 'Spark, Flink, Kafka Streams', color: 'purple' },
        ]}
      />

      <SectionHeader number={1} title="The Core Difference" />
      <p>
        The fundamental question is: <strong>when does data get processed relative to when it arrives?</strong>
        This single distinction cascades into differences in latency, system design, tooling, cost, and
        operational complexity. Understanding it clearly is the foundation for all data architecture decisions.
      </p>

      <CompareTable
        leftLabel="Batch Processing"
        rightLabel="Stream Processing"
        rows={[
          { label: 'When data is processed', left: 'After accumulating a large dataset', right: 'As each event/record arrives' },
          { label: 'Latency', left: 'Minutes to hours', right: 'Milliseconds to seconds' },
          { label: 'Data model', left: 'Bounded dataset (finite)', right: 'Unbounded stream (continuous)' },
          { label: 'Typical schedule', left: 'Scheduled: nightly, hourly, weekly', right: 'Continuous: 24/7' },
          { label: 'Error handling', left: 'Retry failed jobs, reprocess batch', right: 'Handle failures per event' },
          { label: 'Infrastructure cost', left: 'Lower — machines idle between runs', right: 'Higher — always running' },
          { label: 'Complexity', left: 'Lower — simpler mental model', right: 'Higher — stateful, time windows, watermarks' },
          { label: 'Debugging', left: 'Easy — rerun with same data', right: 'Harder — ephemeral data, replay needed' },
          { label: 'Best for', left: 'Reports, ETL, ML training', right: 'Fraud detection, live dashboards, alerts' },
        ]}
      />

      <SectionHeader number={2} title="Batch Processing — How It Works" />
      <p>
        Batch processing collects data over a period, then processes the entire accumulated dataset at once.
        Think of it like washing dishes — you let them pile up all day, then wash them all in one go.
        The delay is acceptable because the output (clean dishes, or a daily report) is only needed once,
        not continuously.
      </p>

      <VerticalSteps steps={[
        { title: 'Data accumulates in storage', desc: 'Raw events, logs, transactions, or records are written to a data lake (S3, GCS, HDFS) or database throughout the day. Nothing is processed yet — data just collects.' },
        { title: 'Scheduled job triggers', desc: 'A scheduler (cron, Apache Airflow, Prefect, dbt) triggers the batch job at the designated time — nightly at 2am, hourly at :00, or on an event like file arrival.' },
        { title: 'Batch engine reads the entire dataset', desc: 'Apache Spark, Hadoop MapReduce, or a SQL engine reads all accumulated records from storage. The full dataset is available for any operation — sorting, joining, aggregating across all rows.' },
        { title: 'Transforms, aggregates, computes', desc: 'The engine applies transformations: filtering invalid records, joining with reference data, computing aggregates (revenue by category), training ML models, or generating report datasets.' },
        { title: 'Writes results to destination', desc: 'The processed output is written to a data warehouse (BigQuery, Redshift, Snowflake), a database, or back to a data lake in a partitioned format ready for querying.' },
        { title: 'Job completes, machines idle', desc: 'Once the batch job finishes, the compute cluster shuts down or idles. On cloud infrastructure, this means you pay only for the time the job runs — not 24/7.' },
      ]} />

      <KeyPointsGrid
        columns={2}
        items={[
          { title: 'Apache Spark', description: 'The dominant batch engine. Processes TB to PB efficiently. Python (PySpark), Scala, Java, SQL APIs. Used by Netflix, Uber, Airbnb for ETL and ML. Runs on YARN, Kubernetes, or managed services (Databricks, EMR).' },
          { title: 'Apache Hadoop MapReduce', description: 'The original big data batch framework. Largely superseded by Spark for new projects (Spark is 10-100x faster in-memory) but still present in legacy enterprise systems.' },
          { title: 'AWS Glue / Google Dataflow', description: 'Managed ETL services. Write the transformation logic, cloud handles the infrastructure provisioning and scaling. Lower operational overhead than self-managed Spark.' },
          { title: 'SQL + Scheduled Jobs', description: 'For smaller scale: a nightly SQL job in PostgreSQL, Redshift, or BigQuery is perfectly valid batch processing. dbt (data build tool) organizes and schedules SQL transformations.' },
        ]}
      />

      <CodeBlock language="python" filename="pyspark_batch_job.py">
{`from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum, count, date_trunc, round

spark = SparkSession.builder.appName("daily-revenue").getOrCreate()

# Read a day's worth of orders from S3 data lake
df = spark.read.parquet("s3://data-lake/orders/date=2026-03-25/")

# Step 1: Filter to completed orders only
completed = df.filter(col("status") == "completed")

# Step 2: Aggregate revenue by product category
revenue_by_category = (
    completed
    .groupBy("category", "region")
    .agg(
        sum("total").alias("revenue"),
        count("*").alias("order_count"),
        round(sum("total") / count("*"), 2).alias("avg_order_value")
    )
    .orderBy(col("revenue").desc())
)

# Step 3: Write to data warehouse (partitioned for efficient querying)
revenue_by_category.write \
    .mode("overwrite") \
    .partitionBy("region") \
    .parquet("s3://data-warehouse/daily-revenue/2026-03-25/")

print(f"Processed {completed.count():,} orders")
spark.stop()`}
      </CodeBlock>

      <CodeBlock language="sql" filename="dbt_daily_revenue.sql">
{`-- dbt model: daily_revenue.sql
-- Runs nightly after raw order data lands in the warehouse

{{ config(
    materialized='incremental',
    partition_by={'field': 'order_date', 'data_type': 'date'},
    cluster_by=['region', 'category']
) }}

SELECT
    DATE(created_at)        AS order_date,
    region,
    category,
    COUNT(*)                AS order_count,
    SUM(total)              AS revenue,
    AVG(total)              AS avg_order_value,
    COUNT(DISTINCT user_id) AS unique_customers
FROM {{ source('raw', 'orders') }}
WHERE status = 'completed'
{% if is_incremental() %}
    -- Only process new data since last run
    AND DATE(created_at) > (SELECT MAX(order_date) FROM {{ this }})
{% endif %}
GROUP BY 1, 2, 3`}
      </CodeBlock>

      <SectionHeader number={3} title="Stream Processing — How It Works" />
      <p>
        Stream processing handles data continuously — each event is processed within milliseconds of arrival.
        Think of an assembly line: each item is processed as it comes through, not queued up for a batch
        operation at the end of the day. The key insight is that the "dataset" is never-ending; it's an
        infinite sequence of events.
      </p>

      <VerticalSteps steps={[
        { title: 'Event occurs', desc: 'A user clicks, a payment is made, a sensor fires, an order is placed — any discrete event is captured. The event is a structured record: timestamp, event type, payload data.' },
        { title: 'Published to a message bus', desc: 'The event is published to Apache Kafka, AWS Kinesis, or Google Pub/Sub. The message bus durably stores it and makes it available to consumers, even if they are temporarily offline.' },
        { title: 'Stream processor reads in real time', desc: 'Apache Flink, Kafka Streams, or Spark Structured Streaming reads events from the message bus as they arrive. The processor maintains running state across events.' },
        { title: 'Applies logic, aggregations, windowing', desc: 'The processor applies stateful logic: counting events per window, joining streams, detecting anomaly patterns, computing rolling averages. Time windows (tumbling, sliding, session) define how events are grouped.' },
        { title: 'Emits results immediately', desc: 'Results are written to downstream systems in real time: a database for dashboards to query, an alerting system, another Kafka topic, or a cache like Redis.' },
        { title: 'Repeat for every event, continuously', desc: 'The pipeline runs 24/7 without stopping. New events keep arriving; the processor keeps processing. There is no "job finished" — it is an ongoing, stateful computation.' },
      ]} />

      <KeyPointsGrid
        columns={2}
        items={[
          { title: 'Apache Kafka Streams', description: 'Java library for building stream applications directly on top of Kafka. Stateful operations, windowed aggregations, exactly-once semantics. No separate cluster needed — runs inside your application.' },
          { title: 'Apache Flink', description: 'The most powerful and widely-adopted stream processor. True event-time processing, complex stateful logic, low latency at massive scale. Used at Uber, Netflix, Alibaba for fraud detection and real-time analytics.' },
          { title: 'Spark Structured Streaming', description: 'Spark\'s streaming mode uses micro-batches (processes small windows of data every N seconds) rather than true event-by-event processing. Latency is 1-30 seconds — not milliseconds. Good for teams already using Spark.' },
          { title: 'AWS Kinesis / Google Pub/Sub', description: 'Managed streaming infrastructure services. Less setup and operational overhead than self-managed Kafka. Less control, higher per-event cost at scale. Good starting point for teams new to streaming.' },
        ]}
      />

      <CodeBlock language="python" filename="flink_stream_processing.py">
{`from pyflink.datastream import StreamExecutionEnvironment
from pyflink.table import StreamTableEnvironment

env = StreamExecutionEnvironment.get_execution_environment()
env.set_parallelism(4)  # Process in parallel across 4 workers
t_env = StreamTableEnvironment.create(env)

# Read from Kafka topic in real time
t_env.execute_sql("""
  CREATE TABLE orders (
    order_id STRING,
    user_id  STRING,
    total    DOUBLE,
    category STRING,
    ts       TIMESTAMP(3),
    WATERMARK FOR ts AS ts - INTERVAL '5' SECOND
  ) WITH (
    'connector' = 'kafka',
    'topic'     = 'order-events',
    'properties.bootstrap.servers' = 'kafka:9092',
    'properties.group.id' = 'flink-revenue-processor',
    'scan.startup.mode' = 'latest-offset',
    'format'    = 'json'
  )
""")

# Real-time revenue windows: tumbling 1-minute windows
result = t_env.execute_sql("""
  SELECT
    TUMBLE_START(ts, INTERVAL '1' MINUTE) AS window_start,
    category,
    SUM(total)  AS revenue,
    COUNT(*)    AS order_count,
    AVG(total)  AS avg_order_value
  FROM orders
  GROUP BY
    TUMBLE(ts, INTERVAL '1' MINUTE),
    category
""")

result.print()`}
      </CodeBlock>

      <CodeBlock language="java" filename="KafkaStreamsApp.java">
{`// Kafka Streams: real-time order counting per category
StreamsBuilder builder = new StreamsBuilder();

KStream<String, Order> orders = builder.stream("order-events");

KTable<Windowed<String>, Long> categoryCounts = orders
    .filter((key, order) -> "completed".equals(order.getStatus()))
    .groupBy((key, order) -> order.getCategory())
    .windowedBy(TimeWindows.ofSizeWithNoGrace(Duration.ofMinutes(1)))
    .count(Materialized.as("category-counts-store"));

// Write real-time counts back to Kafka
categoryCounts.toStream()
    .map((windowedKey, count) -> KeyValue.pair(
        windowedKey.key(),
        new CategoryCount(windowedKey.key(), count,
            windowedKey.window().startTime())
    ))
    .to("category-counts-output");

KafkaStreams streams = new KafkaStreams(builder.build(), config);
streams.start();`}
      </CodeBlock>

      <SectionHeader number={4} title="When to Use Each Approach" />

      <CompareTable
        leftLabel="Use Batch When..."
        rightLabel="Use Streaming When..."
        rows={[
          { label: 'Latency requirement', left: 'Hours-old data is acceptable for business decisions', right: 'Need real-time or near-real-time results (< 1 minute)' },
          { label: 'Use case examples', left: 'Nightly reports, ML model training, ETL pipelines, invoicing', right: 'Fraud detection, live dashboards, real-time alerts, recommendations' },
          { label: 'Team experience', left: 'Smaller team, simpler stack preferred, SQL expertise', right: 'Data engineering team comfortable with Kafka/Flink or Spark Streaming' },
          { label: 'Cost priority', left: 'Want to minimize infrastructure spend', right: 'Can justify higher infra cost for lower latency business value' },
          { label: 'Data volume', left: 'Very large historical data (TB+) processed periodically', right: 'High-velocity event streams (thousands to millions of events/sec)' },
          { label: 'Correctness', left: 'Need perfect accuracy over approximation', right: 'Can tolerate eventual consistency or approximation in real-time' },
          { label: 'Debugging needs', left: 'Need to easily rerun and debug failed jobs', right: 'Can handle debugging distributed stateful systems' },
        ]}
      />

      <QuickFact color="purple" label="Lambda vs Kappa Architecture">
        The Lambda Architecture combines both: a batch layer for complete, accurate historical
        results and a speed layer for real-time (approximate) results. Results merge at query time.
        Modern teams increasingly use the Kappa Architecture (stream-only, with replay capability)
        to reduce the operational burden of maintaining two separate systems.
      </QuickFact>

      <SectionHeader number={5} title="Real-World Use Cases" />

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: 'E-commerce — Both',
            description: 'Stream: real-time inventory updates when items are purchased, fraud alerts during checkout, instant order confirmation emails. Batch: nightly sales reports, product recommendation model training, revenue reconciliation, customer lifetime value calculations.',
          },
          {
            title: 'Finance — Mostly Stream',
            description: 'Fraud detection must happen in milliseconds during a transaction — a 5-second delay means the fraudulent charge goes through. End-of-day reconciliation and regulatory reporting use batch. Position calculation during trading hours uses stream.',
          },
          {
            title: 'Analytics — Mostly Batch',
            description: 'Weekly business reports, cohort analysis, A/B test result calculation, customer segmentation. Latency of hours is fine for these insights. Spark on a warehouse (BigQuery, Redshift, Snowflake) with dbt orchestration.',
          },
          {
            title: 'Notifications — Stream',
            description: '"Your order shipped" must trigger within seconds of the shipping event being recorded. A batch job would delay the notification by hours. Push notifications, SMS, and webhook triggers all require streaming or near-real-time event processing.',
          },
          {
            title: 'Log Processing — Both',
            description: 'Real-time alerting on error rate spikes (stream: Flink or Kinesis). Long-term log analysis, usage reporting, cost attribution (batch: Spark on cold storage). Most companies run both in parallel for log data.',
          },
          {
            title: 'Machine Learning — Both',
            description: 'Model training: always batch (needs full dataset). Feature engineering for training: batch. Real-time inference: streaming features computed in real time and served from a feature store. Model monitoring: stream (detect drift immediately).',
          },
        ]}
      />

      <SectionHeader number={6} title="Stream Processing Concepts You Need to Know" />

      <p>
        Stream processing introduces concepts that do not exist in batch processing. Understanding these
        is essential before adopting a streaming architecture.
      </p>

      <KeyPointsGrid columns={2} items={[
        { title: 'Event time vs processing time', description: 'Event time is when the event actually occurred. Processing time is when your system processes it. These differ due to network delays and late-arriving data. Flink\'s event-time processing handles this correctly; processing-time systems can produce incorrect results for out-of-order data.' },
        { title: 'Watermarks', description: 'A watermark tells the stream processor: "I will wait up to X seconds for late-arriving events before closing this time window." Events arriving after the watermark are dropped or sent to a side output. Critical for producing correct windowed aggregations.' },
        { title: 'Windowing', description: 'Groups events by time for aggregation. Tumbling windows: fixed non-overlapping periods (every 1 minute). Sliding windows: overlapping periods (5-minute window every 1 minute). Session windows: grouped by activity gaps (30-minute inactivity ends a session).' },
        { title: 'Exactly-once semantics', description: 'Guarantees each event is processed exactly once — not zero times (loss) or multiple times (duplication). Requires coordination between the message bus and the processor. Flink with Kafka supports exactly-once. Important for financial systems.' },
        { title: 'Backpressure', description: 'When a stream processor cannot keep up with the incoming event rate, it signals upstream systems to slow down. Proper backpressure handling prevents memory overflow and system crashes. Flink handles backpressure natively.' },
        { title: 'State management', description: 'Streaming computations often need to remember past events (running totals, session data, joined records). State must be stored somewhere (RocksDB in Flink) and backed up for fault tolerance — this is the primary operational complexity of streaming systems.' },
      ]} />

      <AlertBox type="tip" title="Start with batch, add streaming only when needed">
        Many teams add streaming prematurely because it sounds sophisticated. Start with batch
        processing. If your business requirements genuinely require sub-minute latency and
        batch cannot deliver it, then invest in a streaming architecture. The operational
        complexity of streaming is significant — make sure the business value justifies it.
      </AlertBox>

      <FAQAccordion
        items={[
          {
            question: 'Can I do real-time analytics without Kafka and Flink?',
            answer: 'Yes, for smaller scale. Postgres LISTEN/NOTIFY, Redis Pub/Sub, or simple webhook-driven pipelines can handle real-time processing without the full streaming stack. ClickHouse with frequent inserts can provide near-real-time analytics. Only reach for Kafka and Flink when you need high throughput (millions of events per second), complex stateful operations, or guaranteed delivery semantics.',
          },
          {
            question: 'What is micro-batch and how is it different from true streaming?',
            answer: 'Micro-batch (Spark Structured Streaming, Flink\'s micro-batch mode) processes data in very small batches (every 1-30 seconds). It is not truly event-by-event like native Flink streaming. Latency is typically 1-30 seconds, not milliseconds. For most use cases, micro-batch is fine and much simpler to operate. True streaming (event-by-event) is needed when millisecond latency matters — fraud detection, real-time bidding.',
          },
          {
            question: 'What is a watermark in stream processing?',
            answer: 'Events can arrive late due to network delays, mobile apps coming online after being offline, or distributed system clock skew. A watermark is a threshold: "I will wait up to X seconds for late events before closing a time window and computing results." Events arriving after the watermark are dropped or sent to a side output for separate handling. Choosing watermark delays involves a trade-off: too short means dropping late events; too long means high latency.',
          },
          {
            question: 'Is Kafka required for stream processing?',
            answer: 'No — Kafka is a message broker and event bus, not a stream processor. Flink and Kafka Streams can read from various sources: Kinesis, Pub/Sub, databases via CDC, etc. However, Kafka is the dominant choice as the event backbone in streaming architectures because of its durability, ordered delivery, replay capability, and massive ecosystem of connectors.',
          },
          {
            question: 'What is the Lambda Architecture and should I use it?',
            answer: 'Lambda Architecture uses both batch and streaming: a batch layer for complete and accurate historical results (runs nightly), and a speed layer for real-time approximate results (runs continuously). Results are merged at query time. The downside is running and maintaining two separate codebases. Modern preference is Kappa Architecture (stream-only with replay), which eliminates this duplication by treating all processing as streaming — including historical reprocessing via Kafka replay.',
          },
          {
            question: 'How do I handle failures in stream processing?',
            answer: 'Flink uses checkpointing: it periodically snapshots state to durable storage (S3, HDFS). On failure, it restores from the last checkpoint and replays unprocessed events from Kafka (since Kafka retains events for a configurable period). This gives at-least-once or exactly-once delivery guarantees. Kafka Streams handles failures similarly using Kafka\'s offset management and local state store backups.',
          },
          {
            question: 'When should I use Flink vs Kafka Streams vs Spark Streaming?',
            answer: 'Use Kafka Streams for simple stateful stream processing within a Java/Kotlin application — no separate cluster needed, great for microservices. Use Flink for complex stateful logic, low latency requirements (< 1 second), or very high throughput — it is the most powerful and flexible. Use Spark Structured Streaming if your team already runs Spark for batch and micro-batch latency (5-30 seconds) is acceptable — it minimizes the number of systems to operate.',
          },
          {
            question: 'Can stream processing replace batch processing entirely?',
            answer: 'In theory yes (Kappa Architecture). In practice, batch still wins for: initial historical data loads (backfills), complex multi-pass ML training jobs, large-scale data quality corrections, and workloads where the cost of always-on infrastructure is not justified. Most mature data platforms use both: streaming for real-time operational metrics and batch for comprehensive analytics and ML.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
