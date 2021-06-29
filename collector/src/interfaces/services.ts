export interface Config {
  broker: {
    list: [string];
    topic: string;
    groupId: string;
    clientId: string;
  };
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    name: string;
    channel: string;
  };
}
