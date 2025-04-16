import { Injectable } from '@nestjs/common';
import { CreateSellingDto } from './dto/create-selling.dto';
import { UpdateSellingDto } from './dto/update-selling.dto';
import { PrismaService } from 'src/common/prisma.service';
import { ensureFound } from 'src/common/helpers/ensure-found';

@Injectable()
export class SellingService {
  constructor(private readonly prisma: PrismaService) {}

  create(createSellingDto: CreateSellingDto, businessId: string) {
    const {
      profitMargin,
      productCount,
      endingInventory,
      initialInventory,
      periodesId,
    } = createSellingDto;
    return this.prisma.sellingCost.create({
      data: {
        initialInventory: BigInt(initialInventory),
        endingInventory: BigInt(endingInventory),
        productCount,
        profitMargin,
        periodesId,
        businessId,
      },
    });
  }

  async findAll(businessId: string, periodId: string) {
    const selectedPeriod =
      periodId ||
      ensureFound(
        await this.prisma.periode.findFirst({
          where: { businessId },
          orderBy: { createdAt: 'desc' },
          select: { id: true },
        }),
      )?.id;

    const [sellingData, totalProductionCost] = await Promise.all([
      this.prisma.sellingCost.findFirst({
        where: { businessId, periodesId: selectedPeriod },
      }),
      this.prisma.productionCost.aggregate({
        where: { businessId, periodesId: selectedPeriod },
        _sum: { amount: true },
      }),
    ]);

    const validSellingData = ensureFound(sellingData);
    const validtotalProductionCost = ensureFound(totalProductionCost);

    const hargaPokokPenjualan =
      (validtotalProductionCost._sum.amount ?? 0n) +
      validSellingData?.initialInventory -
      validSellingData?.endingInventory;

    const hargaPokokPenjualanPerUnit =
      hargaPokokPenjualan / BigInt(validSellingData.productCount);

    const besarKeuntungan =
      hargaPokokPenjualanPerUnit * BigInt(validSellingData.profitMargin);

    const hargaJualPerProduk = hargaPokokPenjualanPerUnit + besarKeuntungan;

    return {
      jumlahProduk: validSellingData?.productCount,
      marginUntung: validSellingData?.profitMargin,
      persediaanAwal: validSellingData?.initialInventory,
      persediaanAkhir: validSellingData?.endingInventory,
      hargaPokokProduksi: validtotalProductionCost._sum.amount?.toString(),
      hargaPokokPenjualan: hargaPokokPenjualan.toString(),
      hargaPokokPenjualanPerUnit: hargaPokokPenjualanPerUnit.toString(),
      besarKeuntungan: besarKeuntungan.toString(),
      hargaJualPerProduk: hargaJualPerProduk.toString(),
    };
  }

  findOne(id: string) {
    return this.prisma.sellingCost.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: string, updateSellingDto: UpdateSellingDto) {
    const { productCount, profitMargin, endingInventory, initialInventory } =
      updateSellingDto;

    return this.prisma.sellingCost.update({
      where: {
        id,
      },
      data: {
        initialInventory: BigInt(initialInventory!),
        endingInventory: BigInt(endingInventory!),
        profitMargin,
        productCount,
      },
    });
  }

  remove(id: string) {
    return this.prisma.sellingCost.delete({
      where: {
        id,
      },
    });
  }
}
