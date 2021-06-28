import { Controller } from './Controller';
import { provide } from '../ioc';
import { Route, Post, Example, Body, Get, Path } from 'tsoa';
import { factory } from '../services/LoggingService';
import {
  GetReportResponse,
  ListReportResponse,
  PostReportRequest,
  PostReportResponse,
} from '../io/report';

const logger = factory.getLogger('controller.report');

@Route('report')
@provide(ReportController)
export class ReportController extends Controller {
  constructor() {
    super(logger);
  }

  @Get()
  @Example<ListReportResponse>({
    status: 0,
    message: '',
    data: [
      {
        handled: false,
        wasteType: 'cloth',
        location: {
          type: 'Point',
          coordinates: [43.6166482, 7.0357972],
        },
      },
    ],
  })
  public async getReports(): Promise<ListReportResponse> {
    return {
      status: 0,
      message: '',
      data: [
        {
          handled: false,
          wasteType: 'cloth',
          location: {
            type: 'Point',
            coordinates: [43.6166482, 7.0357972],
          },
        },
      ],
    };
  }
  @Get('{reportId}')
  @Example<ListReportResponse>({
    status: 0,
    message: '',
    data: [
      {
        handled: false,
        wasteType: 'cloth',
        location: {
          type: 'Point',
          coordinates: [43.6166482, 7.0357972],
        },
      },
    ],
  })
  public async getReport(
    @Path('reportId') reportId: string
  ): Promise<GetReportResponse> {
    return {
      status: 0,
      message: '',
      data: {
        handled: false,
        wasteType: 'cloth',
        location: {
          type: 'Point',
          coordinates: [43.6166482, 7.0357972],
        },
      },
    };
  }
  @Post()
  @Example<PostReportResponse>({
    status: 0,
    message: '',
    data: {
      handled: false,
      wasteType: 'cloth',
      location: {
        type: 'Point',
        coordinates: [43.6166482, 7.0357972],
      },
    },
  })
  public async addReport(
    @Body() postReportResponse: PostReportRequest
  ): Promise<PostReportResponse> {
    return {
      status: 0,
      message: '',
      data: {
        handled: false,
        wasteType: 'cloth',
        location: {
          type: 'Point',
          coordinates: [43.6166482, 7.0357972],
        },
      },
    };
  }
}
