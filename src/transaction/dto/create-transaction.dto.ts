import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ExpenseCategory, TransactionType } from 'generated/prisma';
import { IsBigIntString } from 'src/common/validators/is-bigint-string.validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  businessId: string;

  @IsString()
  @IsNotEmpty()
  periodesId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBigIntString({ message: 'Amount harus berupa string angka valid' })
  @IsNotEmpty()
  amount: string;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @IsEnum(ExpenseCategory)
  @IsOptional()
  expenseCategories?: ExpenseCategory;
}
