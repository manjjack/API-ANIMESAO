import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportError } from './entities/report.entity';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  create(
    @Body() report: ReportError,
    @Body('animeId') animeId: number,
    @Body('episodeId') episodeId: number,
  ) {
    return this.reportService.create(report, animeId, episodeId);
  }

  @Get()
  async findAll(): Promise<ReportError[]> {
    return this.reportService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ReportError> {
    return this.reportService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatedReport: Partial<ReportError>,
  ): Promise<ReportError> {
    return this.reportService.update(id, updatedReport);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    await this.reportService.delete(id);
  }

  @Post(':id/solve')
  async solveReport(@Param('id') id: number): Promise<void> {
    await this.reportService.solveReport(id);
  }
}
