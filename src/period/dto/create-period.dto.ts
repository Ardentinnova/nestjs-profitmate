import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsString } from 'class-validator';

export class CreatePeriodDto {
  @ApiProperty({ description: 'Period name', example: 'Periode 1' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Start date of the period', example: new Date("2025-10-23") })
  @IsDateString()
  startDate: Date;

  @ApiProperty({
    description: 'end date of the period',
    example: new Date("2025-12-23"),
  })
  @IsDateString()
  endDate: Date;
}
