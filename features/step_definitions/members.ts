import { DataTable, Given, When } from '@cucumber/cucumber';
import { E2EWorld } from 'features/support/env';
import { MembersService } from 'src/members/members.service';

Given(
  'the following members exist:',
  async function (this: E2EWorld, members: DataTable) {
    const membersService = this.app.get(MembersService);
    for (const member of members.hashes()) {
      await membersService.create(
        member as { name: string; groupName: string },
      );
    }
  },
);

When('the user requests all members', async function (this: E2EWorld) {
  this.response = await this.request
    .get('/members')
    .auth(this.accessToken, { type: 'bearer' });
});
