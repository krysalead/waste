import { CollectorManager } from './handlers/CollectorManager';
import createSubscriber from 'pg-listen';
import { config } from './config/app';

export const server = () => {
  const collectorManager = new CollectorManager();
  // Accepts the same connection config object that the "pg" package would take
  const subscriber = createSubscriber({
    user: config.database.username,
    password: config.database.password,
    host: config.database.host,
    database: config.database.name,
    port: config.database.port,
  });
  subscriber.notifications.on(config.database.channel, (payload) => {
    // Payload as passed to subscriber.notify() (see below)
    console.info(
      `Received notification in '${config.database.channel}':`,
      payload
    );
    collectorManager.handleEvent(payload);
  });

  subscriber.events.on('error', (error) => {
    console.error('Fatal database connection error:', error);
    subscriber.close();
    process.exit(1);
  });
  return {
    start: async () => {
      console.info(`Connecting to database':`);
      await subscriber.connect();
      console.info(`Listening to channel ${config.database.channel}':`);
      await subscriber.listenTo(config.database.channel);
      return {
        stop: async () => {
          subscriber.close();
        },
      };
    },
  };
};
