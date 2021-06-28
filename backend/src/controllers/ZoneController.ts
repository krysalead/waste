import { Controller } from './Controller';
import { provide } from '../ioc';
import { Route, Post, Example, Body, Get, Path } from 'tsoa';
import { factory } from '../services/LoggingService';
import { GetZoneResponse, ListZoneResponse } from '../io/zone';

const logger = factory.getLogger('controller.zone');

@Route('stats')
@provide(ZoneController)
export class ZoneController extends Controller {
  constructor() {
    super(logger);
  }

  @Get()
  @Example<ListZoneResponse>({
    status: 0,
    message: '',
    data: [
      {
        name: 'string',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [43.6166482, 7.0357972],
              [43.6166482, 7.0357972],
            ],
          ],
        },
        stats: {
          wasteType: 'string',
          frequency: 1,
        },
      },
    ],
  })
  public async getZonesStatistics(): Promise<ListZoneResponse> {
    return {
      status: 0,
      message: '',
      data: [
        {
          name: 'string',
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [43.6166482, 7.0357972],
                [43.6166482, 7.0357972],
              ],
            ],
          },
          stats: {
            wasteType: 'string',
            frequency: 1,
          },
        },
      ],
    };
  }
  @Get('{reportId}')
  @Example<GetZoneResponse>({
    status: 0,
    message: '',
    data: {
      name: 'string',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [43.6166482, 7.0357972],
            [43.6166482, 7.0357972],
          ],
        ],
      },
      stats: {
        wasteType: 'string',
        frequency: 1,
      },
    },
  })
  public async getZoneStatistics(
    @Path('reportId') reportId: string
  ): Promise<GetZoneResponse> {
    return {
      status: 0,
      message: '',
      data: {
        name: 'string',
        geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [43.6166482, 7.0357972],
              [43.6166482, 7.0357972],
            ],
          ],
        },
        stats: {
          wasteType: 'string',
          frequency: 1,
        },
      },
    };
  }
}
