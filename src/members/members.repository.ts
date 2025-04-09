import { Injectable } from '@nestjs/common';
import { Member } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MembersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(member: Omit<Member, 'id' | 'disabled'>) {
    return this.databaseService.member.create({
      data: { name: member.name, group: { connect: { id: member.groupId } } },
    });
  }

  async findById(id: number) {
    return this.databaseService.member.findUnique({
      where: { id, disabled: false },
    });
  }

  async findByName(name: string) {
    return this.databaseService.member.findFirst({
      where: { name, disabled: false },
    });
  }

  listAll() {
    return this.databaseService.member.findMany({
      where: { disabled: false },
      include: { group: true },
    });
  }

  listByGroupId(groupId: number) {
    return this.databaseService.member.findMany({
      where: { groupId: groupId, disabled: false },
    });
  }

  async update(id: number, member: Partial<Member>) {
    return this.databaseService.member.update({
      where: { id },
      data: {
        name: member.name,
        disabled: member.disabled,
        group: member.groupId ? { connect: { id: member.groupId } } : undefined,
      },
    });
  }

  async delete(id: number) {
    return this.update(id, { disabled: true });
  }
}
