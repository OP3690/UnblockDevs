'use client';

import BlogLayoutWithSidebarAds from '@/components/BlogLayoutWithSidebarAds';
import {
  AlertBox, FlowDiagram, CompareTable, VerticalSteps,
  CodeBlock, FAQAccordion, KeyPointsGrid, StatGrid, SectionHeader,
  QuickFact,
} from '@/components/blog/BlogVisuals';

export default function BlogPostClient() {
  return (
    <BlogLayoutWithSidebarAds>
      <h1>Batch Processing vs Stream Processing — Key Differences Explained</h1>
      <p className="lead">
        Should you process data in large batches every hour, or process each event the moment it arrives?
        This architectural decision shapes your system's latency, complexity, and cost. This guide explains
        both approaches with real-world use cases, tools, and a decision framework.
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
        ]}
      />

      <SectionHeader number={2} title="Batch Processing — How It Works" />
      <p>
        Batch processing collects data over a period, then processes the entire accumulated dataset at once.
        Think of it like washing dishes — you let them pile up all day, then wash them all in one go.
      </p>

      <FlowDiagram
        steps={[
          { label: 'Data accumulates in storage (S3, HDFS, DB)', color: 'zinc' },
          { label: 'Scheduled job triggers (cron, Airflow)', color: 'amber' },
          { label: 'Batch engine reads entire dataset', color: 'blue' },
          { label: 'Transforms, aggregates, computes', color: 'blue' },
          { label: 'Writes results to destination', color: 'green' },
          { label: 'Job completes, machines idle', color: 'zinc' },
        ]}
      />

      <KeyPointsGrid
        columns={2}
        items={[
          { title: 'Apache Spark', description: 'The dominant batch engine. Processes TB to PB. Python (PySpark), Scala, SQL. Used by Netflix, Uber, Airbnb for ETL and ML.' },
          { title: 'Apache Hadoop MapReduce', description: 'The original big data batch framework. Largely superseded by Spark but still in legacy systems.' },
          { title: 'AWS Glue / Google Dataflow', description: 'Managed ETL services. Write the transformation, cloud handles the infrastructure.' },
          { title: 'SQL + Scheduled Jobs', description: 'For smaller scale: a nightly SQL job in PostgreSQL or Redshift is perfectly valid batch processing.' },
        ]}
      />

      <CodeBlock language="python" filename="PySpark Batch Job Example">
{`from pyspark.sql import SparkSession
from pyspark.sql.functions import col, sum, date_trunc

spark = SparkSession.builder.appName("daily-revenue").getOrCreate()

# Read a day's worth of orders from S3
df = spark.read.parquet("s3://data-lake/orders/date=2026-03-25/")

# Aggregate: revenue by product category
result = (
    df.filter(col("status") == "completed")
    .groupBy("category")
    .agg(sum("total").alias("revenue"))
    .orderBy(col("revenue").desc())
)

# Write to data warehouse
result.write.mode("overwrite").parquet("s3://data-warehouse/daily-revenue/2026-03-25/")

spark.stop()`}
      </CodeBlock>

      <SectionHeader number={3} title="Stream Processing — How It Works" />
      <p>
        Stream processing handles data continuously — each event is processed within milliseconds of arrival.
        Think of an assembly line: each item is processed as it comes through, not queued up.
      </p>

      <FlowDiagram
        steps={[
          { label: 'Event occurs (user clicks, payment, sensor)', color: 'blue' },
          { label: 'Published to message bus (Kafka)', color: 'blue' },
          { label: 'Stream processor reads in real time', color: 'amber' },
          { label: 'Applies logic, aggregations, windowing', color: 'amber' },
          { label: 'Emits results immediately', color: 'green' },
          { label: 'Repeat for every event, continuously', color: 'green' },
        ]}
      />

      <KeyPointsGrid
        columns={2}
        items={[
          { title: 'Apache Kafka Streams', description: 'Java library for building stream applications on top of Kafka. Stateful operations, windowed aggregations, exactly-once semantics.' },
          { title: 'Apache Flink', description: 'The most powerful stream processor. True event-time processing, complex stateful logic, low latency at massive scale.' },
          { title: 'Spark Structured Streaming', description: 'Spark\'s streaming mode. Micro-batch under the hood (not truly event-by-event) but simple API for teams already using Spark.' },
          { title: 'AWS Kinesis / Google Pub/Sub', description: 'Managed streaming infrastructure. Less setup but less control than self-managed Kafka.' },
        ]}
      />

      <CodeBlock language="python" filename="Flink Stream Processing Example (Python)">
{`from pyflink.datastream import StreamExecutionEnvironment
from pyflink.table import StreamTableEnvironment

env = StreamExecutionEnvironment.get_execution_environment()
t_env = StreamTableEnvironment.create(env)

# Read from Kafka topic
t_env.execute_sql("""
  CREATE TABLE orders (
    order_id STRING,
    user_id  STRING,
    total    DOUBLE,
    ts       TIMESTAMP(3),
    WATERMARK FOR ts AS ts - INTERVAL '5' SECOND
  ) WITH (
    'connector' = 'kafka',
    'topic'     = 'orders',
    'properties.bootstrap.servers' = 'localhost:9092',
    'format'    = 'json'
  )
""")

# Real-time 1-minute revenue windows
t_env.execute_sql("""
  SELECT
    TUMBLE_START(ts, INTERVAL '1' MINUTE) AS window_start,
    SUM(total) AS revenue,
    COUNT(*) AS order_count
  FROM orders
  GROUP BY TUMBLE(ts, INTERVAL '1' MINUTE)
""").print()`}
      </CodeBlock>

      <SectionHeader number={4} title="When to Use Each" />

      <CompareTable
        leftLabel="Use Batch When..."
        rightLabel="Use Streaming When..."
        rows={[
          { label: 'Latency', left: 'Hours-old data is acceptable', right: 'Need real-time or near-real-time results' },
          { label: 'Use case', left: 'Nightly reports, ML model training, ETL pipelines', right: 'Fraud detection, live dashboards, real-time alerts' },
          { label: 'Team', left: 'Smaller team, simpler stack preferred', right: 'Data engineering team comfortable with Kafka/Flink' },
          { label: 'Cost', left: 'Want lower infrastructure costs', right: 'Can justify higher infra cost for lower latency' },
          { label: 'Data volume', left: 'Very large historical data (TB+)', right: 'High-velocity event streams (millions/sec)' },
        ]}
      />

      <QuickFact>
        The <strong>Lambda Architecture</strong> uses both: a batch layer for complete, accurate historical
        results and a speed layer for real-time (approximate) results. Results are merged at query time.
        Modern teams often use <strong>Kappa Architecture</strong> (stream-only) to reduce complexity.
      </QuickFact>

      <SectionHeader number={5} title="Real-World Use Cases" />

      <KeyPointsGrid
        columns={2}
        items={[
          {
            title: '🛒 E-commerce — Both',
            description: 'Stream: real-time inventory updates, fraud alerts during checkout. Batch: nightly sales reports, product recommendation model training.',
          },
          {
            title: '💳 Finance — Mostly Stream',
            description: 'Fraud detection must happen in milliseconds during a transaction. End-of-day reconciliation uses batch. Regulatory reporting uses batch.',
          },
          {
            title: '📊 Analytics — Mostly Batch',
            description: 'Weekly business reports, cohort analysis, A/B test results. Latency of hours is fine. Spark on a warehouse (BigQuery, Redshift, Snowflake).',
          },
          {
            title: '🔔 Notifications — Stream',
            description: '"Your order shipped" must trigger immediately when the shipping event fires. A batch job would delay the notification by hours.',
          },
        ]}
      />

      <FAQAccordion
        items={[
          {
            question: 'Can I do real-time analytics without Kafka and Flink?',
            answer: 'Yes, for smaller scale. Postgres LISTEN/NOTIFY, Redis Pub/Sub, or simple webhook-driven pipelines can handle real-time processing without the full streaming stack. Only reach for Kafka/Flink when you need high throughput (millions of events/sec) or complex stateful operations.',
          },
          {
            question: 'What is micro-batch and how is it different from true streaming?',
            answer: 'Micro-batch (Spark Structured Streaming) processes data in very small batches (e.g., every 1 second). It\'s not truly event-by-event like Flink. Latency is typically 1-30 seconds, not milliseconds. For most use cases, micro-batch is fine and much simpler.',
          },
          {
            question: 'What is a watermark in stream processing?',
            answer: 'Events can arrive late (network delays, mobile apps coming online). A watermark is a threshold: "I\'ll wait up to X seconds for late events before closing a time window." Events arriving after the watermark are dropped or sent to a side output for separate handling.',
          },
          {
            question: 'Is Kafka required for stream processing?',
            answer: 'No — Kafka is a message broker/event bus, not a stream processor. Flink and Kafka Streams can read from any source. However, Kafka is the dominant choice as the event backbone in stream architectures because of its durability, replay capability, and ecosystem.',
          },
        ]}
      />
    </BlogLayoutWithSidebarAds>
  );
}
