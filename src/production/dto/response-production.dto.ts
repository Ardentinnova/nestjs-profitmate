import { ApiProperty } from '@nestjs/swagger';
import { $Enums, ProductionCategory, ProductionCost } from 'generated/prisma';

export class ResponseProductionCost implements ProductionCost {
  @ApiProperty({
    description: 'Id dari user',
    example: 'a9c0c81a-d145-4b92-aeda-8a774b15333a',
  })
  userId: string;
  @ApiProperty({
    description: 'Id production cost',
    example: 'a9c0c81a-d145-4b92-aeda-8a774b15333a',
  })
  id: string;
  @ApiProperty({
    description: 'Nama pengeluaran',
    example: 'Terigu',
  })
  name: string;
  @ApiProperty({
    description: 'Nominal pengeluaran',
    example: '200000',
  })
  amount: bigint;
  @ApiProperty({
    description: 'Kategori pengeluaran',
    example: ProductionCategory.INGRIDIENTS,
  })
  category: $Enums.ProductionCategory;
  @ApiProperty({
    description: 'Tanggal dibuat',
    example: new Date(),
  })
  createdAt: Date;
  @ApiProperty({
    description: 'Id period',
    example: 'a9c0c81a-d145-4b92-aeda-8a774b15333a',
  })
  periodesId: string;
}
