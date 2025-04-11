import { IsDateString, IsString } from 'class-validator';

export class CreatePeriodDto {
  @IsString()
  name: string;

  @IsString()
  businessId: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
