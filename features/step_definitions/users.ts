import { Given, When } from '@cucumber/cucumber';
import { Role } from '@prisma/client';
import { E2EWorld } from 'features/support/env';
import { UsersService } from 'src/users/users.service';
import * as request from 'supertest';

Given(
  'there is an user named {string} with username {string}, password {string} and role {string}',
  async function (
    this: E2EWorld,
    name: string,
    username: string,
    password: string,
    role: string,
  ) {
    const usersService = this.app.get(UsersService);
    await usersService.create({
      name,
      username,
      password,
      role: role === 'USER' ? Role.USER : Role.ADMIN,
    });
  },
);

When(
  'the user creates an user named {string} with username {string}, password {string} and role {string}',
  async function (
    this: E2EWorld,
    name: string,
    username: string,
    password: string,
    role: string,
  ) {
    this.response = await request(this.app.getHttpServer())
      .post('/users')
      .auth(this.accessToken, { type: 'bearer' })
      .send({ name, username, password, role });
  },
);
