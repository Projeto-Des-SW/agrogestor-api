import { Injectable } from '@nestjs/common';
import { Group } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { IGroupsRepository } from './groups.repository.interface';

@Injectable()
export class GroupsRepository implements IGroupsRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  create(group: Omit<Group, 'id' | 'disabled'>) {
    return this.databaseService.group.create({ data: group });
  }

  findById(id: number) {
    return this.databaseService.group.findUnique({
      where: { id, disabled: false },
    });
  }

  findByName(name: string) {
    return this.databaseService.group.findFirst({
      where: { name, disabled: false },
    });
  }

  update(id: number, group: Partial<Group>) {
    return this.databaseService.group.update({ where: { id }, data: group });
  }

  delete(id: number) {
    return this.update(id, { disabled: true });
  }
}
