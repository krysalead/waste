"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportHandler = void 0;
const DatabaseService_1 = require("../services/DatabaseService");
const report_1 = require("../entity/report");
class ReportHandler {
    getReports() {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the connection to the database
            const databaseConnection = yield DatabaseService_1.DatabaseService.getConnection();
            // Query all the reports
            let reportEntities = yield databaseConnection.manager.find(report_1.Report);
            return reportEntities;
        });
    }
    getReport(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the connection to the database
            const databaseConnection = yield DatabaseService_1.DatabaseService.getConnection();
            // Query all the reports
            let reportEntity = yield databaseConnection.manager.findOne({ id: id });
            return reportEntity;
        });
    }
    addReport(report) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the connection to the database
            const databaseConnection = yield DatabaseService_1.DatabaseService.getConnection();
            // Create an entity
            let reportEntity = new report_1.Report();
            reportEntity.handled = false;
            reportEntity.wasteType = report.wasteType;
            reportEntity.occurence = 0;
            reportEntity.location = report.location;
            // Store the entity
            let storedReport = yield databaseConnection.manager.save(reportEntity);
            console.info('Report has been saved. Report id is', storedReport.id);
            return storedReport;
        });
    }
}
exports.ReportHandler = ReportHandler;
