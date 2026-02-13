'use client';

import Link from 'next/link';
import { ArrowLeft, Code, ExternalLink, FileText, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import FAQSchema from '@/components/FAQSchema';
import BlogSocialShare from '@/components/BlogSocialShare';

export default function ApacheKafkaCheatSheetClient() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCommand(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const topicsCommands = [
    {
      id: 'list-topics',
      title: 'List All Topics',
      command: 'kafka-topics.sh --bootstrap-server localhost:9092 --list',
      description: 'List all topics in the Kafka cluster'
    },
    {
      id: 'create-topic',
      title: 'Create Topic',
      command: 'kafka-topics.sh --bootstrap-server localhost:9092 --create --topic my-topic --partitions 3 --replication-factor 2',
      description: 'Create a topic with 3 partitions and replication factor of 2'
    },
    {
      id: 'describe-topic',
      title: 'Describe Topic',
      command: 'kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic my-topic',
      description: 'Show detailed information about a topic (partitions, replicas, leaders)'
    },
    {
      id: 'delete-topic',
      title: 'Delete Topic',
      command: 'kafka-topics.sh --bootstrap-server localhost:9092 --delete --topic my-topic',
      description: 'Delete a topic (requires delete.topic.enable=true)'
    },
    {
      id: 'alter-partitions',
      title: 'Increase Partitions',
      command: 'kafka-topics.sh --bootstrap-server localhost:9092 --alter --topic my-topic --partitions 6',
      description: 'Increase number of partitions (can only increase, not decrease)'
    }
  ];

  const producerCommands = [
    {
      id: 'console-producer',
      title: 'Console Producer',
      command: 'kafka-console-producer.sh --bootstrap-server localhost:9092 --topic my-topic',
      description: 'Start a console producer to send messages interactively'
    },
    {
      id: 'producer-with-key',
      title: 'Producer with Key',
      command: 'kafka-console-producer.sh --bootstrap-server localhost:9092 --topic my-topic --property "parse.key=true" --property "key.separator=:"',
      description: 'Send messages with keys (format: key:value)'
    },
    {
      id: 'producer-acks',
      title: 'Producer with Acks',
      command: 'kafka-console-producer.sh --bootstrap-server localhost:9092 --topic my-topic --producer-property acks=all',
      description: 'Producer with acknowledgment (all = wait for all replicas)'
    }
  ];

  const consumerCommands = [
    {
      id: 'console-consumer',
      title: 'Console Consumer',
      command: 'kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic my-topic --from-beginning',
      description: 'Consume messages from beginning of topic'
    },
    {
      id: 'consumer-group',
      title: 'Consumer Group',
      command: 'kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic my-topic --group my-group',
      description: 'Consume as part of a consumer group'
    },
    {
      id: 'consumer-offset',
      title: 'Consumer from Offset',
      command: 'kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic my-topic --partition 0 --offset 100',
      description: 'Consume from specific partition and offset'
    },
    {
      id: 'consumer-max-messages',
      title: 'Limit Messages',
      command: 'kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic my-topic --max-messages 10',
      description: 'Consume only first 10 messages'
    }
  ];

  const consumerGroupCommands = [
    {
      id: 'list-groups',
      title: 'List Consumer Groups',
      command: 'kafka-consumer-groups.sh --bootstrap-server localhost:9092 --list',
      description: 'List all consumer groups'
    },
    {
      id: 'describe-group',
      title: 'Describe Consumer Group',
      command: 'kafka-consumer-groups.sh --bootstrap-server localhost:9092 --group my-group --describe',
      description: 'Show consumer group details (members, partitions, offsets, lag)'
    },
    {
      id: 'reset-offset',
      title: 'Reset Offset',
      command: 'kafka-consumer-groups.sh --bootstrap-server localhost:9092 --group my-group --topic my-topic --reset-offsets --to-earliest --execute',
      description: 'Reset consumer group offset to earliest (replay all messages)'
    },
    {
      id: 'delete-group',
      title: 'Delete Consumer Group',
      command: 'kafka-consumer-groups.sh --bootstrap-server localhost:9092 --group my-group --delete',
      description: 'Delete a consumer group'
    }
  ];

  const configExamples = [
    {
      id: 'producer-config',
      title: 'Producer Configuration',
      config: `acks=all
retries=3
batch.size=16384
linger.ms=10
compression.type=snappy
key.serializer=org.apache.kafka.common.serialization.StringSerializer
value.serializer=org.apache.kafka.common.serialization.StringSerializer`,
      description: 'Common producer settings for reliability and performance'
    },
    {
      id: 'consumer-config',
      title: 'Consumer Configuration',
      config: `group.id=my-consumer-group
auto.offset.reset=earliest
enable.auto.commit=false
key.deserializer=org.apache.kafka.common.serialization.StringDeserializer
value.deserializer=org.apache.kafka.common.serialization.StringDeserializer`,
      description: 'Common consumer settings for reliable message processing'
    },
    {
      id: 'broker-config',
      title: 'Broker Configuration',
      config: `num.network.threads=8
num.io.threads=8
socket.send.buffer.bytes=102400
socket.receive.buffer.bytes=102400
log.retention.hours=168
log.segment.bytes=1073741824`,
      description: 'Key broker settings for performance and retention'
    }
  ];

  const codeExamples = [
    {
      id: 'java-producer',
      title: 'Java Producer Example',
      language: 'java',
      code: `Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");

KafkaProducer<String, String> producer = new KafkaProducer<>(props);

ProducerRecord<String, String> record = new ProducerRecord<>(
    "my-topic", 
    "key", 
    "Hello Kafka!"
);

producer.send(record);
producer.close();`
    },
    {
      id: 'java-consumer',
      title: 'Java Consumer Example',
      language: 'java',
      code: `Properties props = new Properties();
props.put("bootstrap.servers", "localhost:9092");
props.put("group.id", "my-group");
props.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");

KafkaConsumer<String, String> consumer = new KafkaConsumer<>(props);
consumer.subscribe(Arrays.asList("my-topic"));

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(Duration.ofMillis(100));
    for (ConsumerRecord<String, String> record : records) {
        System.out.println(record.value());
    }
}`
    },
    {
      id: 'python-producer',
      title: 'Python Producer Example',
      language: 'python',
      code: `from kafka import KafkaProducer

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: v.encode('utf-8')
)

producer.send('my-topic', value='Hello Kafka!')
producer.flush()
producer.close()`
    },
    {
      id: 'python-consumer',
      title: 'Python Consumer Example',
      language: 'python',
      code: `from kafka import KafkaConsumer

consumer = KafkaConsumer(
    'my-topic',
    bootstrap_servers=['localhost:9092'],
    group_id='my-group',
    value_deserializer=lambda m: m.decode('utf-8')
)

for message in consumer:
    print(message.value)`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50 to-teal-50">
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Developer Study Materials
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Apache Kafka Cheat Sheet</h1>
              <p className="text-sm text-gray-500 mt-1">Commands, Configuration & Best Practices</p>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Social Share Bar */}
      <BlogSocialShare 
        title="Apache Kafka Cheat Sheet"
        description="Commands, Configuration & Best Practices"
        variant="floating"
      />


      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-16 sm:pt-12">
        <FAQSchema
          faqs={[
            {
              question: 'What are the most common Kafka CLI commands?',
              answer: 'Common commands include: kafka-topics.sh (create, list, describe topics), kafka-console-producer.sh (send messages), kafka-console-consumer.sh (read messages), kafka-consumer-groups.sh (manage consumer groups), and kafka-configs.sh (configure topics/brokers).',
            },
            {
              question: 'How do I create a Kafka topic?',
              answer: 'Use: kafka-topics.sh --bootstrap-server localhost:9092 --create --topic my-topic --partitions 3 --replication-factor 2. This creates a topic with 3 partitions and replication factor of 2 for fault tolerance.',
            },
            {
              question: 'How do I check consumer lag in Kafka?',
              answer: 'Use: kafka-consumer-groups.sh --bootstrap-server localhost:9092 --group my-group --describe. The LAG column shows how many messages behind the consumer group is. High lag indicates consumers are not keeping up with producers.',
            },
            {
              question: 'What are best practices for Kafka configuration?',
              answer: 'Best practices include: set acks=all for producers (reliability), use appropriate partition counts (balance parallelism and overhead), set replication factor of 3 for production, configure retention policies based on use case, monitor consumer lag, and use idempotent producers for exactly-once semantics.',
            },
          ]}
        />
        <article className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <section className="mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              This <strong>Apache Kafka Cheat Sheet</strong> provides quick reference for common commands, configurations, 
              and code examples. Bookmark this page for daily Kafka development and operations.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-green-600" />
              Topic Management Commands
            </h2>
            <div className="space-y-4">
              {topicsCommands.map((cmd) => (
                <div key={cmd.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{cmd.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{cmd.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(cmd.command, cmd.id)}
                      className="ml-4 p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="Copy command"
                    >
                      {copiedCommand === cmd.id ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto">
                    <code>{cmd.command}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-blue-600" />
              Producer Commands
            </h2>
            <div className="space-y-4">
              {producerCommands.map((cmd) => (
                <div key={cmd.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{cmd.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{cmd.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(cmd.command, cmd.id)}
                      className="ml-4 p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Copy command"
                    >
                      {copiedCommand === cmd.id ? (
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-blue-400 p-3 rounded text-sm overflow-x-auto">
                    <code>{cmd.command}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-purple-600" />
              Consumer Commands
            </h2>
            <div className="space-y-4">
              {consumerCommands.map((cmd) => (
                <div key={cmd.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{cmd.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{cmd.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(cmd.command, cmd.id)}
                      className="ml-4 p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded transition-colors"
                      title="Copy command"
                    >
                      {copiedCommand === cmd.id ? (
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-purple-400 p-3 rounded text-sm overflow-x-auto">
                    <code>{cmd.command}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-orange-600" />
              Consumer Group Commands
            </h2>
            <div className="space-y-4">
              {consumerGroupCommands.map((cmd) => (
                <div key={cmd.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{cmd.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{cmd.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(cmd.command, cmd.id)}
                      className="ml-4 p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
                      title="Copy command"
                    >
                      {copiedCommand === cmd.id ? (
                        <CheckCircle className="w-5 h-5 text-orange-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-orange-400 p-3 rounded text-sm overflow-x-auto">
                    <code>{cmd.command}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-indigo-600" />
              Configuration Examples
            </h2>
            <div className="space-y-4">
              {configExamples.map((config) => (
                <div key={config.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{config.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{config.description}</p>
                    </div>
                    <button
                      onClick={() => copyToClipboard(config.config, config.id)}
                      className="ml-4 p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                      title="Copy configuration"
                    >
                      {copiedCommand === config.id ? (
                        <CheckCircle className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-indigo-400 p-3 rounded text-sm overflow-x-auto">
                    <code>{config.config}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Code className="w-6 h-6 text-teal-600" />
              Code Examples
            </h2>
            <div className="space-y-6">
              {codeExamples.map((example) => (
                <div key={example.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{example.title}</h3>
                    <button
                      onClick={() => copyToClipboard(example.code, example.id)}
                      className="ml-4 p-2 text-gray-600 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors"
                      title="Copy code"
                    >
                      {copiedCommand === example.id ? (
                        <CheckCircle className="w-5 h-5 text-teal-600" />
                      ) : (
                        <Copy className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  <pre className="bg-gray-900 text-teal-400 p-4 rounded text-sm overflow-x-auto">
                    <code>{example.code}</code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Best Practices</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h3 className="font-semibold text-gray-900 mb-2">Producer Best Practices</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Use <code className="bg-green-100 px-1 rounded">acks=all</code> for reliability</li>
                  <li>Enable idempotence for exactly-once semantics</li>
                  <li>Use batching for better throughput</li>
                  <li>Set appropriate retry configuration</li>
                  <li>Use compression (snappy, gzip, lz4)</li>
                </ul>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2">Consumer Best Practices</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Use consumer groups for parallel processing</li>
                  <li>Manually commit offsets for reliability</li>
                  <li>Monitor consumer lag regularly</li>
                  <li>Handle errors and retries properly</li>
                  <li>Set appropriate fetch sizes</li>
                </ul>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-gray-900 mb-2">Topic Design</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Choose partition count carefully</li>
                  <li>Use meaningful topic names</li>
                  <li>Set appropriate retention policies</li>
                  <li>Use replication factor of 3+ for production</li>
                  <li>Consider compaction for keyed topics</li>
                </ul>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-2">Monitoring</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  <li>Monitor consumer lag</li>
                  <li>Track broker metrics (CPU, disk, network)</li>
                  <li>Monitor topic throughput</li>
                  <li>Set up alerts for critical metrics</li>
                  <li>Use Kafka Manager or Confluent Control Center</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Troubleshooting Commands</h2>
            <div className="space-y-4">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Check Consumer Lag</h3>
                <pre className="bg-white p-3 rounded border border-red-200 text-sm text-gray-700 overflow-x-auto">
                  <code>kafka-consumer-groups.sh --bootstrap-server localhost:9092 --group my-group --describe</code>
                </pre>
                <p className="text-sm text-gray-600 mt-2">Look at the LAG column. High lag indicates consumers are not keeping up.</p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Check Topic Size</h3>
                <pre className="bg-white p-3 rounded border border-yellow-200 text-sm text-gray-700 overflow-x-auto">
                  <code>kafka-log-dirs.sh --bootstrap-server localhost:9092 --topic-list my-topic --describe</code>
                </pre>
                <p className="text-sm text-gray-600 mt-2">Shows disk usage per partition for a topic.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                <h3 className="font-semibold text-gray-900 mb-2">View Broker Configuration</h3>
                <pre className="bg-white p-3 rounded border border-blue-200 text-sm text-gray-700 overflow-x-auto">
                  <code>kafka-configs.sh --bootstrap-server localhost:9092 --entity-type brokers --entity-name 0 --describe</code>
                </pre>
                <p className="text-sm text-gray-600 mt-2">Shows configuration for broker with ID 0.</p>
              </div>
            </div>
          </section>

          <section className="mb-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <FileText className="w-12 h-12" />
              <div>
                <h2 className="text-2xl font-bold mb-2">Validate Kafka Message Formats</h2>
                <p className="text-green-100">
                  Use our tools to validate JSON message schemas, generate message formats, and ensure your Kafka 
                  applications use correct data structures.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Link
                href="/?tab=schema"
                className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Schema Generator
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link
                href="/?tab=fixer"
                className="inline-flex items-center gap-2 bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
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

