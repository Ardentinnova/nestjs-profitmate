import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllReport(businessId: string, periodId: string) {
    const [transactions, hargaPokokProduksi, hargaPokokPenjualan] =
      await Promise.all([
        await this.prisma.transaction.findMany({
          where: {
            businessId,
            periodesId: periodId,
          },
        }),
        this.prisma.productionCost.aggregate({
          where: {
            businessId,
            periodesId: periodId,
          },
          _sum: {
            amount: true,
          },
        }),
        this.prisma.sellingCost.findFirst({
          where: {
            businessId,
            periodesId: periodId,
          },
          select: {
            endingInventory: true,
            initialInventory: true,
          },
        }),
      ]);

    if (!hargaPokokPenjualan || !hargaPokokProduksi || !transactions)
      throw new NotFoundException('Data tidak ditemukan secara lengkap');

    const totalHargaPokokPenjualan =
      (hargaPokokProduksi._sum.amount ?? 0n) +
      hargaPokokPenjualan?.initialInventory -
      hargaPokokPenjualan?.endingInventory;

    type TransactionsResponse = Omit<
      (typeof transactions)[number],
      'amount'
    > & {
      amount: string;
    };

    let income: TransactionsResponse[] = [];
    let operationalExpense: TransactionsResponse[] = [];
    let otherExpense: TransactionsResponse[] = [];

    let totalIncome = 0n;
    let totalOperationalExpense = 0n;
    let totalOtherExpense = 0n;

    for (const transaction of transactions) {
      const amount = transaction.amount;
      switch (transaction.type) {
        case 'INCOME':
          totalIncome += amount;
          income.push({ ...transaction, amount: amount.toString() });
          break;

        case 'EXPENSE':
          if (transaction.expenseCategories == 'OPERATIONAL') {
            totalOperationalExpense += amount;
            operationalExpense.push({
              ...transaction,
              amount: amount.toString(),
            });
          } else {
            totalOtherExpense += amount;
            otherExpense.push({
              ...transaction,
              amount: amount.toString(),
            });
          }

          break;
      }
    }

    const labaKotor = totalIncome - totalHargaPokokPenjualan;
    const labaOperasional = labaKotor - totalOperationalExpense;
    const labaBersih = labaOperasional - totalOtherExpense;

    return {
      labaKotor: labaKotor.toString(),
      labaOperasional: labaOperasional.toString(),
      labaBersih: labaBersih.toString(),
      pendapatan: {
        data: income,
        total: totalIncome.toString(),
      },
      hargaPokokPenjualan: {
        persediaanAwal: hargaPokokPenjualan.initialInventory.toString(),
        hargaPokokProduksi: hargaPokokProduksi._sum.amount?.toString(),
        persediaanAkhir: hargaPokokPenjualan.endingInventory.toString(),
      },
      bebanOperasional: {
        data: operationalExpense,
        total: totalOperationalExpense.toString(),
      },
      bebanLain: {
        data: otherExpense,
        total: totalOtherExpense.toString(),
      },
    };
  }
}
