export interface IServiceStatus {
  status: number;
  message: string;
}

export interface Config {
  server: {
    port: number;
    cors: string;
  };
  service: {
    reporting: string;
    statistics: string;
  };
  logging: {
    services: string;
    controllers: string;
    general: string;
  };
}

export interface IConfigService {
  getConfig(): Config;
}
