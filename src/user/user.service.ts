import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async update(id: number, data: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data,
    });
  }
}
