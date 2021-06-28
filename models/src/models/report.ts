import { Point } from './geojson';

export interface Report {
  handled?: boolean;
  wasteType: string;
  location: Point;
}
