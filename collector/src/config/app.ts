import { Config } from '../interfaces/services';

export const config: Config = {
  broker: {
    list: JSON.parse(process.env.BROKERS || '["kafka1:19092"]'),
    clientId: 'collector_manager',
    topic: process.env.TOPIC || 'drone-collect',
    groupId: process.env.GROUP_ID || 'test-group',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '%4CR1DBPa55eW0rd$',
    name: process.env.DB_NAME || 'test',
    channel: process.env.DB_CHANNEL || 'test-notification',
  },
};
