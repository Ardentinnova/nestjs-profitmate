import { Injectable } from '@nestjs/common';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { PrismaService } from 'src/common/prisma.service';
import { ensureFound } from 'src/common/helpers/ensure-found';

@Injectable()
export class BusinessService {
  constructor(private readonly prisma: PrismaService) {}
  create(createBusinessDto: CreateBusinessDto, userId: string) {
    const { name } = createBusinessDto;
    return this.prisma.business.create({
      data: {
        name,
        workerId: userId,
      },
    });
  }

  async findManyByUserId(userId: string) {
    return ensureFound(
      await this.prisma.business.findMany({
        where: {
          workerId: userId,
        },
      }),
    );
  }

  async findOne(businessId: string) {
    return ensureFound(
      await this.prisma.business.findUnique({
        where: {
          id: businessId,
        },
      }),
    );
  }

  update(id: string, updateBusinessDto: UpdateBusinessDto) {
    const { name } = updateBusinessDto;
    return this.prisma.business.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  remove(id: string) {
    return this.prisma.business.delete({
      where: {
        id,
      },
    });
  }
}
