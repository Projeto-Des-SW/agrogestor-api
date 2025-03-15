import { Group } from '@prisma/client';
import { BaseRepositoryMock } from 'src/database/base.repository.mock';
import { IGroupsRepository } from './groups.repository.interface';

export class GroupsRepositoryMock
  extends BaseRepositoryMock<Group>
  implements IGroupsRepository
{
  defaultProperties() {
    return { disabled: false };
  }

  findByName = jest.fn(async (name: string) => {
    return this.data.find((e) => e.name === name) ?? null;
  });
}
