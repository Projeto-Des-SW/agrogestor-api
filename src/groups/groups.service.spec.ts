import { Test } from '@nestjs/testing';
import { IGroupsRepository } from './groups.repository.interface';
import { GroupsRepositoryMock } from './groups.repository.mock';
import { GroupsService } from './groups.service';

const group1 = 'Group1';

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

  describe('when getting a group', () => {
    it('should create a group if it cannot be got by name', async () => {
      const group = await service.getByNameOrCreate(group1);
      expect(group.name).toBe(group1);
    });
  });
});
