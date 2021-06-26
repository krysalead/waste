// TODO: Replace this with HAPI middleware stuff
/* tslint:disable */
import { Controller, ValidateParam, FieldErrors, ValidateError, TsoaRoute } from 'tsoa';
import { iocContainer } from './ioc';

const models: TsoaRoute.Models = {
};

export function RegisterRoutes(server: any) {


    function promiseHandler(controllerObj: any, promise: any, request: any, reply: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                const response = data ? reply(data).code(200) : reply("").code(204);

                if (controllerObj instanceof Controller) {
                    const controller = controllerObj as Controller
                    const headers = controller.getHeaders();
                    Object.keys(headers).forEach((name: string) => {
                        response.header(name, headers[name]);
                    });

                    const statusCode = controller.getStatus();
                    if (statusCode) {
                        response.code(statusCode);
                    }
                }
                return response;
            })
            .catch((error: any) => reply(error).code(error.status || 500));
    }

    function getValidatedArgs(args: any, request: any): any[] {
        const errorFields: FieldErrors = {};
        const values = Object.keys(args).map(key => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return ValidateParam(args[key], request.query[name], models, name, errorFields)
                case 'path':
                    return ValidateParam(args[key], request.params[name], models, name, errorFields)
                case 'header':
                    return ValidateParam(args[key], request.headers[name], models, name, errorFields);
                case 'body':
                    return ValidateParam(args[key], request.payload, models, name, errorFields, name + '.');
                case 'body-prop':
                    return ValidateParam(args[key], request.payload[name], models, name, errorFields, 'body.');
            }
        });
        if (Object.keys(errorFields).length > 0) {
            throw new ValidateError(errorFields, '');
        }
        return values;
    }
}