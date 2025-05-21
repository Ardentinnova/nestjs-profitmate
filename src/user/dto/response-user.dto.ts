import { ApiProperty } from '@nestjs/swagger';
import { Profile } from 'generated/prisma';

export class ResponseUser {
  @ApiProperty({
    description: 'Data user',
    example: '020517d3-04c4-45c3-9578-203289fb75db',
  })
  id: string;

  @ApiProperty({ example: 'Toko saya' })
  businessName: string;

  @ApiProperty({ example: 'udin@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Udin Suradin' })
  name: string;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  updatedAt: Date;
}
