"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const ioc_1 = require("../ioc");
const constants_1 = require("../constants");
const app_1 = require("../config/app");
let ConfigService = class ConfigService {
    constructor() {
        this.config = app_1.config;
        console.log('----------> Config loaded: ', app_1.config);
    }
    getConfig() {
        return this.config;
    }
    getUIEntrypoint(subdomain) {
        let url = this.getConfig().server.url;
        if (subdomain) {
            return url.replace('calculator', subdomain).replace('beta', subdomain);
        }
        else {
            return url;
        }
    }
};
ConfigService = __decorate([
    ioc_1.provideSingleton(constants_1.IOC_OBJECT_TYPES.ConfigService),
    __metadata("design:paramtypes", [])
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=ConfigService.js.map