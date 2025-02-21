import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { prismaCatch } from 'src/util/prisma-catch';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return prismaCatch(() => this.prisma.user.create({ data: createUserDto }), {
      P2002: new ConflictException(),
    });
  }

  async findOne(username: string) {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    return prismaCatch(
      () =>
        this.prisma.user.update({ where: { username }, data: updateUserDto }),
      { P2025: new NotFoundException() },
    );
  }
}
