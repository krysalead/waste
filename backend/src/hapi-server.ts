import './iocRegistration';
const hapi = require('@hapi/hapi');
import * as moment from 'moment';
import { RegisterRoutes } from './routes';
import { factory } from './services/LoggingService';
import { IConfigService } from './interfaces/services';
import { IOC_OBJECT_TYPES } from './constants';
import { iocContainer } from './ioc';
import { v1 as uuidv1 } from 'uuid';
import { set, middleware } from './services/CLSService';
const logger = factory.getLogger('main.Server');
const CORS = require('hapi-cors-headers');

const methodColors = {
  get: 32,
  delete: 31,
  put: 36,
  post: 33,
  options: 34,
};

/**
 * Allows cors in request to be called from a UI on a different domain
 * @param server
 * @param config
 */
const corsExtension = (server, config) => {
  logger.debug(`CORS setup ${config.getConfig().server.cors}`);
  server.ext('onPreResponse', CORS);
};

/**
 * Middleware that enhance the request with a unique id
 * @param request
 * @param reply
 * @returns
 */
const traceIdHandler = (request, reply) => {
  const { req, res } = request.raw;
  request.id = uuidv1();
  let color = methodColors[request.method.toLowerCase()];
  request.log([], `\x1b[1;${color}m${request.method}\x1b[0m ${request.path}`);
  return middleware(req, res, function () {
    set('reqId', request.id);
    reply.continue();
  });
};

const loggerExtension = async (server, config) => {
  // hook on request to assign a unique id to be propagated in all the requests
  logger.debug(`Traceid Setup`);
  server.ext('onRequest', traceIdHandler);
};

/**
 * Register the routes based on the TSOA routes.ts file generated
 * @param server Hapi server
 * @param config Application config
 */
const routes = (server, config) => {
  // Install core and functionnal routes
  logger.debug(`Register API routes`);
  RegisterRoutes(server);
};

const stopServerFn = (server) => {
  return async () => {
    logger.info('Shutting down server');
    server.stop({ timeout: 10000 }).then(function (err) {
      logger.info('hapi server stopped');
    });
  };
};

module.exports = async () => {
  let d1 = Date.now();
  let config: IConfigService = iocContainer.get(IOC_OBJECT_TYPES.ConfigService);
  logger.debug(`Server port ${config.getConfig().server.port}`);
  const server = hapi.Server({
    port: config.getConfig().server.port,
    host: 'localhost',
  });

  // uncomment if we need to have a UI connected
  // corsExtension(server, config);
  // await loggerExtension(server, config);
  routes(server, config);

  /** return an object with possible action like a chain of command */
  return {
    /**
     * This method will only initialised the server without having it running for real
     * @returns hapi server
     */
    init: async () => {
      logger.info(`Initialising server...`);
      await server.initialize();
      return {
        stop: stopServerFn(server),
        server,
      };
    },
    /**
     * This method is starting effectively the server
     * @returns
     */
    start: async () => {
      logger.debug(`Starting server...`);
      await server.start();
      logger.info(`Server started in ${moment(Date.now()).diff(d1)}ms`);
      logger.info(`Listening at ${server.info.uri}`);
      return {
        stop: stopServerFn(server),
        server,
      };
    },
  };
};
