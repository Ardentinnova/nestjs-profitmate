import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSellingDto } from './dto/create-selling.dto';
import { UpdateSellingDto } from './dto/update-selling.dto';
import { PrismaService } from 'src/common/prisma.service';
import { ensureFound } from 'src/common/helpers/ensure-found';

@Injectable()
export class SellingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSellingDto: CreateSellingDto, userId: string) {
    const {
      profitMargin,
      productCount,
      endingInventory,
      initialInventory,
      periodesId,
    } = createSellingDto;

    const existedSellingData = await this.prisma.sellingCost.findFirst({
      where: {
        userId,
        periodesId,
      },
    });

    if (existedSellingData)
      throw new ConflictException(
        'Data harga pokok penjualan sudah ada, silahkan update untuk mengubah',
      );

    const sellingData = await this.prisma.sellingCost.create({
      data: {
        initialInventory: BigInt(initialInventory),
        endingInventory: BigInt(endingInventory),
        productCount,
        profitMargin,
        periodesId,
        userId,
      },
    });

    return {
      ...sellingData,
      initialInventory: sellingData.initialInventory.toString(),
      endingInventory: sellingData.endingInventory.toString(),
    };
  }

  async findAll(userId: string, periodId: string) {
    const selectedPeriod =
      periodId ||
      ensureFound(
        await this.prisma.periode.findFirst({
          where: { userId },
          orderBy: { createdAt: 'desc' },
          select: { id: true },
        }),
      )?.id;

    const [sellingData, totalProductionCost] = await Promise.all([
      this.prisma.sellingCost.findFirst({
        where: { userId, periodesId: selectedPeriod },
      }),
      this.prisma.productionCost.aggregate({
        where: { userId, periodesId: selectedPeriod },
        _sum: { amount: true },
      }),
    ]);

    const validSellingData = ensureFound(sellingData);
    const validtotalProductionCost = ensureFound(totalProductionCost);

    const hargaPokokPenjualan =
      (validtotalProductionCost._sum.amount ?? 0n) +
      validSellingData?.initialInventory -
      validSellingData?.endingInventory;

    const scale = 1_000_000n;

    const hargaPokokPenjualanPerUnit =
      hargaPokokPenjualan / BigInt(validSellingData.productCount);

    const besarKeuntungan =
      (hargaPokokPenjualanPerUnit *
        BigInt(validSellingData.profitMargin * Number(scale))) /
      scale;

    const hargaJualPerProduk = hargaPokokPenjualanPerUnit + besarKeuntungan;

    return {
      id: sellingData?.id,
      jumlahProduk: validSellingData?.productCount,
      marginUntung: validSellingData?.profitMargin,
      persediaanAwal: validSellingData?.initialInventory.toString(),
      persediaanAkhir: validSellingData?.endingInventory.toString(),
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

  async update(id: string, updateSellingDto: UpdateSellingDto) {
    const { productCount, profitMargin, endingInventory, initialInventory } =
      updateSellingDto;

    const sellingData = await this.prisma.sellingCost.update({
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

    return {
      ...sellingData,
      initialInventory: sellingData.initialInventory.toString(),
      endingInventory: sellingData.endingInventory.toString(),
    };
  }

  async remove(id: string) {
    const sellingData = await this.prisma.sellingCost.delete({
      where: {
        id,
      },
    });
    return {
      ...sellingData,
      initialInventory: sellingData.initialInventory.toString(),
      endingInventory: sellingData.endingInventory.toString(),
    };
  }
}
