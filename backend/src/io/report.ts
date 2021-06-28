import { IServiceStatus } from '../interfaces/services';
import { Report } from '../../../models/src/models/report';

export interface GetReportResponse extends IServiceStatus {
  data: Report;
}

export interface PostReportRequest extends Report {
  data: Report;
}

export interface PostReportResponse extends IServiceStatus {
  data: Report;
}

export interface ListReportResponse extends IServiceStatus {
  data: Report[];
}
