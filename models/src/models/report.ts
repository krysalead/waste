import { Point } from './geojson';

export interface Report {
  // Identified of the report
  id?: number;
  // was it handled by a drone
  handled?: boolean;
  // what is the type of waste to collect
  wasteType: string;
  // where was the report sent
  location: Point;
  // number of time a similar report is sent
  occurence?: number;
}
