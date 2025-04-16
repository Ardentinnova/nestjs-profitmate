import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsBigIntString } from 'src/common/validators/is-bigint-string.validator';

export class CreateSellingDto {
  @IsString()
  @IsNotEmpty()
  periodesId: string;

  @IsNumber()
  @IsNotEmpty()
  productCount: number;

  @IsNumber()
  @IsNotEmpty()
  profitMargin: number;

  @IsBigIntString()
  @IsNotEmpty()
  initialInventory: string;

  @IsBigIntString()
  @IsNotEmpty()
  endingInventory: string;
}
