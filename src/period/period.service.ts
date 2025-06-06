import { Injectable } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { PrismaService } from 'src/common/prisma.service';
import { ensureFound } from 'src/common/helpers/ensure-found';

@Injectable()
export class PeriodService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPeriodDto: CreatePeriodDto, userId: string) {
    const { name, endDate, startDate } = createPeriodDto;

    return this.prisma.periode.create({
      data: {
        name,
        startDate,
        userId,
        endDate,
      },
    });
  }

  async findAll(userId: string) {
    return ensureFound(
      await this.prisma.periode.findMany({
        where: {
          userId,
        },
      }),
    );
  }

  async findOne(id: string) {
    return ensureFound(
      await this.prisma.periode.findUnique({
        where: {
          id,
        },
      }),
    );
  }

  update(id: string, updatePeriodDto: UpdatePeriodDto) {
    const { name, endDate, startDate } = updatePeriodDto;
    return this.prisma.periode.update({
      where: {
        id,
      },
      data: {
        name,
        startDate,
        endDate,
      },
    });
  }

  remove(id: string) {
    return this.prisma.periode.delete({
      where: {
        id,
      },
    });
  }
}
