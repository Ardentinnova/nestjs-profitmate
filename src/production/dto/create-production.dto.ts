import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ProductionCategory } from 'generated/prisma';

export class CreateProductionDto {
  @IsString()
  @IsNotEmpty()
  periodesId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  amount: number;

  @IsEnum(ProductionCategory)
  @IsNotEmpty()
  category: ProductionCategory;
}
