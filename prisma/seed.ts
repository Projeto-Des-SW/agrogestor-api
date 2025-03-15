import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'user',
      password: await bcrypt.hash('user', 10),
      role: Role.USER,
      name: 'User',
    },
  });
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: await bcrypt.hash('admin', 10),
      role: Role.ADMIN,
      name: 'Admin',
    },
  });

  const group1 = await prisma.group.create({ data: { name: 'Group1' } });

  const member1 = await prisma.member.create({
    data: { name: 'Member1', group: { connect: group1 } },
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
