import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { MockContext, PrismaMockError } from 'src/util/mock-context';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let mock: MockContext;
  let service: UsersService;
  const exampleUser1 = {
    id: 1,
    username: 'jhondoe',
    password: 'password',
    role: Role.USER,
    name: 'Jhon Doe',
  };
  const exampleUser2 = {
    id: 1,
    username: 'janedoe',
    password: 'drowssap',
    role: Role.ADMIN,
    name: 'Jane Doe',
  };

  beforeEach(async () => {
    mock = new MockContext();
    const module = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mock.prisma)
      .compile();
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create user', async () => {
    mock.prisma.user.create.mockResolvedValue(exampleUser1);
    const user = await service.create(exampleUser1);
    expect(user?.username).toBe(exampleUser1.username);
  });

  it('find one user', async () => {
    mock.prisma.user.findUnique.mockResolvedValue(exampleUser1);
    const user = await service.findOne(exampleUser1.username);
    expect(user?.username).toBe(exampleUser1.username);
  });

  it('create user already exists', async () => {
    mock.prisma.user.create.mockImplementation(() => {
      throw new PrismaMockError('P2002');
    });
    await expect(service.create(exampleUser1)).rejects.toThrow(
      ConflictException,
    );
  });

  it('update user', async () => {
    mock.prisma.user.update.mockResolvedValue(exampleUser2);
    const user = await service.update(exampleUser1.username, exampleUser2);
    expect(user.username).toBe(exampleUser2.username);
  });

  it('update user not found', async () => {
    mock.prisma.user.update.mockImplementation(() => {
      throw new PrismaMockError('P2025');
    });
    await expect(
      service.update(exampleUser1.username, exampleUser2),
    ).rejects.toThrow(NotFoundException);
  });
});
