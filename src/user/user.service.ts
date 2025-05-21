import { Injectable } from '@nestjs/common';
import { EditUserDto } from './dto/edit-user.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async editUser(id: string, data: EditUserDto) {
    return this.prisma.profile.update({
      where: {
        id,
      },
      data,
    });
  }
}
