import { Zone } from '../../../models/src/models/zone';

export class ZoneHandler {
  async getZonesStats(): Promise<Zone[]> {
    return Promise.resolve([]);
  }
  async getZoneStats(id: string): Promise<Zone> {
    return Promise.resolve(null);
  }
}
