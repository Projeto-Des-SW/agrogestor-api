import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUsersRepository } from './users.repository.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(IUsersRepository)
    private readonly usersRepository: IUsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existing = await this.usersRepository.findByUsername(
      createUserDto.username,
    );
    if (existing) throw new ConflictException();
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async findByUsername(username: string) {
    return this.usersRepository.findByUsername(username);
  }

  async getById(id: number) {
    const user = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException();
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.getById(id);
    if (updateUserDto.username) {
      const existing = await this.findByUsername(updateUserDto.username);
      if (existing) throw new ConflictException();
    }
    return this.usersRepository.update(id, updateUserDto);
  }

  async delete(id: number) {
    await this.getById(id);
    return this.usersRepository.delete(id);
  }
}
