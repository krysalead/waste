import { IServiceStatus } from '../interfaces/services';
import { Point } from 'geojson';

export interface Report {
  handled?: boolean;
  wasteType: string;
  location: Point;
}

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
