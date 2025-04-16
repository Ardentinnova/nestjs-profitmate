import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SellingService } from './selling.service';
import { CreateSellingDto } from './dto/create-selling.dto';
import { UpdateSellingDto } from './dto/update-selling.dto';

@Controller('selling')
export class SellingController {
  constructor(private readonly sellingService: SellingService) {}

  @Post(':businessId')
  create(@Param('businessId') businessId : string,@Body() createSellingDto: CreateSellingDto) {
    return this.sellingService.create(createSellingDto, businessId);
  }

  @Get('a/:businessId')
  findAllByBusinessId(
    @Param('businessId') businessId: string,
    @Query('periodId') periodId: string,
  ) {
    return this.sellingService.findAll(businessId, periodId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellingDto: UpdateSellingDto) {
    return this.sellingService.update(id, updateSellingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellingService.remove(id);
  }
}
