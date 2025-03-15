import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { UsersModule } from 'src/users/users.module';
import { IUsersRepository } from 'src/users/users.repository.interface';
import { UsersRepositoryMock } from 'src/users/users.repository.mock';
import { UsersService } from 'src/users/users.service';
import { createJwtMock, JwtMock } from 'src/util/mock-context';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const exampleUser = {
  username: 'user',
  password: 'user',
  role: Role.USER,
  name: 'User',
};

describe('AuthService', () => {
  let jwtMock: JwtMock;
  let usersRepositoryMock: UsersRepositoryMock;
  let usersService: UsersService;
  let service: AuthService;

  beforeEach(async () => {
    jwtMock = createJwtMock();
    usersRepositoryMock = new UsersRepositoryMock();
    const module = await Test.createTestingModule({
      imports: [UsersModule, JwtModule],
      providers: [AuthService],
      controllers: [AuthController],
    })
      .overrideProvider(IUsersRepository)
      .useValue(usersRepositoryMock)
      .overrideProvider(JwtService)
      .useValue(jwtMock)
      .compile();

    service = module.get(AuthService);
    usersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validate user', async () => {
    await usersService.create(exampleUser);
    const user = await service.validateUser(
      exampleUser.username,
      exampleUser.password,
    );
    expect(user?.username).toBe(exampleUser.username);
  });

  it('login', () => {
    jwtMock.sign.mockReturnValue('');
    const jwt = service.login(exampleUser);
    expect(jwt.access_token).toBeDefined();
  });
});
