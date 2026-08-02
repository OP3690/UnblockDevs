import type { Metadata } from 'next';
import ApacheKafkaCheatSheetClient from './client';

export const metadata: Metadata = {
  title: 'Apache Kafka Cheat Sheet: Commands & Quick Reference | UnblockDevs',
  description: 'Apache Kafka cheat sheet: CLI commands, producer/consumer configs, topic management, troubleshooting, and best practices. Quick reference for Kafka developers.',
  keywords: [
    'kafka cheat sheet',
    'kafka commands',
    'kafka cli',
    'kafka configuration',
    'kafka producer consumer',
    'kafka tutorial',
    'kafka best practices',
    'kafka topic commands',
    'kafka quick reference',
    'kafka troubleshooting',
    'apache kafka commands list'
  ],
  openGraph: {
    title: 'Apache Kafka Cheat Sheet: CLI Commands, Config & Quick Reference',
    description: 'Your go-to Apache Kafka quick reference — CLI commands, producer and consumer configs, topic management, troubleshooting tips, and best practices. Bookmark this Kafka cheat sheet for everyday use.',
    type: 'article',
    publishedTime: '2025-01-25T00:00:00Z',
    authors: ['UnblockDevs'],
    url: 'https://unblockdevs.com/blog/apache-kafka-cheat-sheet',
    images: [{ url: 'https://unblockdevs.com/api/og?title=Apache%20Kafka%20Cheat%20Sheet&emoji=%F0%9F%93%9D&desc=Apache%20Kafka%20cheat%20sheet%3A%20CLI%20commands%2C%20config%2C%20producer%2Fconsumer%20examples%2C%20trou', width: 1200, height: 630, alt: 'Apache Kafka Cheat Sheet — UnblockDevs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apache Kafka Cheat Sheet: Commands & Quick Reference',
    description: 'Apache Kafka quick reference: CLI commands, configs, producer/consumer examples, and troubleshooting tips. Everything you need in one place.',
  },
  alternates: { canonical: 'https://unblockdevs.com/blog/apache-kafka-cheat-sheet' },

};

export default function ApacheKafkaCheatSheet() {
  return <ApacheKafkaCheatSheetClient />;
}

