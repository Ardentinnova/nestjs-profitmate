import { ApiProperty } from '@nestjs/swagger';
import { ResponseTransaction } from './response-transaction.dto';

export class ResponseTransactionAll {
  @ApiProperty({ description: 'Total saldo saat ini', example: '1600000' })
  currentBalance: string;

  @ApiProperty({
    description: 'Array seluruh transaksi',
    example: [
      {
        id: '60561a7a-3db4-4b4b-b516-e024331528e1',
        name: 'Pembelian bahan baku terigu',
        description:
          'Pembelian bahan baku terigu untuk produksi periode di warung xxx',
        amount: '1600000',
        periodesId: 'a9c0c81a-d145-4b92-aeda-8a774b15333a',
        userId: '020517d3-04c4-45c3-9578-203289fb75db',
        type: 'INCOME',
        expenseCategories: null,
        createdAt: '2025-05-12T03:52:44.280Z',
      },
    ],
  })
  transactions: ResponseTransaction[];
}
