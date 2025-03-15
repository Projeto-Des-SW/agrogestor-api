/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { App } from 'supertest/types';

describe('Auth controller (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Login', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'user', password: 'user' })
      .expect(201);
    expect(response.body.access_token).toBeDefined();
    return response;
  });

  it('Login unauthorized', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'user', password: 'resu' })
      .expect(401);
  });
});
