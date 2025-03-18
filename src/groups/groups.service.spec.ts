import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { GroupsRepository } from './groups.repository';
import { GroupsRepositoryMock } from './groups.repository.mock';
import { GroupsService } from './groups.service';

const group1 = 'Group1';
const group2 = 'Group2';

describe('GroupsService', () => {
  let service: GroupsService;
  let groupsRepositoryMock: GroupsRepositoryMock;

  beforeEach(async () => {
    groupsRepositoryMock = new GroupsRepositoryMock();
    const module = await Test.createTestingModule({
      providers: [GroupsService, GroupsRepository],
    })
      .overrideProvider(GroupsRepository)
      .useValue(groupsRepositoryMock)
      .compile();
    service = module.get(GroupsService);
  });

  describe('when finding a group', () => {
    it('should find a group by id', async () => {
      const created = await service.getByNameOrCreate(group1);
      const group = await service.findById(created.id);
      expect(group?.name).toBe(group1);
    });

    it('should find a group by name', async () => {
      await service.getByNameOrCreate(group1);
      const group = await service.findByName(group1);
      expect(group?.name).toBe(group1);
    });
  });

  describe('when getting by', () => {
    it('should get a group by id', async () => {
      const created = await service.getByNameOrCreate(group1);
      const group = await service.getById(created.id);
      expect(group.name).toBe(group1);
    });

    it('should get a group by name or create one', async () => {
      await service.getByNameOrCreate(group1);
      let group = await service.getByNameOrCreate(group1);
      expect(group.name).toBe(group1);
      group = await service.getByNameOrCreate(group2);
      expect(group.name).toBe(group2);
    });

    it('should throw NotFoundException if the group cannot be found', async () => {
      await expect(service.getById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('when deleting a group', () => {
    it('should delete the group', async () => {
      const created = await service.getByNameOrCreate(group1);
      await service.delete(created.id);
      expect(groupsRepositoryMock.delete).toHaveBeenCalled();
    });

    it('should throw NotFoundException if the group cannot be found', async () => {
      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });
  });
});
