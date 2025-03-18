import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.create({
    data: {
      username: 'admin',
      password: await bcrypt.hash('admin', 10),
      role: Role.ADMIN,
      name: 'Admin',
    },
  });
  const member = await prisma.member.create({
    data: {
      name: 'Member',
      group: { create: { name: 'Group' } },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
