import { Member } from '@prisma/client';
import { IBaseRepository } from 'src/database/base.repository.interface';

export interface IMembersRepository extends IBaseRepository<Member> {
  findByName(name: string): Promise<Member | null>;
  listByGroupId(groupId: number): Promise<Member[]>;
}

export const IMembersRepository = Symbol('IMembersRepository');
