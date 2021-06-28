"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provideSingleton = exports.provideNamed = exports.fluentProvider = exports.provide = exports.iocContainer = exports.inject = exports.autoProvide = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
Object.defineProperty(exports, "inject", { enumerable: true, get: function () { return inversify_1.inject; } });
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
Object.defineProperty(exports, "autoProvide", { enumerable: true, get: function () { return inversify_binding_decorators_1.autoProvide; } });
const tsoa_1 = require("tsoa");
inversify_1.decorate(inversify_1.injectable(), tsoa_1.Controller);
exports.iocContainer = new inversify_1.Container();
exports.provide = inversify_binding_decorators_1.makeProvideDecorator(exports.iocContainer);
exports.fluentProvider = inversify_binding_decorators_1.makeFluentProvideDecorator(exports.iocContainer);
exports.provideNamed = function (identifier, name) {
    return exports.fluentProvider(identifier)
        .whenTargetNamed(name)
        .done();
};
exports.provideSingleton = function (identifier) {
    return exports.fluentProvider(identifier)
        .inSingletonScope()
        .done();
};
