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
var ReportController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const Controller_1 = require("./Controller");
const ioc_1 = require("../ioc");
const tsoa_1 = require("tsoa");
const LoggingService_1 = require("../services/LoggingService");
const axios_1 = require("axios");
const logger = LoggingService_1.factory.getLogger('controller.report');
const app_1 = require("../config/app");
const constants_1 = require("../constants");
let ReportController = ReportController_1 = class ReportController extends Controller_1.Controller {
    constructor() {
        super();
        this.setLogger(logger);
    }
    getReports() {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('getReports');
            try {
                // Get the reports from the reports Microservice
                const response = yield axios_1.default.get(`${app_1.config.service.reporting}/`);
                return {
                    status: constants_1.CORE_ERROR_CODES.REQUEST_OK,
                    message: '',
                    data: response.data,
                };
            }
            catch (error) {
                logger.error('Failed to get the reports', error);
                return {
                    status: constants_1.CORE_ERROR_CODES.SERVICE_FAILURE,
                    message: error,
                    data: [],
                };
            }
        });
    }
    getReport(reportId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('getReport');
            return {
                status: 0,
                message: '',
                data: {
                    handled: false,
                    wasteType: 'cloth',
                    location: {
                        type: 'Point',
                        coordinates: [43.6166482, 7.0357972],
                    },
                },
            };
        });
    }
    addReport(postReportResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            logger.info('addReport');
            return {
                status: 0,
                message: '',
                data: {
                    handled: false,
                    wasteType: 'cloth',
                    location: {
                        type: 'Point',
                        coordinates: [43.6166482, 7.0357972],
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
                handled: false,
                wasteType: 'cloth',
                location: {
                    type: 'Point',
                    coordinates: [43.6166482, 7.0357972],
                },
            },
        ],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReports", null);
__decorate([
    tsoa_1.Get('{reportId}'),
    tsoa_1.Example({
        status: 0,
        message: '',
        data: [
            {
                handled: false,
                wasteType: 'cloth',
                location: {
                    type: 'Point',
                    coordinates: [43.6166482, 7.0357972],
                },
            },
        ],
    }),
    __param(0, tsoa_1.Path('reportId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getReport", null);
__decorate([
    tsoa_1.Post(),
    tsoa_1.Example({
        status: 0,
        message: '',
        data: {
            handled: false,
            wasteType: 'cloth',
            location: {
                type: 'Point',
                coordinates: [43.6166482, 7.0357972],
            },
        },
    }),
    __param(0, tsoa_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "addReport", null);
ReportController = ReportController_1 = __decorate([
    tsoa_1.Route('report'),
    ioc_1.provide(ReportController_1),
    __metadata("design:paramtypes", [])
], ReportController);
exports.ReportController = ReportController;
