import { ApiProperty } from '@nestjs/swagger';

export class ResponseSellingCost {
  @ApiProperty({ example: 'a9c0c81a-d145-4b92-aeda-8a774b15333a' })
  id: string;
  @ApiProperty({ example: 'a9c0c81a-d145-4b92-aeda-8a774b15333a' })
  periodesId: string;
  @ApiProperty({ example: 'a9c0c81a-d145-4b92-aeda-8a774b15333a' })
  userId: string;
  @ApiProperty({
    description: 'Jumlah produk yang dihasilkan',
    example: 1500,
  })
  productCount: number;
  @ApiProperty({
    description: 'Besar margin profit dalam desimal',
    example: 0.2,
  })
  profitMargin: number;
  @ApiProperty({
    description: 'Nominal persediaan awal dalam rupiah',
    example: '1200000',
  })
  endingInventory: string;
  @ApiProperty({
    description: 'Nominal persediaan akhir dalam rupiah',
    example: '1200000',
  })
  initialInventory: string;
}
