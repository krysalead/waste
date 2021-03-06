import { Config } from '../interfaces/services';

export const config: Config = {
  server: {
    port: +process.env.PORT || 4000,
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '%4CR1DBPa55eW0rd$',
    name: process.env.DB_NAME || 'test',
  },
};
