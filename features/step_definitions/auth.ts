/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Given, Then, When } from '@cucumber/cucumber';
import expect from 'expect';
import { E2EWorld } from 'features/support/env';

import * as request from 'supertest';

Given('the user is not logged in', function (this: E2EWorld) {
  this.accessToken = '';
});

When(
  'the user logs in with username {string} and password {string}',
  async function (this: E2EWorld, username: string, password: string) {
    const response = await request(this.app.getHttpServer())
      .post('/auth/login')
      .send({ username, password });
    this.accessToken = response.body.access_token as string;
    this.response = response;
  },
);

Then('access_token should be defined', function (this: E2EWorld) {
  expect(this.accessToken).toBeDefined();
});
