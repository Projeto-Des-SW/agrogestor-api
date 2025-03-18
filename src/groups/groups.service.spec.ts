import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { IGroupsRepository } from './groups.repository.interface';
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
      providers: [
        GroupsService,
        { provide: IGroupsRepository, useValue: groupsRepositoryMock },
      ],
    }).compile();
    service = module.get(GroupsService);
  });

  describe('when creating a group', () => {
    it('should create a group', async () => {
      const group = await service.create(group1);
      expect(group.name).toBe(group1);
    });

    it('should recreate a deleted group using the same name', async () => {
      const old = await service.create(group1);
      await service.delete(old.id);
      const group = await service.create(group1);
      expect(group.name).toBe(group1);
    });

    it('should throw ConflictException when there is a group with the same name', async () => {
      await service.create(group1);
      await expect(service.create(group1)).rejects.toThrow(ConflictException);
    });
  });

  describe('when finding a group', () => {
    it('should find a group by id', async () => {
      const created = await service.create(group1);
      const group = await service.findById(created.id);
      expect(group?.name).toBe(group1);
    });

    it('should find a group by name', async () => {
      await service.create(group1);
      const group = await service.findByName(group1);
      expect(group?.name).toBe(group1);
    });
  });

  describe('when getting by', () => {
    it('should get a group by id', async () => {
      const created = await service.create(group1);
      const group = await service.getById(created.id);
      expect(group.name).toBe(group1);
    });

    it('should get a group by name or create one', async () => {
      await service.create(group1);
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
      const created = await service.create(group1);
      await service.delete(created.id);
      expect(groupsRepositoryMock.delete).toHaveBeenCalled();
    });

    it('should throw NotFoundException if the group cannot be found', async () => {
      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });
  });
});
