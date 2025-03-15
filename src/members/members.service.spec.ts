import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { GroupsModule } from 'src/groups/groups.module';
import { IGroupsRepository } from 'src/groups/groups.repository.interface';
import { GroupsRepositoryMock } from 'src/groups/groups.repository.mock';
import { IMembersRepository } from './members.repository.interface';
import { MembersRepositoryMock } from './members.repository.mock';
import { MembersService } from './members.service';

const group1 = 'Group1';
const group2 = 'Group2';
const member1 = 'Member1';
const member2 = 'Member2';

describe('MembersService', () => {
  let service: MembersService;
  let membersRepositoryMock: MembersRepositoryMock;
  let groupsRepositoryMock: GroupsRepositoryMock;

  beforeEach(async () => {
    membersRepositoryMock = new MembersRepositoryMock();
    groupsRepositoryMock = new GroupsRepositoryMock();
    const module = await Test.createTestingModule({
      imports: [GroupsModule],
      providers: [
        MembersService,
        { provide: IMembersRepository, useValue: membersRepositoryMock },
      ],
    })
      .overrideProvider(IGroupsRepository)
      .useValue(groupsRepositoryMock)
      .compile();
    service = module.get(MembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when creating a member', () => {
    it('should create a member', async () => {
      await service.create({ name: member2, groupName: group1 });
      const member = await service.create({
        name: member1,
        groupName: group1,
      });
      expect(member.name).toBe(member1);
      expect(member.group.name).toBe(group1);
      expect(groupsRepositoryMock.create).toHaveBeenCalledTimes(1);
    });

    it('should create a member and a group when the group does not exist', async () => {
      const member = await service.create({
        name: member1,
        groupName: group1,
      });
      expect(member.name).toBe(member1);
      expect(member.group.name).toBe(group1);
      expect(groupsRepositoryMock.create).toHaveBeenCalledTimes(1);
    });

    it('should throw ConflictException if there is a member with the same name', async () => {
      await service.create({ name: member1, groupName: group1 });
      await expect(
        service.create({ name: member1, groupName: group2 }),
      ).rejects.toThrow(ConflictException);
      const existing = await service.getByName(member1);
      expect(existing.group.name).toBe(group1);
      expect(groupsRepositoryMock.create).toHaveBeenCalledTimes(1);
    });

    it('should create a member with the same name as a deleted member', async () => {
      const created = await service.create({
        name: member1,
        groupName: group1,
      });
      await service.delete(created.id);
      const member = await service.create({ name: member1, groupName: group1 });
      expect(member.name).toBe(member1);
    });
  });

  describe('when finding a member', () => {
    it('should find a member by name', async () => {
      const created = await service.create({
        name: member1,
        groupName: group1,
      });
      const member = await service.findByName(member1);
      expect(member?.id).toBe(created.id);
    });

    it('should not find a deleted member by name', async () => {
      const created = await service.create({
        name: member1,
        groupName: group1,
      });
      await service.delete(created.id);
      const member = await service.findByName(member1);
      expect(member).toBeNull();
    });
  });

  describe('when getting a member', () => {
    it('should get a member by id', async () => {
      const created = await service.create({
        name: member1,
        groupName: group1,
      });
      const member = await service.getById(created.id);
      expect(member.name).toBe(member1);
    });

    it('should get a member by name', async () => {
      const created = await service.create({
        name: member1,
        groupName: group1,
      });
      const member = await service.getByName(created.name);
      expect(member.name).toBe(member1);
    });

    it('should throw NotFoundException if the member cannot be got by id', async () => {
      await expect(service.getById(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if the member cannot be got by name', async () => {
      await expect(service.getByName(member1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('when updating a member', () => {
    it('should update the member and change its name', async () => {
      const old = await service.create({ name: member1, groupName: group1 });
      const member = await service.update(old.id, {
        name: member2,
      });
      expect(member.name).toBe(member2);
      expect(groupsRepositoryMock.create).toHaveBeenCalledTimes(1);
    });

    it('should throw ConflictException if there is a member with the same name', async () => {
      const old = await service.create({ name: member1, groupName: group1 });
      await service.create({ name: member2, groupName: group2 });
      await expect(service.update(old.id, { name: member2 })).rejects.toThrow(
        ConflictException,
      );
      const existing = await service.getByName(member2);
      expect(existing.name).toBe(member2);
      expect(groupsRepositoryMock.create).toHaveBeenCalledTimes(2);
    });

    it('should update a member and change its group', async () => {
      const old = await service.create({ name: member1, groupName: group1 });
      await service.create({ name: member2, groupName: group2 });
      const member = await service.update(old.id, {
        groupName: group2,
      });
      expect(member.group.name).toBe(group2);
      expect(groupsRepositoryMock.create).toHaveBeenCalledTimes(2);
    });

    it('should update a member and create a group if it changed and does not exist', async () => {
      const old = await service.create({ name: member1, groupName: group1 });
      const member = await service.update(old.id, {
        groupName: group2,
      });
      expect(member.group.name).toBe(group2);
      expect(groupsRepositoryMock.create).toHaveBeenCalledTimes(2);
    });

    it('should update a member with the same name as a deleted member', async () => {
      const created = await service.create({
        name: member1,
        groupName: group1,
      });
      await service.delete(created.id);
      const old = await service.create({ name: member2, groupName: group1 });
      const member = await service.update(old.id, { name: member1 });
      expect(member.name).toBe(member1);
    });

    it('should delete group when there are no members left', async () => {
      const old = await service.create({ name: member1, groupName: group1 });
      const member = await service.update(old.id, {
        groupName: group2,
      });
      expect(member.group.name).toBe(group2);
      expect(groupsRepositoryMock.create).toHaveBeenCalledTimes(2);
      expect(groupsRepositoryMock.delete).toHaveBeenCalledTimes(1);
    });

    it('should not delete group if not switching groups', async () => {
      const old = await service.create({ name: member1, groupName: group1 });
      await service.update(old.id, { groupName: group1 });
      expect(groupsRepositoryMock.delete).toHaveBeenCalledTimes(0);
    });

    it('should throw NotFoundException when a member cannot be found', async () => {
      await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('when deleting a member', () => {
    it('should delete a member', async () => {
      const old = await service.create({ name: member1, groupName: group1 });
      await service.create({ name: member2, groupName: group1 });
      await service.delete(old.id);
      const member = await service.findByName(member1);
      expect(member).toBeNull();
      expect(groupsRepositoryMock.delete).toHaveBeenCalledTimes(0);
    });

    it('should throw NotFoundException if the member cannot be found', async () => {
      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });

    it('should delete group when there are no members left', async () => {
      const old = await service.create({ name: member1, groupName: group1 });
      await service.delete(old.id);
      expect(groupsRepositoryMock.delete).toHaveBeenCalledTimes(1);
    });

    it('should not delete a member twice', async () => {
      const old = await service.create({ name: member1, groupName: group1 });
      await service.delete(old.id);
      await expect(service.delete(old.id)).rejects.toThrow(NotFoundException);
    });
  });
});
