import { User } from '@prisma/client';
import { IBaseRepository } from 'src/database/base.repository.interface';

export interface IUsersRepository extends IBaseRepository<User> {
  findByUsername(username: string): Promise<User | null>;
}

export const IUsersRepository = Symbol('IUsersRepository');
