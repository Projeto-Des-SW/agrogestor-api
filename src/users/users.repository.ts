import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { IUsersRepository } from './users.repository.interface';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(T: Omit<User, 'id' | 'disabled'>) {
    return this.databaseService.user.create({ data: T });
  }

  async findById(id: number) {
    return this.databaseService.user.findUnique({
      where: { id, disabled: false },
    });
  }

  async findByUsername(username: string) {
    return this.databaseService.user.findFirst({
      where: { username, disabled: false },
    });
  }

  listAll() {
    return this.databaseService.user.findMany({ where: { disabled: false } });
  }

  async update(id: number, T: Partial<User>) {
    return this.databaseService.user.update({ where: { id }, data: T });
  }

  async delete(id: number) {
    return this.update(id, { disabled: true });
  }
}
