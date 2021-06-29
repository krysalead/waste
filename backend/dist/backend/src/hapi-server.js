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
const hapi = require('@hapi/hapi');
const moment = require("moment");
const routes_1 = require("./routes");
const LoggingService_1 = require("./services/LoggingService");
const constants_1 = require("./constants");
const ioc_1 = require("./ioc");
const uuid_1 = require("uuid");
const CLSService_1 = require("./services/CLSService");
const logger = LoggingService_1.factory.getLogger('main.Server');
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
    request.id = uuid_1.v1();
    let color = methodColors[request.method.toLowerCase()];
    request.log([], `\x1b[1;${color}m${request.method}\x1b[0m ${request.path}`);
    return CLSService_1.middleware(req, res, function () {
        CLSService_1.set('reqId', request.id);
        reply.continue();
    });
};
const loggerExtension = (server, config) => __awaiter(void 0, void 0, void 0, function* () {
    // hook on request to assign a unique id to be propagated in all the requests
    logger.debug(`Traceid Setup`);
    server.ext('onRequest', traceIdHandler);
});
/**
 * Register the routes based on the TSOA routes.ts file generated
 * @param server Hapi server
 * @param config Application config
 */
const routes = (server, config) => {
    // Install core and functionnal routes
    logger.debug(`Register API routes`);
    routes_1.RegisterRoutes(server);
};
const stopServerFn = (server) => {
    return () => __awaiter(void 0, void 0, void 0, function* () {
        logger.info('Shutting down server');
        server.stop({ timeout: 10000 }).then(function (err) {
            logger.info('hapi server stopped');
        });
    });
};
module.exports = () => __awaiter(void 0, void 0, void 0, function* () {
    let d1 = Date.now();
    let config = ioc_1.iocContainer.get(constants_1.IOC_OBJECT_TYPES.ConfigService);
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
        init: () => __awaiter(void 0, void 0, void 0, function* () {
            logger.info(`Initialising server...`);
            yield server.initialize();
            return {
                stop: stopServerFn(server),
                server,
            };
        }),
        /**
         * This method is starting effectively the server
         * @returns
         */
        start: () => __awaiter(void 0, void 0, void 0, function* () {
            logger.debug(`Starting server...`);
            yield server.start();
            logger.info(`Server started in ${moment(Date.now()).diff(d1)}ms`);
            logger.info(`Listening at ${server.info.uri}`);
            return {
                stop: stopServerFn(server),
                server,
            };
        }),
    };
});
