import type { Metadata } from 'next';
import ApacheKafkaCheatSheetClient from './client';

export const metadata: Metadata = {
  title: 'Apache Kafka Cheat Sheet | UnblockDevs',
  description: 'Apache Kafka cheat sheet: CLI commands, config, producer/consumer examples, troubleshooting. Quick reference.',
  keywords: [
    'kafka cheat sheet',
    'kafka commands',
    'kafka cli',
    'kafka configuration',
    'kafka producer consumer',
    'kafka tutorial',
    'kafka best practices'
  ],
  alternates: { canonical: 'https://unblockdevs.com/blog/apache-kafka-cheat-sheet' },

};

export default function ApacheKafkaCheatSheet() {
  return <ApacheKafkaCheatSheetClient />;
}

