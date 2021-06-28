import { Report } from '../../../models/src/models/report';
import { DatabaseService } from '../services/DatabaseService';
import { Report as ReportEntity } from '../entity/report';

export class ReportHandler {
  async getReports(): Promise<Report[]> {
    // Get the connection to the database
    const databaseConnection = await DatabaseService.getConnection();
    // Query all the reports
    let reportEntities = await databaseConnection.manager.find(ReportEntity);
    return reportEntities;
  }
  async getReport(id: number): Promise<string> {
    // Get the connection to the database
    const databaseConnection = await DatabaseService.getConnection();
    // Query all the reports
    let reportEntity = await databaseConnection.manager.findOne({ id: id });
    return reportEntity;
  }
  async addReport(report: Report): Promise<string> {
    // Get the connection to the database
    const databaseConnection = await DatabaseService.getConnection();
    // Create an entity
    let reportEntity = new ReportEntity();
    reportEntity.handled = false;
    reportEntity.wasteType = report.wasteType;
    reportEntity.occurence = 0;
    reportEntity.location = report.location;
    // Store the entity
    let storedReport = await databaseConnection.manager.save(reportEntity);
    console.log('Report has been saved. Report id is', storedReport.id);
    return storedReport;
  }
}
