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
import { SellingService } from './selling.service';
import { CreateSellingDto } from './dto/create-selling.dto';
import { UpdateSellingDto } from './dto/update-selling.dto';
import { Profile } from 'passport';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseSellingCost } from './dto/response-selling.dto';
import { ResponseSellingDetail } from './dto/response-selling-detail.dto';

@UseGuards(JwtAuthGuard)
@Controller('selling')
export class SellingController {
  constructor(private readonly sellingService: SellingService) {}

  @Post()
  @ApiResponse({ status: 201, type: ResponseSellingCost })
  create(@Body() createSellingDto: CreateSellingDto, @User() user: Profile) {
    return this.sellingService.create(createSellingDto, user.id);
  }

  @Get('a/:periodId')
  @ApiResponse({ status: 200, type: ResponseSellingDetail })
  findAllByperiodId(
    @Param('periodId') periodId: string,
    @User() user: Profile,
  ) {
    return this.sellingService.findAll(user.id, periodId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellingService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: ResponseSellingCost })
  update(@Param('id') id: string, @Body() updateSellingDto: UpdateSellingDto) {
    return this.sellingService.update(id, updateSellingDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: ResponseSellingCost })
  remove(@Param('id') id: string) {
    return this.sellingService.remove(id);
  }
}
