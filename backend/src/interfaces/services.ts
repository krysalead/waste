export interface IServiceStatus {
  status: number;
  message: string;
}

export interface Config {
  server: {
    port: number;
    name: string;
    cors: string;
    url: string;
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
