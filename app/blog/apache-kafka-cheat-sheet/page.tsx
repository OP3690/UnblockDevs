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
  openGraph: {
    title: 'Apache Kafka Cheat Sheet',
    description: 'Apache Kafka cheat sheet: CLI commands, config, producer/consumer examples,',
    type: 'article',
    url: 'https://unblockdevs.com/blog/apache-kafka-cheat-sheet',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Apache%20Kafka%20Cheat%20Sheet&emoji=%F0%9F%93%A1&desc=Apache%20Kafka%20cheat%20sheet%3A%20CLI%20commands%2C%20config%2C%20producer/consumer%20examples%2C', width: 1200, height: 630, alt: 'Apache Kafka Cheat Sheet — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apache Kafka Cheat Sheet',
    description: 'Apache Kafka cheat sheet: CLI commands, config, producer/consumer examples,',
    images: ['https://unblockdevs.com/api/og?title=Apache%20Kafka%20Cheat%20Sheet&emoji=%F0%9F%93%A1&desc=Apache%20Kafka%20cheat%20sheet%3A%20CLI%20commands%2C%20config%2C%20producer/consumer%20examples%2C'],
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/apache-kafka-cheat-sheet' },

};

export default function ApacheKafkaCheatSheet() {
  return <ApacheKafkaCheatSheetClient />;
}

