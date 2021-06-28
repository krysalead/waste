"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./iocRegistration");
const hapi = require('hapi');
const moment = require("moment");
const routes_1 = require("./routes");
const LoggingService_1 = require("./services/LoggingService");
const constants_1 = require("./constants");
const ioc_1 = require("./ioc");
const uuid_1 = require("uuid");
const CLSService_1 = require("./services/CLSService");
const logger = LoggingService_1.factory.getLogger('main.Server');
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
const startService = () => __awaiter(void 0, void 0, void 0, function* () {
    let config = ioc_1.iocContainer.get(constants_1.IOC_OBJECT_TYPES.ConfigService);
    logger.debug(`Service startup ${config.getConfig().server.port}`);
});
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    let d1 = Date.now();
    let config = ioc_1.iocContainer.get(constants_1.IOC_OBJECT_TYPES.ConfigService);
    logger.debug(`Server setup ${config.getConfig().server.port}`);
    server.connection({
        port: config.getConfig().server.port,
        labels: config.getConfig().server.name,
    });
    server.ext('onPreResponse', CORS(config.getConfig().server.cors, logger));
    // Install logger
    logger.debug(`Query logger setup`);
    yield server.register({
        register: require('good'),
        options: goodOptions,
    });
    // Install core and functionnal routes
    logger.debug(`Register API routes`);
    routes_1.RegisterRoutes(server);
    // Start permanent services like database
    yield startService();
    // Hook on each request to add a unique id for each transaction
    logger.debug(`Traceid Setup`);
    server.ext({
        type: 'onRequest',
        method: function (request, reply) {
            const { req, res } = request.raw;
            request.id = uuid_1.v1();
            const methodColors = {
                get: 32,
                delete: 31,
                put: 36,
                post: 33,
                options: 34,
            };
            let color = methodColors[request.method.toLowerCase()];
            request.log([], `\x1b[1;${color}m${request.method}\x1b[0m ${request.path}`);
            return CLSService_1.middleware(req, res, function () {
                CLSService_1.set('reqId', request.id);
                reply.continue();
            });
        },
    });
    try {
        logger.debug(`Starting server...`);
        yield server.start();
        let d2 = Date.now();
        let diffInSecond = moment(d2).diff(d1);
        logger.info(`Server running at ${server.info.uri} in ${diffInSecond}ms`);
    }
    catch (err) {
        logger.error('Fail to start server', err);
        setTimeout(() => {
            process.exit(1);
        }, 100);
    }
});
const stop = () => __awaiter(void 0, void 0, void 0, function* () {
    logger.info('Shutting down server');
    server.stop({ timeout: 10000 }).then(function (err) {
        logger.info('hapi server stopped');
        process.exit(err ? 1 : 0);
    });
});
module.exports = {
    init: init,
    stop: stop,
};
