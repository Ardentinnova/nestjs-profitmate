import { Injectable } from '@nestjs/common';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { PrismaService } from 'src/common/prisma.service';
import { ensureFound } from 'src/common/helpers/ensure-found';

@Injectable()
export class ProductionService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductionDto: CreateProductionDto, userId: string) {
    const { periodesId, name, category, amount } = createProductionDto;
    const productionData = await this.prisma.productionCost.create({
      data: {
        userId,
        periodesId,
        name,
        category,
        amount,
      },
    });

    return {
      ...productionData,
      amount: productionData.amount.toString(),
    };
  }

  async findAllByPeriodId(userId: string, periodId: string) {
    const selectedPeriodId =
      periodId ||
      ensureFound(
        await this.prisma.periode.findFirst({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          select: { id: true },
        }),
      )?.id;

    const productionCosts = await this.prisma.productionCost.findMany({
      where: { periodesId: selectedPeriodId },
    });

    let totalIngridientsCost = 0n;
    let totalLaborCost = 0n;
    let totalOverheadCost = 0n;

    type ProductionCostResponse = Omit<
      (typeof productionCosts)[number],
      'amount'
    > & { amount: string };

    const bahanBaku: ProductionCostResponse[] = [];
    const biayaTenagaKerja: ProductionCostResponse[] = [];
    const biayaOverhead: ProductionCostResponse[] = [];

    for (const row of productionCosts) {
      const amount = BigInt(row.amount);

      switch (row.category) {
        case 'INGRIDIENTS':
          totalIngridientsCost += amount;
          bahanBaku.push({ ...row, amount: amount.toString() });
          break;
        case 'LABOR':
          totalLaborCost += amount;
          biayaTenagaKerja.push({ ...row, amount: amount.toString() });
          break;
        case 'OVERHEAD':
          totalOverheadCost += amount;
          biayaOverhead.push({ ...row, amount: amount.toString() });
          break;
      }
    }

    const totalProductionCost =
      totalIngridientsCost + totalLaborCost + totalOverheadCost;

    return {
      userId,
      periodId: selectedPeriodId,
      bahanBaku,
      biayaTenagaKerja,
      biayaOverhead,
      totalBahanBaku: totalIngridientsCost.toString(),
      totalBiayaOverhead: totalOverheadCost.toString(),
      totalBiayaTenagaKerja: totalLaborCost.toString(),
      totalBiayaProduksi: totalProductionCost.toString(),
    };
  }

  async findOne(id: string) {
    const productionData = ensureFound(
      await this.prisma.productionCost.findUnique({
        where: {
          id,
        },
      }),
    );
    return {
      ...productionData,
      amount: productionData.amount.toString(),
    };
  }

  async update(id: string, updateProductionDto: UpdateProductionDto) {
    const productionData = await this.prisma.productionCost.update({
      where: {
        id,
      },
      data: updateProductionDto,
    });
    return {
      ...productionData,
      amount: productionData.amount.toString(),
    };
  }

  async remove(id: string) {
    const productionData = await this.prisma.productionCost.delete({
      where: {
        id,
      },
    });
    return {
      ...productionData,
      amount: productionData.amount.toString(),
    };
  }
}
