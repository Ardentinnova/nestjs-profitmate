import { ApiProperty } from '@nestjs/swagger';

export class ResponsePeriod {
  @ApiProperty({ example: 'a9c0c81a-d145-4b92-aeda-8a774b15333a' })
  id: string;
  @ApiProperty({ example: 'periode Maret April' })
  name: string;
  @ApiProperty({ example: '020517d3-04c4-45c3-9578-203289fb75db' })
  userId: string;
  @ApiProperty({ example: new Date() })
  startDate: Date;
  @ApiProperty({ example: new Date() })
  endDate: Date;
  @ApiProperty({ example: new Date() })
  createdAt: Date;
}
