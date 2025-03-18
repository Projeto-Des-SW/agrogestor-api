import { Before, setWorldConstructor, World } from '@cucumber/cucumber';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { execSync } from 'child_process';
import { config } from 'dotenv';
import { AppModule } from 'src/app.module';
import { App } from 'supertest/types';

config({ path: '.env.test' });

export class E2EWorld extends World {
  response: any;
  accessToken: string;
  app: INestApplication<App>;
}

setWorldConstructor(E2EWorld);

Before(
  { name: 'Reset database and setup app module' },
  async function (this: E2EWorld) {
    execSync('npx prisma migrate reset --force');

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    this.app = moduleFixture.createNestApplication();
    await this.app.init();
  },
);
