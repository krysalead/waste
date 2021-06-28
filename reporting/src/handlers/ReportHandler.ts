import { Report } from '../../../models/src/models/report';

export class ReportHandler {
  async getReports(): Promise<Report[]> {
    return Promise.resolve([]);
  }
  async getReport(id: string): Promise<string> {
    return Promise.resolve('');
  }
  async addReport(report: any): Promise<string> {
    return Promise.resolve('');
  }
}
