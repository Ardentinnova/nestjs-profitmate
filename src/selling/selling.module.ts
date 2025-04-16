import { Module } from '@nestjs/common';
import { SellingService } from './selling.service';
import { SellingController } from './selling.controller';

@Module({
  controllers: [SellingController],
  providers: [SellingService],
})
export class SellingModule {}
