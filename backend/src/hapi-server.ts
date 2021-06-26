import './iocRegistration';
const hapi = require('hapi');
import * as moment from 'moment';
import { RegisterRoutes } from './routes';
import { factory } from './services/LoggingService';
import { IConfigService } from './interfaces/services';
import { IOC_OBJECT_TYPES } from './constants';
import { iocContainer } from './ioc';
import { v1 as uuidv1 } from 'uuid';
import { set, middleware } from './services/CLSService';
const logger = factory.getLogger('main.Server');
const server = new hapi.Server({});
const CORS = require('hapi-cors-headers');

/**
 * Configuration for request logger
 */
const goodOptions = {
  reporters: {
    EventReporter: [
      {
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{ response: '*', request: '*' }],
      },
      {
        module: 'good-console',
      },
      'stdout',
    ],
  },
};

/**
 * Start all the services
 */
const startService = async () => {
  let config: IConfigService = iocContainer.get(IOC_OBJECT_TYPES.ConfigService);
  logger.debug(`Service startup ${config.getConfig().server.port}`);
};

const init = async () => {
  let d1 = Date.now();
  let config: IConfigService = iocContainer.get(IOC_OBJECT_TYPES.ConfigService);
  logger.debug(`Server setup ${config.getConfig().server.port}`);
  server.connection({
    port: config.getConfig().server.port,
    labels: config.getConfig().server.name,
  });
  server.ext('onPreResponse', CORS(config.getConfig().server.cors, logger));
  // Install logger
  logger.debug(`Query logger setup`);
  await server.register({
    register: require('good'),
    options: goodOptions,
  });
  // Install core and functionnal routes
  logger.debug(`Register API routes`);
  RegisterRoutes(server);
  // Start permanent services like database
  await startService();
  // Hook on each request to add a unique id for each transaction
  logger.debug(`Traceid Setup`);
  server.ext({
    type: 'onRequest',
    method: function (request, reply) {
      const { req, res } = request.raw;
      request.id = uuidv1();
      const methodColors = {
        get: 32,
        delete: 31,
        put: 36,
        post: 33,
        options: 34,
      };
      let color = methodColors[request.method.toLowerCase()];
      request.log(
        [],
        `\x1b[1;${color}m${request.method}\x1b[0m ${request.path}`
      );
      return middleware(req, res, function () {
        set('reqId', request.id);
        reply.continue();
      });
    },
  });
  try {
    logger.debug(`Starting server...`);
    await server.start();
    let d2 = Date.now();
    let diffInSecond = moment(d2).diff(d1);
    logger.info(`Server running at ${server.info.uri} in ${diffInSecond}ms`);
  } catch (err) {
    logger.error('Fail to start server', err);
    setTimeout(() => {
      process.exit(1);
    }, 100);
  }
};

const stop = async () => {
  logger.info('Shutting down server');
  server.stop({ timeout: 10000 }).then(function (err) {
    logger.info('hapi server stopped');
    process.exit(err ? 1 : 0);
  });
};
module.exports = {
  init: init,
  stop: stop,
};
