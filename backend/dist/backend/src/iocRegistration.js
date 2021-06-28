"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Dependency injection definition
 * All the files that are part of the DI should be included in this file to be visible in the scope of ioc
 */
/* service */
require("./services/ConfigService");
/* Controller */
require("./controllers/ReportController");
require("./controllers/ZoneController");
// Need to have it here even if not doing anything with it, it will register globals
//# sourceMappingURL=iocRegistration.js.map