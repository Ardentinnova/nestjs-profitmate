import { Injectable, NotFoundException } from '@nestjs/common';
import { ensureFound } from 'src/common/helpers/ensure-found';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class ReportService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllReport(periodId: string, userId: string) {
    const selectedPeriodId =
      periodId ||
      ensureFound(
        await this.prisma.periode.findFirst({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          select: { id: true },
        }),
      )?.id;

    const [
      transactions,
      hargaPokokProduksi,
      hargaPokokPenjualan,
      transactionGroup,
    ] = await Promise.all([
      this.prisma.transaction.findMany({
        where: {
          userId,
          periodId: selectedPeriodId,
        },
      }),
      this.prisma.productionCost.aggregate({
        where: {
          userId,
          periodesId: selectedPeriodId,
        },
        _sum: {
          amount: true,
        },
      }),
      this.prisma.sellingCost.findFirst({
        where: {
          userId,
          periodesId: selectedPeriodId,
        },
        select: {
          endingInventory: true,
          initialInventory: true,
        },
      }),
      this.prisma.transaction.groupBy({
        by: ['type'],
        _sum: {
          amount: true,
        },
      }),
    ]);

    if (
      !hargaPokokPenjualan ||
      !hargaPokokProduksi ||
      !transactions ||
      !transactionGroup
    )
      throw new NotFoundException('Data tidak ditemukan secara lengkap');

    const expenseGroup = transactionGroup.find(
      (group) => group.type === 'EXPENSE',
    );

    const totalExpense =
      (expenseGroup?._sum?.amount || 0n) +
      (hargaPokokProduksi?._sum?.amount || 0n);

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

    const income: TransactionsResponse[] = [];
    const operationalExpense: TransactionsResponse[] = [];
    const otherExpense: TransactionsResponse[] = [];

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
      transactionGroup: [
        {
          name: 'Nominal (Rp.)',
          pendapatan: Number(transactionGroup[0]._sum.amount),
          pengeluaran: Number(transactionGroup[1]._sum.amount),
        },
      ],
      expenseData: [
        {
          name: 'Harga Pokok Penjualan',
          value: Number(hargaPokokProduksi._sum.amount),
          percentage:
            (
              ((Number(hargaPokokProduksi._sum.amount) || 0) /
                Number(totalExpense)) *
              100
            ).toFixed(4) + '%',
          color: '#7c82ec',
        },
        {
          name: 'Biaya Operasional',
          value: Number(totalOperationalExpense),
          percentage:
            (
              ((Number(totalOperationalExpense) || 0) / Number(totalExpense)) *
              100
            ).toFixed(4) + '%',
          color: '#f87d8e',
        },
        {
          name: 'Biaya Lain & Pajak',
          value: Number(totalOtherExpense),
          percentage:
            (
              ((Number(totalOtherExpense) || 0) / Number(totalExpense)) *
              100
            ).toFixed(4) + '%',
          color: '#7fe7f3',
        },
      ],
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
        total: totalHargaPokokPenjualan.toString(),
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

  async getLabaBersihPerPeriod(userId: string) {
    const periodes = await this.prisma.periode.findMany({
      where: { userId },
      orderBy: { startDate: 'asc' },
      select: {
        id: true,
        name: true,
      },
    });

    const result: any[] = [];

    for (const periode of periodes) {
      const [
        transactions,
        hargaPokokProduksi,
        hargaPokokPenjualan,
        transactionGroup,
      ] = await Promise.all([
        this.prisma.transaction.findMany({
          where: {
            userId,
            periodId: periode.id,
          },
        }),
        this.prisma.productionCost.aggregate({
          where: {
            userId,
            periodesId: periode.id,
          },
          _sum: {
            amount: true,
          },
        }),
        this.prisma.sellingCost.findFirst({
          where: {
            userId,
            periodesId: periode.id,
          },
          select: {
            endingInventory: true,
            initialInventory: true,
          },
        }),
        this.prisma.transaction.groupBy({
          by: ['type'],
          where: {
            userId,
            periodId: periode.id,
          },
          _sum: {
            amount: true,
          },
        }),
      ]);

      if (
        !hargaPokokPenjualan ||
        !hargaPokokProduksi ||
        !transactions ||
        !transactionGroup
      )
        continue; // skip periode jika data tidak lengkap

      const totalIncome =
        transactionGroup.find((group) => group.type === 'INCOME')?._sum
          ?.amount || 0n;

      const totalOperationalExpense = transactions
        .filter(
          (t) => t.type === 'EXPENSE' && t.expenseCategories === 'OPERATIONAL',
        )
        .reduce((sum, t) => sum + t.amount, 0n);

      const totalOtherExpense = transactions
        .filter(
          (t) => t.type === 'EXPENSE' && t.expenseCategories !== 'OPERATIONAL',
        )
        .reduce((sum, t) => sum + t.amount, 0n);

      const totalHargaPokokPenjualan =
        (hargaPokokProduksi._sum.amount ?? 0n) +
        hargaPokokPenjualan.initialInventory -
        hargaPokokPenjualan.endingInventory;

      const labaKotor = totalIncome - totalHargaPokokPenjualan;
      const labaOperasional = labaKotor - totalOperationalExpense;
      const labaBersih = labaOperasional - totalOtherExpense;

      result.push({
        periodId: periode.id,
        periodName: periode.name,
        labaBersih: Number(labaBersih),
      });
    }

    return result;
  }

  async getSummaryPerPeriod(userId: string) {
    const periodes = await this.prisma.periode.findMany({
      where: { userId },
      orderBy: { startDate: 'asc' },
      select: {
        id: true,
        name: true,
      },
    });

    const summaries: any = [];

    for (const periode of periodes) {
      const [transactions, hargaPokokProduksi, hargaPokokPenjualan] =
        await Promise.all([
          this.prisma.transaction.findMany({
            where: {
              userId,
              periodId: periode.id,
            },
          }),
          this.prisma.productionCost.aggregate({
            where: {
              userId,
              periodesId: periode.id,
            },
            _sum: {
              amount: true,
            },
          }),
          this.prisma.sellingCost.findFirst({
            where: {
              userId,
              periodesId: periode.id,
            },
            select: {
              endingInventory: true,
              initialInventory: true,
            },
          }),
        ]);

      if (!hargaPokokPenjualan || !hargaPokokProduksi || !transactions)
        continue;

      let totalIncome = 0n;
      let totalOperationalExpense = 0n;
      let totalOtherExpense = 0n;

      for (const transaction of transactions) {
        const amount = transaction.amount;
        if (transaction.type === 'INCOME') {
          totalIncome += amount;
        } else if (transaction.type === 'EXPENSE') {
          if (transaction.expenseCategories === 'OPERATIONAL') {
            totalOperationalExpense += amount;
          } else {
            totalOtherExpense += amount;
          }
        }
      }

      const totalHargaPokokPenjualan =
        (hargaPokokProduksi._sum.amount ?? 0n) +
        hargaPokokPenjualan.initialInventory -
        hargaPokokPenjualan.endingInventory;

      const labaKotor = totalIncome - totalHargaPokokPenjualan;
      const labaOperasional = labaKotor - totalOperationalExpense;
      const labaBersih = labaOperasional - totalOtherExpense;

      summaries.push({
        periodeId: periode.id,
        periodeName: periode.name,
        pendapatan: Number(totalIncome),
        hargaPokokPenjualan: Number(totalHargaPokokPenjualan),
        labaBersih: Number(labaBersih),
      });
    }

    return summaries;
  }
}
