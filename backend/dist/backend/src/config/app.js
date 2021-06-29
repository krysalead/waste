"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    server: {
        port: +process.env.PORT || 4000,
        cors: process.env.CORS || 'http://localhost:3000',
    },
    service: {
        reporting: process.env.REPORTING_SRV_URL || 'reporting',
        statistics: process.env.REPORTING_SRV_URL || 'staticistics',
    },
    logging: {
        services: process.env.LOGGING_SERVICES || 'Info',
        controllers: process.env.LOGGING_CONTROLLERS || 'Info',
        general: process.env.LOGGING_GENERAL || 'Info',
    },
};
