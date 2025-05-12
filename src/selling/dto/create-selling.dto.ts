import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsBigIntString } from 'src/common/validators/is-bigint-string.validator';

export class CreateSellingDto {
  @ApiProperty({ example: 'a9c0c81a-d145-4b92-aeda-8a774b15333a' })
  @IsString()
  @IsNotEmpty()
  periodesId: string;

  @ApiProperty({
    description: 'Jumlah produk dihasilkan',
    example: 300,
  })
  @IsNumber()
  @IsNotEmpty()
  productCount: number;

  @ApiProperty({
    description: 'Profit margin yang diinginkan dalam desimal',
    example: 0.2,
  })
  @IsNumber()
  @IsNotEmpty()
  profitMargin: number;

  @ApiProperty({
    description: 'Persediaan awal dalam nominal rupiah (string jika bigint)',
    example: 800000,
  })
  @IsBigIntString()
  @IsNotEmpty()
  initialInventory: string;

  @ApiProperty({
    description: 'Persediaan awal dalam nominal rupiah (string jika bigint)',
    example: 800000,
  })
  @IsBigIntString()
  @IsNotEmpty()
  endingInventory: string;
}
