import { User } from '@prisma/client';
import { BaseRepositoryMock } from 'src/database/base.repository.mock';
import { IUsersRepository } from './users.repository.interface';

export class UsersRepositoryMock
  extends BaseRepositoryMock<User>
  implements IUsersRepository
{
  defaultProperties(): Partial<User> {
    return { disabled: false };
  }

  findByUsername = jest.fn(async (username: string) => {
    return this.data.find((e) => e.username === username) ?? null;
  });
}
