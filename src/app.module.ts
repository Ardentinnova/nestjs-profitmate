import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { TransactionModule } from './transaction/transaction.module';
import { PeriodModule } from './period/period.module';
import { BusinessModule } from './business/business.module';
import { ProductionModule } from './production/production.module';
import { SellingModule } from './selling/selling.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [CommonModule, ConfigModule.forRoot(), UserModule, AuthModule, TransactionModule, PeriodModule, BusinessModule, ProductionModule, SellingModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
