'use client';

import Link from 'next/link';
import { ArrowLeft, Code, ExternalLink, Server, Activity, Globe, TrendingUp, Zap } from 'lucide-react';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function ApacheKafkaApplicationsClient() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-primary-700 bg-primary-50 border-2 border-primary-200 hover:bg-primary-100 hover:border-primary-300 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Server className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Apache Kafka Applications</h1>
              <p className="text-sm text-gray-500 mt-1">Real-World Use Cases & Examples</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Apache Kafka Applications"
        description="Real-World Use Cases & Examples"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What are common Apache Kafka applications?',
              answer: 'Common applications include: real-time analytics and monitoring, event-driven microservices, log aggregation, IoT data ingestion, financial trading systems, social media feeds, recommendation engines, change data capture (CDC), and data integration pipelines.',
            },
            {
              question: 'How is Kafka used in microservices architecture?',
              answer: 'Kafka serves as the message broker for event-driven microservices. Services publish events (user created, order placed) to Kafka topics. Other services subscribe to relevant topics and react to events asynchronously, enabling loose coupling and independent scaling.',
            },
            {
              question: 'What companies use Apache Kafka?',
              answer: 'Major companies using Kafka include: LinkedIn (originally developed Kafka), Netflix, Uber, Airbnb, Twitter, PayPal, Spotify, Zalando, and thousands of others for real-time data processing, event streaming, and microservices communication.',
            },
            {
              question: 'How is Kafka used for real-time analytics?',
              answer: 'Kafka streams events from various sources (applications, databases, IoT devices) to analytics systems. Real-time processing engines (Kafka Streams, Flink, Spark Streaming) consume messages, aggregate data, and update dashboards/metrics in real-time, enabling instant insights and monitoring.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              <strong>Apache Kafka</strong> powers thousands of production systems worldwide, handling trillions of events 
              daily. From social media feeds to financial trading platforms, Kafka enables real-time data processing at 
              unprecedented scale.
            </p>
            <p className="text-gray-700 leading-relaxed">
              This guide explores real-world Kafka applications across industries, with detailed examples of how companies 
              use Kafka to solve complex data challenges.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Server className="w-6 h-6 text-blue-600" />
              Major Kafka Applications
            </h2>
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  1. Real-Time Analytics & Business Intelligence
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Use Case:</strong> Processing business events in real-time to generate instant insights, 
                  update dashboards, and trigger alerts.
                </p>
                <div className="bg-white p-4 rounded border border-gray-200 mb-3">
                  <h4 className="font-semibold text-gray-800 mb-2">Example: E-commerce Analytics</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li><strong>Events:</strong> Page views, clicks, purchases, cart additions</li>
                    <li><strong>Topics:</strong> <code className="bg-gray-100 px-1 rounded">user-events</code>, <code className="bg-gray-100 px-1 rounded">purchases</code>, <code className="bg-gray-100 px-1 rounded">page-views</code></li>
                    <li><strong>Processing:</strong> Real-time aggregation of sales, conversion rates, popular products</li>
                    <li><strong>Output:</strong> Live dashboards, inventory alerts, recommendation engine updates</li>
                  </ul>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>Companies:</strong> Netflix uses Kafka for real-time analytics on user behavior. Uber processes 
                  millions of ride events per second for real-time metrics and fraud detection.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-purple-600" />
                  2. Event-Driven Microservices
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Use Case:</strong> Decoupling microservices using events for asynchronous communication and 
                  building scalable, maintainable architectures.
                </p>
                <div className="bg-white p-4 rounded border border-gray-200 mb-3">
                  <h4 className="font-semibold text-gray-800 mb-2">Example: E-commerce Platform</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li><strong>Order Service:</strong> Publishes <code className="bg-gray-100 px-1 rounded">order-created</code> event</li>
                    <li><strong>Inventory Service:</strong> Consumes event, reserves items, publishes <code className="bg-gray-100 px-1 rounded">inventory-reserved</code></li>
                    <li><strong>Payment Service:</strong> Consumes <code className="bg-gray-100 px-1 rounded">order-created</code>, processes payment</li>
                    <li><strong>Notification Service:</strong> Consumes events, sends emails/SMS to customers</li>
                    <li><strong>Analytics Service:</strong> Consumes all events for business intelligence</li>
                  </ul>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>Benefits:</strong> Services are decoupled, can be developed independently, and scale based on 
                  their own load. New services can be added without modifying existing ones.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                  3. Log Aggregation & Centralized Logging
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Use Case:</strong> Collecting logs from hundreds or thousands of applications into a centralized 
                  system for analysis, debugging, and compliance.
                </p>
                <div className="bg-white p-4 rounded border border-gray-200 mb-3">
                  <h4 className="font-semibold text-gray-800 mb-2">Example: Multi-Service Application</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li><strong>Applications:</strong> Send logs to Kafka topics (one topic per service or log level)</li>
                    <li><strong>Kafka:</strong> Buffers logs during high load, ensures no log loss</li>
                    <li><strong>ELK Stack:</strong> Consumes from Kafka, indexes logs in Elasticsearch</li>
                    <li><strong>Output:</strong> Searchable logs in Kibana, real-time dashboards, alerting</li>
                  </ul>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>Scale:</strong> LinkedIn processes over 1 trillion messages per day through Kafka for log aggregation. 
                  Enables debugging across distributed systems and compliance auditing.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  4. IoT Data Ingestion & Processing
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Use Case:</strong> Collecting and processing data from millions of IoT devices (sensors, vehicles, 
                  smart devices) in real-time.
                </p>
                <div className="bg-white p-4 rounded border border-gray-200 mb-3">
                  <h4 className="font-semibold text-gray-800 mb-2">Example: Smart City Platform</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li><strong>Devices:</strong> Traffic sensors, air quality monitors, smart meters publish to Kafka</li>
                    <li><strong>Topics:</strong> <code className="bg-gray-100 px-1 rounded">traffic-data</code>, <code className="bg-gray-100 px-1 rounded">air-quality</code>, <code className="bg-gray-100 px-1 rounded">energy-usage</code></li>
                    <li><strong>Processing:</strong> Real-time aggregation, anomaly detection, alerting</li>
                    <li><strong>Output:</strong> Traffic optimization, pollution alerts, energy management</li>
                  </ul>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>Scale:</strong> Can handle millions of devices publishing data simultaneously. Used in smart 
                  manufacturing, connected vehicles, and smart grid systems.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-red-600" />
                  5. Financial Trading & Risk Management
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Use Case:</strong> Processing market data, trades, and financial events in real-time for trading 
                  platforms, risk calculations, and compliance.
                </p>
                <div className="bg-white p-4 rounded border border-gray-200 mb-3">
                  <h4 className="font-semibold text-gray-800 mb-2">Example: Trading Platform</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li><strong>Market Data:</strong> Price feeds, order book updates published to <code className="bg-gray-100 px-1 rounded">market-data</code> topic</li>
                    <li><strong>Trades:</strong> Executed trades published to <code className="bg-gray-100 px-1 rounded">trades</code> topic</li>
                    <li><strong>Risk Engine:</strong> Consumes trades, calculates real-time risk metrics</li>
                    <li><strong>Compliance:</strong> All events consumed for regulatory reporting</li>
                    <li><strong>Analytics:</strong> Real-time P&L, position tracking, market analysis</li>
                  </ul>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>Requirements:</strong> Ultra-low latency ({'<'} 1ms), high throughput (millions of events/second), 
                  guaranteed delivery, and exactly-once semantics for financial accuracy.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-pink-600" />
                  6. Social Media & Activity Feeds
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Use Case:</strong> Powering activity feeds, notifications, and real-time updates in social 
                  platforms and content systems.
                </p>
                <div className="bg-white p-4 rounded border border-gray-200 mb-3">
                  <h4 className="font-semibold text-gray-800 mb-2">Example: Social Network</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li><strong>User Actions:</strong> Likes, comments, posts, follows published to <code className="bg-gray-100 px-1 rounded">user-activity</code></li>
                    <li><strong>Feed Service:</strong> Consumes events, builds personalized feeds</li>
                    <li><strong>Notification Service:</strong> Consumes events, sends real-time notifications</li>
                    <li><strong>Analytics:</strong> Tracks engagement, trending topics, user behavior</li>
                    <li><strong>Recommendation:</strong> Uses activity data for content recommendations</li>
                  </ul>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>LinkedIn:</strong> Uses Kafka for activity feeds, processing billions of events daily. Enables 
                  real-time updates, personalized content, and scalable feed generation.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Server className="w-5 h-5 text-indigo-600" />
                  7. Change Data Capture (CDC)
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Use Case:</strong> Capturing database changes and streaming them to other systems for 
                  replication, analytics, or event sourcing.
                </p>
                <div className="bg-white p-4 rounded border border-gray-200 mb-3">
                  <h4 className="font-semibold text-gray-800 mb-2">Example: Database Replication</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li><strong>Source:</strong> MySQL/PostgreSQL database with CDC connector (Debezium)</li>
                    <li><strong>Kafka:</strong> Receives change events (INSERT, UPDATE, DELETE) as messages</li>
                    <li><strong>Topics:</strong> One topic per database table (e.g., <code className="bg-gray-100 px-1 rounded">users.events</code>)</li>
                    <li><strong>Consumers:</strong> Data warehouse, search index, cache, analytics systems</li>
                    <li><strong>Benefits:</strong> Real-time data synchronization without polling</li>
                  </ul>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>Use Cases:</strong> Database replication, search index updates, cache invalidation, data 
                  warehouse ETL, and maintaining eventual consistency across systems.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  8. Recommendation Engines
                </h3>
                <p className="text-gray-700 mb-3">
                  <strong>Use Case:</strong> Processing user behavior events to generate real-time recommendations 
                  for products, content, or connections.
                </p>
                <div className="bg-white p-4 rounded border border-gray-200 mb-3">
                  <h4 className="font-semibold text-gray-800 mb-2">Example: E-commerce Recommendations</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    <li><strong>Events:</strong> Views, clicks, purchases, searches published to Kafka</li>
                    <li><strong>ML Models:</strong> Consume events, update user profiles in real-time</li>
                    <li><strong>Recommendation Service:</strong> Generates personalized recommendations</li>
                    <li><strong>Output:</strong> Real-time product recommendations, "customers also bought"</li>
                  </ul>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>Netflix:</strong> Uses Kafka for real-time recommendation updates. User actions immediately 
                  influence recommendations, improving engagement and satisfaction.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Industry-Specific Applications</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">E-commerce & Retail</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Real-time inventory updates</li>
                  <li>Order processing pipelines</li>
                  <li>Price change notifications</li>
                  <li>Fraud detection</li>
                  <li>Recommendation engines</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">Healthcare</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Patient monitoring data</li>
                  <li>Medical device telemetry</li>
                  <li>Real-time alerts</li>
                  <li>HIPAA-compliant data pipelines</li>
                  <li>Clinical analytics</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">Transportation & Logistics</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Vehicle telemetry</li>
                  <li>Route optimization</li>
                  <li>Real-time tracking</li>
                  <li>Fleet management</li>
                  <li>Supply chain visibility</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2">Gaming & Entertainment</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Player event tracking</li>
                  <li>Real-time leaderboards</li>
                  <li>In-game analytics</li>
                  <li>Anti-cheat systems</li>
                  <li>Content recommendations</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <Server className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Build Kafka Applications</h2>
                <p className="text-blue-100">
                  Prepare your message formats and data structures for Kafka. Validate JSON schemas, generate message 
                  formats, and ensure your applications are Kafka-ready.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/?tab=schema"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Schema Generator
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="/?tab=fixer"
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
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

