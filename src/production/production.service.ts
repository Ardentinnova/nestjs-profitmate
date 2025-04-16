import { Injectable } from '@nestjs/common';
import { CreateProductionDto } from './dto/create-production.dto';
import { UpdateProductionDto } from './dto/update-production.dto';
import { PrismaService } from 'src/common/prisma.service';
import { ensureFound } from 'src/common/helpers/ensure-found';

@Injectable()
export class ProductionService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProductionDto: CreateProductionDto, businessId: string) {
    const { periodesId, name, category, amount } = createProductionDto;
    return this.prisma.productionCost.create({
      data: {
        businessId,
        periodesId,
        name,
        category,
        amount,
      },
    });
  }

  async findAllByBusinessId(businessId: string, periodId: string) {
    const selectedPeriodId =
      periodId ||
      ensureFound(
        await this.prisma.periode.findFirst({
          where: { businessId },
          orderBy: { createdAt: 'desc' },
          select: { id: true },
        }),
      )?.id;

    const productionCosts = await this.prisma.productionCost.findMany({
      where: { businessId, periodesId: selectedPeriodId },
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
      businessId,
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

  findOne(id: string) {
    return this.prisma.productionCost.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateProductionDto: UpdateProductionDto) {
    return this.prisma.productionCost.update({
      where: {
        id,
      },
      data: updateProductionDto,
    });
  }

  remove(id: string) {
    return this.prisma.productionCost.delete({
      where: {
        id,
      },
    });
  }
}
