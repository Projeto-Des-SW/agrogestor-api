import { Member } from '@prisma/client';
import { BaseRepositoryMock } from 'src/database/base.repository.mock';
import { IMembersRepository } from './members.repository.interface';

export class MembersRepositoryMock
  extends BaseRepositoryMock<Member>
  implements IMembersRepository
{
  defaultProperties() {
    return { disabled: false };
  }

  findByName = jest.fn(async (name: string) => {
    return this.data.find((e) => e.name === name) ?? null;
  });

  listByGroupId = jest.fn(async (groupId: number) => {
    return this.data.filter((e) => e.groupId === groupId);
  });
}
