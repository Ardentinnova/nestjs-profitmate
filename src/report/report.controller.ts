import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ReportService } from './report.service';
import { Profile } from 'generated/prisma';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseReport } from './dto/response-report.dto';

@UseGuards(JwtAuthGuard)
@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get(':periodId')
  @ApiResponse({ status: 200, type: ResponseReport })
  getAllReport(@Param('periodId') periodId: string, @User() user: Profile) {
    return this.reportService.getAllReport(periodId, user.id);
  }
}
