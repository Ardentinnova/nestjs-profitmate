import { Controller, Get, Param, Query } from '@nestjs/common';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get(':businessId')
  getAllReport(
    @Param('businessId') businessId: string,
    @Query('periodId') periodId: string,
  ) {
    this.reportService.getAllReport(businessId, periodId);
  }
}
