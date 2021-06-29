import { Controller as tsoaController } from 'tsoa';
import { Logger } from 'typescript-logging';
import { IServiceStatus } from '../interfaces/services';

export class Controller extends tsoaController {
  logger: Logger;
  setLogger(logger: Logger) {
    this.logger = logger;
  }

  /**
   * Generate a log for a call to a service that failed, return the status with proper code and message
   * @param e
   */
  protected generateServiceFailureStatus(
    e: any,
    title?: string
  ): IServiceStatus {
    this.logger.error('Failed to call service - ' + title);
    if (e.code) {
      this.logger.error(`Caused by "${e.message} [${e.code}]"`);
      // Functional error
      return {
        status: e.code,
        message: e.message,
      };
    } else {
      this.logger.error('Caused by', e);
      this.logger.error(e.stack);
      return {
        status: -1,
        message: 'Service call failed, contact admin',
      };
    }
  }
}
