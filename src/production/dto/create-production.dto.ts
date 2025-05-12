import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ProductionCategory } from 'generated/prisma';

export class CreateProductionDto {
  @ApiProperty({
    description: 'Period Id',
    example: 'a9c0c81a-d145-4b92-aeda-8a774b15333a',
  })
  @IsString()
  @IsNotEmpty()
  periodesId: string;

  @ApiProperty({
    description: 'Nama Biaya',
    example: 'Tepung terigu',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Nominal biaya yang dikeluarkan',
    example: 200000,
  })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({
    description: 'Kategori pengeluaran',
    example: ProductionCategory.INGRIDIENTS,
  })
  @IsEnum(ProductionCategory)
  @IsNotEmpty()
  category: ProductionCategory;
}
