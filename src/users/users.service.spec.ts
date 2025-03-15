import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { IUsersRepository } from './users.repository.interface';
import { UsersRepositoryMock } from './users.repository.mock';
import { UsersService } from './users.service';

const exampleUser1 = {
  username: 'user',
  password: 'user',
  role: Role.USER,
  name: 'User',
};
const exampleUser2 = {
  username: 'admin',
  password: 'admin',
  role: Role.ADMIN,
  name: 'Admin',
};

describe('UsersService', () => {
  let usersRepositoryMock: UsersRepositoryMock;
  let service: UsersService;

  beforeEach(async () => {
    usersRepositoryMock = new UsersRepositoryMock();
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: IUsersRepository, useValue: usersRepositoryMock },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when creating an user', () => {
    it('should create an user', async () => {
      const user = await service.create(exampleUser1);
      expect(user.username).toBe(exampleUser1.username);
    });

    it('should throw ConflictException if there is an user with the same username', async () => {
      await service.create(exampleUser1);
      await expect(service.create(exampleUser1)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should create an user with the username of a deleted user', async () => {
      const created = await service.create(exampleUser1);
      await service.delete(created.id);
      const user = await service.create(exampleUser1);
      expect(user.username).toBe(exampleUser1.username);
    });
  });

  describe('when finding an user', () => {
    it('should find an user by username', async () => {
      await service.create(exampleUser1);
      const user = await service.findByUsername(exampleUser1.username);
      expect(user?.username).toBe(exampleUser1.username);
    });

    it('should not find a deleted user by username', async () => {
      const created = await service.create(exampleUser1);
      await service.delete(created.id);
      const user = await service.findByUsername(exampleUser1.username);
      expect(user).toBeNull();
    });
  });

  describe('when getting an user', () => {
    it('should get an user by id', async () => {
      const created = await service.create(exampleUser1);
      const user = await service.getById(created.id);
      expect(user.username).toBe(created.username);
    });

    it('should throw NotFoundException if the user cannot be found by id', async () => {
      await expect(service.getById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('when updating an user', () => {
    it('should update an user', async () => {
      const old = await service.create(exampleUser1);
      const user = await service.update(old.id, exampleUser2);
      expect(user.username).toBe(exampleUser2.username);
    });

    it('should throw ConflictException if there is an user with the same username', async () => {
      const old = await service.create(exampleUser1);
      await service.create(exampleUser2);
      await expect(
        service.update(old.id, { username: exampleUser2.username }),
      ).rejects.toThrow(ConflictException);
    });

    it('should throw NotFoundException if the user cannot be found', async () => {
      await expect(service.update(1, exampleUser2)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
