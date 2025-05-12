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
import { ProductionService } from './production.service';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { Profile } from 'generated/prisma';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ApiResponse } from '@nestjs/swagger';
import { ResponseProductionCost } from './dto/response-production.dto';
import { ResponseProductionDetail } from './dto/response-production-detail.dto';

@UseGuards(JwtAuthGuard)
@Controller('production')
export class ProductionController {
  constructor(private readonly productionService: ProductionService) {}

  @Post()
  @ApiResponse({ status: 201, type: ResponseProductionCost })
  create(
    @Body() createProductionDto: CreateProductionDto,
    @User() user: Profile,
  ) {
    return this.productionService.create(createProductionDto, user.id);
  }

  @Get(':periodId')
  @ApiResponse({ status: 200, type: ResponseProductionDetail })
  findAllByPeriodId(
    @Param('periodId') periodId: string,
    @User() user: Profile,
  ) {
    return this.productionService.findAllByPeriodId(user.id, periodId);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: ResponseProductionCost })
  findOne(@Param('id') id: string) {
    return this.productionService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: ResponseProductionCost })
  update(
    @Param('id') id: string,
    @Body() updateProductionDto: UpdateProductionDto,
  ) {
    return this.productionService.update(id, updateProductionDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: ResponseProductionCost })
  remove(@Param('id') id: string) {
    return this.productionService.remove(id);
  }
}
