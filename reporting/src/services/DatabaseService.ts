import { createConnection } from 'typeorm';
import { Report } from '../entity/report';
import { config } from '../config/app';

let connection;

export class DatabaseService {
  static async getConnection() {
    if (!connection) {
      try {
        connection = await createConnection({
          type: 'postgres',
          host: config.database.host,
          port: config.database.port,
          username: config.database.username,
          password: config.database.password,
          database: config.database.name,
          entities: [Report],
          synchronize: true,
        });
      } catch (e) {
        console.error(e);
      }
    }
    return connection;
  }
}
