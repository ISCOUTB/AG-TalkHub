import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ReportsService } from './reports.service';
import { ReportListItemDto } from './dto/report-list-item.dto';
import { ReportCreatedResultDto } from './dto/report-created-result.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportDto } from './dto/report.dto';

@ApiBearerAuth()
@ApiTags('reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiOperation({
    description: 'Get all reports',
    operationId: 'getAllReports',
  })
  @ApiResponse({
    status: 200,
    description: 'All reports',
    type: [ReportListItemDto],
  })
  @Get()
  getAllReports() {
    return this.reportsService.getAllReports();
  }

  @ApiOperation({
    description: 'Get report by id',
    operationId: 'getReportById',
  })
  @ApiResponse({
    status: 200,
    description: 'Report found',
    type: ReportDto,
  })
  @ApiResponse({ status: 404, description: 'Report not found' })
  @Get(':id')
  getReportById(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.getReportById(id);
  }

  @ApiOperation({
    description: 'Create a new report',
    operationId: 'createReport',
  })
  @ApiResponse({
    status: 201,
    description: 'Report created',
    type: ReportCreatedResultDto,
  })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @Post()
  async createReport(@Body() createReportDto: CreateReportDto, @Req() req) {
    createReportDto.id_user = req.user.sub;
    const result = await this.reportsService.insert(createReportDto);
    const dto = new ReportCreatedResultDto();
    dto.id_report = Number(result.lastInsertRowid);
    return dto;
  }
  @ApiOperation({
    description: 'Delete a report',
    operationId: 'deleteReport',
  })
  @ApiResponse({ status: 200, description: 'Report deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Delete(':id')
  deleteById(@Param('id', ParseIntPipe) id: number) {
    return this.reportsService.deleteById(id);
  }
}
