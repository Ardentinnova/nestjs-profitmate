import { ApiProperty } from '@nestjs/swagger';
import { ProductionCategory, ProductionCost } from 'generated/prisma';

export class ResponseProductionDetail {
  @ApiProperty({ example: 'a9c0c81a-d145-4b92-aeda-8a774b15333a' })
  userId: string;

  @ApiProperty({ example: 'a9c0c81a-d145-4b92-aeda-8a774b15333a' })
  periodId: string;

  @ApiProperty({
    description: 'Array biaya bahan baku',
    isArray: true,
    example: [
      {
        id: '6407b290-845b-4837-b9f5-b82231fa6fa9',
        userId: '020517d3-04c4-45c3-9578-203289fb75db',
        periodesId: 'a9c0c81a-d145-4b92-aeda-8a774b15333a',
        name: 'Terigu',
        amount: '200000',
        category: 'INGRIDIENTS',
        createdAt: '2025-05-12T02:34:58.060Z',
      },
    ],
  })
  bahanBaku: ProductionCost[];

  @ApiProperty({
    description: 'Array biaya tenaga kerja',
    isArray: true,
    example: [
      {
        id: '6407b290-845b-4837-b9f5-b82231fa6fa9',
        userId: '020517d3-04c4-45c3-9578-203289fb75db',
        periodesId: 'a9c0c81a-d145-4b92-aeda-8a774b15333a',
        name: 'Buruh Udin',
        amount: '200000',
        category: ProductionCategory.LABOR,
        createdAt: '2025-05-12T02:34:58.060Z',
      },
    ],
  })
  biayaTenagaKerja: ProductionCost[];

  @ApiProperty({
    description: 'Array biaya tenaga kerja',
    isArray: true,
    example: [
      {
        id: '6407b290-845b-4837-b9f5-b82231fa6fa9',
        userId: '020517d3-04c4-45c3-9578-203289fb75db',
        periodesId: 'a9c0c81a-d145-4b92-aeda-8a774b15333a',
        name: 'Reparasi alat',
        amount: '200000',
        category: ProductionCategory.OVERHEAD,
        createdAt: '2025-05-12T02:34:58.060Z',
      },
    ],
  })
  biayaOverhead: ProductionCost[];

  @ApiProperty({ description: 'Total biaya overhead', example: '200000' })
  totalBiayaOverhead: string;

  @ApiProperty({ description: 'Total biaya tenaga kerja', example: '200000' })
  totalBiayaTenagaKerja: string;

  @ApiProperty({ description: 'Total biaya bahan baku', example: '200000' })
  totalBiayaBahanBaku: string;

  @ApiProperty({
    description: 'Total biaya produksi keseluruhan',
    example: '200000',
  })
  totalBiayaProduksi: string;
}
