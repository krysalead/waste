/* service */
// Core services
import './core/services/ConfigService';
// Functional services
/* Controller */
import './controller/ReportHandler';

//Need to have it here even if not doing anything with it, it will register globals
import { iocContainer } from './ioc';
