import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ExpenseCategory, TransactionType } from 'generated/prisma';
import { IsBigIntString } from 'src/common/validators/is-bigint-string.validator';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Id Periode',
    example: 'a9c0c81a-d145-4b92-aeda-8a774b15333a',
  })
  @IsString()
  @IsNotEmpty()
  periodesId: string;

  @ApiProperty({
    description: 'Nama transaksi',
    example: 'Pembelian bahan baku terigu',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Deskripsi transaksi',
    example: 'Pembelian bahan baku terigu untuk produksi periode di warung xxx',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Nominal transaksi (dalam string)',
    example: '1600000',
  })
  @IsBigIntString({ message: 'Amount harus berupa string angka valid' })
  @IsNotEmpty()
  amount: string;

  @ApiProperty({
    description: 'Jenis transaksi (INCOME/EXPENSE)',
    example: TransactionType.EXPENSE,
  })
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;

  @ApiPropertyOptional({
    description: 'Jenis pengeluaran  (OPERATIONAL/OTHER)',
    example: ExpenseCategory.OPERATIONAL,
  })
  @IsEnum(ExpenseCategory)
  @IsOptional()
  expenseCategories?: ExpenseCategory;
}
