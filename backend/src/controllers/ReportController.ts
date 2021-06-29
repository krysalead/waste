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
import axios from 'axios';
const logger = factory.getLogger('controller.report');
import { config } from '../config/app';
import { Report } from '../../../models/src/models/report';
import { CORE_ERROR_CODES } from '../constants';

@Route('report')
@provide(ReportController)
export class ReportController extends Controller {
  constructor() {
    super();
    this.setLogger(logger);
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
    logger.info('getReports');
    try {
      // Get the reports from the reports Microservice
      const response = await axios.get<Report[]>(
        `${config.service.reporting}/`
      );
      return {
        status: CORE_ERROR_CODES.REQUEST_OK,
        message: '',
        data: response.data,
      };
    } catch (error) {
      logger.error('Failed to get the reports', error);
      return {
        status: CORE_ERROR_CODES.SERVICE_FAILURE,
        message: error,
        data: [],
      };
    }
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
    logger.info('getReport');
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
    logger.info('addReport');
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
