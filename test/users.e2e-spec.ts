/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from '@prisma/client';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { App } from 'supertest/types';

describe('User controller (e2e)', () => {
  let app: INestApplication<App>;
  let userAccessToken: string;
  let adminAccessToken: string;
  const steve = {
    username: 'steve',
    password: 'strongpassword',
    role: Role.USER,
    name: 'Steve',
  };
  const jhondoe = {
    username: 'jhondoe',
    password: 'password',
    role: Role.USER,
    name: 'User',
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    userAccessToken = (
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'user', password: 'user' })
    ).body.access_token;

    adminAccessToken = (
      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ username: 'admin', password: 'admin' })
    ).body.access_token;
  });

  it('Users unauthorized', async () => {
    return request(app.getHttpServer()).post('/users').send(steve).expect(401);
  });

  it('Users forbidden', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .auth(userAccessToken, { type: 'bearer' })
      .send(steve)
      .expect(403);
  });

  it('Create user', async () => {
    return request(app.getHttpServer())
      .post('/users')
      .auth(adminAccessToken, { type: 'bearer' })
      .send(steve)
      .expect(201);
  });

  it('Create user conflict', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .auth(adminAccessToken, { type: 'bearer' })
      .send(jhondoe);
    return request(app.getHttpServer())
      .post('/users')
      .auth(adminAccessToken, { type: 'bearer' })
      .send(jhondoe)
      .expect(409);
  });

  it('Update user', async () => {
    return request(app.getHttpServer())
      .patch('/users/1')
      .auth(adminAccessToken, { type: 'bearer' })
      .send({ username: 'updated' })
      .expect(200);
  });

  it('Update user not found', async () => {
    return await request(app.getHttpServer())
      .patch('/users/9999')
      .auth(adminAccessToken, { type: 'bearer' })
      .send({ username: 'carla' })
      .expect(404);
  });

  it('Update user conflict', async () => {
    return await request(app.getHttpServer())
      .patch('/users/1')
      .auth(adminAccessToken, { type: 'bearer' })

      .send({ username: 'admin' })
      .expect(409);
  });

  afterAll(async () => {
    await app.close();
  });
});
