import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { Request } from 'express';
import { UserReq } from 'src/common/types/req-user.type';
import { ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('business')
export class BusinessController {
  constructor(private readonly businessService: BusinessService) {}

  @Post()
  @ApiResponse({ status: 201, example: {} })
  create(@Body() createBusinessDto: CreateBusinessDto, @Req() req: Request) {
    const { id: userId } = req.user as UserReq;
    return this.businessService.create(createBusinessDto, userId);
  }

  @Get(':businessId')
  findOne(@Param('businessId') businessId: string) {
    return this.businessService.findOne(businessId);
  }

  @Get()
  findManyByUserId(@Req() req: Request) {
    const { id: userId } = req.user as UserReq;
    return this.businessService.findManyByUserId(userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessDto: UpdateBusinessDto,
  ) {
    return this.businessService.update(id, updateBusinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessService.remove(id);
  }
}
