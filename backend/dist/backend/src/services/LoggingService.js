"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.factory = void 0;
const typescript_logging_1 = require("typescript-logging");
const CLSService_1 = require("./CLSService");
const moment = require("moment");
const chalk_1 = require("chalk");
const constants_1 = require("../constants");
const ioc_1 = require("../ioc");
let config = ioc_1.iocContainer.get(constants_1.IOC_OBJECT_TYPES.ConfigService);
const messageFormatter = (message) => {
    const reqId = CLSService_1.get('reqId');
    const date = config.getConfig().logging.services === 'Debug'
        ? moment(message.date).format('YYYY-MM-DD HH:mm:ss,SSS')
        : '';
    let logLevel = typescript_logging_1.LogLevel[message.level].toUpperCase();
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
        requestId = '(' + chalk_1.default.gray(reqId) + ')';
    }
    let formatted = chalk_1.default `${date} {${color} ${logLevel}} ${requestId} [${loggerName[0]}][${loggerName[1]}] ${message.messageAsString}`;
    if (message.error) {
        formatted += '\n' + chalk_1.default.red(message.error.message);
    }
    return formatted;
};
let serviceRule = new typescript_logging_1.LogGroupRule(new RegExp('service.+'), typescript_logging_1.LogLevel[config.getConfig().logging.services]);
serviceRule.formatterLogMessage = messageFormatter;
let controlerRule = new typescript_logging_1.LogGroupRule(new RegExp('controller.+'), typescript_logging_1.LogLevel[config.getConfig().logging.controllers]);
controlerRule.formatterLogMessage = messageFormatter;
let generalRule = new typescript_logging_1.LogGroupRule(new RegExp('.+'), typescript_logging_1.LogLevel[config.getConfig().logging.general]);
generalRule.formatterLogMessage = messageFormatter;
// Create options instance and specify 2 LogGroupRules:
// * One for any logger with a name starting with model, to log on debug
// * The second one for anything else to log on info
const options = new typescript_logging_1.LoggerFactoryOptions()
    .addLogGroupRule(serviceRule)
    .addLogGroupRule(controlerRule)
    .addLogGroupRule(generalRule);
// Create a named loggerfactory and pass in the options and export the factory.
// Named is since version 0.2.+ (it's recommended for future usage)
exports.factory = typescript_logging_1.LFService.createNamedLoggerFactory('LoggerFactory', options);
