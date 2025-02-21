import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { MockContext } from 'src/util/mock-context';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let mock: MockContext;
  let service: AuthService;
  const exampleUser = {
    id: 1,
    username: 'jhondoe',
    password: 'password',
    role: Role.USER,
    name: 'Jhon Doe',
  };

  beforeEach(async () => {
    mock = new MockContext();
    const module = await Test.createTestingModule({
      imports: [UsersModule, JwtModule],
      providers: [AuthService],
      controllers: [AuthController],
    })
      .overrideProvider(PrismaService)
      .useValue(mock.prisma)
      .overrideProvider(JwtService)
      .useValue(mock.jwt)
      .compile();

    service = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('validate user', async () => {
    mock.prisma.user.findUnique.mockResolvedValue({
      ...exampleUser,
      password: await bcrypt.hash(exampleUser.password, 10),
    });
    const user = await service.validateUser(
      exampleUser.username,
      exampleUser.password,
    );
    expect(user?.username).toBe(exampleUser.username);
  });

  it('login', () => {
    mock.jwt.sign.mockReturnValue('');
    const jwt = service.login(exampleUser);
    expect(jwt.access_token).toBeDefined();
  });
});
