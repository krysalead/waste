"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = void 0;
/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const runtime_1 = require("@tsoa/runtime");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const ReportController_1 = require("./controllers/ReportController");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const ZoneController_1 = require("./controllers/ZoneController");
const ioc_1 = require("./ioc");
const boom_1 = require("@hapi/boom");
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
const models = {
    "Position": {
        "dataType": "refAlias",
        "type": { "dataType": "array", "array": { "dataType": "double" }, "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GeoJsonTypes": {
        "dataType": "refAlias",
        "type": { "dataType": "union", "subSchemas": [{ "dataType": "enum", "enums": ["Point"] }, { "dataType": "enum", "enums": ["MultiPoint"] }, { "dataType": "enum", "enums": ["LineString"] }, { "dataType": "enum", "enums": ["MultiLineString"] }, { "dataType": "enum", "enums": ["Polygon"] }, { "dataType": "enum", "enums": ["MultiPolygon"] }, { "dataType": "enum", "enums": ["GeometryCollection"] }, { "dataType": "enum", "enums": ["Feature"] }, { "dataType": "enum", "enums": ["FeatureCollection"] }], "validators": {} },
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Point": {
        "dataType": "refObject",
        "properties": {
            "type": { "dataType": "enum", "enums": ["Point"], "required": true },
            "coordinates": { "ref": "Position", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Report": {
        "dataType": "refObject",
        "properties": {
            "handled": { "dataType": "boolean" },
            "wasteType": { "dataType": "string", "required": true },
            "location": { "ref": "Point", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ListReportResponse": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "double", "required": true },
            "message": { "dataType": "string", "required": true },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Report" }, "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetReportResponse": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "double", "required": true },
            "message": { "dataType": "string", "required": true },
            "data": { "ref": "Report", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PostReportResponse": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "double", "required": true },
            "message": { "dataType": "string", "required": true },
            "data": { "ref": "Report", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PostReportRequest": {
        "dataType": "refObject",
        "properties": {
            "handled": { "dataType": "boolean" },
            "wasteType": { "dataType": "string", "required": true },
            "location": { "ref": "Point", "required": true },
            "data": { "ref": "Report", "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Polygon": {
        "dataType": "refObject",
        "properties": {
            "type": { "dataType": "enum", "enums": ["Polygon"], "required": true },
            "coordinates": { "dataType": "array", "array": { "dataType": "array", "array": { "dataType": "refAlias", "ref": "Position" } }, "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Zone": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "geometry": { "ref": "Polygon", "required": true },
            "stats": { "dataType": "nestedObjectLiteral", "nestedProperties": { "frequency": { "dataType": "double", "required": true }, "wasteType": { "dataType": "string", "required": true } }, "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ListZoneResponse": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "double", "required": true },
            "message": { "dataType": "string", "required": true },
            "data": { "dataType": "array", "array": { "dataType": "refObject", "ref": "Zone" }, "required": true },
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GetZoneResponse": {
        "dataType": "refObject",
        "properties": {
            "status": { "dataType": "double", "required": true },
            "message": { "dataType": "string", "required": true },
            "data": { "ref": "Zone", "required": true },
        },
        "additionalProperties": true,
    },
};
const validationService = new runtime_1.ValidationService(models);
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
function RegisterRoutes(server) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
    server.route({
        method: 'get',
        path: '/v1/report',
        options: {
            pre: [],
            handler: function ReportController_getReports(request, h) {
                const args = {};
                let validatedArgs = [];
                try {
                    validatedArgs = getValidatedArgs(args, request, h);
                }
                catch (error) {
                    if (boom_1.isBoom(error)) {
                        throw error;
                    }
                    const boomErr = boom_1.boomify(error instanceof Error ? error : new Error(error.message));
                    boomErr.output.statusCode = error.status || 500;
                    boomErr.output.payload = {
                        name: error.name,
                        fields: error.fields,
                        message: error.message,
                    };
                    throw boomErr;
                }
                const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
                const controller = container.get(ReportController_1.ReportController);
                if (typeof controller['setStatus'] === 'function') {
                    controller.setStatus(undefined);
                }
                const promise = controller.getReports.apply(controller, validatedArgs);
                return promiseHandler(controller, promise, request, undefined, h);
            }
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    server.route({
        method: 'get',
        path: '/v1/report/{reportId}',
        options: {
            pre: [],
            handler: function ReportController_getReport(request, h) {
                const args = {
                    reportId: { "in": "path", "name": "reportId", "required": true, "dataType": "string" },
                };
                let validatedArgs = [];
                try {
                    validatedArgs = getValidatedArgs(args, request, h);
                }
                catch (error) {
                    if (boom_1.isBoom(error)) {
                        throw error;
                    }
                    const boomErr = boom_1.boomify(error instanceof Error ? error : new Error(error.message));
                    boomErr.output.statusCode = error.status || 500;
                    boomErr.output.payload = {
                        name: error.name,
                        fields: error.fields,
                        message: error.message,
                    };
                    throw boomErr;
                }
                const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
                const controller = container.get(ReportController_1.ReportController);
                if (typeof controller['setStatus'] === 'function') {
                    controller.setStatus(undefined);
                }
                const promise = controller.getReport.apply(controller, validatedArgs);
                return promiseHandler(controller, promise, request, undefined, h);
            }
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    server.route({
        method: 'post',
        path: '/v1/report',
        options: {
            pre: [],
            handler: function ReportController_addReport(request, h) {
                const args = {
                    postReportResponse: { "in": "body", "name": "postReportResponse", "required": true, "ref": "PostReportRequest" },
                };
                let validatedArgs = [];
                try {
                    validatedArgs = getValidatedArgs(args, request, h);
                }
                catch (error) {
                    if (boom_1.isBoom(error)) {
                        throw error;
                    }
                    const boomErr = boom_1.boomify(error instanceof Error ? error : new Error(error.message));
                    boomErr.output.statusCode = error.status || 500;
                    boomErr.output.payload = {
                        name: error.name,
                        fields: error.fields,
                        message: error.message,
                    };
                    throw boomErr;
                }
                const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
                const controller = container.get(ReportController_1.ReportController);
                if (typeof controller['setStatus'] === 'function') {
                    controller.setStatus(undefined);
                }
                const promise = controller.addReport.apply(controller, validatedArgs);
                return promiseHandler(controller, promise, request, undefined, h);
            }
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    server.route({
        method: 'get',
        path: '/v1/stats',
        options: {
            pre: [],
            handler: function ZoneController_getZonesStatistics(request, h) {
                const args = {};
                let validatedArgs = [];
                try {
                    validatedArgs = getValidatedArgs(args, request, h);
                }
                catch (error) {
                    if (boom_1.isBoom(error)) {
                        throw error;
                    }
                    const boomErr = boom_1.boomify(error instanceof Error ? error : new Error(error.message));
                    boomErr.output.statusCode = error.status || 500;
                    boomErr.output.payload = {
                        name: error.name,
                        fields: error.fields,
                        message: error.message,
                    };
                    throw boomErr;
                }
                const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
                const controller = container.get(ZoneController_1.ZoneController);
                if (typeof controller['setStatus'] === 'function') {
                    controller.setStatus(undefined);
                }
                const promise = controller.getZonesStatistics.apply(controller, validatedArgs);
                return promiseHandler(controller, promise, request, undefined, h);
            }
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    server.route({
        method: 'get',
        path: '/v1/stats/{reportId}',
        options: {
            pre: [],
            handler: function ZoneController_getZoneStatistics(request, h) {
                const args = {
                    reportId: { "in": "path", "name": "reportId", "required": true, "dataType": "string" },
                };
                let validatedArgs = [];
                try {
                    validatedArgs = getValidatedArgs(args, request, h);
                }
                catch (error) {
                    if (boom_1.isBoom(error)) {
                        throw error;
                    }
                    const boomErr = boom_1.boomify(error instanceof Error ? error : new Error(error.message));
                    boomErr.output.statusCode = error.status || 500;
                    boomErr.output.payload = {
                        name: error.name,
                        fields: error.fields,
                        message: error.message,
                    };
                    throw boomErr;
                }
                const container = typeof ioc_1.iocContainer === 'function' ? ioc_1.iocContainer(request) : ioc_1.iocContainer;
                const controller = container.get(ZoneController_1.ZoneController);
                if (typeof controller['setStatus'] === 'function') {
                    controller.setStatus(undefined);
                }
                const promise = controller.getZoneStatistics.apply(controller, validatedArgs);
                return promiseHandler(controller, promise, request, undefined, h);
            }
        }
    });
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function isController(object) {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }
    function promiseHandler(controllerObj, promise, request, successStatus, h) {
        return Promise.resolve(promise)
            .then((data) => {
            let statusCode = successStatus;
            let headers;
            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
            if (isController(controllerObj)) {
                headers = controllerObj.getHeaders();
                statusCode = controllerObj.getStatus() || statusCode;
            }
            return returnHandler(h, statusCode, data, headers);
            ;
        })
            .catch((error) => {
            if (boom_1.isBoom(error)) {
                throw error;
            }
            const boomErr = boom_1.boomify(error instanceof Error ? error : new Error(error.message));
            boomErr.output.statusCode = error.status || 500;
            boomErr.output.payload = {
                name: error.name,
                message: error.message,
            };
            throw boomErr;
        });
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function returnHandler(h, statusCode, data, headers = {}) {
        if (h.__isTsoaResponded) {
            return h.__isTsoaResponded;
        }
        let response = data !== null && data !== undefined
            ? h.response(data).code(200)
            : h.response("").code(204);
        Object.keys(headers).forEach((name) => {
            response.header(name, headers[name]);
        });
        if (statusCode) {
            response.code(statusCode);
        }
        h.__isTsoaResponded = response;
        return response;
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function getValidatedArgs(args, request, h) {
        const errorFields = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, errorFields, undefined, { "noImplicitAdditionalProperties": "ignore" });
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, errorFields, undefined, { "noImplicitAdditionalProperties": "ignore" });
                case 'header':
                    return validationService.ValidateParam(args[key], request.headers[name], name, errorFields, undefined, { "noImplicitAdditionalProperties": "ignore" });
                case 'body':
                    return validationService.ValidateParam(args[key], request.payload, name, errorFields, undefined, { "noImplicitAdditionalProperties": "ignore" });
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.payload[name], name, errorFields, 'body.', { "noImplicitAdditionalProperties": "ignore" });
                case 'formData':
                    return validationService.ValidateParam(args[key], request.payload[name], name, errorFields, undefined, { "noImplicitAdditionalProperties": "ignore" });
                case 'res':
                    return responder(h);
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new runtime_1.ValidateError(errorFields, '');
        }
        return values;
    }
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    function responder(h) {
        return function (status, data, headers) {
            returnHandler(h, status, data, headers);
        };
    }
    ;
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}
exports.RegisterRoutes = RegisterRoutes;
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
//# sourceMappingURL=routes.js.map