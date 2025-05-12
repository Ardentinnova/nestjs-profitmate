import { ApiProperty } from '@nestjs/swagger';
import { ExpenseCategory } from 'generated/prisma';
import { ResponseTransaction } from 'src/transaction/dto/response-transaction.dto';

export class ResponseReport {
  @ApiProperty({ example: '14000000' })
  labaKotor: string;
  @ApiProperty({ example: '14000000' })
  labaOperasional: string;
  @ApiProperty({ example: '14000000' })
  labaBersih: string;
  @ApiProperty({
    example: {
      data: [
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
      total: '1600000',
    },
  })
  pendapatan: {
    data: ResponseTransaction[];
    total: string;
  };

  @ApiProperty({
    example: {
      persediaanAwal: '800000',
      hargaPokokProduksi: '200000',
      persediaanAkhir: '800000',
      total: '200000',
    },
  })
  hargaPokokPenjualan: {
    persediaanAwal: string;
    hargaPokokProduksi: string;
    persediaanAkhir: string;
    total: string;
  };

  @ApiProperty({
    example: {
      data: [
        {
          id: '60561a7a-3db4-4b4b-b516-e024331528e1',
          name: 'Gaji',
          description: 'Gaji karyawan x, y, z',
          amount: '2200000',
          periodesId: 'a9c0c81a-d145-4b92-aeda-8a774b15333a',
          userId: '020517d3-04c4-45c3-9578-203289fb75db',
          type: 'EXPENSE',
          expenseCategories: ExpenseCategory.OPERATIONAL,
          createdAt: '2025-05-12T03:52:44.280Z',
        },
      ],
      total: '2200000',
    },
  })
  bebanOperasional: {
    data: ResponseTransaction[];
    total: string;
  };

  @ApiProperty({
    example: {
      data: [
        {
          id: '60561a7a-3db4-4b4b-b516-e024331528e1',
          name: 'Pajak',
          description: 'Pajak xxxx',
          amount: '200000',
          periodesId: 'a9c0c81a-d145-4b92-aeda-8a774b15333a',
          userId: '020517d3-04c4-45c3-9578-203289fb75db',
          type: 'EXPENSE',
          expenseCategories: ExpenseCategory.OTHER,
          createdAt: '2025-05-12T03:52:44.280Z',
        },
      ],
      total: '200000',
    },
  })
  bebanLain: {
    data: ResponseTransaction[];
    total: string;
  };
}
