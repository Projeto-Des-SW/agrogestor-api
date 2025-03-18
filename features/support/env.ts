import { Before, setWorldConstructor, World } from '@cucumber/cucumber';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { execSync } from 'child_process';
import { config } from 'dotenv';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { App } from 'supertest/types';

config({ path: '.env.test' });

export class E2EWorld extends World {
  response: any;
  accessToken: string;
  app: INestApplication<App>;
  request: TestAgent;
}

setWorldConstructor(E2EWorld);

Before(
  { name: 'Reset database and setup app module' },
  async function (this: E2EWorld) {
    execSync('npx prisma migrate reset --force --skip-seed');

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    this.app = moduleFixture.createNestApplication();
    await this.app.init();

    this.request = request(this.app.getHttpServer());
  },
);
