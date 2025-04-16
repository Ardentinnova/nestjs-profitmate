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
import { ProductionService } from './production.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';

@Controller('production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Post(':businessId')
  create(
    @Body() createProductionDto: CreateProductionDto,
    @Param('businessId') businessId: string,
  ) {
    return this.productionService.create(createProductionDto, businessId);
  }

  @Get(':businessId')
  findAllByBusinessId(
    @Param('businessId') businessId: string,
    @Query('periodId') periodId: string,
  ) {
    return this.productionService.findAllByBusinessId(businessId, periodId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductionDto: UpdateProductionDto,
  ) {
    return this.productionService.update(id, updateProductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productionService.remove(id);
  }
}
