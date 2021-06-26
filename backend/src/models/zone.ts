import { IServiceStatus } from '../interfaces/services';
import { Polygon } from 'geojson';

export interface Zone {
  name: string;
  geometry: Polygon;
  stats: {
    wasteType: string;
    frequency: number;
  };
}

export interface GetZoneResponse extends IServiceStatus {
  data: Zone;
}

export interface ListZoneResponse extends IServiceStatus {
  data: Zone[];
}
