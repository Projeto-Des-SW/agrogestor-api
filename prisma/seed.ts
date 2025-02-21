import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { username: 'jhondoe' },
    update: {},
    create: {
      username: 'jhondoe',
      password: await bcrypt.hash('password', 10),
      role: Role.USER,
      name: 'Jhon Doe',
    },
  });
  await prisma.user.upsert({
    where: { username: 'janedoe' },
    update: {},
    create: {
      username: 'janedoe',
      password: await bcrypt.hash('drowssap', 10),
      role: Role.ADMIN,
      name: 'Jane Doe',
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);
    await prisma.$disconnect();
    process.exit(1);
  });
