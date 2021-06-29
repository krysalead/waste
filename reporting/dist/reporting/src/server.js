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
exports.server = void 0;
const express = require('express');
// This allow typeorm to use it from everywhere in this service
require("reflect-metadata");
const ReportHandler_1 = require("./handlers/ReportHandler");
const server = () => {
    const app = express();
    const handler = new ReportHandler_1.ReportHandler();
    app.use(express.json()); // for parsing application/json
    app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reports = yield handler.getReports();
        // need to have a better wrapping with more information about the current request sent from the backend (status, message....)
        res.send({ reports });
    }));
    app.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reports = yield handler.getReport(req.params.id);
        // need to have a better wrapping with more information about the current request sent from the backend (status, message....)
        res.send({ reports });
    }));
    app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const reports = yield handler.addReport(req.body);
        // need to have a better wrapping with more information about the current request sent from the backend (status, message....)
        res.send({ reports });
    }));
    return {
        start: () => {
            const port = 3000;
            const service = app.listen(port, () => {
                console.info(`App listening at http://localhost:${port}`);
            });
            return {
                stop: () => {
                    console.info(`Server is closing`);
                    service.close();
                },
            };
        },
        app,
    };
};
exports.server = server;
