"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
// TODO: Replace this with HAPI middleware stuff
/* tslint:disable */
const tsoa_1 = require("tsoa");
const models = {};
function RegisterRoutes(server) {
    function promiseHandler(controllerObj, promise, request, reply) {
        return Promise.resolve(promise)
            .then((data) => {
            const response = data ? reply(data).code(200) : reply("").code(204);
            if (controllerObj instanceof tsoa_1.Controller) {
                const controller = controllerObj;
                const headers = controller.getHeaders();
                Object.keys(headers).forEach((name) => {
                    response.header(name, headers[name]);
                });
                const statusCode = controller.getStatus();
                if (statusCode) {
                    response.code(statusCode);
                }
            }
            return response;
        })
            .catch((error) => reply(error).code(error.status || 500));
    }
    function getValidatedArgs(args, request) {
        const errorFields = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return tsoa_1.ValidateParam(args[key], request.query[name], models, name, errorFields);
                case 'path':
                    return tsoa_1.ValidateParam(args[key], request.params[name], models, name, errorFields);
                case 'header':
                    return tsoa_1.ValidateParam(args[key], request.headers[name], models, name, errorFields);
                case 'body':
                    return tsoa_1.ValidateParam(args[key], request.payload, models, name, errorFields, name + '.');
                case 'body-prop':
                    return tsoa_1.ValidateParam(args[key], request.payload[name], models, name, errorFields, 'body.');
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new tsoa_1.ValidateError(errorFields, '');
        }
        return values;
    }
}
exports.RegisterRoutes = RegisterRoutes;
//# sourceMappingURL=routes.js.map