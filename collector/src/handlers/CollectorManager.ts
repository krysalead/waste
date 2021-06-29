import { Zone } from '../../../models/src/models/zone';
import { Kafka } from 'kafkajs';
import { config } from '../config/app';

export class CollectorManager {
  kafka;
  constructor() {
    this.kafka = new Kafka({
      clientId: config.broker.clientId,
      brokers: config.broker.list,
    });
  }

  async handleEvent(zone: Zone): Promise<String> {
    const producer = this.kafka.producer();

    await producer.connect();
    await producer.send({
      topic: config.broker.topic,
      messages: [{ event: 'collect', zone }],
    });

    await producer.disconnect();
    return '';
  }
}
