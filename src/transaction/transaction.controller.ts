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
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Profile } from 'generated/prisma';
import { User } from 'src/common/decorators/user.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ResponseTransaction } from './dto/response-transaction.dto';
import { ResponseTransactionAll } from './dto/response-transaction-all.dto';

@UseGuards(JwtAuthGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @ApiResponse({ status: 201, type: ResponseTransaction })
  async create(
    @Body() createTransactionDto: CreateTransactionDto,
    @User() user: Profile,
  ) {
    return await this.transactionService.create(createTransactionDto, user.id);
  }

  @Get('a/:periodId')
  @ApiResponse({ status: 201, type: ResponseTransactionAll, isArray: true })
  findAll(@Param('periodId') periodId: string, @User() user: Profile) {
    console.log('masuk sinsi');
    return this.transactionService.findAll(periodId, user.id);
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: ResponseTransaction })
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, type: ResponseTransaction })
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: ResponseTransaction })
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
