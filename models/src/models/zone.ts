import { Polygon } from './geojson';

export interface Zone {
  name: string;
  geometry: Polygon;
  stats: {
    wasteType: string;
    frequency: number;
  };
}
