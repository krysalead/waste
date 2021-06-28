import { provideSingleton } from '../ioc';

import { IOC_OBJECT_TYPES } from '../constants';
// Load from the user definition
import { Config } from '../interfaces/services';

import { config as applicationConfig } from '../config/app';
import { IConfigService } from '../interfaces/services';

@provideSingleton(IOC_OBJECT_TYPES.ConfigService)
export class ConfigService implements IConfigService {
  config: Config;
  constructor() {
    this.config = applicationConfig;
    // console.log('----------> Config loaded: ', applicationConfig);
  }
  getConfig(): Config {
    return this.config;
  }
}
