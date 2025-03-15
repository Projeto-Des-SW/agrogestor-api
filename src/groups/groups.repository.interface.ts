import { Group } from '@prisma/client';
import { IBaseRepository } from 'src/database/base.repository.interface';

export interface IGroupsRepository extends IBaseRepository<Group> {
  findByName(name: string): Promise<Group | null>;
}

export const IGroupsRepository = Symbol('IGroupRepository');
