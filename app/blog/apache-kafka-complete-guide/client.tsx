'use client';

import Link from 'next/link';
import { ArrowLeft, Code, ExternalLink, Database, Zap, Network, Server } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function ApacheKafkaCompleteGuideClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-orange-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 rounded-lg">
              <Database className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Apache Kafka: Complete Guide</h1>
              <p className="text-sm text-gray-500 mt-1">What, How, Why & Real-World Applications</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Apache Kafka: Complete Guide"
        description="What, How, Why & Real-World Applications"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What is Apache Kafka?',
              answer: 'Apache Kafka is an open-source distributed event streaming platform designed to handle high-throughput, real-time data feeds. It acts as a distributed commit log that can handle millions of messages per second, making it ideal for building real-time data pipelines, event-driven architectures, and streaming applications.',
            },
            {
              question: 'How does Apache Kafka work?',
              answer: 'Kafka works by organizing data into topics (categories of messages). Topics are split into partitions for scalability. Producers write messages to topics, and consumers read messages from topics. Kafka brokers store and serve the data, with replication for fault tolerance. Messages are stored in order within partitions and can be replayed by consumers.',
            },
            {
              question: 'Why use Apache Kafka?',
              answer: 'Kafka provides: high throughput (millions of messages/second), horizontal scalability, fault tolerance through replication, real-time processing, decoupling of producers and consumers, message durability and replay capability, and support for both batch and stream processing. It\'s the de facto standard for event streaming and real-time data pipelines.',
            },
            {
              question: 'What are real-world applications of Apache Kafka?',
              answer: 'Applications include: real-time analytics, log aggregation, event sourcing, microservices communication, IoT data ingestion, financial trading systems, social media feeds, recommendation engines, monitoring and alerting systems, and data integration between systems.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Apache Kafka</strong> is a distributed event streaming platform capable of handling trillions of events 
              per day. Originally developed by LinkedIn, Kafka has become the industry standard for building real-time data 
              pipelines, event-driven architectures, and streaming applications.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This comprehensive guide explores what Kafka is, how it works, why it's essential for modern applications, 
              real-world use cases, and best practices for implementation.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Database className="w-6 h-6 text-red-600" />
              What is Apache Kafka?
            </h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg mb-4">
              <p className="text-gray-700 mb-3">
                <strong>Apache Kafka</strong> is a distributed, fault-tolerant, high-throughput event streaming platform. 
                Key characteristics:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>Event Streaming:</strong> Handles continuous streams of events in real-time</li>
                <li><strong>Distributed:</strong> Runs across multiple servers (brokers) for scalability</li>
                <li><strong>Fault Tolerant:</strong> Replicates data across brokers for high availability</li>
                <li><strong>High Throughput:</strong> Can handle millions of messages per second</li>
                <li><strong>Durable:</strong> Messages are persisted to disk and can be replayed</li>
                <li><strong>Scalable:</strong> Horizontally scalable by adding more brokers</li>
              </ul>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">Core Concepts</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-gray-900 mb-2">Topics</h4>
                <p className="text-sm text-gray-700">Categories or feeds to which messages are published. Similar to a table in a database or a folder in a filesystem.</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-gray-900 mb-2">Partitions</h4>
                <p className="text-sm text-gray-700">Topics are split into partitions for parallelism and scalability. Each partition is an ordered, immutable sequence of messages.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-semibold text-gray-900 mb-2">Producers</h4>
                <p className="text-sm text-gray-700">Applications that publish (write) messages to Kafka topics. Can publish to multiple topics.</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h4 className="font-semibold text-gray-900 mb-2">Consumers</h4>
                <p className="text-sm text-gray-700">Applications that read and process messages from Kafka topics. Can be part of consumer groups for parallel processing.</p>
              </div>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <h4 className="font-semibold text-gray-900 mb-2">Brokers</h4>
                <p className="text-sm text-gray-700">Kafka servers that store data and serve clients. A Kafka cluster consists of multiple brokers.</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <h4 className="font-semibold text-gray-900 mb-2">Consumer Groups</h4>
                <p className="text-sm text-gray-700">Multiple consumers working together to consume messages from a topic. Each partition is consumed by only one consumer in a group.</p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-indigo-600" />
              How Apache Kafka Works
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Architecture Overview</h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">1. Message Production</h4>
                  <p className="text-sm text-gray-700">
                    Producers send messages to Kafka topics. Messages include a key (optional) and value. Kafka determines 
                    which partition to write to based on the key (hash-based) or round-robin if no key.
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">2. Message Storage</h4>
                  <p className="text-sm text-gray-700">
                    Messages are appended to partitions in order. Each message gets an offset (unique ID within partition). 
                    Messages are stored on disk and replicated across brokers for fault tolerance.
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">3. Message Consumption</h4>
                  <p className="text-sm text-gray-700">
                    Consumers read messages from partitions. Each consumer tracks its offset (position) in each partition. 
                    Consumers can read from any offset, enabling replay of historical data.
                  </p>
                </div>
                <div className="bg-white p-4 rounded border border-gray-200">
                  <h4 className="font-semibold text-gray-800 mb-2">4. Replication & Fault Tolerance</h4>
                  <p className="text-sm text-gray-700">
                    Each partition is replicated across multiple brokers. One broker is the leader (handles reads/writes), 
                    others are followers (replicate data). If leader fails, a follower becomes the new leader.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Kafka Message Flow</h3>
              <pre className="bg-white p-4 rounded border border-red-200 text-xs text-gray-700 overflow-x-auto">
{`1. Producer sends message to Kafka topic
2. Kafka determines target partition (key-based or round-robin)
3. Message appended to partition with offset
4. Message replicated to follower brokers
5. Consumer requests messages from partition
6. Consumer processes message and commits offset
7. Consumer can replay messages by resetting offset`}
              </pre>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-600" />
              Why Apache Kafka Matters
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                <h3 className="font-semibold text-gray-900 mb-2">1. High Throughput & Performance</h3>
                <p className="text-gray-700 text-sm">
                  Kafka can handle millions of messages per second with low latency. Uses sequential disk I/O and 
                  zero-copy transfers for optimal performance. Single broker can handle hundreds of thousands of reads/writes per second.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">2. Horizontal Scalability</h3>
                <p className="text-gray-700 text-sm">
                  Scale Kafka by adding more brokers. Topics can have many partitions, allowing parallel processing. 
                  Consumer groups enable horizontal scaling of consumers.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">3. Fault Tolerance & Durability</h3>
                <p className="text-gray-700 text-sm">
                  Messages are replicated across multiple brokers. If a broker fails, data is still available from replicas. 
                  Messages are persisted to disk, not lost if consumers are down.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">4. Decoupling & Flexibility</h3>
                <p className="text-gray-700 text-sm">
                  Producers and consumers are decoupled - they don't need to know about each other. Multiple consumers 
                  can read the same messages. New consumers can be added without modifying producers.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">5. Real-Time Processing</h3>
                <p className="text-gray-700 text-sm">
                  Kafka enables real-time event processing. Messages are available to consumers immediately after production. 
                  Supports both stream processing (real-time) and batch processing (historical data).
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Real-World Use Cases</h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">1. Real-Time Analytics & Monitoring</h3>
                <p className="text-gray-700 mb-3">
                  <strong>What:</strong> Collecting and processing metrics, logs, and events in real-time for monitoring, 
                  alerting, and analytics dashboards.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>How:</strong> Applications publish metrics/logs to Kafka topics. Analytics systems consume 
                  messages, aggregate data, and update dashboards in real-time. Kafka Streams or Kafka Connect processes 
                  data streams.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Impact:</strong> Companies like LinkedIn, Netflix, and Uber use Kafka for real-time monitoring. 
                  Enables instant detection of issues, real-time business metrics, and operational dashboards.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2. Event-Driven Microservices</h3>
                <p className="text-gray-700 mb-3">
                  <strong>What:</strong> Using Kafka as a message broker for communication between microservices in 
                  event-driven architectures.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>How:</strong> Microservices publish events (user created, order placed) to Kafka topics. Other 
                  microservices subscribe to relevant topics and react to events. Enables loose coupling and asynchronous 
                  communication.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Impact:</strong> Enables scalable microservices architectures. Services can be developed, deployed, 
                  and scaled independently. Events serve as the contract between services.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Log Aggregation & Centralized Logging</h3>
                <p className="text-gray-700 mb-3">
                  <strong>What:</strong> Collecting logs from multiple applications and systems into a centralized location 
                  for analysis and monitoring.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>How:</strong> Applications send logs to Kafka topics. Log aggregation systems (ELK stack, Splunk) 
                  consume from Kafka, index logs, and provide search/analysis capabilities. Kafka buffers logs during high load.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Impact:</strong> Simplifies log management across distributed systems. Enables real-time log 
                  analysis, debugging, and compliance auditing. Used by companies like LinkedIn for processing billions of log messages daily.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">4. IoT Data Ingestion</h3>
                <p className="text-gray-700 mb-3">
                  <strong>What:</strong> Collecting and processing data from millions of IoT devices (sensors, smart devices, 
                  vehicles) in real-time.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>How:</strong> IoT devices publish sensor data to Kafka topics. Data processing systems consume 
                  messages for real-time analytics, anomaly detection, and alerting. Kafka handles high-volume, high-velocity 
                  data streams.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Impact:</strong> Enables real-time IoT analytics, predictive maintenance, and smart city applications. 
                  Can handle millions of devices publishing data simultaneously.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">5. Financial Trading Systems</h3>
                <p className="text-gray-700 mb-3">
                  <strong>What:</strong> Processing market data, trades, and financial events in real-time for trading platforms 
                  and risk management.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>How:</strong> Market data feeds publish to Kafka topics. Trading systems consume messages for 
                  real-time price updates, order matching, and risk calculations. Low latency is critical for high-frequency trading.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Impact:</strong> Enables real-time trading, risk management, and compliance monitoring. Financial 
                  institutions use Kafka for processing millions of market events per second.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">6. Social Media Feeds & Activity Streams</h3>
                <p className="text-gray-700 mb-3">
                  <strong>What:</strong> Powering activity feeds, notifications, and real-time updates in social media platforms 
                  and content systems.
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>How:</strong> User actions (likes, comments, posts) published to Kafka topics. Feed generation 
                  systems consume events to build personalized feeds. Multiple consumers can process same events for different 
                  purposes (notifications, recommendations, analytics).
                </p>
                <p className="text-gray-700 mb-3">
                  <strong>Impact:</strong> LinkedIn uses Kafka for activity feeds. Enables real-time updates, personalized 
                  content delivery, and scalable feed generation for millions of users.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Network className="w-6 h-6 text-blue-600" />
              Technical Architecture
            </h2>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Kafka Cluster Components</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Brokers</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Store and serve Kafka data</li>
                    <li>Handle producer/consumer requests</li>
                    <li>Replicate partitions for fault tolerance</li>
                    <li>Coordinate with Zookeeper (or KRaft)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Zookeeper / KRaft</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Zookeeper: Metadata management (legacy)</li>
                    <li>KRaft: Kafka's new metadata system</li>
                    <li>Manages broker coordination</li>
                    <li>Tracks partition leaders</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Producers</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Publish messages to topics</li>
                    <li>Can specify partition or key</li>
                    <li>Support batching for performance</li>
                    <li>Configurable acknowledgment levels</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Consumers</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li>Read messages from topics</li>
                    <li>Track offset per partition</li>
                    <li>Can rewind and replay messages</li>
                    <li>Support consumer groups for scaling</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <h3 className="font-semibold text-gray-900 mb-2">1. Partitioning Strategy</h3>
                <p className="text-gray-700 text-sm">
                  Choose partition count based on consumer parallelism needs. More partitions = more parallelism but more 
                  overhead. Use meaningful keys for partitioning to ensure related messages go to same partition.
                </p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-900 mb-2">2. Replication Factor</h3>
                <p className="text-gray-700 text-sm">
                  Use replication factor of at least 3 for production. Ensures data availability even if 2 brokers fail. 
                  Balance between fault tolerance and storage costs.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900 mb-2">3. Message Retention</h3>
                <p className="text-gray-700 text-sm">
                  Configure retention based on use case: short for real-time processing, long for event sourcing/replay. 
                  Consider both time-based and size-based retention policies.
                </p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                <h3 className="font-semibold text-gray-900 mb-2">4. Consumer Groups</h3>
                <p className="text-gray-700 text-sm">
                  Use consumer groups for parallel processing. Number of consumers should match partition count for optimal 
                  throughput. Monitor consumer lag to ensure timely processing.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Database className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Build with Kafka</h2>
                <p className="text-red-100">
                  Prepare your data structures and APIs for Kafka integration. Validate JSON message formats, generate 
                  schemas for Kafka topics, and ensure your systems are Kafka-ready.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/?tab=schema"
                className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                Schema Generator
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="/?tab=fixer"
                className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-red-50 transition-colors"
              >
                JSON Validator
                <ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}

