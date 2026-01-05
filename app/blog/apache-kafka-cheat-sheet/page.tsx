import type { Metadata } from 'next';
import ApacheKafkaCheatSheetClient from './client';

export const metadata: Metadata = {
  title: 'Apache Kafka Cheat Sheet: Commands, Configuration & Best Practices | UnblockDevs',
  description: 'Complete Apache Kafka cheat sheet: CLI commands, configuration, producer/consumer examples, troubleshooting, and best practices. Quick reference for Kafka developers.',
  keywords: [
    'kafka cheat sheet',
    'kafka commands',
    'kafka cli',
    'kafka configuration',
    'kafka producer consumer',
    'kafka tutorial',
    'kafka best practices'
  ],
};

export default function ApacheKafkaCheatSheet() {
  return <ApacheKafkaCheatSheetClient />;
}

