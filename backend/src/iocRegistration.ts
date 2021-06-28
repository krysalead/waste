/**
 * Dependency injection definition
 * All the files that are part of the DI should be included in this file to be visible in the scope of ioc
 */
/* service */
import './services/ConfigService';
/* Controller */
import './controllers/ReportController';
import './controllers/ZoneController';

// Need to have it here even if not doing anything with it, it will register globals
