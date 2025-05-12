import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PeriodService } from './period.service';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { User } from 'src/common/decorators/user.decorator';
import { Profile } from 'generated/prisma';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ApiResponse } from '@nestjs/swagger';
import { ResponsePeriod } from './dto/response-period';

@UseGuards(JwtAuthGuard)
@Controller('period')
export class PeriodController {
  constructor(private readonly periodService: PeriodService) {}

  @Post()
  @ApiResponse({ status: 201, type: ResponsePeriod })
  create(@Body() createPeriodDto: CreatePeriodDto, @User() user: Profile) {
    return this.periodService.create(createPeriodDto, user.id);
  }

  @Get()
  @ApiResponse({ status: 200, type: ResponsePeriod, isArray: true })
  findAll(@User() user: Profile) {
    return this.periodService.findAll(user.id);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: ResponsePeriod })
  findOne(@Param('id') id: string) {
    return this.periodService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: ResponsePeriod })
  update(@Param('id') id: string, @Body() updatePeriodDto: UpdatePeriodDto) {
    return this.periodService.update(id, updatePeriodDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: ResponsePeriod })
  remove(@Param('id') id: string) {
    return this.periodService.remove(id);
  }
}
