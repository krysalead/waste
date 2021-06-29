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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var ZoneController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneController = void 0;
const Controller_1 = require("./Controller");
const ioc_1 = require("../ioc");
const tsoa_1 = require("tsoa");
const LoggingService_1 = require("../services/LoggingService");
const logger = LoggingService_1.factory.getLogger('controller.zone');
let ZoneController = ZoneController_1 = class ZoneController extends Controller_1.Controller {
    constructor() {
        super();
        this.setLogger(logger);
    }
    getZonesStatistics() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: 0,
                message: '',
                data: [
                    {
                        name: 'string',
                        geometry: {
                            type: 'Polygon',
                            coordinates: [
                                [
                                    [43.6166482, 7.0357972],
                                    [43.6166482, 7.0357972],
                                ],
                            ],
                        },
                        stats: {
                            wasteType: 'string',
                            frequency: 1,
                        },
                    },
                ],
            };
        });
    }
    getZoneStatistics(reportId) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                status: 0,
                message: '',
                data: {
                    name: 'string',
                    geometry: {
                        type: 'Polygon',
                        coordinates: [
                            [
                                [43.6166482, 7.0357972],
                                [43.6166482, 7.0357972],
                            ],
                        ],
                    },
                    stats: {
                        wasteType: 'string',
                        frequency: 1,
                    },
                },
            };
        });
    }
};
__decorate([
    tsoa_1.Get(),
    tsoa_1.Example({
        status: 0,
        message: '',
        data: [
            {
                name: 'string',
                geometry: {
                    type: 'Polygon',
                    coordinates: [
                        [
                            [43.6166482, 7.0357972],
                            [43.6166482, 7.0357972],
                        ],
                    ],
                },
                stats: {
                    wasteType: 'string',
                    frequency: 1,
                },
            },
        ],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ZoneController.prototype, "getZonesStatistics", null);
__decorate([
    tsoa_1.Get('{reportId}'),
    tsoa_1.Example({
        status: 0,
        message: '',
        data: {
            name: 'string',
            geometry: {
                type: 'Polygon',
                coordinates: [
                    [
                        [43.6166482, 7.0357972],
                        [43.6166482, 7.0357972],
                    ],
                ],
            },
            stats: {
                wasteType: 'string',
                frequency: 1,
            },
        },
    }),
    __param(0, tsoa_1.Path('reportId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ZoneController.prototype, "getZoneStatistics", null);
ZoneController = ZoneController_1 = __decorate([
    tsoa_1.Route('stats'),
    ioc_1.provide(ZoneController_1),
    __metadata("design:paramtypes", [])
], ZoneController);
exports.ZoneController = ZoneController;
