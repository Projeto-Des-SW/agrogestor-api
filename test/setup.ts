import { execSync } from 'child_process';

beforeAll(() => {
  execSync('npx prisma migrate reset --force');
});
