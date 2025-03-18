import { User } from '@prisma/client';
import { BaseRepositoryMock } from 'src/database/base.repository.mock';

export class UsersRepositoryMock extends BaseRepositoryMock<User> {
  defaultProperties(): Partial<User> {
    return { disabled: false };
  }

  findByUsername = jest.fn(async (username: string) => {
    return this.data.find((e) => e.username === username) ?? null;
  });
}
