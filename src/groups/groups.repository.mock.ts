import { Group } from '@prisma/client';
import { BaseRepositoryMock } from 'src/database/base.repository.mock';

export class GroupsRepositoryMock extends BaseRepositoryMock<Group> {
  defaultProperties() {
    return { disabled: false };
  }

  findByName = jest.fn(async (name: string) => {
    return this.data.find((e) => e.name === name) ?? null;
  });
}
