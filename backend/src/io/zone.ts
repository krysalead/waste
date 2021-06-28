import { IServiceStatus } from '../interfaces/services';
import { Zone } from '../../../models/src/models/zone';

export interface GetZoneResponse extends IServiceStatus {
  data: Zone;
}

export interface ListZoneResponse extends IServiceStatus {
  data: Zone[];
}
