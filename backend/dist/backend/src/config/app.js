"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    server: {
        port: +process.env.PORT || 4000,
        name: process.env.NAME || 'main',
        cors: process.env.CORS || 'http://localhost:3000',
        url: process.env.SERVER_URL || 'http://localhost:3000',
    },
    logging: {
        services: process.env.LOGGING_SERVICES || 'Info',
        controllers: process.env.LOGGING_CONTROLLERS || 'Info',
        general: process.env.LOGGING_GENERAL || 'Info',
    },
};
//# sourceMappingURL=app.js.map