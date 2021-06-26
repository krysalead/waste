import {
  LoggerFactoryOptions,
  LFService,
  LogGroupRule,
  LogLevel,
  LogMessage,
} from 'typescript-logging';
import { get } from './CLSService';

import * as moment from 'moment';
import Chalk from 'chalk';

import { IConfigService } from '../interfaces/services';
import { IOC_OBJECT_TYPES } from '../constants';
import { iocContainer } from '../ioc';
let config: IConfigService = iocContainer.get(IOC_OBJECT_TYPES.ConfigService);

console.log(
  '----------> Log level services: ',
  config.getConfig().logging.services
);
console.log(
  '----------> Log level controllers: ',
  config.getConfig().logging.controllers
);
console.log(
  '----------> Log level general: ',
  config.getConfig().logging.general
);

const messageFormatter = (message: LogMessage) => {
  const reqId = get('reqId');
  const date =
    config.getConfig().logging.services === 'Debug'
      ? moment(message.date).format('YYYY-MM-DD HH:mm:ss,SSS')
      : '';
  let logLevel = LogLevel[message.level].toUpperCase();
  let color = 'red';
  switch (logLevel) {
    case 'INFO':
      color = 'blue';
      logLevel += ' ';
      break;
    case 'DEBUG':
      color = 'green';
      break;
    case 'WARN':
      color = 'yellow';
      logLevel += ' ';
      break;
    case 'ERROR':
      color = 'red';
      logLevel += '';
      break;
    default:
      color = 'white';
      logLevel += '';
  }
  const loggerName = message.loggerName.split('.');
  let requestId = '';
  if (reqId) {
    requestId = '(' + Chalk.gray(reqId) + ')';
  }
  let formatted = Chalk`${date} {${color} ${logLevel}} ${requestId} [${loggerName[0]}][${loggerName[1]}] ${message.messageAsString}`;
  if (message.error) {
    formatted += '\n' + Chalk.red(message.error.message);
  }
  return formatted;
};

let serviceRule = new LogGroupRule(
  new RegExp('service.+'),
  LogLevel[config.getConfig().logging.services]
);

serviceRule.formatterLogMessage = messageFormatter;

let controlerRule = new LogGroupRule(
  new RegExp('controller.+'),
  LogLevel[config.getConfig().logging.controllers]
);
controlerRule.formatterLogMessage = messageFormatter;

let generalRule = new LogGroupRule(
  new RegExp('.+'),
  LogLevel[config.getConfig().logging.general]
);
generalRule.formatterLogMessage = messageFormatter;
// Create options instance and specify 2 LogGroupRules:
// * One for any logger with a name starting with model, to log on debug
// * The second one for anything else to log on info
const options = new LoggerFactoryOptions()
  .addLogGroupRule(serviceRule)
  .addLogGroupRule(controlerRule)
  .addLogGroupRule(generalRule);
// Create a named loggerfactory and pass in the options and export the factory.
// Named is since version 0.2.+ (it's recommended for future usage)
export const factory = LFService.createNamedLoggerFactory(
  'LoggerFactory',
  options
);
