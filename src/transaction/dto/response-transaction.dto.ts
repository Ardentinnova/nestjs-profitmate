import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory, TransactionType } from 'generated/prisma';

export class ResponseTransaction {
  @ApiProperty({
    description: 'Id Transaksi',
    example: '60561a7a-3db4-4b4b-b516-e024331528e1',
  })
  id: string;
  @ApiProperty({
    description: 'Nama transaksi',
    example: 'Pembelian bahan baku terigu',
  })
  name: string;

  @ApiProperty({
    description: 'Nama transaksi',
    example: 'Pembelian bahan baku terigu untuk produksi periode di warung xxx',
  })
  description: string;

  @ApiProperty({
    description: 'Nominal transaksi',
    example: '1600000',
  })
  amount: string;

  @ApiProperty({
    description: 'Id Periode',
    example: '60561a7a-3db4-4b4b-b516-e024331528e1',
  })
  periodesId: string;

  @ApiProperty({
    description: 'Id user',
    example: '60561a7a-3db4-4b4b-b516-e024331528e1',
  })
  userId: string;
  @ApiProperty({
    description: 'Tipe transaksi (INCOME/EXPENSE)',
    example: TransactionType.EXPENSE,
  })
  type: TransactionType;

  @ApiProperty({
    description: 'Tipe pengeluaran (OPERATIONAL/OTHER)',
    example: ExpenseCategory.OTHER,
  })
  expenseCategories: ExpenseCategory;

  @ApiProperty({
    description: 'Tanggal transaksi dibuat',
    example: new Date(),
  })
  createdAt: Date;
}
