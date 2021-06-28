"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const tsoa_1 = require("tsoa");
class Controller extends tsoa_1.Controller {
    constructor(logger) {
        super();
        this.logger = logger;
    }
    /**
     * Generate a log for a call to a service that failed, return the status with proper code and message
     * @param e
     */
    generateServiceFailureStatus(e, title) {
        this.logger.error('Failed to call service - ' + title);
        if (e.code) {
            this.logger.error(`Caused by "${e.message} [${e.code}]"`);
            // Functional error
            return {
                status: e.code,
                message: e.message,
            };
        }
        else {
            this.logger.error('Caused by', e);
            this.logger.error(e.stack);
            return {
                status: -1,
                message: 'Service call failed, contact admin',
            };
        }
    }
}
exports.Controller = Controller;
