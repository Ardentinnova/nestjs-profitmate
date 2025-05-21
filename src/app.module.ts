import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { TransactionModule } from './transaction/transaction.module';
import { PeriodModule } from './period/period.module';
import { ProductionModule } from './production/production.module';
import { SellingModule } from './selling/selling.module';
import { ReportModule } from './report/report.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot(),
    AuthModule,
    TransactionModule,
    PeriodModule,
    ProductionModule,
    SellingModule,
    ReportModule,
    UserModule,
  ],
})
export class AppModule {}
