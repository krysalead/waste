import { Config } from '../interfaces/services';

export const config: Config = {
  server: {
    port: +process.env.PORT || 4000,
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'admin',
    name: process.env.DB_NAME || 'test',
  },
};
