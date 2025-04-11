import { Injectable } from '@nestjs/common';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class PeriodService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPeriodDto: CreatePeriodDto) {
    const { name, endDate, startDate, businessId } = createPeriodDto;

    return this.prisma.periode.create({
      data: {
        name,
        businessId,
        startDate,
        endDate,
      },
    });
  }

  findAll(businessId: string) {
    return this.prisma.periode.findMany({
      where: {
        businessId,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.periode.findUnique({
      where: {
        id,
      },
    });
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
