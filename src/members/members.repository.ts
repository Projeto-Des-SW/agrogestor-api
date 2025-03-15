import { Injectable } from '@nestjs/common';
import { Member } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { IMembersRepository } from './members.repository.interface';

@Injectable()
export class MembersRepository implements IMembersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(member: Omit<Member, 'id' | 'disabled'>): Promise<Member> {
    return this.databaseService.member.create({
      data: { name: member.name, group: { connect: { id: member.groupId } } },
    });
  }

  async findById(id: number): Promise<Member | null> {
    return this.databaseService.member.findUnique({
      where: { id, disabled: false },
    });
  }

  async findByName(name: string): Promise<Member | null> {
    return this.databaseService.member.findFirst({
      where: { name, disabled: false },
    });
  }

  listByGroupId(groupId: number): Promise<Member[]> {
    return this.databaseService.member.findMany({
      where: { groupId: groupId, disabled: false },
    });
  }

  async update(id: number, member: Partial<Member>): Promise<Member> {
    return this.databaseService.member.update({
      where: { id },
      data: {
        name: member.name,
        disabled: member.disabled,
        group: { connect: { id: member.groupId } },
      },
    });
  }

  async delete(id: number): Promise<Member> {
    return this.update(id, { disabled: true });
  }
}
